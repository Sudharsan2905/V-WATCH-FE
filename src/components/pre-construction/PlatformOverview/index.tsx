"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const CYCLE_MS = 4000; // auto-advance every 4 s
const RESUME_MS = 6000; // resume auto-play 6 s after manual interaction

const wipeDown: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  show: (delay = 0) => ({
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { delay, duration: 0.6, ease: EASE },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};

const CAP_IMAGE =
  "/pre-construction/platform-overview/Rectangle%2034624111.png";

type Capability = {
  number: string;
  title: string;
  points: string[];
  image?: string;
};

const CAPABILITIES: Capability[] = [
  {
    number: "01",
    title: "Workforce & Site Management",
    image:
      "/pre-construction/platform-overview/Workforce_Site_Management_image.svg",
    points: [
      "Person management and profiles",
      "Access and attendance tracking",
      "Contractor and company management",
      "Pass and badge management",
    ],
  },
  {
    number: "02",
    title: "Operations & Workflow Control",
    image:
      "/pre-construction/platform-overview/Operations_Workflow_Control_image.svg",
    points: [
      "Task and project management",
      "Work program tracking",
      "Site coordination and execution",
      "Container and site logistics management",
    ],
  },
  {
    number: "03",
    title: "Vehicle, Fleet & Logistics",
    image:
      "/pre-construction/platform-overview/Vehicle_Fleet_Logistics_image.svg",
    points: [
      "Vehicle tracking and reporting",
      "Delivery and logistics coordination",
      "Inventory and movement tracking",
      "Fleet visibility and control",
    ],
  },
  {
    number: "04",
    title: "Assets & Quality Management",
    image:
      "/pre-construction/platform-overview/Assets_Quality_Management_image.svg",
    points: [
      "Asset tracking and utilisation",
      "Audit and quality assurance",
      "Equipment monitoring",
    ],
  },
  {
    number: "05",
    title: "Safety & Compliance",
    image:
      "/pre-construction/platform-overview/Safety_Compliance_image.svg",
    points: [
      "Permit-to-work (PTW)",
      "LOTO and safety protocols",
      "AI safety monitoring",
      "Emergency monitoring systems",
    ],
  },
  {
    number: "06",
    title: "Productivity & Intelligence",
    image:
      "/pre-construction/platform-overview/Productivity_Intelligence_image.svg",
    points: [
      "Manhour tracking",
      "Time-lapse and progress tracking",
      "BI reporting and insights",
      "Performance visibility",
    ],
  },
];

function ConnectedBanner({
  text = "Every part of your project connected in one system.",
}: Readonly<{ text?: string }>) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="flex w-full min-h-[60px] items-center gap-2 overflow-hidden rounded-[30px] px-4 py-3"
      style={{
        background:
          "linear-gradient(to right, rgb(240, 244, 255) 0%, rgb(245, 250, 255) 100%)",
        borderStyle: "solid",
        borderColor: "transparent",
        borderWidth: "1px 1px 2px 1px",
        boxShadow: "inset 0 -4px 24px 0 #FFFFFF",
      }}
    >
      {/* Left: line → dot */}
      <span className="hidden shrink-0 items-center lg:flex">
        <span
          className="h-0.5 min-w-[24px] max-w-[80px] w-full"
          style={{ background: "linear-gradient(to right, transparent, #006F9F)" }}
        />
        <span className="size-2.5 shrink-0 rounded-full bg-[#006F9F]" />
      </span>

      {/* Text — centered */}
      <span className="min-w-0 flex-1 text-center font-lato text-[13px] font-bold leading-snug tracking-[-0.4px] text-[#006F9F] sm:text-[14px] lg:text-[18px] lg:leading-[26px] lg:tracking-[-0.6px]">
        {text}
      </span>

      {/* Dot → line */}
      <span className="hidden shrink-0 items-center lg:flex">
        <span className="size-2.5 shrink-0 rounded-full bg-[#006F9F]" />
        <span
          className="h-0.5 min-w-[24px] max-w-[80px] w-full"
          style={{ background: "linear-gradient(to left, transparent, #006F9F)" }}
        />
      </span>
    </motion.div>
  );
}

function CheckItem({ children }: Readonly<{ children: string }>) {
  return (
    <li className="flex items-center gap-3">
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#E3F8EC]">
        <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
          <path
            d="M3 7.3 5.6 9.9 11 4.1"
            stroke="#1FA85A"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="font-lato text-[18px] font-normal leading-5 tracking-normal text-[#314158]">
        {children}
      </span>
    </li>
  );
}

type PlatformOverviewContent = {
  heading?: string;
  capabilities?: Capability[];
  bannerText?: string;
};

export default function PlatformOverview({
  content = {},
}: Readonly<{ content?: PlatformOverviewContent }> = {}) {
  const {
    heading = "A single platform to run your entire project",
    capabilities = CAPABILITIES,
    bannerText,
  } = content;

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-advance
  useEffect(() => {
    if (paused || capabilities.length <= 1) return;
    const id = setInterval(
      () => setActiveIndex((i) => (i + 1) % capabilities.length),
      CYCLE_MS,
    );
    return () => clearInterval(id);
  }, [paused, capabilities.length]);

  // Clean up resume timer on unmount
  useEffect(
    () => () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    },
    [],
  );

  const goTo = (i: number) => {
    setActiveIndex(i);
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), RESUME_MS);
  };

  const activeCap = capabilities[activeIndex];

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative z-10 w-full overflow-hidden bg-[#f5fbff] px-6 pb-12 pt-10 lg:px-[60px]">
        {/* Decorative blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-34 top-40 w-[530px] h-[785px] rounded-full bg-[#E9E4FA] opacity-30 blur-[-20px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-28 top-40 w-[447px] h-[785px] rounded-full bg-[#E2ECFB] opacity-30 blur-[-20px]"
        />

        <div className="relative z-10 mx-auto max-w-[1280px]">
          {/* Heading */}
          <motion.h2
            variants={wipeDown}
            custom={0.05}
            initial="hidden"
            animate="show"
            className="font-lato text-[26px] font-bold leading-[100%] tracking-[0] text-[#0A4B6E]"
          >
            {heading}
          </motion.h2>

          {/* Main two-column layout */}
          <div className="mt-10 flex flex-col gap-8 lg:mt-12 lg:flex-row lg:items-stretch lg:gap-12">

            {/* ── LEFT: progress bar + content card + banner ── */}
            <div className="flex flex-col gap-5 lg:w-[45%] lg:flex-none lg:overflow-visible">

            {/* Inner row: progress bar + content card */}
            <div className="order-1 flex flex-1 items-stretch gap-5 lg:order-none lg:overflow-visible">

              {/* Vertical progress bar — hidden on mobile, shown on desktop */}
              <div
                className="relative hidden self-stretch lg:block"
                style={{ width: 14, flexShrink: 0 }}
              >
                {/* White track (full bar background) */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "#FFFFFF",
                    boxShadow:
                      "inset 0 2px 6px rgba(0,0,0,0.06), 0 2px 10px rgba(74,184,222,0.12)",
                  }}
                />

                {/* Blue fill — grows from top to center of active dot using CSS calc */}
                <div
                  className="absolute inset-x-0 top-0 rounded-full transition-all duration-500 ease-out"
                  style={{
                    background: "linear-gradient(180deg, #5CC8E8 0%, #3AADD4 100%)",
                    height:
                      capabilities.length <= 1
                        ? "100%"
                        : `calc(14px + ${activeIndex} * (100% - 28px) / ${capabilities.length - 1})`,
                  }}
                />

                {/* Dots evenly distributed along the bar */}
                <div className="absolute inset-0 flex flex-col items-center justify-between py-[7px]">
                  {capabilities.map((cap, i) => (
                    <button
                      key={cap.number}
                      type="button"
                      aria-label={`Go to ${cap.title}`}
                      onClick={() => goTo(i)}
                      className="relative z-10 shrink-0 rounded-full transition-all duration-300"
                      style={{
                        // Filled section (active + completed) → white dot
                        // Unfilled section (upcoming) → blue dot
                        width:  i === activeIndex ? 9 : 7,
                        height: i === activeIndex ? 9 : 7,
                        background: i <= activeIndex ? "#FFFFFF" : "#48B8DE",
                        boxShadow:
                          i === activeIndex
                            ? "0 0 0 2px rgba(255,255,255,0.9), 0 0 0 4px rgba(74,184,222,0.35)"
                            : i < activeIndex
                            ? "0 1px 3px rgba(0,0,0,0.08)"
                            : "none",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Content card — animates between capabilities */}
              {/* Mobile: relative flow so height adapts to content (no clipping) */}
              {/* Desktop: absolute inset-0 fills the fixed-height container */}
              <div className="relative flex-1 lg:min-h-[300px] lg:overflow-visible">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.38, ease: EASE }}
                    className="w-full rounded-[28px] bg-white px-6 py-6 shadow-[0_16px_40px_-20px_rgba(20,46,92,0.18)] lg:absolute lg:inset-0 lg:rounded-r-none lg:shadow-none lg:px-7 lg:py-7 lg:[mask-image:linear-gradient(to_right,#000_85%,transparent_100%)] lg:[-webkit-mask-image:linear-gradient(to_right,#000_85%,transparent_100%)]"
                  >
                    <span className="block font-lato text-[32px] font-bold leading-none text-[#0A8EC8]/50 lg:text-[36px]">
                      {activeCap.number}
                    </span>
                    <h3 className="mt-3 font-lato text-[20px] font-bold leading-tight tracking-[0] text-[#0A4B6E] lg:text-[22px]">
                      {activeCap.title}
                    </h3>
                    <ul className="mt-4 space-y-2 lg:mt-5 lg:space-y-2.5">
                      {activeCap.points.map((p) => (
                        <CheckItem key={p}>{p}</CheckItem>
                      ))}
                    </ul>

                    {/* Mobile/tab image — inside the card, hidden on desktop */}
                    <div
                      className="relative mt-5 overflow-hidden rounded-[16px] lg:hidden"
                      style={{ minHeight: 200 }}
                    >
                      <div
                        className="absolute inset-0 rounded-[16px] p-2"
                        style={{
                          background:
                            "linear-gradient(#fff,#fff) padding-box, linear-gradient(to bottom right,#0A8EC8,#FFFFFF) border-box",
                          border: "2px solid transparent",
                        }}
                      >
                        <div className="relative h-full w-full overflow-hidden rounded-[12px]">
                          <Image
                            src={activeCap.image ?? CAP_IMAGE}
                            alt={activeCap.title}
                            fill
                            unoptimized
                            className="object-cover"
                            sizes="100vw"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>{/* end inner row */}

            {/* Mobile dot indicators — replaces the sidebar progress bar */}
            <div className="order-2 flex items-center justify-center gap-2 lg:hidden">
              {capabilities.map((cap, i) => (
                <button
                  key={cap.number}
                  type="button"
                  aria-label={`Go to ${cap.title}`}
                  onClick={() => goTo(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === activeIndex ? 20 : 8,
                    height: 8,
                    background: i === activeIndex ? "#0A8EC8" : "rgba(10,142,200,0.25)",
                  }}
                />
              ))}
            </div>

            {/* Banner — inside left column, below the content card */}
            <div className="order-3 lg:order-none">
              <ConnectedBanner text={bannerText} />
            </div>

            </div>{/* end left column */}

            {/* ── RIGHT: animated image (desktop only) ── */}
            <div
              className="relative hidden flex-1 overflow-hidden rounded-[22px] lg:block"
              style={{ minHeight: 260 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.03 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="absolute inset-0"
                >
                  <div
                    className="h-full w-full rounded-[22px] p-2.5 shadow-[0_28px_55px_-28px_rgba(20,46,92,0.38)]"
                    style={{
                      background:
                        "linear-gradient(#fff,#fff) padding-box, linear-gradient(to bottom right,#0A8EC8,#FFFFFF) border-box",
                      border: "2px solid transparent",
                    }}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-[16px]">
                      <Image
                        src={activeCap.image ?? CAP_IMAGE}
                        alt={activeCap.title}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
