"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";

// Shared ease — matches the rest of the site (≈ easeOutQuint).
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Header clip-wipe from the top — the site's signature heading reveal.
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

// Card reveal — rise + subtle scale, kept inside a stagger container.
const cardIn: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.94 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE, delay },
  }),
};

// Right-hand isometric map — eases in from the right + soft scale.
const fromRight: Variants = {
  hidden: { opacity: 0, x: 48, scale: 0.96 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE, delay },
  }),
};

type Feature = { icon: string; label: string };

type SinglePlatformContent = {
  heading?: string;
  intro?: string;
  detail?: string;
  features?: Feature[];
  pill?: string;
  mapImage?: string;
};

const DEFAULT_FEATURES: Feature[] = [
  {
    icon: "/pre-construction/single-platform/icons/people.png",
    label: "People",
  },
  {
    icon: "/pre-construction/single-platform/icons/operations.png",
    label: "Operations",
  },
  {
    icon: "/pre-construction/single-platform/icons/movement.png",
    label: "Movement",
  },
  {
    icon: "/pre-construction/single-platform/icons/workforce.png",
    label: "Workforce",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────
function FeatureCard({
  icon,
  label,
  delay,
}: Readonly<Feature & { delay: number }>) {
  return (
    <motion.div
      variants={cardIn}
      custom={delay}
      whileHover={{
        y: -4,
        scale: 1.02,
      }}
      transition={{ duration: 0.25 }}
      className="relative h-32.5 w-full overflow-hidden rounded-[18px] px-2 py-5 flex flex-col items-center justify-center gap-2"
      style={{
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",

        border: "1px solid rgba(255,255,255,0.35)",

        boxShadow: `
          0 8px 32px rgba(31, 38, 135, 0.12),
          0 2px 8px rgba(255,255,255,0.25) inset,
          0 -2px 8px rgba(255,255,255,0.15) inset
        `,
      }}
    >
      {/* Top glass shine */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[18px]"
        style={{
          background: `
            linear-gradient(
              180deg,
              rgba(255,255,255,0.35) 0%,
              rgba(255,255,255,0.12) 20%,
              transparent 60%
            )
          `,
        }}
      />

      {/* Glow border */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[18px]"
        style={{
          border: "1px solid rgba(255,255,255,0.45)",
        }}
      />

      {/* Icon */}
      <span
        className="relative z-10 flex size-[48px] shrink-0 items-center justify-center rounded-full"
        style={{
          background: "rgba(255,255,255,0.25)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.4)",
          boxShadow: `
            inset 0 1px 2px rgba(255,255,255,0.6),
            0 4px 12px rgba(0,0,0,0.08)
          `,
        }}
      >
        <Image
          src={icon}
          alt=""
          width={24}
          height={24}
          unoptimized
          className="size-6 object-contain"
        />
      </span>

      {/* Text */}
      <span
        className="relative z-10 text-center text-[14px] font-bold"
        style={{
          color: "#314158",
          textShadow: "0 1px 1px rgba(255,255,255,0.6)",
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

// Connector — the supplied curve image. Its dots sit near the image edges
// (x ≈ 7…395 of 404), so the image is inset to ~80% and centred: that lands
// its four dots on the four card centres (which span the inner ~10%…90%).
const SP_CONNECTOR_SRC =
  "/pre-construction/single-platform/icons/curve_image.png";
// Dots are baked into the raster, so to blur ONLY the dots we overlay a blurred
// copy of the same image, masked to four circles over the dot positions.
const SP_DOT_MASK =
  "radial-gradient(circle 16px at 2% 22%, #000 65%, transparent 100%)," +
  "radial-gradient(circle 16px at 34% 22%, #000 65%, transparent 100%)," +
  "radial-gradient(circle 16px at 66% 22%, #000 65%, transparent 100%)," +
  "radial-gradient(circle 16px at 98% 22%, #000 65%, transparent 100%)";

function Connector() {
  return (
    <div className="pointer-events-none relative mx-auto w-[80%]">
      <Image
        src={SP_CONNECTOR_SRC}
        alt=""
        width={404}
        height={46}
        unoptimized
        className="w-full"
      />
      {/* Blurred copy, shown only over the four dots via the mask. */}
      <Image
        src={SP_CONNECTOR_SRC}
        alt=""
        aria-hidden
        width={404}
        height={46}
        unoptimized
        className="absolute inset-0 w-full"
        style={{
          filter: "blur(1.5px)",
          maskImage: SP_DOT_MASK,
          WebkitMaskImage: SP_DOT_MASK,
        }}
      />
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function SinglePlatform({
  content = {},
}: Readonly<{ content?: SinglePlatformContent }> = {}) {
  const {
    heading = "A single platform to run your entire project",
    intro = "V-Watch Atlas connects every part of your construction environment into one intelligent system allowing you to manage people, operations, movement, and performance in real time.",
    detail = "From workforce co-ordination to logistics tracking and productivity monitoring, V-Watch Atlas gives you full control over how your project runs.",
    features = DEFAULT_FEATURES,
    pill = "Everything on your site mapped, tracked, and managed.",
    mapImage = "/pre-construction/single-platform/map.png",
  } = content;

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative z-10 overflow-hidden bg-[#f5fbff] px-6 lg:px-15">
        <div className="mx-auto max-w-[1320px]">

        <motion.h2
          variants={wipeDown}
          custom={0.05}
          className="max-w-[889px] text-[26px] font-extrabold leading-[34px] text-[#0A4B6E] sm:text-[28px] sm:leading-[36px]"
          >
          {heading}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          custom={0.2}
          className="mt-1 max-w-[878px] text-[20px] leading-[24px] text-[#0A4B6E]"
          >
          {intro}
        </motion.p>
          </div>
        <motion.div
          className="relative mt-[30px] mx-auto w-full max-w-[1320px]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* CONTENT — stacked above the map on mobile; from lg up it overlays the
              left while the map bleeds beneath it (glass cards sit over the map) */}
          <div className="relative z-10 w-full max-w-[503px] lg:absolute lg:left-0 lg:top-0">
            <motion.p
              variants={fadeUp}
              custom={0.32}
              className="mt-6 max-w-[442px] text-[20px] leading-[30px] text-[#006F9F]"
            >
              {detail}
            </motion.p>

            {/* Feature cards — 2×2 on mobile, single row from sm up.
                z-20 keeps the cards above the connector so its dots tuck under. */}
            <div className="relative z-20 mt-10 grid max-w-full grid-cols-2 gap-3 sm:grid-cols-4">
              {features.map((f, i) => (
                <FeatureCard key={f.label} {...f} delay={0.45 + i * 0.1} />
              ))}
            </div>

            {/* Connector — only on the single-row layout (z-10 < cards' z-20) */}
            <motion.div
              variants={fadeUp}
              custom={0.9}
              className="relative z-10 hidden w-full sm:block -mt-2"
            >
              <Connector />
            </motion.div>

            {/* Pill — Figma spec: 505×54, 14px radius, 2px #FFFFFF→#EFF9FF
                gradient border over a semi-transparent #F4FBFF (20%) fill so the
                map shows softly through, plus a soft drop shadow. Single line
                from sm up; wraps on the narrowest screens where 505px can't fit. */}
            <motion.div
              variants={fadeUp}
              custom={1}
              className="relative mt-12 flex w-[505px] max-w-full items-center justify-center rounded-[14px] px-5 py-3 sm:h-[54px] sm:py-0"
              style={{
                background: "rgba(244,251,255,0.20)",
                boxShadow: "0px 13px 30px -12px rgba(20,46,92,0.22)",
              }}
            >
              {/* 2px gradient border ring — masked so the chip fill stays
                  transparent (a solid border would hide the see-through fill). */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[14px]"
                style={{
                  padding: 2,
                  background:
                    "linear-gradient(180deg, #FFFFFF 0%, #EFF9FF 100%)",
                  WebkitMask:
                    "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  maskComposite: "exclude",
                }}
              />
              <span className="relative text-[16px] font-bold leading-[26px] text-[#006F9F] sm:whitespace-nowrap">
                {pill}
              </span>
            </motion.div>
          </div>

          {/* MAP — right-anchored; bleeds left beneath the content from lg up.
              Top, bottom and right edges feather out; the left edge stays solid
              (it tucks under the cards). Two linear masks intersected. */}
          <motion.div
            variants={fromRight}
            custom={0.3}
            className="relative z-0 mt-10 ml-auto w-full lg:mt-0 lg:w-[64%]"
          >
            <Image
              src={mapImage}
              alt="Isometric view of a construction project with people, operations, movement and workforce zones mapped in real time"
              width={708}
              height={528}
              priority
              sizes="(max-width: 1024px) 100vw, 70vw"
              className="h-auto w-full"
              style={{
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, #000 5%, #000 95%, transparent 100%), linear-gradient(to right, #000 84%, transparent 100%)",
                maskComposite: "intersect",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, #000 5%, #000 95%, transparent 100%), linear-gradient(to right, #000 84%, transparent 100%)",
                WebkitMaskComposite: "source-in",
              }}
            />
            {/* Left readability scrim — lg only; keeps the detail copy legible while
                still letting the map show softly through the glass cards */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 hidden w-[60%] lg:block"
              style={{
                background:
                  "linear-gradient(90deg,rgba(245,251,255,0.85) 0%,rgba(245,251,255,0.35) 42%,rgba(245,251,255,0) 68%)",
              }}
            />
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
