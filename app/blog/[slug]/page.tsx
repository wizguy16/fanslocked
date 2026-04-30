import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticleLayout } from "@/components/blog/blog-article-layout";
import { BlogAutoCategoryLayout } from "@/components/blog/blog-auto-category-layout";
import { BlogHubLayout } from "@/components/blog/blog-hub-layout";
import { BLOG_POSTS, getPostBySlug } from "@/lib/blog-posts";
import { resolveCategoryBlogContent } from "@/lib/blog/resolve-category-blog-content";
import { CATEGORIES } from "@/lib/categories";
import { getCategoryData } from "@/lib/get-category-data";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  const slugs = new Set<string>();
  for (const p of BLOG_POSTS) slugs.add(p.slug);
  for (const c of CATEGORIES) slugs.add(c.slug);
  return Array.from(slugs, (slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug);
  if (post) {
    return {
      title: post.title,
      description: post.excerpt,
      alternates: { canonical: `/blog/${post.slug}` },
    };
  }

  const data = getCategoryData(params.slug);
  if (!data || data.listings.length === 0) return { title: "Post" };

  const blogContent = resolveCategoryBlogContent(
    data.category.slug,
    data.category.label,
    data.listings,
  );
  if (blogContent.type === "hub") {
    return {
      title: blogContent.data.title,
      description: blogContent.data.excerpt,
      alternates: { canonical: `/blog/${params.slug}` },
    };
  }
  return {
    title: blogContent.data.title,
    description: blogContent.data.description,
    alternates: { canonical: `/blog/${params.slug}` },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (post) {
    if (post.hub && post.relatedCategorySlug) {
      const related = getCategoryData(post.relatedCategorySlug);
      const topListings = related
        ? [...related.listings].sort((a, b) => b.rating - a.rating)
        : [];
      if (related && topListings.length > 0) {
        return (
          <BlogHubLayout
            post={post}
            categorySlug={related.category.slug}
            categoryLabel={related.category.label}
            topListings={topListings}
          />
        );
      }
    }

    return <BlogArticleLayout post={post} />;
  }

  const data = getCategoryData(params.slug);
  if (!data || data.listings.length === 0) notFound();

  const blogContent = resolveCategoryBlogContent(
    data.category.slug,
    data.category.label,
    data.listings,
  );

  if (blogContent.type === "hub") {
    const topListings = [...data.listings].sort((a, b) => b.rating - a.rating);
    return (
      <BlogHubLayout
        post={blogContent.data}
        categorySlug={data.category.slug}
        categoryLabel={data.category.label}
        topListings={topListings}
      />
    );
  }

  return (
    <BlogAutoCategoryLayout
      blog={blogContent.data}
      categorySlug={data.category.slug}
      categoryLabel={data.category.label}
      listings={data.listings}
    />
  );
}
