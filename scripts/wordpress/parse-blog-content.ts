import { decodeHtml } from "./html";
import { normalizeAssetUrl } from "./html";
import sanitizeHtml from "sanitize-html";

export interface WpPostRaw {
  slug: string;
  date: string;
  modified: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  link: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url?: string }>;
    "wp:term"?: Array<Array<{ name: string; slug: string }>>;
    author?: Array<{ name: string }>;
  };
}

export function stripHtmlToText(html: string): string {
  return decodeHtml(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function removeDecorativeSections(html: string): string {
  const decorativeLabels = [
    "LIVE TICKER",
    "LIVE MARKET SCROLLING BANNER",
    "HERO",
    "HEADER",
    "NAVIGATION",
    "SPEAKERS",
    "ABOUT + CTA",
    "CTA",
    "FOOTER",
  ];
  const labelPattern = decorativeLabels.join("|").replace(/\+/g, "\\+");
  const sectionPattern = new RegExp(
    `<!--\\s*=+\\s*(?:${labelPattern})\\s*=+\\s*-->[\\s\\S]*?(?=<!--\\s*=+|$)`,
    "gi"
  );
  return html.replace(sectionPattern, "");
}

function normalizeHeading(text: string): string {
  return stripHtmlToText(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function cleanArticleStructure(html: string, title: string): string {
  const normalizedTitle = normalizeHeading(title);

  let cleaned = html.replace(/<(h2|h3)[^>]*>([\s\S]*?)<\/\1>/gi, (match, _tag, content) => {
    const heading = normalizeHeading(content);
    if (!heading) return "";
    if (
      heading === normalizedTitle ||
      (heading.length > 35 &&
        (normalizedTitle.includes(heading) || heading.includes(normalizedTitle)))
    ) {
      return "";
    }
    return match;
  });

  // Turn text-only layout boxes into paragraphs, then flatten the remaining
  // WordPress page-builder wrappers into normal article flow.
  for (let pass = 0; pass < 3; pass++) {
    cleaned = cleaned.replace(
      /<div>\s*([^<>\n][^<>]*?)\s*<\/div>/gi,
      (_match, text) => `<p>${text.trim()}</p>`
    );
  }
  cleaned = cleaned.replace(/<\/?div>/gi, "");

  cleaned = cleaned
    .replace(/<p>\s*(?:<br\s*\/?>)?\s*<\/p>/gi, "")
    .replace(/(?:\s*<hr>\s*){2,}/gi, "<hr>")
    .replace(/\n{3,}/g, "\n\n");

  return cleaned.trim();
}

export function parseBlogContentHtml(
  rawHtml: string,
  wordpressUrl: string,
  title = ""
): string {
  let html = rawHtml.replace(/<br\s*\/?>/gi, "\n");

  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) html = bodyMatch[1];

  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (articleMatch) html = articleMatch[1];

  html = removeDecorativeSections(html);
  html = sanitizeBlogHtml(html, wordpressUrl);
  return cleanArticleStructure(html, title);
}

export function sanitizeBlogHtml(html: string, wordpressUrl: string): string {
  let cleaned = html
    .replace(/<!DOCTYPE[^>]*>/gi, "")
    .replace(/<\/?html[^>]*>/gi, "")
    .replace(/<head[\s\S]*?<\/head>/gi, "");

  cleaned = cleaned.replace(
    /src="(\/wp-content[^"]+)"/gi,
    (_, src) => `src="${wordpressUrl}${src}"`
  );
  cleaned = cleaned.replace(
    /href="(\/wp-content[^"]+)"/gi,
    (_, href) => `href="${wordpressUrl}${href}"`
  );

  cleaned = cleaned.replace(/src="(https?:\/\/[^"]+)"/gi, (match, src) => {
    return `src="${normalizeAssetUrl(src, wordpressUrl)}"`;
  });

  cleaned = cleaned.replace(/<p>\s*<\/p>/gi, "");
  cleaned = cleaned.replace(/^(\s*<\/p>\s*)+/i, "");
  cleaned = cleaned.replace(/(\s*<\/p>\s*)+$/i, "");

  const escapedHost = wordpressUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  cleaned = cleaned.replace(
    new RegExp(`href="${escapedHost}([^"]*)"`, "gi"),
    'href="$1"'
  );

  cleaned = sanitizeHtml(cleaned, {
    allowedTags: [
      "p",
      "br",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "a",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "ul",
      "ol",
      "li",
      "blockquote",
      "figure",
      "figcaption",
      "img",
      "iframe",
      "div",
      "span",
      "hr",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "code",
      "pre",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel", "title"],
      img: ["src", "alt", "title", "width", "height", "loading", "decoding"],
      iframe: [
        "src",
        "title",
        "width",
        "height",
        "frameborder",
        "allow",
        "allowfullscreen",
        "referrerpolicy",
      ],
      th: ["colspan", "rowspan", "scope"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedIframeHostnames: ["www.youtube.com", "youtube.com", "player.vimeo.com"],
    transformTags: {
      h1: "h2",
      a: (tagName, attribs) => {
        const external = /^https?:\/\//i.test(attribs.href ?? "");
        return {
          tagName,
          attribs: external
            ? { ...attribs, target: "_blank", rel: "noopener noreferrer" }
            : attribs,
        };
      },
    },
    exclusiveFilter(frame) {
      return (
        ["script", "style", "nav", "header", "footer", "form", "button", "input"].includes(
          frame.tag
        ) || frame.tag === "meta" || frame.tag === "link"
      );
    },
  });

  return cleaned.replace(/\n{3,}/g, "\n\n").trim();
}
