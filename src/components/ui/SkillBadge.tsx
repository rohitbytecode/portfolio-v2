/* eslint-disable @next/next/no-img-element */
import { cn } from "~/lib/cn";
import type { Skill } from "~/types/data";

interface SkillBadgeProps {
  skill: Skill;
  className?: string;
}

export function SkillBadge({ skill, className }: SkillBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3 py-2 transition-colors hover:bg-white/10 hover:border-white/20",
        className
      )}
    >
      <img
        src={skill.icon}
        alt=""
        width={18}
        height={18}
        className="shrink-0"
        loading="lazy"
      />
      <span className="text-sm font-medium text-zinc-200">{skill.name}</span>
    </div>
  );
}
