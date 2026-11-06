import type { BlogPostMeta } from "~/types/data";

interface BlogHeaderProps {
  post: BlogPostMeta;
}

export function BlogHeader({ post }: BlogHeaderProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="mb-8">
      <h1
        className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight tracking-tight"
        style={{ color: "var(--blog-text-strong)" }}
      >
        {post.title}
      </h1>
      <div
        className="flex flex-wrap items-center gap-3 mt-4 text-sm"
        style={{ color: "var(--blog-text-muted)" }}
      >
        <time dateTime={post.date}>{formattedDate}</time>
        <span
          className="w-1 h-1 rounded-full"
          style={{ backgroundColor: "var(--blog-accent)" }}
        />
        <span>{post.readTime}</span>
      </div>
      {post.description && (
        <p
          className="mt-4 text-lg leading-relaxed max-w-2xl"
          style={{ color: "var(--blog-text-muted)" }}
        >
          {post.description}
        </p>
      )}
      <div className="flex flex-wrap gap-2 mt-6">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-xs font-medium rounded-full"
            style={{
              color: "var(--blog-text-muted)",
              border: "1px solid var(--blog-border)",
              backgroundColor: "var(--blog-bg-card)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      {post.coverImage && (
        <div className="mt-8 -mx-2 md:-mx-4">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full rounded-xl"
            style={{ border: "1px solid var(--blog-border)" }}
          />
        </div>
      )}
      <div
        className="mt-8 h-px"
        style={{ background: "var(--blog-hr)" }}
      />
    </header>
  );
}
