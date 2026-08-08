/** Decode HTML entities from migrated WordPress content */
export function decodeHtml(text: string): string {
  if (!text) return "";
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
    .trim();
}

export function sanitizeSpeakerText(text: string): string {
  const decoded = decodeHtml(text);
  // Strip any leftover script/css junk that may have been scraped
  if (
    decoded.includes("function updateCountdown") ||
    decoded.includes("@import url") ||
    decoded.includes("wp-block-") ||
    decoded.length > 2000
  ) {
    return "";
  }
  return decoded;
}

/** Remove surrounding straight or curly quotation marks from scraped quotes */
export function stripSurroundingQuotes(text: string): string {
  return text.replace(/^[\u201C\u201D\u2018\u2019"'«»]+|[\u201C\u201D\u2018\u2019"'«»]+$/g, "").trim();
}
