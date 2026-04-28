import type { Listing } from "@/types/listing";
import { SiteCard } from "@/components/ui/SiteCard";

type FeaturedPicksRowProps = {
  items: Listing[];
};

export function FeaturedPicksRow({ items }: FeaturedPicksRowProps) {
  if (items.length === 0) return null;

  return (
    <section
      aria-label="Editor's featured picks"
      className="border-b border-white/[0.06] bg-[#0a0a0a] px-4 py-14 md:px-8 md:py-16 lg:py-[4.5rem]"
    >
      <div className="mx-auto max-w-[1280px]">
        <h2 className="sr-only">Editor&apos;s featured picks</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((listing, index) => (
            <SiteCard
              key={listing.id}
              listing={listing}
              variant="featured"
              showTopPick={index < 2}
              className="min-h-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
