"use client";

import { Fragment } from "react";
import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Reveal order: the background plaque first, then the header, then the stat
// columns one after another.
const HEADER_DELAY = 0.3;
const STATS_START = 0.55;
const STAT_STAGGER = 0.15;

const bannerIn: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

// `custom` is the per-element delay in seconds.
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};

// ── Data ────────────────────────────────────────────────────────────────────
// Icons live in /public/industry.
type Stat = { icon: string; value: string; label: string };

const STATS: Stat[] = [
  {
    icon: "/industry/stat-users.svg",
    value: "500K+",
    label: "Users & Tasks Managed",
  },
  {
    icon: "/industry/stat-events.svg",
    value: "1M+",
    label: "Real-Time Data Events Processed",
  },
  {
    icon: "/industry/stat-performance.svg",
    value: "99.99%",
    label: "Reliable System Performance",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function Stats() {
  return (
    <MotionConfig reducedMotion="user">
    <section className="bg-white px-6 pb-20 lg:px-[60px]">
      {/* Banner — stats-bg.png holds the dark navy plaque art. On sm+ (wide,
          short) we stretch it to fill the box (100% 100%). On mobile the card
          is tall/narrow, so the cropped art looks uneven — there we drop the
          image entirely and use a flat navy card (#0a3f5c) with rounded corners. */}
      <motion.div
        variants={bannerIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="relative mx-auto w-full max-w-[1410px] overflow-hidden rounded-[24px] bg-[#0a3f5c] px-6 py-10 sm:rounded-none sm:bg-transparent sm:bg-[url(/industry/stats-bg.png)] sm:bg-[length:100%_100%] sm:bg-center sm:bg-no-repeat sm:px-8 sm:py-12 lg:px-20 lg:py-16"
      >
        <motion.div
          variants={fadeUp}
          custom={HEADER_DELAY}
          className="relative z-10 mx-auto flex max-w-[900px] flex-col items-center gap-3.5 text-center"
        >
          <h2 className="text-balance text-[20px] font-semibold leading-tight text-[#EBF7FE] sm:text-[26px] lg:text-[32px]">
            Built for high-scale, high-complexity environments
          </h2>
          <p className="text-balance text-[14px] leading-relaxed text-[#EBF7FE] sm:text-[17px] lg:text-[20px]">
            V-Watch Ai manages large volumes of users, tasks, and real-time data
            across complex environments ensuring reliability when it matters
            most.
          </p>
        </motion.div>

        <div className="relative z-10 mt-10 mb-7 flex flex-col items-stretch gap-8 sm:flex-row sm:items-center sm:justify-center sm:gap-0">
          {STATS.map((stat, i) => (
            <Fragment key={stat.label}>
              {/* Tapered, blurred vertical separator between columns (sm+ only).
                  On mobile the stacked columns use a horizontal top border.
                  Fades in with the column that follows it. */}
              {i > 0 && (
                <motion.div
                  variants={fadeUp}
                  custom={STATS_START + i * STAT_STAGGER}
                  className="hidden shrink-0 self-center sm:block"
                >
                  <Image
                    src="/industry/stat-divider.svg"
                    alt=""
                    width={5}
                    height={122}
                    aria-hidden
                    unoptimized
                  />
                </motion.div>
              )}
              <motion.div
                variants={fadeUp}
                custom={STATS_START + i * STAT_STAGGER}
                className={`flex flex-1 flex-col items-center gap-3 text-center sm:max-w-[360px] sm:px-4 lg:px-8 ${
                  i > 0 ? "border-t border-white/10 pt-8 sm:border-t-0 sm:pt-0" : ""
                }`}
              >
                <Image
                  src={stat.icon}
                  alt=""
                  width={48}
                  height={48}
                  unoptimized
                  className="h-12 w-12 shrink-0"
                />
                <div className="flex flex-col items-center gap-1">
                  <p className="text-[30px] font-semibold leading-none text-white sm:text-[34px] lg:text-[42px]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[15px] font-medium leading-snug text-white lg:text-[16px]">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            </Fragment>
          ))}
        </div>
      </motion.div>
    </section>
    </MotionConfig>
  );
}
