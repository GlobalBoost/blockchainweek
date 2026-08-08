import { sleep } from "./html";

const USER_AGENT = "UNBlockchainWeek-Sync/1.0";

export interface WpPage {
  slug: string;
  title: string;
  contentHtml: string;
  featuredMediaId: number;
}

export interface WpMedia {
  sourceUrl: string;
}

export interface WpPost {
  slug: string;
  title: string;
  contentHtml: string;
  featuredMediaId: number;
}

export class WordPressClient {
  constructor(
    private readonly baseUrl: string,
    private readonly delayMs: number
  ) {}

  private restUrl(path: string): string {
    return `${this.baseUrl}/wp-json/wp/v2${path}`;
  }

  async fetchHtml(path: string): Promise<string> {
    const url = path.startsWith("http") ? path : `${this.baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
    const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return res.text();
  }

  async fetchPageBySlug(slug: string): Promise<WpPage | null> {
    const res = await fetch(this.restUrl(`/pages?slug=${encodeURIComponent(slug)}&per_page=1`), {
      headers: { "User-Agent": USER_AGENT },
    });
    if (!res.ok) return null;
    const pages = (await res.json()) as Array<{
      slug: string;
      title: { rendered: string };
      content: { rendered: string };
      featured_media: number;
    }>;
    if (!pages.length) return null;
    const page = pages[0];
    return {
      slug: page.slug,
      title: page.title.rendered.replace(/<[^>]+>/g, ""),
      contentHtml: page.content.rendered,
      featuredMediaId: page.featured_media ?? 0,
    };
  }

  async fetchMedia(mediaId: number): Promise<WpMedia | null> {
    if (!mediaId) return null;
    const res = await fetch(this.restUrl(`/media/${mediaId}`), {
      headers: { "User-Agent": USER_AGENT },
    });
    if (!res.ok) return null;
    const media = (await res.json()) as { source_url?: string };
    if (!media.source_url) return null;
    return { sourceUrl: media.source_url.replace("http://", "https://") };
  }

  async fetchAllPosts(): Promise<
    import("./parse-blog-content").WpPostRaw[]
  > {
    const posts: import("./parse-blog-content").WpPostRaw[] = [];
    let page = 1;
    const perPage = 100;

    while (true) {
      const res = await fetch(
        this.restUrl(`/posts?per_page=${perPage}&page=${page}&_embed=1&status=publish`),
        { headers: { "User-Agent": USER_AGENT } }
      );
      if (!res.ok) break;
      const batch = (await res.json()) as import("./parse-blog-content").WpPostRaw[];
      if (!batch.length) break;
      posts.push(...batch);
      const totalPages = Number(res.headers.get("x-wp-totalpages") ?? 1);
      if (page >= totalPages) break;
      page++;
    }

    return posts;
  }

  async throttle(): Promise<void> {
    if (this.delayMs > 0) await sleep(this.delayMs);
  }
}

export async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let index = 0;

  async function worker(): Promise<void> {
    while (index < items.length) {
      const current = index++;
      results[current] = await fn(items[current], current);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()));
  return results;
}
