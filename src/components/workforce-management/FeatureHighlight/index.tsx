"use client";

import Image from "next/image";
import { motion, MotionConfig } from "motion/react";
import {
  wipeTop,
  fadeUp,
  loadIn,
  staggerContainer,
} from "@/components/about/anim";

// `amount` is the fraction of the *whole* stagger container that must be in
// view before the reveal fires. The container holds all four feature cards, so
// it's taller than the viewport — a high `amount` (0.3+) can never be satisfied
// and the whole section stays in its `hidden` state (opacity 0), rendering
// blank. Keep it low so the first card scrolling in triggers the staggered
// reveal. The negative bottom margin still delays the trigger slightly so the
// entrance isn't finished before the section is really on screen under Lenis.
const VIEWPORT = {
  once: true,
  amount: 0.1,
  margin: "0px 0px -120px 0px",
} as const;

const FEATURES = [
  {
    number: "01",
    title: "Attendance & Time Tracking",
    description:
      "Automatically capture working hours, shifts, and attendance using real-time data.",
    image: "/workforce/featureCard1.svg",
  },
  {
    number: "02",
    title: "Payroll Automation",
    description:
      "Calculate salaries based on actual manhours, overtime, and workforce activity.",
    image: "/workforce/featureCard2.svg",
  },
  {
    number: "03",
    title: "Claims Management",
    description:
      "Submit, track, and approve claims within a structured workflow.",
    image: "/workforce/featureCard3.svg",
  },
  {
    number: "04",
    title: "Leave Management",
    description:
      "Manage leave requests, approvals, and balances in one system.",
    image: "/workforce/featureCard4.svg",
  },
];

// Each card should read as "lifted from the top, merged into the page at the
// bottom": a soft shadow above/around the rounded top edge (negative Y offset,
// negative spread so it stays near the top and doesn't bleed downward), and a
// white background that fades to transparent so the bottom edge dissolves into
// whatever surface is behind it (#F2F8FE here).
const CARD_STYLE = {
  background:
    "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 45%, rgba(255,255,255,0) 100%)",
  boxShadow: "0 -14px 34px -12px rgba(0,117,180,0.16)",
} as const;

export default function FeatureHighlight() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden px-6 pb-4 pt-4 lg:px-[60px]">
        <div
          aria-hidden
          className="z-100 pointer-events-none absolute left-1/2 bottom-[0px] -translate-x-1/2"
          style={{
            width: "700px",
            height: "180px",
            background:
              "radial-gradient(ellipse at center, rgba(213,191,255,0.55) 0%, rgba(213,191,255,0.28) 35%, rgba(213,191,255,0) 100%)",
            filter: "blur(6px)",
          }}
        />

        <motion.div
          className="mx-auto flex w-full max-w-[1410px] flex-col gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-[100px]"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #ffffff 75%, #ffffff 100%)",
            }}
          />
          {FEATURES.map(({ number, title, description, image }, i) => (
            <motion.div
              key={number}
              variants={fadeUp}
              className="relative flex flex-col items-center gap-6 rounded-t-3xl p-6 sm:flex-row sm:gap-8 sm:p-8"
              style={CARD_STYLE}
            >
              {/* White background that fades right — image sits above this */}

              {/* Left — number + text */}
              <div className="relative z-10 flex flex-1 items-start gap-5 sm:gap-6">
                {/* Large number */}
                <motion.span
                  variants={wipeTop}
                  custom={i * 0.1}
                  className="shrink-0 font-lato text-[40px] my-auto font-extrabold leading-none text-[#3DA9F5] md:text-[88px]"
                >
                  {number}
                </motion.span>

                {/* Title + description */}
                <div className="flex flex-col gap-1.5 rounded-2xl bg-gradient-to-r from-[#B5E4FC82]/80 to-transparent px-4 py-3">
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
                className="relative z-10 aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl sm:w-[360px] h-[260px]"
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
