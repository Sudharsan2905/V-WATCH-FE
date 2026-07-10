"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];


const headingReveal: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.3, duration: 0.6, ease: EASE },
  },
};

const copyReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5, ease: EASE },
  }),
};

export default function BookDemoHero() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative z-0 overflow-hidden bg-[#030515] pt-[60px] pb-20 lg:h-[754px] lg:pb-0">
        {/* Left panel — dotted-wave navy backdrop on the left of the globe */}
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/book-a-demo/left_hero_image.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-left-top"
          />
        </div>

        {/* Globe illustration — large & vertically centered on the right (lg+) */}
        <motion.div
          className="pointer-events-none absolute inset-0 lg:left-[12%] lg:-right-[40px] xl:right-[80px] xl:top-[100px] lg:inset-y-0"
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1.08 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <Image
            src="/book-a-demo/header.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-right-top lg:object-right"
          />
        </motion.div>

        {/* Bottom fade so content section blends in */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#030515] to-transparent" />
        {/* Blue ambient glow */}
        <div className="pointer-events-none absolute left-0 top-1/3 h-80 w-72 -translate-x-1/2 rounded-full bg-[#0a8ec8] opacity-20 blur-[150px]" />

        {/* Content */}
        <div className="relative mx-auto max-w-[1280px] px-6 pt-16 sm:pt-20 lg:px-[60px] lg:pt-24">
          <motion.div className="max-w-[650px]" initial="hidden" animate="show">
            {/* Live demo badge */}

            {/* Heading */}
            <motion.p
              variants={headingReveal}
              className="mb-5 text-[30px] font-lato font-[900] font-black leading-tight text-white sm:text-[46px] lg:text-[50px]"
            >
              See V-Watch AI in Action
            </motion.p>

            {/* Bold intro line */}
            <motion.p
              variants={copyReveal}
              custom={0.5}
              className="mb-4 text-[14px] font-lato font-[700] font-bold leading-[1.7] text-white sm:text-[20px] sm:leading-[1.75]"
            >
              Get a personalized walkthrough of how V-Watch AI can help you
              improve visibility, strengthen compliance, and take full control of
              your operations.
            </motion.p>

            {/* Secondary line */}
            <motion.p
              variants={copyReveal}
              custom={0.65}
              className="mb-8 text-[14px] font-lato font-[700] leading-[1.7] text-white sm:text-[20px] sm:leading-[1.75]"
            >
              Speak with a consultant within 24 hours and get access to a 14-day
              guided demo.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
