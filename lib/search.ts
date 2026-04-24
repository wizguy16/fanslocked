import type { Listing, QuickFilterId } from "@/types/listing";

function matchesQuickFilter(listing: Listing, filter: QuickFilterId): boolean {
  if (filter === "all") return true;
  const t = listing.tags.map((x) => x.toLowerCase());
  switch (filter) {
    case "free":
      return t.includes("free");
    case "trending":
      return t.includes("trending");
    case "premium":
      return t.includes("premium");
    case "new":
      return t.includes("new");
    default:
      return true;
  }
}

function matchesQuery(listing: Listing, q: string): boolean {
  const s = q.trim().toLowerCase();
  if (!s) return true;
  const haystack = [
    listing.name,
    listing.categorySlug,
    listing.categoryLabel,
    listing.description,
    listing.review,
    ...listing.tags,
    ...listing.pros,
    ...listing.cons,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(s);
}

export function filterListings(
  listings: Listing[],
  query: string,
  quickFilter: QuickFilterId,
): Listing[] {
  return listings.filter(
    (l) => matchesQuickFilter(l, quickFilter) && matchesQuery(l, query),
  );
}
