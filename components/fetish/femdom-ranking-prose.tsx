type ProseSectionProps = {
  id?: string;
  title: string;
  body: string;
};

export function FemdomRankingProseSection({ id, title, body }: ProseSectionProps) {
  const paras = body.split("\n\n").filter(Boolean);

  return (
    <section
      id={id}
      className="border-b border-white/[0.06] bg-[#0a0a0a] px-4 py-12 md:px-8 md:py-14"
    >
      <div className="mx-auto max-w-[1280px]">
        <h2 className="mb-5 text-xl font-bold tracking-[-0.02em] text-white md:text-2xl">
          {title}
        </h2>
        <div className="max-w-3xl space-y-4 text-[15px] leading-relaxed text-[#a3a3a3] md:text-base">
          {paras.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
