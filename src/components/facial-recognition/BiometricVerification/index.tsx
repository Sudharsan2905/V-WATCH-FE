"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const wipeDown: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  show: (delay = 0) => ({
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { delay, duration: 0.6, ease: EASE },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay },
  }),
};

const FEATURES = [
  {
    icon: "/facial-recognition/Presentation1.png",
    label: "Instant identity verification",
  },
  {
    icon: "/facial-recognition/Presentation2.png",
    label: "Fraud prevention and full accountability",
  },
  {
    icon: "/facial-recognition/Presentation3.png",
    label: "Faster entry with no physical touchpoints",
  },
  {
    icon: "/facial-recognition/Presentation4.png",
    label: "Real-time access control across locations",
  },
];

function FeatureCard({
  icon,
  label,
  delay,
}: {
  icon: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      className="h-full rounded-[20px] p-1.5"
      style={{
        background: "#E5F4FE",
      }}
    >
      {/* Inner card */}
      <div
        className="flex h-full flex-col gap-2.5 rounded-[20px] p-4"
        style={{
          background: "#B8E6FF33 padding-box, linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 100%) border-box",
          border: "1px solid transparent",
          boxShadow: "0 1px 2px rgba(184,230,255,0.20), inset 0 -6px 23px rgba(212,240,255,0.10)",
        }}
      >
        {/* Icon — Presentation*.png already contains the full icon graphic */}
        <div className="relative h-16 w-24 shrink-0">
          <Image src={icon} alt="" fill className="object-contain" />
        </div>

        <p className="text-[18px] font-normal leading-6 text-[#1D293D]">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

export default function BiometricVerification() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative z-10 -mt-8 lg:-mt-16">
        <div
          className="overflow-hidden rounded-t-[28px]"
          style={{ background: "#EDF7FF" }}
        >
          <div className="mx-auto max-w-[1280px] px-6 py-8 sm:px-8 sm:py-8 lg:px-15 lg:py-10">
            {/* Section header */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2
                variants={wipeDown}
                custom={0.05}
                className="text-[22px] font-bold leading-8 text-[#0A4B6E] sm:text-[26px] sm:leading-9"
              >
                Biometric verification you can trust
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={0.2}
                className="mt-3 max-w-170 text-[20px] leading-7 text-[#0A4B6E] font-normal"
              >
                V-Watch Ai uses facial recognition to ensure every individual is
                verified before access is granted linking identity directly to
                your operational system.
              </motion.p>
            </motion.div>

            {/* Content row — feature grid left, image right */}
            <motion.div
              className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.12 }}
            >
              {/* Left: 2×2 feature grid */}
              <div
                className="relative grid grid-cols-2 gap-3 lg:grid-rows-2 lg:gap-6 lg:flex-[630_1_0%] lg:h-[316px]"
                style={{
                  background:
                    "radial-gradient(ellipse 50% 50% at center, rgba(5,133,190,0.75) 0%, rgba(30,155,210,0.55) 20%, rgba(100,195,245,0.30) 45%, rgba(180,225,255,0.10) 68%, transparent 88%)",
                  borderRadius: 16,
                }}
              >
                {FEATURES.map((f, i) => (
                  <FeatureCard key={f.label} {...f} delay={0.25 + i * 0.1} />
                ))}
              </div>

              {/* Right: facial recognition visualization with caption */}
              <motion.div
                variants={fadeUp}
                custom={0.2}
                className="relative mx-auto aspect-[506/316] w-full max-w-[506px] overflow-hidden rounded-[27.69px] border-2 border-white bg-[#F4FBFF]/60 p-2.5 lg:mx-0 lg:aspect-auto lg:h-[316px] lg:w-auto lg:flex-[506_1_0%]"
              >
                {/* Blue glow peeking through the 10px padding gap at the
                    top-center and bottom-center, behind the inner image. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 z-0 mx-auto h-[26px] w-[45%] -translate-y-1/2 rounded-full bg-[#21B1F1] opacity-80 blur-[16px]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-0 mx-auto h-[26px] w-[45%] translate-y-1/2 rounded-full bg-[#21B1F1] opacity-80 blur-[16px]"
                />

                <div className="relative z-10 h-full w-full overflow-hidden rounded-[16px]">
                  <Image
                    src="/facial-recognition/Right image.png"
                    alt="Facial recognition access control visualization"
                    fill
                    sizes="(max-width: 1024px) 100vw, 506px"
                    className="object-cover"
                  />

                  {/* Caption pill — semi-transparent black, near bottom */}
                  <div className="absolute inset-x-0 bottom-0 flex h-full max-h-[64px] w-full items-center justify-center rounded-[20px] border border-white/30 bg-black/30 px-4 py-3 backdrop-blur-[2px]">
                    <p className="w-[462px] text-center text-[18px] font-bold leading-none text-white">
                      No duplicates, No sharing,
                      <br />
                      No guesswork
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
