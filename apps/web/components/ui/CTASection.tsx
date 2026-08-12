import Link from "next/link";
import { ArrowRight, Handshake, Mic2, Ticket, type LucideIcon } from "lucide-react";
import { TICKETS_ANCHOR } from "@/lib/brand-constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BrandName } from "@/components/ui/BrandName";
import { cn } from "@/lib/utils";

type Accent = "blue" | "gold" | "neutral";

interface CTAItem {
  title: string;
  desc: string;
  href: string;
  cta: string;
  icon: LucideIcon;
  accent: Accent;
  featured?: boolean;
}

const iconStyles: Record<Accent, string> = {
  blue: "border-un-blue/30 bg-un-blue/15 text-un-blue",
  gold: "border-gold/30 bg-gold/15 text-gold",
  neutral: "border-white/15 bg-white/5 text-white/80",
};

const buttonStyles: Record<Accent, string> = {
  blue: "bg-un-blue text-white group-hover:bg-un-blue/90",
  gold: "bg-gold text-black group-hover:bg-gold/90",
  neutral: "border border-white/20 bg-transparent text-white group-hover:border-un-blue group-hover:text-un-blue",
};

function buildCTAs(ticketsHref: string): CTAItem[] {
  return [
    {
      title: "Register Now",
      desc: "Secure your spot for UNGA + NYFW week before prices rise.",
      href: ticketsHref,
      cta: "Get tickets",
      icon: Ticket,
      accent: "blue",
      featured: true,
    },
    {
      title: "Apply to Speak",
      desc: "Shape the conversation at the UN level with policymakers and industry leaders.",
      href: "/speak",
      cta: "Apply now",
      icon: Mic2,
      accent: "neutral",
    },
    {
      title: "Become a Partner",
      desc: "Showcase your brand to global leaders during the most influential week in NYC.",
      href: "/partnerships",
      cta: "View packages",
      icon: Handshake,
      accent: "gold",
    },
  ];
}

export function CTASection({ ticketsHref = TICKETS_ANCHOR }: { ticketsHref?: string }) {
  const ctas = buildCTAs(ticketsHref);

  return (
    <section className="section-dark relative overflow-hidden py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-un-blue/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader
          theme="dark"
          eyebrow="Join the Movement"
          title="The Future Is Here. And It's Walking the Runway."
          subtitle={
            <>
              Three ways to be part of <BrandName /> during UNGA + NYFW week.
            </>
          }
          className="mb-12"
        />

        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {ctas.map((cta) => {
            const Icon = cta.icon;

            return (
              <Link
                key={cta.title}
                href={cta.href}
                className={cn(
                  "group relative flex min-h-[280px] flex-col rounded-2xl border p-6 transition duration-300 sm:p-8",
                  "hover:-translate-y-1 hover:border-white/20 hover:shadow-xl hover:shadow-black/20",
                  cta.featured
                    ? "border-un-blue/35 bg-gradient-to-b from-un-blue/15 via-un-blue/5 to-white/[0.02]"
                    : cta.accent === "gold"
                      ? "border-gold/25 bg-gradient-to-b from-gold/10 to-white/[0.02] hover:border-gold/40"
                      : "border-white/10 bg-white/[0.03]"
                )}
              >
                {cta.featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-un-blue px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                    Tickets on sale
                  </span>
                )}

                <div
                  className={cn(
                    "mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border",
                    iconStyles[cta.accent]
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </div>

                <h3 className="text-xl font-bold text-white">{cta.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/70">{cta.desc}</p>

                <span
                  className={cn(
                    "mt-6 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition",
                    buttonStyles[cta.accent]
                  )}
                >
                  {cta.cta}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
