export function decodeHtml(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&hellip;/g, "…")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function stripTags(html: string): string {
  return decodeHtml(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

export function cleanSlug(raw: string): string {
  return raw.replace(/-2$/, "").replace(/-+$/, "");
}

/** Hosts that may still appear in CMS HTML after the apex → cms cutover. */
export function wordpressContentHosts(wordpressUrl: string): string[] {
  const primary = new URL(wordpressUrl).host.toLowerCase();
  const hosts = new Set<string>([
    primary,
    "cms.unblockchainweek.com",
    "unblockchainweek.com",
    "www.unblockchainweek.com",
  ]);
  return [...hosts];
}

/** Regex fragment matching any known WordPress content host. */
export function wordpressHostPattern(wordpressUrl: string): string {
  return wordpressContentHosts(wordpressUrl)
    .map((host) => host.replace(/\./g, "\\."))
    .join("|");
}

export function normalizeAssetUrl(url: string, wordpressUrl: string): string {
  const hostPattern = wordpressHostPattern(wordpressUrl);
  let normalized = url
    .replace(/&#038;/g, "&")
    .replace(/^http:\/\//i, "https://")
    .trim();

  // Relative WordPress uploads / paths → absolute CMS URL
  if (normalized.startsWith("/wp-content/") || normalized.startsWith("/wp-includes/")) {
    return `${wordpressUrl}${normalized}`;
  }

  // Legacy apex/www (and http) hosts → current WORDPRESS_URL
  normalized = normalized.replace(
    new RegExp(`https?:\\/\\/(?:${hostPattern})`, "i"),
    wordpressUrl
  );

  return normalized;
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
