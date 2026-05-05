/**
 * Build-time favicon generator.
 *
 * Source icon (static/img/istatistik_ticaret_seffaf_sari_ikon.png) is a wide
 * rectangle (~1.83:1). Browsers force favicons into a square box, which
 * squishes the artwork. We render the icon onto a transparent square canvas
 * with proportional letterboxing so it stays correctly proportioned at any
 * favicon size.
 *
 * Output: static/img/favicon.png (512x512, transparent background).
 * Runs as part of `npm run prebuild`.
 */

import {readFileSync, writeFileSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

import {createCanvas, loadImage} from '@napi-rs/canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC = join(ROOT, 'static', 'img', 'istatistik_ticaret_seffaf_sari_ikon.png');
const OUT_FAVICON = join(ROOT, 'static', 'img', 'favicon.png');
const OUT_ICON_TIGHT = join(ROOT, 'static', 'img', 'icon-cropped.png');

const FAVICON_SIZE = 512;
const ICON_SIZE = 512;
// Çok küçük bir nefes payı — kenarlara dayansın istiyoruz çünkü kaynak
// ikon zaten yatay ve kareye sığdırırken zaten dikeyde boşluk kalıyor.
const PADDING_RATIO = 0.02;
// Alpha eşiği (0-255). Bunun altındaki pikseller "boş" sayılır.
const ALPHA_THRESHOLD = 10;

// Kaynak ikondaki opak (görünür) içeriğin sıkı bbox'ını bul. Çevresindeki
// transparan margin atılır → ikon kareye en agresif şekilde sığar.
function findOpaqueBounds(ctx, w, h) {
  const {data} = ctx.getImageData(0, 0, w, h);
  let minX = w, minY = h, maxX = -1, maxY = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const alpha = data[(y * w + x) * 4 + 3];
      if (alpha > ALPHA_THRESHOLD) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return {x: 0, y: 0, w, h}; // tamamen transparansa fallback
  return {x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1};
}

function renderTightCrop(img, bb, size, padding_ratio) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, size, size);
  const padding = size * padding_ratio;
  const inner = size - padding * 2;
  const ratio = Math.min(inner / bb.w, inner / bb.h);
  const drawW = bb.w * ratio;
  const drawH = bb.h * ratio;
  const drawX = (size - drawW) / 2;
  const drawY = (size - drawH) / 2;
  ctx.drawImage(img, bb.x, bb.y, bb.w, bb.h, drawX, drawY, drawW, drawH);
  return canvas;
}

async function main() {
  const img = await loadImage(readFileSync(SRC));

  // Kaynağı offscreen canvas'a çiz, opak bbox'ı bul.
  const probe = createCanvas(img.width, img.height);
  const probeCtx = probe.getContext('2d');
  probeCtx.drawImage(img, 0, 0);
  const bb = findOpaqueBounds(probeCtx, img.width, img.height);
  console.log(
    `[favicon] Kaynak: ${img.width}x${img.height}, opak bbox: ${bb.w}x${bb.h} @ (${bb.x},${bb.y})`,
  );

  // 1) Browser sekme ikonu: 2% padding, kare.
  const fav = renderTightCrop(img, bb, FAVICON_SIZE, PADDING_RATIO);
  writeFileSync(OUT_FAVICON, await fav.encode('png'));
  console.log(`[favicon] Wrote ${FAVICON_SIZE}x${FAVICON_SIZE} favicon to ${OUT_FAVICON}`);

  // 2) Avatar/general use: padding'siz, daire içinde ortalanınca tam dolsun.
  const tight = renderTightCrop(img, bb, ICON_SIZE, 0);
  writeFileSync(OUT_ICON_TIGHT, await tight.encode('png'));
  console.log(`[favicon] Wrote ${ICON_SIZE}x${ICON_SIZE} tight icon to ${OUT_ICON_TIGHT}`);
}

main().catch((err) => {
  console.error('[favicon] Failed:', err);
  process.exit(1);
});
