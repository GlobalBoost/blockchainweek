import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { BlogCard } from "@/components/blog/BlogCard";
import { getBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "News, op-eds, and updates from Blockchain Week - UNGA Edition 2026 – speakers, UNGA 81, Bitcoin, and global blockchain policy.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <>
      <PageHero
        eyebrow="News & Updates"
        title="Blockchain Week - UNGA Edition Blog"
        subtitle="Speaker announcements, event recaps, op-eds, and insights from the intersection of blockchain, policy, and global affairs."
      />

      <section className="section-light py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-center text-ink-muted">No posts yet. Check back soon.</p>
          ) : (
            <>
              <p className="mb-8 text-sm font-semibold uppercase tracking-[0.16em] text-ink-muted">
                {posts.length} published articles
              </p>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, index) => (
                  <BlogCard
                    key={post.slug}
                    post={post}
                    featured={index === 0}
                    eager={index < 6}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
