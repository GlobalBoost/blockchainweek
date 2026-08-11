import path from "path";
import type { Speaker } from "../../lib/types";
import { inferSpeakerThemes } from "../../lib/speaker-themes";
import type { SyncConfig } from "./config";
import { CONTENT_DIR, OVERRIDES_DIR, PUBLIC_DIR } from "./config";
import { WordPressClient, mapWithConcurrency } from "./client";
import { downloadAsset, publicPathFromDest } from "./download-asset";
import {
  mergeSpeakers,
  loadSpeakerOverrides,
  loadExcludedSpeakerSlugs,
  loadPreservedSpeakerSlugs,
  diffSpeakerCounts,
  syncSpeakerOrder,
} from "./merge-speakers";
import {
  parseSpeakersListingHtml,
  type SpeakerListing,
} from "./parse-speakers-listing";
import { hasSpeakerDetails, parseSpeakerPageHtml } from "./parse-speaker-page";
import { readJsonFile, resolveContentPath, writeJsonFile } from "./write-json";

async function fetchSpeakersListing(
  client: WordPressClient,
  wordpressUrl: string
): Promise<SpeakerListing[]> {
  const html = await client.fetchHtml("/speakers/");
  return parseSpeakersListingHtml(html, wordpressUrl);
}

async function fetchSpeakerDetails(
  client: WordPressClient,
  slug: string,
  wordpressUrl: string
): Promise<ReturnType<typeof parseSpeakerPageHtml>> {
  try {
    const wpPage = await client.fetchPageBySlug(slug);
    if (wpPage?.contentHtml) {
      const parsed = parseSpeakerPageHtml(wpPage.contentHtml);
      if (hasSpeakerDetails(parsed)) return parsed;
    }
  } catch {
    // fall through to HTML fetch
  }

  for (const pagePath of [`/${slug}/`, `/${slug}-2/`]) {
    try {
      const html = await client.fetchHtml(`${wordpressUrl}${pagePath}`);
      const parsed = parseSpeakerPageHtml(html);
      if (hasSpeakerDetails(parsed)) return parsed;
    } catch {
      // try next URL
    }
    await client.throttle();
  }

  return parseSpeakerPageHtml("");
}

async function resolveSpeakerPhoto(
  client: WordPressClient,
  slug: string,
  listingPhotoUrl: string,
  config: SyncConfig
): Promise<string> {
  let photoUrl = listingPhotoUrl;

  if (!photoUrl) {
    const page = await client.fetchPageBySlug(slug);
    if (page?.featuredMediaId) {
      const media = await client.fetchMedia(page.featuredMediaId);
      if (media?.sourceUrl) photoUrl = media.sourceUrl;
    }
  }

  if (!photoUrl) return `/speakers/${slug}.jpg`;

  const ext = path.extname(new URL(photoUrl).pathname) || ".jpg";
  const destPath = path.join(PUBLIC_DIR, "speakers", `${slug}${ext}`);
  const ok = await downloadAsset(photoUrl, destPath, config.wordpressUrl, config.dryRun);
  return ok ? publicPathFromDest(destPath, PUBLIC_DIR) : `/speakers/${slug}.jpg`;
}

function buildSpeaker(listing: SpeakerListing, details: ReturnType<typeof parseSpeakerPageHtml>, photo: string): Speaker {
  const title = details.detailTitle || listing.title || "Speaker";
  const company = listing.company || "";
  const bio =
    details.bio ||
    `${listing.name} is a speaker at Blockchain Week - UNGA Edition 2026.${company ? ` ${company}.` : ""}`;

  const speaker: Speaker = {
    slug: listing.slug,
    name: listing.name,
    title,
    company,
    bio,
    expertise: details.expertise,
    photo,
    themes: inferSpeakerThemes({
      title,
      company,
      bio,
      headline: details.headline,
      tagline: details.tagline,
      subtitle: details.subtitle,
      expertise: details.expertise,
      signatureMoves: details.signatureMoves,
    }),
    featured: false,
  };

  if (details.headline) speaker.headline = details.headline;
  if (details.tagline) speaker.tagline = details.tagline;
  if (details.subtitle) speaker.subtitle = details.subtitle;
  if (details.signatureMoves.length) speaker.signatureMoves = details.signatureMoves;
  if (details.quote) speaker.quote = details.quote;
  if (details.social) speaker.social = details.social;
  if (details.performance) speaker.performance = details.performance;

  return speaker;
}

export async function syncSpeakers(config: SyncConfig): Promise<{ ok: boolean; count: number }> {
  const speakersPath = resolveContentPath(CONTENT_DIR, "speakers.json");
  const overridesPath = resolveContentPath(OVERRIDES_DIR, "speakers.json");
  const excludePath = resolveContentPath(OVERRIDES_DIR, "speakers-exclude.json");
  const existing = readJsonFile<Speaker[]>(speakersPath, []);

  const client = new WordPressClient(config.wordpressUrl, config.fetchDelayMs);

  try {
    console.log("Syncing speakers...");
    const listing = await fetchSpeakersListing(client, config.wordpressUrl);
    console.log(`  Found ${listing.length} speakers on listing page`);

    if (!listing.length) {
      console.warn("  No speakers found; keeping existing speakers.json");
      return { ok: false, count: existing.length };
    }

    const preservePath = resolveContentPath(OVERRIDES_DIR, "speakers-preserve.json");
    const preserved = loadPreservedSpeakerSlugs(preservePath);
    const existingBySlug = new Map(existing.map((speaker) => [speaker.slug, speaker]));

    const speakers = await mapWithConcurrency(listing, config.fetchConcurrency, async (item, index) => {
      // Skip WordPress fetch/photo overwrite for locally preserved speakers.
      if (preserved.has(item.slug) && existingBySlug.has(item.slug)) {
        const local = existingBySlug.get(item.slug)!;
        console.log(`  🔒 [${index + 1}/${listing.length}] ${local.name} (preserved local)`);
        await client.throttle();
        return local;
      }

      const details = await fetchSpeakerDetails(client, item.slug, config.wordpressUrl);
      const photo = config.dryRun
        ? item.photoUrl
          ? `/speakers/${item.slug}${path.extname(new URL(item.photoUrl).pathname) || ".jpg"}`
          : `/speakers/${item.slug}.jpg`
        : await resolveSpeakerPhoto(client, item.slug, item.photoUrl, config);

      const speaker = buildSpeaker(item, details, photo);
      console.log(`  ✓ [${index + 1}/${listing.length}] ${speaker.name}`);
      await client.throttle();
      return speaker;
    });

    speakers.sort((a, b) => a.name.localeCompare(b.name));

    const overrides = loadSpeakerOverrides(overridesPath);
    const excluded = loadExcludedSpeakerSlugs(excludePath);
    const merged = mergeSpeakers(speakers, overrides, excluded, existing, preserved);

    const orderPath = resolveContentPath(CONTENT_DIR, "speaker-order.json");
    const existingOrder = readJsonFile<string[]>(orderPath, []);
    const { order, added: orderAdded } = syncSpeakerOrder(existingOrder, merged, excluded);

    console.log(`  Speakers: ${diffSpeakerCounts(existing, merged)}`);
    if (orderAdded.length) {
      console.log(`  Order: appended ${orderAdded.length} → ${orderAdded.join(", ")}`);
    } else {
      console.log(`  Order: unchanged (${order.length} entries)`);
    }

    if (!config.dryRun) {
      writeJsonFile(speakersPath, merged, false);
      writeJsonFile(orderPath, order, false);
    } else {
      console.log("  [dry-run] Skipped writing speakers.json / speaker-order.json");
    }

    return { ok: true, count: merged.length };
  } catch (error) {
    console.error("  Speaker sync failed:", error instanceof Error ? error.message : error);
    console.warn("  Keeping existing speakers.json");
    return { ok: false, count: existing.length };
  }
}
