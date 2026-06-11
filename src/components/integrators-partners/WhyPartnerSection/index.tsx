"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";
import {
  WHY_PARTNER_HEADER,
  WHY_PARTNER_EMBLEM,
  WHY_PARTNER_POINTS,
} from "@/constants/integrators-partners";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const cardLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

const cardRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

const emblemReveal: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

// Inline icons for the four points, drawn with currentColor.
function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden>
      <rect x="3" y="3" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 19.5h9.5A2.5 2.5 0 0 0 20 17V8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden>
      <path d="M4 20V10M10 20V4M16 20v-8M21 20H3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function PlugIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden>
      <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="18" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7.5 8 11 15.5M16.5 8 13 15.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden>
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

const ICONS = [LayersIcon, ChartIcon, PlugIcon, SupportIcon];

type Point = (typeof WHY_PARTNER_POINTS)[number];

function PointCard({
  point,
  index,
}: Readonly<{ point: Point; index: number }>) {
  const col = index % 2;                          // 0 = left col, 1 = right col
  const row = Math.floor(index / 2);              // 0 = top row, 1 = bottom row
  const side: "left" | "right" = col === 0 ? "left" : "right";
  const vert: "top" | "bottom"  = row === 0 ? "top" : "bottom";
  const Icon = ICONS[index % ICONS.length];

  return (
    <motion.div
      variants={side === "left" ? cardLeft : cardRight}
      className="relative"
    >
      {/* Blue gradient block — tucked behind the card, peeking out at the
          outer corner as a thick rounded bracket. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute z-0 h-[110px] w-[98px] bg-[linear-gradient(150deg,#52BBE8_0%,#1264BE_100%)] ${
          side === "left" ? "-left-3.5" : "-right-3.5"
        } ${vert === "top" ? "-top-3.5" : "-bottom-3.5"} ${
          side === "left"
            ? vert === "top"
              ? "rounded-tl-[26px]"
              : "rounded-bl-[26px]"
            : vert === "top"
              ? "rounded-tr-[26px]"
              : "rounded-br-[26px]"
        }`}
      />

      {/* Card surface */}
      <div className="relative z-10 overflow-hidden rounded-[16px] border border-white bg-[linear-gradient(180deg,#ffffff,#f6fbff)] shadow-[0_13px_40px_rgba(148,182,212,0.25)]">
        {/* Big outlined number — at the card's outer edge, clipped to the
            card's rounded bounds */}
        <span
          aria-hidden
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 select-none font-sans text-[96px] font-black italic leading-none text-transparent [-webkit-text-stroke:2.5px_rgba(18,100,190,0.8)] ${
            side === "left" ? "-left-5" : "-right-0"
          }`}
        >
          {point.num}
        </span>

        {/* Icon — circular badge at the inner top corner */}
        <span
          className={`absolute top-3 flex size-10 items-center justify-center rounded-full bg-[#EAF6FE] text-[#2B9CD8] ${
            side === "left" ? "right-3" : "left-3"
          }`}
        >
          <Icon />
        </span>

        {/* Content — centered within the full card */}
        <div className="flex flex-col gap-1.5 px-14 py-8 text-center">
          <h3 className="text-[16px] font-bold leading-tight text-[#1D293D]">
            {point.title}
          </h3>
          <p className="text-[14px] font-normal leading-[19px] text-[#62748E]">
            {point.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// "Why partner with V-Watch Ai" — light rounded band overlapping the dark
// technologies band above. Four numbered cards arranged around a central
// V-Watch emblem; a blue block tucks behind each card's outer corner and the
// big outlined digit sits inside the card alongside the content.
export default function WhyPartnerSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative z-30 -mt-10 overflow-hidden rounded-t-[40px] border-t-2 border-white bg-[radial-gradient(70%_60%_at_50%_45%,rgba(189,228,250,0.55),transparent_70%),linear-gradient(180deg,#F4FAFF_0%,#EAF5FC_55%,#F6FBFF_100%)] px-6 pb-20 pt-14 lg:px-[60px]">
        <motion.div
          className="relative mx-auto flex w-full max-w-[1410px] flex-col gap-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Heading */}
          <motion.header variants={fadeUp} className="flex flex-col gap-2.5">
            <h2 className="text-[26px] font-bold leading-none text-[#0A4B6E]">
              {WHY_PARTNER_HEADER.title}
            </h2>
            <p className="text-[16px] font-normal leading-[24px] text-[#3a6e8c]">
              {WHY_PARTNER_HEADER.subtitle}
            </p>
          </motion.header>

          {/* Cards over the emblem artwork */}
          <div className="relative">
            {/* emblem — background layer covering the whole cards area,
                rings centered behind the grid */}
            <motion.div
              variants={emblemReveal}
              className="pointer-events-none absolute -inset-x-6 -inset-y-16 z-0 hidden lg:block"
            >
              <Image
                src={WHY_PARTNER_EMBLEM}
                alt="V-Watch Ai"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>

            <div className="relative z-10 grid gap-x-8 gap-y-8 lg:grid-cols-2 lg:gap-x-[330px] lg:gap-y-14">
              {WHY_PARTNER_POINTS.map((point, i) => (
                <PointCard key={point.num} point={point} index={i} />
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
