import type { NextConfig } from "next";
import redirects from "./redirects.json";
import blogPosts from "./content/blog.json";
import { getPostHogAssetHost, getPostHogIngestHost, POSTHOG_PROXY_PATH } from "./lib/posthog-config";

const nextConfig: NextConfig = {
  supportsImmutableAssets: false,
  skipTrailingSlashRedirect: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    const ingestHost = getPostHogIngestHost().replace(/\/$/, "");
    const assetHost = getPostHogAssetHost().replace(/\/$/, "");

    return [
      {
        source: `${POSTHOG_PROXY_PATH}/static/:path*`,
        destination: `${assetHost}/static/:path*`,
      },
      {
        source: `${POSTHOG_PROXY_PATH}/array/:path*`,
        destination: `${assetHost}/array/:path*`,
      },
      {
        source: `${POSTHOG_PROXY_PATH}/:path*`,
        destination: `${ingestHost}/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      { source: "/events", destination: "https://luma.com/unblockchainweek", permanent: true },
      { source: "/the-conference", destination: "/conference", permanent: true },
      { source: "/gallery", destination: "/", permanent: true },
      { source: "/key-themes", destination: "/#key-themes", permanent: true },
      { source: "/tickets", destination: "/#tickets", permanent: true },
      { source: "/cryptoevents", destination: "/partners/cryptoevents", permanent: true },
      { source: "/coincarp", destination: "/partners/coincarp", permanent: true },
      { source: "/cryptonomads", destination: "/partners/cryptonomads", permanent: true },
      { source: "/cryptonewsz", destination: "/partners/cryptonewsz", permanent: true },
      { source: "/capitalbaynews", destination: "/partners/capitalbaynews", permanent: true },
      { source: "/cryptonews-ge", destination: "/partners/cryptonewsge", permanent: true },
      { source: "/cointurk", destination: "/partners/cointurk", permanent: true },
      { source: "/cryptonewsge", destination: "/partners/cryptonewsge", permanent: true },
      { source: "/timesofblockchain", destination: "/partners/timesofblockchain", permanent: true },
      { source: "/criptonoticias", destination: "/partners/criptonoticias", permanent: true },
      { source: "/ninja", destination: "/partners/ninja", permanent: true },
      { source: "/coinscapture", destination: "/partners/coinscapture", permanent: true },
      { source: "/toobit", destination: "/partners/toobit", permanent: true },
      { source: "/cryptototem", destination: "/partners/cryptototem", permanent: true },
      { source: "/bitcoininsider", destination: "/partners/bitcoininsider", permanent: true },
      { source: "/cryptonews", destination: "/partners/cryptonews", permanent: true },
      { source: "/coingabbar", destination: "/partners/coingabbar", permanent: true },
      { source: "/ambcrypto", destination: "/partners/ambcrypto", permanent: true },
      { source: "/blog/:slug", destination: "/news/:slug", permanent: true },
      { source: "/news", destination: "/blog", permanent: true },
      { source: "/luciana-miranda", destination: "/speakers", permanent: true },
      { source: "/gbenga-omosuyi", destination: "/speakers", permanent: true },
      { source: "/michalina-brokos", destination: "/speakers", permanent: true },
      { source: "/greg-vosper", destination: "/speakers", permanent: true },
      { source: "/adam-david-reiser", destination: "/adam-reiser", permanent: true },
      { source: "/abdoulaye-nddiaye", destination: "/abdoulaye-ndiaye", permanent: true },
      { source: "/elijah-john-bowdre", destination: "/chairman-elijah-john-bowdre", permanent: true },
      { source: "/dr-tajah-m-gross", destination: "/dr-tajah-m-gross-phd", permanent: true },
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
