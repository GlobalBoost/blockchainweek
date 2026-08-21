"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TierModal } from "@/components/partnerships/TierModal";
import { FormField, FormSelect, FormSubmit, FormTextarea } from "@/components/ui/FormField";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  getSponsorshipAddons,
  getSponsorshipBillboard,
  getSponsorshipClosingCta,
  getSponsorshipComparison,
  getSponsorshipHero,
  getSponsorshipPackagesNote,
  getSponsorshipStats,
  getSponsorshipTiers,
  getSponsorshipWhyPartner,
} from "@/lib/content";
import { BRAND_NAME, EVENT_DATES, EVENT_LOCATION, SPONSORSHIP_EMAIL } from "@/lib/brand-constants";
import { BrandName } from "@/components/ui/BrandName";
import type { SponsorshipTier } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PartnershipsPageContent() {
  const hero = getSponsorshipHero();
  const stats = getSponsorshipStats();
  const billboard = getSponsorshipBillboard();
  const tiers = getSponsorshipTiers();
  const addons = getSponsorshipAddons();
  const whyPartner = getSponsorshipWhyPartner();
  const comparison = getSponsorshipComparison();
  const packagesNote = getSponsorshipPackagesNote();
  const closingCta = getSponsorshipClosingCta();

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
      {/* Hero */}
      <section className="relative isolate overflow-hidden pb-16 pt-24 sm:pb-20 sm:pt-28">
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
            Partner with
            <br />
            <span className="text-gold">{BRAND_NAME}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold leading-relaxed text-white/90">
            {hero.subtitle}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70">{hero.lede}</p>
          <p className="mt-5 text-sm font-medium tracking-wide text-un-blue">{hero.themeLine}</p>
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
              Become a partner
            </a>
          </div>

          <div className="relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-white/10">
            <div className="relative aspect-[16/9] min-h-[220px] sm:min-h-[320px]">
              <Image
                src={hero.image}
                alt={hero.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
            <p className="bg-[#0a0a0f]/80 px-4 py-3 text-left text-xs text-white/70 sm:px-5">{hero.imageCaption}</p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0f] to-transparent sm:h-32" />
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 bg-[#0d1b2a] py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-5 text-center">
                <dt className="heading-font text-2xl text-un-blue sm:text-3xl">{stat.value}</dt>
                <dd className="mt-2 text-xs leading-relaxed text-white/60 sm:text-sm">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Billboard */}
      <section id="billboard" className="section-dark py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader
            theme="dark"
            eyebrow={billboard.eyebrow}
            title={billboard.title}
            subtitle={billboard.lede}
            className="mb-10"
          />

          <div className="overflow-hidden rounded-3xl border border-white/10 lg:grid lg:grid-cols-2">
            <div className="relative min-h-[280px] bg-[#0a0a0f] lg:min-h-full">
              <Image
                src={billboard.featureImage}
                alt={billboard.featureImageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {billboard.featureTag && (
                <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                  {billboard.featureTag}
                </span>
              )}
            </div>
            <div className="flex flex-col justify-center px-6 py-8 sm:px-10 lg:px-12">
              <ul className="space-y-5">
                {billboard.bullets.map((bullet) => (
                  <li key={bullet.title} className="border-l-2 border-un-blue/40 pl-4">
                    <p className="font-semibold text-white">{bullet.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/65">{bullet.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {billboard.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5 text-center"
              >
                <dt className="heading-font text-2xl text-gold sm:text-3xl">{metric.value}</dt>
                <dd className="mt-2 text-xs leading-relaxed text-white/55 sm:text-sm">{metric.label}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {billboard.proofImages.map((proof) => (
              <figure key={proof.label} className="overflow-hidden rounded-xl border border-white/10">
                <div className="relative aspect-[4/3] bg-[#0a0a0f]">
                  <Image src={proof.image} alt={proof.alt} fill className="object-cover" sizes="25vw" />
                </div>
                <figcaption className="bg-white/[0.03] px-3 py-2 text-center text-xs text-white/70">
                  {proof.label}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-gold/20 bg-gold/[0.06] px-5 py-4 text-sm leading-relaxed text-white/80">
            {billboard.partnerNote}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-white/45">{billboard.sourceNote}</p>
        </div>
      </section>

      {/* Why partner */}
      <section id="why-sponsor" className="section-light py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader
            eyebrow="Why partner"
            title="One week. Two global audiences. The most photographed block on earth."
            subtitle={
              <>
                <BrandName /> puts crypto, meme-coin, and community-driven projects in front of capital, media, and
                policymakers during UNGA week.
              </>
            }
            className="mb-12"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyPartner.map((item, index) => (
              <div key={item.title} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-un-blue">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="section-dark py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader
            theme="dark"
            eyebrow="Partnership packages"
            title="Choose your level of impact"
            subtitle="Every package combines event access, exhibition presence, and marketing deliverables. Gold and above adds placement in the three-screen Times Square campaign."
            className="mb-12"
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {tiers.map((tier) => {
              const isPresidential = tier.id === "presidential";
              const isPlatinum = tier.id === "platinum";
              const firstHighlightIsBillboard = tier.highlights[0]?.startsWith("Billboard:");

              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setActiveTier(tier)}
                  className={cn(
                    "group flex flex-col rounded-2xl border p-6 text-left transition hover:-translate-y-0.5",
                    isPresidential
                      ? "border-gold/40 bg-gradient-to-b from-gold/[0.12] to-[#0d1b2a] shadow-md"
                      : isPlatinum
                        ? "border-un-blue/30 bg-[#0d1b2a] shadow-md"
                        : "border-white/10 bg-white/[0.03]"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p
                        className={cn(
                          "text-xs font-semibold uppercase tracking-wider",
                          isPresidential ? "text-gold" : isPlatinum ? "text-un-blue" : "text-white/50"
                        )}
                      >
                        {tier.subtitle}
                      </p>
                      <h3 className="mt-1 text-lg font-bold text-white">{tier.name}</h3>
                    </div>
                    <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/60">
                      {tier.available} left
                    </span>
                  </div>

                  <div className="mt-4 border-b border-white/10 pb-4">
                    <p className="heading-font text-2xl text-white">
                      {tier.price}
                      {tier.priceNote && (
                        <span className="ml-1 text-sm font-normal text-white/50">{tier.priceNote}</span>
                      )}
                    </p>
                  </div>

                  <ul className="mt-4 flex-1 space-y-2">
                    {tier.highlights.map((h) => (
                      <li
                        key={h}
                        className={cn(
                          "flex gap-2 text-xs leading-relaxed",
                          firstHighlightIsBillboard && h.startsWith("Billboard:")
                            ? "font-medium text-gold"
                            : "text-white/70"
                        )}
                      >
                        <span className={cn("shrink-0", isPresidential ? "text-gold" : "text-un-blue")}>✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  {tier.footnote && (
                    <p className="mt-4 text-xs italic text-white/45">{tier.footnote}</p>
                  )}

                  <span
                    className={cn(
                      "mt-5 block w-full rounded-full py-2.5 text-center text-xs font-bold uppercase tracking-wide transition",
                      isPresidential
                        ? "bg-gold text-black group-hover:bg-gold/90"
                        : "border border-white/20 text-white group-hover:border-un-blue group-hover:text-un-blue"
                    )}
                  >
                    {tier.ctaLabel ?? "View details"}
                  </span>
                </button>
              );
            })}
          </div>

          {packagesNote ? (
            <p className="mx-auto mt-8 max-w-4xl text-sm leading-relaxed text-white/55">{packagesNote}</p>
          ) : null}
        </div>
      </section>

      {/* Comparison */}
      <section id="comparison" className="section-light py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader
            eyebrow="Transparent value"
            title="Complete benefits comparison"
            subtitle="Every deliverable in one place. Swipe on mobile if needed."
            align="left"
            className="mb-8"
          />

          <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white shadow-sm">
            <table className="w-full min-w-[880px] text-sm">
              <thead>
                <tr className="border-b border-black/5 bg-[#f7f7f8]">
                  <th className="px-4 py-3 text-left font-medium text-ink-muted">Benefit</th>
                  <th className="px-4 py-3 text-center font-medium text-gold">Presidential</th>
                  <th className="px-4 py-3 text-center font-medium text-ink">Platinum</th>
                  <th className="px-4 py-3 text-center font-medium text-ink">Gold</th>
                  <th className="px-4 py-3 text-center font-medium text-ink-muted">Silver</th>
                  <th className="px-4 py-3 text-center font-medium text-ink-muted">Bronze</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((group) => (
                  <Fragment key={group.label}>
                    <tr className="bg-un-blue/5">
                      <td colSpan={6} className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-un-blue">
                        {group.label}
                      </td>
                    </tr>
                    {group.rows.map((row) => (
                      <tr key={row.benefit} className="border-b border-black/5">
                        <td className="px-4 py-3 font-medium text-ink">{row.benefit}</td>
                        <td className="px-4 py-3 text-center text-ink">{row.presidential}</td>
                        <td className="px-4 py-3 text-center text-ink-muted">{row.platinum}</td>
                        <td className="px-4 py-3 text-center text-ink-muted">{row.gold}</td>
                        <td className="px-4 py-3 text-center text-ink-muted">{row.silver}</td>
                        <td className="px-4 py-3 text-center text-ink-muted">{row.bronze}</td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section id="addons" className="section-dark py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader
            theme="dark"
            eyebrow="À-la-carte"
            title="Add-on opportunities"
            subtitle="Available alongside any package — quoted individually."
            align="left"
            className="mb-10"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {addons.map((addon) => (
              <div
                key={addon.name}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <h3 className="font-semibold text-white">{addon.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/65">{addon.description}</p>
                <button
                  type="button"
                  onClick={() => handleInquire("addon")}
                  className="mt-4 text-left text-sm font-semibold text-un-blue hover:underline"
                >
                  Ask about pricing
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-light py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <SectionHeader eyebrow={closingCta.eyebrow} title={closingCta.title} subtitle={closingCta.lede} />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-un-blue px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-un-blue/90"
            >
              Become a partner
            </a>
            {closingCta.secondaryCta && (
              <Link
                href={closingCta.secondaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-un-blue px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-un-blue transition hover:bg-un-blue/5"
              >
                {closingCta.secondaryCta.label}
              </Link>
            )}
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
                subtitle="Tell us what you're trying to accomplish. We'll put together a package — base tier plus any add-ons."
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
                      {t.name}{t.price !== "Custom" ? ` (${t.price})` : ""}
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
                    Thanks — we&apos;ll be in touch shortly.
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
