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

const lineReveal: Variants = {
  hidden: { opacity: 0, y: "115%", filter: "blur(6px)" },
  show: (delay: number) => ({
    opacity: 1,
    y: "0%",
    filter: "blur(0px)",
    transition: { delay, duration: 0.3, ease: HERO_EASE },
  }),
};

const copyReveal: Variants = {
  hidden: {
    opacity: 0,
    clipPath: "inset(0 100% 0 0)",
    filter: "blur(3px)",
  },
  show: (delay: number) => ({
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    filter: "blur(0px)",
    transition: { delay, duration: 0.3, ease: HERO_EASE },
  }),
};

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
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 1.3, duration: 0.35, ease: HERO_EASE },
  },
};

export default function IndustryHero() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative min-h-[600px] overflow-hidden bg-[#030515] lg:min-h-[754px]">
        {/* Background: industrial night scene, full-bleed cover (no distortion at
            any width — replaces the old object-fill stretch). */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: HERO_EASE }}
        >
          <Image
            src="/industry/hero-bg.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Glow circles — desktop only, clipped to hero bounds.
            Positions derived from Figma container+inset values converted to direct px coords. */}
        <motion.div
          className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: HERO_EASE }}
        >
          {/* Right circle: 608×608 box@(714,48) inset -32.89% → 1008×1008 at (514,-152) */}
          <div
            className="absolute mix-blend-overlay"
            style={{
              left: "514px",
              top: "-152px",
              width: "1008px",
              height: "1008px",
            }}
          >
            <Image
              src="/industry/hero-circle-right.svg"
              alt=""
              fill
              unoptimized
            />
          </div>

          {/* Left circle: 729×729 box@(-27,28) inset -24.42% → 1085×1085 at (-205,-150) */}
          <div
            className="absolute mix-blend-overlay"
            style={{
              left: "-205px",
              top: "-150px",
              width: "1085px",
              height: "1085px",
            }}
          >
            <Image src="/industry/hero-circle-left.svg" alt="" fill unoptimized />
          </div>

          {/* Center circle: 275×275 box@(265,305) inset -78.18% → 705×705 at (50,90) */}
          <div
            className="absolute"
            style={{ left: "50px", top: "90px", width: "705px", height: "705px" }}
          >
            <Image
              src="/industry/hero-circle-center.svg"
              alt=""
              fill
              unoptimized
            />
          </div>
        </motion.div>

        {/* Curved bottom — white dip carved into the hero so it flows into the
            (white) Challenges section below. Same technique as PlatformVisibility:
            full-width SVG with preserveAspectRatio="none" stretches edge-to-edge so
            there are no corner gaps, and the responsive height keeps the curve
            proportional from mobile (h-12) to desktop (lg:h-[90px]). */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-12 w-full text-white lg:h-[90px]"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <path d="M0 0 Q720 100 1440 0 L1440 100 L0 100 Z" fill="currentColor" />
        </svg>

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-[1410px] px-6 lg:px-[60px]">
          <motion.div
            className="flex flex-col items-start justify-center gap-[30px] pt-[150px] pb-[100px] lg:min-h-[754px] lg:py-[140px]"
            initial="hidden"
            animate="show"
          >
            {/* Badge + heading */}
            <div className="flex flex-col gap-[14px]">
              <motion.div
                variants={badgeReveal}
                className="inline-flex w-fit items-center gap-[3.8px] rounded-full bg-white/10 px-[13px] py-[9.5px]"
              >
                <span className="size-[11.4px] shrink-0 rounded-full bg-[#86D58B]" />
                <span className="whitespace-nowrap text-base font-semibold leading-none text-white lg:text-[18px]">
                  What V-Watch Ai
                </span>
              </motion.div>
              <h1 className="max-w-[642px] text-[34px] font-semibold leading-[1.2] tracking-[0.5px] text-white sm:text-[44px] lg:text-[50px] lg:leading-[68px] lg:tracking-[1px]">
                <span className="block overflow-hidden">
                  <motion.span custom={0.3} variants={lineReveal} className="block">
                    Built for Any Environment
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span custom={0.45} variants={lineReveal} className="block">
                    That Demands Control
                  </motion.span>
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="max-w-[561px] text-base font-bold leading-7 text-white lg:text-[20px] lg:leading-8">
              <motion.span custom={0.65} variants={copyReveal} className="block">
                V-Watch Ai is designed for complex, high-activity environments
              </motion.span>
              <motion.span custom={0.9} variants={subLineReveal} className="block">
                where visibility, safety, and operational control are critical
              </motion.span>
              <motion.span custom={1.1} variants={subLineReveal} className="block">
                from construction sites to data centers and beyond.
              </motion.span>
            </p>

            {/* CTA button */}
            <motion.div variants={buttonReveal} className="flex flex-wrap items-center gap-5">
              <BookADemo />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
