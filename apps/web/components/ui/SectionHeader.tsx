import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: React.ReactNode;
  subtitleClassName?: string;
  className?: string;
  align?: "left" | "center";
  gold?: boolean;
  theme?: "light" | "dark";
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  subtitleClassName,
  className,
  align = "center",
  gold = false,
  theme = "light",
}: SectionHeaderProps) {
  const isDark = theme === "dark";

  return (
    <div className={cn(align === "center" && "text-center", "mb-10", className)}>
      {eyebrow && (
        <p className={cn("mb-2 text-sm font-semibold uppercase tracking-widest", gold ? "text-gold" : "text-un-blue")}>
          {eyebrow}
        </p>
      )}
      <h2 className={cn("heading-font text-3xl md:text-4xl lg:text-5xl", isDark ? "text-runway-white" : "text-ink")}>
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-3xl text-lg",
            isDark ? "text-muted" : "text-ink-muted",
            align === "center" && "mx-auto",
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
