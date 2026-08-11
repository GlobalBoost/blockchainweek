export function EventJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Blockchain Week - UNGA Edition 2026",
    description:
      "The premier 10-day blockchain gathering during UNGA and New York Fashion Week in New York City.",
    startDate: "2026-09-10",
    endDate: "2026-09-19",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "New York City",
      address: {
        "@type": "PostalAddress",
        addressLocality: "New York",
        addressRegion: "NY",
        addressCountry: "US",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Blockchain Week - UNGA Edition",
      url: "https://unblockchainweek.com",
    },
    url: "https://unblockchainweek.com",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
