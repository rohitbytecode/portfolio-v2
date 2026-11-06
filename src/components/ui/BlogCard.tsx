import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "~/lib/cn";
import type { BlogPostMeta } from "~/types/data";

interface BlogCardProps {
  post: BlogPostMeta;
  className?: string;
  featured?: boolean;
}

export function BlogCard({ post, className, featured = false }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group bento-card block p-6 transition-all duration-300",
        featured ? "bento-2x2 min-h-[280px]" : "bento-1x1",
        className
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
          <time dateTime={post.date}>{formattedDate}</time>
          <span className="w-1 h-1 rounded-full bg-red-500" />
          <span>{post.readTime}</span>
        </div>
        <h3 className={cn(
          "font-extrabold text-white group-hover:text-red-400 transition-colors",
          featured ? "text-2xl" : "text-base"
        )}>
          {post.title}
        </h3>
        <p className={cn(
          "mt-2 text-[#b4b4b4] leading-relaxed flex-1",
          featured ? "text-sm line-clamp-3" : "text-xs line-clamp-2"
        )}>
          {post.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                {tag}
              </span>
            ))}
          </div>
          <ArrowRight
            size={16}
            className="text-zinc-600 group-hover:text-red-400 transition-colors shrink-0"
          />
        </div>
      </div>
    </Link>
  );
}
