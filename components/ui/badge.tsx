import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type Tone = "neutral" | "accent" | "primary" | "secondary";

const tones: Record<Tone, string> = {
  neutral: "bg-white/5 text-slate-300 border border-white/10",
  accent: "bg-accent/10 text-accent border border-accent/25",
  primary: "bg-primary/15 text-primary border border-primary/30",
  secondary: "bg-secondary/15 text-secondary border border-secondary/30",
};

export function Badge({
  className,
  tone = "neutral",
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  tone?: Tone;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide transition-default",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
