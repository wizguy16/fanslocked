import { cn } from "@/lib/utils";

type Tag = "h1" | "h2" | "h3";

type Props = {
  children: React.ReactNode;
  as?: Tag;
  /** Slightly smaller bar + type for secondary bands. */
  size?: "default" | "compact";
  className?: string;
  id?: string;
};

/**
 * Section title matching the “Live Cams” reference — vertical red accent, bold white label.
 */
export function CategoriesRailHeading({
  children,
  as: Tag = "h1",
  size = "default",
  className,
  id,
}: Props) {
  const bar =
    size === "compact"
      ? "min-h-[1.25rem] w-[1.5px] rounded-full bg-red-600"
      : "min-h-[1.75rem] w-0.5 rounded-full bg-red-600 shadow-[0_0_6px_rgba(220,38,38,0.28)]";
  const text =
    size === "compact"
      ? "text-base font-bold tracking-tight text-white sm:text-lg"
      : "text-lg font-bold tracking-tight text-white sm:text-xl";

  return (
    <Tag
      id={id}
      className={cn("flex items-center gap-3 leading-none", text, className)}
    >
      <span className={cn("shrink-0 self-stretch", bar)} aria-hidden />
      {children}
    </Tag>
  );
}
