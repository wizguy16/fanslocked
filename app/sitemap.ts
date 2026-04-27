import type { MetadataRoute } from "next";
import { listings } from "@/lib/data";
import { CATEGORIES } from "@/lib/categories";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/categories",
    "/explore",
    "/blog",
    "/guides/onlyfans-alternatives",
    "/privacy",
    "/terms",
    "/disclosure",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const categories: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${base}/categories/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  const sites: MetadataRoute.Sitemap = listings.map((l) => ({
    url: `${base}/site/${l.slug}`,
    lastModified: l.added_date,
    changeFrequency: "monthly",
    priority: 0.55,
  }));

  const posts: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.date,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const postSlugs = new Set(BLOG_POSTS.map((p) => p.slug));
  const autoCategoryBlogs: MetadataRoute.Sitemap = CATEGORIES.filter(
    (c) => !postSlugs.has(c.slug),
  ).map((c) => ({
    url: `${base}/blog/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.55,
  }));

  return [...staticRoutes, ...categories, ...sites, ...posts, ...autoCategoryBlogs];
}
