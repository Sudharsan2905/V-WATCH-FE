"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";
import BookADemo from "@/components/common/BookADemo";

const HERO_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const badgeReveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.15, duration: 0.3, ease: HERO_EASE },
  },
};

// Each heading line slides up from below its clipping parent — same as
// integrators-partners Hero. The overflow-hidden wrapper is on the outer span.
const lineReveal: Variants = {
  hidden: { opacity: 0, y: "115%", filter: "blur(6px)" },
  show: (delay: number) => ({
    opacity: 1,
    y: "0%",
    filter: "blur(0px)",
    transition: { delay, duration: 0.3, ease: HERO_EASE },
  }),
};

// First description line — clip-path wipe left → right.
const copyReveal: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)", filter: "blur(3px)" },
  show: (delay: number) => ({
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    filter: "blur(0px)",
    transition: { delay, duration: 0.3, ease: HERO_EASE },
  }),
};

// Subsequent description lines — simple fade + short rise.
const subLineReveal: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.2, ease: HERO_EASE },
  }),
};

const buttonReveal: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay, duration: 0.35, ease: HERO_EASE },
  }),
};

export default function MaintenanceHero() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative min-h-[600px] overflow-hidden bg-[#030515] lg:max-h-[754px]">
        {/* Background image */}
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: HERO_EASE }}
          >
            <Image
              src="/maintenance/maintenance-hero.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-right top-0%"
            />
          </motion.div>
          {/* Gradient keeps text legible against the bright right-side image */}
          {/* <div className="absolute inset-0 bg-gradient-to-r from-[#030515] from-5% via-[#030515]/55 via-45% to-transparent" /> */}
        </div>

        {/* Content */}
        <div className="relative z-10 w-full mx-auto max-w-[1440px] px-6 lg:px-[60px]">
          <motion.div
            className="flex min-h-[600px] max-w-[1280px] flex-col justify-center gap-[30px] pt-[140px] pb-[100px] lg:min-h-[754px] lg:py-[140px]"
            initial="hidden"
            animate="show"
          >
            <div className="flex flex-col gap-5 ">
              <div className="flex flex-col gap-3.5">
                {/* Badge */}
                {/* <motion.span
                  variants={badgeReveal}
                  className="inline-flex w-fit items-center gap-[6px] rounded-full border border-white/15 bg-linear-to-b from-white/20 to-white/5 px-[13px] py-[9px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_8px_24px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md"
                >
                  <span className="size-[11px] rounded-full bg-[#86D58B] shadow-[0_0_8px_2px_rgba(134,213,139,0.6)]" />
                  <span className="text-base font-bold leading-none text-white">
                    Maintenance &amp; Ticketing
                  </span>
                </motion.span> */}

                {/* Heading — each line clips independently */}
                <h1 className="max-w-[600px] w-full text-[34px] font-black leading-[1.2] tracking-[0.5px] text-white sm:text-[44px] lg:text-[50px] lg:leading-[68px]">
                  <span className="block overflow-hidden">
                    <motion.span custom={0.3} variants={lineReveal} className="block">
                      Keep Operations
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden">
                    <motion.span custom={0.45} variants={lineReveal} className="block">
                      Running Without Delays
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden">
                    <motion.span custom={0.6} variants={lineReveal} className="block">
                      or Breakdowns
                    </motion.span>
                  </span>
                </h1>
              </div>

              {/* Description — wipe on first line, fade-rise on subsequent lines */}
              <p className="max-w-[600px] text-base font-bold leading-7 text-white lg:text-[20px] lg:leading-8">
                <motion.span custom={0.75} variants={copyReveal} className="block">
                  Manage maintenance requests, assign service tasks, and track
                </motion.span>
                <motion.span custom={0.95} variants={subLineReveal} className="block">
                  resolution in one system ensuring every issue is addressed,
                </motion.span>
                <motion.span custom={1.15} variants={subLineReveal} className="block">
                  recorded, and resolved efficiently.
                </motion.span>
              </p>
            </div>

            {/* CTA */}
            <motion.div custom={1.35} variants={buttonReveal}>
              <BookADemo />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
