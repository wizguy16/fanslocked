type Props = {
  items: readonly [string, string, string];
};

/** Lane value props — rounded pills, no bullets or emoji. */
export function HomeLaneValueStrip({ items }: Props) {
  return (
    <div
      className="mb-10 flex flex-wrap justify-center gap-3"
      aria-label="Why this lane"
    >
      {items.map((t) => (
        <span
          key={t}
          className="rounded-full border border-white/10 px-4 py-2 text-sm text-neutral-300"
        >
          {t}
        </span>
      ))}
    </div>
  );
}
