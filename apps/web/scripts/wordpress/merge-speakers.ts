import type { Speaker } from "../../lib/types";
import { inferSpeakerThemes } from "../../lib/speaker-themes";
import { readJsonFile } from "./write-json";
import { replaceLegacyBrandName } from "./html";

export type SpeakerOverride = Partial<Speaker> & { featured?: boolean };

function rewriteSpeakerBrand(speaker: Speaker): Speaker {
  return {
    ...speaker,
    title: replaceLegacyBrandName(speaker.title),
    company: replaceLegacyBrandName(speaker.company),
    bio: replaceLegacyBrandName(speaker.bio),
    headline: speaker.headline ? replaceLegacyBrandName(speaker.headline) : undefined,
    tagline: speaker.tagline ? replaceLegacyBrandName(speaker.tagline) : undefined,
    subtitle: speaker.subtitle ? replaceLegacyBrandName(speaker.subtitle) : undefined,
    expertise: speaker.expertise.map(replaceLegacyBrandName),
    signatureMoves: speaker.signatureMoves?.map(replaceLegacyBrandName),
    quote: speaker.quote ? replaceLegacyBrandName(speaker.quote) : undefined,
  };
}

export function loadSpeakerOverrides(overridesPath: string): Record<string, SpeakerOverride> {
  return readJsonFile<Record<string, SpeakerOverride>>(overridesPath, {});
}

export function loadExcludedSpeakerSlugs(excludePath: string): Set<string> {
  return new Set(readJsonFile<string[]>(excludePath, []));
}

export function loadPreservedSpeakerSlugs(preservePath: string): Set<string> {
  return new Set(readJsonFile<string[]>(preservePath, []));
}

function applyOverride(speaker: Speaker, override?: SpeakerOverride): Speaker {
  if (!override) {
    const { badge: _badge, ...rest } = speaker;
    return rest;
  }

  const merged: Speaker = { ...speaker, ...override };
  delete merged.badge;

  if (override.featured !== undefined) {
    merged.featured = override.featured;
  }

  merged.themes = inferSpeakerThemes({
    title: merged.title,
    company: merged.company,
    bio: merged.bio,
    headline: merged.headline,
    tagline: merged.tagline,
    subtitle: merged.subtitle,
    expertise: merged.expertise,
    signatureMoves: merged.signatureMoves,
  });

  return merged;
}

export function mergeSpeakers(
  speakers: Speaker[],
  overrides: Record<string, SpeakerOverride>,
  excludedSlugs: Set<string> = new Set(),
  existingLocal: Speaker[] = [],
  preservedSlugs: Set<string> = new Set()
): Speaker[] {
  const existingBySlug = new Map(existingLocal.map((speaker) => [speaker.slug, speaker]));

  const fromWordpress = speakers
    .filter((speaker) => !excludedSlugs.has(speaker.slug))
    .map((speaker) => {
      // Local curated profiles always win over WordPress for preserved slugs.
      if (preservedSlugs.has(speaker.slug)) {
        const local = existingBySlug.get(speaker.slug);
        if (local) {
          return applyOverride(local, overrides[speaker.slug]);
        }
      }

      return applyOverride(speaker, overrides[speaker.slug]);
    });

  // Keep manually curated speakers that are not (yet) on the WordPress listing.
  const syncedSlugs = new Set(fromWordpress.map((speaker) => speaker.slug));
  const localOnly = existingLocal.filter(
    (speaker) => !syncedSlugs.has(speaker.slug) && !excludedSlugs.has(speaker.slug)
  );

  return [...fromWordpress, ...localOnly].map(rewriteSpeakerBrand);
}

export function diffSpeakerCounts(before: Speaker[], after: Speaker[]): string {
  const beforeSlugs = new Set(before.map((s) => s.slug));
  const afterSlugs = new Set(after.map((s) => s.slug));
  const added = after.filter((s) => !beforeSlugs.has(s.slug)).length;
  const removed = before.filter((s) => !afterSlugs.has(s.slug)).length;
  return `${before.length} → ${after.length} (${added} added, ${removed} removed)`;
}

/** Keep existing order; append newly synced speakers; drop slugs no longer present. */
export function syncSpeakerOrder(
  existingOrder: string[],
  speakers: Speaker[],
  excludedSlugs: Set<string> = new Set()
): { order: string[]; added: string[] } {
  const present = new Set(
    speakers.filter((speaker) => !excludedSlugs.has(speaker.slug)).map((speaker) => speaker.slug)
  );
  const order = existingOrder.filter((slug) => present.has(slug));
  const known = new Set(order);
  const added: string[] = [];

  for (const speaker of speakers) {
    if (excludedSlugs.has(speaker.slug) || known.has(speaker.slug)) continue;
    order.push(speaker.slug);
    known.add(speaker.slug);
    added.push(speaker.slug);
  }

  return { order, added };
}
