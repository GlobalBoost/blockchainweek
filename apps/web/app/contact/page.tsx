"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FormField, FormSubmit, FormTextarea } from "@/components/ui/FormField";
import { CONTACT_EMAIL, EVENT_DATES, EVENT_LOCATION } from "@/lib/brand-constants";

const CONTACT_ITEMS = [
  {
    icon: MapPin,
    label: "Office",
    value: "26 Broadway, 3rd Floor, New York, NY 10004",
    href: "https://maps.google.com/?q=26+Broadway+New+York+NY+10004",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(202) 436-6577",
    href: "tel:+12024366577",
  },
  {
    icon: Mail,
    label: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/contact", {
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

  return (
    <>
      <PageHero
        eyebrow={`${EVENT_DATES} · ${EVENT_LOCATION}`}
        title="Connect With Us"
        subtitle="Questions about tickets, speaking, partnerships, or joining the team? We'd love to hear from you."
      />

      <section className="section-light py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-lg lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div className="bg-gradient-to-br from-[#0d1b2a] to-[#0a1628] px-6 py-10 sm:px-10 sm:py-12">
              <SectionHeader
                theme="dark"
                eyebrow="Get in Touch"
                title="We're Here to Help"
                subtitle="Reach our team for general inquiries, media requests, or partnership questions."
                align="left"
                className="mb-0"
              />

              <div className="mt-8 space-y-5">
                {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-un-blue/40"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-un-blue/20 text-un-blue">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/50">{label}</p>
                      <p className="mt-1 text-sm text-white/90">{value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="text-lg font-bold text-ink">Send a Message</h3>
              <p className="mt-1 text-sm text-ink-muted">We typically respond within 1–2 business days.</p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField name="name" required placeholder="Your name" label="Name" />
                  <FormField name="email" type="email" required placeholder="you@email.com" label="Email" />
                </div>
                <FormTextarea
                  name="message"
                  required
                  rows={6}
                  placeholder="How can we help?"
                  label="Message"
                />
                <FormSubmit disabled={status === "loading"}>
                  {status === "loading" ? "Sending..." : "Send Message"}
                </FormSubmit>
                {status === "success" && (
                  <p className="text-center text-sm font-medium text-un-blue">Message sent successfully!</p>
                )}
                {status === "error" && (
                  <p className="text-center text-sm text-red-500">
                    Something went wrong. Please email{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                      {CONTACT_EMAIL}
                    </a>{" "}
                    directly.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
