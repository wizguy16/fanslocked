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

export default function ExplorePage({ searchParams }: Props) {
  const raw =
    typeof searchParams.page === "string" ? searchParams.page : "1";
  const page = Math.max(1, parseInt(raw, 10) || 1);
  const totalPages = Math.max(1, Math.ceil(listings.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * PAGE_SIZE;
  const slice = listings.slice(start, start + PAGE_SIZE);

  return (
    <FanslockedExplorePage
      listings={slice}
      currentPage={current}
      totalPages={totalPages}
      totalCount={listings.length}
    />
  );
}
