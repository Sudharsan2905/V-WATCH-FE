"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, MotionConfig, type Variants } from "motion/react";
import BookADemo from "@/components/common/BookADemo";

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

export default function AIPlatformHero() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative min-h-[600px] overflow-hidden bg-[#030515] lg:min-h-[754px]">
        {/* Background: dark city night scene */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: HERO_EASE }}
        >
          <Image
            src="/ai-platform/ai-platform-hero.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-[1410px] px-6 lg:px-[60px]">
          <motion.div
            className="flex flex-col justify-center gap-[30px] pt-[150px] pb-[100px] lg:min-h-[754px] lg:max-w-[700px] lg:py-[140px]"
            initial="hidden"
            animate="show"
          >
            {/* Heading */}
            <h1 className="text-[34px] font-semibold leading-[1.2] tracking-[0.5px] text-white sm:text-[44px] lg:text-[50px] lg:leading-[68px]">
              <span className="block overflow-hidden">
                <motion.span custom={0.3} variants={lineReveal} className="block">
                  One Platform to Run Your Entire Operation
                </motion.span>
              </span>
            </h1>

            {/* Description */}
            <motion.p
              custom={0.6}
              variants={copyReveal}
              className="max-w-140 text-base leading-7 font-semibold text-white lg:text-[20px] lg:leading-8"
            >
              V-Watch Ai is an AI-driven operations platform that connects your
              people, processes, assets, and environments giving you real-time
              visibility, automation, and control across every part of your
              business.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={1}
              variants={buttonReveal}
              className="flex flex-wrap items-center gap-4"
            >
              <BookADemo />
              <Link
                href="#use-cases"
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/40 bg-white px-5 text-base font-bold text-[#516413] hover:text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                Explore Use Cases
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
