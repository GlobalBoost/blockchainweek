import type { ReactNode } from "react";
import { BRAND_NAME } from "@/lib/brand-constants";
import { cn } from "@/lib/utils";

const BRAND_PATTERNS = [BRAND_NAME, `${BRAND_NAME} 2026`] as const;

function brandPattern() {
  return BRAND_PATTERNS.map((pattern) => pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
}

export function BrandName({ className }: { className?: string }) {
  return <span className={cn("font-semibold", className)}>{BRAND_NAME}</span>;
}

/** Emphasize inline brand mentions inside sentence-level copy. */
export function emphasizeBrand(text: string): ReactNode {
  if (!text) return text;

  const parts = text.split(new RegExp(`(${brandPattern()})`, "g"));
  if (parts.length === 1) return text;

  return parts.map((part, index) =>
    BRAND_PATTERNS.includes(part as (typeof BRAND_PATTERNS)[number]) ? (
      <span key={`${part}-${index}`} className="font-semibold">
        {part}
      </span>
    ) : (
      part
    )
  );
}
