"use client";

import Image from "next/image";
import { useState } from "react";

// Products capability tabs (Figma node 270:5624). The Workforce tab matches the
// design exactly; the other tabs reuse the same layout with their own content.
type Item = { title: string; desc?: string };
type Tab = { key: string; num: string; subtitle: string; img: string; items: Item[] };

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
  const [tab, setTab] = useState(0);
  const [item, setItem] = useState(0);
  const active = TABS[tab];

  function selectTab(i: number) {
    setTab(i);
    setItem(0);
  }

  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 lg:px-[60px]">
      {/* faint abstract grid behind the panel */}
      <div
        className="pointer-events-none absolute left-1/2 top-[154px] z-0 hidden h-[519px] w-[705px] -translate-x-1/2 opacity-60 lg:block"
        style={{ backgroundImage: "url(/products/abstract-grid.svg)", backgroundSize: "contain", backgroundRepeat: "no-repeat" }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1410px] flex-col gap-10">
        {/* Tab bar */}
        <div className="mx-auto flex h-14 w-full max-w-[1158px] items-center gap-2.5 overflow-x-auto rounded-full border-[1.25px] border-white/80 bg-[linear-gradient(180deg,rgba(233,238,255,0.6),rgba(193,236,255,0.6))] p-1.5 shadow-[6px_10px_23px_rgba(217,226,255,0.85),0_13px_100px_rgba(199,199,199,0.25)]">
          {TABS.map((t, i) => (
            <button
              key={t.key}
              type="button"
              onClick={() => selectTab(i)}
              className={`flex h-full flex-1 items-center justify-center whitespace-nowrap rounded-full px-4 text-[20px] transition-colors ${
                i === tab
                  ? "border border-white bg-[linear-gradient(180deg,#21B1F1,#9CDCFF)] font-medium text-white shadow-[inset_0_-2px_27px_#7ecffa]"
                  : "font-medium text-[#202020] hover:text-[#0A4B6E]"
              }`}
            >
              {t.key}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="flex flex-col items-stretch gap-[30px] lg:flex-row lg:items-stretch">
          {/* Left: illustration */}
          <div className="relative min-h-[300px] overflow-hidden rounded-[32px] border border-white p-[15px] shadow-[0_0_26px_2px_rgba(92,183,232,0.16),0_0_14px_rgba(79,194,255,0.1)] lg:h-[474px] lg:w-[614px] lg:shrink-0">
            <div className="relative h-full w-full overflow-hidden rounded-[24px]">
              <Image src={active.img} alt={`${active.key} illustration`} fill className="object-cover" sizes="585px" />
            </div>
            {/* white edge fades */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[53px] bg-gradient-to-b from-white to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[48px] bg-gradient-to-t from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-[50px] bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-[50px] bg-gradient-to-l from-white to-transparent" />
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
                    onClick={() => setItem(i)}
                    className="flex w-full flex-col gap-2.5 text-left"
                  >
                    <p
                      className={`text-[20px] font-bold ${
                        isOpen ? "text-[#5CB7E8]" : "text-[#0A4B6E]"
                      }`}
                    >
                      {it.title}
                    </p>
                    {isOpen && it.desc && (
                      <p className="text-[18px] font-normal leading-[26px] text-[#5CB7E8]">{it.desc}</p>
                    )}
                    {/* divider / progress track */}
                    <span
                      className={`h-1.5 w-full rounded-full ${
                        isOpen
                          ? "bg-[linear-gradient(90deg,#4AC8FF,#7ECFFA)]"
                          : "bg-[#EAF3FB] shadow-[0_-2px_4px_rgba(156,220,255,0.10)]"
                      }`}
                    />
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
