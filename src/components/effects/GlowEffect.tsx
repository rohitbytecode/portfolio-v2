"use client";

import { cn } from "~/lib/cn";

interface GlowEffectProps {
  children: React.ReactNode;
  className?: string;
  glowClassName?: string;
}

export function GlowEffect({ children, className, glowClassName }: GlowEffectProps) {
  return (
    <div
      className={cn(
        "relative group transition-shadow duration-300",
        "hover:shadow-[0_0_40px_rgba(239,68,68,0.3)]",
        className
      )}
    >
      <div
        className={cn(
          "absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm",
          "bg-gradient-to-r from-red-500/20 to-orange-500/20",
          glowClassName
        )}
        aria-hidden="true"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
