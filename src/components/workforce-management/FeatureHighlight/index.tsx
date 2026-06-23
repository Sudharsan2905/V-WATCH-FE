"use client";

import Image from "next/image";
import { motion, MotionConfig } from "motion/react";
import { wipeTop, fadeUp, loadIn, staggerContainer, viewportReveal } from "@/components/about/anim";

const FEATURES = [
  {
    number: "01",
    title: "Attendance & Time Tracking",
    description:
      "Automatically capture working hours, shifts, and attendance using real-time data.",
    image: "/workforce/featureCard.webp",
  },
];

const CARD_SHADOW = "0 4px 32px 0 rgba(0,117,180,0.06)";

export default function FeatureHighlight() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        className="px-6 pb-4 pt-4 lg:px-[60px]"
        style={{
          background: "linear-gradient(180deg, #F8FCFF 0%, #EBF5FE 55%, #F8FCFF 100%)",
          maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
        }}
      >
        <motion.div
          className="mx-auto flex w-full max-w-[1410px] flex-col gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportReveal}
        >
          {FEATURES.map(({ number, title, description, image }, i) => (
            <motion.div
              key={number}
              variants={fadeUp}
              className="relative flex flex-col items-center gap-6 rounded-3xl p-6 sm:flex-row sm:gap-8 sm:p-8"
              style={{ boxShadow: CARD_SHADOW }}
            >
              {/* White background that fades right — image sits above this */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl bg-white"
                style={{
                  maskImage: "linear-gradient(to right, black 50%, transparent 85%)",
                  WebkitMaskImage: "linear-gradient(to right, black 50%, transparent 85%)",
                }}
              />
              {/* Left — number + text */}
              <div className="relative z-10 flex flex-1 items-start gap-5 sm:gap-6">
                {/* Large number */}
                <motion.span
                  variants={wipeTop}
                  custom={i * 0.1}
                  className="shrink-0 font-lato text-[72px] font-extrabold leading-none text-[#3DA9F5] sm:text-[88px]"
                >
                  {number}
                </motion.span>

                {/* Title + description */}
                <div className="flex flex-col gap-1.5 rounded-2xl bg-gradient-to-r from-[#E4F3FB]/80 to-transparent px-4 py-3">
                  <motion.h3
                    variants={fadeUp}
                    custom={0.1 + i * 0.1}
                    className="font-lato text-[18px] font-bold leading-snug text-[#0A4B6E] sm:text-[20px]"
                  >
                    {title}
                  </motion.h3>
                  <motion.p
                    variants={fadeUp}
                    custom={0.2 + i * 0.1}
                    className="max-w-[380px] font-lato text-[14px] leading-[22px] text-[#5E7C95] sm:text-[15px]"
                  >
                    {description}
                  </motion.p>
                </div>
              </div>

              {/* Right — image fully visible, above the fading background */}
              <motion.div
                variants={loadIn}
                custom={0.15 + i * 0.1}
                className="relative z-10 aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl sm:w-[260px]"
              >
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(min-width: 640px) 260px, 100vw"
                  className="object-cover z-10"
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </MotionConfig>
  );
}
