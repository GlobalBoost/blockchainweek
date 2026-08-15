"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Ticket, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BRAND_NAME, LOGO_HEIGHT, LOGO_MAIN, LOGO_WIDTH, TICKETS_ANCHOR, TICKETS_SECTION_HASH } from "@/lib/brand-constants";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Program", href: "/program" },
  { name: "Speakers", href: "/speakers" },
  { name: "Partnerships", href: "/partnerships" },
] as const;

const MORE_LINKS = [
  { name: "Blog", href: "/blog" },
  { name: "Team", href: "/team" },
  { name: "Speak", href: "/speak" },
  { name: "I'm Attending", href: "/im-attending" },
  { name: "Visa Invitation", href: "/visa-invitation" },
  { name: "Contact", href: "/contact" },
] as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

function isMoreActive(pathname: string) {
  return MORE_LINKS.some((item) => isActive(pathname, item.href));
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const ticketsHref = pathname === "/program" ? TICKETS_SECTION_HASH : TICKETS_ANCHOR;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
    setMobileMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const linkClass = (href: string) =>
    cn(
      "text-sm font-medium transition-colors hover:text-un-blue",
      isActive(pathname, href) ? "text-un-blue" : "text-ink/70"
    );

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 shadow-sm backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src={LOGO_MAIN}
            alt={BRAND_NAME}
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        <div className="hidden items-center gap-5 lg:flex">
          {NAV_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(item.href)}>
              {item.name}
            </Link>
          ))}

          <div ref={moreRef} className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((value) => !value)}
              aria-expanded={moreOpen}
              aria-haspopup="menu"
              className={cn(
                "inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-un-blue",
                isMoreActive(pathname) || moreOpen ? "text-un-blue" : "text-ink/70"
              )}
            >
              More
              <ChevronDown className={cn("h-4 w-4 transition-transform", moreOpen && "rotate-180")} />
            </button>

            {moreOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full z-50 mt-2 min-w-[10rem] rounded-lg border border-black/10 bg-white py-1 shadow-lg"
              >
                {MORE_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    onClick={() => setMoreOpen(false)}
                    className={cn(
                      "block px-4 py-2 text-sm font-medium transition-colors hover:bg-un-blue/5 hover:text-un-blue",
                      isActive(pathname, item.href) ? "text-un-blue" : "text-ink/80"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={ticketsHref}
            className="hidden items-center gap-2 rounded-full bg-un-blue px-4 py-2 text-sm font-semibold text-white transition hover:bg-un-blue/90 sm:flex"
          >
            <Ticket className="h-4 w-4" />
            Get Tickets
          </Link>
          <button
            type="button"
            className="rounded-md p-2 text-ink lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-black/10 bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn("text-sm font-medium", isActive(pathname, item.href) ? "text-un-blue" : "text-ink/80")}
              >
                {item.name}
              </Link>
            ))}

            <div>
              <button
                type="button"
                onClick={() => setMobileMoreOpen((value) => !value)}
                aria-expanded={mobileMoreOpen}
                className={cn(
                  "inline-flex items-center gap-1 text-sm font-medium",
                  isMoreActive(pathname) ? "text-un-blue" : "text-ink/80"
                )}
              >
                More
                <ChevronDown className={cn("h-4 w-4 transition-transform", mobileMoreOpen && "rotate-180")} />
              </button>
              {mobileMoreOpen && (
                <div className="mt-2 flex flex-col gap-2 border-l-2 border-un-blue/20 pl-4">
                  {MORE_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "text-sm font-medium",
                        isActive(pathname, item.href) ? "text-un-blue" : "text-ink/80"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href={ticketsHref}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-un-blue px-4 py-2 text-center text-sm font-semibold text-white"
            >
              Get Tickets
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
