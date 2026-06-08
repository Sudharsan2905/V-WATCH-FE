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
    <section className="relative overflow-hidden bg-white px-6 py-20 lg:px-[60px]">
      {/* faint concentric rings, centered and bleeding downward */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2" aria-hidden>
        <div className="absolute left-1/2 top-0 size-[1280px] -translate-x-1/2 rounded-full border-[71px] border-white/[0.02] shadow-[0_0_74px_rgba(92,183,232,0.08)]" />
        <div className="absolute left-1/2 top-[213px] size-[853px] -translate-x-1/2 rounded-full border-[35px] border-white/[0.02] shadow-[0_0_74px_rgba(92,183,232,0.08)]" />
        <div className="absolute left-1/2 top-[560px] size-[533px] -translate-x-1/2 rounded-full border-[17px] border-[#9CDCFF]/10 shadow-[0_0_74px_rgba(92,183,232,0.08)]" />
      </div>
      {/* gradient fades to hide ring shadow clipping at section edges */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent" aria-hidden />

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

            <div className="flex flex-col">
              {/* Active card */}
              <div className="z-10 flex h-[80px] items-center rounded-[14px] bg-[#F4FBFF] p-5 shadow-[9px_7px_60px_rgba(255,255,255,0.4),6px_10px_23px_rgba(219,228,255,0.85),0_13px_100px_rgba(219,219,219,0.25)]">
                <div className="flex items-center gap-3.5">
                  <NumberBadge n={BENEFITS[0].n} active />
                  <p className="text-[18px] font-bold text-[#0A8EC8]">{BENEFITS[0].text}</p>
                </div>
              </div>
              {/* Faded items */}
              {BENEFITS.slice(1).map((b) => (
                <div
                  key={b.n}
                  className="-mt-[1px] flex h-[80px] items-center rounded-[14px] bg-[rgba(244,251,255,0.04)] p-5 shadow-[0_-6px_4px_rgba(156,220,255,0.10)]"
                >
                  <div className="flex items-center gap-3.5">
                    <NumberBadge n={b.n} />
                    <p className="text-[18px] font-bold text-[rgba(15,23,42,0.6)]">{b.text}</p>
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
