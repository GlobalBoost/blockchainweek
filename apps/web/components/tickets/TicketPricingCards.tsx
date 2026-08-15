import { TrackedExternalLink } from "@/components/analytics/TrackedExternalLink";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TICKETS_SECTION_ID } from "@/lib/brand-constants";
import { formatTicketPrice } from "@/lib/pricing";
import type { PartnerPricingTier, PricingTier } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TicketPricingCardsProps {
  tiers: PricingTier[] | PartnerPricingTier[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  phaseNote?: string;
  footerNote?: string;
  phaseLabel?: string;
  partnerPricing?: boolean;
  sectionId?: string;
  className?: string;
}

function isPartnerTier(tier: PricingTier | PartnerPricingTier): tier is PartnerPricingTier {
  return "publicPrice" in tier;
}

export function TicketPricingCards({
  tiers,
  eyebrow = "Tickets On Sale Now – Standard Pricing Phase",
  title = "Secure Your Spot Before Prices Rise",
  subtitle = "Price increases every few weeks to reward early action. Current prices end September 1, 2026.",
  phaseNote = "Next price increase in ~19 days (September 1)",
  footerNote = "Prices will automatically increase on September 1.\nEarly buyers save up to 80% • Limited VIP tickets available.",
  phaseLabel = "Standard Pricing",
  partnerPricing = false,
  sectionId = TICKETS_SECTION_ID,
  className,
}: TicketPricingCardsProps) {
  return (
    <section id={sectionId} className={cn("section-dark scroll-mt-24 py-20", className)}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          subtitleClassName="max-w-none lg:whitespace-nowrap"
          theme="dark"
        />

        {phaseNote ? (
          <p className="mx-auto -mt-6 mb-10 max-w-2xl text-center text-sm text-white/60">{phaseNote}</p>
        ) : null}

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2 md:items-stretch">
          {tiers.map((tier) => {
            const partnerTier = isPartnerTier(tier) ? tier : null;

            return (
              <div
                key={tier.id}
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border p-5 sm:p-8",
                  tier.popular
                    ? "border-gold bg-gradient-to-b from-gold/10 to-transparent"
                    : "border-white/10 bg-white/5"
                )}
              >
                {tier.popular ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-bold uppercase text-black">
                    Most Popular
                  </span>
                ) : null}

                <p className="text-sm uppercase tracking-wider text-muted">{phaseLabel}</p>
                <p className="mt-2 text-sm uppercase tracking-wider text-muted">{tier.subtitle}</p>
                <h3 className="mt-1 text-2xl font-bold">{tier.name}</h3>

                {partnerPricing && partnerTier ? (
                  <div className="mt-4">
                    <p className="text-lg text-white/45 line-through">${formatTicketPrice(partnerTier.publicPrice)}</p>
                    <p className="heading-font text-5xl text-un-blue">${formatTicketPrice(tier.price)}</p>
                    <p className="mt-2 text-sm font-medium text-gold">{partnerTier.discountLabel}</p>
                  </div>
                ) : (
                  <p className="mt-4 heading-font text-5xl text-un-blue">${formatTicketPrice(tier.price)}</p>
                )}

                {tier.nextPrice ? (
                  <p className="mt-1 text-sm text-muted">→ will rise to ${formatTicketPrice(tier.nextPrice)}</p>
                ) : null}

                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm text-white/80">
                      <span className="text-un-blue">✓</span> {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <TrackedExternalLink
                    href={tier.checkoutUrl}
                    event="checkout_click"
                    eventProperties={{
                      tier: tier.id,
                      placement: partnerPricing ? "partner-pricing" : "pricing",
                    }}
                    className={cn(
                      "block rounded-full py-3 text-center text-sm font-bold uppercase tracking-wider transition",
                      tier.popular
                        ? "bg-gold text-black hover:bg-gold/90"
                        : "bg-un-blue text-white hover:bg-un-blue/90"
                    )}
                  >
                    {tier.ctaLabel}
                  </TrackedExternalLink>
                  <p className="mt-3 text-center text-xs text-white/50">
                    Powered by Stripe • Secure • Instant confirmation
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {footerNote ? (
          <p className="mt-8 whitespace-pre-line text-center text-sm text-muted">{footerNote}</p>
        ) : null}
      </div>
    </section>
  );
}
