"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay },
  }),
};

const VIEWPORT = { once: true, amount: 0.25, margin: "0px 0px -100px 0px" } as const;

const STEPS = [
  {
    icon: "/hrms-new/three-steps/Register.webp",
    title: "Register Your Company",
    description: "Complete the short registration form before 31st December 2026.",
  },
  {
    icon: "/hrms-new/three-steps/Activate.webp",
    title: "Activate Your HRMS Account",
    description:
      "Our team will contact you and help activate your company's full HRMS access.",
  },
  {
    icon: "/hrms-new/three-steps/Use.webp",
    title: "Use It Free for Two Months",
    description:
      "Add your employees and start managing attendance, payroll, leave, claims and employee records.",
  },
];

export default function HrmsGetStarted() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-[#F2F8FE] px-6 py-14 lg:px-15 lg:py-20">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="flex flex-col gap-2"
          >
            <motion.h2
              variants={fadeUp}
              custom={0.05}
              className="font-lato text-[26px] font-bold leading-[1.25] text-[#0A4B6E] sm:text-[30px]"
            >
              Get Started in Three Simple Steps
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.12}
              className="font-lato  font-normal text-[15px] leading-[24px] text-[#0A4B6E] sm:text-[20px]"
            >
              A simpler way to start. A smarter way to manage your workforce.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="relative mx-auto grid w-full max-w-[1000px] grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-6"
          >
            {/* Wavy connector spanning all three steps as one SVG path,
                rather than per-pair segments — desktop only, since the 3
                columns stack on smaller screens. The path's x-coordinates
                (200/600/1000 of a 1200-wide viewBox) line up with the three
                evenly-spaced column centers; preserveAspectRatio="none" lets
                it stretch to the actual grid width instead of being
                letterboxed. back-shadow.webp (an almost-white wash) used to
                sit here but was invisible against the section background.
                top-[55px] (half the 110px circle) instead of top-1/2 — the
                column also holds title+description below the circle, so
                centering on the whole column's height (which varies with
                description length) dragged the wave down toward the text
                instead of through the circles' centers. */}
            <div className="pointer-events-none absolute inset-x-0 top-[65px] hidden w-full -translate-y-1/2 lg:block">
              <svg
                viewBox="0 0 1200 220"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden
                className="h-[180px] w-full"
              >
                <defs>
                  <linearGradient
                    id="hrmsStepsWave"
                    x1="0"
                    y1="0"
                    x2="1200"
                    y2="0"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="50%" stopColor="#22D3EE" />
                    <stop offset="100%" stopColor="#38BDF8" />
                  </linearGradient>
                </defs>
                <path
                  d="M200 110 C320 40 480 180 600 110 C720 40 880 180 1000 110"
                  stroke="url(#hrmsStepsWave)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                custom={0.1 + i * 0.12}
                className="relative z-10 flex flex-col items-center gap-4 text-center"
              >
                {/* A real circular badge (not the icon asset's own rounded-
                    square card) — the webp is inset smaller inside it so the
                    square card reads as the icon's artwork, not the badge
                    shape itself. Number overlaps its top-right edge. */}
                <div className="relative h-[130px] w-[130px]">
                  <div className="absolute inset-0 rounded-full bg-white shadow-[0_14px_30px_rgba(10,75,110,0.16)]" />
                  <div className="absolute inset-[16px] overflow-hidden rounded-full">
                    <Image
                      src={step.icon}
                      alt=""
                      aria-hidden
                      fill
                      unoptimized
                      sizes="98px"
                      className="object-contain"
                    />
                  </div>
                  {/* Built directly instead of using one/two/three.svg —
                      that asset's visible 44px circle sat off-center in a
                      207x207 canvas, which made positioning it accurately
                      fragile (got it wrong twice: once shrunk to ~12px,
                      once dropped by an invalid Tailwind arbitrary class).
                      A plain circle is trivial to place exactly. */}
                  <span
                    aria-hidden
                    className="absolute -right-2.5 -top-2.5 flex h-11 w-11 items-center justify-center rounded-full border border-[#8ED0F5] bg-white font-lato text-[14px] font-bold text-[#0A8EC8] shadow-[0_4px_10px_rgba(10,75,110,0.14)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-lato text-[18px] font-bold text-[#0F172A]">
                    {step.title}
                  </h3>
                  <p className="max-w-[280px] font-lato text-[18px] font-normal leading-[20px] text-[#314158]">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={fadeUp}
            custom={0.5}
            className="mx-auto max-w-[640px] text-center font-lato text-[17px] font-semibold leading-[22px] text-[#006F9F]"
          >
            At the end of the free period, you can choose whether to continue
            for RM5 per subscribed employee each month.
          </motion.p>
        </div>
      </section>
    </MotionConfig>
  );
}
