import type { Speaker } from "@/lib/types";

export const SPEAKERS_RETURN_KEY = "speakers-list-return";
export const SPEAKERS_RESTORE_KEY = "speakers-list-restore";

export type SpeakersReturnState = {
  path: string;
  scrollY: number;
  query?: string;
  activeTheme?: string;
};

/** Shuffle a copy of `items` (Fisher–Yates). */
function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Random speakers from the full lineup (excluding the current speaker). */
export function pickAlsoSpeakingSpeakers(
  speakers: Speaker[],
  currentSlug: string,
  count = 4
): Speaker[] {
  const candidates = speakers.filter((speaker) => speaker.slug !== currentSlug);
  return shuffled(candidates).slice(0, count);
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
