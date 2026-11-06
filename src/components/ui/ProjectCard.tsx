"use client";

import {
  ExternalLink,
  Github,
  Package,
  Sparkles,
  ShieldCheck,
  Zap,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Project } from "~/types/data";
import { cn } from "~/lib/cn";

const highlightIcons: Record<string, LucideIcon> = {
  Sparkles,
  ShieldCheck,
  Zap,
  Users,
};

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  className?: string;
}

export function ProjectCard({ project, featured, className }: ProjectCardProps) {
  const isDisabled = project.disabled;

  return (
    <div
      className={cn(
        "group rounded-xl glass p-6 transition-all duration-300",
        isDisabled
          ? "opacity-40 cursor-not-allowed"
          : "glass-hover hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(239,68,68,0.15)]",
        featured && "md:col-span-2",
        className
      )}
    >
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <h3
            className={cn(
              "text-xl font-semibold transition-colors",
              isDisabled
                ? "text-[#555]"
                : "text-[#fafafa] group-hover:text-red-400"
            )}
          >
            {project.title}
          </h3>
          {isDisabled && (
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[#555]">
              Soon
            </span>
          )}
        </div>
        <p
          className={cn(
            "mt-2 text-sm leading-relaxed",
            isDisabled ? "text-[#444]" : "text-[#a1a1aa]"
          )}
        >
          {project.description}
        </p>
      </div>

      {featured && project.highlights && project.highlights.length > 0 && (
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {project.highlights.map((highlight) => {
            const Icon = highlightIcons[highlight.icon];
            return (
              <div
                key={highlight.label}
                className="flex items-start gap-3 rounded-lg bg-white/[0.03] border border-white/[0.06] p-3"
              >
                {Icon && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-500/10">
                    <Icon size={16} className="text-red-400" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-[#fafafa]">
                    {highlight.label}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-[#a1a1aa]">
                    {highlight.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mb-4 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-mono",
              isDisabled
                ? "border-white/5 bg-white/[0.02] text-[#444]"
                : "border-white/10 bg-white/5 text-[#a1a1aa]"
            )}
          >
            {tech}
          </span>
        ))}
      </div>

      {!isDisabled && (
        <div className="flex flex-wrap gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-[#a1a1aa] hover:text-red-400 transition-colors"
            >
              <Github size={16} />
              Code
            </a>
          )}
          {project.npmUrl && (
            <a
              href={project.npmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-[#a1a1aa] hover:text-red-400 transition-colors"
            >
              <Package size={16} />
              npm
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-[#a1a1aa] hover:text-red-400 transition-colors"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
        </div>
      )}
    </div>
  );
}
