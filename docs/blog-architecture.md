# Blog Architecture

*Last updated: 15 Feb 2026*

Markdown-powered static blog using Next.js SSG. Posts are authored as `.md` files, parsed at build time, and served as static HTML.

---

## How to Add a New Blog Post

1. Create `content/blog/your-post-slug.md`
2. Add frontmatter + markdown body
3. Run `npm run build`

The post appears at `/blog/your-post-slug` and on the homepage (if within latest 4).

### Frontmatter Template

```yaml
---
title: "Your Post Title"
slug: "your-post-slug"
date: "2026-02-11"
description: "Short description for cards and SEO."
tags: ["Tag1", "Tag2"]
published: true
---

Your markdown content here...
```

### Frontmatter Schema

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | Yes | Displayed in header, cards, SEO title |
| `slug` | string | No | URL slug. Falls back to filename if omitted |
| `date` | string (YYYY-MM-DD) | Yes | Used for sorting (newest first) and display |
| `description` | string | Yes | Card text, meta description, OpenGraph |
| `tags` | string[] | Yes | YAML array. Rendered as pills in header and dots in cards |
| `published` | boolean | Yes | `false` = draft (excluded from build) |
| `coverImage` | string | No | Path to cover image (e.g. `/blog/cover.png`). Rendered in `BlogHeader` + used for OG/Twitter cards |

---

## Architecture Overview

```
content/blog/*.md              ← Markdown source (frontmatter + body)
        │
        ▼
src/lib/blog.ts                ← Server-only parsing layer
  ├── getAllPosts()             → BlogPostMeta[] (published, sorted by date desc)
  ├── getAllSlugs()             → string[] (for generateStaticParams)
  ├── getPostBySlug(slug)      → BlogPostFull | null (HTML via unified)
  └── getLatestPosts(n)        → BlogPostMeta[] (first N for homepage)
        │
        ├──▶ src/app/page.tsx              ← getLatestPosts(4) → Blog section
        ├──▶ src/app/blog/page.tsx         ← getAllPosts() → card grid
        └──▶ src/app/blog/[slug]/page.tsx  ← getPostBySlug() → full post (SSG)
```

### Data Flow

- **Homepage:** `page.tsx` calls `getLatestPosts(4)` → passes `BlogPostMeta[]` as prop to `<Blog>` section (client component for animations) → renders `BlogCard` components
- **Blog list:** `blog/page.tsx` calls `getAllPosts()` → adaptive layout: centered single card (1 post), responsive grid (2-3 posts), or bento-grid (4+ posts)
- **Blog post:** `blog/[slug]/page.tsx` calls `getPostBySlug(slug)` → wrapped in `BlogThemeProvider` (dark/light theme) → clean Substack-style layout with `BlogHeader` → serif `<article>` + `ReadingProgress` bar + floating `BlogThemeToggle`

---

## Markdown Rendering Pipeline

Defined in `src/lib/blog.ts`, runs at build time only (zero client-side cost).

```
remark-parse                    ← Markdown → MDAST
  → remark-rehype               ← MDAST → HAST (allowDangerousHtml: true)
    → rehype-raw                 ← Re-parses raw HTML nodes into proper HAST
      → rehype-slug              ← Adds id attributes to headings
        → rehype-autolink-headings ← Wraps headings in <a> links (behavior: 'wrap')
          → rehype-pretty-code   ← Syntax highlighting via Shiki (theme: one-dark-pro)
            → rehype-stringify    ← HAST → HTML string
```

`rehype-raw` is required for raw HTML in markdown (callout boxes, stat blocks, comparison grids, etc.) to render. Without it, raw HTML nodes are silently dropped.

### Exported Utilities

| Function | Returns | Purpose |
|----------|---------|---------|
| `extractHeadings(html)` | `BlogHeading[]` | Regex-extracts `<h2>` ids and text from rendered HTML for the TOC sidebar |

### Dependencies (all build-time only)

| Package | Purpose |
|---------|---------|
| `gray-matter` | Parse YAML frontmatter from .md |
| `unified` + `remark-parse` + `remark-rehype` + `rehype-stringify` | Markdown → HTML pipeline |
| `rehype-raw` | Parse raw HTML in markdown into proper HAST nodes |
| `rehype-pretty-code` | Syntax highlighting (Shiki engine) |
| `rehype-slug` + `rehype-autolink-headings` | Heading IDs + clickable anchors |
| `reading-time` | Auto-compute read time from word count |

---

## Types

Defined in `src/types/data.ts`:

```typescript
interface BlogPostMeta {       // Cards, list page, homepage
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;            // Auto-computed by reading-time
  tags: string[];
  coverImage?: string;
  published: boolean;
}

interface BlogPostFull extends BlogPostMeta {
  content: string;             // Rendered HTML string from unified pipeline
}
```

---

## Components

| Component | File | Server/Client | Purpose |
|-----------|------|---------------|---------|
| `BlogHeader` | `src/components/blog/BlogHeader.tsx` | Server | Title (3xl–2.75rem), description, formatted date, read time, tag pills (muted style), cover image, theme-aware divider. All colors via `var(--blog-*)` CSS custom properties |
| `BlogThemeProvider` | `src/components/blog/BlogThemeProvider.tsx` | Client | React context wrapping blog post pages. Manages dark/light theme state via localStorage (`blog-theme` key). Applies `.blog-theme` / `.blog-theme-light` class on wrapper. Inline `<script>` prevents hydration flash |
| `BlogThemeToggle` | `src/components/blog/BlogThemeToggle.tsx` | Client | Sun/Moon toggle button (lucide-react). Fixed position on right side of viewport (`fixed right-5 top-5 z-50`), aligned with navbar. Reads/writes via `useBlogTheme()` context |
| `TableOfContents` | `src/components/blog/TableOfContents.tsx` | Client | Sticky sidebar TOC on `xl:` screens. `IntersectionObserver` highlights active `<h2>`. Theme-aware colors via `var(--blog-*)`. Hidden below `xl` breakpoint |
| `ReadingProgress` | `src/components/blog/ReadingProgress.tsx` | Client | 3px progress bar fixed at viewport top (`z-[60]`). Uses `var(--blog-accent)` for color. Tracks scroll through `<article>` via `scaleX` transform |
| `BlogCard` | `src/components/ui/BlogCard.tsx` | Server | `<Link>` card to `/blog/[slug]`. `featured` prop controls bento size + min-height. Formats dates via `toLocaleDateString` |
| `Blog` (section) | `src/components/sections/Blog.tsx` | Client | Homepage section. Accepts `posts: BlogPostMeta[]` prop. Featured layout (1 large + 3 small) if ≥4 posts, flat grid otherwise. "View all posts →" link |

---

## Routes & SEO

| Route | File | Rendering | Metadata |
|-------|------|-----------|----------|
| `/blog` | `src/app/blog/page.tsx` | Static | Static export: `title: "Blog \| Abhay Rana"` |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | SSG | `generateMetadata()`: per-post title, description, canonical URL, OpenGraph (type: article, publishedTime, image from `coverImage`), Twitter `summary_large_image` card |

`generateStaticParams()` in `[slug]/page.tsx` calls `getAllSlugs()` to pre-build all published posts at build time.

**Next.js 16 / React 19 note:** `params` is a `Promise` — always `await params` in both `generateMetadata` and page components.

---

## Styling

### Blog Theme System

Blog post pages support a dark/light theme toggle, scoped only to `/blog/[slug]` pages. The theme is implemented via CSS custom properties on wrapper classes:

- `.blog-theme` — dark theme (default). Defines `--blog-bg`, `--blog-text`, `--blog-accent`, etc.
- `.blog-theme-light` — light theme override. Same property names, light values.

All `.prose-blog` rules reference `var(--blog-*)` — zero hardcoded colors, zero duplicate rules. Theme switching is pure CSS cascade (no JS re-renders). Theme preference persists in `localStorage('blog-theme')`.

**Scoping:** Only blog post pages are themed. The `/blog` list page and all portfolio sections remain dark.

### Typography (Substack-inspired)

- **Body text:** Lora serif (`--font-blog-serif`) at 19px, line-height 1.7, letter-spacing -0.003em
- **Headings:** Sans-serif (Inter via `--font-sans`) for contrast. H2: 1.75rem with `var(--blog-heading-border)` bottom border
- **Paragraphs:** 1.5em vertical margins (generous breathing room)
- **Blockquotes:** 4px left border (`var(--blog-blockquote-border)`), no italic, slightly indented
- **Links:** `var(--blog-link)` color, underline on hover
- **Strong text:** `var(--blog-text-strong)`, weight 700
- **Code blocks:** `var(--blog-code-bg)` bg, `var(--font-mono)`, rounded-xl, `var(--blog-border)`
- **Inline code:** `var(--blog-code-text)` text, `var(--blog-code-inline-bg)` bg
- **Lists:** `var(--blog-accent)` markers, 0.5em item spacing
- **Tables:** `var(--blog-table-*)` for borders, header bg, striping. Sans-serif font at 0.95rem
- **Visual components** (callouts, stats, comparisons): Use `var(--blog-bg-surface)` bg, `var(--blog-border)` borders, sans-serif font. Callout variant colors (red/green/amber/blue) stay hardcoded (semantic, theme-independent)

### Visual blog components (raw HTML in markdown)

These CSS classes style raw HTML blocks inside `.prose-blog`. Enabled by `rehype-raw`.

| Class | Purpose |
|-------|---------|
| `.callout`, `.callout-tldr`, `.callout-tip`, `.callout-warning`, `.callout-key` | Colored info boxes with left border accent (red/green/amber/blue) |
| `.comparison`, `.comparison-card`, `.comparison-before`, `.comparison-after` | Side-by-side grid cards (red "before" / green "after") |
| `.stat-grid`, `.stat-block`, `.stat-number`, `.stat-label` | 3-column stat highlights with accent-colored numbers |
| `.blog-meme`, `.meme-caption` | Styled blog images with italic caption |
| `.pull-quote` | Large highlighted statement with accent left border |
| `.section-break` | Styled divider between major sections |
| `.badge-row`, `.github-cta` | shields.io badge row + accent CTA button |

### Blog post page layout

- Wrapped in `BlogThemeProvider` — applies `.blog-theme` class with `background-color: var(--blog-bg)` covering body bg
- Clean Substack-style layout: no gradient hero, no card wrapper, no glass effects
- **Content container** `max-w-[720px] xl:max-w-[1000px]` (720px produces ~65-75 chars/line at 19px Lora)
- Header sits above the grid with `xl:mr-[260px]` to align with the article column
- At `xl:` breakpoint, article body + TOC sidebar use CSS Grid `[1fr_220px]` with `gap-10`
- TOC sidebar is hidden below `xl:` (`hidden xl:block`), sticky at `top-24`
- `BlogThemeToggle` floats fixed on right side of viewport (`fixed right-5 top-5 z-50`), aligned with navbar
- Content fade-in: `.blog-fade-in` CSS animation (0.6s ease-out translateY)
- Reading progress: 3px accent bar at `z-[60]` fixed to viewport top

---

## Navbar Dual-Mode

The Navbar (`src/components/ui/Navbar.tsx`) handles two contexts:

| Context | Active State | Link Hrefs | Logo Href |
|---------|-------------|------------|-----------|
| Homepage (`/`) | `IntersectionObserver` via `useActiveSection` | `#section` (hash) | `#hero` |
| Blog pages (`/blog/*`) | Pathname detection: "Blog" always active | `/#section` (prefixed) | `/` |

Uses `usePathname()` from `next/navigation`. `isHome = pathname === "/"` drives all conditional logic.

---

## Layout Structure

`src/app/layout.tsx` provides shared chrome for all routes:

```
<html>
  <body>
    <StarField />      ← Visual continuity across all pages
    <Navbar />         ← Dual-mode navigation
    <main>
      {children}       ← Page content
    </main>
    <Footer />
  </body>
</html>
```

`CursorFollower` stays in `src/app/page.tsx` (homepage-only — CPU-intensive mouse tracking, unnecessary on reading pages).
