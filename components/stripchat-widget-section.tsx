import StripchatWidget from "@/components/stripchat-widget";

export default function StripchatWidgetSection() {
  return (
    <section className="mt-12 mb-12">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white">🔥 Live Now</h2>
        <p className="text-sm text-white/60">
          See who&apos;s streaming right now
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-sm">
        <StripchatWidget />
      </div>
    </section>
  );
}
