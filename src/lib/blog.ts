import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import type { BlogPostMeta, BlogPostFull } from "~/types/data";

export interface BlogHeading {
  id: string;
  text: string;
}

export function extractHeadings(html: string): BlogHeading[] {
  const headings: BlogHeading[] = [];
  const regex = /<h2\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = match[2].replace(/<[^>]*>/g, "").trim();
    if (text) headings.push({ id: match[1], text });
  }
  return headings;
}

const CONTENT_DIR = path.resolve(process.cwd(), "content/blog");

function getMdFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"));
}

function parsePost(filename: string): BlogPostMeta | null {
  const filePath = path.join(CONTENT_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  if (!data.published) return null;

  const slug = data.slug || filename.replace(/\.md$/, "");
  const stats = readingTime(content);

  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    readTime: stats.text,
    tags: data.tags ?? [],
    coverImage: data.coverImage,
    published: true,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  return getMdFiles()
    .map((file) => parsePost(file))
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export function getLatestPosts(count: number): BlogPostMeta[] {
  return getAllPosts().slice(0, count);
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPostFull | null> {
  const files = getMdFiles();

  let matchedData: Record<string, unknown> | null = null;
  let matchedContent: string | null = null;

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const fileSlug = data.slug || file.replace(/\.md$/, "");
    if (fileSlug === slug) {
      matchedData = data;
      matchedContent = content;
      break;
    }
  }

  if (!matchedData || !matchedContent) return null;
  if (!matchedData.published) return null;

  const data = matchedData;
  const content = matchedContent;

  const stats = readingTime(content);

  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypePrettyCode, { theme: "one-dark-pro" })
    .use(rehypeStringify)
    .process(content);

  return {
    slug: (data.slug as string) || slug,
    title: (data.title as string) ?? "",
    description: (data.description as string) ?? "",
    date: (data.date as string) ?? "",
    readTime: stats.text,
    tags: (data.tags as string[]) ?? [],
    coverImage: data.coverImage as string | undefined,
    published: true,
    content: String(result),
    wordCount: stats.words,
  };
}
