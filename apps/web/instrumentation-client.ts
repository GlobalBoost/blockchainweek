import posthog from "posthog-js";
import {
  getPostHogProjectToken,
  getPostHogUiHost,
  isPostHogEnabled,
  POSTHOG_PROXY_PATH,
} from "@/lib/posthog-config";

if (isPostHogEnabled()) {
  posthog.init(getPostHogProjectToken(), {
    api_host: POSTHOG_PROXY_PATH,
    ui_host: getPostHogUiHost(),
    defaults: "2026-05-30",
    capture_pageview: false,
    capture_exceptions: true,
    person_profiles: "always",
  });
}
