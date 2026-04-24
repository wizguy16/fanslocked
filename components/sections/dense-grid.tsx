import type { Listing } from "@/types/listing";
import { DenseDiscoveryCard } from "@/components/cards/dense-discovery-card";

const GRID =
  "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10";

export function DenseGrid({
  title,
  items,
}: {
  title?: string;
  items: Listing[];
}) {
  return (
    <section className="px-3 py-2 sm:px-4 md:px-6">
      <div className="mx-auto max-w-[1600px]">
        {title ? (
          <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            {title}
          </h2>
        ) : null}
        <div className={GRID}>
          {items.map((l, i) => (
            <DenseDiscoveryCard key={l.id} listing={l} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
