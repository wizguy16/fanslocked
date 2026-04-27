import Link from "next/link";
import { FlCardCompact } from "@/components/fanslocked-home/fl-card-compact";
import { outboundLinkProps } from "@/components/fanslocked-home/fl-outbound-link-props";
import { SitePreview } from "@/components/shared/site-preview";
import { clampTagline } from "@/lib/utils";
import type { BlogPost } from "@/lib/blog-posts";
import type { Listing } from "@/types/listing";

function formatBlogHeroDate(isoDate: string): string {
  const d = new Date(`${isoDate}T12:00:00Z`);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

type Props = {
  post: BlogPost;
  categorySlug: string;
  categoryLabel: string;
  topListings: Listing[];
};

export function BlogHubLayout({
  post,
  categorySlug,
  categoryLabel,
  topListings,
}: Props) {
  const hub = post.hub!;

  const quick = topListings.slice(0, 4);
  const spotlights = topListings.slice(0, 5);
  const categoryHref = `/categories/${categorySlug}`;
  const updated = formatBlogHeroDate(post.date);
  const midPrompt =
    hub.midCtaPrompt ??
    "Want the full ranked list with comparisons?";
  const midButton =
    hub.midCtaButtonLabel ?? `View top ${categoryLabel} →`;
  const finalHead =
    hub.finalCtaHeading ?? "Ready to explore?";
  const finalBody =
    hub.finalCtaBody ??
    `Start with the platforms above, then open the ${categoryLabel} hub for scores, blurbs, and disclosure-safe outbound links.`;
  const finalButton =
    hub.finalCtaButtonLabel ?? "Start exploring now";

  return (
    <article className="min-h-[100dvh] bg-[var(--bg-main)] text-[var(--text-primary)]">
      <div className="mx-auto max-w-[1100px] px-6 pt-8 pb-4">
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
            Updated {updated} · {hub.readTimeMinutes} min read
          </p>
          <h1 className="font-display text-balance text-3xl font-bold leading-tight text-white md:text-4xl md:leading-[1.15]">
            {post.title}
          </h1>
          <p className="mx-auto mt-4 max-w-[700px] text-[15px] leading-relaxed text-[var(--text-secondary)]">
            {hub.heroLead}
          </p>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Top picks right now
          </h2>
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
            {post.body[0] ?? hub.heroLead}
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
                    className="mt-4 inline-block text-[14px] font-medium text-[var(--accent-primary)] transition hover:text-[#ff9a40]"
                  >
                    Visit site →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {post.body.length > 1 ? (
        <section className="px-6 pb-12">
          <div className="mx-auto max-w-[800px] space-y-4 text-[15px] leading-[1.65] text-[var(--text-secondary)]">
            {post.body.slice(1).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>
      ) : null}

      <section className="px-6 pb-12">
        <div className="mx-auto grid max-w-[1100px] gap-8 md:grid-cols-2 md:gap-10">
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">
              {hub.education.whatMakesHeading}
            </h3>
            <ul className="space-y-2 text-[14px] leading-snug text-[var(--text-secondary)]">
              {hub.education.whatMakesBullets.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="shrink-0 text-[var(--accent-primary)]">•</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">
              {hub.education.freeVsPremiumHeading}
            </h3>
            <p className="text-[14px] leading-[1.6] text-[var(--text-secondary)]">
              {hub.education.freeVsPremiumBody}
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-[800px] text-center">
          <p className="text-[14px] text-[var(--text-secondary)]">{midPrompt}</p>
          <Link
            href={categoryHref}
            className="mt-4 inline-block rounded-[10px] bg-[var(--accent-primary)] px-6 py-3 text-[14px] font-semibold text-black transition hover:bg-[#ff933a]"
          >
            {midButton}
          </Link>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-[900px] rounded-[16px] border border-white/[0.06] bg-[var(--bg-card)] p-8 text-center">
          <h3 className="text-xl font-semibold text-white">{finalHead}</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--text-secondary)]">
            {finalBody}
          </p>
          <Link
            href={categoryHref}
            className="mt-6 inline-block rounded-[10px] bg-[var(--accent-primary)] px-6 py-3 text-[14px] font-semibold text-black transition hover:bg-[#ff933a]"
          >
            {finalButton}
          </Link>
        </div>
      </section>
    </article>
  );
}
