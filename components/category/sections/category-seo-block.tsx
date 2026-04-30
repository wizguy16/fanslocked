import Link from "next/link";
import type { BlogPost } from "@/lib/blog-posts";
import type { CategoryPrestigeEditorial } from "@/lib/category-prestige-editorial";

type Props = {
  categoryLabel: string;
  editorial: CategoryPrestigeEditorial | null;
  /** Long-form guide on /blog when this category has a linked article. */
  guidePost: BlogPost | null;
};

function renderTextBlocks(value: string | readonly string[], keyPrefix: string) {
  const blocks = Array.isArray(value) ? value : [value];
  return blocks.map((text, i) => (
    <p key={`${keyPrefix}-${i}`} className="max-w-[52ch]">
      {text}
    </p>
  ));
}

export function CategorySeoBlock({
  categoryLabel,
  editorial,
  guidePost,
}: Props) {
  if (editorial) {
    return (
      <section
        className="mt-10 grid grid-cols-1 gap-6 border-t border-zinc-900 pt-10 text-[15px] leading-relaxed text-[#ddc1b3] md:mt-12 md:grid-cols-2 md:gap-x-8 md:gap-y-5 md:pt-12"
        aria-labelledby="category-seo-heading"
      >
        <h2 id="category-seo-heading" className="sr-only">
          {editorial.whatMakesHeading}
        </h2>
        <div className="space-y-7 md:space-y-6">
          <div>
            <h3 className="mb-3 font-display text-lg font-bold text-[#e3e1e9] md:text-xl">
              {editorial.whatMakesHeading}
            </h3>
            {editorial.whatMakesBody?.length ? (
              <div className="space-y-3">{renderTextBlocks(editorial.whatMakesBody, "what")}</div>
            ) : (
              <ul className="list-disc space-y-2 pl-5 marker:text-[#ff8c42]">
                {editorial.whatMakesBullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3 className="mb-3 font-display text-lg font-bold text-[#e3e1e9] md:text-xl">
              {editorial.whoForHeading}
            </h3>
            <div className="space-y-3">{renderTextBlocks(editorial.whoForBody, "who")}</div>
          </div>
        </div>
        <div className="space-y-7 md:space-y-6 md:pt-0">
          <div>
            <h3 className="mb-3 font-display text-lg font-bold text-[#e3e1e9] md:text-xl">
              {editorial.freeVsPremiumHeading}
            </h3>
            <div className="space-y-3 text-[15px] leading-relaxed">
              {renderTextBlocks(editorial.freeVsPremiumBody, "free-premium")}
            </div>
          </div>
          {editorial.beginnerVsAdvancedBody ? (
            <div>
              <h3 className="mb-3 font-display text-lg font-bold text-[#e3e1e9] md:text-xl">
                {editorial.beginnerVsAdvancedHeading ?? "Beginner vs advanced"}
              </h3>
              <div className="space-y-3 text-[15px] leading-relaxed">
                {renderTextBlocks(
                  typeof editorial.beginnerVsAdvancedBody === "string"
                    ? [editorial.beginnerVsAdvancedBody]
                    : editorial.beginnerVsAdvancedBody,
                  "fourth-seo",
                )}
              </div>
            </div>
          ) : null}
        </div>
        {editorial.useCaseBlock?.rows?.length ? (
          <div className="border-t border-zinc-800 pt-6 md:col-span-2">
            <h3 className="mb-3 font-display text-lg font-bold text-[#e3e1e9] md:text-xl">
              {editorial.useCaseBlock.heading}
            </h3>
            <ul className="max-w-[60ch] list-disc space-y-2 pl-5 text-[15px] leading-relaxed marker:text-[#ff8c42]">
              {editorial.useCaseBlock.rows.map((row) => (
                <li key={row.useCase}>
                  <span className="font-semibold text-[#e3e1e9]">{row.useCase}</span>
                  <span className="text-[#ddc1b3]"> → {row.pick}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {guidePost ? (
          <div className="border-t border-zinc-800 pt-6 md:col-span-2">
            <Link
              href={`/blog/${guidePost.slug}`}
              className="inline-flex max-w-prose text-sm font-semibold leading-snug text-[#ff8c42] transition hover:text-[#ffb68d]"
            >
              {editorial.guideLinkLabel ?? "Explore full guide →"}
              <span className="sr-only">: {guidePost.title}</span>
            </Link>
          </div>
        ) : null}
      </section>
    );
  }

  if (guidePost?.hub) {
    const hub = guidePost.hub;
    return (
      <section
        className="mt-10 grid grid-cols-1 gap-6 border-t border-zinc-900 pt-10 text-[15px] leading-relaxed text-[#ddc1b3] md:mt-12 md:grid-cols-2 md:gap-x-8 md:gap-y-5 md:pt-12"
        aria-labelledby="category-seo-heading"
      >
        <h2 id="category-seo-heading" className="sr-only">
          {hub.education.whatMakesHeading}
        </h2>
        <div className="space-y-7 md:space-y-6">
          <div>
            <h3 className="mb-3 font-display text-lg font-bold text-[#e3e1e9] md:text-xl">
              {hub.education.whatMakesHeading}
            </h3>
            <ul className="list-disc space-y-2 pl-5 marker:text-[#ff8c42]">
              {hub.education.whatMakesBullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-7 md:space-y-6">
          <div>
            <h3 className="mb-3 font-display text-lg font-bold text-[#e3e1e9] md:text-xl">
              {hub.education.freeVsPremiumHeading}
            </h3>
            <p className="text-[15px] leading-relaxed">
              {hub.education.freeVsPremiumBody}
            </p>
          </div>
        </div>
        <div className="border-t border-zinc-800 pt-6 md:col-span-2">
          <Link
            href={`/blog/${guidePost.slug}`}
            className="inline-flex max-w-prose text-sm font-semibold leading-snug text-[#ff8c42] transition hover:text-[#ffb68d]"
          >
            Explore full guide →
            <span className="sr-only">: {guidePost.title}</span>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      className="mt-10 grid grid-cols-1 gap-6 border-t border-zinc-900 pt-10 text-base leading-relaxed text-[#ddc1b3] md:mt-12 md:grid-cols-2 md:gap-x-8 md:gap-y-5 md:pt-12"
      aria-labelledby="category-seo-heading"
    >
      <h2 id="category-seo-heading" className="sr-only">
        About {categoryLabel}
      </h2>
      <div className="space-y-8">
        <div>
          <h3 className="mb-4 font-display text-xl font-bold text-[#e3e1e9] md:text-2xl">
            What makes a good {categoryLabel} site?
          </h3>
          <p>
            Security and consent are the foundation of any reputable platform. The best sites
            combine clear policies, age gating, and community moderation so readers know what they
            are clicking. We weigh depth of catalog, creator quality, and how well each destination
            matches this niche&apos;s search intent.
          </p>
        </div>
        <div>
          <h3 className="mb-4 font-display text-xl font-bold text-[#e3e1e9] md:text-2xl">
            Who this is for
          </h3>
          <p>
            Curated lists for everyone from first-time explorers comparing a few brands to
            publishers routing disclosed sponsor traffic. If you need order, scores, and
            outbound-safe links—not a random dump—this page is built for you.
          </p>
        </div>
      </div>
      <div className="space-y-8">
        <div>
          <h3 className="mb-4 font-display text-xl font-bold text-[#e3e1e9] md:text-2xl">
            Free vs premium
          </h3>
          <p>
            Free platforms trade reach for ads and upsells. Premium routes usually mean fewer
            interruptions, stronger production, and clearer upgrade paths. Match the model to how you
            monetize clicks from this page.
          </p>
        </div>
        <div>
          <h3 className="mb-4 font-display text-xl font-bold text-[#e3e1e9] md:text-2xl">
            Beginner vs advanced
          </h3>
          <p>
            Some destinations skew educational and onboarding-friendly; others target experienced
            audiences with deeper catalogs. Use tags and the copy on each listing to steer readers to
            the right tier of intensity and commitment.
          </p>
        </div>
      </div>
      {guidePost ? (
        <div className="border-t border-zinc-800 pt-6 md:col-span-2">
          <Link
            href={`/blog/${guidePost.slug}`}
            className="inline-flex max-w-prose text-sm font-semibold leading-snug text-[#ff8c42] transition hover:text-[#ffb68d]"
          >
            Explore full guide →
            <span className="sr-only">: {guidePost.title}</span>
          </Link>
        </div>
      ) : null}
    </section>
  );
}
