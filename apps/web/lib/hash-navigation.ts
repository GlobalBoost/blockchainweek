const MAX_SCROLL_ATTEMPTS = 24;

function normalizePath(pathname: string) {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/$/, "") || "/";
}

export function getHashFromHref(href: string, baseUrl = window.location.href) {
  try {
    return new URL(href, baseUrl).hash;
  } catch {
    return "";
  }
}

export function pathsMatch(href: string, pathname = window.location.pathname) {
  try {
    const targetPath = normalizePath(new URL(href, window.location.href).pathname);
    return targetPath === normalizePath(pathname);
  } catch {
    return false;
  }
}

export function scrollToHash(hash: string, behavior: ScrollBehavior = "smooth") {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  if (!id) return false;

  let attempts = 0;

  const tryScroll = () => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior, block: "start" });
      return;
    }

    if (attempts < MAX_SCROLL_ATTEMPTS) {
      attempts += 1;
      requestAnimationFrame(tryScroll);
    }
  };

  tryScroll();
  return true;
}

export function scrollToCurrentHash(behavior: ScrollBehavior = "smooth") {
  return scrollToHash(window.location.hash, behavior);
}
