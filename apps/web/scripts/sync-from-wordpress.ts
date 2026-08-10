/**
 * WordPress → Next.js content sync
 *
 * Run: npm run sync:wordpress
 * Flags: --dry-run, --speakers-only, --sponsors-only, --blog-only
 *
 * WordPress webhook setup (optional):
 * 1. Install "WP Webhooks" or add a save_post / before_delete_post snippet in WordPress
 * 2. On publish/update/delete of posts or pages, POST to:
 *    https://www.unblockchainweek.com/api/sync/wordpress
 * 3. Header: x-sync-secret: <SYNC_SECRET>
 * 4. That endpoint triggers a Vercel deploy; sync runs during build via prebuild
 *
 * Environment:
 *   WORDPRESS_URL          – default https://cms.unblockchainweek.com
 *   SYNC_ENABLED           – set false to skip sync entirely
 *   SYNC_SPEAKERS          – default true
 *   SYNC_SPONSORS          – default true
 *   SYNC_MEDIA_PARTNERS    – default true
 *   SYNC_BLOG               – default true
 *   SYNC_FETCH_DELAY_MS    – default 150
 *   SYNC_FETCH_CONCURRENCY – default 5
 *   SYNC_SECRET / CRON_SECRET / VERCEL_DEPLOY_HOOK_URL – required for /api/sync/wordpress
 */
import { loadSyncConfig } from "./wordpress/config";
import { syncSpeakers } from "./wordpress/sync-speakers";
import { syncSponsors, syncMediaPartners } from "./wordpress/sync-sponsors-media";
import { syncBlog } from "./wordpress/sync-blog";

async function main(): Promise<void> {
  const config = loadSyncConfig();

  console.log(`WordPress sync → ${config.wordpressUrl}`);
  if (config.dryRun) console.log("[dry-run] No files will be written");

  if (!config.enabled) {
    console.log("SYNC_ENABLED=false – skipping sync");
    process.exit(0);
  }

  let hadFailure = false;

  if (config.syncSpeakers) {
    const result = await syncSpeakers(config);
    if (!result.ok) hadFailure = true;
  }

  if (config.syncSponsors) {
    const result = await syncSponsors(config);
    if (!result.ok) hadFailure = true;
  }

  if (config.syncMediaPartners) {
    const result = await syncMediaPartners(config);
    if (!result.ok) hadFailure = true;
  }

  if (config.syncBlog) {
    const result = await syncBlog(config);
    if (!result.ok) hadFailure = true;
  }

  if (hadFailure) {
    console.warn("\nSync completed with warnings (existing JSON retained where needed).");
  } else {
    console.log("\nSync completed successfully.");
  }

  // Fail open: exit 0 so Vercel builds are not blocked
  process.exit(0);
}

main().catch((error) => {
  console.error("Sync error:", error instanceof Error ? error.message : error);
  console.warn("Keeping existing content files.");
  process.exit(0);
});
