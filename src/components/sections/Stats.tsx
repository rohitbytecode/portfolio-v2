"use client";

import { motion } from "framer-motion";
import {
  GitCommit,
  FolderGit2,
  Flame,
  Code2,
  Github,
  ExternalLink,
  TrendingUp,
} from "lucide-react";
import { AnimatedSection } from "~/components/ui/AnimatedSection";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { GithubCalendar } from "~/components/ui/GithubCalendar";
import { useGithubData } from "~/hooks/useGithubData";
import { GITHUB_PROFILE_URL, GITHUB_USERNAME } from "~/data/github-stats";
import { staggerContainer, staggerItem } from "~/lib/motion";

interface MetricCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  subtext: string;
  badge?: string;
}

function MetricCard({ icon, value, label, subtext, badge }: MetricCardProps) {
  return (
    <div className="group rounded-2xl glass p-6 transition-all duration-300 glass-hover hover:-translate-y-1 hover:border-red-500/40 hover:shadow-[0_0_30px_rgba(239,68,68,0.12)] relative overflow-hidden flex flex-col justify-between">
      {/* Subtle corner glow */}
      <div
        className="absolute -top-12 -right-12 w-24 h-24 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all duration-500"
        aria-hidden="true"
      />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 group-hover:scale-105 group-hover:bg-red-500/20 transition-all duration-300">
            {icon}
          </div>
          {badge && (
            <span className="rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-0.5 text-[11px] font-mono text-red-400">
              {badge}
            </span>
          )}
        </div>

        <div className="text-3xl font-extrabold text-[#fafafa] tracking-tight font-mono mb-1">
          {value}
        </div>
        <div className="text-sm font-semibold text-[#fafafa] mb-1.5">
          {label}
        </div>
      </div>

      <div className="text-xs text-[#a1a1aa] leading-relaxed pt-2 border-t border-white/[0.04]">
        {subtext}
      </div>
    </div>
  );
}

export function Stats() {
  const { cache, setCache, stats, isLoading } = useGithubData();
  const currentYear = new Date().getFullYear();

  return (
    <AnimatedSection id="stats">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Activity & Stats"
          subtitle="Open-source contributions, commit frequency, and live GitHub metrics"
        />

        {/* 4 Bento Metric Cards with dynamic live values */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8"
        >
          <motion.div variants={staggerItem}>
            <MetricCard
              icon={<GitCommit size={22} />}
              value={`${stats.totalContributions.toLocaleString()}+`}
              label="Total Contributions"
              subtext={`Over ${stats.currentYearContributions.toLocaleString()} contributions recorded across active projects`}
              badge={`+${stats.currentYearContributions.toLocaleString()} in ${currentYear}`}
            />
          </motion.div>

          <motion.div variants={staggerItem}>
            <MetricCard
              icon={<FolderGit2 size={22} />}
              value={stats.publicRepos}
              label="Public Repositories"
              subtext="Full-stack healthcare apps, developer tools, and web apps"
              badge="GitHub"
            />
          </motion.div>

          <motion.div variants={staggerItem}>
            <MetricCard
              icon={<Flame size={22} />}
              value={`${stats.longestStreak} Days`}
              label="Longest Streak"
              subtext="Consistent day-over-day shipping momentum and commits"
              badge="High Velocity"
            />
          </motion.div>

          <motion.div variants={staggerItem}>
            <MetricCard
              icon={<Code2 size={22} />}
              value={stats.primaryLanguage}
              label="Primary Language"
              subtext="TypeScript & JavaScript across active production codebases"
              badge="Modern Stack"
            />
          </motion.div>
        </motion.div>

        {/* Live GitHub Contribution Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <GithubCalendar
            cache={cache}
            setCache={setCache}
            isLoading={isLoading}
          />
        </motion.div>

        {/* GitHub Profile Action Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl glass p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/[0.08] hover:border-red-500/30 transition-all duration-300"
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400">
              <TrendingUp size={24} />
            </div>
            <div>
              <h4 className="text-base font-semibold text-[#fafafa]">
                Follow my open-source journey on GitHub
              </h4>
              <p className="text-sm text-[#a1a1aa] mt-0.5">
                Check out source code, pull requests, and ongoing experimental builds.
              </p>
            </div>
          </div>

          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white rounded-xl bg-red-600 hover:bg-red-500 transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.35)] hover:shadow-[0_0_30px_rgba(239,68,68,0.55)] hover:-translate-y-0.5 shrink-0"
          >
            <Github size={18} />
            <span>Visit @{GITHUB_USERNAME}</span>
            <ExternalLink size={14} className="opacity-80" />
          </a>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
