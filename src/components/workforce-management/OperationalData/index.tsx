"use client";

import Image from "next/image";
import { motion, MotionConfig } from "motion/react";
import {
  wipeTop,
  fadeUp,
  popIn,
  staggerContainer,
  viewportReveal,
} from "@/components/about/anim";

// ─── Process steps ────────────────────────────────────────────────────────────
const STEPS = [
  { icon: "/workforce/process/icon-attendance.svg", w: 36, h: 36, label: "Track Attendance", image: "/workforce/process/step-1.webp" },
  { icon: "/workforce/process/icon-manhours.svg", w: 36, h: 36, label: "Calculate Manhours", image: "/workforce/process/step-2.webp" },
  { icon: "/workforce/process/icon-claims.svg", w: 32, h: 33, label: "Process Claims & Leave", image: "/workforce/process/step-3.webp" },
  { icon: "/workforce/process/icon-payroll.svg", w: 29, h: 32, label: "Generate Payroll", image: "/workforce/process/step-4.webp" },
];

// Entrance for each connector: clip-reveals left-to-right, staggered by the parent.
const connectorReveal = {
  // Negative top/bottom insets stop the clip cutting the overflowing play arrow.
  hidden: { clipPath: "inset(-50% 100% -50% 0)", opacity: 0 },
  show: {
    clipPath: "inset(-50% 0% -50% 0)",
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Dashed arc + play arrow between steps; dashes flow, arrow pulses, `delay` staggers.
function ArcConnector({ delay = 0 }: { delay?: number }) {
  return (
    <div className="relative w-full">
      <svg viewBox="0 0 279 30" fill="none" preserveAspectRatio="none" className="w-full">
        <motion.path
          d="M0.421875 29.4878L8.34564 15.9445C13.9466 6.37136 24.2055 0.487793 35.2968 0.487793H243.237C254.144 0.487793 264.26 6.17841 269.923 15.4993L278.422 29.4878"
          stroke="#3890C0"
          strokeWidth="0.975785"
          strokeDasharray="3.9 3.9"
          animate={{ strokeDashoffset: [0, -7.8] }}
          transition={{ duration: 0.8, ease: "linear", repeat: Infinity }}
        />
      </svg>
      <span className="absolute left-1/2 top-[2px] -translate-x-1/2 -translate-y-1/2">
        <motion.span
          className="block"
          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity, delay }}
        >
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
            <path d="M1.5 1.2 L12.5 8 L1.5 14.8 Z" fill="#21B1F1" stroke="#3890C0" strokeWidth="1" strokeLinejoin="round" />
          </svg>
        </motion.span>
      </span>
    </div>
  );
}

export default function OperationalData() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="flex flex-col items-center gap-5 px-6 pb-10 lg:px-[60px]">
        <div className="flex w-full max-w-[1410px] flex-col items-center gap-10">
          {/* Header */}
          <motion.header
            initial="hidden"
            whileInView="show"
            viewport={viewportReveal}
            className="flex w-full flex-col gap-2 text-[#0A4B6E]"
          >
            <motion.h2
              variants={wipeTop}
              className="max-w-[889px] font-lato text-[22px] font-bold leading-tight sm:text-[26px]"
            >
              Powered by real operational data
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.15}
              className="max-w-[953px] font-lato text-[16px] font-normal leading-[24px] sm:text-[20px] sm:leading-[28px]"
            >
              All payroll and administrative processes are built on real-time
              workforce data captured across your operations.
            </motion.p>
          </motion.header>

          {/* Process flow */}
          <div className="relative w-full">
            {/* Dashed arc connectors — only shown in the 4-up layout (≥1046px) */}
            <motion.div
              aria-hidden
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={viewportReveal}
              className="absolute inset-x-0 top-1 hidden h-8 min-[1046px]:block"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  variants={connectorReveal}
                  className="absolute top-0"
                  style={{ left: `${12.5 + i * 25}%`, width: "25%" }}
                >
                  <ArcConnector delay={i * 0.4} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={viewportReveal}
              className="grid grid-cols-1 gap-x-6 gap-y-10 min-[426px]:grid-cols-2 min-[1046px]:grid-cols-4 min-[1046px]:gap-x-8 min-[1046px]:pt-9"
            >
              {STEPS.map((step) => (
                <motion.div key={step.label} variants={fadeUp} className="max-h-[306px] flex flex-col items-center">
                  {/* Step circle */}
                  <motion.div
                    variants={popIn}
                    className="flex h-[66px] w-[66px] shrink-0 items-center justify-center rounded-full border border-[#EFF9FF] bg-white shadow-[0_4px_8px_0_rgba(126,207,250,0.12)]"
                  >
                    <Image src={step.icon} alt="" width={step.w} height={step.h} aria-hidden="true" />
                  </motion.div>
                  {/* Label */}
                  <h3 className="mt-[6px] text-center font-lato text-[16px] font-bold leading-[110%] tracking-[-0.04px] text-[#0F172A] sm:text-[20px]">
                    {step.label}
                  </h3>
                  {/* Illustration: blurred glow + frosted glass behind the sharp art. */}
                  <div className="mt-[12px] relative h-[200px] w-full max-w-[250px] overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#EAF4FB_0%,#F4FBFF_100%)]">               <Image
                      src={step.image}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="250px"
                      className="scale-[1.04] object-cover h-full object-right-bottom blur-[3.5px]"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-t-[20px] opacity-60"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(56,144,192,0.60) 0%, rgba(126,207,250,0.10) 11.06%, rgba(126,207,250,0.00) 100%)",
                        backdropFilter: "blur(17px)",
                        WebkitBackdropFilter: "blur(17px)",
                      }}
                    />
                    <Image
                      src={step.image}
                      alt={step.label}
                      fill
                      sizes="250px"
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
