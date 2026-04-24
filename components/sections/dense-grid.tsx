import type { Listing } from "@/types/listing";
import { DenseCard } from "@/components/cards/dense-card";

export function DenseGrid({
  title,
  items,
}: {
  title?: string;
  items: Listing[];
}) {
  return (
    <section className="px-3 py-6 sm:px-4 md:px-6">
      <div className="mx-auto max-w-7xl">
        {title ? (
          <h2 className="mb-3 text-base font-bold text-white sm:text-lg">
            {title}
          </h2>
        ) : null}
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          {items.map((l) => (
            <DenseCard key={l.id} listing={l} />
          ))}
        </div>
      </div>
    </section>
  );
}
