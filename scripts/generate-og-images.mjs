/**
 * Build-time OG image generator.
 *
 * Walks blog/**\/index.md, renders a 1200×630 editorial card per post,
 * writes to static/img/og/<slug>.png. Runs automatically via `npm run
 * prebuild` before `docusaurus build`.
 */

import {readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

import {createCanvas, GlobalFonts} from '@napi-rs/canvas';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BLOG_DIR = join(ROOT, 'blog');
const OUT_DIR = join(ROOT, 'static', 'img', 'og');

// --- Register fonts ---------------------------------------------------------
const FONT_DIR_INTER = join(ROOT, 'node_modules', '@fontsource', 'inter', 'files');
const FONT_DIR_FRAUNCES = join(ROOT, 'node_modules', '@fontsource', 'fraunces', 'files');

try {
  // Google Fonts splits `latin` (basic ASCII) and `latin-ext` (Turkish İ, ğ,
  // ş, ç, vb.) into separate files that don't overlap. Register each under
  // a distinct family name so canvas can fall back across them via the
  // CSS-style font stack we use in ctx.font (e.g. '"Inter Ext", "Inter"').
  const interWeights = ['400', '500', '600', '700'];
  const frauncesWeights = ['500', '600'];

  for (const w of interWeights) {
    GlobalFonts.registerFromPath(join(FONT_DIR_INTER, `inter-latin-${w}-normal.woff`), 'Inter');
    GlobalFonts.registerFromPath(join(FONT_DIR_INTER, `inter-latin-ext-${w}-normal.woff`), 'InterExt');
  }
  for (const w of frauncesWeights) {
    GlobalFonts.registerFromPath(join(FONT_DIR_FRAUNCES, `fraunces-latin-${w}-normal.woff`), 'Fraunces');
    GlobalFonts.registerFromPath(join(FONT_DIR_FRAUNCES, `fraunces-latin-ext-${w}-normal.woff`), 'FrauncesExt');
  }
  GlobalFonts.registerFromPath(join(FONT_DIR_FRAUNCES, 'fraunces-latin-500-italic.woff'), 'FrauncesItalic');
  GlobalFonts.registerFromPath(join(FONT_DIR_FRAUNCES, 'fraunces-latin-ext-500-italic.woff'), 'FrauncesItalicExt');
} catch (err) {
  console.warn('[og-images] Font registration failed, will use fallbacks:', err.message);
}

// --- Design tokens (OG card is 1200×630) -----------------------------------
const BRAND = {
  yellow: '#f5cf06',
  yellowSoft: '#fef3b5',
  yellowDeep: '#c9a804',
  ink: '#0f1729',
  inkMuted: '#475569',
  inkSubtle: '#64748b',
  cream: '#fbfaf7',
  white: '#ffffff',
  border: '#e0ded6',
  slate: '#cbd5e1',
};

const W = 1200;
const H = 630;
const PAD_X = 72;
const HEADER_H = 120;

// Put the -Ext family first so canvas tries Turkish glyphs (İ, ğ, ş) there
// before falling back to the basic Latin file.
const FONT_SANS = '"InterExt", "Inter", sans-serif';
const FONT_SERIF = '"FrauncesExt", "Fraunces", Georgia, serif';

// --- Main --------------------------------------------------------------------
function main() {
  if (!existsSync(BLOG_DIR)) {
    console.warn('[og-images] blog/ not found, skipping');
    return;
  }

  mkdirSync(OUT_DIR, {recursive: true});
  const posts = findBlogPosts(BLOG_DIR);

  if (posts.length === 0) {
    console.log('[og-images] No blog posts found');
    return;
  }

  let ok = 0;
  for (const post of posts) {
    try {
      const png = renderCard(post);
      const outPath = join(OUT_DIR, `${post.slug}.png`);
      writeFileSync(outPath, png);
      ok += 1;
    } catch (err) {
      console.warn(`[og-images] Failed for ${post.slug}:`, err.message);
    }
  }

  console.log(`[og-images] Generated ${ok}/${posts.length} cards in static/img/og/`);
}

function findBlogPosts(dir) {
  const entries = readdirSync(dir, {withFileTypes: true});
  const posts = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const postDir = join(dir, entry.name);
    const indexPath = join(postDir, 'index.md');
    if (!existsSync(indexPath)) continue;

    const raw = readFileSync(indexPath, 'utf8');
    const {data, content} = matter(raw);
    const slug = data.slug || folderToSlug(entry.name);
    const dateStr = extractDate(entry.name, data.date);
    const description = data.description || firstParagraph(content) || '';
    const tags = normalizeTags(data.tags);

    posts.push({
      slug,
      title: data.title || 'Ticaret İstatistik',
      description,
      date: dateStr,
      tags,
    });
  }
  return posts;
}

function folderToSlug(folderName) {
  // strip leading YYYY-MM-DD-
  const match = folderName.match(/^\d{4}-\d{2}-\d{2}-(.+)$/);
  return match ? match[1] : folderName;
}

function extractDate(folderName, frontmatterDate) {
  if (frontmatterDate) {
    const d = new Date(frontmatterDate);
    if (!isNaN(d)) return d;
  }
  const match = folderName.match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? new Date(match[1]) : null;
}

function firstParagraph(content) {
  // Stop at the first truncate comment (that's the designated excerpt end).
  const truncateIdx = content.indexOf('<!-- truncate -->');
  const excerpt = truncateIdx > -1 ? content.slice(0, truncateIdx) : content;

  const lines = excerpt
    .split('\n')
    .map((l) => l.trim())
    .filter(
      (l) =>
        l &&
        !l.startsWith('#') &&
        !l.startsWith('<!--') &&
        !l.startsWith('![') &&
        !l.startsWith('>') &&
        !l.startsWith('```') &&
        !l.startsWith('|'),
    );

  const para = lines.slice(0, 3).join(' ');
  return stripMarkdown(para).slice(0, 240);
}

function stripMarkdown(s) {
  return s
    // images ![alt](url)
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    // links [text](url) → text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // bold **text** / __text__
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    // italic *text* / _text_
    .replace(/(^|[\s(])\*([^*\s][^*]*?)\*/g, '$1$2')
    .replace(/(^|[\s(])_([^_\s][^_]*?)_/g, '$1$2')
    // inline code `text`
    .replace(/`([^`]+)`/g, '$1')
    // leftover emphasis markers
    .replace(/[*_]{1,3}/g, '')
    // collapse whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeTags(tags) {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.map((t) => String(t.label || t));
  return [String(tags)];
}

// --- Rendering --------------------------------------------------------------
function renderCard(post) {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // Body bg
  ctx.fillStyle = BRAND.cream;
  ctx.fillRect(0, 0, W, H);

  // Yellow glow top-right
  const grad = ctx.createRadialGradient(W - 80, 80, 20, W - 80, 80, 420);
  grad.addColorStop(0, 'rgba(245, 207, 6, 0.35)');
  grad.addColorStop(1, 'rgba(245, 207, 6, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Header band
  ctx.fillStyle = BRAND.ink;
  ctx.fillRect(0, 0, W, HEADER_H);

  // Yellow accent bar
  ctx.fillStyle = BRAND.yellow;
  ctx.fillRect(0, HEADER_H, W, 6);

  // Header: brand mark + URL
  const midY = HEADER_H / 2;

  ctx.fillStyle = BRAND.yellow;
  ctx.beginPath();
  ctx.arc(PAD_X + 8, midY, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = BRAND.white;
  ctx.font = `600 22px ${FONT_SANS}`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  trackedText(ctx, 'TİCARET İSTATİSTİK · BLOG', PAD_X + 32, midY, 2.2);

  ctx.textAlign = 'right';
  ctx.fillStyle = BRAND.slate;
  ctx.font = `500 20px ${FONT_SANS}`;
  ctx.fillText('ticaretistatistik.com', W - PAD_X, midY);

  // Body content
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  let y = HEADER_H + 6 + 48;
  const maxW = W - PAD_X * 2;

  // Date eyebrow
  if (post.date) {
    const d = post.date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).toUpperCase();
    ctx.fillStyle = BRAND.inkSubtle;
    ctx.font = `600 16px ${FONT_SANS}`;
    trackedText(ctx, d, PAD_X, y, 2.4);
    y += 36;
  }

  // Title — large serif, auto-fit
  const {size: titleSize, lines: titleLines} = fitTitle(ctx, post.title, maxW);
  ctx.fillStyle = BRAND.ink;
  ctx.font = `600 ${titleSize}px ${FONT_SERIF}`;
  const lh = Math.round(titleSize * 1.1);

  titleLines.forEach((line, i) => {
    // highlighter behind last line (if short enough)
    if (i === titleLines.length - 1 && titleLines.length <= 3) {
      const lineW = Math.min(ctx.measureText(line).width, maxW);
      ctx.fillStyle = BRAND.yellow;
      ctx.fillRect(
        PAD_X - 2,
        y + Math.round(titleSize * 0.74),
        lineW + 4,
        Math.round(titleSize * 0.24),
      );
      ctx.fillStyle = BRAND.ink;
    }
    ctx.fillText(line, PAD_X, y);
    y += lh;
  });
  y += 24;

  // Description — 2 lines max
  if (post.description) {
    ctx.fillStyle = BRAND.inkMuted;
    ctx.font = `400 20px ${FONT_SANS}`;
    const wrapped = wrapText(ctx, post.description, maxW);
    const visible = wrapped.slice(0, 2);
    if (wrapped.length > 2) {
      visible[1] = truncate(ctx, visible[1], maxW);
    }
    visible.forEach((line) => {
      ctx.fillText(line, PAD_X, y);
      y += 30;
    });
  }

  // Bottom-left: tags
  if (post.tags.length) {
    const tagY = H - 64;
    ctx.font = `500 16px ${FONT_SANS}`;
    ctx.textBaseline = 'middle';
    let x = PAD_X;
    for (const tag of post.tags.slice(0, 4)) {
      const label = '#' + tag;
      const padH = 14;
      const padV = 8;
      const tw = ctx.measureText(label).width + padH * 2;
      if (x + tw > W - PAD_X - 200) break;
      roundedRect(ctx, x, tagY - 18, tw, 36, 18);
      ctx.fillStyle = BRAND.white;
      ctx.fill();
      ctx.strokeStyle = BRAND.border;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = BRAND.ink;
      ctx.fillText(label, x + padH, tagY + 1);
      x += tw + 8;
    }
  }

  // Bottom-right: read-more cue. Draw the arrow as a path (the Unicode
  // rightwards arrow isn't in the Inter subset we ship).
  const ctaY = H - 46;
  const ctaRight = W - PAD_X;
  const arrowW = 18;
  const arrowGap = 10;

  // Tick above the line
  ctx.fillStyle = BRAND.yellow;
  ctx.fillRect(ctaRight - 40, ctaY - 18, 40, 3);

  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = BRAND.ink;
  ctx.font = `600 17px ${FONT_SANS}`;
  trackedText(ctx, 'YAZININ DEVAMI SİTEDE', ctaRight - arrowW - arrowGap, ctaY, 1.6);

  // Chevron arrow (replaces missing U+2192)
  ctx.strokeStyle = BRAND.ink;
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(ctaRight - arrowW, ctaY);
  ctx.lineTo(ctaRight, ctaY);
  ctx.moveTo(ctaRight - 7, ctaY - 6);
  ctx.lineTo(ctaRight, ctaY);
  ctx.lineTo(ctaRight - 7, ctaY + 6);
  ctx.stroke();

  return canvas.toBuffer('image/png');
}

function fitTitle(ctx, title, maxW) {
  const sizes = [58, 54, 50, 46, 42, 38];
  let best = {size: 38, lines: [title]};
  for (const size of sizes) {
    ctx.font = `600 ${size}px ${FONT_SERIF}`;
    const lines = wrapText(ctx, title, maxW);
    if (lines.length <= 3) return {size, lines};
    best = {size, lines};
  }
  // fallback: truncate to 3 lines
  ctx.font = `600 ${best.size}px ${FONT_SERIF}`;
  best.lines = best.lines.slice(0, 3);
  best.lines[2] = truncate(ctx, best.lines[2], maxW);
  return best;
}

function wrapText(ctx, text, maxW) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    const test = line ? line + ' ' + w : w;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function truncate(ctx, text, maxW) {
  if (ctx.measureText(text).width <= maxW) return text;
  let t = text;
  while (ctx.measureText(t + '…').width > maxW && t.length > 1) {
    t = t.slice(0, -1);
  }
  return t + '…';
}

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function trackedText(ctx, text, x, y, tracking) {
  const initialAlign = ctx.textAlign;
  const chars = [...text];

  if (initialAlign === 'right') {
    // measure full width (chars + tracking), then draw left-aligned
    const widths = chars.map((c) => ctx.measureText(c).width);
    const total =
      widths.reduce((a, b) => a + b, 0) +
      tracking * Math.max(0, chars.length - 1);
    let cx = x - total;
    ctx.textAlign = 'left';
    for (let i = 0; i < chars.length; i++) {
      ctx.fillText(chars[i], cx, y);
      cx += widths[i] + tracking;
    }
    ctx.textAlign = initialAlign;
  } else {
    let cx = x;
    for (const ch of chars) {
      ctx.fillText(ch, cx, y);
      cx += ctx.measureText(ch).width + tracking;
    }
  }
}

main();
