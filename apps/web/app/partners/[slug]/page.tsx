import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PartnerPageContent } from "@/components/partners/PartnerPageContent";
import { BRAND_NAME } from "@/lib/brand-constants";
import { getAllPartnerSlugs, getPartnerPageBySlug } from "@/lib/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllPartnerSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const partner = getPartnerPageBySlug(slug);
  if (!partner) return { title: "Partner Not Found" };

  const title = `${partner.name} × ${BRAND_NAME}`;
  const description = partner.intro[0];

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/partners/${partner.slug}` },
    openGraph: {
      title,
      description,
      url: `/partners/${partner.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function PartnerPage({ params }: PageProps) {
  const { slug } = await params;
  const partner = getPartnerPageBySlug(slug);
  if (!partner) notFound();

  return <PartnerPageContent partner={partner} />;
}
