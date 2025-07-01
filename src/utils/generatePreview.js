export async function generateBlogPreviewImage({
  title,
  description,
  tags,
  permalink,
  date,
}) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const width = 1080;
  const height = 1920;
  canvas.width = width;
  canvas.height = height;

  // Arka plan
  ctx.fillStyle = "#111111";
  ctx.fillRect(0, 0, width, height);

  // Ayarlar
  ctx.textBaseline = "top";
  const paddingX = 80;
  let y = 100;

  // Tarih
  ctx.fillStyle = "#bbbbbb";
  ctx.font = "36px sans-serif";
  ctx.fillText(new Date(date).toLocaleDateString("tr-TR"), paddingX, y);
  y += 70;

  // Başlık
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 60px sans-serif";
  wrapText(ctx, title, width - 2 * paddingX).forEach((line) => {
    ctx.fillText(line, paddingX, y);
    y += 80;
  });

  y += 40;

  // Açıklama
  ctx.fillStyle = "#cccccc";
  ctx.font = "42px sans-serif";
  wrapText(ctx, description, width - 2 * paddingX).forEach((line) => {
    ctx.fillText(line, paddingX, y);
    y += 60;
  });

  y += 40;

  // Etiketler
  ctx.fillStyle = "#ff4081";
  ctx.font = "36px sans-serif";
  const tagText = tags.map((t) => `#${t.label}`).join("  ");
  wrapText(ctx, tagText, width - 2 * paddingX).forEach((line) => {
    ctx.fillText(line, paddingX, y);
    y += 50;
  });

  // URL
  const fullUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://ticaretistatistik.github.io${permalink}`;

  ctx.fillStyle = "#00e676";
  ctx.font = "36px monospace";
  const urlLines = wrapText(ctx, fullUrl, width - 2 * paddingX);
  const urlY = height - 40 * urlLines.length - 50; 
  urlLines.forEach((line, i) => {
    ctx.fillText(line, paddingX, urlY + i * 40);
  });

  return canvas.toDataURL("image/png");
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let line = "";

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + " ";
    const testWidth = ctx.measureText(testLine).width;

    if (testWidth > maxWidth && i > 0) {
      lines.push(line.trim());
      line = words[i] + " ";
    } else {
      line = testLine;
    }
  }

  lines.push(line.trim());
  return lines;
}