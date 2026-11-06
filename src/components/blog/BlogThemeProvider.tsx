"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type BlogTheme = "dark" | "light";

interface BlogThemeContextValue {
  theme: BlogTheme;
  toggleTheme: () => void;
}

const BlogThemeContext = createContext<BlogThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
});

export function useBlogTheme() {
  return useContext(BlogThemeContext);
}

const STORAGE_KEY = "blog-theme";

export function BlogThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<BlogTheme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as BlogTheme | null;
      if (stored === "light" || stored === "dark") {
        setTheme(stored);
      }
    } catch {}
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {}
    }
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <BlogThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={`blog-theme ${theme === "light" ? "blog-theme-light" : ""}`}
        style={{ backgroundColor: "var(--blog-bg)", color: "var(--blog-text)" }}
      >
        {/* Inline script prevents dark→light flash for returning users */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('${STORAGE_KEY}')==='light')document.currentScript.parentElement.classList.add('blog-theme-light')}catch(e){}`,
          }}
        />
        {children}
      </div>
    </BlogThemeContext.Provider>
  );
}
