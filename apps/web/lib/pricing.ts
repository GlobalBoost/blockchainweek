import { getPartnerPages, getPricing } from "@/lib/content";

export function formatTicketPrice(price: number): string {
  if (Number.isInteger(price)) {
    return price.toLocaleString("en-US");
  }

  return price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function dollarsToCents(price: number) {
  return Math.round(price * 100);
}

export function inferPurchaseFromAmount(amountCents: number | null | undefined) {
  if (amountCents == null) return {};

  for (const tier of getPricing()) {
    if (dollarsToCents(tier.price) === amountCents) {
      return { ticket_tier: tier.id, pricing_channel: "public" as const };
    }
  }

  for (const partner of getPartnerPages()) {
    for (const [id, tier] of Object.entries(partner.pricing)) {
      if (dollarsToCents(tier.partnerPrice) === amountCents) {
        return {
          ticket_tier: id,
          pricing_channel: "partner" as const,
          partner: partner.slug,
        };
      }
    }
  }

  return {};
}
