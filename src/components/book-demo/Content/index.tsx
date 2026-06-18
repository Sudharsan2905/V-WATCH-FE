"use client";

import { motion, MotionConfig, type Variants } from "motion/react";
import ExpectSection from "../ExpectSection";
import DemoForm from "../DemoForm";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fromLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE, delay: 0.1 } },
};

const fromRight: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 0.2 } },
};

export default function BookDemoContent() {
  return (
    <MotionConfig reducedMotion="user">
    <section className="relative z-20 mt-0 pb-4 lg:-mt-[240px]">
      {/* White section background.
          Mobile: covers the full section from the top.
          Desktop: starts 180px (= 340 - 160) below the section top so the
          hero's dark bg remains visible behind the floating form card. */}
      <div
        className="absolute inset-x-0 bottom-0 top-0 rounded-t-[32px] lg:top-[150px]"
        style={{ background: "linear-gradient(180deg, #EBF5FF 100%, #F2F8FE 100%, #FFFFFF 100%)" }}
      />

      <div className="relative mx-auto max-w-[1160px] px-4 sm:px-6">
        <motion.div
          className="flex flex-col gap-8 lg:grid lg:grid-cols-[1fr_1.5fr] lg:items-start lg:gap-[30px]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Left: What to expect — pushed down to align with the white section start */}
          <motion.div variants={fromLeft} className="order-2 lg:order-1 lg:pt-[180px] lg:max-w-[412px]">
            <ExpectSection />
          </motion.div>

          {/* Right: Demo form — starts near the section top so it floats ~148px
              into the hero area above the white section */}
          {/* <div className="order-1 lg:order-2 lg:max-w-[718px] lg:pt-8 s:mt-10"> */}
          <motion.div variants={fromRight} className="order-1 mt-5 lg:mt-0 lg:order-2 lg:max-w-[718px] lg:pt-8">
            <DemoForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
    </MotionConfig>
  );
}
