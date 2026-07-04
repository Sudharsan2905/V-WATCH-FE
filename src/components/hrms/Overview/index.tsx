"use client";

import Image from "next/image";
import { motion, MotionConfig } from "motion/react";
import {
  wipeTop,
  fadeUp,
  loadIn,
  staggerContainer,
  viewportReveal,
} from "@/components/about/anim";

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
      <svg
        viewBox="0 0 279 30"
        fill="none"
        preserveAspectRatio="none"
        className="w-full"
      >
        <motion.path
          d="M0.421875 29.4878L8.34564 15.9445C13.9466 6.37136 24.2055 0.487793 35.2968 0.487793H243.237C254.144 0.487793 264.26 6.17841 269.923 15.4993L278.422 29.4878"
          stroke="#3890C0"
          strokeWidth="2"
          strokeDasharray="3.9 3.9"
          animate={{ strokeDashoffset: [0, -7.8] }}
          transition={{ duration: 0.8, ease: "linear", repeat: Infinity }}
        />
      </svg>
      <span className="absolute left-1/2 top-[2px] -translate-x-1/2 -translate-y-1/2">
        <motion.span
          className="block"
          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
          transition={{
            duration: 1.6,
            ease: "easeInOut",
            repeat: Infinity,
            delay,
          }}
        >
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
            <path
              d="M1.5 1.2 L12.5 8 L1.5 14.8 Z"
              fill="#21B1F1"
              stroke="#21B1F1"
              strokeWidth="1"
              strokeLinejoin="round"
            />
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
    icon: "/hrms/check-in.svg",
  },
  {
    label: "Attendance",
    icon: "/hrms/attendance.svg",
  },
  {
    label: "Claims & Leave",
    icon: "/hrms/claims-leave.svg",
  },
  {
    label: "Payroll",
    icon: "/hrms/payroll.svg",
  },
  {
    label: "Payslip",
    icon: "/hrms/payslip.svg",
  },
];

// Blade fan decoration
const BLADE_COUNT = 40;

function BladeFan() {
  const center = (BLADE_COUNT - 1) / 2;

  return (
    <div className="relative flex h-[400px] items-stretch justify-center">
      {Array.from({ length: BLADE_COUNT }).map((_, i) => {
        const distance = Math.abs(i - center);
        const ratio = distance / center;
        const intensity = Math.abs(i - center) / center;

        const blue = 0.6 + intensity * 0.28;

        return (
          <span
            key={i}
            className="h-full w-[36px] shrink-0"
            style={{
              background:
                i < center
                  ? `linear-gradient(to left,
        rgba(91,184,245,${blue}),
        rgba(245,251,255,0.35))`
                  : `linear-gradient(to right,
        rgba(91,184,245,${blue}),
        rgba(245,251,255,0.35))`,

              opacity: 0.2 + ratio * 0.8,

              filter: "blur(0.6px)",

              maskImage:
                "linear-gradient(to bottom, transparent 0%, #000 30%, #000 70%, transparent 100%)",

              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, #000 30%, #000 70%, transparent 100%)",
            }}
          />
        );
      })}
    </div>
  );
}

export default function HrmsOverview() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden px-6 pb-5 md:pb-10 lg:pt-10 lg:px-[60px]">
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
              <div
                className="absolute left-0 top-1/2 h-[420px] w-[38%] -translate-y-1/2"
                style={{
                  background:
                    "radial-gradient(circle at left center, rgba(91,184,245,.42) 0%, rgba(91,184,245,.18) 35%, transparent 80%)",
                  filter: "blur(45px)",
                }}
              />

              {/* Right blue glow */}
              <div
                className="absolute right-0 top-1/2 h-[420px] w-[38%] -translate-y-1/2"
                style={{
                  background:
                    "radial-gradient(circle at right center, rgba(91,184,245,.42) 0%, rgba(91,184,245,.18) 35%, transparent 80%)",
                  filter: "blur(45px)",
                }}
              />
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
          <div className="relative mx-auto mt-8 w-fit">
            {/* Connector */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={viewportReveal}
              className="absolute left-1/2 top-0 hidden h-[30px] w-[820px] -translate-x-1/2 lg:flex"
            >
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  variants={connectorReveal}
                  className="flex-1"
                >
                  <ArcConnector delay={i * 0.4} />
                </motion.div>
              ))}
            </motion.div>

            {/* Cards */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={viewportReveal}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-6 pt-[25px]"
            >
              {MODULES.map(({ label, icon }, i) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  custom={i * 0.08}
                  className="flex h-[140px] w-[180px] flex-col items-center justify-center gap-4 rounded-2xl border border-[#f4faff] bg-white shadow-[0_4px_20px_rgba(0,117,180,0.08)]"
                >
                  <div className="flex h-[66px] w-[66px] items-center justify-center rounded-full bg-white shadow-2xl">
                    <Image src={icon} alt={label} width={32} height={32} />
                  </div>

                  <span className="text-center font-lato text-[14px] md:text-[20px] font-semibold text-[#0F172A]">
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
