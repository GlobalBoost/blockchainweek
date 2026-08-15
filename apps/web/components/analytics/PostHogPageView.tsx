"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import posthog from "posthog-js";
import { isPostHogEnabled, syncAttribution } from "@/lib/analytics";

export function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isPostHogEnabled() || !pathname) return;

    const attribution = syncAttribution();
    const search = searchParams.toString();

    posthog.capture("$pageview", {
      $current_url: `${window.location.origin}${pathname}${search ? `?${search}` : ""}`,
      ...attribution,
    });
  }, [pathname, searchParams]);

  return null;
}
