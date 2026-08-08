import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SpeakerPageContent } from "@/components/speakers/SpeakerPageContent";
import { getAllSpeakerSlugs, getSpeakerBySlug } from "@/lib/content";
import {
  BRAND_NAME,
  SOCIAL_PREVIEW_HEIGHT,
  SOCIAL_PREVIEW_IMAGE,
  SOCIAL_PREVIEW_WIDTH,
} from "@/lib/brand-constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllSpeakerSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const speaker = getSpeakerBySlug(slug);
  if (!speaker) return { title: "Speaker Not Found" };
  const description = speaker.headline ?? speaker.bio.slice(0, 160);

  return {
    title: speaker.name,
    description,
    alternates: { canonical: `/${speaker.slug}` },
    openGraph: {
      title: speaker.name,
      description,
      images: [
        {
          url: SOCIAL_PREVIEW_IMAGE,
          width: SOCIAL_PREVIEW_WIDTH,
          height: SOCIAL_PREVIEW_HEIGHT,
          alt: `${BRAND_NAME} 2026`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: speaker.name,
      description,
      images: [SOCIAL_PREVIEW_IMAGE],
    },
  };
}

export default async function SpeakerPage({ params }: PageProps) {
  const { slug } = await params;
  const speaker = getSpeakerBySlug(slug);
  if (!speaker) notFound();

  return <SpeakerPageContent speaker={speaker} />;
}
