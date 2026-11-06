# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

*Last updated: 15 Feb 2026*

## Commands

- **Dev server**: `npm run dev` (runs on port 3001; `predev` auto-converts HEIC images)
- **Build**: `npm run build` (`prebuild` auto-converts HEIC images)
- **Lint**: `npm run lint` (ESLint with Next.js core-web-vitals + TypeScript rules)
- **Start prod**: `npm run start`

## Architecture

Portfolio site built with **Next.js 16** (App Router), **React 19**, **Tailwind CSS v4**, **Framer Motion**, and **TypeScript**. Contains a homepage (all sections) and a markdown-powered blog with SSG.

### Path alias

`~/` maps to `./src/` (configured in tsconfig.json). Always use `~/` for imports.

### Routes

| Route | File | Rendering |
|-------|------|-----------|
| `/` | `src/app/page.tsx` | Static — homepage with all sections |
| `/blog` | `src/app/blog/page.tsx` | Static — blog list page |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | SSG — individual blog posts via `generateStaticParams` |

### Source structure

- `src/app/` — App Router pages. `layout.tsx` loads fonts (Inter, JetBrains Mono, Playfair Display, Lora), metadata, and shared chrome (StarField, Navbar, Footer). `page.tsx` is the homepage composing all sections.
- `src/app/blog/` — Blog routes. `page.tsx` (list), `[slug]/page.tsx` (SSG post).
- `src/components/sections/` — Homepage sections rendered in order: Hero → About → Projects → TechStack → Experience → Blog → Testimonials → ResumeCTA → Contact
- `src/components/ui/` — Reusable UI components (Navbar, Footer, Button, AnimatedSection, BlogCard, cards, badges)
- `src/components/blog/` — Blog-specific components (BlogHeader, TableOfContents, ReadingProgress, BlogThemeProvider, BlogThemeToggle)
- `src/components/effects/` — Visual effects (StarField, CursorFollower, GradientOrb, DotGrid, GlowEffect)
- `src/data/` — Portfolio content as typed TypeScript constants (personal info, projects, skills, experience, testimonials, navigation, site-config). Blog data comes from `content/blog/` markdown, not `src/data/`.
- `src/types/data.ts` — Shared TypeScript interfaces for all data structures (including `BlogPostMeta`, `BlogPostFull`)
- `src/lib/blog.ts` — Blog parsing layer (server-only): reads markdown from `content/blog/`, parses frontmatter, renders HTML via unified pipeline (includes `rehype-raw` for raw HTML support), exports `extractHeadings()` for TOC
- `src/lib/profile.ts` — Build-time reader for profile images in `public/profile/`
- `src/lib/cn.ts` — `cn()` utility combining clsx + tailwind-merge
- `src/lib/motion.ts` — Reusable Framer Motion variants (fadeInUp, fadeIn, scaleIn, slideInLeft/Right, staggerContainer, staggerItem)
- `scripts/convert-images.mjs` — HEIC → WebP conversion script (runs via predev/prebuild hooks)
- `src/hooks/useActiveSection.ts` — IntersectionObserver hook for navbar active state (homepage only)
- `content/blog/` — Markdown blog posts with YAML frontmatter (project root, not inside `src/`)

### Key patterns

- **Client components**: All interactive components use `"use client"`. Section components that animate use `AnimatedSection` wrapper (Framer Motion `useInView` with `once: true`).
- **Data-driven content**: Portfolio content lives in `src/data/`. Blog content lives in `content/blog/` as markdown files. Components import and render these — no hardcoded content in components.
- **Design system**: Dark theme (#0a0a0a background) with warm red accent (#ef4444). CSS custom properties defined in `globals.css` under `@theme inline`. Custom utility classes: `.glass`, `.glass-hover`, `.glow-accent`, `.bento-grid`, `.bento-card`, `.prose-blog`. Blog post pages have a scoped dark/light theme system via `.blog-theme` / `.blog-theme-light` CSS classes with `--blog-*` custom properties.
- **Tailwind v4**: Uses `@import "tailwindcss"` and `@theme inline` syntax (not v3 `@tailwind` directives). PostCSS plugin is `@tailwindcss/postcss`.
- **Icons**: lucide-react for all icons.
- **Shared layout chrome**: StarField, Navbar, and Footer live in `layout.tsx` (shared across all routes). CursorFollower is homepage-only (stays in `page.tsx`).
- **Dual-mode Navbar**: On homepage (`/`), uses IntersectionObserver for active section + hash hrefs. On blog pages (`/blog/*`), uses pathname detection for active state + prefixed hrefs (`/#section`). Logo links to `#hero` on homepage, `/` elsewhere.

---

## Blog System

Posts live in `content/blog/*.md` with YAML frontmatter. Parsed by `src/lib/blog.ts` (server-only, unified/remark pipeline). SSG via `generateStaticParams`. Zero client-side blog deps.

**Add a post:** Create `content/blog/your-slug.md` with frontmatter (`title`, `slug`, `date`, `description`, `tags[]`, `published: true`) → `npm run build`.

**Key files:** `src/lib/blog.ts` (parsing + heading extraction), `src/components/blog/BlogHeader.tsx` (header + cover image), `src/components/blog/BlogThemeProvider.tsx` (dark/light theme context + localStorage), `src/components/blog/BlogThemeToggle.tsx` (Sun/Moon toggle), `src/components/blog/TableOfContents.tsx` (sticky sidebar TOC at `xl:`), `src/components/ui/BlogCard.tsx` (cards), `.prose-blog` + `.blog-theme` in `globals.css` (Substack-style serif typography + theme variables).

**Full docs:** See `docs/blog-architecture.md` for detailed architecture, frontmatter schema, rendering pipeline, and component reference.

---

## Profile Images

Drop `.heic`/`.jpg`/`.png` files into `public/profile/`. HEIC files are auto-converted to `.webp` via `predev`/`prebuild` hooks (`heic-convert` → `sharp` pipeline). The About section carousel auto-advances every 3s with scale+fade transitions.

**Add a photo:** Drop image into `public/profile/` → `npm run dev`. Generated `.webp` files are gitignored.

**Key files:** `scripts/convert-images.mjs` (conversion), `src/lib/profile.ts` (reader), `src/components/sections/About.tsx` (carousel).

**Full docs:** See `docs/profile-images.md` for pipeline details, architecture diagram, and component reference.
