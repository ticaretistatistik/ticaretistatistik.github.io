/**
 * Glossary Approval — Google Apps Script
 *
 * Lives inside the Google Sheet that collects form responses.
 * Workflow:
 *   1. Editor reviews a row in "Öneriler" (form responses sheet).
 *   2. Editor ticks the "Onayla" checkbox on that row.
 *   3. This script copies the row's mapped fields to the "Sözlük" sheet
 *      and writes the timestamp into "Durum" so it's clear it's processed.
 *
 * The site's build-time fetcher reads "Sözlük" as CSV; "Öneriler" stays
 * as the audit trail of every submission.
 *
 * Setup is documented at the bottom of this file.
 */

// --- Config -----------------------------------------------------------------

const SUBMISSIONS_SHEET = 'Öneriler';   // tab the form writes into
const GLOSSARY_SHEET    = 'Sözlük';     // curated tab the site reads
const APPROVE_COL       = 'Onayla';     // checkbox column in Öneriler
const STATUS_COL        = 'Durum';      // text column in Öneriler

// Map a Sözlük header to the list of acceptable Öneriler headers.
// Matching is whitespace-insensitive, case-insensitive, and TR-aware so
// "Terim", "Terim (Türkçe)", " terim " all match the same destination.
// Add aliases freely; the first one found in the source sheet wins.
const FIELD_MAP = {
  'Terim':     ['Terim (Türkçe)', 'Terim', 'Terim Türkçe'],
  'İngilizce': ['İngilizce karşılığı', 'İngilizce', 'English', 'EN'],
  'Tanım':     ['Tanım', 'Definition'],
  'Örnek':     ['Örnek', 'Example'],
  'İlgili':    ['İlgili terimler', 'İlgili', 'Related'],
  'Katkı':     ['Adın (opsiyonel)', 'Adın', 'Katkı', 'Contributor'],
};

// --- Trigger ----------------------------------------------------------------

/**
 * Installable onEdit trigger. Fires whenever a cell is edited.
 * We only act when the edit is a checkbox toggling to TRUE in the
 * APPROVE_COL of the SUBMISSIONS_SHEET.
 */
function onEditApprove(e) {
  if (!e || !e.range) return;
  const sheet = e.range.getSheet();
  if (sheet.getName() !== SUBMISSIONS_SHEET) return;

  const row = e.range.getRow();
  if (row === 1) return; // header

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const approveIdx = headers.indexOf(APPROVE_COL);
  if (approveIdx === -1) return;
  if (e.range.getColumn() !== approveIdx + 1) return;
  if (e.value !== 'TRUE' && e.value !== true) return;

  approveRow_(sheet, headers, row);
}

/**
 * Manual menu fallback: process every checked row at once.
 * Useful if onEdit didn't fire (e.g. checkbox toggled via paste / import).
 */
function approveAllChecked() {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getSheetByName(SUBMISSIONS_SHEET);
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const approveIdx = headers.indexOf(APPROVE_COL);
  const statusIdx = headers.indexOf(STATUS_COL);
  if (approveIdx === -1) {
    SpreadsheetApp.getUi().alert(`"${APPROVE_COL}" kolonu bulunamadı.`);
    return;
  }
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  const data = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
  let processed = 0;
  data.forEach((row, i) => {
    const checked = row[approveIdx] === true || row[approveIdx] === 'TRUE';
    const alreadyDone = statusIdx !== -1 && row[statusIdx];
    if (checked && !alreadyDone) {
      approveRow_(sheet, headers, i + 2);
      processed++;
    }
  });
  SpreadsheetApp.getUi().alert(`${processed} satır Sözlük'e aktarıldı.`);
}

// --- Core -------------------------------------------------------------------

// Normalize a header for fuzzy comparison: trim, collapse spaces, lower-case
// in Turkish locale. Used so "Terim (Türkçe)" matches " terim (türkçe) ".
function normHeader_(s) {
  return String(s).replace(/\s+/g, ' ').trim().toLocaleLowerCase('tr-TR');
}

// Find the index of the first alias that exists in srcHeaders. Returns -1
// if none of the aliases match.
function findSrcCol_(srcHeaders, aliases) {
  const normSrc = srcHeaders.map(normHeader_);
  for (const alias of aliases) {
    const idx = normSrc.indexOf(normHeader_(alias));
    if (idx !== -1) return idx;
  }
  return -1;
}

function approveRow_(srcSheet, srcHeaders, rowNum) {
  const ss = SpreadsheetApp.getActive();
  const dst = ss.getSheetByName(GLOSSARY_SHEET);
  if (!dst) throw new Error(`"${GLOSSARY_SHEET}" sekmesi bulunamadı.`);

  const dstHeaders = dst.getRange(1, 1, 1, dst.getLastColumn()).getValues()[0];
  const srcRow = srcSheet.getRange(rowNum, 1, 1, srcHeaders.length).getValues()[0];

  // Build a lookup of normalized dst header -> aliases so we can match dst
  // tabs that don't perfectly match the keys in FIELD_MAP either.
  const dstToAliases = {};
  for (const [dstName, aliases] of Object.entries(FIELD_MAP)) {
    dstToAliases[normHeader_(dstName)] = aliases;
  }

  // Build new row aligned to Sözlük's header order.
  const missing = [];
  const newRow = dstHeaders.map((h) => {
    const aliases = dstToAliases[normHeader_(h)];
    if (!aliases) return '';
    const idx = findSrcCol_(srcHeaders, aliases);
    if (idx === -1) {
      missing.push(`"${h}" (aranan: ${aliases.join(' / ')})`);
      return '';
    }
    return srcRow[idx];
  });

  // Find Terim column in destination via the same fuzzy matching.
  const termIdx = dstHeaders.findIndex((h) => normHeader_(h) === normHeader_('Terim'));
  if (termIdx === -1) {
    setStatus_(srcSheet, srcHeaders, rowNum, 'Atlandı: Sözlük\'te "Terim" başlığı yok');
    return;
  }

  // If Terim cell is empty, the most common cause is a header mismatch in
  // the source sheet — surface that in the status to make debugging easy.
  if (!String(newRow[termIdx]).trim()) {
    const detail = missing.length
      ? `Eşleşmeyen başlık: ${missing.join('; ')}`
      : 'terim hücresi gerçekten boş';
    setStatus_(srcSheet, srcHeaders, rowNum, `Atlandı: ${detail}`);
    return;
  }

  // Optional: prevent duplicates by exact term match (case-insensitive, TR-aware).
  if (termExists_(dst, dstHeaders, newRow[termIdx])) {
    setStatus_(srcSheet, srcHeaders, rowNum, `Atlandı: "${newRow[termIdx]}" zaten var`);
    return;
  }

  dst.appendRow(newRow);
  const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm');
  setStatus_(srcSheet, srcHeaders, rowNum, `Aktarıldı ${stamp}`);
}

function termExists_(dstSheet, dstHeaders, term) {
  const termIdx = dstHeaders.findIndex((h) => normHeader_(h) === normHeader_('Terim'));
  if (termIdx === -1) return false;
  const last = dstSheet.getLastRow();
  if (last < 2) return false;
  const col = dstSheet.getRange(2, termIdx + 1, last - 1, 1).getValues();
  const norm = (s) => String(s).trim().toLocaleLowerCase('tr-TR');
  const target = norm(term);
  return col.some((r) => norm(r[0]) === target);
}

function setStatus_(sheet, headers, rowNum, msg) {
  const idx = headers.indexOf(STATUS_COL);
  if (idx === -1) return;
  sheet.getRange(rowNum, idx + 1).setValue(msg);
}

// --- Menu -------------------------------------------------------------------

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Sözlük')
    .addItem('İşaretli önerileri aktar', 'approveAllChecked')
    .addToUi();
}

/* ============================================================================
SETUP (do once per spreadsheet):

1. Sheets'i aç → Extensions → Apps Script.
2. Default `Code.gs` içeriğini sil, bu dosyanın tamamını yapıştır → Save.
3. Sheets'e dön. "Öneriler" sekmesinde son iki kolonu manuel ekle:
     - "Onayla"  (Insert → Checkbox)
     - "Durum"   (boş bırak, script dolduracak)
4. "Sözlük" adında ikinci sekme oluştur, başlıkları koy:
     Terim | İngilizce | Tanım | Örnek | İlgili
   Mevcut glossary.json içeriğini buraya import et.
5. Apps Script editöründe → soldaki saat ikonu (Triggers) → Add Trigger:
     - Function:    onEditApprove
     - Event source: From spreadsheet
     - Event type:   On edit
   İlk çalıştırmada Google izin isteyecek; onayla.
6. Sheets sayfasını yeniden yükle. Üst menüde "Sözlük → İşaretli önerileri
   aktar" görünür hale gelir (manuel toplu işlem için).

KULLANIM:
- Form yanıtı geldiğinde "Öneriler" sekmesinde yeni satır oluşur.
- Satırı incele, uygunsa "Onayla" checkbox'ını işaretle.
- Script otomatik olarak satırı "Sözlük" sekmesine kopyalar ve "Durum"
  sütununa "Aktarıldı YYYY-MM-DD HH:mm" yazar.
- Aynı terim zaten "Sözlük"te varsa atlanır, "Durum" kolonunda not edilir.
- Toplu işlem: Sözlük menüsü → "İşaretli önerileri aktar".

NOT: FIELD_MAP'teki anahtarlar formdaki *tam* başlıklarla eşleşmeli. Form
sorularını yeniden adlandırırsan bu map'i de güncelle.
============================================================================ */
