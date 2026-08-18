import { decodeHtml } from "@/lib/html";

export const BLOG_EXCERPT_MAX_LENGTH = 200;

function collapseWhitespace(text: string): string {
  return decodeHtml(text.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

export function normalizeBlogExcerpt(
  text: string,
  maxLength = BLOG_EXCERPT_MAX_LENGTH
): string {
  const cleaned = collapseWhitespace(text);
  if (!cleaned) return "";
  if (cleaned.length <= maxLength) return cleaned;

  const truncated = cleaned.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  const base =
    lastSpace > maxLength * 0.55 ? truncated.slice(0, lastSpace) : truncated;

  return `${base.replace(/[.,;:!?\s-–—]+$/, "")}…`;
}

const SKIP_EXCERPT_PATTERNS = [
  /^for immediate release$/i,
  /^event announcement/i,
  /^blockchain week\b.*unga edition$/i,
  /^september \d+/i,
  /^flagship conference/i,
  /^new york,\s*ny\s*[–-]/i,
];

function isBoilerplateParagraph(paragraph: string): boolean {
  if (paragraph.length < 50) return true;
  if (SKIP_EXCERPT_PATTERNS.some((pattern) => pattern.test(paragraph))) return true;
  if (/^by\s/i.test(paragraph)) return true;
  if (paragraph.includes("•") && paragraph.length < 100 && !paragraph.includes(".")) return true;
  return false;
}

export function extractBlogExcerptLead(contentHtml: string): string {
  const paragraphs = [...contentHtml.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((match) => collapseWhitespace(match[1]))
    .filter(Boolean);

  const candidates = paragraphs.filter((paragraph) => !isBoilerplateParagraph(paragraph));
  const substantive = candidates.find((paragraph) => paragraph.length >= 80);
  if (substantive) return substantive;

  return candidates.find((paragraph) => paragraph.length >= 50) ?? "";
}

export function buildBlogExcerpt({
  excerpt,
  contentHtml,
  title,
}: {
  excerpt: string;
  contentHtml: string;
  title: string;
}): string {
  const fromWordPress = collapseWhitespace(excerpt);
  const fromContent = extractBlogExcerptLead(contentHtml);
  const tooLong = fromWordPress.length > BLOG_EXCERPT_MAX_LENGTH;
  const looksLikePressRelease =
    /^new york,\s*ny\s*[–-]/i.test(fromWordPress) ||
    /^for immediate release/i.test(fromWordPress);
  const wpIsBoilerplate = isBoilerplateParagraph(fromWordPress);

  const candidate =
    fromContent && (tooLong || looksLikePressRelease || wpIsBoilerplate || fromWordPress.length < 40)
      ? fromContent
      : fromWordPress || fromContent || title;

  return normalizeBlogExcerpt(candidate);
}
