import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import {
  FETISH_HUB_PAGE_META,
  FETISH_HUB_SLUGS,
  type FetishHubSlug,
} from "@/lib/fetish-hub-routes";
import { MainHeader } from "@/components/layout/MainHeader";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";

type Props = { params: { slug: string } };

/** Full ranking page lives at `app/fetish/femdom-sites/page.tsx`. */
export function generateStaticParams(): { slug: FetishHubSlug }[] {
  return FETISH_HUB_SLUGS.filter((s) => s !== "femdom-sites").map((slug) => ({
    slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const meta = FETISH_HUB_PAGE_META[params.slug as FetishHubSlug];
  if (!meta) return { title: "Fetish rankings" };
  return {
    title: meta.title,
    description: meta.intro,
    alternates: { canonical: `/fetish/${params.slug}` },
  };
}

export default function FetishHubPage({ params }: Props) {
  const meta = FETISH_HUB_PAGE_META[params.slug as FetishHubSlug];
  if (!meta) notFound();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] antialiased">
      <MainHeader />
      <Breadcrumbs containerClassName="max-w-[1280px] px-4 md:px-8" />
      <main className="mx-auto max-w-[1280px] px-4 py-12 md:px-8 md:py-16">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#a3a3a3]">
          <Link
            href="/categories/fetish"
            className="text-[#a3a3a3] transition hover:text-white hover:underline"
          >
            Fetish hub
          </Link>
          <span className="text-[#525252]"> / </span>
          Rankings
        </p>
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          {meta.title}
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-[#a3a3a3]">
          {meta.intro}
        </p>
        <Link
          href="/categories/fetish"
          className="mt-10 inline-flex items-center gap-2 rounded-lg border border-white/[0.15] bg-transparent px-6 py-3 text-sm font-semibold tracking-wide text-[#ccc] transition hover:border-[rgba(255,138,0,0.55)] hover:text-white"
        >
          Back to fetish hub
          <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden />
        </Link>
      </main>
    </div>
  );
}
