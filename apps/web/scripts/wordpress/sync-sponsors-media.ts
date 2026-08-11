import type { SyncConfig } from "./config";
import { CONTENT_DIR, PUBLIC_DIR } from "./config";
import { WordPressClient } from "./client";
import { downloadAsset } from "./download-asset";
import {
  getDefaultSponsors,
  sponsorDestPath,
  type SponsorRecord,
} from "./parse-sponsors";
import { scrapeMediaPartners, mediaPartnerDestPath, type MediaPartnerRecord } from "./parse-media-partners";
import { readJsonFile, resolveContentPath, writeJsonFile } from "./write-json";

export async function syncSponsors(config: SyncConfig): Promise<{ ok: boolean; count: number }> {
  const sponsorsPath = resolveContentPath(CONTENT_DIR, "sponsors.json");
  const existing = readJsonFile<SponsorRecord[]>(sponsorsPath, []);

  try {
    console.log("Syncing sponsors...");
    const sources = getDefaultSponsors(config.wordpressUrl);
    const records: SponsorRecord[] = [];

    for (const sponsor of sources) {
      const { destPath, logoPath } = sponsorDestPath(sponsor, PUBLIC_DIR);
      const ok = await downloadAsset(sponsor.url, destPath, config.wordpressUrl, config.dryRun);
      if (ok || config.dryRun) {
        records.push({ name: sponsor.name, logo: logoPath });
        console.log(`  ✓ ${sponsor.name}`);
      } else {
        console.warn(`  ✗ Failed to download ${sponsor.name}`);
      }
    }

    if (!records.length) {
      console.warn("  No sponsors synced; keeping existing sponsors.json");
      return { ok: false, count: existing.length };
    }

    // Keep local-only partners (e.g. Easner) that are not in the WP default list
    const syncedNames = new Set(records.map((r) => r.name.toLowerCase()));
    const localOnly = existing.filter((e) => !syncedNames.has(e.name.toLowerCase()));
    const merged = [...localOnly, ...records];

    if (!config.dryRun) {
      writeJsonFile(sponsorsPath, merged, false);
    } else {
      console.log("  [dry-run] Skipped writing sponsors.json");
    }

    return { ok: true, count: merged.length };
  } catch (error) {
    console.error("  Sponsor sync failed:", error instanceof Error ? error.message : error);
    return { ok: false, count: existing.length };
  }
}

export async function syncMediaPartners(config: SyncConfig): Promise<{ ok: boolean; count: number }> {
  const mediaPath = resolveContentPath(CONTENT_DIR, "media-partners.json");
  const existing = readJsonFile<MediaPartnerRecord[]>(mediaPath, []);
  const client = new WordPressClient(config.wordpressUrl, 0);

  try {
    console.log("Syncing media partners...");
    const sources = await scrapeMediaPartners(client, config.wordpressUrl);
    const records: MediaPartnerRecord[] = [];

    for (let i = 0; i < sources.length; i++) {
      const partner = sources[i];
      const { destPath, logoPath } = mediaPartnerDestPath(partner, i, PUBLIC_DIR);
      const ok = await downloadAsset(partner.url, destPath, config.wordpressUrl, config.dryRun);
      if (ok || config.dryRun) {
        records.push({ name: partner.name, logo: logoPath });
        console.log(`  ✓ ${partner.name}`);
      } else {
        console.warn(`  ✗ Failed to download ${partner.name}`);
      }
    }

    if (!records.length) {
      console.warn("  No media partners synced; keeping existing media-partners.json");
      return { ok: false, count: existing.length };
    }

    if (!config.dryRun) {
      writeJsonFile(mediaPath, records, false);
    } else {
      console.log("  [dry-run] Skipped writing media-partners.json");
    }

    return { ok: true, count: records.length };
  } catch (error) {
    console.error("  Media partner sync failed:", error instanceof Error ? error.message : error);
    return { ok: false, count: existing.length };
  }
}
