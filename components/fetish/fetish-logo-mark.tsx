import { Lock } from "lucide-react";

export function FetishLogoMark({ className }: { className?: string }) {
  return (
    <span
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#d97706] text-[#0a0a0a] ${className ?? ""}`}
      aria-hidden
    >
      <Lock className="h-[18px] w-[18px]" strokeWidth={2.5} />
    </span>
  );
}
