import githubCache from "./github-cache.json";

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface MonthLabel {
  weekIndex: number;
  monthName: string;
}

export interface GitHubStatsData {
  username: string;
  totalContributions: number;
  contributionsLastYear: number;
  contributions2026: number;
  publicRepos: number;
  longestStreak: number;
  currentStreak: number;
  primaryLanguage: string;
  profileUrl: string;
}

export const GITHUB_USERNAME = "rohitbytecode";
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

export const githubStatsInfo: GitHubStatsData = {
  username: GITHUB_USERNAME,
  totalContributions: 1359,
  contributionsLastYear: 1181,
  contributions2026: 1181,
  publicRepos: 38,
  longestStreak: 12,
  currentStreak: 0,
  primaryLanguage: "TypeScript",
  profileUrl: GITHUB_PROFILE_URL,
};

export const fallbackCache = githubCache as {
  total: Record<string, number>;
  allYearsContributions: ContributionDay[];
  lastYearContributions: ContributionDay[];
};

export function getDaysForYear(
  selectedYear: string,
  cache = fallbackCache
): ContributionDay[] {
  if (selectedYear === "last") {
    return cache.lastYearContributions;
  }

  return cache.allYearsContributions
    .filter((d) => d.date.startsWith(selectedYear))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function buildWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
  if (!days || days.length === 0) return [];

  const weeks: (ContributionDay | null)[][] = [];
  let currentWeek: (ContributionDay | null)[] = [];

  // Pad the first week if it doesn't start on Sunday (day 0)
  const firstDate = new Date(`${days[0].date}T00:00:00Z`);
  const firstDow = firstDate.getUTCDay();

  for (let i = 0; i < firstDow; i++) {
    currentWeek.push(null);
  }

  for (const day of days) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // Pad the final week if needed
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  return weeks;
}

export function computeMonthLabels(
  weeks: (ContributionDay | null)[][]
): MonthLabel[] {
  const monthLabels: MonthLabel[] = [];
  let lastMonth = -1;

  weeks.forEach((week, wIdx) => {
    const firstValidDay = week.find((d) => d !== null);
    if (firstValidDay) {
      const d = new Date(`${firstValidDay.date}T00:00:00Z`);
      const month = d.getUTCMonth();
      if (month !== lastMonth) {
        monthLabels.push({
          weekIndex: wIdx,
          monthName: d.toLocaleString("en-US", {
            month: "short",
            timeZone: "UTC",
          }),
        });
        lastMonth = month;
      }
    }
  });

  return monthLabels;
}

export function calculateStreaks(days: ContributionDay[]) {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  let currentStreak = 0;
  let longestStreak = 0;
  let streak = 0;

  for (const day of sorted) {
    if (day.count > 0) {
      streak++;
      if (streak > longestStreak) longestStreak = streak;
    } else {
      streak = 0;
    }
  }

  for (let i = sorted.length - 1; i >= 0; i--) {
    if (sorted[i].count > 0) {
      currentStreak++;
    } else if (i === sorted.length - 1) {
      // today might be 0 so far
      continue;
    } else {
      break;
    }
  }

  return { currentStreak, longestStreak };
}

