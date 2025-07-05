const constants = {
  // Dimensions for the blog preview image
  width: 1080,
  height: 1920,

  // 3:9 Layout calculations
  headerHeight: 480, // 25% of height
  mainHeight: 1440, // 75% of height

  // Spacing and padding
  paddingX: 80,
  headerPadding: 60,
  lineSpacing: {
    date: 70,
    title: 80,
    description: 60,
    tags: 50,
    section: 40
  },

  // Typography
  fonts: {
    date: "36px sans-serif",
    title: "bold 60px sans-serif",
    description: "42px sans-serif",
    tags: "36px sans-serif"
  },

  // Colors
  lightBackgroundColor: "#f0f0f0",
  darkBackgroundColor: "#333333",
  textColors: {
    date: "#cccccc",
    title: "#ffffff",
    description: "#e0e0e0",
    tags: "#ff4081"
  },

  // Logo settings
  logoImageSrc: "/img/logo.png",
  logoMaxSize: 200,
  logoSizeRatio: 0.6
};

export async function generateBlogPreviewImage({
  title,
  description,
  tags = [],
  date,
}) {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Could not get canvas context");
    }

    const {
      width,
      height,
      headerHeight,
      mainHeight,
      lightBackgroundColor,
      darkBackgroundColor,
    } = constants;
    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = lightBackgroundColor;
    ctx.fillRect(0, 0, width, headerHeight);

    ctx.fillStyle = darkBackgroundColor;
    ctx.fillRect(0, headerHeight, width, mainHeight);

    // Load and draw logo
    await drawLogo(ctx, width, headerHeight);

    drawContent(ctx, {
      title,
      description,
      tags,
      date,
    });

    return canvas.toDataURL("image/png");
  } catch (error) {
    console.error("Error generating blog preview image:", error);
    throw error;
  }
}

async function drawLogo(ctx, width, headerHeight) {
  return new Promise((resolve) => {
    const logo = new Image();

    logo.onload = () => {
      const logoSize = Math.min(
        headerHeight * constants.logoSizeRatio,
        constants.logoMaxSize,
      );
      const logoX = (width - logoSize) / 2;
      const logoY = (headerHeight - logoSize) / 2;

      ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
      resolve();
    };

    logo.onerror = () => {
      console.warn("Failed to load logo image");
      resolve(); // Continue without logo
    };

    logo.src = constants.logoImageSrc;
  });
}

function drawContent(ctx, { title, description, tags, date }) {
  ctx.textBaseline = "top";
  const { paddingX, headerHeight, lineSpacing, fonts, textColors } = constants;
  let y = headerHeight + constants.headerPadding;

  // Date
  if (date) {
    ctx.fillStyle = textColors.date;
    ctx.font = fonts.date;
    ctx.fillText(new Date(date).toLocaleDateString("tr-TR"), paddingX, y);
    y += lineSpacing.date;
  }

  // Title
  if (title) {
    ctx.fillStyle = textColors.title;
    ctx.font = fonts.title;
    const titleLines = wrapText(ctx, title, constants.width - 2 * paddingX);
    titleLines.forEach((line) => {
      ctx.fillText(line, paddingX, y);
      y += lineSpacing.title;
    });
    y += lineSpacing.section;
  }

  // Description
  if (description) {
    ctx.fillStyle = textColors.description;
    ctx.font = fonts.description;
    const descLines = wrapText(
      ctx,
      description,
      constants.width - 2 * paddingX,
    );
    descLines.forEach((line) => {
      ctx.fillText(line, paddingX, y);
      y += lineSpacing.description;
    });
    y += lineSpacing.section;
  }

  // Tags
  if (tags && tags.length > 0) {
    ctx.fillStyle = textColors.tags;
    ctx.font = fonts.tags;
    const tagText = tags.map((t) => `#${t.label || t}`).join("  ");
    const tagLines = wrapText(ctx, tagText, constants.width - 2 * paddingX);
    tagLines.forEach((line) => {
      ctx.fillText(line, paddingX, y);
      y += lineSpacing.tags;
    });
  }
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

  if (line.trim()) {
    lines.push(line.trim());
  }

  return lines;
}
