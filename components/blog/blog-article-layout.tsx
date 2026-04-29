import Link from "next/link";
import type { BlogPost } from "@/lib/blog-posts";

export function BlogArticleLayout({ post }: { post: BlogPost }) {
  return (
    <article className="min-h-[100dvh] bg-[var(--bg-main)] px-3 py-8 sm:px-4 md:px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="text-xs font-medium text-[var(--text-secondary)] transition hover:text-[var(--accent-primary)]"
        >
          ← Guides & Insights
        </Link>
        <p className="mt-4 text-xs text-[var(--text-muted)]">{post.date}</p>
        <h1 className="mt-2 font-display text-2xl font-bold text-white sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-[var(--text-secondary)]">{post.excerpt}</p>
        <div className="mt-8 max-w-none space-y-4 text-sm leading-relaxed text-[var(--text-secondary)]">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        {post.relatedCategorySlug ? (
          <div className="mt-10 rounded-2xl border border-[rgba(255,122,0,0.25)] bg-[rgba(255,122,0,0.06)] p-5">
            <p className="text-sm font-medium text-white">Ready to compare picks?</p>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              Open the ranked category hub for short blurbs, scores, and disclosure-safe
              outbound links.
            </p>
            <Link
              href={`/categories/${post.relatedCategorySlug}`}
              className="mt-4 inline-flex text-sm font-semibold text-[var(--accent-primary)] transition hover:text-primary/85"
            >
              View top sites →
            </Link>
          </div>
        ) : null}
      </div>
    </article>
  );
}
