import posthog from "posthog-js";
import {
  attributionEventProps,
  attributionRegisterProps,
  hydrateAttribution,
  readAttribution,
} from "@/lib/attribution";
import { isPostHogEnabled } from "@/lib/posthog-config";

export { isPostHogEnabled } from "@/lib/posthog-config";

export function syncAttribution() {
  if (!isPostHogEnabled()) return {};

  const touch = hydrateAttribution();
  const stored = readAttribution();
  const registerProps = attributionRegisterProps(stored);

  if (Object.keys(registerProps).length > 0) {
    posthog.register(registerProps);
  }

  return attributionEventProps(touch);
}

export function captureEvent(event: string, properties?: Record<string, unknown>) {
  if (!isPostHogEnabled()) return;

  const stored = readAttribution();
  const lastTouch = attributionEventProps(stored?.last);

  posthog.capture(event, {
    ...lastTouch,
    ...properties,
  });
}
