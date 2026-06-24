"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  type Variants,
} from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE, delay: 0.2 },
  },
};

const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE, delay: 0.3 },
  },
};

// "Our system integrator network"
// Left: a 5-step list + a vertical "section pointer" that tracks the active step.
// Right: detail panel (fades to transparent at the bottom) — copy left, tall image right.

type Step = {
  num: string;
  label: string;
  /** White-filled icon shown in the step badge when the step is active. */
  icon: string;
  title: string;
  body: string[];
  /** Optional "you can instantly see" checklist shown beneath the body. */
  bulletsTitle?: string;
  bullets?: string[];
  /** Optional role → responsibilities mapping (role, arrow, items). */
  roles?: { role: string; items: string }[];
  caption: string;
};

const STEPS: Step[] = [
  {
    num: "01",
    label: "Unified operational data",
    icon: "/bi-dashboards/bi-report-icons/unified-operational.svg",
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
    icon: "/bi-dashboards/bi-report-icons/live-operational-icon.svg",
    title: "Know what's happening as it happens",
    body: [
      "Monitor your operations in real time, with live updates across workforce, movement, and workflows.",
    ],
    bulletsTitle: "You can instantly see",
    bullets: [
      "Who is on-site and working",
      "What tasks are in progress",
      "Where vehicles and assets are",
      "Whether operations are running as planned",
    ],
    caption: "No delays. No outdated reports.",
  },
  {
    num: "03",
    label: "Role-based dashboards",
    icon: "/bi-dashboards/bi-report-icons/role-based-icon.svg",
    title: "The right information for the right people",
    body: [
      "Different roles require different insights.",
      "V-Watch Ai allows you to configure dashboards based on operational responsibilities:",
    ],
    roles: [
      { role: "Management", items: "Performance, Trends, Reporting" },
      { role: "Operations", items: "Tasks, Workflows, Coordination" },
      { role: "Safety teams", items: "Compliance, Alerts, Risk monitoring" },
    ],
    caption: "Everyone sees what matters without noise.",
  },
  {
    num: "04",
    label: "Cross-site performance tracking",
    icon: "/bi-dashboards/bi-report-icons/cross-site-icons.svg",
    title: "Measure performance across sites, teams, and operations",
    body: [
      "Track and compare operational performance across multiple locations and projects.",
    ],
    bulletsTitle: "You can",
    bullets: [
      "Monitor manhours and workforce productivity",
      "Identify delays or inefficiencies",
      "Compare site performance",
      "Ensure consistency across operations",
    ],
    caption: "From single-site visibility to organization-wide control.",
  },
  {
    num: "05",
    label: "Actionable intelligence",
    icon: "/bi-dashboards/bi-report-icons/actionable-intelligence-icon.svg",
    title: "Data that tells you what to fix and where to act",
    body: [
      "V-Watch Ai transforms operational data into insights you can act on immediately.",
    ],
    bullets: [
      "Detect inefficiencies in workflows",
      "Identify underutilized resources",
      "Monitor compliance risks",
      "Highlight operational bottlenecks",
    ],
    caption: "Not just data decisions you can execute",
  },
];

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <circle cx="9" cy="9" r="9" fill="#D6F2E4" />
      <path
        d="M5 9.25L7.6 11.85L13 6.45"
        stroke="#1F9D6B"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Arrow-with-dot mark from /public/ai-platform/bi-dashboards.svg, inlined so it
// matches the other icons and inherits crisp rendering at small sizes.
function ArrowIcon() {
  return (
    <svg
      width="15"
      height="18"
      viewBox="0 0 16 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M4.92384 18.5929C4.99719 18.6385 5.25559 18.7672 5.51499 18.5452L15.8138 9.75204C15.9342 9.64901 16.0032 9.49731 16.0032 9.3356C16.0032 9.1739 15.9342 9.02219 15.8138 8.91917L5.51499 0.126031C5.40296 0.0303407 5.29127 0 5.19458 0C5.06721 0 4.96552 0.0526794 4.92384 0.0783523C4.82434 0.138114 4.74714 0.228808 4.70403 0.336577C4.66092 0.444346 4.65428 0.563265 4.68512 0.675164L6.73061 9.04453C6.77729 9.23491 6.77729 9.43629 6.73061 9.62667L4.68512 17.996C4.65428 18.1079 4.66092 18.2269 4.70403 18.3346C4.74714 18.4424 4.82434 18.5331 4.92384 18.5929Z"
        fill="#0A4B6E"
      />
      <path
        d="M2.00049 11.3369C3.10532 11.3369 4.00097 10.4413 4.00097 9.33642C4.00097 8.23159 3.10532 7.33594 2.00049 7.33594C0.895648 7.33594 0 8.23159 0 9.33642C0 10.4413 0.895648 11.3369 2.00049 11.3369Z"
        fill="#0A4B6E"
      />
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

// Shared chrome for the detail panel — fades to transparent at the bottom.
const PANEL_CLASS =
  "flex flex-1 rounded-[24px] bg-[linear-gradient(180deg,#FFFFFF_0%,#FFFFFF_42%,rgba(255,255,255,0)_100%)] p-6 sm:p-8";

// Detail content (number, title, body copy, operations visual) for the active
// step. Reused by the desktop right column and the inline mobile panel.
function DetailContent({ current }: Readonly<{ current: Step }>) {
  return (
    <div className="flex w-full flex-col gap-6 min-[1300px]:flex-row min-[1300px]:items-stretch min-[1300px]:gap-8">
      {/* Copy */}
      <div className="flex flex-1 flex-col gap-4">
        {/* Below 1300px (incl. tablet): number badge left, heading right on one
            row. From 1300px up: badge stacked above the heading. */}
        <div className="flex flex-row items-center gap-4 min-[1300px]:flex-col min-[1300px]:items-start">
          <span className="flex size-[44px] shrink-0 items-center justify-center rounded-[12px] bg-[linear-gradient(180deg,#21B1F1,#0A8EC8)] text-[16px] font-extrabold text-white">
            {current.num}
          </span>
          <h3 className="text-[20px] font-bold leading-[27px] text-[#0A4B6E]">
            {current.title}
          </h3>
        </div>

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

        {current.bullets && current.bullets.length > 0 && (
          <div className="flex flex-col gap-3">
            {current.bulletsTitle && (
              <p className="text-[13px] font-bold uppercase tracking-[0.06em] text-[#1F9D6B]">
                {current.bulletsTitle}
              </p>
            )}
            <ul className="flex flex-col gap-2.5">
              {current.bullets.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <span className="mt-[3px]">
                    <CheckIcon />
                  </span>
                  <span className="text-[16px] font-normal leading-[22px] text-[#3E4B77]">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {current.roles && current.roles.length > 0 && (
          <ul className="flex flex-col gap-3">
            {current.roles.map((r) => (
              <li
                key={r.role}
                className="grid grid-cols-[auto_auto_1fr] items-start gap-x-3"
              >
                <span className="text-[15px] font-bold leading-[22px] text-[#0A4B6E]">
                  {r.role}
                </span>
                <span className="mt-[3px]">
                  <ArrowIcon />
                </span>
                <span className="text-[15px] font-normal leading-[22px] text-[#3E4B77]">
                  {r.items}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Operations visual — centered below the copy under 1300px; fixed-width
          right column from 1300px up. */}
      <div className="mx-auto w-full max-w-[460px] min-[1300px]:mx-0 min-[1300px]:w-[300px] min-[1300px]:max-w-none min-[1300px]:shrink-0">
        <OpsVisual caption={current.caption} />
      </div>
    </div>
  );
}

export default function IntegratorNetwork() {
  const [active, setActive] = useState(0);
  const current = STEPS[active]!;
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const yToStep = useCallback((clientY: number) => {
    if (!trackRef.current) return;
    const { top, height } = trackRef.current.getBoundingClientRect();
    const rel = Math.max(0, Math.min(1, (clientY - top) / height));
    setActive(Math.min(STEPS.length - 1, Math.floor(rel * STEPS.length)));
  }, []);

  const onThumbPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    isDragging.current = true;
  }, []);

  const onThumbPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging.current) yToStep(e.clientY);
  }, [yToStep]);

  const onThumbPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const onTrackClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    yToStep(e.clientY);
  }, [yToStep]);

  return (
    <MotionConfig reducedMotion="user">
    <section className="relative overflow-hidden px-6 pb-20 pt-16 lg:px-[60px]">
      {/* Soft bottom glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[360px] bg-[radial-gradient(75%_100%_at_56%_120%,rgb(197_124_250/24%)_0%,rgb(253_255_254/5%)_72%)]"
      />

      <motion.div
        className="relative mx-auto w-full max-w-[1410px]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Header */}
        <motion.header variants={fadeUp} className="flex max-w-[760px] flex-col gap-2.5">
          <h2 className="text-[26px] font-semibold text-[#0A4B6E] lg:text-[28px]">
            How V-Watch Ai Turns Operational Data Into Control
          </h2>
        </motion.header>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-12">
          {/* Left: step list + section pointer */}
          <motion.div variants={slideFromLeft} className="lg:w-[400px] lg:shrink-0">
            {/* Wrapper sizes to the step list so the pointer track tracks the
                list height — not the stretched column (which grows to match the
                taller right panel and would otherwise inflate the thumb). */}
            <div className="relative">
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
                        {isActive ? (
                          <Image
                            src={step.icon}
                            alt=""
                            width={24}
                            height={24}
                            className="size-6 object-contain"
                          />
                        ) : (
                          step.num
                        )}
                      </span>
                      <span
                        className={`text-[17px] font-bold ${isActive ? "text-[#0A8EC8]" : "text-[#556394]"
                          }`}
                      >
                        {step.label}
                      </span>
                    </button>

                    {/* Mobile: detail panel renders inline directly beneath the
                        selected step. Hidden on desktop in favor of the right
                        column. */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="overflow-hidden lg:hidden"
                        >
                          <div className={`${PANEL_CLASS} mt-2`}>
                            <DetailContent current={current} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>

            {/* Vertical divider with draggable section pointer (desktop) */}
            <div
              ref={trackRef}
              aria-hidden
              onClick={onTrackClick}
              className="absolute -right-6 top-3 bottom-3 hidden w-6 cursor-pointer lg:block"
            >
              <div className="absolute inset-y-0 left-1/2 w-[6px] -translate-x-1/2 rounded-full bg-white" />
              <div
                onPointerDown={onThumbPointerDown}
                onPointerMove={onThumbPointerMove}
                onPointerUp={onThumbPointerUp}
                onPointerCancel={onThumbPointerUp}
                className="absolute left-1/2 w-2 -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#21B1F1,#0A8EC8)] shadow-[0_0_10px_rgba(33,177,241,0.65)] cursor-grab active:cursor-grabbing select-none transition-[top,height] duration-300"
                style={{ top: `calc(${active * 20}% + 10px)`, height: "calc(20% - 20px)" }}
              />
            </div>
            </div>
          </motion.div>

          {/* Right: detail panel — desktop only; on mobile it renders inline
              beneath the selected step (see the list above). */}
          <motion.div
            variants={slideFromRight}
            className={`${PANEL_CLASS} hidden lg:flex`}
          >
            <DetailContent current={current} />
          </motion.div>
        </div>
      </motion.div>
    </section>
    </MotionConfig>
  );
}
