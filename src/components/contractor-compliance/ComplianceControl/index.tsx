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
    icon: "/contractor-complaince/icons/location.svg",
    label: "Track certifications, training, and safety passes in one system",
  },
  {
    icon: "/contractor-complaince/icons/thunder.svg",
    label: "Automatically detect expired or non-compliant workers",
  },
  {
    icon: "/contractor-complaince/icons/restrict.svg",
    label: "Restrict access based on compliance status",
  },
  {
    icon: "/contractor-complaince/icons/check.svg",
    label: "Maintain audit-ready records for inspections",
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
          background:
            "#B8E6FF33 padding-box, linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 100%) border-box",
          border: "1px solid transparent",
          boxShadow:
            "0 1px 2px rgba(184,230,255,0.20), inset 0 -6px 23px rgba(212,240,255,0.10)",
        }}
      >
        {/* Icon stack: ellipse base → blue circle → shifted icon card */}
        <div className="relative h-16 w-24 shrink-0">
          {/* 1. Ellipse — D-shape (small left radius, full right curve) */}
          <div
            className="absolute inset-0"
            style={{
              borderRadius: "100px",
              background:
                "linear-gradient(180deg, rgba(184,230,255,0.8) 0%, rgba(193,236,255,0.8) 100%)",
            }}
          />
          {/* 2. Blue circle — shifted toward left */}
          <div
            className="absolute top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: "calc(50% - 8px)",
              background:
                "linear-gradient(220.53deg, #9CDCFF 0%, #21B1F1 76.95%)",
              boxShadow: "0 4px 14px rgba(26,143,206,0.32)",
            }}
          />
          {/* 3. Rounded-square icon — same left as circle */}
          <div
            className="absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-[14px]"
            style={{
              left: "calc(50% - 10px)",
              background: "transparent",
              border: "2px solid rgba(255,255,255,0.85)",
            }}
          >
            <Image
              src={icon}
              alt=""
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
        </div>

        <p className="text-[13px] font-medium leading-5 text-[#314158] sm:text-[14px] sm:leading-5.5">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

export default function ComplianceControl() {
  return (
    <MotionConfig reducedMotion="user">
      {/* Full-width section — rounded top only to overlap hero, no side/bottom margins, no shadow */}
      <section className="relative z-10 -mt-8 lg:-mt-16">
        <div
          className="overflow-hidden rounded-t-[28px] px-6 lg:px-[60px]"
          style={{ background: "#EDF7FF" }}
        >
          <div className="mx-auto max-w-[1280px] w-full py-8  sm:py-10">
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
                Full control over contractor compliance — without manual
                tracking
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={0.2}
                className="mt-3 max-w-170 text-[15px] leading-6 text-[#314158] sm:text-[16px] sm:leading-6.5"
              >
                V-Watch Ai centralises contractor records, certifications, and
                safety requirements into one system — automatically tracking
                expiry, enforcing access rules, and eliminating compliance gaps.
              </motion.p>
            </motion.div>

            {/* Content row — feature grid left, image right */}
            <motion.div
              className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.12 }}
            >
              {/* Left: 2×2 feature grid — Figma: 356×356 radial gradient at 50% opacity behind cards */}
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

              {/* Right: compliance visualization with caption */}
              <motion.div
                variants={fadeUp}
                custom={0.2}
                className="relative min-h-65 w-full overflow-hidden rounded-[18px] sm:min-h-80 lg:flex-1"
              >
                <Image
                  src="/contractor-complaince/track.webp"
                  alt="Compliance management system visualization"
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
                <div className="max-h-[64px] h-[64px] w-full absolute inset-x-0 bottom-0 flex items-center justify-center rounded-[20px] border border-white/30 bg-black/30 p-[10px] backdrop-blur-[2px] leading-[100%]">
                  <p className="w-[462px] text-center text-[18px] font-bold leading-none text-white">
                    No spreadsheets. No missed renewals.
                    <br />
                    No unauthorised entry.
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
