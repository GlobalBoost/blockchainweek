/**
 * Download sponsor, media, gallery, and logo assets from unblockchainweek.com
 * Run: npx tsx scripts/migrate-assets.ts
 */
import fs from "fs";
import path from "path";

const BASE = "https://unblockchainweek.com/wp-content/uploads";

const SPONSORS = [
  { name: "MindWave DAO", url: `${BASE}/2025/08/MindWaveDAO-logo.png` },
  { name: "Bitcoin Palooza", url: `${BASE}/2025/08/Bitcoin-Palooza-logo-transparent.png` },
  { name: "Toobit", url: `${BASE}/2026/07/Toobit-Logo-2023-480x120-1.webp` },
  { name: "CryptoMondays", url: `${BASE}/2025/08/CryptoMondays-logo-scaled.jpg` },
  { name: "2Connect AI", url: `${BASE}/2026/08/2connectai.png` },
  { name: "Blockchain Kids USA", url: `${BASE}/2026/08/Blockchain-Kids-USA.jpeg` },
  { name: "Liberland", url: `${BASE}/2026/04/Liberland-logo.png` },
  { name: "Washington Elite", url: `${BASE}/2026/04/WashingtonElitelogo.jpeg` },
  { name: "Coinheads", url: `${BASE}/2026/04/coinheads_maga.png` },
  { name: "GlobalBoost", url: `${BASE}/2024/09/GLOBALBOOST_NEW_FINAL_1024_FULL_LOGO.png` },
  { name: "SpaceDAO", url: `${BASE}/2026/04/SpaceDAO.png` },
  { name: "BoostR", url: `${BASE}/2026/05/BoostR-logo.jpg` },
  { name: "Pubkey NYC", url: `${BASE}/2024/09/Pubkey-NYC-logo.png` },
  { name: "Defiance Media", url: `${BASE}/2026/06/Defiance-Media-UN-Blockchain-Week.jpg` },
  { name: "EcoX", url: `${BASE}/2026/07/EcoX.png` },
  { name: "Blockchain House Portugal", url: `${BASE}/2026/07/BlockchainHousePortugal.jpg` },
];

const GALLERY = [
  `${BASE}/2024/09/Threads-of-Change-The-Fusion-Fashion-Tech-Summit-at-NYFW.jpg`,
  `${BASE}/2024/09/Fusion-Fashion-Tech-Summit5.jpg`,
  `${BASE}/2026/04/IMG_1400-scaled.jpg`,
  `${BASE}/2024/09/Fusion-Fashion-Tech-Summit1.jpg`,
  `${BASE}/2024/09/Fusion-Fashion-Tech-Summit3.jpg`,
  `${BASE}/2024/09/Fusion-Fashion-Tech-Summit6.jpg`,
  `${BASE}/2024/09/fashion.jpg`,
  `${BASE}/2024/09/Pubkey-NYC5.jpg`,
];

const LOGO = `${BASE}/2024/06/UNBLOCKCHAIN2.png`;

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function download(url: string, dest: string): Promise<void> {
  const res = await fetch(url.replace("http://", "https://"));
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buf);
  console.log(`  ✓ ${path.basename(dest)}`);
}

async function scrapeMediaPartners(): Promise<{ name: string; url: string }[]> {
  const res = await fetch("https://unblockchainweek.com/");
  const html = await res.text();
  const start = html.indexOf('id="media"');
  const end = html.indexOf("<!-- TESTIMONIALS", start);
  const section = start >= 0 ? html.slice(start, end > start ? end : undefined) : html;
  const matches = [...section.matchAll(/src="(https?:\/\/unblockchainweek\.com\/wp-content\/uploads\/[^"]+)"/gi)];
  const seen = new Set<string>();
  const partners: { name: string; url: string }[] = [];
  for (const m of matches) {
    const url = m[1].replace("http://", "https://");
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

async function main() {
  const root = path.join(process.cwd(), "public");
  fs.mkdirSync(root, { recursive: true });

  console.log("Downloading logo...");
  await download(LOGO, path.join(root, "logo.png"));

  console.log("Downloading sponsors...");
  const sponsorJson: { name: string; logo: string }[] = [];
  for (const s of SPONSORS) {
    const ext = path.extname(new URL(s.url).pathname);
    const filename = `${slugify(s.name)}${ext}`;
    const logoPath = `/sponsors/${filename}`;
    await download(s.url, path.join(root, "sponsors", filename));
    sponsorJson.push({ name: s.name, logo: logoPath });
  }
  fs.writeFileSync(
    path.join(process.cwd(), "content", "sponsors.json"),
    JSON.stringify(sponsorJson, null, 2)
  );

  console.log("Scraping & downloading media partners...");
  const media = await scrapeMediaPartners();
  const mediaJson: { name: string; logo: string }[] = [];
  for (let i = 0; i < media.length; i++) {
    const m = media[i];
    const ext = path.extname(new URL(m.url).pathname) || ".png";
    const filename = `media-${i}${ext}`;
    const logoPath = `/media/${filename}`;
    try {
      await download(m.url, path.join(root, "media", filename));
      mediaJson.push({ name: m.name, logo: logoPath });
    } catch (e) {
      console.warn(`  ✗ skip ${m.name}:`, e);
    }
  }
  fs.writeFileSync(
    path.join(process.cwd(), "content", "media-partners.json"),
    JSON.stringify(mediaJson, null, 2)
  );

  console.log("Downloading gallery...");
  const galleryJson: { src: string; alt: string }[] = [];
  for (let i = 0; i < GALLERY.length; i++) {
    const url = GALLERY[i];
    const ext = path.extname(new URL(url).pathname);
    const filename = `gallery-${i}${ext}`;
    const src = `/gallery/${filename}`;
    await download(url, path.join(root, "gallery", filename));
    galleryJson.push({ src, alt: `Blockchain Week - UNGA Edition gallery ${i + 1}` });
  }
  fs.writeFileSync(
    path.join(process.cwd(), "content", "gallery.json"),
    JSON.stringify(galleryJson, null, 2)
  );

  console.log(`Done: ${sponsorJson.length} sponsors, ${mediaJson.length} media, ${galleryJson.length} gallery`);
}

main().catch(console.error);
