export type Theme =
  | "bitcoin"
  | "ai"
  | "space"
  | "fashion"
  | "policy"
  | "energy"
  | "investment"
  | "identity"
  | "stablecoin";

export interface Speaker {
  slug: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  headline?: string;
  badge?: string;
  tagline?: string;
  subtitle?: string;
  expertise: string[];
  signatureMoves?: string[];
  photo: string;
  themes: Theme[];
  social?: { twitter?: string; linkedin?: string; website?: string };
  featured: boolean;
  quote?: string;
  performance?: {
    title: string;
    tweetUrl: string;
  };
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  photoPosition?: string;
}

export interface ThemePillar {
  id: Theme;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

export interface AgendaSession {
  title: string;
  time: string;
}

export interface AgendaDay {
  label: string;
  date: string;
  sessions: AgendaSession[];
}

export interface PricingTier {
  id: "ga" | "vip";
  name: string;
  subtitle: string;
  price: number;
  nextPrice?: number;
  popular?: boolean;
  features: string[];
  checkoutUrl: string;
  ctaLabel: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  photo?: string;
}

export interface Sponsor {
  name: string;
  logo: string;
  url?: string;
}

export interface MediaPartner {
  name: string;
  logo: string;
}

export interface SponsorshipTierSection {
  title: string;
  items: string[];
}

export interface SponsorshipTierPricing {
  founding: string;
  early: string;
  standard: string;
  event: string;
}

export interface SponsorshipTier {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  priceLabel?: string;
  priceNote?: string | null;
  rateLabel?: string | null;
  available: number;
  color?: string;
  ctaLabel?: string;
  footnote?: string | null;
  highlights: string[];
  sections?: SponsorshipTierSection[];
  fullPrice?: SponsorshipTierPricing;
  customNote?: string;
}

export interface SponsorshipAddon {
  name: string;
  description: string;
}

export interface SponsorshipWhyPartner {
  title: string;
  description: string;
}

export interface SponsorshipComparisonRow {
  benefit: string;
  presidential: string;
  platinum: string;
  gold: string;
  silver: string;
  bronze: string;
}

export interface SponsorshipComparisonGroup {
  label: string;
  rows: SponsorshipComparisonRow[];
}

export interface SponsorshipPricingPhase {
  id: keyof SponsorshipTierPricing;
  label: string;
  period: string;
  active?: boolean;
}

export interface SponsorshipAvailability {
  tier: string;
  count: number;
}

export interface AboutHighlight {
  title: string;
  description: string;
}

export interface AboutStat {
  value: number;
  label: string;
  description: string;
}

export interface AboutContent {
  highlights: AboutHighlight[];
  stats: AboutStat[];
  images: {
    speakersPanel: string;
    speakingOpportunity: string;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  date: string;
  modified: string;
  categories: string[];
  featuredImage?: string;
  author?: string;
  readingMinutes: number;
}
