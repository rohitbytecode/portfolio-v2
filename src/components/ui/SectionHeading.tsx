import { cn } from "~/lib/cn";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-16 text-center", className)}>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#fafafa]">
        {title}
        <span className="text-red-500">.</span>
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-[#a1a1aa]">{subtitle}</p>
      )}
    </div>
  );
}
