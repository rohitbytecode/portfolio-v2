import fs from "fs";
import path from "path";

const PROFILE_DIR = path.join(process.cwd(), "public", "profile");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

/** Reads profile images from public/profile/ at build time. */
export function getProfileImages(): string[] {
  try {
    if (!fs.existsSync(PROFILE_DIR)) return ["/profile/rohit.png"];
    const files = fs
      .readdirSync(PROFILE_DIR)
      .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
      .sort()
      .map((file) => `/profile/${file}`);
    return files.length > 0 ? files : ["/profile/rohit.png"];
  } catch {
    return ["/profile/rohit.png"];
  }
}
