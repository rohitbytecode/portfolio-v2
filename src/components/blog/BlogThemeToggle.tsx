"use client";

import { Moon, Sun } from "lucide-react";
import { useBlogTheme } from "./BlogThemeProvider";

export function BlogThemeToggle() {
  const { theme, toggleTheme } = useBlogTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="fixed right-5 top-5 z-50 p-2.5 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110"
      style={{
        color: "var(--blog-text-muted)",
        backgroundColor: "var(--blog-bg-surface)",
        border: "1px solid var(--blog-border)",
      }}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
