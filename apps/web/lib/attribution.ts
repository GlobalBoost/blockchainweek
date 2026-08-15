const STORAGE_KEY = "bw_attribution";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export type UtmKey = (typeof UTM_KEYS)[number];

export interface AttributionTouch {
  partner_slug?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export interface StoredAttribution {
  first: AttributionTouch;
  last: AttributionTouch;
}

export function partnerSlugFromPath(pathname: string): string | undefined {
  const match = pathname.match(/^\/partners\/([^/]+)\/?$/);
  return match?.[1] ? sanitizeValue(match[1]) : undefined;
}

export function parseUtmFromSearch(search: string): AttributionTouch {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const touch: AttributionTouch = {};

  for (const key of UTM_KEYS) {
    const value = sanitizeValue(params.get(key));
    if (value) touch[key] = value;
  }

  return touch;
}

export function hasAttribution(touch: AttributionTouch) {
  return Object.values(touch).some(Boolean);
}

export function readAttribution(): StoredAttribution | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredAttribution;
    if (!parsed?.first || !parsed?.last) return null;
    return {
      first: sanitizeTouch(parsed.first),
      last: sanitizeTouch(parsed.last),
    };
  } catch {
    return null;
  }
}

export function hydrateAttribution(): AttributionTouch {
  if (typeof window === "undefined") return {};

  const fromUrl = parseUtmFromSearch(window.location.search);
  const partnerSlug = partnerSlugFromPath(window.location.pathname);
  const touch: AttributionTouch = { ...fromUrl };

  if (partnerSlug) {
    touch.partner_slug = partnerSlug;
  }

  if (!hasAttribution(touch)) {
    return readAttribution()?.last ?? {};
  }

  persistAttribution(touch);
  return touch;
}

export function attributionEventProps(touch: AttributionTouch | null | undefined) {
  if (!touch || !hasAttribution(touch)) return {};

  return {
    partner_slug: touch.partner_slug,
    utm_source: touch.utm_source,
    utm_medium: touch.utm_medium,
    utm_campaign: touch.utm_campaign,
    utm_term: touch.utm_term,
    utm_content: touch.utm_content,
  };
}

export function attributionRegisterProps(stored: StoredAttribution | null) {
  if (!stored) return {};

  const props: Record<string, string> = {};

  const first = attributionEventProps(stored.first);
  const last = attributionEventProps(stored.last);

  for (const [key, value] of Object.entries(first)) {
    if (value) props[`first_${key}`] = value;
  }

  for (const [key, value] of Object.entries(last)) {
    if (value) props[key] = value;
  }

  return props;
}

function persistAttribution(touch: AttributionTouch) {
  const stored = readAttribution();
  const next: StoredAttribution = {
    first: hasAttribution(stored?.first ?? {}) ? stored!.first : touch,
    last: touch,
  };

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore quota errors in private mode.
  }
}

function sanitizeTouch(touch: AttributionTouch): AttributionTouch {
  const sanitized: AttributionTouch = {};
  const partnerSlug = sanitizeValue(touch.partner_slug);
  if (partnerSlug) sanitized.partner_slug = partnerSlug;

  for (const key of UTM_KEYS) {
    const value = sanitizeValue(touch[key]);
    if (value) sanitized[key] = value;
  }

  return sanitized;
}

function sanitizeValue(value: string | null | undefined) {
  if (!value) return undefined;
  const cleaned = value.trim().slice(0, 180);
  return cleaned || undefined;
}
