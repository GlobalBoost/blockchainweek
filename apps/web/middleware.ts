import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { BRAND_URL, LEGACY_SITE_HOSTS } from "@/lib/brand-constants";

const LEGACY_HOSTS = new Set(LEGACY_SITE_HOSTS.map((host) => host.toLowerCase()));

function primaryOrigin() {
  try {
    return new URL(BRAND_URL).origin;
  } catch {
    return "https://www.blockchainweek.ai";
  }
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  if (!host || !LEGACY_HOSTS.has(host)) {
    return NextResponse.next();
  }

  const destination = new URL(
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
    primaryOrigin()
  );

  return NextResponse.redirect(destination, 308);
}

export const config = {
  // Preserve path + query for every public page (including /karla-ballard).
  // Skip Next internals, static assets, and API so CMS/cron webhooks keep working.
  matcher: [
    "/((?!api/|bwq/|_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)",
  ],
};
