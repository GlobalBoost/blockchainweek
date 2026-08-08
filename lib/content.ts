import speakersData from "@/content/speakers.json";
import speakerOrderData from "@/content/speaker-order.json";
import blogData from "@/content/blog.json";
import teamData from "@/content/team.json";
import themesData from "@/content/themes.json";
import conferenceData from "@/content/conference.json";
import sponsorshipData from "@/content/sponsorship.json";
import aboutData from "@/content/about.json";
import pricingData from "@/content/pricing.json";
import testimonialsData from "@/content/testimonials.json";
import sponsorsData from "@/content/sponsors.json";
import mediaPartnersData from "@/content/media-partners.json";
import type {
  AboutContent,
  AgendaDay,
  MediaPartner,
  PricingTier,
  Speaker,
  Sponsor,
  SponsorshipAddon,
  SponsorshipAvailability,
  SponsorshipComparisonGroup,
  SponsorshipPricingPhase,
  SponsorshipTier,
  SponsorshipWhyPartner,
  TeamMember,
  Testimonial,
  Theme,
  ThemePillar,
  BlogPost,
} from "@/lib/types";
import { decodeHtml, sanitizeSpeakerText, stripSurroundingQuotes } from "@/lib/html";

function normalizeSpeaker(speaker: Speaker): Speaker {
  return {
    ...speaker,
    name: decodeHtml(speaker.name),
    title: decodeHtml(speaker.title),
    company: decodeHtml(speaker.company),
    headline: speaker.headline ? decodeHtml(speaker.headline) : undefined,
    badge: speaker.badge ? decodeHtml(speaker.badge) : undefined,
    tagline: speaker.tagline ? decodeHtml(speaker.tagline) : undefined,
    subtitle: speaker.subtitle ? decodeHtml(speaker.subtitle) : undefined,
    bio: sanitizeSpeakerText(speaker.bio) || `${decodeHtml(speaker.name)} is a speaker at UN Blockchain Week 2026.`,
    expertise: speaker.expertise.map((e) => decodeHtml(e)).filter(Boolean),
    signatureMoves: speaker.signatureMoves?.map((e) => decodeHtml(e)).filter(Boolean),
    quote: speaker.quote
      ? stripSurroundingQuotes(sanitizeSpeakerText(speaker.quote))
      : undefined,
  };
}

export function getSpeakers(): Speaker[] {
  const order = speakerOrderData as string[];
  const rank = new Map(order.map((slug, index) => [slug, index]));

  return (speakersData as Speaker[])
    .map(normalizeSpeaker)
    .sort((a, b) => {
      const aRank = rank.get(a.slug) ?? Number.MAX_SAFE_INTEGER;
      const bRank = rank.get(b.slug) ?? Number.MAX_SAFE_INTEGER;
      if (aRank !== bRank) return aRank - bRank;
      return a.name.localeCompare(b.name);
    });
}

export function getFeaturedSpeakers(): Speaker[] {
  return getSpeakers().filter((s) => s.featured);
}

export function getSpeakerBySlug(slug: string): Speaker | undefined {
  return getSpeakers().find((s) => s.slug === slug);
}

export function getAllSpeakerSlugs(): string[] {
  return getSpeakers().map((s) => s.slug);
}

export function getTeam(): TeamMember[] {
  return teamData as TeamMember[];
}

export function getThemes(): ThemePillar[] {
  return themesData as ThemePillar[];
}

export function getConferenceAgenda(): AgendaDay[] {
  return conferenceData as AgendaDay[];
}

export function getSponsorshipTiers(): SponsorshipTier[] {
  return sponsorshipData.tiers as SponsorshipTier[];
}

export function getSponsorshipAddons(): SponsorshipAddon[] {
  return sponsorshipData.addons as SponsorshipAddon[];
}

export function getSponsorshipWhyPartner(): SponsorshipWhyPartner[] {
  return sponsorshipData.whyPartner as SponsorshipWhyPartner[];
}

export function getSponsorshipComparison(): SponsorshipComparisonGroup[] {
  return sponsorshipData.comparisonGroups as SponsorshipComparisonGroup[];
}

export function getSponsorshipPricingPhases(): SponsorshipPricingPhase[] {
  return sponsorshipData.pricingPhases as SponsorshipPricingPhase[];
}

export function getSponsorshipAvailability(): SponsorshipAvailability[] {
  return sponsorshipData.availability as SponsorshipAvailability[];
}

export function getSponsorshipPricingBanner(): { label: string; cta: string } {
  return sponsorshipData.pricingBanner as { label: string; cta: string };
}

export function getAboutContent(): AboutContent {
  return aboutData as AboutContent;
}

export function getPricing(): PricingTier[] {
  return pricingData as PricingTier[];
}

export function getTestimonials(): Testimonial[] {
  return testimonialsData as Testimonial[];
}

export function getSponsors(): Sponsor[] {
  return sponsorsData as Sponsor[];
}

export function getMediaPartners(): MediaPartner[] {
  return mediaPartnersData as MediaPartner[];
}

export function getBlogPosts(): BlogPost[] {
  return (blogData as BlogPost[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getBlogPosts().find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return getBlogPosts().map((p) => p.slug);
}

export function formatBlogDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const THEME_LABELS: Record<Theme, string> = {
  bitcoin: "Bitcoin",
  ai: "AI",
  space: "Space",
  fashion: "Fashion",
  policy: "Policy",
  energy: "Energy",
  investment: "Investment",
  identity: "Identity",
  stablecoin: "Stablecoin",
};

export function themeLabel(theme: Theme): string {
  return THEME_LABELS[theme];
}
