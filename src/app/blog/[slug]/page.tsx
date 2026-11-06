import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getAllSlugs, getPostBySlug, extractHeadings } from "~/lib/blog";
import { BlogHeader } from "~/components/blog/BlogHeader";
import { BlogThemeProvider } from "~/components/blog/BlogThemeProvider";
import { BlogThemeToggle } from "~/components/blog/BlogThemeToggle";
import { ReadingProgress } from "~/components/blog/ReadingProgress";
import { TableOfContents } from "~/components/blog/TableOfContents";
import { siteConfig } from "~/data/site-config";
import type { BlogPostFull } from "~/types/data";

function getBlogPostJsonLd(post: BlogPostFull) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.coverImage
      ? `${siteConfig.url}${post.coverImage}`
      : undefined,
    datePublished: post.date,
    dateModified: post.date,
    wordCount: post.wordCount,
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  };
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const ogImages = post.coverImage
    ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }]
    : undefined;

  return {
    title: `${post.title} | ${siteConfig.author}`,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: siteConfig.author, url: siteConfig.url }],
    alternates: { canonical: `${siteConfig.url}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [siteConfig.url],
      tags: post.tags,
      url: `${siteConfig.url}/blog/${slug}`,
      siteName: siteConfig.author,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@Ranaji_0x",
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const headings = extractHeadings(post.content);

  const jsonLd = getBlogPostJsonLd(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />
      <BlogThemeProvider>
        <div className="min-h-screen -mt-16 pt-16 pb-16 md:pb-24 relative z-10">
          {/* Theme toggle — fixed on right side of viewport */}
          <BlogThemeToggle />

          {/* Clean container — no gradient hero, no card wrapper */}
          <div className="mx-auto max-w-[720px] xl:max-w-[1000px] px-5 md:px-8 pt-12 md:pt-16">
            <div className="mb-8 xl:mr-[260px]">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-sm transition-all duration-300 px-3 py-1.5 rounded-lg"
                style={{ color: "var(--blog-text-muted)" }}
              >
                <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
                Back to Blog
              </Link>
            </div>

            {/* Header — right margin reserves TOC space at xl: */}
            <div className="xl:mr-[260px]">
              <BlogHeader post={post} />
            </div>

            {/* Article body + TOC sidebar grid */}
            <div className="xl:grid xl:grid-cols-[1fr_220px] xl:gap-10">
              <div className="min-w-0">
                <article
                  className="prose-blog blog-fade-in"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <div
                  className="mt-16 h-px"
                  style={{ background: "var(--blog-hr)" }}
                />

                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-2 text-sm transition-all duration-300 px-3 py-1.5 rounded-lg mt-8"
                  style={{ color: "var(--blog-text-muted)" }}
                >
                  <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
                  Back to Blog
                </Link>
              </div>

              {/* TOC sidebar — sticky alongside article body */}
              <aside className="hidden xl:block">
                <div className="sticky top-24">
                  <TableOfContents headings={headings} />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </BlogThemeProvider>
    </>
  );
}
