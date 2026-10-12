import { FIRESIDE_LIVE_END_ISO, FIRESIDE_START_ISO } from "@/lib/brand-constants";

export type FiresidePhase = "before" | "live" | "replay";

export function getFiresidePhase(now = Date.now()): FiresidePhase {
  const start = Date.parse(FIRESIDE_START_ISO);
  const end = Date.parse(FIRESIDE_LIVE_END_ISO);
  if (now < start) return "before";
  if (now < end) return "live";
  return "replay";
}

export function firesideCountdownParts(now = Date.now()) {
  const start = Date.parse(FIRESIDE_START_ISO);
  const remaining = Math.max(0, start - now);
  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds, remaining };
}
