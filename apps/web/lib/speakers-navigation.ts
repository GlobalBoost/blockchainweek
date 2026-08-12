import type { Speaker } from "@/lib/types";

export const SPEAKERS_RETURN_KEY = "speakers-list-return";
export const SPEAKERS_RESTORE_KEY = "speakers-list-restore";

export type SpeakersReturnState = {
  path: string;
  scrollY: number;
  query?: string;
  activeTheme?: string;
  /** Ordered speaker slugs from the list the visitor opened (filtered grid, featured, etc.). */
  listSlugs?: string[];
};

/** Prefer the next speakers in the source list; fill with theme overlap when needed. */
export function pickAlsoSpeakingSpeakers(
  speakers: Speaker[],
  currentSlug: string,
  listSlugs: string[] | undefined,
  count = 4
): Speaker[] {
  const bySlug = new Map(speakers.map((speaker) => [speaker.slug, speaker]));
  const picked: Speaker[] = [];
  const seen = new Set<string>([currentSlug]);

  const pushSlug = (slug: string) => {
    if (seen.has(slug) || picked.length >= count) return;
    const speaker = bySlug.get(slug);
    if (!speaker) return;
    seen.add(slug);
    picked.push(speaker);
  };

  if (listSlugs?.length) {
    const idx = listSlugs.indexOf(currentSlug);
    const ordered =
      idx >= 0
        ? [...listSlugs.slice(idx + 1), ...listSlugs.slice(0, idx)]
        : listSlugs.filter((slug) => slug !== currentSlug);
    for (const slug of ordered) {
      pushSlug(slug);
      if (picked.length >= count) return picked;
    }
  }

  const current = bySlug.get(currentSlug);
  const rest = speakers.filter((speaker) => !seen.has(speaker.slug));
  rest.sort((a, b) => {
    const overlap = (speaker: Speaker) =>
      speaker.themes.filter((theme) => current?.themes.includes(theme)).length;
    const diff = overlap(b) - overlap(a);
    if (diff !== 0) return diff;
    return a.name.localeCompare(b.name);
  });
  for (const speaker of rest) {
    pushSlug(speaker.slug);
    if (picked.length >= count) break;
  }

  return picked;
}

export function saveSpeakersReturnState(state: SpeakersReturnState) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SPEAKERS_RETURN_KEY, JSON.stringify(state));
}

export function readSpeakersReturnState(): SpeakersReturnState | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(SPEAKERS_RETURN_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SpeakersReturnState;
  } catch {
    return null;
  }
}

export function stageSpeakersRestore(state: SpeakersReturnState) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SPEAKERS_RESTORE_KEY, JSON.stringify(state));
}

export function consumeSpeakersRestore(): SpeakersReturnState | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(SPEAKERS_RESTORE_KEY);
  if (!raw) return null;
  sessionStorage.removeItem(SPEAKERS_RESTORE_KEY);
  try {
    return JSON.parse(raw) as SpeakersReturnState;
  } catch {
    return null;
  }
}
