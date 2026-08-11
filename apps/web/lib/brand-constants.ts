export const BRAND_NAME = "Blockchain Week - UNGA Edition";
export const BRAND_SEO_TITLE = "Blockchain Week - UNGA Edition 2026 · Times Square, NYC";
export const LOGO_WHITE = "/brand/logo-white.png";
export const LOGO_MAIN = "/brand/logo-main.png";
export const LOGO_BLACK = "/brand/logo-black.png";
export const LOGO_WIDTH = 683;
export const LOGO_HEIGHT = 414;
export const SOCIAL_PREVIEW_IMAGE = "/opengraph-image.png";
export const SOCIAL_PREVIEW_WIDTH = 1200;
export const SOCIAL_PREVIEW_HEIGHT = 630;
export const BRAND_TAGLINE =
  "Bitcoin · AI & Energy · Space · Fashion – during UNGA + NYFW";
export const BRAND_DESCRIPTION =
  "Blockchain Week - UNGA Edition 2026 is the premier 10-day blockchain gathering during the United Nations General Assembly and New York Fashion Week in New York City.";
export const BRAND_KEYWORDS = [
  "Blockchain Week - UNGA Edition",
  "Blockchain Week UNGA Edition 2026",
  "UNGA",
  "UNGA 81",
  "New York Fashion Week",
  "NYFW",
  "Times Square",
  "blockchain conference",
  "Bitcoin",
  "New York",
] as const;
export const BRAND_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://unblockchainweek.com";
export const EVENT_DATES = "September 10–19, 2026";
export const EVENT_LOCATION = "Times Square, NYC";
export const CONFERENCE_DATES = "September 16–17, 2026";
export const CONFERENCE_LOCATION = "Times Square, NYC";
export const CONFERENCE_EYEBROW = `${CONFERENCE_DATES} · ${CONFERENCE_LOCATION}`;
export const UN_DISCLAIMER =
  "Blockchain Week 2026 (UNGA Edition) is an independent initiative and is not affiliated with the United Nations.";
export const CONTACT_EMAIL = "contact@unblockchainweek.com";
export const SPONSORSHIP_EMAIL = "sponsorships@unblockchainweek.com";

export const TICKET_CHECKOUT = {
  ga: "https://buy.stripe.com/8x2aEWeK9d0a66I7JBfjG0R",
  vip: "https://buy.stripe.com/fZubJ0fOd2lwdza6FxfjG0S",
} as const;

export const TICKETS_SECTION_ID = "tickets";
export const TICKETS_SECTION_HASH = `#${TICKETS_SECTION_ID}`;
export const TICKETS_ANCHOR = `/${TICKETS_SECTION_HASH}`;

export const SESSIONIZE_SPEAKERS_URL = "https://sessionize.com/UN-Blockchain-Week";
