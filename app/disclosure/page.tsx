import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate disclosure",
  description: "FTC-compliant affiliate disclosure for The Porn Dude 2.0.",
  alternates: { canonical: "/disclosure" },
};

export default function DisclosurePage() {
  return (
    <div className="px-3 py-10 sm:px-4 md:px-6">
      <div className="mx-auto max-w-3xl space-y-4 text-sm leading-relaxed text-slate-300">
        <h1 className="font-display text-2xl font-bold text-white">
          Affiliate disclosure (FTC)
        </h1>
        <p className="text-slate-400">Last updated: April 23, 2026</p>
        <p>
          The Porn Dude 2.0 earns commissions from some outbound links when you
          sign up, purchase, or take qualifying actions on partner sites. Those
          links are marked with{" "}
          <code className="rounded bg-white/10 px-1 py-0.5 text-xs">
            rel=&quot;sponsored&quot;
          </code>{" "}
          and labeled in the interface as affiliate destinations.
        </p>
        <p>
          Compensation does not guarantee a favorable review. Listings are
          ranked by editorial criteria including trust, UX, billing transparency,
          and catalog quality. Partners cannot pay for higher star ratings.
        </p>
        <p>
          Where we also provide a non-affiliate homepage link, it is offered for
          reader convenience and transparency.
        </p>
      </div>
    </div>
  );
}
