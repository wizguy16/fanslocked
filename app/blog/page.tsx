import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Guides & Insights",
  description:
    "Long-tail guides tied to our category hubs — safety, VR, niche explainers, and how disclosures work at FansLocked.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <div className="px-3 py-8 sm:px-4 md:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
          Guides & Insights
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Long-form articles that feed our category pages — deep intent, not
          duplicate “mini reviews.” Follow a guide here, then hit the ranked hub
          when you are ready to compare sites.
        </p>
        <ul className="mt-8 space-y-4">
          {BLOG_POSTS.map((p) => (
            <li key={p.slug}>
              <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl transition hover:border-amber-500/30">
                <p className="text-xs text-slate-500">{p.date}</p>
                <h2 className="mt-1 font-display text-lg font-semibold text-white">
                  <Link
                    href={`/blog/${p.slug}`}
                    className="hover:text-amber-200"
                  >
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-slate-400">{p.excerpt}</p>
                <Link
                  href={`/blog/${p.slug}`}
                  className="mt-3 inline-block text-xs font-semibold text-amber-400 hover:text-amber-300"
                >
                  {p.relatedCategorySlug ? "Read guide →" : "Read article →"}
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
