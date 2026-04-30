import type { BlogPost } from "@/lib/blog-posts";
import { getGuidePostForCategory } from "@/lib/blog-posts";
import {
  generateCategoryBlog,
  type CategoryBlog,
} from "@/lib/blog/generate-category-blog";
import type { Listing } from "@/types/listing";

/** Hub guide vs auto-generated category blog (used on `/blog/[slug]` when slug is a category). */
export type CategoryBlogContent =
  | { type: "hub"; data: BlogPost }
  | { type: "fallback"; data: CategoryBlog };

export function resolveCategoryBlogContent(
  categorySlug: string,
  categoryLabel: string,
  listings: Listing[],
): CategoryBlogContent {
  const guidePost = getGuidePostForCategory(categorySlug);
  if (guidePost?.hub) {
    return { type: "hub", data: guidePost };
  }
  return {
    type: "fallback",
    data: generateCategoryBlog(categoryLabel, listings),
  };
}
