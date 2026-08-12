import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ScrollToTopOnNavigate } from "@/components/layout/ScrollToTopOnNavigate";
import {
  BRAND_NAME,
  BRAND_DESCRIPTION,
  BRAND_KEYWORDS,
  BRAND_SEO_TITLE,
  BRAND_URL,
  SOCIAL_PREVIEW_HEIGHT,
  SOCIAL_PREVIEW_IMAGE,
  SOCIAL_PREVIEW_WIDTH,
} from "@/lib/brand-constants";
import { EventJsonLd } from "@/components/seo/EventJsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const socialImage = {
  url: SOCIAL_PREVIEW_IMAGE,
  width: SOCIAL_PREVIEW_WIDTH,
  height: SOCIAL_PREVIEW_HEIGHT,
  alt: `${BRAND_NAME} 2026`,
};

export const metadata: Metadata = {
  metadataBase: new URL(BRAND_URL),
  applicationName: BRAND_NAME,
  title: {
    default: BRAND_SEO_TITLE,
    template: `%s | ${BRAND_NAME}`,
  },
  description: BRAND_DESCRIPTION,
  keywords: [...BRAND_KEYWORDS],
  authors: [{ name: BRAND_NAME, url: BRAND_URL }],
  creator: BRAND_NAME,
  publisher: BRAND_NAME,
  category: "Event",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: BRAND_SEO_TITLE,
    description: BRAND_DESCRIPTION,
    url: BRAND_URL,
    siteName: BRAND_NAME,
    locale: "en_US",
    type: "website",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND_SEO_TITLE,
    description: BRAND_DESCRIPTION,
    images: [SOCIAL_PREVIEW_IMAGE],
  },
  appleWebApp: {
    title: BRAND_NAME,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <EventJsonLd />
        <ScrollToTopOnNavigate />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
