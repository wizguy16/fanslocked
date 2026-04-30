import type { Metadata } from "next";
import { listings } from "@/lib/data";
import { FanslockedExplorePage } from "@/components/fanslocked-home/fanslocked-explore-page";

export const metadata: Metadata = {
  title: "Explore",
  description:
    "Paginated directory of every FansLocked listing—browse the full grid page by page.",
  alternates: { canonical: "/explore" },
};

const PAGE_SIZE = 48;

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

type SortMode = "default" | "trending";

function buildExplorePath(page: number, sort: SortMode): string {
  const params = new URLSearchParams();
  if (page > 1) params.set("page", String(page));
  if (sort === "trending") params.set("sort", "trending");
  const q = params.toString();
  return q ? `/explore?${q}` : "/explore";
}

function orderedListings(sort: SortMode) {
  if (sort === "trending") {
    return [...listings].sort(
      (a, b) => b.popularity_score - a.popularity_score,
    );
  }
  return listings;
}

export default function ExplorePage({ searchParams }: Props) {
  const rawSort =
    typeof searchParams.sort === "string" ? searchParams.sort : undefined;
  const sortMode: SortMode =
    rawSort === "trending" ? "trending" : "default";

  const raw =
    typeof searchParams.page === "string" ? searchParams.page : "1";
  const page = Math.max(1, parseInt(raw, 10) || 1);
  const ordered = orderedListings(sortMode);
  const totalPages = Math.max(1, Math.ceil(ordered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * PAGE_SIZE;
  const slice = ordered.slice(start, start + PAGE_SIZE);

  return (
    <FanslockedExplorePage
      listings={slice}
      currentPage={current}
      totalPages={totalPages}
      totalCount={ordered.length}
      sortMode={sortMode}
      prevHref={buildExplorePath(Math.max(1, current - 1), sortMode)}
      nextHref={buildExplorePath(
        Math.min(totalPages, current + 1),
        sortMode,
      )}
    />
  );
}
