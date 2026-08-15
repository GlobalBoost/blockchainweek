import posthog from "posthog-js";
import { isPostHogEnabled } from "@/lib/posthog-config";

export { isPostHogEnabled } from "@/lib/posthog-config";

export function captureEvent(event: string, properties?: Record<string, unknown>) {
  if (!isPostHogEnabled()) return;
  posthog.capture(event, properties);
}
