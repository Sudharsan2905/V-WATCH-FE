"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";
import BookADemo from "@/components/common/BookADemo";

const HERO_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Bottom bezier divider. The curve enters both edges at y=84; the control-point
// depth sets how deep the belly dips. Default (>=425px) keeps the current deep
// curve; below 425px a shallower control depth flattens it to a small angle so
// it doesn't read as a steep scoop on narrow phones.
const CURVE_DEFAULT_FILL = "M0 84 C33.33 103 66.67 103 100 84 L100 100 L0 100 Z";
const CURVE_DEFAULT_STROKE = "M0 84 C33.33 103 66.67 103 100 84";
const CURVE_SMALL_FILL = "M0 84 C33.33 92 66.67 92 100 84 L100 100 L0 100 Z";
const CURVE_SMALL_STROKE = "M0 84 C33.33 92 66.67 92 100 84";
const CURVE_GLOWS = [
  { w: 6, o: 0.2 },
  { w: 3, o: 0.45 },
  { w: 1.5, o: 1 },
];

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
    transition: { delay: 1.7, duration: 0.35, ease: HERO_EASE },
  },
};

export default function ProductsHero() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-[#030515]">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: HERO_EASE }}
          >
            <Image
              src="/products/hero.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-bottom"
            />
          </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#030515] from-5% via-[#030515]/55 via-45% to-transparent" />

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="hero-curve-stroke" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#21B1F1" stopOpacity="0" />
              <stop offset="0.5" stopColor="#7ECFFA" stopOpacity="1" />
              <stop offset="1" stopColor="#21B1F1" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* deep curve — 425px and up */}
          <g className="max-[424px]:hidden">
            <path d={CURVE_DEFAULT_FILL} fill="#ffffff" />
            {CURVE_GLOWS.map(({ w, o }) => (
              <path
                key={w}
                d={CURVE_DEFAULT_STROKE}
                fill="none"
                stroke="url(#hero-curve-stroke)"
                strokeOpacity={o}
                strokeWidth={w}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>

          {/* shallow small-angle curve — below 425px */}
          <g className="min-[426px]:hidden">
            <path d={CURVE_SMALL_FILL} fill="#ffffff" />
            {CURVE_GLOWS.map(({ w, o }) => (
              <path
                key={w}
                d={CURVE_SMALL_STROKE}
                fill="none"
                stroke="url(#hero-curve-stroke)"
                strokeOpacity={o}
                strokeWidth={w}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1410px] px-6 lg:px-[60px] xl:px-[10px]">
        <motion.div
          className="flex min-h-[754px] flex-col justify-center gap-[30px] pt-[140px] pb-[240px]"
          initial="hidden"
          animate="show"
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3.5">
              {/* badge */}
              <motion.span
                variants={badgeReveal}
                className="inline-flex w-fit items-center gap-[4px] rounded-full bg-white/10 px-[13px] py-[9px]"
              >
                <span className="size-[11px] rounded-full bg-[#86D58B]" />
                <span className="text-[18px] font-bold leading-none text-white">What V-Watch Ai</span>
              </motion.span>

              <h1 className="w-[642px] max-w-full text-[50px] font-semibold leading-[68px] tracking-[0.5px] text-white">
                <span className="block overflow-hidden">
                  <motion.span custom={0.3} variants={lineReveal} className="block">
                    One Platform
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span custom={0.45} variants={lineReveal} className="block">
                    Multiple Capabilities
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span custom={0.6} variants={lineReveal} className="block">
                    Total Control
                  </motion.span>
                </span>
              </h1>
            </div>

            <p className="max-w-[561px] text-[21px] leading-8 text-white">
              <motion.span custom={0.8} variants={copyReveal} className="block">
                V-Watch Ai brings together a suite of integrated capabilities
              </motion.span>
              <motion.span custom={1.05} variants={subLineReveal} className="block">
                that manage your workforce, operations, assets, and security
              </motion.span>
              <motion.span custom={1.25} variants={subLineReveal} className="block">
                all in one connected system.
              </motion.span>
            </p>
            <motion.p
              custom={1.45}
              variants={copyReveal}
              className="max-w-[561px] text-[20px] font-semibold leading-8 text-white"
            >
              Start with what you need. Scale as you grow.
            </motion.p>
          </div>

          <motion.div variants={buttonReveal} className="self-start">
            <BookADemo />
          </motion.div>
        </motion.div>
      </div>
      </section>
    </MotionConfig>
  );
}
