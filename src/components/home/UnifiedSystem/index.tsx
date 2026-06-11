"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";

// Wipe-in-from-top: content reveals downward behind a moving top edge.
// `custom` is the per-element delay in seconds.
const wipeTop: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  visible: (delay = 0) => ({
    clipPath: "inset(0 0 0 0)",
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// Soft fade + scale, used for the circuit visual "loading" in.
// `custom` is the per-element delay in seconds.
const loadIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// Benefit cards:
//   1. load   — all three fade in together, sitting a bit below their spot
//   2. then, ONE card at a time (top → bottom): it expands (scales up in place,
//      bottom edge touching the next card — no gap) then moves up into its place,
//      before the next card takes its turn.
const LOAD_DOWN = 30; // how far below the resting spot the cards load in
const BASE_H = 90; // resting card height (px)
const EXPANDED_H = 168; // height while a card is expanded
const BENEFITS_DELAY = 1.3; // wait until the heading + image have loaded in first
const CARD_STEP = 0.7; // gap between each card's expand→move turn
const benefitCard: Variants = {
  hidden: { opacity: 0, y: LOAD_DOWN, height: BASE_H },
  visible: (i = 0) => {
    const turn = BENEFITS_DELAY + i * CARD_STEP; // this card's sequential turn
    return {
      opacity: 1,
      // grow taller (pushing the next card down so its bottom touches) → collapse back
      height: [BASE_H, EXPANDED_H, BASE_H],
      // stay down through the expand, then move up into place
      y: [LOAD_DOWN, LOAD_DOWN, 0],
      transition: {
        opacity: { duration: 0.4, ease: "easeOut", delay: BENEFITS_DELAY },
        height: { duration: 0.8, times: [0, 0.5, 1], ease: "easeInOut", delay: turn },
        y: { duration: 0.8, times: [0, 0.5, 1], ease: [0.22, 1, 0.36, 1], delay: turn },
      },
    };
  },
};

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
      {/* concentric-rings + radial-blob decoration (one-system.svg). The artwork
          is portrait (1280×1428 → 111.5625vw tall at full width). To make the
          ring read as ONE continuous circle across this section AND FeatureGrid
          below, the image is shown at its exact aspect (never cropped) with its
          CENTRE pinned to the seam between the two sections. Here the centre is
          pushed below the section bottom (bottom: -half-height), so only the TOP
          half of the circle shows; FeatureGrid mirrors this with top:-half. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 select-none"
        style={{ bottom: "-60.78125vw", height: "111.5625vw" }}
      >
        <Image src="/home/one-system.svg" alt="" fill priority={false} sizes="100vw" className="object-cover" />
      </div>
      {/* extremely soft centre glow to lift the content off the background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_42%_at_50%_46%,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_72%)]"
      />

      <div className="relative mx-auto flex w-full max-w-[1410px] flex-col gap-[30px]">
        <motion.header
          className="flex max-w-[807px] flex-col gap-2.5 text-[#0A4B6E]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.h2 variants={wipeTop} custom={0} className="max-w-[642px] text-[26px] font-bold">
            What if everything worked as one system?
          </motion.h2>
          <motion.p variants={wipeTop} custom={0.15} className="text-[20px] font-normal leading-[26px]">
            V-Watch Ai brings your entire operation into a single, connected platform where
            everything is tracked, managed, and automated in real time.
          </motion.p>
        </motion.header>

        <motion.div
          className="flex flex-col items-stretch gap-[30px] lg:flex-row lg:items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left: benefits list */}
          <div className="flex flex-1 flex-col gap-3.5 p-3.5">
            <motion.p
              variants={wipeTop}
              custom={BENEFITS_DELAY - 0.3}
              className="max-w-[415px] text-[20px] font-bold text-[#0A4B6E]"
            >
              Instead of switching between systems, you get
            </motion.p>

            {/* Stacked cards fanning forward: each lower card overlaps on top of
                the one above it (card 3 frontmost), each with a light white liner */}
            <div className="flex flex-col">
              {BENEFITS.map((b, i) => (
                <motion.div
                  key={b.n}
                  variants={benefitCard}
                  custom={i}
                  style={{ zIndex: i + 1 }}
                  className={`relative flex items-start overflow-hidden rounded-[14px] px-5 ${
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
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: circuit visual (rendered from Figma — caption baked in) */}
          <motion.div
            variants={loadIn}
            custom={0.25}
            className="relative h-[302px] w-full overflow-hidden rounded-[16px] lg:w-[590px] lg:shrink-0"
          >
            <Image
              src="/home/unified-visual.png"
              alt="From security to execution, everything is connected, automated, and measurable"
              fill
              className="object-cover"
              sizes="590px"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
