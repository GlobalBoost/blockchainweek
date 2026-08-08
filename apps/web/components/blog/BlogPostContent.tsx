import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Mail,
  Share2,
  Tag,
} from "lucide-react";
import { formatBlogDate } from "@/lib/content";
import type { BlogPost } from "@/lib/types";
import { BRAND_NAME, BRAND_URL } from "@/lib/brand-constants";

function ShareLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-sm font-bold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-un-blue hover:text-un-blue hover:shadow-md"
    >
      {children}
    </a>
  );
}

export function BlogPostContent({ post }: { post: BlogPost }) {
  const postUrl = `${BRAND_URL.replace(/\/$/, "")}/news/${post.slug}`;
  const shareText = encodeURIComponent(post.title);
  const shareUrl = encodeURIComponent(postUrl);
  const author = post.author ?? BRAND_NAME;
  const xShareUrl = `https://x.com/intent/post?text=${shareText}&url=${shareUrl}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
  const emailShareUrl = `mailto:?subject=${shareText}&body=${shareUrl}`;

  return (
    <article className="bg-surface-light">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14 lg:px-8 lg:py-16">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-ink-muted transition hover:text-un-blue"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {post.featuredImage && (
            <div className="relative mb-10 aspect-[16/10] overflow-hidden rounded-2xl border border-black/5 bg-[#eef1f4] shadow-lg sm:aspect-[16/9] sm:rounded-3xl">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                preload
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
          )}

          <h1 className="max-w-5xl text-4xl font-extrabold leading-[1.06] tracking-[-0.04em] text-ink sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-ink-muted sm:text-xl">
            {post.excerpt}
          </p>

          {post.categories.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.categories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1 rounded-full bg-un-blue/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-un-blue"
                >
                  <Tag className="h-3 w-3" />
                  {cat}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4 border-t border-black/5 pt-6">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-un-blue/20 bg-un-blue/5">
              <Image
                src="/icon.png"
                alt={author}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-ink">{author}</p>
              <p className="text-sm text-ink-muted">Editorial Team</p>
            </div>
            <span className="hidden h-8 w-px bg-black/10 sm:block" aria-hidden="true" />
            <span className="inline-flex items-center gap-2 text-sm text-ink-muted">
              <CalendarDays className="h-4 w-4 text-un-blue" />
              {formatBlogDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-2 text-sm text-ink-muted">
              <Clock3 className="h-4 w-4 text-un-blue" />
              {post.readingMinutes} min read
            </span>
          </div>
        </div>
      </header>

      <div className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-4xl justify-center gap-10 px-4 lg:grid-cols-[3rem_minmax(0,46rem)] lg:px-8">
          <aside className="hidden lg:block" aria-label="Share article">
            <div className="sticky top-28 flex flex-col items-center gap-3">
              <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-ink-muted [writing-mode:vertical-rl]">
                Share
              </span>
              <ShareLink href={xShareUrl} label="Share on X">
                X
              </ShareLink>
              <ShareLink href={linkedinShareUrl} label="Share on LinkedIn">
                <Share2 className="h-4 w-4" />
              </ShareLink>
              <ShareLink href={emailShareUrl} label="Share by email">
                <Mail className="h-4 w-4" />
              </ShareLink>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <span className="mr-1 text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
                Share
              </span>
              <ShareLink href={xShareUrl} label="Share on X">
                X
              </ShareLink>
              <ShareLink href={linkedinShareUrl} label="Share on LinkedIn">
                <Share2 className="h-4 w-4" />
              </ShareLink>
              <ShareLink href={emailShareUrl} label="Share by email">
                <Mail className="h-4 w-4" />
              </ShareLink>
            </div>

            <div
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            <div className="mt-14 rounded-2xl border border-un-blue/15 bg-white p-6 shadow-sm sm:flex sm:items-center sm:gap-5 sm:p-8">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-un-blue/20 bg-un-blue/5">
                <Image
                  src="/icon.png"
                  alt={author}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="mt-4 sm:mt-0">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-un-blue">
                  Published by
                </p>
                <h2 className="mt-1 text-xl font-bold text-ink">{author}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  News, analysis and updates from the team behind UN Blockchain Week.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </article>
  );
}
