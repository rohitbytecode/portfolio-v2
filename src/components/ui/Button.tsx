"use client";

import { cn } from "~/lib/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg cursor-pointer";

  const variants = {
    primary:
      "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20 hover:shadow-red-500/40",
    secondary:
      "glass text-[#fafafa] hover:bg-white/10",
    outline:
      "border border-white/10 text-[#a1a1aa] hover:text-[#fafafa] hover:border-white/20 hover:bg-white/5",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3 text-base",
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
