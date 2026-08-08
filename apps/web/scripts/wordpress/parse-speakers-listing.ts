import { cleanSlug, normalizeAssetUrl, stripTags } from "./html";

export interface SpeakerListing {
  slug: string;
  name: string;
  title: string;
  company: string;
  photoUrl: string;
}

export function parseSpeakersListingHtml(html: string, wordpressUrl: string): SpeakerListing[] {
  const host = new URL(wordpressUrl).host.replace(/\./g, "\\.");
  const blocks = html.split(/<!--\s*\d+\.\s*/).slice(1);
  const speakers: SpeakerListing[] = [];
  const seen = new Set<string>();

  const linkPattern = new RegExp(
    `href="(https?:\\/\\/${host}\\/([^/"']+)\\/?)"`,
    "i"
  );

  for (const block of blocks) {
    const linkMatch = block.match(linkPattern);
    const imgMatch = block.match(/src="([^"]+)"/i);
    const nameMatch = block.match(/class="speaker-name[^"]*"[^>]*>([\s\S]*?)<\//i);
    const titleMatch = block.match(/class="speaker-title[^"]*"[^>]*>([\s\S]*?)<\//i);
    const companyMatch = block.match(/class="speaker-company[^"]*"[^>]*>([\s\S]*?)<\//i);

    if (!linkMatch || !nameMatch) continue;

    const slug = cleanSlug(linkMatch[2]);
    if (seen.has(slug)) continue;
    seen.add(slug);

    speakers.push({
      slug,
      name: stripTags(nameMatch[1]),
      title: titleMatch ? stripTags(titleMatch[1]) : "",
      company: companyMatch ? stripTags(companyMatch[1]) : "",
      photoUrl: imgMatch ? normalizeAssetUrl(imgMatch[1], wordpressUrl) : "",
    });
  }

  return speakers;
}

export function parseSpeakerSlugsFromRestHtml(html: string, wordpressUrl: string): string[] {
  const host = new URL(wordpressUrl).host.replace(/\./g, "\\.");
  const pattern = new RegExp(`https?:\\/\\/${host}\\/([a-z0-9-]+)\\/?`, "gi");
  const skip = new Set([
    "speakers",
    "about",
    "team",
    "contact",
    "partnerships",
    "the-conference",
    "gallery",
    "events",
    "tickets",
    "wp-content",
    "wp-json",
  ]);
  const slugs = new Set<string>();

  for (const match of html.matchAll(pattern)) {
    const slug = cleanSlug(match[1]);
    if (!skip.has(slug) && slug.length > 2) slugs.add(slug);
  }

  return [...slugs];
}
