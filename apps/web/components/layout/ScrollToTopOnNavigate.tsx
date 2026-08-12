"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Soft navigations can keep the previous page's scroll offset.
 * Reset to the top on path changes, except hash targets and
 * intentional list restores (speakers / home) which re-scroll after mount.
 */
export function ScrollToTopOnNavigate() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (window.location.hash) return;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" in window ? ("instant" as ScrollBehavior) : "auto",
    });
  }, [pathname]);

  return null;
}
