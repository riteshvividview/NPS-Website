import { createHash } from "node:crypto";
import { cp, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const sourceRoot = path.resolve(projectRoot, "..", "organized_images");
const outputRoot = path.join(projectRoot, "public", "gallery");
const manifestPath = path.join(projectRoot, "content", "galleryManifest.json");
const supported = new Set([".jpg", ".jpeg", ".png", ".webp", ".bmp", ".gif", ".tif", ".tiff", ".heic", ".heif", ".avif", ".jfif"]);

function laplacianVariance(gray, width, height) {
  let sum = 0;
  let sumSquares = 0;
  let count = 0;
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const i = y * width + x;
      const value = 4 * gray[i] - gray[i - 1] - gray[i + 1] - gray[i - width] - gray[i + width];
      sum += value;
      sumSquares += value * value;
      count += 1;
    }
  }
  const mean = sum / count;
  return Math.max(0, sumSquares / count - mean * mean);
}

async function analyze(filePath) {
  try {
    const image = sharp(filePath, { animated: false, failOn: "none" });
    const metadata = await image.metadata();
    const { data, info } = await image.clone().rotate().resize(180, 180, { fit: "inside" }).greyscale().raw().toBuffer({ resolveWithObject: true });
    let sum = 0;
    let squares = 0;
    let clipped = 0;
    for (const px of data) {
      sum += px;
      squares += px * px;
      if (px < 8 || px > 247) clipped += 1;
    }
    const mean = sum / data.length;
    const deviation = Math.sqrt(Math.max(0, squares / data.length - mean * mean));
    const sharpness = laplacianVariance(data, info.width, info.height);
    const swapsOrientation = [5, 6, 7, 8].includes(metadata.orientation ?? 0);
    const width = swapsOrientation ? metadata.height ?? 0 : metadata.width ?? 0;
    const height = swapsOrientation ? metadata.width ?? 0 : metadata.height ?? 0;
    const pixels = width * height;
    const resolutionScore = Math.min(1, Math.log2(Math.max(1, pixels) / 150_000) / Math.log2(12_000_000 / 150_000));
    const focusScore = Math.min(1, Math.log10(1 + sharpness) / Math.log10(1 + 900));
    const exposureScore = Math.max(0, 1 - Math.abs(mean - 128) / 128);
    const contrastScore = Math.min(1, deviation / 72);
    const clippingScore = 1 - clipped / data.length;
    const score = Math.round(Math.max(0, Math.min(100,
      30 * Math.max(0, resolutionScore) +
      32 * focusScore +
      18 * exposureScore +
      14 * contrastScore +
      6 * clippingScore
    )) * 100) / 100;
    return { width, height, score, sharpness: Math.round(sharpness * 100) / 100, brightness: Math.round(mean * 100) / 100, contrast: Math.round(deviation * 100) / 100 };
  } catch {
    return { width: 0, height: 0, score: 0, sharpness: 0, brightness: 0, contrast: 0 };
  }
}

await mkdir(outputRoot, { recursive: true });
const categories = (await readdir(sourceRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b));
const files = [];
const hashToUrl = new Map();

for (const category of categories) {
  const categorySource = path.join(sourceRoot, category);
  const categoryOutput = path.join(outputRoot, category);
  await mkdir(categoryOutput, { recursive: true });
  const names = (await readdir(categorySource, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && supported.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  for (const name of names) {
    const sourceFile = path.join(categorySource, name);
    const bytes = await readFile(sourceFile);
    const hash = createHash("sha256").update(bytes).digest("hex");
    if (hashToUrl.has(hash)) continue;
    const targetFile = path.join(categoryOutput, name);
    await cp(sourceFile, targetFile);
    const extension = path.extname(name).toLowerCase();
    let displayName = name;
    let displayable = true;
    if (extension === ".heic" || extension === ".heif") {
      displayName = `${path.basename(name, extension)}.webp`;
      try {
        await sharp(sourceFile).rotate().webp({ quality: 90, effort: 4 }).toFile(path.join(categoryOutput, displayName));
      } catch {
        displayName = name;
        displayable = false;
      }
    }
    const url = `/gallery/${encodeURIComponent(category)}/${encodeURIComponent(displayName)}`;
    const metrics = await analyze(sourceFile);
    files.push({ id: hash.slice(0, 16), src: url, original: `/gallery/${encodeURIComponent(category)}/${encodeURIComponent(name)}`, displayable, category, name, ...metrics });
    hashToUrl.set(hash, url);
  }
}

files.sort((a, b) => b.score - a.score || a.category.localeCompare(b.category) || a.name.localeCompare(b.name, undefined, { numeric: true }));
const manifest = { generatedAt: new Date().toISOString(), algorithm: "resolution-focus-exposure-contrast-v1", categories, images: files };
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Generated ${files.length} image records in ${categories.length} categories.`);
console.log(`Top image: ${files[0]?.src} (score ${files[0]?.score}, ${files[0]?.width}×${files[0]?.height})`);
