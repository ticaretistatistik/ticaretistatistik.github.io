/**
 * Build-time glossary fetcher.
 *
 * Pulls the glossary spreadsheet as CSV and writes src/data/glossary.json so
 * editors can manage terms in Google Sheets without touching the repo.
 *
 * Sheet columns (header row required, Turkish names accepted):
 *   A  Terim         -> term       (required)
 *   B  İngilizce     -> en
 *   C  Tanım         -> definition (required)
 *   D  Örnek         -> example
 *   E  İlgili        -> related    (semicolon- or comma-separated list)
 *
 * Configure via env var GLOSSARY_SHEET_CSV_URL. Two easy ways to obtain one:
 *   1. File > Share > "Anyone with the link" can View, then use:
 *      https://docs.google.com/spreadsheets/d/<SHEET_ID>/export?format=csv&gid=<GID>
 *   2. File > Share > Publish to web > CSV; gives a /pub?output=csv URL.
 *
 * If the env var is missing or the fetch fails, the existing committed JSON
 * is left untouched so builds never break on a transient Sheets outage.
 */

import {readFileSync, writeFileSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = join(__dirname, '..', 'src', 'data', 'glossary.json');

const SHEET_URL = process.env.GLOSSARY_SHEET_CSV_URL;

if (!SHEET_URL) {
  console.log('[glossary] GLOSSARY_SHEET_CSV_URL not set; keeping existing JSON.');
  process.exit(0);
}

// Header aliases — accept Turkish or English column names, case-insensitive.
const HEADER_MAP = {
  term: ['term', 'terim'],
  en: ['en', 'english', 'ingilizce', 'i̇ngilizce'],
  definition: ['definition', 'tanim', 'tanım'],
  example: ['example', 'ornek', 'örnek'],
  related: ['related', 'ilgili', 'i̇lgili', 'related terms'],
  contributor: ['contributor', 'katki', 'katkı', 'adin', 'adın'],
};

function normalizeHeader(h) {
  return String(h).trim().toLocaleLowerCase('tr-TR');
}

function resolveColumns(headerRow) {
  const cols = {};
  headerRow.forEach((raw, i) => {
    const h = normalizeHeader(raw);
    for (const [key, aliases] of Object.entries(HEADER_MAP)) {
      if (aliases.includes(h)) cols[key] = i;
    }
  });
  if (cols.term === undefined || cols.definition === undefined) {
    throw new Error(
      `Sheet must have at least "Terim" and "Tanım" columns. Got: ${headerRow.join(', ')}`,
    );
  }
  return cols;
}

// Minimal RFC 4180 CSV parser: supports quoted fields, embedded commas,
// embedded newlines, and "" -> " escaping. No external dep needed.
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  // Strip BOM if present.
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
      continue;
    }
    if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\r') {
      // swallow; \n handles row break
    } else if (c === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += c;
    }
  }
  // Flush last field/row.
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function splitRelated(s) {
  if (!s) return [];
  return s
    .split(/[;\n]|,\s+/g)
    .map((x) => x.trim())
    .filter(Boolean);
}

async function main() {
  console.log(`[glossary] Fetching ${SHEET_URL}`);
  const res = await fetch(SHEET_URL, {redirect: 'follow'});
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`);
  }
  const csv = await res.text();
  const rows = parseCsv(csv).filter((r) => r.some((c) => c && c.trim()));
  if (rows.length < 2) {
    throw new Error('Sheet appears empty (no data rows after header).');
  }
  const cols = resolveColumns(rows[0]);

  const terms = rows.slice(1).map((r) => {
    const get = (key) => (cols[key] !== undefined ? (r[cols[key]] || '').trim() : '');
    const term = get('term');
    if (!term) return null;
    const out = {term};
    const en = get('en');
    if (en) out.en = en;
    out.definition = get('definition');
    const example = get('example');
    if (example) out.example = example;
    const related = splitRelated(get('related'));
    if (related.length) out.related = related;
    const contributor = get('contributor');
    if (contributor) out.contributor = contributor;
    return out;
  }).filter(Boolean);

  // Sort with Turkish collation so the JSON diff is stable across builds.
  const trCollator = new Intl.Collator('tr-TR', {sensitivity: 'base'});
  terms.sort((a, b) => trCollator.compare(a.term, b.term));

  const json = JSON.stringify({terms}, null, 2) + '\n';
  writeFileSync(OUT_FILE, json, 'utf8');
  console.log(`[glossary] Wrote ${terms.length} terms to ${OUT_FILE}`);
}

main().catch((err) => {
  // Don't fail the whole build on a sheet hiccup — keep the committed JSON.
  console.warn(`[glossary] Skipping update: ${err.message}`);
  try {
    // Touch-read to make sure the existing file is parseable; otherwise warn loudly.
    JSON.parse(readFileSync(OUT_FILE, 'utf8'));
  } catch (e) {
    console.error(`[glossary] FATAL: existing ${OUT_FILE} is invalid JSON: ${e.message}`);
    process.exit(1);
  }
  process.exit(0);
});
