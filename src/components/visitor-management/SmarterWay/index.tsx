"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";

// Shared ease — matches the rest of the site's reveal language.
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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

// Card reveal — rise + subtle scale so shadows stay intact.
const cardIn: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.96 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE, delay: d },
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
// Settles to 50% opacity to match the Figma (Union, opacity 50%).
const plusIn: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: (d = 0) => ({
    opacity: 0.5,
    scale: 1,
    transition: { duration: 0.7, ease: EASE, delay: d },
  }),
};

type Card = { text: string; icon: string };

const CARDS: Card[] = [
  {
    text: "Pre-register and approve visitors before arrival",
    icon: "/visitor-management/pre-registration-icon.png",
  },
  {
    text: "Real-time visitor tracking and entry logs",
    icon: "/visitor-management/realtime-tracking-icon.png",
  },
  {
    text: "Faster check-ins with digital or biometric verification",
    icon: "/visitor-management/fast-checkin-icon.png",
  },
  {
    text: "Full visibility of who is on-site at any time",
    icon: "/visitor-management/onsite-visibility-icon.png",
  },
];

function FeatureCard({
  text,
  icon,
  index,
}: Readonly<Card & { index: number }>) {
  return (
    <motion.div
      variants={cardIn}
      custom={0.15 + index * 0.1}
      // 302.5 × 146 in Figma — width fills its grid column, height fixed.
      className="relative z-10 flex h-[146px] flex-col gap-2.5 rounded-[20px] bg-[linear-gradient(180deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.25)_100%)] p-4 shadow-[0px_1px_2px_0px_rgba(10,75,110,0.06)] backdrop-blur-[2px]"
    >
      {/* 1px gradient border — white 0% (transparent) → white (Figma). */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[20px]"
        style={{
          padding: "1px",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 100%)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Icon badge — 60 × 54 exactly. The asset already bakes in the blue
          gradient circle + glow, so it's rendered directly (no wrapper pill). */}
      <Image
        src={icon}
        alt=""
        width={60}
        height={54}
        className="h-[54px] w-[60px] shrink-0 object-contain"
      />

      <p className="text-[18px] font-normal leading-6 text-[#1D293D]">{text}</p>
    </motion.div>
  );
}

export default function SmarterWay() {
  return (
    <section
      className="relative z-20 -mt-[60px] rounded-t-[48px] px-5 pt-10 pb-20 sm:px-8 lg:px-[60px]"
      style={{ backgroundColor: "#EFF9FF" }}
    >
      <motion.div
        className="mx-auto flex w-full max-w-[1280px] flex-col gap-[30px]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
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
            V-Watch Ai transforms visitor management into a seamless, controlled
            process ensuring every individual is registered, verified, and
            tracked from the moment they arrive.
          </motion.p>
        </div>

        {/* ── Content row (gap 24px) ───────────────────────────────────── */}
        <div className="flex flex-col gap-6 lg:flex-row w-full lg:max-w-[1160px]">
          {/* Left: 2×2 card grid (630 × 316) with the plus-glow behind it */}
          <div className="relative shrink-0 lg:w-[630px]">
            {/* Plus-glow — 356 × 356, centered in the cross-gap. Decorative. */}
            <motion.div
              aria-hidden
              variants={plusIn}
              custom={0.3}
              className="pointer-events-none absolute left-1/2 top-1/2 z-1 hidden h-[356px] w-[356px] -translate-x-1/2 -translate-y-1/2 lg:block"
              style={{
                clipPath:
                  "polygon(33% 0,67% 0,67% 33%,100% 33%,100% 67%,67% 67%,67% 100%,33% 100%,33% 67%,0 67%,0 33%,33% 33%)",
                background:
                  "radial-gradient(circle, #0585BE 0%, #84D7FD 22%, rgba(180,230,254,0.8) 48%, rgba(210,237,255,0.4) 72%, #F5FBFF 100%)",
              }}
            />

            <div className="bg-[#E5F4FE] relative grid grid-cols-1 gap-[24px] sm:grid-cols-2">
              {CARDS.map((card, i) => (
                <FeatureCard key={card.text} {...card} index={i} />
              ))}
            </div>
          </div>

          {/* Right: focal render (506 × 316) with the caption overlay */}
          <motion.div
            variants={imageIn}
            custom={0.2}
            className="relative mx-auto aspect-[506/316] max-w-[506px] w-full overflow-hidden rounded-[27.69px] border-2 border-white bg-[#F4FBFF]/60 p-2.5 lg:mx-0 lg:aspect-auto lg:h-[316px] lg:w-auto lg:flex-1"
          >
            {/* Blue glow that peeks through the 10px padding gap at the
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
                src="/visitor-management/smarter-management-preview.png"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 506px"
                className="object-cover"
              />

              {/* Caption pill (482 × 64) — semi-transparent black, near bottom */}
              <div className="max-h-[64px] h-full w-full absolute inset-x-0 bottom-0 flex items-center justify-center rounded-[20px] border border-white/30 bg-black/30 px-4 py-3 backdrop-blur-[2px]">
                <p className="w-[462px] text-center text-[18px] font-bold leading-none text-white">
                  No manual logs, No guesswork,
                  <br />
                  No security gaps
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
