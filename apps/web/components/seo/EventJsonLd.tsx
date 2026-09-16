import {
  BRAND_DESCRIPTION,
  BRAND_NAME,
  BRAND_URL,
  EVENT_DATES,
  SOCIAL_PREVIEW_IMAGE,
  UN_DISCLAIMER,
  VENUE_FULL,
  VENUE_NAME,
  VENUE_STREET,
} from "@/lib/brand-constants";

export function EventJsonLd() {
  const siteUrl = BRAND_URL.replace(/\/$/, "");
  const organizationId = `${siteUrl}/#organization`;
  const websiteId = `${siteUrl}/#website`;
  const eventId = `${siteUrl}/#event`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: BRAND_NAME,
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        description: UN_DISCLAIMER,
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: BRAND_NAME,
        url: siteUrl,
        description: BRAND_DESCRIPTION,
        publisher: { "@id": organizationId },
        inLanguage: "en-US",
      },
      {
        "@type": "Event",
        "@id": eventId,
        name: `${BRAND_NAME} 2026`,
        description: `${BRAND_DESCRIPTION} Primary venue: ${VENUE_FULL}.`,
        startDate: "2026-09-10",
        endDate: "2026-09-19",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        image: [`${siteUrl}${SOCIAL_PREVIEW_IMAGE}`],
        location: {
          "@type": "Place",
          name: VENUE_NAME,
          address: {
            "@type": "PostalAddress",
            streetAddress: VENUE_STREET,
            addressLocality: "New York",
            addressRegion: "NY",
            postalCode: "10019",
            addressCountry: "US",
          },
        },
        organizer: { "@id": organizationId },
        url: siteUrl,
        offers: {
          "@type": "Offer",
          url: `${siteUrl}/#tickets`,
          availability: "https://schema.org/InStock",
          validFrom: "2026-01-01",
        },
        disambiguatingDescription: `${EVENT_DATES} · ${VENUE_FULL}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
