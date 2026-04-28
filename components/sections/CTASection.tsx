import Link from "next/link";
import { ArrowRight } from "lucide-react";

type CTASectionProps = {
  body?: string;
  buttonText?: string;
  buttonHref?: string;
  /** `primary` = solid amber (money). `secondary` = outline / nav (internal). */
  buttonVariant?: "primary" | "secondary";
};

export function CTASection({
  body = "Browse top fetish sites and find what fits your interests",
  buttonText = "Explore Fetish Sites",
  buttonHref = "/categories/fetish#fetish-browse-more",
  buttonVariant = "primary",
}: CTASectionProps) {
  const isSecondary = buttonVariant === "secondary";

  return (
    <section className="bg-[#0a0a0a] px-4 pb-16 pt-2 md:px-8 md:pb-20">
      <div className="relative mx-auto max-w-[960px] overflow-hidden rounded-2xl border border-white/[0.1] bg-[#111] px-6 py-14 text-center md:px-12 md:py-16">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background: isSecondary
              ? "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(255,255,255,0.04), transparent 55%)"
              : "radial-gradient(ellipse 80% 90% at 50% 100%, rgba(217, 119, 6, 0.35), transparent 58%), radial-gradient(circle at 50% 0%, rgba(245, 158, 11, 0.08), transparent 45%)",
          }}
        />
        <div className="relative">
          <p className="mx-auto max-w-2xl text-balance text-lg font-bold leading-snug tracking-[-0.02em] text-white md:text-xl">
            {body}
          </p>
          <Link
            href={buttonHref}
            className={
              isSecondary
                ? "mt-9 inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.15] bg-transparent px-10 py-3.5 text-[13px] font-semibold tracking-wide text-[#ccc] transition hover:border-[rgba(255,138,0,0.55)] hover:text-white"
                : "mt-9 inline-flex items-center justify-center gap-2 rounded-lg bg-[#d97706] px-10 py-3.5 text-[13px] font-bold uppercase tracking-[0.1em] text-[#0a0a0a] transition hover:bg-[#e88e12] [&_svg]:text-[#0a0a0a]"
            }
          >
            {buttonText}
            <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
