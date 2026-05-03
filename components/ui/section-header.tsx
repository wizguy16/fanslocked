import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  className?: string;
  /** Homepage lane sections — centered, larger type, editorial hierarchy. */
  variant?: "default" | "centered";
};

export function SectionHeader({
  title,
  subtitle,
  viewAllHref,
  viewAllLabel = "View All",
  className,
  variant = "default",
}: Props) {
  if (variant === "centered") {
    return (
      <div
        className={cn(
          "mx-auto mb-12 max-w-3xl text-center",
          className,
        )}
      >
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-4 text-lg leading-relaxed text-neutral-400">
            {subtitle}
          </p>
        ) : null}
        {viewAllHref ? (
          <p className="mt-5">
            <Link
              href={viewAllHref}
              className="text-sm font-medium text-primary transition hover:text-primary/85"
            >
              {viewAllLabel} <span aria-hidden>→</span>
            </Link>
          </p>
        ) : null}
      </div>
    );
  }

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
          className="shrink-0 text-sm font-medium text-[#6B7280] transition hover:text-primary"
        >
          {viewAllLabel} <span aria-hidden>→</span>
        </Link>
      ) : null}
    </div>
  );
}
