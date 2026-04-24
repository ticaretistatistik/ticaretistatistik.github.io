/**
 * Editorial blog preview image generator (1080 × 1920, 9:16 story).
 * Palette + typography match the site's brand tokens.
 */

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

const CANVAS = {
  width: 1080,
  height: 1920,
  padding: 96,
  headerHeight: 360,
  accentBar: 8,
};

const FONT_STACK_SERIF = '"Fraunces", Georgia, "Times New Roman", serif';
const FONT_STACK_SANS =
  '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif';

async function ensureFonts() {
  if (typeof document === 'undefined' || !document.fonts) return;
  try {
    await Promise.all([
      document.fonts.load(`600 96px ${FONT_STACK_SERIF}`),
      document.fonts.load(`600 72px ${FONT_STACK_SERIF}`),
      document.fonts.load(`600 22px ${FONT_STACK_SANS}`),
      document.fonts.load(`500 26px ${FONT_STACK_SANS}`),
      document.fonts.load(`400 32px ${FONT_STACK_SANS}`),
      document.fonts.load(`600 28px ${FONT_STACK_SANS}`),
    ]);
    if (document.fonts.ready) await document.fonts.ready;
  } catch (_) {
    // continue with system fallbacks
  }
}

export async function generateBlogPreviewImage({
  title,
  description,
  tags = [],
  date,
  permalink,
}) {
  await ensureFonts();

  const canvas = document.createElement('canvas');
  canvas.width = CANVAS.width;
  canvas.height = CANVAS.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context unavailable');

  drawBackground(ctx);
  drawHeader(ctx);
  const bodyBottom = drawBody(ctx, {title, description, tags, date});
  drawFooter(ctx, {permalink, bodyBottom});

  return canvas.toDataURL('image/png');
}

function drawBackground(ctx) {
  // Body: warm cream
  ctx.fillStyle = BRAND.cream;
  ctx.fillRect(0, 0, CANVAS.width, CANVAS.height);
}

function drawHeader(ctx) {
  // Ink band
  ctx.fillStyle = BRAND.ink;
  ctx.fillRect(0, 0, CANVAS.width, CANVAS.headerHeight);

  // Subtle yellow glow top-right
  const grad = ctx.createRadialGradient(
    CANVAS.width - 100,
    60,
    40,
    CANVAS.width - 100,
    60,
    700,
  );
  grad.addColorStop(0, 'rgba(245, 207, 6, 0.22)');
  grad.addColorStop(1, 'rgba(245, 207, 6, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, CANVAS.width, CANVAS.headerHeight);

  // Yellow accent bar
  ctx.fillStyle = BRAND.yellow;
  ctx.fillRect(0, CANVAS.headerHeight, CANVAS.width, CANVAS.accentBar);

  const midY = CANVAS.headerHeight / 2;

  // Brand mark: small yellow dot + caps label
  ctx.fillStyle = BRAND.yellow;
  ctx.beginPath();
  ctx.arc(CANVAS.padding + 10, midY, 10, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = BRAND.white;
  ctx.font = `600 26px ${FONT_STACK_SANS}`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.save();
  ctx.translate(0, 1); // optical nudge so text sits on dot center
  trackedFillText(ctx, 'TİCARET İSTATİSTİK · BLOG', CANVAS.padding + 40, midY, 2.4);
  ctx.restore();

  // Site URL right
  ctx.textAlign = 'right';
  ctx.fillStyle = BRAND.slate;
  ctx.font = `500 26px ${FONT_STACK_SANS}`;
  ctx.fillText(
    'ticaretistatistik.com',
    CANVAS.width - CANVAS.padding,
    midY,
  );
}

function drawBody(ctx, {title, description, tags, date}) {
  const padX = CANVAS.padding;
  const maxWidth = CANVAS.width - padX * 2;
  let y = CANVAS.headerHeight + CANVAS.accentBar + 120;

  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  // Date (eyebrow)
  if (date) {
    const formatted = new Date(date)
      .toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
      .toUpperCase();
    ctx.fillStyle = BRAND.inkSubtle;
    ctx.font = `600 22px ${FONT_STACK_SANS}`;
    trackedFillText(ctx, formatted, padX, y, 2.8);
    y += 60;
  }

  // Title: large serif, auto-shrink so it never overflows
  if (title) {
    const {fontSize, lines} = fitTitle(ctx, title, maxWidth);
    ctx.fillStyle = BRAND.ink;
    ctx.font = `600 ${fontSize}px ${FONT_STACK_SERIF}`;
    const lineHeight = Math.round(fontSize * 1.12);

    lines.forEach((line, i) => {
      // Yellow highlighter under the last line for punch
      if (i === lines.length - 1 && lines.length <= 5) {
        const w = Math.min(
          ctx.measureText(line).width,
          maxWidth,
        );
        const highlightH = Math.round(fontSize * 0.28);
        ctx.fillStyle = BRAND.yellow;
        ctx.fillRect(
          padX - 2,
          y + Math.round(fontSize * 0.74),
          w + 4,
          highlightH,
        );
        ctx.fillStyle = BRAND.ink;
      }
      ctx.fillText(line, padX, y);
      y += lineHeight;
    });
    y += 48;
  }

  // Description: 3 lines max with ellipsis
  if (description) {
    ctx.fillStyle = BRAND.inkMuted;
    ctx.font = `400 32px ${FONT_STACK_SANS}`;
    const allLines = wrapText(ctx, description, maxWidth);
    const maxLines = 3;
    const visible = allLines.slice(0, maxLines);
    if (allLines.length > maxLines) {
      visible[maxLines - 1] = truncateToFit(
        ctx,
        visible[maxLines - 1],
        maxWidth,
      );
    }
    const lineHeight = 48;
    visible.forEach((line) => {
      ctx.fillText(line, padX, y);
      y += lineHeight;
    });
    y += 64;
  }

  // Tags: outlined pills
  if (tags && tags.length) {
    ctx.font = `500 26px ${FONT_STACK_SANS}`;
    const pillH = 56;
    const pillPadX = 26;
    const gap = 14;
    let x = padX;
    const visibleTags = tags.slice(0, 5);

    for (const tag of visibleTags) {
      const label = '#' + String(tag.label || tag);
      const textW = ctx.measureText(label).width;
      const w = textW + pillPadX * 2;
      if (x + w > CANVAS.width - padX) {
        x = padX;
        y += pillH + gap;
      }
      drawRoundedRect(ctx, x, y, w, pillH, pillH / 2);
      ctx.fillStyle = BRAND.white;
      ctx.fill();
      ctx.strokeStyle = BRAND.border;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = BRAND.ink;
      ctx.textBaseline = 'middle';
      ctx.fillText(label, x + pillPadX, y + pillH / 2 + 1);
      ctx.textBaseline = 'top';

      x += w + gap;
    }
    y += pillH;
  }

  return y;
}

function drawFooter(ctx, {permalink}) {
  const padX = CANVAS.padding;
  const footerY = CANVAS.height - padX - 20;

  // Top hairline separator
  ctx.strokeStyle = BRAND.border;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padX, footerY - 72);
  ctx.lineTo(CANVAS.width - padX, footerY - 72);
  ctx.stroke();

  // Yellow tick
  ctx.fillStyle = BRAND.yellow;
  ctx.fillRect(padX, footerY - 72, 56, 4);

  // Left: CTA text
  ctx.fillStyle = BRAND.ink;
  ctx.font = `600 26px ${FONT_STACK_SANS}`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  trackedFillText(ctx, 'YAZININ DEVAMI SİTEDE', padX, footerY, 2.4);

  // Right: permalink
  if (permalink) {
    ctx.textAlign = 'right';
    ctx.fillStyle = BRAND.inkSubtle;
    ctx.font = `500 22px ${FONT_STACK_SANS}`;
    const url = `ticaretistatistik.com${permalink}`;
    const fit = truncateToFit(ctx, url, CANVAS.width / 2 - padX);
    ctx.fillText(fit, CANVAS.width - padX, footerY);
  }
}

/* -------------------- helpers -------------------- */

function fitTitle(ctx, title, maxWidth) {
  // Tries font sizes from 104 → 64, picks the largest that keeps ≤ 4 lines.
  const sizes = [104, 98, 92, 86, 80, 74, 68, 64];
  let best = {fontSize: 64, lines: [title]};
  for (const size of sizes) {
    ctx.font = `600 ${size}px ${FONT_STACK_SERIF}`;
    const lines = wrapText(ctx, title, maxWidth);
    if (lines.length <= 4) {
      best = {fontSize: size, lines};
      break;
    }
    best = {fontSize: size, lines};
  }
  // If still more than 4 lines at smallest size, truncate last line
  if (best.lines.length > 4) {
    ctx.font = `600 ${best.fontSize}px ${FONT_STACK_SERIF}`;
    const kept = best.lines.slice(0, 4);
    kept[3] = truncateToFit(ctx, kept[3], maxWidth);
    best.lines = kept;
  }
  return best;
}

function wrapText(ctx, text, maxWidth) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? current + ' ' + word : word;
    if (ctx.measureText(candidate).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function truncateToFit(ctx, text, maxWidth) {
  if (ctx.measureText(text).width <= maxWidth) return text;
  let t = text;
  while (ctx.measureText(t + '…').width > maxWidth && t.length > 1) {
    t = t.slice(0, -1);
  }
  return t + '…';
}

function drawRoundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Canvas doesn't support letter-spacing on fillText — emulate for uppercase
// eyebrows by drawing chars individually. Small tracking (1.5–3 px) reads
// as "editorial".
function trackedFillText(ctx, text, x, y, tracking = 2) {
  const chars = [...text];
  let cx = x;
  for (const ch of chars) {
    ctx.fillText(ch, cx, y);
    cx += ctx.measureText(ch).width + tracking;
  }
}
