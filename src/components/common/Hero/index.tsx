"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";
import BookADemo from "@/components/common/BookADemo";

const HERO_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Same entrance language as the products/integrators heroes. Driven by motion
// rather than CSS keyframes on purpose: CSS animations start at first paint,
// which here is while the hero webp is still downloading — the sequence would
// be over before the section looks like anything. Motion starts on hydration.
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
  hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)", filter: "blur(3px)" },
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
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay, duration: 0.35, ease: HERO_EASE },
  }),
};

export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-[#0A2A4A]  px-6 lg:px-[60px]">
        {/* Baked glass-tile render (labels + icons composited in Figma) */}
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/hero/hero-visual.webp"
            alt="V-Watch AI platform modules: HRMS (Human Resource Management System), Secure Access, SMS, RTL, Workflow Management and AI Location Tracking"
            fill
            sizes="100vw"
            className="object-cover object-top"
            // priority is next/image's preload: it emits <link rel="preload">,
            // sets fetchpriority="high" and forces eager loading. (There is no
            // `preload` prop — it was being passed straight through to the DOM.)
            priority
            loading="eager"
          />
        </div>

        {/* Left-side copy */}
        <div className="relative z-10 mx-auto w-full max-w-[1410px]">
          <motion.div
            className="flex min-h-[600px] max-w-[642px] flex-col justify-center gap-[30px] pt-[150px] pb-[100px] lg:min-h-[753px] lg:py-[140px]"
            initial="hidden"
            animate="show"
          >
            <div className="flex flex-col items-start gap-[14px]">
              <h1 className="text-[clamp(22px,7.2vw,34px)] font-black leading-[1.25] tracking-[0.5px] text-white sm:text-[44px] sm:leading-[1.2] lg:text-[50px] lg:leading-[68px]">
                {/* Each line rises out of its own clipping wrapper, staggered.
                    Below sm, the font-size fluidly scales down with viewport width (clamp) instead
                    of a fixed 34px — at a fixed size, each of these two hardcoded lines no longer
                    fits on one line on phones narrower than ~430px (e.g. iPhone 12 Pro at 390px),
                    so they'd each wrap a second time into an orphaned single word. */}
                <span className="block overflow-hidden">
                  <motion.span custom={0.1} variants={lineReveal} className="block">
                    Run Your Operations on
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span custom={0.35} variants={lineReveal} className="block">
                    One Intelligent System
                  </motion.span>
                </span>
              </h1>
            </div>

            {/* lg+: split into its visible lines so each reveals one after
                another, continuing the cascade started by the headline. These
                3 breaks were authored to each fit one line at this width —
                below lg the same fragments no longer fit on one line each and
                wrap a second time into short, ragged lines, so a plain
                reflowing paragraph is used there instead (below). */}
            <p className="hidden max-w-[615px] text-[20px] font-bold leading-[32px] text-white lg:block">
              <motion.span custom={0.8} variants={copyReveal} className="block">
                V-Watch AI is an AI-driven platform that automates, secures, and
              </motion.span>
              <motion.span custom={1.05} variants={subLineReveal} className="block">
                connects your entire operation giving you real-time visibility and
              </motion.span>
              <motion.span custom={1.25} variants={subLineReveal} className="block">
                control across people, processes, assets, and movement.
              </motion.span>
            </p>

            {/* Below lg: same copy, no manual line breaks — wraps naturally at
                any mobile/tablet width instead of double-wrapping. */}
            <motion.p
              custom={0.8}
              variants={subLineReveal}
              className="max-w-[615px] text-base font-bold leading-7 text-white lg:hidden"
            >
              V-Watch AI is an AI-driven platform that automates, secures, and
              connects your entire operation giving you real-time visibility and
              control across people, processes, assets, and movement.
            </motion.p>

            <motion.div
              custom={1.5}
              variants={buttonReveal}
              className="flex flex-wrap items-center gap-5"
            >
              <BookADemo />
              <a
                href="#how-it-works"
                className="group inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-base font-bold transition-colors duration-200 ease-out hover:bg-white/20"
              >
                <span className="bg-gradient-to-b from-[#21B1F1] to-[#A6C936] bg-clip-text text-transparent transition-colors group-hover:from-white group-hover:to-white">
                  See How It Works
                </span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
