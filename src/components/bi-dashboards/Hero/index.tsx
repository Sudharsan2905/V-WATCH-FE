"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";
import BookADemo from "@/components/common/BookADemo";

// "See Your Operations Clearly With Real-Time BI Dashboards"
// Full-bleed dark hero — the globe + glowing bar-chart artwork lives in the
// background image; the copy sits in the dark space on the left.

const HERO_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];


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

const buttonReveal: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay, duration: 0.35, ease: HERO_EASE },
  }),
};

export default function BiDashboardsHero() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative min-h-[600px] overflow-hidden bg-[#030515] lg:min-h-[754px]">
        {/* Background artwork */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: HERO_EASE }}
        >
          <Image
            src="/bi-dashboards/bi-dashboards-hero.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[72%_center]"
            loading="eager"
          />
         
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/40 sm:to-black/15" />

        </motion.div>

        {/* Content */}
        <div className="relative z-10 w-full px-6 lg:px-[60px]">
          <div className="mx-auto flex max-w-[1410px]">

         
          <motion.div
            className="flex flex-col justify-center gap-[30px] pt-[150px] pb-[100px] lg:min-h-[754px] lg:max-w-[680px] lg:py-[140px]"
            initial="hidden"
            animate="show"
          >
            {/* Badge */}
            {/* <motion.span
              variants={badgeReveal}
              className="inline-flex w-fit items-center gap-[8px] rounded-full border border-white/15 bg-linear-to-b from-white/20 to-white/5 px-[14px] py-[9px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_8px_24px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md"
            >
              <span className="size-[10px] rounded-full bg-[#86D58B] shadow-[0_0_8px_2px_rgba(134,213,139,0.6)]" />
              <span className="text-base leading-none text-white">V-Watch Interface</span>
            </motion.span> */}

            {/* Heading */}
            <h1 className="text-[34px] font-semibold leading-[1.18] tracking-[0.5px] text-white sm:text-[44px] lg:text-[52px] lg:leading-[1.2]">
              <span className="block overflow-hidden">
                <motion.span custom={0.3} variants={lineReveal} className="block">
                  See Your Operations Clearly With Real-Time
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span custom={0.45} variants={lineReveal} className="block">
                  BI Dashboards
                </motion.span>
              </span>
            </h1>

            {/* Description */}
            <motion.p
              custom={0.7}
              variants={copyReveal}
              className="max-w-[560px] text-base font-semibold leading-7 text-white lg:text-[20px] lg:leading-8"
            >
              V-Watch AI leverages Microsoft Power BI to transform real-time
              operational data into clear, actionable dashboards giving you full
              visibility across workforce, operations, assets, and movement.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={1.1}
              variants={buttonReveal}
              className="flex flex-wrap items-center gap-4"
            >
              <BookADemo />
              {/* <Link
                href="#intelligence-layer"
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/40 bg-white px-5 text-base font-bold text-[#516413] backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
              >
                Explore Platform
              </Link> */}
            </motion.div>
          </motion.div>
           </div>
        </div>
      </section>
    </MotionConfig>
  );
}
