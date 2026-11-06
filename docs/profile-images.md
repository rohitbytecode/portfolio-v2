# Profile Images & Carousel

*Last updated: 12 Feb 2026*

The About section displays profile photos in an auto-advancing carousel with manual dot navigation.

## Architecture Overview

```
public/profile/*.heic ──► scripts/convert-images.mjs ──► public/profile/*.webp
                              (predev / prebuild)

src/lib/profile.ts ── getProfileImages() ──► src/app/page.tsx ──► <About profileImages={[...]} />
   (build-time fs read)                        (server component)       (client component)
```

## How to Add Photos

1. Drop `.heic`, `.heif`, `.jpg`, `.png`, or `.webp` files into `public/profile/`
2. Run `npm run dev` or `npm run build` — HEIC files are auto-converted to `.webp`
3. The carousel picks them up automatically (sorted alphabetically by filename)

## HEIC Conversion Pipeline

**Script:** `scripts/convert-images.mjs`

Runs via npm `predev`/`prebuild` hooks before the Next.js dev server or build starts.

### Pipeline stages

1. **Read** — scans `public/profile/` for `.heic`/`.heif` files
2. **Skip** — if a `.webp` with the same stem name exists, the file is skipped (idempotent)
3. **Decode** — `heic-convert` (WASM-based HEVC decoder) converts HEIC → JPEG buffer in memory
4. **Encode** — `sharp` re-encodes the JPEG buffer → `.webp` (quality 82, auto-orient from EXIF)

### Why two libraries?

Sharp's prebuilt `libvips` binary excludes the HEVC codec due to MPEG-LA patent licensing. `heic-convert` uses a WASM decoder (`libheif-js`) that sidesteps this. Sharp handles the WebP encoding.

### Dependencies

- `heic-convert` — WASM-based HEIC/HEVC decoder
- `sharp` — image processing (WebP encoding, EXIF auto-orient)

## Image Reader

**File:** `src/lib/profile.ts`

`getProfileImages()` runs at build time (server-only). It reads `public/profile/`, filters for web-compatible extensions (`.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`), sorts alphabetically, and returns paths like `/profile/IMG_5546.webp`.

## Carousel Component

**File:** `src/components/sections/About.tsx`

- Auto-advances every **3 seconds** via `setInterval`
- Transition: scale + fade (incoming zooms from 1.05→1, outgoing shrinks to 0.97) with 0.6s cubic-bezier ease
- Manual navigation via dot indicators at the bottom
- Uses Framer Motion `AnimatePresence` with `mode="wait"` for clean exit→enter sequencing
- Gracefully handles 0 images (shows placeholder) or 1 image (no animation, no dots)

## Key Files

| File | Purpose |
|------|---------|
| `scripts/convert-images.mjs` | HEIC → WebP conversion script |
| `src/lib/profile.ts` | Build-time image path reader |
| `src/components/sections/About.tsx` | Carousel UI + auto-advance logic |
| `src/app/page.tsx` | Passes `profileImages` prop to About |
| `public/profile/` | Image source directory |

## Gitignore

Generated `.webp` files are gitignored (`public/profile/*.webp`). Only original `.heic`/`.jpg` files are committed.
