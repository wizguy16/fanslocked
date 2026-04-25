import Link from "next/link";
import type { CategoryPrestigeEditorial } from "@/lib/category-prestige-editorial";

type Props = {
  editorial: CategoryPrestigeEditorial | null;
};

export function CategoryFinalCta({ editorial }: Props) {
  return (
    <section
      className="mt-10 rounded-3xl border border-[rgba(255,140,66,0.2)] bg-[rgba(18,19,24,0.7)] px-6 py-10 text-center shadow-[inset_0_1px_0_0_rgba(255,182,141,0.1)] backdrop-blur-xl md:mt-12 md:px-10 md:py-14"
      aria-label="Next step"
    >
      {editorial ? (
        <>
          <p className="mx-auto max-w-2xl text-lg font-semibold leading-relaxed text-[#e3e1e9] md:text-xl">
            {editorial.finalCtaBody}
          </p>
          <Link
            href="#category-listings"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#ff8c42] px-10 py-4 text-base font-black uppercase tracking-wide text-[#331200] shadow-lg shadow-[#ff8c42]/20 transition hover:scale-[1.02] md:px-12 md:py-5 md:text-lg"
          >
            Start exploring now
          </Link>
        </>
      ) : (
        <>
          <h2 className="font-display text-2xl font-bold tracking-tight text-[#e3e1e9] md:text-3xl md:leading-tight">
            Ready to find your community?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#ddc1b3]">
            The picks above are ranked for fast scanning—same outbound rules as the rest of
            FansLocked. Click through to the destinations that fit your audience and disclosures.
          </p>
          <Link
            href="#category-listings"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#ff8c42] px-10 py-4 text-base font-black uppercase tracking-wide text-[#331200] shadow-lg shadow-[#ff8c42]/20 transition hover:scale-[1.02] md:px-12 md:py-5 md:text-lg"
          >
            Start exploring now
          </Link>
        </>
      )}
    </section>
  );
}
