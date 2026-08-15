"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import posthog from "posthog-js";
import { isPostHogEnabled } from "@/lib/analytics";

export function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isPostHogEnabled() || !pathname) return;

    const search = searchParams.toString();
    posthog.capture("$pageview", {
      $current_url: `${window.location.origin}${pathname}${search ? `?${search}` : ""}`,
    });
  }, [pathname, searchParams]);

  return null;
}
