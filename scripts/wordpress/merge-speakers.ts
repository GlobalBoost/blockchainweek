import type { Speaker } from "../../lib/types";
import { inferSpeakerThemes } from "../../lib/speaker-themes";
import { readJsonFile } from "./write-json";

export type SpeakerOverride = Partial<Speaker> & { featured?: boolean };

export function loadSpeakerOverrides(overridesPath: string): Record<string, SpeakerOverride> {
  return readJsonFile<Record<string, SpeakerOverride>>(overridesPath, {});
}

export function mergeSpeakers(
  speakers: Speaker[],
  overrides: Record<string, SpeakerOverride>
): Speaker[] {
  return speakers.map((speaker) => {
    const override = overrides[speaker.slug];
    if (!override) return speaker;

    const merged: Speaker = { ...speaker, ...override };

    if (override.featured !== undefined) {
      merged.featured = override.featured;
    }

    merged.themes = inferSpeakerThemes({
      title: merged.title,
      company: merged.company,
      bio: merged.bio,
      headline: merged.headline,
      badge: merged.badge,
      tagline: merged.tagline,
      subtitle: merged.subtitle,
      expertise: merged.expertise,
      signatureMoves: merged.signatureMoves,
    });

    return merged;
  });
}

export function diffSpeakerCounts(before: Speaker[], after: Speaker[]): string {
  const beforeSlugs = new Set(before.map((s) => s.slug));
  const afterSlugs = new Set(after.map((s) => s.slug));
  const added = after.filter((s) => !beforeSlugs.has(s.slug)).length;
  const removed = before.filter((s) => !afterSlugs.has(s.slug)).length;
  return `${before.length} → ${after.length} (${added} added, ${removed} removed)`;
}
