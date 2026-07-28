"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  fadeUp,
  wipeTop,
  staggerFast,
  staggerContainer,
  EASE_SOFT,
} from "../anim";

// Slow ken-burns settle for the hero backdrop.
const heroBg = {
  hidden: { opacity: 0, scale: 1.08 },
  show: { opacity: 1, scale: 1, transition: { duration: 1.3, ease: EASE_SOFT } },
};

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-[#030c1e] min-h-[500px] md:min-h-[600px] lg:min-h-[754px] lg:h-[754px] flex flex-col"
      style={{ filter: "drop-shadow(0px 4px 125px rgba(10,75,110,0.2))" }}
    >
      {/* Main background — the orbital V-Watch illustration */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial="hidden"
        animate="show"
        variants={heroBg}
      >
        <Image
          src="/hero/about-us-hero.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-right sm:object-center"
          preload={true}
          loading="eager"
        />
      </motion.div>

      {/* Left circle overlay — mix-blend-overlay */}
      <div
        className="absolute hidden lg:block mix-blend-overlay pointer-events-none"
        style={{ left: "63px", top: "105px", width: "593px", height: "593px" }}
      >
        <div className="absolute" style={{ inset: "-30.02%" }}>
          <Image
            src="/about/hero-circle-left.png"
            alt=""
            fill
            className="object-contain"
            sizes="950px"
          />
        </div>
      </div>

      {/* Right circle overlay — mix-blend-overlay */}
      <div
        className="absolute hidden lg:block mix-blend-overlay pointer-events-none"
        style={{ left: "573px", top: "34px", width: "685px", height: "685px" }}
      >
        <div className="absolute" style={{ inset: "-29.2%" }}>
          <Image
            src="/about/hero-circle-right.png"
            alt=""
            fill
            className="object-contain"
            sizes="1100px"
          />
        </div>
      </div>

      {/* Left-side gradient — keeps text readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #030c1e 0%, #030c1e 25%, rgba(3,12,30,0.75) 45%, rgba(3,12,30,0.15) 65%, transparent 80%)",
        }}
      />

      {/* Content — vertically centered to match Figma */}
      <div className="relative z-10 flex-1 flex items-center w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[60px] py-[40px] lg:py-0">
        <motion.div
          className="flex flex-col gap-[20px] w-full max-w-[600px]"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          {/* Badge + Heading sub-group — gap-[14px] per Figma 1043:1905.
              Sub-stagger: the badge pops first, then the heading wipes in. */}
          <motion.div className="flex flex-col gap-[14px]" variants={staggerFast}>
            <motion.h1
              variants={wipeTop}
              className="text-[28px] sm:text-[38px] lg:text-[50px] font-black leading-[1.3] lg:leading-[68px] tracking-[1px] text-white"
              style={{ textShadow: "0px 4px 104px black" }}
            >
              Building the Future of Site Intelligence
            </motion.h1>
          </motion.div>

          {/* Description — gap-[20px] from the badge+heading group */}
          <motion.p
            className="text-[15px] sm:text-[17px] lg:text-[20px] font-bold leading-[1.6] lg:leading-[32px] text-white"
            style={{ textShadow: "0px 4px 104px black" }}
            variants={fadeUp}
          >
            V-Watch AI exists to help organizations gain complete visibility,
            control, and accountability across their operations from access and
            safety to workforce and execution.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
