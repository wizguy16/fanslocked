import { Check } from "lucide-react";

const bullets = [
  "We curate real platforms — not random uploads or scraped content.",
  "Listings are selected based on niche depth, consistency, and user experience.",
  "No fake listings or placeholder sites — only active platforms.",
];

export function TrustSection() {
  return (
    <section className="border-t border-white/[0.06] bg-[#0a0a0a] px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-10 text-center text-2xl font-bold tracking-[-0.02em] text-white md:text-3xl">
          Why Trust FansLocked?
        </h2>
        <ul className="space-y-5 text-left text-[15px] leading-relaxed text-[#d4d4d4]">
          {bullets.map((line) => (
            <li key={line} className="flex gap-3.5">
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#d97706]/20 text-[#fbbf24]"
                aria-hidden
              >
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
