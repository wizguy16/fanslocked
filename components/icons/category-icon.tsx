import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
/* Category strip / grids: Lucide flat icons (14–16px via `size`). */
import {
  Shapes,
  Gamepad2,
  HeartHandshake,
  Unlock,
  Heart,
  Gem,
  Cpu,
  Camera,
  Glasses,
  Link2,
  BookUser,
  Mars,
  MessageCircle,
  Palette,
  Search,
  Webcam,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Icon = ComponentType<LucideProps>;

const ICONS: Record<string, Icon> = {
  "ai-generated": Cpu,
  "premium-porn": Gem,
  "free-tube": Unlock,
  search: Search,
  vr: Glasses,
  "live-cams": Webcam,
  "fan-subscription-platforms": HeartHandshake,
  amateur: Camera,
  hookup: Heart,
  "sex-chat": MessageCircle,
  "hentai-anime": Palette,
  gaming: Gamepad2,
  "fetish-bdsm": Link2,
  "escort-directories": BookUser,
  "male-companions": Mars,
};

type Props = {
  slug: string;
  /** Pixel size (Lucide `size`); default 16 (14–16px range). */
  size?: number;
  className?: string;
};

/** Flat Lucide icon for a category slug. */
export function CategoryIcon({ slug, size = 16, className }: Props) {
  const Cmp = ICONS[slug] ?? Shapes;
  return (
    <Cmp
      size={size}
      strokeWidth={1.65}
      className={cn("shrink-0", className)}
      aria-hidden
    />
  );
}
