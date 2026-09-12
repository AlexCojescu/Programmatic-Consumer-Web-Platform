/**
 * Asset optimization pipeline: convert landing-page PNG/JPEGs into
 * AVIF/WebP (+ JPEG fallbacks) at explicit responsive widths.
 *
 * Run from repo root: `node scripts/optimize-images.mjs`
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const HERO_DIR = path.join(PUBLIC_DIR, "hero");
const HERO_WIDTHS = [800, 1280, 1920];

async function emitFormats(pipeline, destBase) {
  const avifPath = `${destBase}.avif`;
  const webpPath = `${destBase}.webp`;
  await Promise.all([
    pipeline.clone().avif({ quality: 55 }).toFile(avifPath),
    pipeline.clone().webp({ quality: 72 }).toFile(webpPath),
  ]);
  return { avifPath, webpPath };
}

async function optimizeHeroSlide(sourceName, destId, sourceDir = HERO_DIR) {
  const sourcePath = path.join(sourceDir, sourceName);
  try {
    await sharp(sourcePath).metadata();
  } catch {
    console.warn(`Skipping missing hero source: ${sourcePath}`);
    return;
  }
  const image = sharp(sourcePath);
  const meta = await image.metadata();
  const aspect = (meta.height ?? 1) / (meta.width ?? 1);

  for (const width of HERO_WIDTHS) {
    const height = Math.round(width * aspect);
    const resized = sharp(sourcePath).resize(width, height, {
      fit: "cover",
      withoutEnlargement: true,
    });
    await emitFormats(resized, path.join(HERO_DIR, `${destId}-${width}`));
  }

  const fallbackWidth = 1920;
  const fallbackHeight = Math.round(fallbackWidth * aspect);
  await sharp(sourcePath)
    .resize(fallbackWidth, fallbackHeight, {
      fit: "cover",
      withoutEnlargement: true,
    })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(path.join(HERO_DIR, `${destId}-fallback.jpg`));
}

async function optimizeStatic(sourceRel, destRel, { width, height }) {
  const sourcePath = path.join(PUBLIC_DIR, sourceRel);
  try {
    await sharp(sourcePath).metadata();
  } catch {
    console.warn(`Skipping missing static source: ${sourcePath}`);
    return;
  }
  const destBase = path.join(PUBLIC_DIR, destRel.replace(/\.(avif|webp)$/, ""));
  await mkdir(path.dirname(destBase), { recursive: true });
  const pipeline = sharp(sourcePath).resize(width, height, {
    fit: "inside",
    withoutEnlargement: true,
  });
  await emitFormats(pipeline, destBase);
}

async function main() {
  await mkdir(HERO_DIR, { recursive: true });

  await optimizeHeroSlide("slide-2.jpeg", "slide-2");
  await optimizeHeroSlide("slide-3.jpeg", "slide-3");
  await optimizeHeroSlide("slide-4.jpeg", "slide-4");
  await optimizeHeroSlide("slide-1-poster.webp", "slide-1-poster");

  await optimizeStatic("agent01.png", "agent01.webp", { width: 800, height: 800 });
  await optimizeStatic("agent03.png", "agent03.webp", { width: 800, height: 800 });
  await optimizeStatic("agent04.png", "agent04.webp", { width: 800, height: 800 });
  await optimizeStatic("Logo1.png", "Logo1.webp", { width: 260, height: 90 });
  await optimizeStatic("wreath left.png", "wreath-left.webp", {
    width: 90,
    height: 300,
  });
  await optimizeStatic("wreath right.png", "wreath-right.webp", {
    width: 90,
    height: 300,
  });
  await optimizeStatic("Slack.png", "Slack.webp", { width: 160, height: 160 });
  await optimizeStatic("shopify.png", "shopify.webp", { width: 160, height: 160 });
  await optimizeStatic("SystemsIntegrator.png", "SystemsIntegrator.webp", {
    width: 160,
    height: 160,
  });
  await optimizeStatic("zapier.png", "zapier.webp", { width: 160, height: 80 });
  await optimizeStatic("make.png", "make.webp", { width: 160, height: 80 });
  await optimizeStatic("Apollo.png", "Apollo.webp", { width: 160, height: 80 });
  await optimizeStatic("Creator.png", "Creator.webp", { width: 400, height: 400 });
  await sharp(path.join(PUBLIC_DIR, "programmatic-social-card.png"))
    .resize(1200, 630, { fit: "cover" })
    .webp({ quality: 80 })
    .toFile(path.join(PUBLIC_DIR, "programmatic-social-card.webp"));

  const manifest = {
    heroWidths: HERO_WIDTHS,
    generatedAt: new Date().toISOString(),
  };
  await writeFile(
    path.join(HERO_DIR, "manifest.json"),
    JSON.stringify(manifest, null, 2)
  );

  console.log("Image optimization complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
