const MA_TRACK_USER_ID =
  "c82f71111fc722c320a3043ec79528c0ec4a80f347de9da5e76bc3d98dc3347c";

const WIDGET_ORIGIN = "https://creative.mavrtracktor.com/widgets/v4/Universal";

export type StripchatWidgetUrlOptions = {
  tag?: string;
  rows?: number;
  cols?: number;
  /** Unique per slot — sent as `rand` so each iframe can resolve a different pool. */
  seed?: number;
};

/** Build partner Universal URL; same defaults as the legacy embed when options are empty. */
export function buildStripchatWidgetUrl(
  opts: StripchatWidgetUrlOptions = {},
): string {
  const u = new URL(WIDGET_ORIGIN);
  u.searchParams.set("userId", MA_TRACK_USER_ID);
  u.searchParams.set("buttonText", "Enter");
  u.searchParams.set("thumbsMargin", "4");
  u.searchParams.set("hideTitle", "1");
  u.searchParams.set("backgroundColor", "0b0b0f");
  u.searchParams.set("liveBadgeColor", "ef4444");
  if (opts.tag) u.searchParams.set("tag", opts.tag);
  if (opts.rows != null) u.searchParams.set("rows", String(opts.rows));
  if (opts.cols != null) u.searchParams.set("cols", String(opts.cols));
  if (opts.seed != null) u.searchParams.set("rand", String(opts.seed));
  return u.toString();
}

type Props = {
  /** Shorter embed for secondary placements. */
  compact?: boolean;
  /** Shortest variant for dense grid cells. */
  density?: "default" | "directory";
  /** Sharp corners (no rounding) on the iframe. */
  squareCorners?: boolean;
  /** Taller iframe for partner `gridColumns` × `gridRows` Universal layouts. */
  grid4x2?: boolean;
  /** Full URL override — skips `tag` / `rows` / `cols` builder. */
  src?: string;
  iframeTitle?: string;
  /** Performer pool filter (e.g. `latina`, `men`) — partner `tag` query param. */
  tag?: string;
  rows?: number;
  cols?: number;
  /** Passed as `rand` on the embed URL (use a unique index per iframe). */
  seed?: number;
};

export default function StripchatWidget({
  compact,
  density = "default",
  squareCorners,
  grid4x2,
  src,
  iframeTitle = "Live streams",
  tag,
  rows,
  cols,
  seed,
}: Props) {
  const directory = compact && density === "directory";
  const embedSrc =
    src?.trim() ||
    buildStripchatWidgetUrl({
      tag: tag?.trim() || undefined,
      rows,
      cols,
      seed,
    });

  let iframeClass: string;
  let wrapperClass: string;

  if (grid4x2) {
    /** Fills a fixed-height parent (e.g. categories live band) so `overflow-hidden` clips cleanly. */
    iframeClass = "h-full min-h-0 w-full rounded-none border-0";
    wrapperClass = "h-full min-h-0 w-full";
  } else if (directory) {
    iframeClass = squareCorners
      ? "h-[130px] w-full rounded-none border-0 sm:h-[150px]"
      : "h-[130px] w-full rounded-md border-0 sm:h-[150px]";
    wrapperClass = "w-full min-h-[120px]";
  } else if (compact) {
    iframeClass = squareCorners
      ? "h-[220px] w-full rounded-none border-0 sm:h-[260px] md:h-[280px]"
      : "h-[220px] w-full rounded-lg border-0 sm:h-[260px] md:h-[280px]";
    wrapperClass = "w-full min-h-[200px]";
  } else {
    iframeClass = squareCorners
      ? "h-[400px] w-full rounded-none border-0 md:h-[500px] lg:h-[600px]"
      : "h-[400px] w-full rounded-xl border-0 md:h-[500px] lg:h-[600px]";
    wrapperClass = "w-full min-h-[320px]";
  }

  return (
    <div className={wrapperClass}>
      <iframe
        title={iframeTitle}
        src={embedSrc}
        className={iframeClass}
        loading="lazy"
      />
    </div>
  );
}
