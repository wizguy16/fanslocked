import Link from "next/link";
import type { CategoryPrestigeEditorial } from "@/lib/category-prestige-editorial";

type Props = {
  editorial: CategoryPrestigeEditorial | null;
};

export function CategoryFinalCta({ editorial }: Props) {
  return (
    <section
      className="mt-10 rounded-none border border-white/[0.08] bg-[#292929] px-6 py-10 text-center md:mt-12 md:px-10 md:py-14"
      aria-label="Next step"
    >
      {editorial ? (
        <>
          <p className="mx-auto max-w-2xl text-lg font-semibold leading-relaxed text-white md:text-xl">
            {editorial.finalCtaBody}
          </p>
          <Link
            href="#category-listings"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 text-base font-black uppercase tracking-wide text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 md:px-12 md:py-5 md:text-lg"
          >
            Start exploring now
          </Link>
        </>
      ) : (
        <>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl md:leading-tight">
            Ready to find your community?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-neutral-400">
            The picks above are ranked for fast scanning—same outbound rules as the rest of
            FansLocked. Click through to the destinations that fit your audience and disclosures.
          </p>
          <Link
            href="#category-listings"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 text-base font-black uppercase tracking-wide text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 md:px-12 md:py-5 md:text-lg"
          >
            Start exploring now
          </Link>
        </>
      )}
    </section>
  );
}
