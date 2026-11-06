"use client";

import { useState, useEffect } from "react";
import {
  ContributionDay,
  fallbackCache,
  githubStatsInfo,
  calculateStreaks,
  GITHUB_USERNAME,
} from "~/data/github-stats";

export interface LiveGithubStats {
  totalContributions: number;
  currentYearContributions: number;
  publicRepos: number;
  longestStreak: number;
  currentStreak: number;
  primaryLanguage: string;
}

export function useGithubData() {
  const [cache, setCache] = useState(fallbackCache);
  const [stats, setStats] = useState<LiveGithubStats>({
    totalContributions: githubStatsInfo.totalContributions,
    currentYearContributions: githubStatsInfo.contributions2026,
    publicRepos: githubStatsInfo.publicRepos,
    longestStreak: githubStatsInfo.longestStreak,
    currentStreak: githubStatsInfo.currentStreak,
    primaryLanguage: githubStatsInfo.primaryLanguage,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function fetchLiveData() {
      try {
        setIsLoading(true);

        const currentYear = new Date().getFullYear().toString();

        // Fetch live contributions and user info concurrently with cache-busting
        const [allTimeRes, lastYearRes, userRes] = await Promise.allSettled([
          fetch(
            `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?t=${Date.now()}`,
            { cache: "no-store" }
          ).then((r) => (r.ok ? r.json() : null)),
          fetch(
            `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last&t=${Date.now()}`,
            { cache: "no-store" }
          ).then((r) => (r.ok ? r.json() : null)),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
            headers: { Accept: "application/vnd.github.v3+json" },
          }).then((r) => (r.ok ? r.json() : null)),
        ]);

        if (isCancelled) return;

        const allTimeData =
          allTimeRes.status === "fulfilled" ? allTimeRes.value : null;
        const lastYearData =
          lastYearRes.status === "fulfilled" ? lastYearRes.value : null;
        const userData = userRes.status === "fulfilled" ? userRes.value : null;

        let newCache = { ...fallbackCache };

        if (allTimeData && allTimeData.contributions) {
          newCache.total = { ...newCache.total, ...allTimeData.total };
          newCache.allYearsContributions = allTimeData.contributions;
        }

        if (lastYearData && lastYearData.contributions) {
          newCache.lastYearContributions = lastYearData.contributions;
          if (lastYearData.total) {
            newCache.total = { ...newCache.total, ...lastYearData.total };
          }
        }

        setCache(newCache);

        // Dynamically compute stats from fresh live data
        const contributionsForStreak =
          allTimeData?.contributions ||
          lastYearData?.contributions ||
          fallbackCache.allYearsContributions;

        const { currentStreak, longestStreak } = calculateStreaks(
          contributionsForStreak as ContributionDay[]
        );

        const totalAllTime = Object.values(newCache.total).reduce(
          (sum: number, count) => sum + (Number(count) || 0),
          0
        );

        const yearTotal =
          Number(newCache.total[currentYear]) ||
          Number(newCache.total["2026"]) ||
          githubStatsInfo.contributions2026;

        setStats((prev) => ({
          ...prev,
          totalContributions: totalAllTime > 0 ? totalAllTime : prev.totalContributions,
          currentYearContributions: yearTotal,
          publicRepos:
            userData && typeof userData.public_repos === "number"
              ? userData.public_repos
              : prev.publicRepos,
          longestStreak:
            longestStreak > 0 ? longestStreak : prev.longestStreak,
          currentStreak,
        }));
      } catch (e) {
        // Fallback to cache silently if network is offline
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    fetchLiveData();

    return () => {
      isCancelled = true;
    };
  }, []);

  return { cache, setCache, stats, isLoading };
}

