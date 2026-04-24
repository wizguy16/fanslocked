import type { Listing } from "@/types/listing";
import { DenseDiscoveryCard } from "@/components/cards/dense-discovery-card";

const GRID =
  "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10";

export function SearchResults({
  subtitle,
  count,
  items,
}: {
  subtitle: string;
  count: number;
  items: Listing[];
}) {
  return (
    <section className="px-3 py-2 sm:px-4 md:px-6">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-2">
          <h2 className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Results
          </h2>
          <p className="text-[10px] text-slate-500 sm:text-xs">{subtitle}</p>
        </div>
        {count > 0 ? (
          <div className={GRID}>
            {items.map((l, i) => (
              <DenseDiscoveryCard key={l.id} listing={l} index={i} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
