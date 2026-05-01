import Link from "next/link";
import StripchatWidget from "@/components/stripchat-widget";
import { getListingsByCategorySlug } from "@/lib/data";
import { outboundLinkProps } from "@/components/fanslocked-home/fl-outbound-link-props";

const WIDGET_SLUGS = ["live-cams", "fetish-bdsm", "vr", "hookup"] as const;

export function categoryHasDirectoryWidget(slug: string): boolean {
  return (WIDGET_SLUGS as readonly string[]).includes(slug);
}

function sortedTop(slug: string, take: number) {
  return [...getListingsByCategorySlug(slug)]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, take);
}

/**
 * Inline partner strip for directory cards — live cams use Stripchat; other slugs get a
 * compact outbound rail until dedicated embeds are wired.
 */
export function CategoryDirectoryWidget({ slug }: { slug: string }) {
  if (!categoryHasDirectoryWidget(slug)) return null;

  if (slug === "live-cams") {
    return (
      <div className="mt-2 border-t border-white/10 pt-2">
        <p className="mb-1 text-[8px] font-semibold uppercase tracking-wider text-slate-500">
          Live now
        </p>
        <StripchatWidget compact density="directory" />
      </div>
    );
  }

  const items = sortedTop(slug, 4);
  if (items.length === 0) return null;

  return (
    <div className="mt-2 border-t border-white/10 pt-2">
      <p className="mb-1 text-[8px] font-semibold uppercase tracking-wider text-slate-500">
        Featured picks
      </p>
      <div className="flex gap-1.5 overflow-x-auto pb-px [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((listing) => {
          const link = outboundLinkProps(listing);
          return (
            <Link
              key={listing.id}
              {...link}
              className="flex w-[72px] shrink-0 flex-col gap-1 rounded-md border border-white/10 bg-black/20 p-1.5 no-underline transition hover:border-sky-500/25 hover:bg-white/[0.03]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- remote listing logos / favicons */}
              <img
                src={listing.logo}
                alt=""
                className="mx-auto h-6 w-6 rounded object-cover"
              />
              <span className="line-clamp-2 text-center text-[8px] font-medium leading-tight text-slate-400">
                {listing.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
