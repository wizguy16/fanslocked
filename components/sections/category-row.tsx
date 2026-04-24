import type { Listing } from "@/types/listing";
import { CompactCard } from "@/components/cards/compact-card";

export function CategoryRow({
  title,
  items,
}: {
  title: string;
  items: Listing[];
}) {
  if (items.length === 0) return null;
  return (
    <section className="px-3 py-4 sm:px-4 md:px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-3 text-base font-bold text-white sm:text-lg">
          {title}
        </h2>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 lg:grid-cols-6">
          {items.slice(0, 6).map((l) => (
            <CompactCard key={l.id} listing={l} />
          ))}
        </div>
      </div>
    </section>
  );
}
