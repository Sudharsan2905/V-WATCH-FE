"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const VIEWPORT = { once: true, amount: 0.5, margin: "0px 0px -120px 0px" } as const;

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
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="h-full rounded-[20px]"
      style={{
        background: "#e5f4fe",
      }}
    >
      {/* Inner card */}
      <div
        className="flex h-full flex-col gap-2.5 rounded-[20px] p-4"
        style={{
          background:
            "#B8E6FF33 padding-box, linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 100%) border-box",
          border: "1px solid white",
          boxShadow:
            "0 1px 2px rgba(184,230,255,0.20), inset 0 -6px 23px rgba(212,240,255,0.10)",
        }}
      >
        {/* Icon badge — Figma spec: 60×54 pill, blue circle, frosted icon
            square. All sizes/positions read from the Figma inspector. */}
        <div className="relative shrink-0 flex justify-center items-center" style={{ width: 60, height: 54 }}>
          {/* 1. Outer pill — radius 82.4, gradient fill #B8E6FF→#C1ECFF,
              1.25px white→transparent gradient border (masked ring). */}
          <div
            className="absolute inset-0"
            style={{
              borderRadius: 82.4,
              background: "linear-gradient(180deg, #B8E6FF 0%, #C1ECFF 100%)",
            }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                borderRadius: 82.4,
                padding: 1.25,
                background:
                  "linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0) 100%)",
                WebkitMask:
                  "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                maskComposite: "exclude",
              }}
            />
          </div>
          {/* 2. Blue circle — 41.35×38.4, centred in the pill */}
          <div
            className="absolute"
            style={{
              width: '29px',
              height: '29px',
              borderRadius: 9999,
              background:
                "linear-gradient(220.53deg, #9CDCFF 0%, #21B1F1 76.95%)",
              boxShadow: "0 4px 14px rgba(26,143,206,0.32)",
            }}
          >
          {/* 3. Frosted icon square — 28.55×28.55 at (11.08, 8.4),
              0.4px white(40%)→transparent gradient border (masked ring). */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              width: 28.55,
              height: 28.55,
              left: '7.08px',
              top: '5px',
              borderRadius: 9,
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                borderRadius: 9,
                padding: 0.4,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)",
                WebkitMask:
                  "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                maskComposite: "exclude",
              }}
            />
            <Image
              src={icon}
              alt=""
              width={18}
              height={18}
              className="object-contain"
            />
          </div>
        </div>
        </div>

        <p className="text-[14px] md:text-[18px] font-medium leading-[24px] text-[#1D293D]">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

export default function ComplianceControl() {
  return (
    <MotionConfig reducedMotion="user">
      {/* Full-width section — rounded top overlaps the hero for the "card
          emerging" curve. PageHero adds extra bottom padding when it has a CTA,
          so the overlap laps over empty space below the button, not the button. */}
      <section className="relative z-10 -mt-8 lg:-mt-16">
        <div
          className="overflow-hidden rounded-t-[28px] px-6 lg:px-[60px]"
          style={{ background: "#EDF7FF" }}
        >
          <div className="mx-auto max-w-[1280px] w-full py-8 sm:py-10">
            {/* Section header */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
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
                className="mt-3 max-w-[953px] text-[15px] md:text-[20px] leading-6 text-[#0A4B6E]  sm:leading-6.5"
              >
                V-Watch AI centralises contractor records, certifications, and
                safety requirements into one system automatically tracking
                expiry, enforcing access rules, and eliminating compliance gaps.
              </motion.p>
            </motion.div>

            {/* Content row — feature grid left, image right. Trigger lives on
                each card/image (this row is too tall to reach amount:0.5). */}
            <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8">
              {/* Left: 2×2 feature grid — Figma: 356×356 radial gradient at 50% opacity behind cards */}
              <div
                className="relative mx-auto grid w-full max-w-[630px] grid-cols-2 gap-6 lg:mx-0 lg:flex-1"
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

              {/* Right: compliance visualization — framed card.
                  Figma: 10px padding, 27.69 radius, 2px #F5FBFF→#FFFFFF
                  gradient border, #F4FBFF/60 fill, blue glow top/bottom-center */}
              <motion.div
                variants={fadeUp}
                custom={0.2}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
                className="relative mx-auto flex h-[240px] w-full max-w-[506px] overflow-hidden sm:h-[316px] lg:mx-0 lg:flex-1"
                style={{
                  borderRadius: 27.69,
                  padding: 10,
                  background:
                    "rgba(244,251,255,0.6) padding-box, linear-gradient(180deg, #F5FBFF 0%, #FFFFFF 100%) border-box",
                  border: "2px solid transparent",
                  boxShadow: "0 8px 30px rgba(33,177,241,0.16)",
                }}
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

                {/* Inner image */}
                <div className="relative z-10 h-full w-full flex-1 overflow-hidden rounded-2xl">
                  <Image
                    src="/contractor-complaince/track.webp"
                    alt="Compliance management system visualization"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />

                  {/* Caption */}
                  <div className="absolute bottom-0 w-full flex max-h-16 items-center justify-center rounded-2xl border border-white/30 bg-black/30 px-3 py-2.5 backdrop-blur-[2px] leading-[100%]">
                    <p className="text-center text-[14px] font-bold leading-[130%] text-white sm:text-[18px]">
                      No spreadsheets. No missed renewals.
                      <br />
                      No unauthorised entry.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
