"use client";

import BookADemo from "@/components/common/BookADemo";
import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const lineReveal: Variants = {
  hidden: { opacity: 0, y: "115%", filter: "blur(6px)" },
  show: (delay: number) => ({
    opacity: 1,
    y: "0%",
    filter: "blur(0px)",
    transition: { delay, duration: 0.3, ease: EASE },
  }),
};

const copyReveal: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)", filter: "blur(3px)" },
  show: (delay: number) => ({
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    filter: "blur(0px)",
    transition: { delay, duration: 0.3, ease: EASE },
  }),
};

const buttonReveal: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.95, duration: 0.35, ease: EASE },
  },
};

type HeroContent = {
  heading?: string;
  subtitle?: string;
  bgImage?: string;
};

export default function PreConstructionHero({
  hero = {},
  showCurve = true,
}: Readonly<{ hero?: HeroContent; showCurve?: boolean }> = {}) {
  const {
    heading = "V-Watch Atlas",
    subtitle = "The integrated intelligence platform that maps every worker, vehicle, asset, and operation across your project giving you real-time visibility, coordination, and control from day one.",
    bgImage = "/pre-construction/hero/pre-construction.png",
  } = hero;

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative min-h-[560px] h-full overflow-hidden bg-[#030515] lg:min-h-[832px]">
        {/* Background image — full-bleed construction visualisation. On small
            screens the scene is anchored to the right so the left copy stays
            over the darker area; on large screens it covers the full hero. */}
        {/* Rendered statically (no opacity fade) so the LCP background paints on
            the first frame instead of waiting for JS hydration — the fade was
            defeating `priority` and inflating LCP. The heading/copy animations
            below are unchanged. */}
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={bgImage}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-right sm:object-fill"
          />
          {/* Left-to-right dark scrim for text legibility. The bg is a bright
              blue construction render whose crane/grid lines cut right through
              where the heading + subtitle sit, washing out the white copy
              (worst on mobile, where the text spans most of the width). This
              darkens the left/centre — strongly across more of the width on
              mobile since the copy is nearly full-bleed there, fading to clear
              on the right from sm up where the copy is left-anchored and the
              scene should show through. */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030515]/90 via-[#030515]/65 to-[#030515]/25 sm:via-[#030515]/40 sm:to-transparent" />
        </div>

        {/* White wave curve — section-level so it is never inside the fading bg
            div and cannot flash. Mirrors the Industries hero pattern. Omitted on
            pages whose design has a flat hero edge (e.g. geofencing). */}
        {showCurve && (
          <>
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-12 w-full lg:h-[100px]"
              viewBox="0 0 1440 100"
              preserveAspectRatio="none"
              fill="none"
            >
              <path d="M0 0 Q720 100 1440 0 L1440 100 L0 100 Z" fill="#f5fbff" />
            </svg>

            {/* 2-px strip: seals any subpixel gap between sections so no dark edge
                bleeds through. */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[2px] bg-[#f5fbff]" />
          </>
        )}

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-[1410px] px-6 lg:px-[60px]">
          <motion.div
            className="flex min-h-[560px] flex-col items-start justify-center py-10 sm:py-14 lg:max-h-[754px] lg:justify-start lg:py-[195px]"
            initial="hidden"
            animate="show"
          >
            {/* Heading — Figma: Lato ExtraBold(800→mapped to Black/900, the
                nearest loaded weight), 50px / 68px line-height, 2% tracking.
                Scaled down for mobile so it never overflows. */}
            <h1 className="max-w-[675px] text-[34px] font-black leading-[44px] tracking-[0.02em] text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.55)] sm:text-[42px] sm:leading-[56px] lg:text-[50px] lg:leading-[68px]">
              <span className="block overflow-hidden pb-[0.12em]">
                <motion.span custom={0.3} variants={lineReveal} className="block">
                  {heading}
                </motion.span>
              </span>
            </h1>

            {/* Subtitle — Figma: Lato Bold(700), 20px / 32px line-height, 0%
                tracking, #FFFFFF. Scaled down for mobile. */}
            <p className="mt-[20px] max-w-[561px] text-[16px] font-bold leading-7 tracking-normal text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.55)] sm:text-[18px] lg:text-[20px] lg:leading-8">
              <motion.span custom={0.65} variants={copyReveal} className="block">
                {subtitle}
              </motion.span>
            </p>

            {/* CTA button */}
            <motion.div
              variants={buttonReveal}
              className="flex flex-wrap items-center gap-5 mt-[30px]"
            >
              <BookADemo />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
