import type { MetadataRoute } from "next";
import { BRAND_URL } from "@/lib/brand-constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BRAND_URL.replace(/\/$/, "")}/sitemap.xml`,
  };
}
