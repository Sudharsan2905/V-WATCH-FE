"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// How long each accordion item stays active (and its progress bar takes to
// fill). Must match the progressGrow animation duration applied to the bar.
const ITEM_DURATION = 5000;

// Products capability tabs (Figma node 270:5624). The Workforce tab matches the
// design exactly; the other tabs reuse the same layout with their own content.
type Item = { title: string; desc?: string };
type Tab = { key: string; num: string; subtitle: string; img: string; items: Item[] };
type Selection = { tab: number; item: number; cycle: number };

const TABS: Tab[] = [
  {
    key: "Workforce",
    num: "01",
    subtitle: "Managing people, identity, access, and activity",
    img: "/products/workforce.png",
    items: [
      {
        title: "Person Management",
        desc: "Centralise and manage all workforce profiles with real-time identification, tracking, and activity visibility across your operations.",
      },
      { title: "Access Management" },
      { title: "Profile & Pass Management" },
      { title: "Fatigue / Vital Monitoring" },
    ],
  },
  {
    key: "Operations",
    num: "02",
    subtitle: "Coordinating workflows, tasks, and execution",
    img: "/products/workforce.png",
    items: [
      {
        title: "Task Management",
        desc: "Plan, assign, and track tasks from start to finish with full accountability across teams and sites.",
      },
      { title: "Workflow Automation" },
      { title: "SOP Compliance" },
      { title: "Incident Management" },
    ],
  },
  {
    key: "Logistics",
    num: "03",
    subtitle: "Tracking movement across your supply chain",
    img: "/products/workforce.png",
    items: [
      {
        title: "Fleet Tracking",
        desc: "Monitor vehicles and goods in real time, from on-site movement to cross-border logistics.",
      },
      { title: "Route Optimisation" },
      { title: "Goods Movement" },
      { title: "Cross-border Visibility" },
    ],
  },
  {
    key: "Assets",
    num: "04",
    subtitle: "Monitoring equipment, usage, and maintenance",
    img: "/products/workforce.png",
    items: [
      {
        title: "Asset Tracking",
        desc: "Track equipment location, usage, and condition with full visibility across every location.",
      },
      { title: "Usage Analytics" },
      { title: "Maintenance Scheduling" },
      { title: "Lifecycle Management" },
    ],
  },
  {
    key: "Safety",
    num: "05",
    subtitle: "Protecting people, sites, and compliance",
    img: "/products/workforce.png",
    items: [
      {
        title: "Access Control",
        desc: "Control site access, monitor risks, and ensure safety standards are always met.",
      },
      { title: "Risk Monitoring" },
      { title: "Permit Management" },
      { title: "Standards Compliance" },
    ],
  },
  {
    key: "AI Intelligence",
    num: "06",
    subtitle: "Turning operational data into decisions",
    img: "/products/workforce.png",
    items: [
      {
        title: "Predictive Insights",
        desc: "Surface trends and anomalies automatically so you can act before issues escalate.",
      },
      { title: "Anomaly Detection" },
      { title: "Smart Alerts" },
      { title: "Reporting & BI" },
    ],
  },
  {
    key: "Integrations",
    num: "07",
    subtitle: "Connecting your existing systems",
    img: "/products/workforce.png",
    items: [
      {
        title: "API Access",
        desc: "Integrate with your existing infrastructure through open APIs and trusted system integrators.",
      },
      { title: "System Integrators" },
      { title: "Hardware Support" },
      { title: "Data Sync" },
    ],
  },
];

export default function CapabilityTabs() {
  const [{ tab, item, cycle }, setSelection] = useState<Selection>({
    tab: 0,
    item: 0,
    cycle: 0,
  });
  const [isLoopReady, setIsLoopReady] = useState(false);
  const active = TABS[tab];

  function selectTab(i: number) {
    setSelection((current) => ({
      tab: i,
      item: 0,
      cycle: current.cycle + 1,
    }));
  }

  function selectItem(i: number) {
    setSelection((current) => ({
      ...current,
      item: i,
      cycle: current.cycle + 1,
    }));
  }

  // Start the timer and progress bar together after the initial browser paint.
  useEffect(() => {
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => setIsLoopReady(true));
    });

    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, []);

  useEffect(() => {
    if (!isLoopReady) return;

    const id = setTimeout(() => {
      setSelection((current) => {
        const nextItem = current.item + 1;

        if (nextItem < TABS[current.tab].items.length) {
          return { ...current, item: nextItem, cycle: current.cycle + 1 };
        }

        return {
          ...current,
          item: 0,
          cycle: current.cycle + 1,
        };
      });
    }, ITEM_DURATION);

    return () => clearTimeout(id);
  }, [cycle, isLoopReady]);

  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 lg:px-[60px]">
      <div className="relative z-10 mx-auto flex w-full max-w-[1410px] flex-col gap-10">
        {/* Tab bar */}
        <div className="flex h-14 w-full items-center gap-2.5 overflow-x-auto rounded-full border-[1.25px] border-white/80 bg-[linear-gradient(180deg,rgba(233,238,255,0.6),rgba(193,236,255,0.6))] p-1.5 shadow-[6px_10px_23px_rgba(217,226,255,0.85),0_13px_100px_rgba(199,199,199,0.25)]">
          {TABS.map((t, i) => (
            <button
              key={t.key}
              type="button"
              onClick={() => selectTab(i)}
              className={`relative flex h-full flex-1 items-center justify-center whitespace-nowrap rounded-full px-4 text-[20px] font-medium transition-colors duration-300 ${
                i === tab ? "text-white" : "text-[#202020] hover:text-[#0A4B6E]"
              }`}
            >
              {/* active gradient + glow as an overlay so it can crossfade —
                  gradients/shadows can't be tweened by transition-colors */}
              <span
                aria-hidden
                className={`pointer-events-none absolute inset-0 rounded-full border border-transparent [background:linear-gradient(180deg,#21B1F1,#9CDCFF)_padding-box,linear-gradient(180deg,rgba(255,255,255,0.83),rgba(255,255,255,0.2))_border-box] shadow-[0_6px_42px_0_rgba(212,240,255,0.4),2px_5px_14px_0_rgba(255,255,255,0.6),inset_0_-2px_27px_rgba(126,207,250,0.6)] transition-opacity duration-300 ${
                  i === tab ? "opacity-100" : "opacity-0"
                }`}
              />
              <span className="relative z-10">{t.key}</span>
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="flex flex-col items-stretch gap-[30px] lg:flex-row lg:items-stretch">
          {/* Left: illustration */}
          <div className="relative min-h-[300px] overflow-hidden rounded-[32px] border border-white p-[15px] [background:linear-gradient(180deg,rgba(43,127,255,0.05),rgba(97,95,255,0.05))] shadow-[0_0_14px_0_rgba(79,194,255,0.1),0_0_26px_2px_rgba(92,183,232,0.16),inset_0_0_18px_6px_rgba(255,255,255,0.9)] lg:h-[474px] lg:w-[614px] lg:shrink-0">
            {/* All four edges are masked to transparent so the illustration
                dissolves into the card's gradient background instead of ending
                on a hard rectangle. Two gradients intersected fade the corners. */}
            <div
              className="relative h-full w-full overflow-hidden rounded-[24px]"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, #000 15%, #000 85%, transparent), linear-gradient(to bottom, transparent, #000 15%, #000 85%, transparent)",
                WebkitMaskComposite: "source-in",
                maskImage:
                  "linear-gradient(to right, transparent, #000 15%, #000 85%, transparent), linear-gradient(to bottom, transparent, #000 15%, #000 85%, transparent)",
                maskComposite: "intersect",
              }}
            >
              <Image src={active.img} alt={`${active.key} illustration`} fill className="object-cover" sizes="585px" />
            </div>
          </div>

          {/* Right: heading + accordion */}
          <div className="flex flex-1 flex-col gap-5 lg:w-[508px]">
            <div className="flex items-start gap-4">
              <div className="flex flex-1 flex-col gap-1.5 text-[#0A4B6E]">
                <p className="text-[26px] font-bold">{active.key}</p>
                <p className="text-[20px] font-normal">{active.subtitle}</p>
              </div>
              <span className="flex size-[54px] shrink-0 items-center justify-center rounded-full border-2 border-white bg-[rgba(244,251,255,0.2)] text-[24px] font-extrabold text-[#3890c0] shadow-[9px_7px_60px_rgba(255,255,255,0.4),6px_10px_23px_rgba(217,226,255,0.85),0_13px_100px_rgba(199,199,199,0.25)]">
                {active.num}
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-between gap-5 pt-2.5">
              {active.items.map((it, i) => {
                const isOpen = i === item;
                return (
                  <button
                    key={it.title}
                    type="button"
                    onClick={() => selectItem(i)}
                    className="flex w-full flex-col gap-2.5 text-left"
                  >
                    <p
                      className={`text-[20px] font-bold transition-colors duration-500 ease-out ${
                        isOpen ? "text-[#5CB7E8]" : "text-[#0A4B6E]"
                      }`}
                    >
                      {it.title}
                    </p>
                    {it.desc && (
                      <span
                        aria-hidden={!isOpen}
                        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <span className="overflow-hidden">
                          <span className="block text-[18px] font-normal leading-[26px] text-[#5CB7E8]">
                            {it.desc}
                          </span>
                        </span>
                      </span>
                    )}
                    {/* divider / progress track — the active item's bar fills
                        0→100% over ITEM_DURATION, then the loop advances */}
                    <span className="relative h-1.5 w-full overflow-hidden rounded-full bg-[#EAF3FB] shadow-[0_-2px_4px_rgba(156,220,255,0.10)]">
                      {isOpen && (
                        <span
                          key={`${tab}-${item}-${cycle}`}
                          className="absolute inset-0 w-full rounded-full bg-[linear-gradient(90deg,#4AC8FF,#7ECFFA)] [will-change:transform]"
                          style={{
                            animation: isLoopReady
                              ? `progressGrow ${ITEM_DURATION}ms linear forwards`
                              : "none",
                            transform: isLoopReady ? undefined : "translateX(-100%)",
                          }}
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
