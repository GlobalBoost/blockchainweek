export const SPEAKERS_RETURN_KEY = "speakers-list-return";
export const SPEAKERS_RESTORE_KEY = "speakers-list-restore";

export type SpeakersReturnState = {
  path: string;
  scrollY: number;
  query?: string;
  activeTheme?: string;
};

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
