import { SectionHeader } from "@/components/ui/SectionHeader";
import { getPricing } from "@/lib/content";
import { TICKETS_SECTION_ID } from "@/lib/brand-constants";

export function TicketPricing() {
  const tiers = getPricing();

  return (
    <section id={TICKETS_SECTION_ID} className="section-dark scroll-mt-24 py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader
          eyebrow="Tickets On Sale Now – Standard Pricing Phase"
          title="Secure Your Spot Before Prices Rise"
          subtitle="Price increases every few weeks to reward early action. Current prices end September 1, 2026."
          subtitleClassName="max-w-none lg:whitespace-nowrap"
          theme="dark"
        />

        <p className="mx-auto -mt-6 mb-10 max-w-2xl text-center text-sm text-white/60">
          Next price increase in ~30 days (September 1)
        </p>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2 md:items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex h-full flex-col rounded-2xl border p-5 sm:p-8 ${
                tier.popular
                  ? "border-gold bg-gradient-to-b from-gold/10 to-transparent"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-bold uppercase text-black">
                  Most Popular
                </span>
              )}
              <p className="text-sm uppercase tracking-wider text-muted">Standard Pricing</p>
              <p className="mt-2 text-sm uppercase tracking-wider text-muted">{tier.subtitle}</p>
              <h3 className="mt-1 text-2xl font-bold">{tier.name}</h3>
              <p className="mt-4 heading-font text-5xl text-un-blue">${tier.price}</p>
              {tier.nextPrice && (
                <p className="mt-1 text-sm text-muted">→ will rise to ${tier.nextPrice}</p>
              )}
              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm text-white/80">
                    <span className="text-un-blue">✓</span> {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a
                  href={tier.checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block rounded-full py-3 text-center text-sm font-bold uppercase tracking-wider transition ${
                    tier.popular
                      ? "bg-gold text-black hover:bg-gold/90"
                      : "bg-un-blue text-white hover:bg-un-blue/90"
                  }`}
                >
                  {tier.ctaLabel}
                </a>
                <p className="mt-3 text-center text-xs text-white/50">
                  Powered by Stripe • Secure • Instant confirmation
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          Prices will automatically increase on September 1.
          <br />
          Early buyers save up to 80% • Limited VIP tickets available.
        </p>
      </div>
    </section>
  );
}
