export interface SyncConfig {
  wordpressUrl: string;
  enabled: boolean;
  syncSpeakers: boolean;
  syncSponsors: boolean;
  syncMediaPartners: boolean;
  syncBlog: boolean;
  fetchDelayMs: number;
  fetchConcurrency: number;
  dryRun: boolean;
  speakersOnly: boolean;
  sponsorsOnly: boolean;
  blogOnly: boolean;
}

function envBool(key: string, defaultValue: boolean): boolean {
  const value = process.env[key];
  if (value === undefined) return defaultValue;
  return value === "true" || value === "1";
}

export function loadSyncConfig(argv: string[] = process.argv.slice(2)): SyncConfig {
  const dryRun = argv.includes("--dry-run");
  const speakersOnly = argv.includes("--speakers-only");
  const sponsorsOnly = argv.includes("--sponsors-only");
  const blogOnly = argv.includes("--blog-only");

  return {
    wordpressUrl: (process.env.WORDPRESS_URL ?? "https://unblockchainweek.com").replace(/\/$/, ""),
    enabled: envBool("SYNC_ENABLED", true),
    syncSpeakers: speakersOnly || (!sponsorsOnly && !blogOnly && envBool("SYNC_SPEAKERS", true)),
    syncSponsors: sponsorsOnly || (!speakersOnly && !blogOnly && envBool("SYNC_SPONSORS", true)),
    syncMediaPartners: sponsorsOnly || (!speakersOnly && !blogOnly && envBool("SYNC_MEDIA_PARTNERS", true)),
    syncBlog: blogOnly || (!speakersOnly && !sponsorsOnly && envBool("SYNC_BLOG", true)),
    fetchDelayMs: Number(process.env.SYNC_FETCH_DELAY_MS ?? 150),
    fetchConcurrency: Number(process.env.SYNC_FETCH_CONCURRENCY ?? 5),
    dryRun,
    speakersOnly,
    sponsorsOnly,
    blogOnly,
  };
}

export const ROOT_DIR = process.cwd();
export const CONTENT_DIR = `${ROOT_DIR}/content`;
export const OVERRIDES_DIR = `${CONTENT_DIR}/overrides`;
export const PUBLIC_DIR = `${ROOT_DIR}/public`;
