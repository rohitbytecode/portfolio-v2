"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Github, ExternalLink, Calendar } from "lucide-react";
import {
  ContributionDay,
  fallbackCache,
  getDaysForYear,
  buildWeeks,
  computeMonthLabels,
  GITHUB_USERNAME,
  GITHUB_PROFILE_URL,
} from "~/data/github-stats";
import { cn } from "~/lib/cn";

const YEAR_OPTIONS = [
  { id: "last", label: "Last 12 Months" },
  { id: "2026", label: "2026" },
  { id: "2025", label: "2025" },
  { id: "2024", label: "2024" },
];

const LEVEL_CLASSES: Record<number, string> = {
  0: "bg-zinc-800/70 border-white/[0.04] hover:border-zinc-500",
  1: "bg-red-950/90 border-red-900/50 hover:border-red-600",
  2: "bg-red-800 border-red-700/60 hover:border-red-400",
  3: "bg-red-600 border-red-500/80 hover:border-red-300",
  4: "bg-red-500 border-red-400 shadow-[0_0_8px_rgba(239,68,68,0.7)] hover:border-red-200",
};

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

interface GithubCalendarProps {
  cache?: typeof fallbackCache;
  setCache?: React.Dispatch<React.SetStateAction<typeof fallbackCache>>;
  isLoading?: boolean;
}

export function GithubCalendar({
  cache: propCache,
  setCache: propSetCache,
  isLoading: propIsLoading,
}: GithubCalendarProps) {
  const [selectedYear, setSelectedYear] = useState<string>("last");
  const [internalCache, setInternalCache] = useState(fallbackCache);
  const [internalLoading, setInternalLoading] = useState(false);

  const cache = propCache ?? internalCache;
  const setCache = propSetCache ?? setInternalCache;
  const isLoading = propIsLoading ?? internalLoading;

  const [hoveredDay, setHoveredDay] = useState<{
    day: ContributionDay;
    x: number;
    y: number;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // If a specific year is chosen that might not be loaded, fetch live
  useEffect(() => {
    let cancelled = false;

    async function fetchYearContributions() {
      if (selectedYear === "last") return; // Handled in initial load

      try {
        setInternalLoading(true);
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${selectedYear}&t=${Date.now()}`,
          { cache: "no-store" }
        );
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled || !data.contributions) return;

        setCache((prev) => {
          const others = prev.allYearsContributions.filter(
            (d) => !d.date.startsWith(selectedYear)
          );
          return {
            ...prev,
            allYearsContributions: [...others, ...data.contributions],
            total: { ...prev.total, ...data.total },
          };
        });
      } catch (err) {
        // fail silently
      } finally {
        if (!cancelled) setInternalLoading(false);
      }
    }

    fetchYearContributions();

    return () => {
      cancelled = true;
    };
  }, [selectedYear, setCache]);

  const days = useMemo(
    () => getDaysForYear(selectedYear, cache),
    [selectedYear, cache]
  );

  const weeks = useMemo(() => buildWeeks(days), [days]);
  const monthLabels = useMemo(() => computeMonthLabels(weeks), [weeks]);

  const totalPeriodContributions = useMemo(() => {
    if (selectedYear === "last") {
      return days.reduce((sum, d) => sum + d.count, 0);
    }
    return cache.total[selectedYear] ?? days.reduce((sum, d) => sum + d.count, 0);
  }, [selectedYear, days, cache]);

  return (
    <div className="relative rounded-2xl glass p-6 md:p-8 transition-all duration-300">
      {/* Subtle top red glow line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent"
        aria-hidden="true"
      />

      {/* Header bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 pb-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
            <Github size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-[#fafafa]">
                GitHub Contribution Graph
              </h3>
              {isLoading && (
                <span className="flex h-2 w-2 relative" title="Syncing live with GitHub...">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              )}
            </div>
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#a1a1aa] hover:text-red-400 transition-colors group"
            >
              <span>@{GITHUB_USERNAME}</span>
              <ExternalLink
                size={12}
                className="opacity-70 group-hover:opacity-100 transition-opacity"
              />
            </a>
          </div>
        </div>

        {/* Year Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08] overflow-x-auto">
          {YEAR_OPTIONS.map((opt) => {
            const isActive = selectedYear === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedYear(opt.id)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap",
                  isActive
                    ? "bg-red-500/20 text-red-300 border border-red-500/40 shadow-[0_0_12px_rgba(239,68,68,0.2)]"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04] border border-transparent"
                )}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile scroll hint */}
      <div className="block md:hidden text-[11px] font-mono text-zinc-500 mb-3 text-center">
        ← Swipe horizontally to explore full graph →
      </div>

      {/* Graph Area */}
      <div
        ref={containerRef}
        className="relative overflow-x-auto pb-4 pt-1 scrollbar-thin"
        onMouseLeave={() => setHoveredDay(null)}
      >
        <div className="min-w-[780px] select-none">
          {/* Month labels row */}
          <div className="flex text-[11px] font-mono text-zinc-400 mb-2 pl-8">
            <div className="relative w-full h-4">
              {monthLabels.map((m, idx) => (
                <span
                  key={`${m.monthName}-${idx}`}
                  className="absolute"
                  style={{ left: `${m.weekIndex * 14.5}px` }}
                >
                  {m.monthName}
                </span>
              ))}
            </div>
          </div>

          {/* Grid with Weekday Labels on Left */}
          <div className="flex gap-2">
            {/* Weekday indicators */}
            <div className="flex flex-col justify-between text-[10px] font-mono text-zinc-500 w-6 pt-0.5 pb-1 select-none">
              <span className="h-[11px] leading-[11px]"></span>
              <span className="h-[11px] leading-[11px]">Mon</span>
              <span className="h-[11px] leading-[11px]"></span>
              <span className="h-[11px] leading-[11px]">Wed</span>
              <span className="h-[11px] leading-[11px]"></span>
              <span className="h-[11px] leading-[11px]">Fri</span>
              <span className="h-[11px] leading-[11px]"></span>
            </div>

            {/* Weeks columns */}
            <div className="flex gap-[3.5px]">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3.5px]">
                  {week.map((day, dIdx) => {
                    if (!day) {
                      return (
                        <div
                          key={`empty-${wIdx}-${dIdx}`}
                          className="w-[11px] h-[11px] rounded-[2.5px] opacity-0"
                        />
                      );
                    }

                    const level = day.level ?? 0;
                    return (
                      <div
                        key={day.date}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const containerRect =
                            containerRef.current?.getBoundingClientRect() || rect;
                          setHoveredDay({
                            day,
                            x: rect.left - containerRect.left + rect.width / 2,
                            y: rect.top - containerRect.top,
                          });
                        }}
                        className={cn(
                          "w-[11px] h-[11px] rounded-[2.5px] border transition-all duration-150 cursor-pointer",
                          LEVEL_CLASSES[level]
                        )}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Tooltip */}
        {hoveredDay && (
          <div
            className="absolute z-30 pointer-events-none -translate-x-1/2 -translate-y-full mb-2"
            style={{
              left: `${hoveredDay.x}px`,
              top: `${hoveredDay.y - 8}px`,
            }}
          >
            <div className="rounded-lg bg-zinc-900/95 backdrop-blur-md border border-red-500/30 px-3 py-1.5 shadow-[0_4px_20px_rgba(239,68,68,0.25)] text-center whitespace-nowrap">
              <p className="text-xs font-semibold text-[#fafafa]">
                <span className="text-red-400 font-mono">
                  {hoveredDay.day.count}{" "}
                </span>
                {hoveredDay.day.count === 1 ? "contribution" : "contributions"}
              </p>
              <p className="text-[10px] text-zinc-400 font-mono mt-0.5">
                {formatDate(hoveredDay.day.date)}
              </p>
            </div>
            {/* Tooltip triangle indicator */}
            <div className="w-2 h-2 bg-zinc-900 border-r border-b border-red-500/30 transform rotate-45 mx-auto -mt-1" />
          </div>
        )}
      </div>

      {/* Bottom Bar: Summary Count & Legend */}
      <div className="mt-4 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-red-400" />
          <span>
            <strong className="text-[#fafafa] font-mono">
              {totalPeriodContributions.toLocaleString()}
            </strong>{" "}
            contributions in{" "}
            {selectedYear === "last" ? "the last year" : selectedYear}
          </span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          <span className="text-zinc-500 mr-1">Less</span>
          <div
            className={cn("w-[11px] h-[11px] rounded-[2px] border", LEVEL_CLASSES[0])}
            title="0 contributions"
          />
          <div
            className={cn("w-[11px] h-[11px] rounded-[2px] border", LEVEL_CLASSES[1])}
            title="Low contributions"
          />
          <div
            className={cn("w-[11px] h-[11px] rounded-[2px] border", LEVEL_CLASSES[2])}
            title="Medium contributions"
          />
          <div
            className={cn("w-[11px] h-[11px] rounded-[2px] border", LEVEL_CLASSES[3])}
            title="High contributions"
          />
          <div
            className={cn("w-[11px] h-[11px] rounded-[2px] border", LEVEL_CLASSES[4])}
            title="Very high contributions"
          />
          <span className="text-zinc-500 ml-1">More</span>
        </div>
      </div>
    </div>
  );
}
