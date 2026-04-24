import type { Listing } from "@/types/listing";
import { FeaturedCard } from "@/components/cards/featured-card";

export function TopPicks({ items }: { items: Listing[] }) {
  return (
    <section className="px-3 py-8 sm:px-4 md:px-6" aria-labelledby="top-picks-heading">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex items-end justify-between gap-2">
          <div>
            <h2
              id="top-picks-heading"
              className="font-display text-xl font-bold text-white sm:text-2xl"
            >
              Featured top 10
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Highest editorial scores this quarter — optimized placements for
              affiliate partners you can trust to pay on time.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {items.map((l) => (
            <FeaturedCard key={l.id} listing={l} />
          ))}
        </div>
      </div>
    </section>
  );
}
