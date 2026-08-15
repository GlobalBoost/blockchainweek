import { TicketPricingCards } from "@/components/tickets/TicketPricingCards";
import { getPricing } from "@/lib/content";

export function TicketPricing() {
  const tiers = getPricing();

  return <TicketPricingCards tiers={tiers} />;
}
