import type { MetadataRoute } from "next";
import { getAllBlogSlugs, getAllPartnerSlugs, getAllSpeakerSlugs, getBlogPosts } from "@/lib/content";
import { BRAND_URL } from "@/lib/brand-constants";

const STATIC_ROUTES = [
  "",
  "/about",
  "/conference",
  "/speakers",
  "/partnerships",
  "/blog",
  "/team",
  "/speak",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BRAND_URL.replace(/\/$/, "");
  const now = new Date();

  const staticPages = STATIC_ROUTES.map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const speakerPages = getAllSpeakerSlugs().map((slug) => ({
    url: `${base}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogPages = getAllBlogSlugs().map((slug) => {
    const post = getBlogPosts().find((p) => p.slug === slug);
    return {
      url: `${base}/news/${slug}`,
      lastModified: post ? new Date(post.modified) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });

  const partnerPages = getAllPartnerSlugs().map((slug) => ({
    url: `${base}/partners/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...speakerPages, ...blogPages, ...partnerPages];
}
