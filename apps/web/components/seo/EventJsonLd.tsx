import {
  BRAND_DESCRIPTION,
  BRAND_NAME,
  BRAND_URL,
  EVENT_DATES,
  EVENT_LOCATION,
  SOCIAL_PREVIEW_IMAGE,
  UN_DISCLAIMER,
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
        description: BRAND_DESCRIPTION,
        startDate: "2026-09-10",
        endDate: "2026-09-19",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        image: [`${siteUrl}${SOCIAL_PREVIEW_IMAGE}`],
        location: {
          "@type": "Place",
          name: EVENT_LOCATION,
          address: {
            "@type": "PostalAddress",
            addressLocality: "New York",
            addressRegion: "NY",
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
        disambiguatingDescription: `${EVENT_DATES} · ${EVENT_LOCATION}`,
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
