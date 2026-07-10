// "One Platform. Complete Operational Visibility"
// Left: numbered operational steps. Right: funnel flow diagram → unified platform card.

"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STEPS_START = 0.35;
const STEP_STAGGER = 0.12;

// `custom` is the per-element delay in seconds.
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};

const stepItem: Variants = {
  hidden: { opacity: 0, x: -32 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: EASE, delay },
  }),
};

const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE, delay: 0.3 },
  },
};

type Step = { num: string; label: string };

const STEPS: Step[] = [
  { num: "01", label: "Connects all your systems" },
  { num: "02", label: "Captures real-time data" },
  { num: "03", label: "Automates workflows" },
  { num: "04", label: "Provides full visibility across operations" },
];

export default function PlatformVisibility() {
  return (
    <MotionConfig reducedMotion="user">
    <section className="relative z-10 bg-[#F2F8FE] px-6 py-8 lg:px-[60px]">
      {/* Curved top — carves the dark hero into a downward dip above this section.
          Anchored to the section's top edge (bottom-full) so the curve position is
          independent of section height — otherwise tall mobile layouts push the dip
          down onto the heading. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute bottom-[calc(100%-1px)] left-0 h-12 w-full text-[#F2F8FE] lg:h-[90px]"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d="M0 0 Q720 100 1440 0 L1440 100 L0 100 Z" fill="currentColor" />
      </svg>
      <motion.div
        className="mx-auto w-full max-w-[1410px]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Header */}
        <motion.header variants={fadeUp} className="flex max-w-[807px] flex-col gap-2.5">
          <h2 className="text-[26px] font-bold text-[#0A4B6E]">
            One Platform. Complete Operational Visibility
          </h2>
          <p className="text-[18px] font-normal leading-[26px] text-[#0A4B6E] lg:text-[20px]">
            Most organizations rely on multiple systems to manage different parts of their
            operations - access control, workforce, tracking, safety, maintenance, and reporting.
          </p>
        </motion.header>

        {/* Two-column layout */}
        <div className="mt-5 flex flex-col gap-[60px] justify-between lg:flex-row lg:items-center lg:gap-6">

          <div className="flex flex-1 flex-col gap-6 lg:max-w-[560px] min-w-[300px]">
            <motion.p variants={fadeUp} custom={0.2} className="text-[20px] font-bold text-[#006F9F]">
              It acts as a central operational layer
            </motion.p>

            <div className="relative">
              <ul className="relative flex flex-col gap-10 pl-3">
                {STEPS.map((step, i) => (
                  <motion.li
                    key={step.num}
                    variants={stepItem}
                    custom={STEPS_START + i * STEP_STAGGER}
                    className="relative flex items-center gap-5 py-2 pl-17 pr-6 rounded-2xl bg-white shadow-[0_14px_34px_-12px_rgba(150,190,230,0.55)] lg:-mr-16 lg:rounded-none lg:[background:linear-gradient(to_right,#ffffff_0%,#ffffff_75%,rgba(255,255,255,0)_100%)]"
                  >
                    {/* Number badge — overhangs the card's left edge */}
                    <span className="absolute left-0 top-1/2 flex h-14 w-10 -translate-x-[38%] -translate-y-1/2 items-center justify-center rounded-full border border-white bg-white text-[20px] font-extrabold text-[#0A4B6E] shadow-[0px_1px_2px_0px_#B8E6FF1A,-20px_0px_30px_0px_#FFFFFF33_inset,4px_1px_6px_0px_#21B1F133]">
                      {step.num}
                    </span>
                    {/* Divider between badge and label */}
                    <p className="text-[18px] font-normal leading-[26px] text-[#0A4B6E]">
                      {step.label}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <motion.div
            variants={slideFromRight}
            className="flex w-full justify-center lg:w-167.5 lg:shrink-0"
          >
            <Image
              src="/ai-platform/funnel-diagram1.svg"
              // src="/ai-platform/funnel-diagram.png"
              alt="Funnel of connected systems flowing into the unified V-Watch AI platform"
              width={592}
              height={484}
              // Dimensions match the SVG's cropped viewBox (592×484) so the box
              // aspect equals the artwork — no letterbox gaps. Scales down with
              // the column (w-full) and stays centred (mx-auto).
              className="mx-auto h-auto w-full max-w-148.25 object-contain"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
    </MotionConfig>
  );
}
