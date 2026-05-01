import type { Metadata } from "next";
import { CATEGORIES } from "@/lib/categories";
import { CategoriesLiveCamsWidgetTrio } from "@/components/categories/categories-live-cams-widget-trio";
import { CategoriesRailHeading } from "@/components/categories/categories-rail-heading";
import { CategoryDirectorySpotlight } from "@/components/categories/category-directory-spotlight";
import { listings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "30+ editorial categories covering tubes, premium, VR, cams, niches, and safety-forward verticals.",
  alternates: { canonical: "/categories" },
};

function countInCategory(slug: string) {
  return listings.filter((l) => l.categorySlug === slug).length;
}

export default function CategoriesPage() {
  return (
    <div className="px-3 py-3 sm:px-4 md:px-6">
      <div className="mx-auto max-w-7xl">
        <CategoriesLiveCamsWidgetTrio />
        <CategoriesRailHeading as="h1" className="mt-8">
          Categories
        </CategoriesRailHeading>
        <ul className="mt-5 grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {CATEGORIES.map((c) => {
            const n = countInCategory(c.slug);
            return (
              <li key={c.slug}>
                <CategoryDirectorySpotlight category={c} listingCount={n} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
