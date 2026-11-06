import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllPosts } from "~/lib/blog";
import { BlogCard } from "~/components/ui/BlogCard";

export const metadata: Metadata = {
  title: "Blog | Abhay Rana",
  description:
    "Articles on React, TypeScript, web development, architecture, and modern frontend tooling by Abhay Rana.",
  alternates: { canonical: "https://www.abhayrana.com/blog" },
  openGraph: {
    title: "Blog | Abhay Rana",
    description:
      "Articles on React, TypeScript, web development, architecture, and modern frontend tooling.",
    url: "https://www.abhayrana.com/blog",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-red-400 transition-all duration-300 px-3 py-1.5 rounded-lg hover:bg-zinc-800/50 mb-8"
      >
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-2 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
        Blog
      </h1>
      <p className="text-zinc-400 mb-12 text-lg">
        Thoughts on code, architecture, and design
      </p>

      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-zinc-500 text-lg">Coming soon...</p>
        </div>
      ) : posts.length < 4 ? (
        /* Centered layout for sparse content (1-3 posts) */
        posts.length === 1 ? (
          <div className="max-w-2xl mx-auto">
            <BlogCard post={posts[0]} featured />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} featured />
            ))}
          </div>
        )
      ) : (
        /* Full bento-grid for 4+ posts */
        <div className="bento-grid">
          {posts.map((post, index) => (
            <BlogCard
              key={post.slug}
              post={post}
              featured={index === 0}
            />
          ))}
        </div>
      )}
    </div>
  );
}
