import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SpeakerPageContent } from "@/components/speakers/SpeakerPageContent";
import { getAllSpeakerSlugs, getSpeakerBySlug } from "@/lib/content";

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

  return {
    title: speaker.name,
    description: speaker.headline ?? speaker.bio.slice(0, 160),
    alternates: { canonical: `/${speaker.slug}` },
    openGraph: {
      title: speaker.name,
      description: speaker.headline ?? speaker.bio.slice(0, 160),
      images: [speaker.photo || "/logo.png"],
    },
  };
}

export default async function SpeakerPage({ params }: PageProps) {
  const { slug } = await params;
  const speaker = getSpeakerBySlug(slug);
  if (!speaker) notFound();

  return <SpeakerPageContent speaker={speaker} />;
}
