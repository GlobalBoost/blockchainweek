/**
 * Audit + re-scrape speakers from unblockchainweek.com
 * Run: npx tsx scripts/scrape-speakers-audit.ts
 */
import fs from "fs";
import path from "path";
import { inferSpeakerThemes } from "../lib/speaker-themes";

const FEATURED_SLUGS = new Set([
  "brock-pierce",
  "vit-jedlicka",
  "hugh-dugan",
  "alex-lightman",
  "lou-kerner",
  "karla-ballard",
  "jimmy-nguyen",
  "michael-terpin",
]);

interface SpeakerListing {
  slug: string;
  name: string;
  title: string;
  company: string;
  photoUrl: string;
}

interface Speaker {
  slug: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  headline?: string;
  badge?: string;
  tagline?: string;
  subtitle?: string;
  expertise: string[];
  signatureMoves?: string[];
  photo: string;
  themes: import("../lib/types").Theme[];
  social?: { twitter?: string; linkedin?: string; website?: string };
  featured: boolean;
  quote?: string;
  performance?: {
    title: string;
    tweetUrl: string;
  };
}

function decodeHtml(text: string): string {
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

function stripTags(html: string): string {
  return decodeHtml(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function cleanSlug(raw: string): string {
  return raw.replace(/-2$/, "").replace(/-+$/, "");
}

async function scrapeSpeakersListing(): Promise<SpeakerListing[]> {
  const res = await fetch("https://unblockchainweek.com/speakers/");
  const html = await res.text();
  const blocks = html.split(/<!--\s*\d+\.\s*/).slice(1);
  const speakers: SpeakerListing[] = [];
  const seen = new Set<string>();

  for (const block of blocks) {
    const linkMatch = block.match(/href="(https:\/\/unblockchainweek\.com\/([^/"']+)\/?)"/i);
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
      photoUrl: imgMatch ? normalizePhotoUrl(imgMatch[1]) : "",
    });
  }

  return speakers;
}

function extractListSection(html: string, sectionTitle: string): string[] {
  const match = html.match(new RegExp(`${sectionTitle}<\\/h4>\\s*<ul[^>]*>([\\s\\S]*?)<\\/ul>`, "i"));
  if (!match) return [];
  const items: string[] = [];
  for (const li of match[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)) {
    const item = stripTags(li[1]).replace(/^[•\-]\s*/, "");
    if (item.length > 2 && item.length < 120) items.push(item);
  }
  return items;
}

async function scrapeSpeakerDetails(url: string): Promise<{
  bio: string;
  expertise: string[];
  signatureMoves: string[];
  quote?: string;
  badge?: string;
  headline?: string;
  tagline?: string;
  subtitle?: string;
  detailTitle?: string;
  detailCompany?: string;
  social?: { twitter?: string; linkedin?: string; website?: string };
  performance?: { title: string; tweetUrl: string };
}> {
  const res = await fetch(url);
  if (!res.ok) return { bio: "", expertise: [], signatureMoves: [] };
  const html = await res.text();

  const bioParts: string[] = [];
  const bioPatterns = [
    /<p class="text-xl md:text-2xl text-white\/85 leading-relaxed[^"]*"[^>]*>([\s\S]*?)<\/p>/gi,
    /<p class="mt-8 text-lg md:text-xl text-white\/70 leading-relaxed[^"]*"[^>]*>([\s\S]*?)<\/p>/gi,
  ];

  for (const pattern of bioPatterns) {
    for (const match of html.matchAll(pattern)) {
      const text = stripTags(match[1]);
      if (text.length > 60 && !text.includes("function updateCountdown")) {
        bioParts.push(text);
      }
    }
  }

  const expertise = extractListSection(html, "EXPERTISE");
  const signatureMoves = extractListSection(html, "SIGNATURE MOVES");

  let quote: string | undefined;
  const quoteMatch = html.match(/<blockquote class="text-xl italic[^"]*"[^>]*>([\s\S]*?)<\/blockquote>/i);
  if (quoteMatch) {
    const q = stripTags(quoteMatch[1]);
    if (q.length > 15 && q.length < 400 && !q.includes("charset")) {
      quote = q.replace(/^["""]+|["""]+$/g, "");
    }
  }

  const badgeMatch = html.match(/absolute top-6 right-6[^>]*>([\s\S]*?)<\//);
  const badge = badgeMatch ? stripTags(badgeMatch[1]) : undefined;

  const headlineMatch = html.match(
    /<h3 class="heading-font text-4xl md:text-5xl[^"]*"[^>]*>([\s\S]*?)<\/h3>/i
  );
  const headline = headlineMatch ? stripTags(headlineMatch[1]) : undefined;

  const taglineMatch = html.match(
    /<p class="text-center text-2xl md:text-3xl text-white\/80[^"]*"[^>]*>([\s\S]*?)<\/p>/i
  );
  const tagline = taglineMatch ? stripTags(taglineMatch[1]) : undefined;

  const subtitleMatch = html.match(
    /<div class="mt-3 text-xl text-white\/70">\s*([\s\S]*?)<\/div>/i
  );
  const subtitle = subtitleMatch
    ? subtitleMatch[1]
        .replace(/<br\s*\/?>/gi, "\n")
        .split("\n")
        .map((line) => stripTags(line))
        .filter(Boolean)
        .join("\n")
    : undefined;

  const detailTitleMatch = html.match(
    /<div class="mt-4 text-2xl text-\[#00f5ff\][^"]*"[^>]*>\s*([\s\S]*?)<\/div>/i
  );
  const detailCompanyMatch = html.match(
    /<div class="mt-3 text-xl text-white\/70">\s*([\s\S]*?)<\/div>/i
  );

  const linkedinMatch = html.match(/href="(https:\/\/(?:www\.)?linkedin\.com[^"]+)"/i);
  const twitterMatches = [
    ...html.matchAll(/href="(https:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/[^"]+)"/gi),
  ];
  const twitter = twitterMatches
    .map((m) => m[1])
    .find(
      (url) =>
        !/BlockchainWeeks|unblockchainweek|NetworksManager|ModelingAgent|BitcoinPalooza/i.test(url)
    );
  const websiteMatches = [
    ...html.matchAll(
      /href="(https:\/\/(?!(?:www\.)?(?:linkedin|twitter|x|facebook|instagram)\.com|unblockchainweek\.com)[^"]+)"[^>]*>\s*<i class="fa-solid fa-globe"/gi
    ),
  ];
  const website = websiteMatches[0]?.[1];

  const social =
    linkedinMatch || twitter || website
      ? {
          ...(linkedinMatch ? { linkedin: linkedinMatch[1] } : {}),
          ...(twitter ? { twitter } : {}),
          ...(website ? { website } : {}),
        }
      : undefined;

  let performance: { title: string; tweetUrl: string } | undefined;
  if (html.includes("Also Performing Live at BitcoinPalooza")) {
    const tweetStatusMatch = html.match(/https:\/\/x\.com\/[^/"']+\/status\/(\d+)/i);
    if (tweetStatusMatch) {
      performance = {
        title: "Also Performing Live at BitcoinPalooza",
        tweetUrl: `https://x.com/BitcoinPalooza/status/${tweetStatusMatch[1]}`,
      };
    }
  }

  return {
    bio: bioParts.join("\n\n"),
    expertise: expertise.slice(0, 8),
    signatureMoves: signatureMoves.slice(0, 8),
    quote,
    badge,
    headline,
    tagline,
    subtitle,
    detailTitle: detailTitleMatch ? stripTags(detailTitleMatch[1]) : undefined,
    detailCompany: detailCompanyMatch ? stripTags(detailCompanyMatch[1]) : undefined,
    social,
    performance,
  };
}

function normalizePhotoUrl(url: string): string {
  return url.replace(/&#038;/g, "&").replace("http://", "https://");
}

async function downloadPhoto(slug: string, photoUrl: string): Promise<string> {
  if (!photoUrl) return "";
  try {
    const normalized = normalizePhotoUrl(photoUrl);
    const url = new URL(normalized);
    const ext = path.extname(url.pathname) || ".jpg";
    const filename = `${slug}${ext}`;
    const dest = path.join(process.cwd(), "public", "speakers", filename);
    const res = await fetch(normalized, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!res.ok) return "";
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    return `/speakers/${filename}`;
  } catch {
    return "";
  }
}

async function main() {
  console.log("Scraping speakers listing page...");
  const listing = await scrapeSpeakersListing();
  console.log(`Found ${listing.length} speakers on listing page`);

  const speakers: Speaker[] = [];

  for (let i = 0; i < listing.length; i++) {
    const item = listing[i];
    const urls = [
      `https://unblockchainweek.com/${item.slug}/`,
      `https://unblockchainweek.com/${item.slug}-2/`,
    ];

    let details: Awaited<ReturnType<typeof scrapeSpeakerDetails>> = {
      bio: "",
      expertise: [],
      signatureMoves: [],
    };
    for (const url of urls) {
      const d = await scrapeSpeakerDetails(url);
      if (d.bio || d.expertise.length || d.signatureMoves.length) {
        details = d;
        break;
      }
    }

    const title = details.detailTitle || item.title || "Speaker";
    const company = item.company || "";
    const bio =
      details.bio ||
      `${item.name} is a speaker at Blockchain Week - UNGA Edition 2026.${company ? ` ${company}.` : ""}`;

    const themeSignals = {
      title,
      company,
      bio,
      headline: details.headline,
      badge: details.badge,
      tagline: details.tagline,
      subtitle: details.subtitle,
      expertise: details.expertise,
      signatureMoves: details.signatureMoves,
    };
    const photo = await downloadPhoto(item.slug, item.photoUrl);

    const speaker: Speaker = {
      slug: item.slug,
      name: item.name,
      title,
      company,
      bio,
      expertise: details.expertise,
      photo: photo || `/speakers/${item.slug}.jpg`,
      themes: inferSpeakerThemes(themeSignals),
      featured: FEATURED_SLUGS.has(item.slug),
    };

    if (details.headline) speaker.headline = details.headline;
    if (details.badge) speaker.badge = details.badge;
    if (details.tagline) speaker.tagline = details.tagline;
    if (details.subtitle) speaker.subtitle = details.subtitle;
    if (details.signatureMoves.length) speaker.signatureMoves = details.signatureMoves;
    if (details.quote) speaker.quote = details.quote;
    if (details.social) speaker.social = details.social;
    if (details.performance) speaker.performance = details.performance;

    speakers.push(speaker);

    console.log(
      `  ✓ ${item.name} | ${title.slice(0, 40)} | linkedin: ${details.social?.linkedin ? "yes" : "no"} | photo: ${photo ? "yes" : "MISSING"}`
    );
    await new Promise((r) => setTimeout(r, 120));
  }

  speakers.sort((a, b) => a.name.localeCompare(b.name));
  fs.writeFileSync(
    path.join(process.cwd(), "content", "speakers.json"),
    JSON.stringify(speakers, null, 2)
  );
  console.log(`\nSaved ${speakers.length} speakers`);
}

main().catch(console.error);
