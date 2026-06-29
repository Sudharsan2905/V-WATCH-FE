"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";
import BookADemo from "@/components/common/BookADemo";

const HERO_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Each heading line slides up from below its clipping parent (overflow-hidden wrapper).
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

export default function WorkforceHero() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative min-h-[600px] overflow-hidden bg-[#030515] lg:min-h-[754px] px-6 lg:px-[60px]">
        {/* Background image */}
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: HERO_EASE }}
          >
            <Image
              src="/workforce/workforce-hero.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-right-top"
            />
          </motion.div>
          {/* Gradient keeps text legible against the bright right-side image */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030515] from-5% via-[#030515]/55 via-45% to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-[1410px]">
          <motion.div
            className="flex min-h-[600px] flex-col justify-center gap-[30px] pt-[140px] pb-[100px] lg:min-h-[754px] lg:py-[140px]"
            initial="hidden"
            animate="show"
          >
            <div className="flex flex-col gap-5">
              {/* Heading — each line clips independently */}
              <h1 className="w-[642px] max-w-full text-[34px] font-black leading-[1.2] tracking-[0.5px] text-white md:text-[50px] lg:leading-[68px]">
                <span className="block overflow-hidden">
                  <motion.span custom={0.3} variants={lineReveal} className="block">
                    Simplify Workforce
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span custom={0.45} variants={lineReveal} className="block">
                    Management From
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span custom={0.6} variants={lineReveal} className="block">
                    Attendance to Payroll
                  </motion.span>
                </span>
              </h1>

              {/* Description — wipe on first line, fade-rise on subsequent lines */}
              <p className="max-w-[580px] text-base font-bold leading-7 text-white md:text-[20px] lg:leading-8">
                <motion.span custom={0.75} variants={copyReveal} className="block">
                  Automate payroll, claims, and leave management using real-time
                </motion.span>
                <motion.span custom={0.95} variants={subLineReveal} className="block">
                  workforce data reducing manual work, improving accuracy, and
                </motion.span>
                <motion.span custom={1.15} variants={subLineReveal} className="block">
                  keeping operations running efficiently.
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
