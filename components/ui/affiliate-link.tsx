import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ReactNode } from "react";

export function AffiliateLink({
  className,
  href,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  const external = (href ?? "").startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={
        external
          ? "sponsored noopener noreferrer"
          : "sponsored noreferrer"
      }
      data-affiliate="true"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[0_0_20px_-8px_rgba(201,0,9,0.45)] transition hover:brightness-105 hover:shadow-[0_0_24px_-6px_rgba(201,0,9,0.55)] active:scale-[0.98]",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
