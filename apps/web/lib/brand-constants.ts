export const BRAND_NAME = "Blockchain Week - UNGA Edition";
export const BRAND_SEO_TITLE = "Blockchain Week - UNGA Edition 2027 · Times Square, New York";
export const LOGO_WHITE = "/brand/logo-white.png";
export const LOGO_MAIN = "/brand/logo-main.png";
export const LOGO_BLACK = "/brand/logo-black.png";
export const LOGO_WIDTH = 683;
export const LOGO_HEIGHT = 414;
export const SOCIAL_PREVIEW_IMAGE = "/opengraph-image.png";
export const SOCIAL_PREVIEW_WIDTH = 1200;
export const SOCIAL_PREVIEW_HEIGHT = 630;
export const BRAND_TAGLINE =
  "Bitcoin · AI & Energy · Space · Fashion during UNGA 2027";
export const BRAND_DESCRIPTION =
  "Blockchain Week - UNGA Edition 2027 is a six-day blockchain gathering during the United Nations General Assembly in Times Square, New York.";
export const BRAND_KEYWORDS = [
  "Blockchain Week - UNGA Edition",
  "Blockchain Week UNGA Edition 2027",
  "UNGA",
  "UNGA 82",
  "Times Square",
  "blockchain conference",
  "Bitcoin",
  "New York",
] as const;
export const BRAND_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.blockchainweek.ai";
export const EVENT_DATES = "September 13-18, 2027";
export const EVENT_LOCATION = "Times Square, New York";
export const VENUE_NAME = "Times Square";
export const VENUE_STREET = "";
export const VENUE_CITY_LINE = "New York, NY";
export const VENUE_FULL = EVENT_LOCATION;
export const CONFERENCE_DATES = "Dates to be announced";
export const CONFERENCE_LOCATION = EVENT_LOCATION;
export const CONFERENCE_EYEBROW = `Flagship conference days: ${CONFERENCE_DATES}`;
export const UN_DISCLAIMER =
  "Blockchain Week - UNGA Edition is an independent initiative and is not affiliated with the United Nations.";
export const FIRESIDE_DISCLAIMER =
  "Blockchain Week - UNGA Edition is an independent initiative and is not affiliated with the United Nations. Candidates for Secretary-General appear in their personal capacity.";
export const CONTACT_EMAIL = "contact@blockchainweek.ai";
export const CONTACT_PHONE = "(202) 436-6577";
export const SPONSORSHIP_EMAIL = "sponsorships@blockchainweek.ai";
export const NOREPLY_EMAIL = "noreply@blockchainweek.ai";

/** Legacy hosts that permanently redirect to BRAND_URL. */
export const LEGACY_SITE_HOSTS = [
  "unblockchainweek.com",
  "www.unblockchainweek.com",
] as const;

export const TICKET_CHECKOUT = {
  ga: "https://buy.stripe.com/aFa28qbxX3pAdza8NFfjG16",
  vip: "https://buy.stripe.com/00wcN47hH8JUamYaVNfjG17",
} as const;

export const TICKETS_SECTION_ID = "tickets";
export const TICKETS_SECTION_HASH = `#${TICKETS_SECTION_ID}`;
export const TICKETS_ANCHOR = `/${TICKETS_SECTION_HASH}`;

export const SESSIONIZE_SPEAKERS_URL = "https://sessionize.com/UN-Blockchain-Week";

export const FIRESIDE_PATH = "/ai-peace-united-nations-2027";
/** Fill in when the Luma event is published. Falls back to the public calendar. */
export const FIRESIDE_LUMA_URL = "";
/** YouTube live or replay. The fireside player embeds this id. */
export const YOUTUBE_VIDEO_ID = "bOh3-vfSWbU";
export const YOUTUBE_WATCH_URL = `https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`;
export const FIRESIDE_START_ISO = "2026-10-13T10:00:00-04:00";
/** Live window ends two hours after the start, then the page switches to replay. */
export const FIRESIDE_LIVE_END_ISO = "2026-10-13T12:00:00-04:00";
