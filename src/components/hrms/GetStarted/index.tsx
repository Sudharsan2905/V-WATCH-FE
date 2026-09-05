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
    description: "Complete the short registration form before 15 September 2026.",
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
              className="font-lato text-[15px] leading-[24px] text-[#0A6FA8] sm:text-[16px]"
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
            {/* back-shadow.webp is the wavy connector spanning all three
                steps as one image, rather than per-pair SVG paths — desktop
                only, since the 3 columns stack on smaller screens. Locked to
                its own aspect-[1280/521] rather than a plain `fill`, so it
                scales in lockstep with width instead of being object-contain
                letterboxed inside a taller/shorter grid row — which was
                throwing its wave peaks out of alignment with the circles. */}
            <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden aspect-[1280/521] w-full -translate-y-1/2 lg:block">
              <Image
                src="/hrms-new/three-steps/back-shadow.webp"
                alt=""
                aria-hidden
                fill
                unoptimized
                sizes="1000px"
                className="select-none object-contain"
              />
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
                <div className="relative h-[110px] w-[110px]">
                  <div className="absolute inset-0 rounded-full bg-white shadow-[0_14px_30px_rgba(10,75,110,0.16)]" />
                  <div className="absolute inset-[16px]">
                    <Image
                      src={step.icon}
                      alt=""
                      aria-hidden
                      fill
                      unoptimized
                      sizes="80px"
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
                    className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full border border-[#8ED0F5] bg-white font-lato text-[12px] font-bold text-[#0A8EC8] shadow-[0_4px_10px_rgba(10,75,110,0.14)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-lato text-[16px] font-bold text-[#0A4B6E]">
                    {step.title}
                  </h3>
                  <p className="max-w-[280px] font-lato text-[13.5px] leading-[20px] text-[#5C7E97]">
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
            className="mx-auto max-w-[640px] text-center font-lato text-[14px] font-semibold leading-[22px] text-[#0A6FA8]"
          >
            At the end of the free period, you can choose whether to continue
            for RM5 per subscribed employee each month.
          </motion.p>
        </div>
      </section>
    </MotionConfig>
  );
}
