import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How FansLocked handles analytics, cookies, and data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="px-3 py-10 sm:px-4 md:px-6">
      <div className="mx-auto max-w-3xl space-y-4 text-sm leading-relaxed text-slate-300">
        <h1 className="font-display text-2xl font-bold text-white">
          Privacy policy
        </h1>
        <p className="text-slate-400">Last updated: April 23, 2026</p>
        <p>
          This directory does not require accounts to browse. If you subscribe
          to our newsletter, we store your email only for that purpose and do not
          sell it to third parties. You can unsubscribe from any marketing email
          with one click.
        </p>
        <p>
          We may use privacy-friendly analytics (such as Plausible) or similar
          tools that avoid persistent cross-site tracking. Refer to your
          browser settings to block cookies entirely if you prefer.
        </p>
        <p>
          Outbound links leave our domain; each destination has its own privacy
          policy. Read those carefully before creating accounts or entering
          payment details elsewhere.
        </p>
      </div>
    </div>
  );
}
