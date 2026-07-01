"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";
import BookADemo from "@/components/common/BookADemo";

const HERO_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CURVE_DEFAULT_FILL =
  "M0 84 C33.33 103 66.67 103 100 84 L100 100 L0 100 Z";
const CURVE_DEFAULT_STROKE = "M0 84 C33.33 103 66.67 103 100 84";
const CURVE_SMALL_FILL = "M0 84 C33.33 90 66.67 90 100 84 L100 100 L0 100 Z";
const CURVE_SMALL_STROKE = "M0 84 C33.33 90 66.67 90 100 84";
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

// ─── Props ────────────────────────────────────────────────────────────────────

export type ProductsHeroProps = {
  badge?: string;
  badgeDotColor?: string;
  headingLines: [string, string, string];
  descriptionLines: [string, string, string];
  boldLine?: string;
  imageSrc: string;
  imageObjectPosition?: string;
  ctaSlot?: React.ReactNode;
  ctaDelay?: number;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProductsHero({
  // badge = "What V-Watch Ai",
  badgeDotColor = "#86D58B",
  // headingLines = ["One Platform", "Multiple Capabilities", "Total Control"],
  descriptionLines = [
    "V-Watch Ai brings together a suite of integrated capabilities",
    "that manage your workforce, operations, assets, and security",
    "all in one connected system.",
  ],
  // boldLine = "Start with what you need. Scale as you grow.",
  imageSrc = "/products/hero.png",
  imageObjectPosition = "bottom",
  ctaSlot,
  ctaDelay = 1.7,
}: Readonly<Partial<ProductsHeroProps>>) {
  const buttonReveal: Variants = {
    hidden: { opacity: 0, y: 12, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: ctaDelay, duration: 0.35, ease: HERO_EASE },
    },
  };

  const resolvedCta = ctaSlot ?? <BookADemo />;

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
              src={imageSrc}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[60%_center] sm:object-center"
            />
          </motion.div>
          {/* <div className="absolute inset-0 bg-gradient-to-r from-[#030515] from-5% via-[#030515]/55 via-45% to-transparent" /> */}

          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient
                id="hero-curve-stroke"
                x1="0"
                y1="0"
                x2="100"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#21B1F1" stopOpacity="0" />
                <stop offset="0.5" stopColor="#7ECFFA" stopOpacity="1" />
                <stop offset="1" stopColor="#21B1F1" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* deep curve — laptop (lg) and up */}
            <g className="max-lg:hidden">
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

            {/* shallow curve — below laptop (lg) */}
            <g className="lg:hidden">
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
          
        <div className="relative z-10 w-full px-[24px] lg:px-[60px] pt-[140px] pb-[110px] md:pb-[120px] lg:pb-[240px]">
          <motion.div
            className="flex mx-auto max-w-[1410px] max-h-[754px] flex-col justify-center gap-[30px]"
            initial="hidden"
            animate="show"
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3.5">
                {/* badge */}
                {/* <motion.span
                variants={badgeReveal}
                className="inline-flex w-fit items-center gap-[4px] rounded-full bg-white/10 px-[13px] py-[9px]"
              >
                <span className="size-[11px] rounded-full bg-[#86D58B]" />
                <span className="text-base font-bold leading-none text-white lg:text-[18px]">What V-Watch Ai</span>
              </motion.span> */}

                {/* Heading */}
                <h1 className="max-w-[642px] w-full text-[34px] font-black leading-[1.2] tracking-[0.5px] text-white sm:text-[44px] lg:text-[50px] lg:leading-[68px]">
                  <span className="block overflow-hidden">
                    <motion.span variants={lineReveal} className="block">
                      Manage Your People and The Work They Do
                    </motion.span>
                  </span>
                </h1>
              </div>

              {/* Description */}
              <p className="max-w-[561px] text-base font-bold leading-7 text-white lg:text-[20px] lg:leading-8">
                <motion.span
                  custom={0.8}
                  variants={copyReveal}
                  className="block"
                >
                  {descriptionLines[0]}
                </motion.span>
                <motion.span
                  custom={1.05}
                  variants={subLineReveal}
                  className="block"
                >
                  {descriptionLines[1]}
                </motion.span>
                <motion.span
                  custom={1.25}
                  variants={subLineReveal}
                  className="block"
                >
                  {descriptionLines[2]}
                </motion.span>
              </p>

              {/* {boldLine && (
                <motion.p
                  custom={1.45}
                  variants={copyReveal}
                  className="max-w-[561px] text-base font-bold leading-7 text-white lg:text-[20px] lg:leading-8"
                >
                  {boldLine}
                </motion.p>
              )} */}
            </div>

            {/* CTA */}
            <motion.div variants={buttonReveal} className="self-start">
              {resolvedCta}
            </motion.div>
          </motion.div>
        </div>
    
      </section>
    </MotionConfig>
  );
}
