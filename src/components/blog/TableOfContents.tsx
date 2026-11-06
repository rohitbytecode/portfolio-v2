"use client";

import { useEffect, useState } from "react";
import type { BlogHeading } from "~/lib/blog";

interface TableOfContentsProps {
  headings: BlogHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    for (const { id } of headings) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav>
      <div
        className="text-xs font-bold uppercase tracking-wider mb-3"
        style={{ color: "var(--blog-accent)" }}
      >
        On this page
      </div>
      <ul className="space-y-1">
        {headings.map(({ id, text }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="block py-1 pl-3 text-[13px] leading-snug border-l-2 transition-colors duration-200"
              style={{
                borderColor:
                  activeId === id ? "var(--blog-accent)" : "transparent",
                color:
                  activeId === id
                    ? "var(--blog-text-strong)"
                    : "var(--blog-text-subtle)",
              }}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
