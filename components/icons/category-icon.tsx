import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
/* Category strip / grids: Lucide flat icons (14–16px via `size`). */
import {
  Crown,
  Sparkles,
  Shapes,
  Gamepad2,
  Headphones,
  Video,
  Unlock,
  Flame,
  Heart,
  Gem,
  Archive,
  BookOpen,
  Brain,
  Camera,
  CircleDot,
  Clapperboard,
  FileText,
  Glasses,
  Globe2,
  Link2,
  Monitor,
  Moon,
  Palette,
  ShieldCheck,
  Star,
  TreePine,
  Users,
  UsersRound,
  Webcam,
  Wine,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Icon = ComponentType<LucideProps>;

const ICONS: Record<string, Icon> = {
  "best-overall": Crown,
  "premium-porn": Gem,
  "free-tube": Unlock,
  "hd-4k": Monitor,
  vr: Glasses,
  "live-cams": Webcam,
  amateur: Camera,
  "dating-hookup": Heart,
  "hentai-anime": Palette,
  cartoon: Shapes,
  gaming: Gamepad2,
  asmr: Headphones,
  "fetish-bdsm": Link2,
  ebony: Star,
  asian: Globe2,
  latina: Flame,
  milf: Wine,
  "lesbian-queer": UsersRound,
  "solo-female": Moon,
  "gay-male": Users,
  trans: CircleDot,
  vintage: Archive,
  "public-outdoor": TreePine,
  celebrity: Sparkles,
  stories: BookOpen,
  "blogs-reviews": FileText,
  "tube-gifs": Clapperboard,
  "sex-ed-toys": Brain,
  cam2cam: Video,
  "escort-meetup": ShieldCheck,
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
