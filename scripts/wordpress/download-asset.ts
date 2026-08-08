import fs from "fs";
import path from "path";
import { normalizeAssetUrl } from "./html";

const USER_AGENT = "UNBlockchainWeek-Sync/1.0";

export async function downloadAsset(
  sourceUrl: string,
  destPath: string,
  wordpressUrl: string,
  dryRun: boolean
): Promise<boolean> {
  if (!sourceUrl) return false;
  if (dryRun) return true;

  try {
    const normalized = normalizeAssetUrl(sourceUrl, wordpressUrl);
    const res = await fetch(normalized, { headers: { "User-Agent": USER_AGENT } });
    if (!res.ok) return false;
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, Buffer.from(await res.arrayBuffer()));
    return true;
  } catch {
    return false;
  }
}

export function publicPathFromDest(destPath: string, publicDir: string): string {
  return `/${path.relative(publicDir, destPath).split(path.sep).join("/")}`;
}
