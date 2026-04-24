import type { Listing } from "@/types/listing";
import { CompactCard } from "@/components/cards/compact-card";

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
    <section className="px-3 py-6 sm:px-4 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-white sm:text-xl">Results</h2>
          <p className="text-xs text-slate-400 sm:text-sm">{subtitle}</p>
        </div>
        {count > 0 ? (
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 lg:grid-cols-6">
            {items.map((l) => (
              <CompactCard key={l.id} listing={l} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
