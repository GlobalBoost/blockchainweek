import { GalaSpotlight } from "@/components/home/GalaSpotlight";
import { StatsBar } from "@/components/home/StatsBar";
import { PartnerHero } from "@/components/partners/PartnerHero";
import { PartnerTicketPricing } from "@/components/partners/PartnerTicketPricing";
import { SponsorMarquee } from "@/components/sponsors/SponsorMarquee";
import { CTASection } from "@/components/ui/CTASection";
import { TestimonialsSection } from "@/components/ui/TestimonialsSection";
import { TICKETS_SECTION_HASH } from "@/lib/brand-constants";
import type { PartnerPage } from "@/lib/types";

export function PartnerPageContent({ partner }: { partner: PartnerPage }) {
  return (
    <>
      <PartnerHero partner={partner} />
      <PartnerTicketPricing partner={partner} />
      <GalaSpotlight />
      <StatsBar />
      <SponsorMarquee />
      <TestimonialsSection />
      <CTASection ticketsHref={TICKETS_SECTION_HASH} />
    </>
  );
}
