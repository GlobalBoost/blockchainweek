import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllBlogSlugs, getBlogPostBySlug, getBlogPosts } from "@/lib/content";
import { BRAND_NAME, BRAND_URL } from "@/lib/brand-constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt.slice(0, 160),
    alternates: { canonical: `/news/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: post.author ? [post.author] : undefined,
      tags: post.categories,
      ...(post.featuredImage ? { images: [{ url: post.featuredImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      ...(post.featuredImage ? { images: [post.featuredImage] } : {}),
    },
  };
}

export default async function NewsPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const categorySet = new Set(post.categories);
  const relatedPosts = getBlogPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .sort((a, b) => {
      const aMatches = a.categories.filter((category) => categorySet.has(category)).length;
      const bMatches = b.categories.filter((category) => categorySet.has(category)).length;
      return bMatches - aMatches;
    })
    .slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.modified,
    mainEntityOfPage: `${BRAND_URL.replace(/\/$/, "")}/news/${post.slug}`,
    image: post.featuredImage
      ? `${BRAND_URL.replace(/\/$/, "")}${post.featuredImage}`
      : undefined,
    author: {
      "@type": "Organization",
      name: post.author ?? BRAND_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <BlogPostContent post={post} />
      {relatedPosts.length > 0 && (
        <section className="border-t border-black/5 bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-un-blue">
              Continue Reading
            </p>
            <h2 className="heading-font mt-2 text-3xl text-ink">Related Articles</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
