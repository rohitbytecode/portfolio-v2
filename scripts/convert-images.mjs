/**
 * convert-images.mjs
 * Converts .heic/.heif files in public/profile/ to .webp
 * Runs automatically via predev/prebuild npm hooks
 *
 * Pipeline: heic-convert (WASM decoder) → raw buffer → sharp (WebP encoder)
 */

import { readdir, readFile } from "node:fs/promises";
import { join, parse } from "node:path";
import convert from "heic-convert";
import sharp from "sharp";

const PROFILE_DIR = join(process.cwd(), "public", "profile");
const HEIC_EXTENSIONS = new Set([".heic", ".heif"]);

async function convertImages() {
  let files;
  try {
    files = await readdir(PROFILE_DIR);
  } catch {
    // Directory doesn't exist yet — nothing to convert
    return;
  }

  const heicFiles = files.filter((f) =>
    HEIC_EXTENSIONS.has(parse(f).ext.toLowerCase())
  );

  if (heicFiles.length === 0) return;

  const existingWebp = new Set(
    files.filter((f) => parse(f).ext === ".webp").map((f) => parse(f).name)
  );

  let converted = 0;

  for (const file of heicFiles) {
    const { name } = parse(file);

    if (existingWebp.has(name)) continue;

    const inputPath = join(PROFILE_DIR, file);
    const outputPath = join(PROFILE_DIR, `${name}.webp`);

    // Decode HEIC → JPEG buffer via WASM decoder
    const inputBuffer = await readFile(inputPath);
    const jpegBuffer = await convert({
      buffer: inputBuffer,
      format: "JPEG",
      quality: 0.95,
    });

    // Re-encode JPEG → WebP via sharp
    await sharp(jpegBuffer)
      .rotate() // auto-orient from EXIF
      .webp({ quality: 82 })
      .toFile(outputPath);

    converted++;
    console.log(`  converted: ${file} → ${name}.webp`);
  }

  if (converted > 0) {
    console.log(`\n  ${converted} image(s) converted to WebP\n`);
  }
}

convertImages().catch((err) => {
  console.error("Image conversion failed:", err.message);
  process.exit(1);
});
