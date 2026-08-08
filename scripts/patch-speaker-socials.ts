import fs from "fs";

function stripTags(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

async function patchSpeaker(slug: string) {
  const res = await fetch(`https://unblockchainweek.com/${slug}/`);
  if (!res.ok) return null;
  const html = await res.text();
  const subtitleMatch = html.match(/<div class="mt-3 text-xl text-white\/70">\s*([\s\S]*?)<\/div>/i);
  const subtitle = subtitleMatch
    ? subtitleMatch[1]
        .replace(/<br\s*\/?>/gi, "\n")
        .split("\n")
        .map(stripTags)
        .filter(Boolean)
        .join("\n")
    : undefined;
  const twitterMatches = [
    ...html.matchAll(/href="(https:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/[^"]+)"/gi),
  ];
  const twitter = twitterMatches
    .map((m) => m[1])
    .find(
      (url) =>
        !/BlockchainWeeks|unblockchainweek|NetworksManager|ModelingAgent|BitcoinPalooza/i.test(url)
    );
  return { subtitle, twitter };
}

async function main() {
  const speakers = JSON.parse(fs.readFileSync("content/speakers.json", "utf8")) as Array<{
    slug: string;
    subtitle?: string;
    social?: { twitter?: string; linkedin?: string; website?: string };
  }>;

  for (const sp of speakers) {
    const patch = await patchSpeaker(sp.slug);
    if (!patch) continue;
    if (patch.subtitle) sp.subtitle = patch.subtitle;
    if (patch.twitter) {
      sp.social = sp.social || {};
      sp.social.twitter = patch.twitter;
    } else if (sp.social?.twitter?.includes("BlockchainWeeks")) {
      delete sp.social.twitter;
      if (!Object.keys(sp.social).length) delete sp.social;
    }
    await new Promise((r) => setTimeout(r, 80));
  }

  fs.writeFileSync("content/speakers.json", JSON.stringify(speakers, null, 2));
  const vit = speakers.find((s) => s.slug === "vit-jedlicka");
  console.log("vit subtitle:", vit?.subtitle);
  console.log("vit twitter:", vit?.social?.twitter);
}

main().catch(console.error);
