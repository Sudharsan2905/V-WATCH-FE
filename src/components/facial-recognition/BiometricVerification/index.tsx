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
        background: "#ECF6FF",
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
      <section className="relative z-10 -mt-12 lg:-mt-16">
        <div
          className="overflow-hidden rounded-t-[28px]"
          style={{ background: "#EDF7FF" }}
        >
          <div className="mx-auto max-w-330 px-6 py-8 sm:px-8 sm:py-10 lg:px-15">
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
              className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.12 }}
            >
              {/* Left: 2×2 feature grid */}
              <div
                className="relative grid grid-cols-2 gap-3 lg:flex-1"
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
                className="relative min-h-65 w-full overflow-hidden rounded-[18px] sm:min-h-80 lg:flex-1"
              >
                <Image
                  src="/facial-recognition/Right image.png"
                  alt="Facial recognition access control visualization"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                {/* Glowing glass border over the image */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[18px]"
                  style={{
                    boxShadow:
                      "inset 0 0 0 1.5px rgba(100,196,255,0.45), inset 0 0 32px rgba(33,177,241,0.12)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[rgba(5,10,35,0.90)] via-[rgba(5,10,35,0.55)] to-transparent p-5 pt-20">
                  <p className="text-center text-[14px] font-bold leading-5.5 text-white sm:text-[15px] sm:leading-6">
                    No duplicates, No sharing,
                    <br />
                    No guesswork
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
