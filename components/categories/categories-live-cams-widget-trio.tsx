import { CategoriesRailHeading } from "@/components/categories/categories-rail-heading";
import StripchatWidget from "@/components/stripchat-widget";

/** Single Universal embed: 4×2 grid, combined tags, site-matched chrome (`backgroundColor`). */
const LIVE_CAMS_GRID_WIDGET_SRC =
  "https://creative.mavrtracktor.com/widgets/v4/Universal?userId=c82f71111fc722c320a3043ec79528c0ec4a80f347de9da5e76bc3d98dc3347c&tag=girls%2Febony%2Cgirls%2Fwhite%2Cgirls%2Fyoung&responsive=0&hideButton=1&hideTitle=1&gridColumns=4&gridRows=2&backgroundColor=0b0b0f";

/**
 * “Live cams” band — one partner iframe with an internal 4×2 grid; height capped from our
 * layout so the block doesn’t dominate the page (thumbs may crop slightly inside).
 */
export function CategoriesLiveCamsWidgetTrio() {
  return (
    <section
      className="mt-6 space-y-4"
      aria-labelledby="categories-live-cams-widgets-heading"
    >
      <CategoriesRailHeading
        as="h2"
        size="compact"
        id="categories-live-cams-widgets-heading"
      >
        Live cams
      </CategoriesRailHeading>
      <div className="h-[360px] w-full overflow-hidden rounded-xl border border-white/10 bg-black/40 md:h-[420px]">
        <StripchatWidget
          src={LIVE_CAMS_GRID_WIDGET_SRC}
          squareCorners
          grid4x2
          iframeTitle="Live cams"
        />
      </div>
    </section>
  );
}
