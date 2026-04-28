import { CalendarDays, ShieldCheck } from "lucide-react";

type HeroSectionProps = {
  title: string;
  subtitle: string;
  year: number;
};

export function HeroSection({ title, subtitle, year }: HeroSectionProps) {
  const monthYear = `Jan ${year}`;

  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#0a0a0a] px-4 pb-16 pt-12 md:px-8 md:pb-20 md:pt-16">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 92% 8%, rgba(245, 158, 11, 0.22), transparent 52%),
            radial-gradient(ellipse 55% 45% at 70% 0%, rgba(217, 119, 6, 0.12), transparent 50%),
            linear-gradient(180deg, #0c0c0c 0%, #0a0a0a 45%, #0a0a0a 100%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="mb-6 inline-flex items-center rounded-full border border-[rgba(245,158,11,0.55)] bg-[#111]/80 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#fbbf24]">
          {year} rankings
        </p>
        <h1 className="mb-5 text-balance text-[clamp(1.875rem,4.5vw,2.75rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-white">
          {title}
        </h1>
        <p className="mx-auto max-w-2xl whitespace-pre-line text-pretty text-[15px] leading-relaxed text-[#a3a3a3] md:text-base">
          {subtitle}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-[13px]">
          <span className="inline-flex items-center gap-2 text-[#4ade80]">
            <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={2.25} />
            <span className="font-medium text-[#d4d4d4]">Verified Security</span>
          </span>
          <span className="inline-flex items-center gap-2 text-[#737373]">
            <CalendarDays className="h-4 w-4 shrink-0" strokeWidth={2.25} />
            <span>Updated {monthYear}</span>
          </span>
        </div>
      </div>
    </section>
  );
}
