"use client";

import { Modal } from "@/components/ui/Modal";
import type { SponsorshipTier } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TierModalProps {
  tier: SponsorshipTier | null;
  open: boolean;
  onClose: () => void;
  onInquire: (tierId: string) => void;
}

export function TierModal({ tier, open, onClose, onInquire }: TierModalProps) {
  if (!tier) return null;

  const isPresidential = tier.id === "presidential";
  const titleId = "tier-modal-title";

  return (
    <Modal open={open} onClose={onClose} labelledBy={titleId}>
      <div className="max-h-[85vh] overflow-y-auto">
        <div className={cn("border-b border-white/10 px-6 py-6 sm:px-8", isPresidential && "border-gold/20")}>
          <p className={cn("text-xs font-semibold uppercase tracking-wider", isPresidential ? "text-gold" : "text-un-blue")}>
            {tier.subtitle}
          </p>
          <h2 id={titleId} className="heading-font mt-1 pr-8 text-2xl text-white sm:text-3xl">
            {tier.name}
          </h2>
          <p className="mt-2 text-sm text-muted">{tier.available} packages available</p>
        </div>

        <div className="px-6 py-6 sm:px-8">
          {tier.customNote && (
            <div className="mb-6 rounded-xl border border-gold/25 bg-gold/10 p-4 text-sm leading-relaxed text-white/85">
              {tier.customNote}
            </div>
          )}

          {tier.sections?.map((section) => (
            <div key={section.title} className="mb-6 last:mb-0">
              <h3 className="mb-2 text-sm font-bold text-white">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-white/75">
                    <span className={cn("shrink-0", isPresidential ? "text-gold" : "text-un-blue")}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {tier.fullPrice && (
            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Rates by phase</p>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {(
                  [
                    ["founding", "Founding"],
                    ["early", "Early bird"],
                    ["standard", "Standard"],
                    ["event", "Event week"],
                  ] as const
                ).map(([key, label]) => (
                  <div key={key}>
                    <p className="text-[10px] uppercase tracking-wider text-muted">{label}</p>
                    <p className={cn("mt-0.5 font-semibold", key === "standard" ? "text-un-blue" : "text-white")}>
                      {tier.fullPrice![key]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-white/10 px-6 py-5 sm:px-8">
          <button
            type="button"
            onClick={() => {
              onInquire(tier.id);
              onClose();
            }}
            className={cn(
              "w-full rounded-full py-3 text-sm font-bold uppercase tracking-wide transition",
              isPresidential
                ? "bg-gold text-black hover:bg-gold/90"
                : "bg-un-blue text-white hover:bg-un-blue/90"
            )}
          >
            Inquire about {tier.name}
          </button>
        </div>
      </div>
    </Modal>
  );
}
