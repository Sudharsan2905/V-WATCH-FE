"use client";

import Image from "next/image";
import { motion, MotionConfig } from "motion/react";
import { wipeTop, fadeUp, loadIn, staggerContainer, viewportReveal } from "@/components/about/anim";

// ─── Arc connector (mirrors OperationalData) ──────────────────────────────────

const connectorReveal = {
  hidden: { clipPath: "inset(-50% 100% -50% 0)", opacity: 0 },
  show: {
    clipPath: "inset(-50% 0% -50% 0)",
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

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

// ─── Feature modules shown below the dashboard ───────────────────────────────

const MODULES = [
  {
    label: "Check-In",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <rect x="4" y="3" width="20" height="22" rx="3" stroke="#21B1F1" strokeWidth="1.8" />
        <path d="M9 14l3.5 3.5L19 10" stroke="#21B1F1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 7h10" stroke="#21B1F1" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Attendance",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <rect x="3" y="5" width="22" height="20" rx="3" stroke="#21B1F1" strokeWidth="1.8" />
        <path d="M3 11h22" stroke="#21B1F1" strokeWidth="1.5" />
        <path d="M9 3v4M19 3v4" stroke="#21B1F1" strokeWidth="1.8" strokeLinecap="round" />
        <rect x="7" y="15" width="4" height="4" rx="1" fill="#21B1F1" opacity="0.6" />
        <rect x="13" y="15" width="4" height="4" rx="1" fill="#21B1F1" opacity="0.6" />
      </svg>
    ),
  },
  {
    label: "Claims & Leave",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <rect x="5" y="3" width="18" height="22" rx="3" stroke="#21B1F1" strokeWidth="1.8" />
        <path d="M9 9h10M9 13h10M9 17h6" stroke="#21B1F1" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="20" r="5" fill="#21B1F1" />
        <path d="M17.5 20h5M20 17.5v5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Payroll",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <rect x="3" y="7" width="22" height="14" rx="3" stroke="#21B1F1" strokeWidth="1.8" />
        <circle cx="14" cy="14" r="3.5" stroke="#21B1F1" strokeWidth="1.5" />
        <path d="M7 14h1M20 14h1" stroke="#21B1F1" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Payslip",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <path d="M6 3h16l3 4v18H3V7L6 3z" stroke="#21B1F1" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M3 7h22" stroke="#21B1F1" strokeWidth="1.2" />
        <path d="M8 12h12M8 16h8M8 20h5" stroke="#21B1F1" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

// Blade fan decoration
const BLADE_COUNT = 60;
const BLADE_GRADIENT =
  "radial-gradient(101.76% 69.46% at 50% 50%, rgba(245,251,255,0.40) 36.61%, rgba(255,255,255,0.00) 67.79%)";
const BLADE_BLUE_WASH =
  "radial-gradient(70% 50% at 50% 50%, rgba(91,184,245,0.40) 0%, rgba(91,184,245,0.12) 45%, rgba(91,184,245,0.00) 75%)";

function BladeFan() {
  const center = (BLADE_COUNT - 1) / 2;
  return (
    <div className="flex h-[555px] items-stretch justify-center">
      {Array.from({ length: BLADE_COUNT }).map((_, i) => (
        <span
          key={i}
          className="block h-[555px] w-[35px] shrink-0"
          style={{
            background: BLADE_GRADIENT,
            boxShadow: i < center ? "inset 6px 0 30px 0 #FFF" : "inset -6px 0 30px 0 #FFF",
          }}
        />
      ))}
    </div>
  );
}

export default function HrmsOverview() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden px-6 pb-16 pt-10 lg:px-[60px]">
        <div className="mx-auto flex w-full max-w-[1410px] flex-col gap-8">
          {/* Header */}
          <motion.header
            initial="hidden"
            whileInView="show"
            viewport={viewportReveal}
            className="relative z-10 flex flex-col gap-2 text-[#0A4B6E]"
          >
            <motion.h2
              variants={wipeTop}
              className="font-lato text-[22px] font-bold leading-tight sm:text-[26px]"
            >
              Everything you need in one view
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.15}
              className="max-w-[760px] font-lato text-[16px] font-normal leading-[24px] sm:text-[20px] sm:leading-[28px]"
            >
              Get a real-time overview of your workforce without digging through
              systems or spreadsheets.
            </motion.p>
          </motion.header>

          {/* Dashboard mockup with blade fan */}
          <div className="relative flex flex-col items-center lg:mt-6">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[555px] w-screen -translate-x-1/2 -translate-y-1/2 items-center justify-center lg:flex"
              style={{
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, #000 16%, #000 56%, transparent 78%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, #000 16%, #000 56%, transparent 78%)",
              }}
            >
              <div className="absolute inset-0" style={{ background: BLADE_BLUE_WASH }} />
              <BladeFan />
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportReveal}
              variants={loadIn}
              className="relative z-10 mx-auto w-[81%] max-w-[614px]"
            >
              <Image
                src="/workforce/dashboard-mockup.svg"
                alt="V-Watch Ai HRMS dashboard overview"
                width={615}
                height={407}
                sizes="(min-width: 1024px) 614px, 100vw"
                className="h-auto w-full"
              />
              <Image
                src="/workforce/divider-shadow.svg"
                alt=""
                aria-hidden="true"
                width={759}
                height={10}
                className="absolute left-1/2 top-full z-10 w-[123.5%] max-w-none -translate-x-1/2 -translate-y-1/2"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-full -z-10 h-[90px] w-[120%] -translate-x-1/2"
                style={{
                  background:
                    "radial-gradient(50% 100% at 50% 0%, rgba(91,184,245,0.22) 0%, rgba(91,184,245,0.00) 70%)",
                }}
              />
            </motion.div>
          </div>

          {/* Feature modules row — arc connectors overlay the grid, same pattern as OperationalData */}
          <div className="relative z-10 mt-4 w-full">
            {/* Arc connectors — 4 connectors for 5 modules, visible at sm+ (5-up layout) */}
            <motion.div
              aria-hidden
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={viewportReveal}
              className="absolute inset-x-0 top-1 hidden h-8 sm:block"
            >
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  variants={connectorReveal}
                  className="absolute top-0"
                  style={{ left: `${10 + i * 20}%`, width: "20%" }}
                >
                  <ArcConnector delay={i * 0.4} />
                </motion.div>
              ))}
            </motion.div>

            {/* Module cards grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={viewportReveal}
              className="grid grid-cols-3 gap-3 min-[426px]:grid-cols-5 min-[426px]:pt-9 sm:gap-4"
            >
              {MODULES.map(({ label, icon }, i) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  custom={i * 0.08}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-[#E4F3FB] bg-white px-3 py-5 shadow-[0_4px_20px_0_rgba(0,117,180,0.08)]"
                >
                  {/* Icon in a circle with white bg + border */}
                  <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#D6EEFA] bg-white shadow-[0_2px_10px_0_rgba(0,117,180,0.10)]">
                    {icon}
                  </div>
                  <span className="text-center font-lato text-[13px] font-semibold leading-tight text-[#0A4B6E] sm:text-[14px]">
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
