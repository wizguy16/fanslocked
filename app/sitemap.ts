import type { MetadataRoute } from "next";
import { listings } from "@/lib/data";
import { CATEGORIES } from "@/lib/categories";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { getGuideSlugs } from "@/lib/guide-slugs";
import { getSiteUrl } from "@/lib/site";

/** Node.js runtime — keeps `node:fs` (via dynamic import in `getGuideSlugs`) off Edge. */
export const runtime = "nodejs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date().toISOString();
  const guideSlugs = await getGuideSlugs();

  const staticPaths = [
    "/",
    "/categories",
    "/explore",
    "/blog",
    "/privacy",
    "/terms",
    "/disclosure",
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    priority: path === "/" ? 1 : 0.6,
  }));

  const guideRoutes: MetadataRoute.Sitemap = guideSlugs.map((slug) => ({
    url: `${base}/guides/${slug}`,
    lastModified: now,
    priority: 0.7,
  }));

  const categories: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${base}/categories/${c.slug}`,
    lastModified: now,
    priority: 0.6,
  }));

  const sites: MetadataRoute.Sitemap = listings.map((l) => ({
    url: `${base}/site/${l.slug}`,
    lastModified: l.added_date || now,
    priority: 0.6,
  }));

  const posts: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.date || now,
    priority: 0.6,
  }));

  return [...staticRoutes, ...guideRoutes, ...categories, ...sites, ...posts];
}
