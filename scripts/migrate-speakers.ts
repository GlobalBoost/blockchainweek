/**
 * Scrape speaker data from unblockchainweek.com
 * Run: npx tsx scripts/migrate-speakers.ts
 */
import fs from "fs";
import path from "path";

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

const THEME_KEYWORDS: Record<string, string[]> = {
  bitcoin: ["bitcoin", "crypto", "stablecoin", "defi", "token", "blockchain"],
  ai: ["ai", "agent", "intelligence", "machine learning"],
  space: ["space", "orbital", "satellite"],
  fashion: ["fashion", "runway", "couture", "nyfw"],
  policy: ["policy", "diplomat", "un ", "regulation", "government", "diplomacy"],
  energy: ["energy", "carbon", "renewable", "green"],
  investment: ["investor", "venture", "capital", "fund"],
  identity: ["identity", "dao", "community"],
};

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
  expertise: string[];
  photo: string;
  themes: string[];
  featured: boolean;
  quote?: string;
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

function inferThemes(text: string): string[] {
  const lower = text.toLowerCase();
  const themes: string[] = [];
  for (const [theme, keywords] of Object.entries(THEME_KEYWORDS)) {
    if (keywords.some((k) => lower.includes(k))) themes.push(theme);
  }
  return themes.length ? themes.slice(0, 4) : ["bitcoin"];
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
      photoUrl: imgMatch ? imgMatch[1].replace("http://", "https://") : "",
    });
  }

  return speakers;
}

async function scrapeSpeakerDetails(url: string): Promise<{
  bio: string;
  expertise: string[];
  quote?: string;
}> {
  const res = await fetch(url);
  if (!res.ok) return { bio: "", expertise: [] };
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

  const expertise: string[] = [];
  const expMatch = html.match(/EXPERTISE<\/h4>\s*<ul[^>]*>([\s\S]*?)<\/ul>/i);
  if (expMatch) {
    for (const li of expMatch[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)) {
      const item = stripTags(li[1]).replace(/^[•\-]\s*/, "");
      if (item.length > 2 && item.length < 120) expertise.push(item);
    }
  }

  let quote: string | undefined;
  const quoteMatch = html.match(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/i);
  if (quoteMatch) {
    const q = stripTags(quoteMatch[1]);
    if (q.length > 15 && q.length < 300 && !q.includes("charset")) {
      quote = q.replace(/^[––-]\s*/, "");
    }
  }

  return {
    bio: bioParts.join("\n\n"),
    expertise: expertise.slice(0, 8),
    quote,
  };
}

async function downloadPhoto(slug: string, photoUrl: string): Promise<string> {
  if (!photoUrl) return "/logo.png";
  try {
    const url = new URL(photoUrl);
    const ext = path.extname(url.pathname) || ".jpg";
    const filename = `${slug}${ext}`;
    const dest = path.join(process.cwd(), "public", "speakers", filename);
    const res = await fetch(photoUrl);
    if (!res.ok) return "/logo.png";
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    return `/speakers/${filename}`;
  } catch {
    return "/logo.png";
  }
}

async function main() {
  console.log("Scraping speakers listing page...");
  const listing = await scrapeSpeakersListing();
  console.log(`Found ${listing.length} speakers on listing page`);

  const speakers: Speaker[] = [];

  for (let i = 0; i < listing.length; i++) {
    const item = listing[i];
    const wpSlug = item.slug.endsWith("-2") ? item.slug : item.slug;
    const urls = [
      `https://unblockchainweek.com/${wpSlug}/`,
      `https://unblockchainweek.com/${wpSlug}-2/`,
    ];

    let details: { bio: string; expertise: string[]; quote?: string } = {
      bio: "",
      expertise: [],
    };
    for (const url of urls) {
      const d = await scrapeSpeakerDetails(url);
      if (d.bio) {
        details = d;
        break;
      }
    }

    const bio =
      details.bio ||
      `${item.name} is a speaker at UN Blockchain Week 2026.${item.company ? ` ${item.company}.` : ""}`;

    const fullText = `${item.name} ${item.title} ${item.company} ${bio}`;
    const photo = await downloadPhoto(item.slug, item.photoUrl);

    speakers.push({
      slug: item.slug,
      name: item.name,
      title: item.title || "Speaker",
      company: item.company,
      bio,
      expertise: details.expertise,
      photo,
      themes: inferThemes(fullText),
      featured: FEATURED_SLUGS.has(item.slug),
      quote: details.quote,
    });

    console.log(`  ✓ ${item.name} – ${item.title}`);
    await new Promise((r) => setTimeout(r, 150));
  }

  speakers.sort((a, b) => a.name.localeCompare(b.name));
  fs.mkdirSync(path.join(process.cwd(), "content"), { recursive: true });
  fs.writeFileSync(
    path.join(process.cwd(), "content", "speakers.json"),
    JSON.stringify(speakers, null, 2)
  );
  console.log(`Saved ${speakers.length} speakers`);
}

main().catch(console.error);
