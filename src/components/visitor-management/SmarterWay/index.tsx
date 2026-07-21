"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";

// Shared ease — matches the rest of the site's reveal language.
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// With Lenis smoothing the scroll, a low `amount` fires the reveal as the
// section's top edge peeks over the viewport bottom — finished before it's
// really on screen. Pull the trigger line up and require a real slice visible.
const VIEWPORT = {
  once: true,
  amount: 0.3,
  margin: "0px 0px -120px 0px",
} as const;

const wipeTop: Variants = {
  hidden: { opacity: 0, y: -12 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay: d },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay: d },
  }),
};

// Soft scale + fade for the focal render on the right.
const imageIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: (d = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE, delay: d },
  }),
};

// The decorative plus-glow that sits in the cross-gap between the four cards.

type Card = { text: string; icon: string };

const CARDS: Card[] = [
  {
    text: "Pre-register and approve visitors before arrival",
    icon: "/visitor-management/pre-registration-icon.svg",
  },
  {
    text: "Real-time visitor tracking and entry logs",
    icon: "/visitor-management/realtime-tracking-icon.svg",
  },
  {
    text: "Faster check-ins with digital or biometric verification",
    icon: "/visitor-management/fast-checkin-icon.svg",
  },
  {
    text: "Full visibility of who is on-site at any time",
    icon: "/visitor-management/onsite-visibility-icon.svg",
  },
];

function FeatureCard({
  icon,
  text,
  delay,
}: {
  icon: string;
  text: string;
  delay: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
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
        <div
          className="relative shrink-0 flex justify-center items-center"
          style={{ width: 60, height: 54 }}
        >
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
              width: "29px",
              height: "29px",
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
                left: "7.08px",
                top: "5px",
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
          {text}
        </p>
      </div>
    </motion.div>
  );
}

export default function SmarterWay() {
  return (
    <section
      className="relative z-20 -mt-[60px] rounded-t-[48px]"
      style={{ backgroundColor: "#EFF9FF" }}
    >
      <motion.div
        className="mx-auto flex w-full max-w-[1440px] flex-col gap-[30px] px-5 pt-10 lg:px-[60px] lg:pb-15"
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
      >
        {/* ── Heading group (gap 10px) ─────────────────────────────────── */}
        <div className="flex max-w-[953px] flex-col gap-2.5 lg:h-[97px]">
          <motion.h2
            variants={wipeTop}
            className="text-[22px] font-bold leading-[1.1] text-[#0A4B6E] sm:text-[26px] sm:leading-none"
          >
            A smarter way to manage every visitor
          </motion.h2>
          <motion.p
            variants={wipeTop}
            custom={0.12}
            className="text-[16px] font-normal leading-[1.4] text-[#0A4B6E] sm:text-[20px] sm:leading-[28px]"
          >
            V-Watch AI transforms visitor management into a seamless, controlled
            process ensuring every individual is registered, verified, and
            tracked from the moment they arrive.
          </motion.p>
        </div>

        {/* ── Content row (gap 24px) ───────────────────────────────────── */}
        <motion.div
          className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8"
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {/* Left: 2×2 feature grid — Figma: 356×356 radial gradient at 50% opacity behind cards */}
          <div
            className="relative mx-auto grid w-full grid-cols-2 gap-6 lg:mx-0 lg:flex-1"
            style={{
              background:
                "radial-gradient(ellipse 50% 50% at center, rgba(5,133,190,0.75) 0%, rgba(30,155,210,0.55) 20%, rgba(100,195,245,0.30) 45%, rgba(180,225,255,0.10) 68%, transparent 88%)",
              borderRadius: 16,
            }}
          >
            {CARDS.map((f, i) => (
              <FeatureCard key={f.text} {...f} delay={0.25 + i * 0.1} />
            ))}
          </div>

          {/* Right: compliance visualization — framed card.
                          Figma: 10px padding, 27.69 radius, 2px #F5FBFF→#FFFFFF
                          gradient border, #F4FBFF/60 fill, blue glow top/bottom-center */}
          <motion.div
            variants={fadeUp}
            custom={0.2}
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
                src="/visitor-management/visitor_management_track.png"
                alt="Compliance management system visualization"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              {/* Caption */}
              <div className="absolute bottom-0 w-full flex max-h-16 items-center justify-center rounded-2xl border border-white/30 bg-black/30 px-3 py-2.5 backdrop-blur-[2px] leading-[100%]">
                <p className="text-center text-[14px] font-bold leading-[100%] text-white sm:text-[18px]">
                  No manual logs, No guesswork,
                  <br />
                  No security gaps
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
