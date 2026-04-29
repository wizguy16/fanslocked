import Link from "next/link";
import { FlCardCompact } from "@/components/fanslocked-home/fl-card-compact";
import { outboundLinkProps } from "@/components/fanslocked-home/fl-outbound-link-props";
import { SitePreview } from "@/components/shared/site-preview";
import { clampTagline } from "@/lib/utils";
import type { CategoryBlog } from "@/lib/blog/generate-category-blog";
import type { Listing } from "@/types/listing";

type Props = {
  blog: CategoryBlog;
  categorySlug: string;
  categoryLabel: string;
  listings: Listing[];
};

export function BlogAutoCategoryLayout({
  blog,
  categorySlug,
  categoryLabel,
  listings,
}: Props) {
  const sorted = [...listings].sort((a, b) => b.rating - a.rating);
  const quick = sorted.slice(0, 4);
  const spotlights = sorted.slice(0, 5);
  const categoryHref = `/categories/${categorySlug}`;

  return (
    <article className="min-h-[100dvh] bg-[var(--bg-main)] text-[var(--text-primary)]">
      <div className="mx-auto max-w-[1100px] px-6 pb-4 pt-8">
        <Link
          href="/blog"
          className="text-[12px] font-medium text-[var(--text-secondary)] transition hover:text-[var(--accent-primary)]"
        >
          ← Guides & Insights
        </Link>
      </div>

      <section className="px-6 pb-10 pt-4">
        <div className="mx-auto max-w-[1100px] text-center">
          <p className="mb-3 text-[12px] text-[var(--text-secondary)]">
            Auto guide · {categoryLabel}
          </p>
          <h1 className="font-display text-balance text-3xl font-bold leading-tight text-white md:text-4xl md:leading-[1.15]">
            {blog.title}
          </h1>
          <p className="mx-auto mt-4 max-w-[700px] text-[15px] leading-relaxed text-[var(--text-secondary)]">
            {blog.description}
          </p>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="mb-4 text-lg font-semibold text-white">Top picks</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {quick.map((l) => (
              <FlCardCompact key={l.id} listing={l} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="mx-auto max-w-[800px]">
          <p className="text-[15px] leading-[1.7] text-[var(--text-secondary)]">
            {blog.intro}
          </p>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-[1100px] space-y-10">
          {spotlights.map((l, i) => {
            const out = outboundLinkProps(l);
            const blurb = clampTagline(l.preview ?? l.description, 220);
            return (
              <div
                key={l.id}
                className="grid items-center gap-6 md:grid-cols-2"
              >
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <Link
                    {...out}
                    aria-label={`${l.name} — opens partner site`}
                    className="group block overflow-hidden rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[var(--bg-elevated)]"
                  >
                    <SitePreview
                      slug={l.slug}
                      categorySlug={l.categorySlug}
                      alt={`${l.name} preview`}
                      fallbackScreenshot={l.screenshot}
                      fallbackLogo={l.logo}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="aspect-[16/10] rounded-none border-0 bg-transparent"
                      imageClassName="transition duration-300 group-hover:scale-[1.02]"
                    />
                  </Link>
                </div>
                <div className={i % 2 === 1 ? "md:order-1" : ""}>
                  <h3 className="text-xl font-semibold text-white">{l.name}</h3>
                  <p className="mt-2 text-[14px] leading-[1.6] text-[var(--text-secondary)]">
                    {blurb}
                  </p>
                  <Link
                    {...out}
                    className="mt-4 inline-block text-[14px] font-medium text-[var(--accent-primary)] transition hover:text-primary/85"
                  >
                    Visit site →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto grid max-w-[1100px] gap-8 md:grid-cols-2 md:gap-10">
          {blog.sections.map((s) => (
            <div key={s.title}>
              <h3 className="mb-3 text-lg font-semibold text-white">{s.title}</h3>
              <p className="text-[14px] leading-[1.6] text-[var(--text-secondary)]">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-16 text-center">
        <Link
          href={categoryHref}
          className="inline-block rounded-[10px] bg-[var(--accent-primary)] px-6 py-3 text-[14px] font-semibold text-white transition hover:brightness-110"
        >
          View full rankings →
        </Link>
      </section>
    </article>
  );
}
