"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogPostMeta } from "~/types/data";
import { AnimatedSection } from "~/components/ui/AnimatedSection";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { BlogCard } from "~/components/ui/BlogCard";
import { staggerContainer, staggerItem } from "~/lib/motion";

interface BlogProps {
  posts: BlogPostMeta[];
}

export function Blog({ posts }: BlogProps) {
  const useFeatured = posts.length >= 4;
  const featuredPost = useFeatured ? posts[0] : null;
  const otherPosts = useFeatured ? posts.slice(1) : posts;

  return (
    <AnimatedSection id="blog">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Blog" subtitle="Thoughts on code, architecture, and design" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bento-grid"
        >
          {featuredPost && (
            <motion.div variants={staggerItem}>
              <BlogCard post={featuredPost} featured />
            </motion.div>
          )}
          {otherPosts.map((post) => (
            <motion.div key={post.slug} variants={staggerItem}>
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>
        <div className="flex justify-center mt-8">
          <Link
            href="/blog"
            className="text-sm text-zinc-400 hover:text-red-400 transition-colors"
          >
            View all posts →
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
