import Link from "next/link";
import { FIRESIDE_PATH } from "@/lib/brand-constants";

export function AnnouncementBar() {
  return (
    <Link
      href={FIRESIDE_PATH}
      className="block bg-[#0d1b2a] px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wide text-gold transition hover:text-gold/80 sm:text-sm"
    >
      LIVE Oct 13 · 10 AM ET: The Human Future with UN Secretary-General candidate Ivonne A-Baki. Watch on blockchainweek.ai →
    </Link>
  );
}
