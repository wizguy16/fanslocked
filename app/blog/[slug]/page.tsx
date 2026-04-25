import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticleLayout } from "@/components/blog/blog-article-layout";
import { BlogHubLayout } from "@/components/blog/blog-hub-layout";
import { BLOG_POSTS, getPostBySlug } from "@/lib/blog-posts";
import { getCategoryBySlug, getListingsByCategorySlug } from "@/lib/data";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  if (post.hub && post.relatedCategorySlug) {
    const cat = getCategoryBySlug(post.relatedCategorySlug);
    const raw = getListingsByCategorySlug(post.relatedCategorySlug);
    const topListings = [...raw].sort((a, b) => b.rating - a.rating);
    if (cat && topListings.length > 0) {
      return (
        <BlogHubLayout
          post={post}
          categorySlug={cat.slug}
          categoryLabel={cat.label}
          topListings={topListings}
        />
      );
    }
  }

  return <BlogArticleLayout post={post} />;
}
