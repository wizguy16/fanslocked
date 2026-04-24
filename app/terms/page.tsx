import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms for using the FansLocked directory website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="px-3 py-10 sm:px-4 md:px-6">
      <div className="mx-auto max-w-3xl space-y-4 text-sm leading-relaxed text-slate-300">
        <h1 className="font-display text-2xl font-bold text-white">
          Terms of use
        </h1>
        <p className="text-slate-400">Last updated: April 23, 2026</p>
        <p>
          By using FansLocked you confirm you are at least 18 years old (or
          the age of majority where you live) and legally permitted to view
          adult-oriented directories.
        </p>
        <p>
          Content on third-party sites is not controlled by us. We provide
          editorial opinions and links for informational purposes only. You are
          solely responsible for compliance with local laws.
        </p>
        <p>
          We may update these terms periodically. Continued use after changes
          constitutes acceptance of the revised terms.
        </p>
      </div>
    </div>
  );
}
