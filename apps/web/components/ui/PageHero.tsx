import Link from "next/link";
import type { ReactNode } from "react";
import { TrackedExternalLink } from "@/components/analytics/TrackedExternalLink";
import { cn } from "@/lib/utils";

interface PageHeroAction {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "gold";
  external?: boolean;
  event?: string;
  eventProperties?: Record<string, unknown>;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  actions?: PageHeroAction[];
  className?: string;
}

const actionStyles = {
  primary: "bg-un-blue text-white hover:bg-un-blue/90",
  secondary: "border border-white/25 text-white hover:border-un-blue hover:text-un-blue",
  gold: "bg-gold text-black hover:bg-gold/90",
};

export function PageHero({ eyebrow, title, subtitle, actions, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-[#0d1b2a] via-[#0a1628] to-[#0a0a0f] py-16 sm:py-20 lg:py-24",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,158,219,0.12),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(201,162,39,0.08),_transparent_50%)]" />

      <div className="relative mx-auto max-w-5xl px-4 text-center lg:px-8">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-un-blue">{eyebrow}</p>
        )}
        <h1 className="heading-font mt-4 text-4xl leading-tight text-runway-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">{subtitle}</p>
        )}
        {actions && actions.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {actions.map((action) => {
              const className = cn(
                "inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-wide transition",
                actionStyles[action.variant ?? "primary"]
              );
              const isExternal = action.external ?? /^https?:\/\//.test(action.href);

              if (isExternal) {
                return (
                  <TrackedExternalLink
                    key={action.href}
                    href={action.href}
                    event={action.event}
                    eventProperties={action.eventProperties}
                    className={className}
                  >
                    {action.label}
                  </TrackedExternalLink>
                );
              }

              return (
                <Link key={action.href} href={action.href} className={className}>
                  {action.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
