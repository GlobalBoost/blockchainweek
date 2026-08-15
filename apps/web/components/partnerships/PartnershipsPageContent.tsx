"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TierModal } from "@/components/partnerships/TierModal";
import { FormField, FormSelect, FormSubmit, FormTextarea } from "@/components/ui/FormField";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  getSponsorshipAddons,
  getSponsorshipComparison,
  getSponsorshipPackagesNote,
  getSponsorshipPricingBanner,
  getSponsorshipPricingPhases,
  getSponsorshipTiers,
  getSponsorshipWhyPartner,
} from "@/lib/content";
import { EVENT_DATES, EVENT_LOCATION, SPONSORSHIP_EMAIL } from "@/lib/brand-constants";
import { BrandName } from "@/components/ui/BrandName";
import type { SponsorshipTier } from "@/lib/types";
import { cn } from "@/lib/utils";

function tierCardClass(id: string) {
  if (id === "presidential") {
    return "border-gold/40 bg-gradient-to-b from-gold/[0.08] to-white shadow-md";
  }
  if (id === "platinum") {
    return "border-un-blue/25 bg-white shadow-md";
  }
  return "border-black/[0.06] bg-white shadow-sm";
}

export function PartnershipsPageContent() {
  const tiers = getSponsorshipTiers();
  const addons = getSponsorshipAddons();
  const whyPartner = getSponsorshipWhyPartner();
  const comparison = getSponsorshipComparison();
  const pricingPhases = getSponsorshipPricingPhases();
  const pricingBanner = getSponsorshipPricingBanner();
  const packagesNote = getSponsorshipPackagesNote();

  const [activeTier, setActiveTier] = useState<SponsorshipTier | null>(null);
  const [selectedTier, setSelectedTier] = useState("presidential");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  function handleInquire(tierId: string) {
    setSelectedTier(tierId);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/partnerships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => {
    if (selectedTier && formRef.current) {
      const select = formRef.current.elements.namedItem("tier") as HTMLSelectElement | null;
      if (select) select.value = selectedTier;
    }
  }, [selectedTier]);

  return (
    <>
      {/* Hero – matches homepage treatment */}
      <section className="relative isolate flex min-h-[72vh] flex-col justify-center overflow-hidden pb-20 pt-24 sm:min-h-[78vh] sm:pb-24 sm:pt-28">
        <div className="absolute inset-0 bg-[#0a0a0f]" />
        <Image
          src="/hero/nyc-skyline.png"
          alt=""
          fill
          priority
          className="object-cover object-[center_55%] sm:object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/75 via-[#0a0a0f]/45 to-[#0a0a0f]/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-[#0a0a0f]/60" />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-5 text-center sm:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-un-blue">
            {EVENT_DATES} · {EVENT_LOCATION}
          </p>
          <h1 className="heading-font mt-4 text-4xl leading-tight text-runway-white sm:text-5xl lg:text-6xl">
            Sponsorship Opportunities
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            Put your brand in front of policymakers, institutional investors, and enterprise leaders during UNGA week
            in New York.
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href="#packages"
              className="inline-flex min-h-[3rem] items-center justify-center rounded-full bg-un-blue px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-un-blue/90"
            >
              View packages
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-[3rem] items-center justify-center rounded-full border border-white/25 bg-white/5 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition hover:border-un-blue hover:text-un-blue"
            >
              Talk to our team
            </a>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0f] to-transparent sm:h-32" />
      </section>

      {/* Why partner – continues hero dark tone */}
      <section id="why-sponsor" className="section-dark pt-4 pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader
            theme="dark"
            eyebrow="Why partner with us"
            title="Reach the room that matters during UNGA"
            subtitle={
              <>
                <BrandName /> is timed with the United Nations General Assembly and New York Fashion Week – when
                decision-makers are already in the city.
              </>
            }
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyPartner.map((item) => (
              <div
                key={item.title}
                className="border-l-2 border-un-blue/40 py-1 pl-5"
              >
                <h3 className="font-bold text-runway-white">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-un-blue/20 bg-[#0d1b2a] px-6 py-5 sm:flex-row sm:items-center sm:px-8">
            <p className="text-sm font-semibold text-white">{pricingBanner.label}</p>
            <a
              href="#pricing"
              className="shrink-0 text-sm font-bold text-un-blue hover:underline"
            >
              {pricingBanner.cta} →
            </a>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="section-light py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader
            title="Sponsorship packages"
            subtitle="Tickets, booth space, speaking slots, and marketing deliverables – spelled out upfront, tier by tier."
            className="mb-12"
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {tiers.map((tier) => {
              const isPresidential = tier.id === "presidential";
              const isPlatinum = tier.id === "platinum";

              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setActiveTier(tier)}
                  className={cn(
                    "group flex flex-col rounded-2xl border p-6 text-left transition hover:-translate-y-0.5",
                    tierCardClass(tier.id)
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p
                        className={cn(
                          "text-xs font-semibold uppercase tracking-wider",
                          isPresidential ? "text-gold" : isPlatinum ? "text-un-blue" : "text-ink-muted"
                        )}
                      >
                        {tier.subtitle}
                      </p>
                      <h3 className="mt-1 text-lg font-bold text-ink">{tier.name}</h3>
                    </div>
                    <span className="shrink-0 rounded-full bg-black/[0.04] px-2 py-0.5 text-[10px] font-semibold text-ink-muted">
                      {tier.available} left
                    </span>
                  </div>

                  <ul className="mt-5 flex-1 space-y-2">
                    {tier.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-xs leading-relaxed text-ink-muted">
                        <span className={cn("shrink-0", isPresidential ? "text-gold" : "text-un-blue")}>✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  {tier.footnote && (
                    <p className="mt-4 text-xs italic text-ink-muted">{tier.footnote}</p>
                  )}

                  <div className="mt-5 border-t border-black/5 pt-4">
                    <p className="text-[10px] uppercase tracking-wider text-ink-muted">{tier.priceLabel ?? "Starting at"}</p>
                    <p
                      className={cn(
                        "heading-font text-2xl",
                        isPresidential ? "text-gold" : "text-ink"
                      )}
                    >
                      {tier.price}
                    </p>
                    {tier.rateLabel && (
                      <p className="text-[11px] text-un-blue">{tier.rateLabel}</p>
                    )}
                  </div>

                  <span
                    className={cn(
                      "mt-4 block w-full rounded-full py-2.5 text-center text-xs font-bold uppercase tracking-wide transition",
                      isPresidential
                        ? "bg-gold text-black group-hover:bg-gold/90"
                        : "bg-un-blue text-white group-hover:bg-un-blue/90"
                    )}
                  >
                    {tier.ctaLabel ?? "View details"}
                  </span>
                </button>
              );
            })}
          </div>

          {packagesNote ? (
            <p className="mx-auto mt-8 max-w-4xl text-sm leading-relaxed text-ink-muted">
              {packagesNote}
            </p>
          ) : null}
        </div>
      </section>

      {/* Comparison */}
      <section id="comparison" className="section-dark py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader
            theme="dark"
            eyebrow="Side by side"
            title="Benefits comparison"
            subtitle="Every deliverable in one place. Swipe on mobile if needed."
            align="left"
            className="mb-8"
          />

          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[880px] text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className="px-4 py-3 text-left font-medium text-muted">Benefit</th>
                  <th className="px-4 py-3 text-center font-medium text-gold">Presidential</th>
                  <th className="px-4 py-3 text-center font-medium text-white/80">Platinum</th>
                  <th className="px-4 py-3 text-center font-medium text-white/80">Gold</th>
                  <th className="px-4 py-3 text-center font-medium text-white/70">Silver</th>
                  <th className="px-4 py-3 text-center font-medium text-white/60">Bronze</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((group) => (
                  <Fragment key={group.label}>
                    <tr className="bg-un-blue/10">
                      <td colSpan={6} className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-un-blue">
                        {group.label}
                      </td>
                    </tr>
                    {group.rows.map((row) => (
                      <tr key={row.benefit} className="border-b border-white/5">
                        <td className="px-4 py-3 font-medium text-white/90">{row.benefit}</td>
                        <td className="px-4 py-3 text-center text-white/70">{row.presidential}</td>
                        <td className="px-4 py-3 text-center text-white/70">{row.platinum}</td>
                        <td className="px-4 py-3 text-center text-white/70">{row.gold}</td>
                        <td className="px-4 py-3 text-center text-white/70">{row.silver}</td>
                        <td className="px-4 py-3 text-center text-white/70">{row.bronze}</td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-muted">
            VIP includes lounge access, priority seating, and evening events. All packages include standard recognition
            materials.
          </p>
        </div>
      </section>

      {/* Add-ons */}
      <section id="addons" className="section-light py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader
            eyebrow="Add-ons"
            title="À-la-carte activations"
            subtitle="Layer these onto any tier, or build a standalone presence."
            align="left"
            className="mb-10"
          />

          <div className="divide-y divide-black/5 rounded-2xl border border-black/5 bg-white">
            {addons.map((addon) => (
              <div
                key={addon.name}
                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
              >
                <div className="sm:max-w-xl">
                  <h3 className="font-semibold text-ink">{addon.name}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{addon.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleInquire("addon")}
                  className="shrink-0 text-left text-sm font-semibold text-un-blue hover:underline sm:text-right"
                >
                  Ask about pricing
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section-dark py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <SectionHeader
            theme="dark"
            title="Pricing by phase"
            subtitle="All figures in USD. Standard rates run August 2 – September 9, 2026."
            className="mb-8"
          />

          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className="px-4 py-3 text-left font-medium text-muted">Package</th>
                  {pricingPhases.map((phase) => (
                    <th
                      key={phase.id}
                      className={cn(
                        "px-4 py-3 text-center",
                        phase.active ? "bg-un-blue/15 text-un-blue" : "text-muted"
                      )}
                    >
                      <div className="font-semibold">{phase.label}</div>
                      <div className="text-[10px] font-normal normal-case opacity-70">{phase.period}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tiers.map((tier) => (
                  <tr key={tier.id} className="border-b border-white/5">
                    <td className="px-4 py-3 font-semibold text-white">{tier.name}</td>
                    {pricingPhases.map((phase) => (
                      <td
                        key={phase.id}
                        className={cn(
                          "px-4 py-3 text-center",
                          phase.active ? "bg-un-blue/5 font-medium text-un-blue" : "text-white/70"
                        )}
                      >
                        {tier.fullPrice?.[phase.id] ?? "–"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Event context */}
      <section id="event" className="section-light py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm lg:grid lg:grid-cols-2">
            <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12">
              <SectionHeader
                eyebrow="The event"
                title={`${EVENT_DATES}`}
                subtitle={`${EVENT_LOCATION} – 10 days of programming during UNGA and NYFW.`}
                align="left"
                className="mb-6"
              />
              <ul className="space-y-2 text-sm text-ink-muted">
                <li className="flex gap-2">
                  <span className="text-un-blue">✓</span>
                  Keynotes, panels, and side events across New York
                </li>
                <li className="flex gap-2">
                  <span className="text-un-blue">✓</span>
                  Washington Elite Investment Summit & Gala (Sept 18)
                </li>
                <li className="flex gap-2">
                  <span className="text-un-blue">✓</span>
                  Government, investor, and enterprise attendance
                </li>
              </ul>
              <Link
                href="/program"
                className="mt-6 inline-flex text-sm font-semibold text-un-blue hover:underline"
              >
                View the full program →
              </Link>
            </div>
            <div className="relative min-h-[240px] bg-[#0d1b2a] lg:min-h-full">
              <Image
                src="/hero/nyc-skyline.png"
                alt="New York City during Blockchain Week - UNGA Edition"
                fill
                className="object-cover opacity-80"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent lg:from-white lg:via-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-dark py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-white/10 lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div className="flex flex-col justify-center bg-[#0d1b2a] px-6 py-10 sm:px-10 lg:px-12">
              <SectionHeader
                theme="dark"
                eyebrow="Get in touch"
                title="Ready to partner?"
                subtitle="Tell us what you're trying to accomplish. We'll put together a package – base tier plus any add-ons."
                align="left"
                className="mb-0"
              />
              <p className="mt-6 text-sm text-muted">
                Email{" "}
                <a href={`mailto:${SPONSORSHIP_EMAIL}`} className="text-un-blue hover:underline">
                  {SPONSORSHIP_EMAIL}
                </a>
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField name="name" required placeholder="Your name" label="Name" />
                  <FormField name="email" type="email" required placeholder="you@company.com" label="Email" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField name="company" placeholder="Company" label="Company" />
                  <FormField
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="+1 202 555 0100"
                    label="Phone Number (with country code)"
                  />
                </div>
                <FormSelect name="tier" label="Interested in" defaultValue={selectedTier}>
                  {tiers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}{t.price !== "Custom" ? ` (${t.price})` : " (custom)"}
                    </option>
                  ))}
                  <option value="addon">Add-on opportunities</option>
                  <option value="custom">Custom partnership</option>
                </FormSelect>
                <FormTextarea name="message" rows={4} placeholder="Goals, audience, timing…" label="Message" />
                <FormSubmit variant="gold" disabled={status === "loading"}>
                  {status === "loading" ? "Sending…" : "Submit inquiry"}
                </FormSubmit>
                {status === "success" && (
                  <p className="text-center text-sm font-medium text-un-blue">
                    Thanks – we&apos;ll be in touch shortly.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-center text-sm text-red-500">
                    Something went wrong. Email{" "}
                    <a href={`mailto:${SPONSORSHIP_EMAIL}`} className="underline">
                      {SPONSORSHIP_EMAIL}
                    </a>
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <TierModal
        tier={activeTier}
        open={!!activeTier}
        onClose={() => setActiveTier(null)}
        onInquire={handleInquire}
      />
    </>
  );
}
