import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SpeakerPageContent } from "@/components/speakers/SpeakerPageContent";
import { getAllSpeakerSlugs, getSpeakerBySlug } from "@/lib/content";
import { BRAND_NAME, SOCIAL_PREVIEW_HEIGHT, SOCIAL_PREVIEW_WIDTH } from "@/lib/brand-constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllSpeakerSlugs().map((slug) => ({ slug }));
}

function speakingTitle(name: string) {
  return `${name} Speaking at ${BRAND_NAME} 2026`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const speaker = getSpeakerBySlug(slug);
  if (!speaker) return { title: "Speaker Not Found" };

  const title = speakingTitle(speaker.name);
  const description = speaker.headline ?? speaker.bio.slice(0, 160);
  const ogImage = {
    url: `/${speaker.slug}/opengraph-image`,
    width: SOCIAL_PREVIEW_WIDTH,
    height: SOCIAL_PREVIEW_HEIGHT,
    alt: speaker.name,
  };

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/${speaker.slug}` },
    openGraph: {
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}

export default async function SpeakerPage({ params }: PageProps) {
  const { slug } = await params;
  const speaker = getSpeakerBySlug(slug);
  if (!speaker) notFound();

  return <SpeakerPageContent speaker={speaker} />;
}
