import Link from "next/link";
import Image from "next/image";
import {
  BRAND_NAME,
  CONTACT_EMAIL,
  EVENT_DATES,
  EVENT_LOCATION,
  LOGO_HEIGHT,
  LOGO_WHITE,
  LOGO_WIDTH,
  TICKETS_ANCHOR,
  UN_DISCLAIMER,
} from "@/lib/brand-constants";

const FOOTER_LINKS = [
  { name: "About", href: "/about" },
  { name: "Speakers", href: "/speakers" },
  { name: "Partnerships", href: "/partnerships" },
  { name: "Tickets", href: TICKETS_ANCHOR },
  { name: "Visa Invitation", href: "/visa-invitation" },
  { name: "Contact", href: "/contact" },
];

function SocialIcon({ name, className }: { name: string; className?: string }) {
  if (name === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );
  }
  if (name === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { href: "https://www.facebook.com/NetworksManager", label: "Facebook" },
  { href: "https://www.instagram.com/ModelingAgent", label: "Instagram" },
  { href: "https://x.com/NetworksManager", label: "X" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0d1b2a]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3 lg:px-8">
        <div>
          <Link href="/" className="inline-block">
            <Image
              src={LOGO_WHITE}
              alt={BRAND_NAME}
              width={LOGO_WIDTH}
              height={LOGO_HEIGHT}
              className="h-10 w-auto"
            />
          </Link>
          <p className="mt-3 text-sm text-muted">
            {EVENT_DATES} · {EVENT_LOCATION}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/60">{UN_DISCLAIMER}</p>
          <div className="mt-5">
            <p className="text-sm font-semibold text-white/80">Powered by</p>
            <div className="mt-2 inline-block rounded-md bg-white px-4 py-2.5">
              <Image
                src="/sponsors/globalboost.png"
                alt="GlobalBoost Media"
                width={1024}
                height={319}
                className="h-8 w-auto"
              />
            </div>
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/50">Explore</p>
          <ul className="space-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/70 transition hover:text-un-blue">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/50">Connect</p>
          <p className="text-sm text-white/70">
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-un-blue">{CONTACT_EMAIL}</a>
          </p>
          <p className="mt-2 text-sm text-white/70">26 Broadway, 3rd Floor, New York, NY 10004</p>
          <div className="mt-4 flex items-center gap-3">
            {SOCIAL_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-un-blue hover:bg-un-blue/10 hover:text-un-blue"
              >
                <SocialIcon name={label} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {BRAND_NAME} · {EVENT_LOCATION}
      </div>
    </footer>
  );
}
