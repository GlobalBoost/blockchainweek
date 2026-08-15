import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BRAND_NAME, EVENT_DATES, EVENT_LOCATION, LOGO_MAIN, LOGO_WIDTH, LOGO_HEIGHT } from "@/lib/brand-constants";
import { BrandName } from "@/components/ui/BrandName";
import { getPartnerLogoStyles } from "@/lib/partner-logo-styles";
import type { PartnerPage } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PartnerHero({ partner }: { partner: PartnerPage }) {
  const logoStyles = getPartnerLogoStyles(partner);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0d1b2a] via-[#0a1628] to-[#0a0a0f] py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,158,219,0.12),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(201,162,39,0.08),_transparent_50%)]" />

      <div className="relative mx-auto max-w-5xl px-4 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.22em] text-un-blue">
          {EVENT_DATES} · {EVENT_LOCATION}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-7 sm:flex-row sm:gap-14">
          {partner.logo ? (
            <div
              className={cn(
                "flex h-24 w-64 items-center justify-center overflow-hidden rounded-2xl bg-white sm:h-28 sm:w-80",
                logoStyles.boxClassName
              )}
            >
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={320}
                height={88}
                className={cn("h-full w-full object-contain", logoStyles.imageClassName)}
              />
            </div>
          ) : (
            <div className="rounded-2xl border border-white/15 bg-white/5 px-10 py-6">
              <p className="heading-font text-3xl text-white sm:text-4xl">{partner.name}</p>
            </div>
          )}

          <span className="hidden text-lg font-semibold uppercase tracking-[0.3em] text-white/35 sm:block">×</span>

          <div className="flex items-center justify-center">
            <Image
              src={LOGO_MAIN}
              alt={BRAND_NAME}
              width={LOGO_WIDTH}
              height={LOGO_HEIGHT}
              className="h-14 w-auto brightness-0 invert sm:h-[4.5rem]"
            />
          </div>
        </div>

        <p className="mt-6 text-center text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
          In partnership with <BrandName />
        </p>

        <h1 className="heading-font mt-10 text-center text-3xl leading-tight text-runway-white sm:text-4xl lg:text-5xl">
          Why {partner.name} is inviting You
        </h1>

        <div className="mx-auto mt-8 max-w-3xl space-y-5 text-center text-base leading-relaxed text-white/75 sm:text-lg">
          {partner.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>

        {partner.attribution ? (
          <p className="mt-8 text-center text-sm font-medium text-gold">{partner.attribution}</p>
        ) : null}

        {partner.website ? (
          <div className="mt-8 flex justify-center">
            <Link
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-un-blue transition hover:text-un-blue/80"
            >
              Visit {partner.name}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
