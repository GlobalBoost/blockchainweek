"use client";

import { useState } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { FormField, FormSelect, FormSubmit, FormTextarea } from "@/components/ui/FormField";
import { BrandName } from "@/components/ui/BrandName";
import { CONTACT_EMAIL, EVENT_DATES, EVENT_LOCATION } from "@/lib/brand-constants";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-b border-black/10 pb-2 text-base font-bold text-ink sm:text-lg">
      {children}
    </h2>
  );
}

export default function VisaInvitationPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/visa-invitation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          confirmation: data.confirmation === "on" || data.confirmation === "true",
        }),
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
        title="Visa Invitation Letter"
        subtitle="Request an official invitation letter for visa purposes. Letters are issued only after successful registration and payment."
      />

      <section className="section-light py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-lg sm:p-8 lg:p-10">
            <div className="space-y-3 text-sm leading-relaxed text-ink-muted sm:text-base">
              <p>
                Please complete this form to request an official invitation letter. Accurate
                information matching your passport is essential.
              </p>
              <p>
                Fields marked with <span className="font-semibold text-red-600">*</span> are
                required. If you need letters for multiple people, submit this form once per
                attendee.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-10">
              <section className="space-y-4">
                <SectionTitle>1. Primary Contact Information</SectionTitle>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    name="contactFullName"
                    required
                    label="Full Name"
                    placeholder="As it appears on your passport"
                  />
                  <FormField
                    name="contactEmail"
                    type="email"
                    required
                    label="Email Address"
                    placeholder="your.email@example.com"
                  />
                  <FormField
                    name="contactPhone"
                    type="tel"
                    required
                    label="Phone Number (with country code)"
                    placeholder="+234 801 234 5678"
                  />
                  <FormField
                    name="contactOrganization"
                    label="Organization / University"
                    placeholder="e.g. University of Lagos"
                  />
                </div>
              </section>

              <section className="space-y-4">
                <SectionTitle>2. Attendee Passport &amp; Personal Details</SectionTitle>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    name="attendeeFullName"
                    required
                    label="Full Legal Name (exactly as on passport)"
                  />
                  <FormField name="dateOfBirth" type="date" required label="Date of Birth" />
                  <FormField
                    name="placeOfBirth"
                    required
                    label="Place of Birth (City, Country)"
                    placeholder="e.g. Lagos, Nigeria"
                  />
                  <FormField
                    name="nationality"
                    required
                    label="Nationality / Citizenship"
                    placeholder="e.g. Nigerian"
                  />
                  <FormField name="passportNumber" required label="Passport Number" />
                  <FormField name="passportCountry" required label="Passport Issuing Country" />
                  <FormField
                    name="passportIssueDate"
                    type="date"
                    required
                    label="Passport Issue Date"
                  />
                  <FormField
                    name="passportExpiryDate"
                    type="date"
                    required
                    label="Passport Expiry Date"
                  />
                </div>
                <FormTextarea
                  name="residentialAddress"
                  required
                  rows={3}
                  label="Current Residential Address"
                  placeholder="Street address, City, State/Province, Postal Code, Country"
                />
              </section>

              <section className="space-y-4">
                <SectionTitle>3. Professional / Affiliation Details</SectionTitle>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    name="jobTitle"
                    required
                    label="Job Title / Position"
                    placeholder="e.g. Lecturer, Researcher, Director"
                  />
                  <FormField
                    name="organization"
                    required
                    label="Organization / University Name"
                  />
                </div>
                <FormField
                  name="orgAddress"
                  label="Organization Address"
                  placeholder="Full address of your institution"
                />
              </section>

              <section className="space-y-4">
                <SectionTitle>4. Travel &amp; Conference Information</SectionTitle>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    name="arrivalDate"
                    type="date"
                    required
                    label="Intended Arrival Date in USA"
                  />
                  <FormField
                    name="departureDate"
                    type="date"
                    required
                    label="Intended Departure Date from USA"
                  />
                  <FormField
                    name="registrationNumber"
                    required
                    label="Registration / Ticket Confirmation Number"
                    placeholder="From your Luma confirmation email"
                  />
                  <FormSelect name="ticketType" label="Ticket Type" defaultValue="">
                    <option value="">Select...</option>
                    <option value="VIP">VIP</option>
                    <option value="General Admission">General Admission</option>
                    <option value="Student">Student</option>
                    <option value="Speaker">Speaker</option>
                    <option value="Other">Other</option>
                  </FormSelect>
                </div>
                <FormField
                  name="embassy"
                  label="Embassy / Consulate where you will apply"
                  placeholder="e.g. U.S. Embassy Abuja or Lagos, Nigeria"
                />
              </section>

              <section className="space-y-4">
                <SectionTitle>5. Additional Information</SectionTitle>
                <FormTextarea
                  name="additionalNotes"
                  rows={4}
                  label="Any special notes or requests"
                  placeholder="e.g. Multiple delegates under same organization, previous visa refusals, etc."
                />
              </section>

              <div className="border-t border-black/10 pt-6">
                <label className="flex items-start gap-3 text-sm leading-relaxed text-ink">
                  <input
                    type="checkbox"
                    name="confirmation"
                    required
                    className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-un-blue,#009edb)]"
                  />
                  <span>
                    I confirm that all information provided is accurate and matches my official
                    documents. I understand that the invitation letter is issued solely for the
                    purpose of attending <BrandName /> 2026 and is contingent upon valid
                    registration. <span className="text-red-600">*</span>
                  </span>
                </label>
              </div>

              <FormSubmit disabled={status === "loading"}>
                {status === "loading" ? "Submitting..." : "Submit Visa Invitation Request"}
              </FormSubmit>

              {status === "success" && (
                <p className="text-center text-sm font-medium text-un-blue">
                  Request submitted successfully. Invitation letters are typically issued within
                  2–4 business days after registration is verified.
                </p>
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

            <p className="mt-10 border-t border-black/10 pt-6 text-center text-xs text-ink-muted">
              Invitation letters are typically issued within 2–4 business days after verification of
              registration.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
