// "One Platform. Complete Operational Visibility"
// Left: numbered operational steps. Right: funnel flow diagram → unified platform card.

import Image from "next/image";

type Step = { num: string; label: string };

const STEPS: Step[] = [
  { num: "01", label: "Connects all your systems" },
  { num: "02", label: "Captures real-time data" },
  { num: "03", label: "Automates workflows" },
  { num: "04", label: "Provides full visibility across operations" },
];

export default function PlatformVisibility() {
  return (
    <section className="relative z-10 px-6 pb-20 pt-16 lg:px-[60px]">
      {/* Curved top — carves the dark hero into a downward dip above this section.
          Anchored to the section's top edge (bottom-full) so the curve position is
          independent of section height — otherwise tall mobile layouts push the dip
          down onto the heading. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute bottom-full left-0 h-12 w-full text-[#F2F8FE] lg:h-[90px]"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d="M0 0 Q720 100 1440 0 L1440 100 L0 100 Z" fill="currentColor" />
      </svg>
      <div className="mx-auto w-full max-w-[1410px]">
        {/* Header */}
        <header className="flex max-w-[807px] flex-col gap-2.5">
          <h2 className="text-[26px] font-bold text-[#0A4B6E]">
            One Platform. Complete Operational Visibility
          </h2>
          <p className="text-[18px] font-normal leading-[26px] text-[#0A4B6E] lg:text-[20px]">
            Most organizations rely on multiple systems to manage different parts of their
            operations – access control, workforce, tracking, safety, maintenance, and reporting.
          </p>
        </header>

        {/* Two-column layout */}
        <div className="mt-5 flex flex-col gap-[60px] lg:flex-row lg:items-center lg:gap-[80px]">
          {/* Left: numbered steps */}
          <div className="flex flex-1 flex-col gap-6 lg:max-w-[520px]">
            <p className="text-[18px] font-bold text-[#006F9F]">
              It acts as a central operational layer
            </p>

            <div className="relative">
              <ul className="relative flex flex-col gap-10 pl-3">
                {STEPS.map((step) => (
                  <li
                    key={step.num}
                    className="relative flex items-center gap-5 rounded-[16px] bg-white py-2 pl-[68px] pr-6 shadow-[0_14px_34px_-12px_rgba(150,190,230,0.55)]"
                  >
                    {/* Number badge — overhangs the card's left edge */}
                    <span className="absolute left-0 top-1/2 flex h-14 w-10 -translate-x-[38%] -translate-y-1/2 items-center justify-center rounded-full border border-white bg-white text-[20px] font-extrabold text-[#0A4B6E] shadow-[0px_1px_2px_0px_#B8E6FF1A,-20px_0px_30px_0px_#FFFFFF33_inset,4px_1px_6px_0px_#21B1F133]">
                      {step.num}
                    </span>
                    {/* Divider between badge and label */}
                    <p className="text-[18px] font-normal leading-[26px] text-[#0A4B6E]">
                      {step.label}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: funnel diagram */}
          <div className="flex w-full items-start justify-center lg:w-[540px] lg:shrink-0">
            <Image
              src="/ai-platform/funnel-diagram.png"
              alt="Funnel of connected systems flowing into the unified V-Watch Ai platform"
              width={593}
              height={453}
              className="h-auto w-full max-w-[540px] object-fill lg:h-[440px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
