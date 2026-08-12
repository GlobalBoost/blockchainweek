import type { NextConfig } from "next";
import redirects from "./redirects.json";
import blogPosts from "./content/blog.json";

const nextConfig: NextConfig = {
  supportsImmutableAssets: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/events", destination: "https://luma.com/unblockchainweek", permanent: true },
      { source: "/the-conference", destination: "/conference", permanent: true },
      { source: "/gallery", destination: "/", permanent: true },
      { source: "/key-themes", destination: "/#key-themes", permanent: true },
      { source: "/tickets", destination: "/#tickets", permanent: true },
      { source: "/blog/:slug", destination: "/news/:slug", permanent: true },
      { source: "/news", destination: "/blog", permanent: true },
      { source: "/luciana-miranda", destination: "/speakers", permanent: true },
      { source: "/gbenga-omosuyi", destination: "/speakers", permanent: true },
      { source: "/michalina-brokos", destination: "/speakers", permanent: true },
      { source: "/greg-vosper", destination: "/speakers", permanent: true },
      ...(blogPosts as { slug: string }[]).map((post) => ({
        source: `/${post.slug}`,
        destination: `/news/${post.slug}`,
        permanent: true,
      })),
      ...(redirects as { source: string; destination: string; permanent: boolean }[]),
    ];
  },
};

export default nextConfig;
