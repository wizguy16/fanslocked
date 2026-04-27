import { CATEGORIES } from "@/lib/categories";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}
