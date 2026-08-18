import type { WpPostRaw } from "./parse-blog-content";
import { parseBlogContentHtml, stripHtmlToText } from "./parse-blog-content";
import type { SyncConfig } from "./config";
import { CONTENT_DIR, PUBLIC_DIR } from "./config";
import { WordPressClient } from "./client";
import { downloadAsset, publicPathFromDest } from "./download-asset";
import { decodeHtml } from "./html";
import { readJsonFile, resolveContentPath, writeJsonFile } from "./write-json";
import type { BlogPost } from "../../lib/types";
import { buildBlogExcerpt } from "../../lib/blog-excerpt";
import path from "path";

type MappedPost = Omit<BlogPost, "featuredImage" | "readingMinutes"> & {
  featuredImageUrl?: string;
};

function readingMinutes(contentHtml: string): number {
  const words = stripHtmlToText(contentHtml).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function assetBasename(url: string | undefined): string {
  if (!url) return "";
  try {
    return path.basename(new URL(decodeHtml(url)).pathname).toLowerCase();
  } catch {
    return "";
  }
}

function removeFirstArticleImage(contentHtml: string): string {
  const withoutFigure = contentHtml.replace(
    /<figure[^>]*>\s*<img[\s\S]*?<\/figure>\s*/i,
    ""
  );
  if (withoutFigure !== contentHtml) return withoutFigure.trim();
  return contentHtml.replace(/<img[^>]*>\s*/i, "").trim();
}

function mapWpPost(post: WpPostRaw, wordpressUrl: string): MappedPost {
  const embedded = post._embedded ?? {};
  const terms = embedded["wp:term"] ?? [];
  const categories = (terms[0] ?? []).map((t) => decodeHtml(t.name));
  const featuredMedia = embedded["wp:featuredmedia"]?.[0];
  const author = embedded.author?.[0]?.name;

  const title = decodeHtml(stripHtmlToText(post.title.rendered));

  return {
    slug: post.slug,
    title,
    excerpt: decodeHtml(stripHtmlToText(post.excerpt.rendered)),
    contentHtml: parseBlogContentHtml(post.content.rendered, wordpressUrl, title),
    date: post.date,
    modified: post.modified,
    categories,
    featuredImageUrl: featuredMedia?.source_url?.replace("http://", "https://"),
    author: author
      ? decodeHtml(author).toLowerCase() === "impactmoney"
        ? "Blockchain Week - UNGA Edition"
        : decodeHtml(author)
      : undefined,
  };
}

async function localizeContentImages(
  contentHtml: string,
  slug: string,
  config: SyncConfig
): Promise<string> {
  const sources = [
    ...new Set(
      [...contentHtml.matchAll(/<img[^>]+src="([^"]+)"/gi)].map((match) =>
        decodeHtml(match[1])
      )
    ),
  ];
  let localized = contentHtml;

  for (let index = 0; index < sources.length; index++) {
    const source = sources[index];
    if (!/^https?:\/\//i.test(source)) continue;

    try {
      const ext = path.extname(new URL(source).pathname) || ".jpg";
      const destPath = path.join(
        PUBLIC_DIR,
        "blog-assets",
        slug,
        `image-${index + 1}${ext}`
      );
      const ok = await downloadAsset(source, destPath, config.wordpressUrl, config.dryRun);
      if (!ok) continue;

      const localPath = publicPathFromDest(destPath, PUBLIC_DIR);
      localized = localized
        .split(source)
        .join(localPath)
        .split(source.replace(/&/g, "&amp;"))
        .join(localPath);
    } catch {
      console.warn(`    Could not localize article image: ${source}`);
    }
  }

  return localized;
}

export async function syncBlog(config: SyncConfig): Promise<{ ok: boolean; count: number }> {
  const blogPath = resolveContentPath(CONTENT_DIR, "blog.json");
  const existing = readJsonFile<BlogPost[]>(blogPath, []);
  const client = new WordPressClient(config.wordpressUrl, 0);

  try {
    console.log("Syncing blog posts...");
    const wpPosts = await client.fetchAllPosts();
    console.log(`  Found ${wpPosts.length} posts`);

    if (!wpPosts.length) {
      console.warn("  No blog posts found; keeping existing blog.json");
      return { ok: false, count: existing.length };
    }

    const posts: BlogPost[] = [];
    const existingBySlug = new Map(existing.map((post) => [post.slug, post]));

    for (const wpPost of wpPosts) {
      const existingPost = existingBySlug.get(wpPost.slug);
      if (existingPost?.modified === wpPost.modified) {
        posts.push(existingPost);
        console.log(`  = ${existingPost.title} (unchanged)`);
        continue;
      }

      const mapped = mapWpPost(wpPost, config.wordpressUrl);
      let featuredImage: string | undefined;
      const firstRemoteContentImage = mapped.contentHtml.match(/<img[^>]+src="([^"]+)"/i)?.[1];
      const featuredMatchesLeadImage =
        Boolean(mapped.featuredImageUrl) &&
        assetBasename(mapped.featuredImageUrl) === assetBasename(firstRemoteContentImage);
      let contentHtml = await localizeContentImages(mapped.contentHtml, mapped.slug, config);

      if (mapped.featuredImageUrl) {
        const ext = path.extname(new URL(mapped.featuredImageUrl).pathname) || ".jpg";
        const destPath = path.join(PUBLIC_DIR, "blog-assets", `${mapped.slug}${ext}`);
        const ok = await downloadAsset(mapped.featuredImageUrl, destPath, config.wordpressUrl, config.dryRun);
        if (ok || config.dryRun) {
          featuredImage = publicPathFromDest(destPath, PUBLIC_DIR);
        }
      }

      if (featuredImage && featuredMatchesLeadImage) {
        contentHtml = removeFirstArticleImage(contentHtml);
      }

      if (!featuredImage) {
        const firstContentImage = contentHtml.match(/<img[^>]+src="([^"]+)"/i)?.[1];
        if (firstContentImage?.startsWith("/blog-assets/")) {
          featuredImage = firstContentImage;
          contentHtml = removeFirstArticleImage(contentHtml);
        }
      }

      const rest = { ...mapped };
      delete rest.featuredImageUrl;
      posts.push({
        ...rest,
        excerpt: buildBlogExcerpt({
          excerpt: rest.excerpt,
          contentHtml,
          title: rest.title,
        }),
        contentHtml,
        featuredImage,
        readingMinutes: readingMinutes(contentHtml),
      });
      console.log(`  ✓ ${rest.title}`);
    }

    if (!config.dryRun) {
      writeJsonFile(blogPath, posts, false);
    } else {
      console.log("  [dry-run] Skipped writing blog.json");
    }

    return { ok: true, count: posts.length };
  } catch (error) {
    console.error("  Blog sync failed:", error instanceof Error ? error.message : error);
    console.warn("  Keeping existing blog.json");
    return { ok: false, count: existing.length };
  }
}
