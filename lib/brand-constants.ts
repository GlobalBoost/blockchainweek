export const BRAND_NAME = "UN Blockchain Week";
export const LOGO_WHITE = "/brand/logo-white.png";
export const LOGO_MAIN = "/brand/logo-main.png";
export const LOGO_BLACK = "/brand/logo-black.png";
export const LOGO_WIDTH = 1024;
export const LOGO_HEIGHT = 280;
export const BRAND_TAGLINE =
  "Bitcoin · AI & Energy · Space · Fashion – during UNGA + NYFW";
export const BRAND_DESCRIPTION =
  "UN Blockchain Week 2026 is the premier 10-day blockchain gathering during the United Nations General Assembly and New York Fashion Week in New York City.";
export const BRAND_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const EVENT_DATES = "September 10–19, 2026";
export const EVENT_LOCATION = "Time Square, NYC";
export const CONFERENCE_DATES = "September 16–17, 2026";
export const CONFERENCE_LOCATION = "Times Square, NYC";
export const CONFERENCE_EYEBROW = `${CONFERENCE_DATES} · ${CONFERENCE_LOCATION}`;
export const UN_DISCLAIMER =
  "UN Blockchain Week is an independent, decentralized initiative and is not affiliated with the United Nations.";
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
