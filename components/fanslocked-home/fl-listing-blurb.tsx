import { clampTagline } from "@/lib/utils";
import type { Listing } from "@/types/listing";

function collapsedTeaser(full: string): string {
  const t = full.trim();
  const m = t.match(/^.{20,400}?[.!?](?=\s|$)/);
  if (m) return m[0]!.trim();
  return clampTagline(t, 88);
}

/**
 * Two states, one column: teaser fades out, full-width preview fades in (no inner box).
 */
export function FlListingBlurb({ listing }: { listing: Listing }) {
  const p = listing.preview?.trim();

  if (p) {
    const teaser = collapsedTeaser(p);

    return (
      <div className="relative min-h-[2.65rem] min-w-0 flex-1 text-left">
        <div className="transition-opacity duration-200 ease-out group-hover:pointer-events-none group-hover:opacity-0">
          <p className="line-clamp-2 text-[13px] font-medium leading-snug text-[var(--text-secondary)]">
            {teaser}
          </p>
        </div>

        <div className="pointer-events-none absolute left-0 right-0 top-0 opacity-0 transition-opacity duration-200 ease-out group-hover:pointer-events-auto group-hover:opacity-100">
          <p className="text-[13px] leading-[1.5] text-[var(--text-primary)]">
            {p}
          </p>
        </div>
      </div>
    );
  }

  return (
    <p className="line-clamp-2 min-h-[2.65rem] text-[13px] leading-snug text-[var(--text-secondary)]">
      {clampTagline(listing.description, 120)}
    </p>
  );
}
