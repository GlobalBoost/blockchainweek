import { HeroVideo } from "@/components/home/HeroVideo";
import { StatsBar } from "@/components/home/StatsBar";
import { NarrativeSection } from "@/components/home/NarrativeSection";
import { KeyThemesSection } from "@/components/home/KeyThemesSection";
import { TicketPricing } from "@/components/home/TicketPricing";
import { GalaSpotlight } from "@/components/home/GalaSpotlight";
import { ExperienceMosaic } from "@/components/home/ExperienceMosaic";
import { FeaturedSpeakers } from "@/components/home/FeaturedSpeakers";
import { LumaCTA } from "@/components/home/LumaCTA";
import { SponsorMarquee } from "@/components/sponsors/SponsorMarquee";
import { MediaPartnerGrid } from "@/components/sponsors/MediaPartnerGrid";
import { CTASection } from "@/components/ui/CTASection";
import { HomeScrollRestore } from "@/components/home/HomeScrollRestore";
import { getFeaturedSpeakers } from "@/lib/content";

export default function HomePage() {
  const featuredSpeakers = getFeaturedSpeakers();

  return (
    <>
      <HomeScrollRestore />
      <HeroVideo />
      <StatsBar />
      <NarrativeSection />
      <KeyThemesSection />
      <FeaturedSpeakers speakers={featuredSpeakers} />
      <TicketPricing />
      <GalaSpotlight />
      <ExperienceMosaic />
      <LumaCTA />
      <SponsorMarquee />
      <MediaPartnerGrid />
      <CTASection />
    </>
  );
}
