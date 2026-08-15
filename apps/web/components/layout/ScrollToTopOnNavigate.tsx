"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { pathsMatch, scrollToCurrentHash, scrollToHash } from "@/lib/hash-navigation";

function shouldIgnoreClick(event: MouseEvent) {
  return (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}

/**
 * Soft navigations can keep the previous page's scroll offset.
 * Reset to the top on path changes, scroll to hash targets when present,
 * and handle hash links that Next.js does not always scroll to.
 */
export function ScrollToTopOnNavigate() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (shouldIgnoreClick(event)) return;

      const anchor = (event.target as Element | null)?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin || !url.hash) return;

      event.preventDefault();

      const nextPath = `${url.pathname}${url.search}${url.hash}`;
      if (pathsMatch(url.pathname)) {
        const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
        if (currentUrl !== nextPath) {
          history.pushState(null, "", nextPath);
        }
        scrollToHash(url.hash);
        return;
      }

      router.push(nextPath);
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  useEffect(() => {
    const onHashChange = () => scrollToCurrentHash();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      scrollToHash(window.location.hash, "auto");
      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" in window ? ("instant" as ScrollBehavior) : "auto",
    });
  }, [pathname]);

  return null;
}
