import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays } from "lucide-react";
import { formatBlogDate } from "@/lib/content";
import type { BlogPost } from "@/lib/types";
import { cn } from "@/lib/utils";

export function BlogCard({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:border-un-blue/20 hover:shadow-md",
        featured && "md:col-span-2 lg:col-span-3 lg:grid lg:grid-cols-2"
      )}
    >
      <Link
        href={`/news/${post.slug}`}
        className={cn(
          "relative block aspect-[16/9] overflow-hidden bg-navy/5",
          featured && "lg:aspect-auto lg:min-h-[24rem]"
        )}
      >
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            unoptimized
            loading="eager"
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-navy to-un-blue/80">
            <span className="heading-font px-6 text-center text-lg text-white">UN Blockchain Week</span>
          </div>
        )}
      </Link>

      <div className={cn("flex flex-1 flex-col p-6", featured && "justify-center sm:p-8 lg:p-12")}>
        {post.categories.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {post.categories.slice(0, 3).map((cat) => (
              <span
                key={cat}
                className="rounded-full bg-un-blue/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-un-blue"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        <h2
          className={cn(
            "text-xl font-bold leading-snug text-ink transition group-hover:text-un-blue",
            featured && "sm:text-2xl lg:text-3xl"
          )}
        >
          <Link href={`/news/${post.slug}`}>{post.title}</Link>
        </h2>

        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-muted">{post.excerpt}</p>

        <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4">
          <p className="flex items-center gap-2 text-xs font-medium text-ink-muted">
            <CalendarDays className="h-3.5 w-3.5" />
            {formatBlogDate(post.date)}
            <span aria-hidden="true">·</span>
            {post.readingMinutes} min
          </p>
          <Link
            href={`/news/${post.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-un-blue transition hover:gap-2"
          >
            Read
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
