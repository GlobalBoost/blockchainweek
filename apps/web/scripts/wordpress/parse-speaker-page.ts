import { stripTags } from "./html";

export interface SpeakerPageDetails {
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

export function parseSpeakerPageHtml(html: string): SpeakerPageDetails {
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

  const subtitleMatch = html.match(/<div class="mt-3 text-xl text-white\/70">\s*([\s\S]*?)<\/div>/i);
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
  const detailCompanyMatch = html.match(/<div class="mt-3 text-xl text-white\/70">\s*([\s\S]*?)<\/div>/i);

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

export function hasSpeakerDetails(details: SpeakerPageDetails): boolean {
  return Boolean(details.bio || details.expertise.length || details.signatureMoves.length);
}
