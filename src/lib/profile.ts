import fs from "fs";
import path from "path";

const PROFILE_DIR = path.join(process.cwd(), "public", "profile");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

/** Reads profile images from public/profile/ at build time. */
export function getProfileImages(): string[] {
  try {
    if (!fs.existsSync(PROFILE_DIR)) return [];
    return fs
      .readdirSync(PROFILE_DIR)
      .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
      .sort()
      .map((file) => `/profile/${file}`);
  } catch {
    return [];
  }
}
