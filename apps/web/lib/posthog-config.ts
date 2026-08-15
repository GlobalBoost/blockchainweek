const DEFAULT_INGEST_HOST = "https://us.i.posthog.com";

export const POSTHOG_PROXY_PATH = "/bwq";

export function getPostHogProjectToken() {
  return process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN?.trim() ?? "";
}

export function getPostHogIngestHost() {
  return process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || DEFAULT_INGEST_HOST;
}

export function getPostHogAssetHost() {
  const ingestHost = getPostHogIngestHost().replace(/\/$/, "");

  if (ingestHost.includes("eu.i.posthog.com")) {
    return "https://eu-assets.i.posthog.com";
  }

  return "https://us-assets.i.posthog.com";
}

export function getPostHogUiHost() {
  const ingestHost = getPostHogIngestHost().replace(/\/$/, "");

  if (ingestHost.includes("eu.i.posthog.com")) {
    return "https://eu.posthog.com";
  }

  return "https://us.posthog.com";
}

export function isPostHogEnabled() {
  return Boolean(getPostHogProjectToken());
}
