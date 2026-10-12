import {
  BRAND_DESCRIPTION,
  BRAND_NAME,
  BRAND_URL,
  EVENT_DATES,
  SOCIAL_PREVIEW_IMAGE,
  UN_DISCLAIMER,
  EVENT_LOCATION,
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
        name: `${BRAND_NAME} 2027`,
        description: `${BRAND_DESCRIPTION} Location: ${EVENT_LOCATION}.`,
        startDate: "2027-09-13",
        endDate: "2027-09-18",
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
          validFrom: "2026-10-01",
          price: "79",
          priceCurrency: "USD",
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
