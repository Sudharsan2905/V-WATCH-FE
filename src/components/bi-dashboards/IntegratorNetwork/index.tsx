"use client";

import { useState } from "react";
import Image from "next/image";

// "Our system integrator network"
// Left: a 5-step list + a vertical "section pointer" that tracks the active step.
// Right: detail panel (fades to transparent at the bottom) — copy left, tall image right.

type Step = {
  num: string;
  label: string;
  title: string;
  body: string[];
  caption: string;
};

const STEPS: Step[] = [
  {
    num: "01",
    label: "Unified operational data",
    title: "Everything happening across your operations captured in one system",
    body: [
      "V-Watch Ai collects real-time data from across your entire operational environment including workforce activity, access events, tasks, vehicle movement, asset usage, and safety systems.",
      "Instead of scattered data across multiple tools, everything is structured and connected within one platform.",
    ],
    caption: "No gaps. No silos. No manual consolidation.",
  },
  {
    num: "02",
    label: "Live operational visibility",
    title: "See what's happening the moment it happens",
    body: [
      "Live streams from access points, cameras, sensors, and field activity flow continuously into a single operational view.",
      "Teams act on what's happening now rather than reacting to yesterday's reports.",
    ],
    caption: "Always live. Always current.",
  },
  {
    num: "03",
    label: "Role-based dashboards",
    title: "The right view for every role",
    body: [
      "Executives, site managers, and operators each get dashboards tuned to the decisions they own.",
      "Permissions and layouts adapt automatically, so everyone sees what matters without the noise.",
    ],
    caption: "Relevant to everyone. Cluttered for no one.",
  },
  {
    num: "04",
    label: "Cross-site performance tracking",
    title: "Compare performance across every location",
    body: [
      "Standardized metrics let you benchmark sites, regions, and teams against one consistent scorecard.",
      "Spot underperformance and replicate what's working across the whole network.",
    ],
    caption: "One standard. Every site.",
  },
  {
    num: "05",
    label: "Actionable intelligence",
    title: "From insight to action, instantly",
    body: [
      "Power BI surfaces trends, anomalies, and risks, then routes them to the people who can act.",
      "Decisions are grounded in complete, accurate, real-time operational data.",
    ],
    caption: "Less guessing. More doing.",
  },
];

function SparkIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.7 18.1428C9.04833 18.6012 9.25 19.1696 9.25 19.7931C9.25 21.315 8.02167 22.5435 6.5 22.5435C4.97833 22.5435 3.75 21.315 3.75 19.7931C3.75 18.2711 4.97833 17.0426 6.5 17.0426C6.90333 17.0426 7.27917 17.1251 7.6275 17.281L8.92 15.6582C8.07667 14.7138 7.7375 13.467 7.92083 12.2751L6.06 11.6516C5.565 12.4126 4.72167 12.9169 3.75 12.9169C2.22833 12.9169 1 11.6883 1 10.1664C1 8.64446 2.22833 7.41591 3.75 7.41591C5.27167 7.41591 6.5 8.64446 6.5 10.1664C6.5 10.2306 6.5 10.2947 6.49083 10.3589L8.35167 10.9824C8.93833 9.87301 10.02 9.0662 11.3033 8.85533V6.87499C10.13 6.56326 9.25 5.49058 9.25 4.20702C9.25 2.68509 10.4783 1.45654 12 1.45654C13.5217 1.45654 14.75 2.68509 14.75 4.20702C14.75 5.49058 13.87 6.56326 12.6875 6.87499V8.85533C13.9708 9.0662 15.0525 9.87301 15.6392 10.9824L17.5 10.3589V10.1664C17.5 8.64446 18.7283 7.41591 20.25 7.41591C21.7717 7.41591 23 8.64446 23 10.1664C23 11.6883 21.7717 12.9169 20.25 12.9169C19.2783 12.9169 18.435 12.4126 17.94 11.6608L16.0792 12.2843C16.2625 13.467 15.9325 14.7138 15.08 15.6673L16.3725 17.2901C16.7208 17.1251 17.0967 17.0426 17.5 17.0426C19.0217 17.0426 20.25 18.2711 20.25 19.7931C20.25 21.315 19.0217 22.5435 17.5 22.5435C15.9783 22.5435 14.75 21.315 14.75 19.7931C14.75 19.1696 14.9517 18.6012 15.3 18.1428L14.0075 16.52C12.77 17.2076 11.2483 17.2168 10.0017 16.52L8.7 18.1428Z" fill="white" />
    </svg>
  );
}

function OpsVisual({ caption }: Readonly<{ caption: string }>) {
  return (
    <div className="relative h-full min-h-[320px] w-full">
      {/* clipped operations image */}
      <div className="absolute inset-0 overflow-hidden rounded-[22px] shadow-[0_20px_50px_-20px_rgba(10,75,110,0.6)]">
        <Image
          src="/bi-dashboards/integrator-network.png"
          alt="Unified operations captured in one connected control view"
          fill
          sizes="(max-width: 1024px) 100vw, 320px"
          className="object-cover object-center"
        />
      </div>

      {/* glass caption card — overflows the image bottom */}
      <div className="absolute w-full bottom-0 rounded-[16px] border border-white/25 bg-[rgba(249,251,255,0.11)] px-4 py-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),0_20px_44px_-16px_rgba(0,0,0,0.7)] backdrop-blur-md">
        <p className="text-[15px] font-bold leading-[20px] text-white">{caption}</p>
      </div>
    </div>
  );
}

export default function IntegratorNetwork() {
  const [active, setActive] = useState(0);
  const current = STEPS[active]!;

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-16 lg:px-[60px]">
      {/* Soft bottom glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[360px] bg-[radial-gradient(75%_100%_at_56%_120%,rgb(197_124_250/24%)_0%,rgb(68_199_169/5%)_72%)]"
      />

      <div className="relative mx-auto w-full max-w-[1410px]">
        {/* Header */}
        <header className="flex max-w-[760px] flex-col gap-2.5">
          <h2 className="text-[26px] font-black text-[#0A4B6E] lg:text-[28px]">
            Our system integrator network
          </h2>
          <p className="text-[18px] font-normal leading-[26px] text-[#0A4B6E] lg:text-[20px]">
            Transform real-time operational data into visibility, intelligence,
            and action.
          </p>
        </header>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-12">
          {/* Left: step list + section pointer */}
          <div className="relative lg:w-[400px] lg:shrink-0">
            <ul className="flex flex-col gap-1.5 rounded-[20px] border border-[#E1EFF9] bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(244,250,255,0.7))] p-3">
              {STEPS.map((step, i) => {
                const isActive = i === active;
                return (
                  <li key={step.num}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex w-full items-center gap-4 rounded-[14px] border-[1.11px] px-4 py-3 text-left backdrop-blur-[18px] transition-all duration-200 ${isActive
                          ? "border-[#FFFFFFB2] shadow-[0px_20px_50px_15px_#0A8EC81A,-6px_-10px_8px_0px_#FFFFFFB2_inset]"
                          : "border-[#FFFFFF1A] shadow-[0px_1px_2px_0px_#B8E6FF0A,-6px_-10px_8px_0px_#FFFFFF66_inset] hover:bg-white/40"
                        }`}
                    >
                      <span
                        className={`flex size-[40px] shrink-0 items-center justify-center rounded-[12px] text-[15px] font-extrabold transition-colors ${isActive
                            ? "bg-[linear-gradient(180deg,#21B1F1,#0A8EC8)] text-white shadow-[0_8px_18px_-8px_rgba(33,177,241,0.8)]"
                            : "bg-[#EEF6FC] text-[#9DB6CC]"
                          }`}
                      >
                        {isActive ? <SparkIcon /> : step.num}
                      </span>
                      <span
                        className={`text-[17px] font-bold ${isActive ? "text-[#0A8EC8]" : "text-[#556394]"
                          }`}
                      >
                        {step.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Vertical divider with active "section pointer" (desktop) */}
            <div aria-hidden className="absolute -right-6 top-3 bottom-3 hidden lg:block">
              <div className="absolute inset-y-0 left-1/2 w-[6px] -translate-x-1/2 bg-white" />
              <div
                className="absolute left-1/2 w-[5px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#21B1F1,#0A8EC8)] shadow-[0_0_10px_rgba(33,177,241,0.65)] transition-all duration-300"
                style={{ top: `calc(${active * 20}% + 10px)`, height: "calc(20% - 20px)" }}
              />
            </div>
          </div>

          {/* Right: detail panel — fades to transparent at the bottom */}
          <div className="flex flex-1 rounded-[24px] bg-[linear-gradient(180deg,#FFFFFF_0%,#FFFFFF_42%,rgba(255,255,255,0)_100%)] p-6 sm:p-8">
            <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8">
              {/* Copy */}
              <div className="flex flex-1 flex-col gap-4">
                  <span className="flex size-[44px] shrink-0 items-center justify-center rounded-[12px] bg-[linear-gradient(180deg,#21B1F1,#0A8EC8)] text-[16px] font-extrabold text-white">
                    {current.num}
                  </span>
                  <h3 className="text-[20px] font-bold leading-[27px] text-[#0A4B6E]">
                    {current.title}
                  </h3>

                <div className="flex flex-col gap-3">
                  {current.body.map((para) => (
                    <p
                      key={para}
                      className="text-[16px] font-normal leading-[24px] text-[#3E4B77]"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Operations visual */}
              <div className="w-full lg:w-[300px] lg:shrink-0">
                <OpsVisual caption={current.caption} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
