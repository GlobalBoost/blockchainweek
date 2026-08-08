import path from "path";
import { slugify } from "./html";
import type { WordPressClient } from "./client";

export interface SponsorSource {
  name: string;
  url: string;
}

export interface SponsorRecord {
  name: string;
  logo: string;
}

export function getDefaultSponsors(wordpressUrl: string): SponsorSource[] {
  const base = `${wordpressUrl}/wp-content/uploads`;
  return [
    { name: "MindWave DAO", url: `${base}/2025/08/MindWaveDAO-logo.png` },
    { name: "Bitcoin Palooza", url: `${base}/2025/08/Bitcoin-Palooza-logo-transparent.png` },
    { name: "Toobit", url: `${base}/2026/07/Toobit-Logo-2023-480x120-1.webp` },
    { name: "CryptoMondays", url: `${base}/2025/08/CryptoMondays-logo-scaled.jpg` },
    { name: "2Connect AI", url: `${base}/2026/08/2connectai.png` },
    { name: "Blockchain Kids USA", url: `${base}/2026/08/Blockchain-Kids-USA.jpeg` },
    { name: "Liberland", url: `${base}/2026/04/Liberland-logo.png` },
    { name: "Washington Elite", url: `${base}/2026/04/WashingtonElitelogo.jpeg` },
    { name: "Coinheads", url: `${base}/2026/04/coinheads_maga.png` },
    { name: "GlobalBoost", url: `${base}/2024/09/GLOBALBOOST_NEW_FINAL_1024_FULL_LOGO.png` },
    { name: "SpaceDAO", url: `${base}/2026/04/SpaceDAO.png` },
    { name: "BoostR", url: `${base}/2026/05/BoostR-logo.jpg` },
    { name: "Pubkey NYC", url: `${base}/2024/09/Pubkey-NYC-logo.png` },
    { name: "Defiance Media", url: `${base}/2026/06/Defiance-Media-UN-Blockchain-Week.jpg` },
    { name: "EcoX", url: `${base}/2026/07/EcoX.png` },
    { name: "Blockchain House Portugal", url: `${base}/2026/07/BlockchainHousePortugal.jpg` },
  ];
}

export function sponsorDestPath(
  sponsor: SponsorSource,
  publicDir: string
): { destPath: string; logoPath: string } {
  const ext = path.extname(new URL(sponsor.url).pathname);
  const filename = `${slugify(sponsor.name)}${ext}`;
  return {
    destPath: path.join(publicDir, "sponsors", filename),
    logoPath: `/sponsors/${filename}`,
  };
}

export async function scrapeHomepageSponsorUrls(
  client: WordPressClient,
  wordpressUrl: string
): Promise<SponsorSource[]> {
  try {
    const html = await client.fetchHtml("/");
    const host = new URL(wordpressUrl).host.replace(/\./g, "\\.");
    const pattern = new RegExp(
      `src="(https?:\\/\\/${host}\\/wp-content\\/uploads\\/[^"]+)"`,
      "gi"
    );
    const seen = new Set<string>();
    const scraped: SponsorSource[] = [];

    for (const match of html.matchAll(pattern)) {
      const url = match[1].replace("http://", "https://");
      if (seen.has(url)) continue;
      seen.add(url);
      const filename = path.basename(url).replace(/\.[^.]+$/, "");
      const name = filename
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      scraped.push({ name, url });
    }

    return scraped;
  } catch {
    return [];
  }
}
