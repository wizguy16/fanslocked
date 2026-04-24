import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  className?: string;
};

export function SectionHeader({
  title,
  subtitle,
  viewAllHref,
  viewAllLabel = "View All",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "mb-4 flex flex-row items-center justify-between gap-4",
        className,
      )}
    >
      <div className="min-w-0 text-left">
        <h2 className="text-[18px] font-bold leading-snug tracking-tight text-white md:text-[22px]">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[#6B7280]">
            {subtitle}
          </p>
        ) : null}
      </div>
      {viewAllHref ? (
        <Link
          href={viewAllHref}
          className="shrink-0 text-sm font-medium text-[#6B7280] transition hover:text-[#FF7A00]"
        >
          {viewAllLabel} <span aria-hidden>→</span>
        </Link>
      ) : null}
    </div>
  );
}
