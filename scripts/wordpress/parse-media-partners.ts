import path from "path";
import type { WordPressClient } from "./client";

export interface MediaPartnerSource {
  name: string;
  url: string;
}

export interface MediaPartnerRecord {
  name: string;
  logo: string;
}

export async function scrapeMediaPartners(
  client: WordPressClient,
  wordpressUrl: string
): Promise<MediaPartnerSource[]> {
  const html = await client.fetchHtml("/");
  const start = html.indexOf('id="media"');
  const end = html.indexOf("<!-- TESTIMONIALS", start);
  const section = start >= 0 ? html.slice(start, end > start ? end : undefined) : html;
  const host = new URL(wordpressUrl).host.replace(/\./g, "\\.");
  const pattern = new RegExp(
    `src="(https?:\\/\\/${host}\\/wp-content\\/uploads\\/[^"]+)"`,
    "gi"
  );
  const seen = new Set<string>();
  const partners: MediaPartnerSource[] = [];

  for (const match of section.matchAll(pattern)) {
    const url = match[1].replace("http://", "https://");
    if (seen.has(url)) continue;
    seen.add(url);
    const filename = path.basename(url).replace(/\.[^.]+$/, "");
    const name = filename
      .replace(/-un-blockchain-week/gi, "")
      .replace(/-media-partner.*/gi, "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    partners.push({ name, url });
  }

  return partners;
}

export function mediaPartnerDestPath(
  partner: MediaPartnerSource,
  index: number,
  publicDir: string
): { destPath: string; logoPath: string } {
  const ext = path.extname(new URL(partner.url).pathname) || ".png";
  const filename = `media-${index}${ext}`;
  return {
    destPath: path.join(publicDir, "media", filename),
    logoPath: `/media/${filename}`,
  };
}
