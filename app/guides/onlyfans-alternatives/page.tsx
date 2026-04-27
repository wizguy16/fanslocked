import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getListingBySlug } from "@/lib/data";
import { SitePreview } from "@/components/shared/site-preview";
import { cn } from "@/lib/utils";

const CATEGORY_HREF = "/categories/fan-subscription-platforms";

export const metadata: Metadata = {
  title: "Best OnlyFans Alternatives (2026) – Top Sites Like OnlyFans",
  description:
    "OnlyFans alternatives and sites like OnlyFans: compare top OnlyFans competitors — Fansly, Fanvue, LoyalFans, and more. Find the right fan subscription platform.",
  alternates: { canonical: "/guides/onlyfans-alternatives" },
  keywords: [
    "onlyfans alternatives",
    "sites like onlyfans",
    "best onlyfans alternatives 2026",
    "onlyfans competitors",
  ],
};

const QUICK_PICKS: {
  slug: string;
  blurb: string;
}[] = [
  {
    slug: "fansly",
    blurb:
      "Fast-growing platform with strong discovery and a mix of free + paid content.",
  },
  {
    slug: "fanvue",
    blurb:
      "Clean interface with growing creator base and modern monetization tools.",
  },
  {
    slug: "loyalfans",
    blurb:
      "Feature-rich platform with messaging, live streaming, and multiple income options.",
  },
  {
    slug: "manyvids",
    blurb:
      "Well-established platform combining fan subscriptions with clip sales.",
  },
];

const LONG_SECTIONS: {
  slug: string;
  body: string;
  bestFor: string;
}[] = [
  {
    slug: "fansly",
    body: "Fansly has quickly become one of the strongest OnlyFans alternatives, offering flexible subscription tiers, free preview content, and better discovery tools for new creators.\n\nIt’s especially strong for users who want to explore before subscribing, with a mix of free posts and premium unlocks.",
    bestFor: "Discovering new creators before subscribing",
  },
  {
    slug: "fanvue",
    body: "Fanvue focuses on a cleaner user experience and modern monetization tools, making it easier to follow creators and manage subscriptions.\n\nIt’s a solid alternative for users who want a straightforward platform without clutter.",
    bestFor: "A streamlined subscription experience",
  },
  {
    slug: "loyalfans",
    body: "LoyalFans combines subscriptions, messaging, and live streaming into one platform, giving users more ways to interact directly with creators.\n\nIt’s ideal if you want more than just static content and prefer ongoing engagement.",
    bestFor: "Messaging, live streams, and ongoing fan–creator interaction",
  },
  {
    slug: "manyvids",
    body: "ManyVids blends subscriptions with clip-based content, giving users more flexibility in how they access and purchase content.\n\nIt’s one of the most established platforms and offers a wide range of creators and content types.",
    bestFor: "Subscriptions plus clip purchases in one marketplace",
  },
  {
    slug: "justforfans",
    body: "JustForFans is built around creator control, offering flexible pricing and direct fan interaction.\n\nIt’s a good option if you’re looking for a more niche or creator-focused experience.",
    bestFor: "Creator-led pricing and a more niche, fan-direct feel",
  },
];

function SiteLink({
  slug,
  className,
  children,
}: {
  slug: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={`/site/${slug}`} className={cn("hover:text-amber-200", className)}>
      {children}
    </Link>
  );
}

function QuickPickCard({
  slug,
  blurb,
}: {
  slug: string;
  blurb: string;
}) {
  const listing = getListingBySlug(slug);
  const title = listing?.name ?? slug;
  const categorySlug = listing?.categorySlug ?? "fan-subscription-platforms";

  return (
    <SiteLink
      slug={slug}
      className="group block rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl transition hover:border-amber-500/30"
    >
      <div className="mb-3">
        <SitePreview
          slug={slug}
          categorySlug={categorySlug}
          alt={`${title} preview`}
          fallbackScreenshot={listing?.screenshot}
          fallbackLogo={listing?.logo}
          sizes="(max-width: 768px) 100vw, 50vw"
          imageClassName="transition group-hover:opacity-95"
        />
      </div>
      <h3 className="font-display text-lg font-semibold text-white group-hover:text-amber-200">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{blurb}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:text-amber-300">
        View listing
        <ArrowRight className="h-3 w-3" aria-hidden />
      </span>
    </SiteLink>
  );
}

export default function OnlyFansAlternativesGuidePage() {
  return (
    <div className="px-3 py-8 sm:px-4 md:px-6">
      <article className="mx-auto max-w-3xl">
        <header className="border-b border-white/10 pb-8">
          <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Best OnlyFans Alternatives (2026)
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-300">
            Looking for platforms like OnlyFans? These sites offer similar
            subscription models, creator access, and exclusive content — with
            different features, pricing, and discovery tools.
          </p>
          <p className="mt-3 text-base leading-relaxed text-slate-300">
            We’ve curated the top alternatives based on usability, creator
            activity, and overall experience.
          </p>
          <div className="mt-8 space-y-3 rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-5 text-sm leading-relaxed text-slate-200 sm:text-base sm:leading-relaxed">
            <p>
              OnlyFans isn’t the only option anymore — and for a lot of creators
              and users, it’s not even the best one.
            </p>
            <p>
              Fees, content limits, and platform control have pushed both
              creators and fans toward alternatives that offer better payouts,
              fewer restrictions, and more direct access.
            </p>
            <p className="font-medium text-slate-100">
              The platforms below are where most of that traffic is moving.
            </p>
          </div>
        </header>

        <section
          className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6"
          aria-labelledby="why-leaving-heading"
        >
          <h2
            id="why-leaving-heading"
            className="font-display text-xl font-bold tracking-tight text-white md:text-2xl"
          >
            Why people are leaving OnlyFans
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
            <p>
              Creators are moving away from OnlyFans for a few key reasons —
              payout structure, platform restrictions, and lack of discovery.
            </p>
            <p>
              Many alternatives give creators more control over pricing, better
              revenue splits, and improved ways to reach new audiences.
            </p>
            <p>
              That shift is why newer platforms are growing quickly.
            </p>
            <p>
              If you&apos;re hunting real{" "}
              <span className="text-slate-200">onlyfans alternatives</span>{" "}
              (not a re-skin of the same limits), that growth is the signal to
              compare more than one fan platform before you subscribe.
            </p>
          </div>
        </section>

        <section className="mt-10 space-y-4" aria-labelledby="quick-picks-heading">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h2
              id="quick-picks-heading"
              className="font-display text-xl font-bold tracking-tight text-white md:text-2xl"
            >
              Top OnlyFans alternatives right now
            </h2>
            <Link
              href={CATEGORY_HREF}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300"
            >
              Full fan subscription directory →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {QUICK_PICKS.map((row) => (
              <QuickPickCard key={row.slug} slug={row.slug} blurb={row.blurb} />
            ))}
          </div>
        </section>

        <section className="mt-10 space-y-4" aria-labelledby="top-alternatives-heading">
          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            These platforms aren’t identical — each one leans slightly differently
            depending on what you’re looking for.
          </p>
          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            Some focus on higher payouts, others on discovery, and some on
            direct fan interaction. The best option depends on how you actually
            use the platform.
          </p>
          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            That&apos;s the same split people have in mind when they compare{" "}
            <span className="text-slate-200">sites like onlyfans</span> or stack{" "}
            <span className="text-slate-200">onlyfans competitors</span> by
            discovery, messaging, and pricing — not by who advertised hardest.
          </p>
          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            If you want a full breakdown, you can{" "}
            <Link
              href={CATEGORY_HREF}
              className="font-semibold text-amber-300 underline decoration-amber-500/40 underline-offset-2 hover:text-amber-200"
            >
              browse all fan subscription platforms here
            </Link>
            .
          </p>
          <h2
            id="top-alternatives-heading"
            className="pt-4 font-display text-xl font-bold tracking-tight text-white md:text-2xl"
          >
            Top alternatives
          </h2>

          <div className="space-y-12">
          {LONG_SECTIONS.map(({ slug, body, bestFor }) => {
            const listing = getListingBySlug(slug);
            const name = listing?.name ?? slug;
            const paragraphs = body.split("\n\n");

            return (
              <section
                key={slug}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6"
                aria-labelledby={`platform-${slug}-heading`}
              >
                <h3
                  id={`platform-${slug}-heading`}
                  className="font-display text-xl font-semibold text-white"
                >
                  <SiteLink slug={slug} className="text-white hover:text-amber-200">
                    {name}
                  </SiteLink>
                </h3>
                <p className="mt-2 text-sm font-medium text-amber-200/90">
                  Best for: {bestFor}
                </p>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
                  {paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <SiteLink
                  slug={slug}
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-amber-400"
                >
                  Open {name} listing
                  <ArrowRight className="h-3 w-3" aria-hidden />
                </SiteLink>
              </section>
            );
          })}
          </div>
        </section>

        <section
          className="mt-14 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6"
          aria-labelledby="compare-heading"
        >
          <h2
            id="compare-heading"
            className="font-display text-xl font-bold tracking-tight text-white md:text-2xl"
          >
            How OnlyFans alternatives compare
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
            <p>
              While most platforms follow a similar subscription model, they
              differ in how content is discovered and how users interact with
              creators.
            </p>
            <p>
              Some platforms prioritize discovery and free previews, while
              others focus more on private subscriptions and direct messaging.
            </p>
            <p>
              Choosing the right one depends on whether you want to explore
              multiple creators or follow a smaller number more closely.
            </p>
            <p>
              If you&apos;re coming from OnlyFans, the biggest differences
              you&apos;ll notice are how content is discovered and how creators
              structure their pricing.
            </p>
            <p>
              Some platforms rely heavily on subscriptions, while others lean
              into clips, messaging, or tipping systems. Exploring more than one
              platform usually gives you a better experience than sticking to
              just one.
            </p>
            <p>
              The same idea applies when you&apos;re comparing{" "}
              <span className="text-slate-200">platforms like onlyfans</span>{" "}
              for day-to-day use — pick two or three that match how you discover
              creators and pay, then narrow down.
            </p>
          </div>
        </section>

        <section
          className="mt-14 rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] p-6 text-center"
          aria-labelledby="cta-heading"
        >
          <h2
            id="cta-heading"
            className="font-display text-lg font-bold text-white sm:text-xl"
          >
            Ready to find better alternatives?
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-slate-300">
            Start with the platforms above and explore where creators are actually
            moving — not just where the traffic used to be.
          </p>
          <Link
            href={CATEGORY_HREF}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-black shadow-soft transition hover:bg-primary/90 hover:shadow-soft-glow active:scale-[0.98]"
          >
            Explore All Platforms
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </section>
      </article>
    </div>
  );
}
