"use client";

import Image from "next/image";
import { motion } from "motion/react";
import BookADemo from "@/components/common/BookADemo";
import {
  fadeUp,
  wipeTop,
  staggerFast,
  staggerContainer,
  EASE_SOFT,
} from "@/components/about/anim";

// Slow ken-burns settle for the hero backdrop — mirrors the About hero so the
// whole site shares one entrance language.
const heroBg = {
  hidden: { opacity: 0, scale: 1.08 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.3, ease: EASE_SOFT },
  },
};

export default function HeroSection() {
  return (
    <section
      className="z-10 relative overflow-hidden bg-[#030c1e] min-h-[500px] md:min-h-[600px] lg:min-h-[754px] lg:h-[754px] flex flex-col"
      style={{ filter: "drop-shadow(0px 4px 125px rgba(10,75,110,0.2))" }}
    >
      {/* Main background — visitor-access illustration. */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial="hidden"
        animate="show"
        variants={heroBg}
      >
        <Image
          src="/visitor-management/hero/visitor-management-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right sm:object-center"
        />
      </motion.div>

      {/* Left-side gradient — keeps the copy readable over the artwork */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #030c1e 0%, #030c1e 25%, rgba(3,12,30,0.75) 45%, rgba(3,12,30,0.15) 65%, transparent 80%)",
        }}
      />

      {/* Content — vertically centered */}
      <div className="relative z-10 flex-1 flex items-center w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[60px] py-[80px] lg:py-0">
        <motion.div
          className="flex flex-col w-full max-w-[600px]"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <motion.div
            className="flex flex-col gap-[14px]"
            variants={staggerFast}
          >
            <motion.h1
              variants={wipeTop}
              className="text-[28px] sm:text-[38px] lg:text-[50px] font-black leading-[1.3] lg:leading-[68px] tracking-[1px] text-white"
              style={{ textShadow: "0px 4px 104px black" }}
            >
              Streamline Visitor Access with Full Visibility and Control
            </motion.h1>
          </motion.div>

          <motion.p
            className="text-[15px] mt-[10px] md:mt-[20px] sm:text-[17px] lg:text-[20px] font-bold leading-[1.6] lg:leading-[32px] text-white"
            style={{ textShadow: "0px 4px 104px black" }}
            variants={fadeUp}
          >
            Manage, verify, and track every visitor entering your operations
            from pre-registration to exit ensuring security, efficiency, and
            complete accountability without manual processes.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-[10px] md:mt-[30px]">
            <BookADemo />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
