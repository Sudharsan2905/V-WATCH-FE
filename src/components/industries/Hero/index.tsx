"use client";

import BookADemo from "@/components/common/BookADemo";
import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const badgeReveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.15, duration: 0.3, ease: EASE },
  },
};

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
    transition: { delay: 1.3, duration: 0.35, ease: EASE },
  },
};

type HeroContent = {
  badge?: string;
  heading?: string;
  subtitle?: string;
  bgImage?: string;
};

export default function IndustriesHero({
  hero = {},
}: Readonly<{ hero?: HeroContent }> = {}) {
  const {
    badge = "What V-Watch Ai",
    heading = "Built for Any Environment That Demands Control",
    subtitle = "V-Watch Ai is designed for complex, high-activity environments where visibility, safety, and operational control are critical from construction sites to data centers and beyond.",
    bgImage = "/industry/hero-bg.png",
  } = hero;

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative min-h-[600px] overflow-hidden bg-[#030515] lg:min-h-[754px]">
        {/* Background image */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 h-[828px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <Image
            src={bgImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-fill"
          />
        </motion.div>

        {/* White wave curve — section-level so it is never inside the fading bg div
            and cannot flash. Mirrors the Industry Hub hero pattern. */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-12 w-full lg:h-[154px]"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <path d="M0 0 Q720 100 1440 0 L1440 100 L0 100 Z" fill="#f5fbff" />
        </svg>

        {/* 2-px strip: seals any subpixel gap between sections so no dark edge bleeds through */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[2px] bg-[#f5fbff]" />

        {/* Glow circles — desktop only */}
        <motion.div
          className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
        >
          <div
            className="absolute mix-blend-overlay"
            style={{ left: "514px", top: "-152px", width: "1008px", height: "1008px" }}
          >
            <Image src="/industry/hero-circle-right.svg" alt="" fill unoptimized />
          </div>
          <div
            className="absolute mix-blend-overlay"
            style={{ left: "-205px", top: "-150px", width: "1085px", height: "1085px" }}
          >
            <Image src="/industry/hero-circle-left.svg" alt="" fill unoptimized />
          </div>
          <div
            className="absolute"
            style={{ left: "50px", top: "90px", width: "705px", height: "705px" }}
          >
            <Image src="/industry/hero-circle-center.svg" alt="" fill unoptimized />
          </div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-[1410px] px-6 lg:px-[60px]">
          <motion.div
            className="flex min-h-[560px] flex-col items-start justify-center gap-6 py-24 sm:py-28 lg:min-h-[754px] lg:gap-[30px] lg:py-[140px]"
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
                <span className="whitespace-nowrap text-[16px] font-semibold leading-none text-white sm:text-[18px]">
                  {badge}
                </span>
              </motion.div>
              <h1 className="w-[642px] max-w-full text-[32px] font-black leading-[40px] tracking-[1px] text-white sm:text-[40px] sm:leading-[52px] lg:text-[50px] lg:leading-[68px]">
                <span className="block overflow-hidden">
                  <motion.span custom={0.3} variants={lineReveal} className="block">
                    {heading}
                  </motion.span>
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="w-[561px] max-w-full text-[16px] font-bold leading-7 text-white sm:text-[18px] lg:text-[20px] lg:leading-8">
              <motion.span custom={0.65} variants={copyReveal} className="block">
                {subtitle}
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
