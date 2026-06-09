import Image from "next/image";

// "What if everything worked as one system?" — a two-column section: a numbered
// benefits list on the left and a circuit visual on the right. (Figma node 215:8079)
type Benefit = { n: number; text: string; active?: boolean };

const BENEFITS: Benefit[] = [
  { n: 1, text: "One source of truth", active: true },
  { n: 2, text: "One operational view" },
  { n: 3, text: "One platform to control everything" },
];

function NumberBadge({ n, active }: Readonly<{ n: number; active?: boolean }>) {
  return (
    <span className="flex size-11 shrink-0 items-center justify-center rounded-[11px] border-[1.63px] border-white bg-[rgba(244,251,255,0.40)] shadow-[7.3px_5.7px_48.9px_rgba(255,255,255,0.4),4.9px_8.1px_18.7px_rgba(217,226,255,0.85),0_10.6px_81.5px_rgba(199,199,199,0.25)]">
      <span
        className={`text-[27px] font-black leading-none tracking-[-0.054px] ${
          active ? "text-[#3890c0]" : "text-[rgba(15,23,42,0.6)]"
        }`}
      >
        {n}
      </span>
    </span>
  );
}

export default function UnifiedSystem() {
  return (
    <section className="relative z-20 -mt-10 overflow-hidden rounded-t-[40px] bg-[#EDF1F8] px-6 pb-20 pt-[100px] lg:px-[60px]">
      {/* ── Layered organic background — soft translucent flowing curves ──── */}
      {/* light blue-gray base, fading to white at the bottom so it blends into
          the white section below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#E7EDF7_0%,#EDF2FA_30%,#F6F9FD_62%,#FFFFFF_92%)]"
      />
      {/* oversized top-right curve — slightly darker blue-gray, sweeping toward
          the centre and fading out */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[12%] -top-[36%] h-[840px] w-[1100px] -rotate-12 rounded-[50%] opacity-80 bg-[radial-gradient(ellipse_at_center,#C9D5EB_0%,rgba(201,213,235,0)_62%)]"
      />
      {/* oversized bottom-left curve — overlaps the top-right shape, lower opacity */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[34%] -left-[18%] h-[780px] w-[1020px] rotate-[8deg] rounded-[50%] opacity-70 bg-[radial-gradient(ellipse_at_center,#D5DFF1_0%,rgba(213,223,241,0)_62%)]"
      />
      {/* mid-layer curve for added depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[4%] top-[26%] h-[580px] w-[800px] rotate-[6deg] rounded-[55%] opacity-60 bg-[radial-gradient(ellipse_at_center,#DEE7F4_0%,rgba(222,231,244,0)_60%)]"
      />
      {/* extremely soft centre glow to lift the content off the background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_42%_at_50%_46%,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_72%)]"
      />

      <div className="relative mx-auto flex w-full max-w-[1410px] flex-col gap-[30px]">
        <header className="flex max-w-[807px] flex-col gap-2.5 text-[#0A4B6E]">
          <h2 className="max-w-[642px] text-[26px] font-bold">What if everything worked as one system?</h2>
          <p className="text-[20px] font-normal leading-[26px]">
            V-Watch Ai brings your entire operation into a single, connected platform where
            everything is tracked, managed, and automated in real time.
          </p>
        </header>

        <div className="flex flex-col items-stretch gap-[30px] lg:flex-row lg:items-center">
          {/* Left: benefits list */}
          <div className="flex flex-1 flex-col gap-3.5 p-3.5">
            <p className="max-w-[415px] text-[20px] font-bold text-[#0A4B6E]">
              Instead of switching between systems, you get
            </p>

            {/* Stacked cards fanning forward: each lower card overlaps on top of
                the one above it (card 3 frontmost), each with a light white liner */}
            <div className="flex flex-col">
              {BENEFITS.map((b, i) => (
                <div
                  key={b.n}
                  style={{ zIndex: i + 1 }}
                  className={`relative flex h-[90px] items-center rounded-[14px] px-5 ${
                    i === 0 ? "py-5" : "-mt-[11px] pb-5 pt-[31px]"
                  } ${
                    b.active
                      ? "border border-white/80 bg-[rgba(244,251,255,0.65)] shadow-[0_10px_40px_rgba(219,228,255,0.55),0_2px_10px_rgba(255,255,255,0.30)] backdrop-blur-sm"
                      : "border border-white/50 bg-white/25 shadow-[0_10px_24px_rgba(120,140,170,0.06),0_-6px_8px_rgba(156,220,255,0.08)] backdrop-blur-sm"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <NumberBadge n={b.n} active={b.active} />
                    <p className={`text-[18px] font-bold ${b.active ? "text-[#0A8EC8]" : "text-[rgba(15,23,42,0.6)]"}`}>
                      {b.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: circuit visual (rendered from Figma — caption baked in) */}
          <div className="relative h-[302px] w-full overflow-hidden rounded-[16px] lg:w-[590px] lg:shrink-0">
            <Image
              src="/home/unified-visual.png"
              alt="From security to execution, everything is connected, automated, and measurable"
              fill
              className="object-cover"
              sizes="590px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
