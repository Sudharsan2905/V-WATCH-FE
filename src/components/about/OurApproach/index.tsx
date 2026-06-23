"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { fadeUp, scaleIn, staggerContainer, viewportReveal, EASE } from "../anim";

// Row-level orchestration: walks the children in DOM order
// (Capture → arrow → Control → arrow → Prove) so the section reveals as a
// left-to-right "step by step" flow. A wider stagger than the page default
// makes each step distinctly perceptible.
const flowStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.05 } },
};

// Directional reveal for the flow connectors: the arrow eases in from the left
// while settling into place, so each step reads as movement into the next card.
const arrowReveal: Variants = {
  hidden: { opacity: 0, x: -14, scale: 0.6 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.45, ease: EASE },
  },
};

const CARDS = [
  {
    key: "capture",
    title: "Capture",
    description:
      "Collect real-time data across access, movement, and operations.",
    icon: "/about/approach-icon-capture.webp",
    bg: "/about/approach-card-bg-left.png",
    ghost: true,
    flipBg: false,
  },
  {
    key: "control",
    title: "Control",
    description:
      "Manage permissions, workflows, and compliance from one platform.",
    icon: "/about/approach-icon-control.webp",
    bg: null,
    ghost: false,
    flipBg: false,
  },
  {
    key: "prove",
    title: "Prove",
    description:
      "Generate insights and reports that provide full operational visibility.",
    icon: "/about/approach-icon-prove.webp",
    bg: "/about/approach-card-bg-right.png",
    ghost: true,
    // The right-card panel ships with the same geometry as the left one
    // (recedes to the right). Mirror it so the Prove card leans toward the
    // center, matching the Figma layout.
    flipBg: true,
  },
];

function ApproachCard({ card }: { card: (typeof CARDS)[0] }) {
  return (
    <motion.div
      variants={scaleIn}
      className={[
        "relative flex flex-col items-center gap-[16px] pb-[50px] pt-[24px] px-[16px] rounded-[20px] w-full max-w-[340px] lg:flex-1 lg:min-w-0 flex-shrink-0 lg:flex-shrink",
        !card.ghost
          ? "bg-white border border-white shadow-[9px_7px_60px_0px_rgba(56,144,192,0.10),6px_10px_14px_0px_rgba(217,226,255,0.20)] min-h-[300px]"
          : "min-h-[360px]",
      ].join(" ")}
    >
      {/* Ghost card background (extends beyond bounds visually).
          flipBg mirrors both the bleed inset and the panel itself so the
          right card recedes toward the center (mirror of the left card). */}
      {card.bg && (
        <div
          className={[
            "absolute pointer-events-none",
            card.flipBg
              ? "inset-[-65%_-85%_-73%_-62%]"
              : "inset-[-65%_-62%_-73%_-85%]",
          ].join(" ")}
        >
          <Image
            src={card.bg}
            alt=""
            fill
            className={[
              "object-contain object-center",
              card.flipBg ? "-scale-x-100" : "",
            ].join(" ")}
            sizes="600px"
          />
        </div>
      )}

      {/* Glow blobs */}
      {card.ghost && (
        <>
          <div className="absolute right-0 top-[100px] w-[93px] h-[160px] rounded-full bg-[rgba(56,189,248,0.2)] blur-[32px] opacity-60 pointer-events-none" />
          <div className="absolute left-0 top-[100px] w-[72px] h-[160px] rounded-full bg-[rgba(56,189,248,0.2)] blur-[32px] opacity-40 pointer-events-none" />
        </>
      )}
      {!card.ghost && (
        <>
          <div className="absolute right-[184px] top-[73px] size-[160px] rounded-full bg-[rgba(56,189,248,0.2)] blur-[32px] opacity-60 pointer-events-none" />
          <div className="absolute left-[-86px] top-[73px] size-[160px] rounded-full bg-[rgba(56,189,248,0.2)] blur-[32px] opacity-40 pointer-events-none" />
        </>
      )}

      {/* Concentric rings — CSS-based (SVG ellipses have oversized filter halos in browser) */}
      <div className="relative z-10 size-[151px] flex-shrink-0 flex items-center justify-center">
        {/* Outer diffuse glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 50% 48%, rgba(126,207,250,0.22) 0%, rgba(126,207,250,0.08) 55%, transparent 78%)",
            boxShadow: "0 8px 40px rgba(126,207,250,0.18), 6px 10px 24px rgba(217,226,255,0.55)",
          }}
        />
        {/* Ring 1 */}
        <div
          className="absolute inset-[10px] rounded-full border border-[rgba(126,207,250,0.28)]"
          style={{
            background: "radial-gradient(circle at 50% 45%, #fff 25%, rgba(212,240,255,0.85) 65%, rgba(160,218,250,0.4) 100%)",
          }}
        />
        {/* Ring 2 — bright inner */}
        <div
          className="absolute inset-[27px] rounded-full bg-white"
          style={{ boxShadow: "0 2px 10px rgba(126,207,250,0.35)" }}
        />
        {/* Icon */}
        <div className="relative z-10 size-[50px]">
          <Image src={card.icon} alt={card.title} fill className="object-contain" sizes="50px" />
        </div>
      </div>

      {/* Text */}
      <div className="relative z-10 flex flex-col items-center gap-[6px] text-center">
        <h3 className="text-[20px] font-bold text-[#1d6c97] tracking-[-0.04px]">
          {card.title}
        </h3>
        <p className="text-[18px] text-[#005276] leading-[24px]">
          {card.description}
        </p>
      </div>
    </motion.div>
  );
}

function ArrowConnector() {
  return (
    <motion.div
      variants={arrowReveal}
      className="relative z-20 my-[4px] flex-shrink-0 lg:-mx-[10px] lg:my-0"
    >
      {/* Stacked (mobile/tablet): just the white circle with a DOWN arrow.
          lg+ row: the full horizontal pill + circle (Figma Group 1321317018). */}
      <div className="relative flex h-[40px] w-[40px] items-center justify-center lg:w-[68px]">
        {/* Gradient pill + right chevron — Figma 1043:2425 / 1043:2426 (lg only) */}
        <div
          className="absolute left-0 top-1/2 hidden h-[29px] w-[54.5px] -translate-y-1/2 items-center rounded-full lg:flex"
          style={{
            background:
              "linear-gradient(180deg, #21b1f1 20.69%, #6badf6 43.97%, #e7a7ff 151.72%)",
          }}
        >
          {/* Asset is a left chevron; flip it horizontally so it points right (>). */}
          <div className="relative ml-[6px] size-[21px] -scale-x-100">
            <Image
              src="/about/approach-arrow-pill.webp"
              alt=""
              fill
              className="object-contain"
              sizes="21px"
            />
          </div>
        </div>
        {/* White circle — centered when alone (mobile), at pill's end on lg */}
        <div className="absolute left-1/2 top-0 size-[40px] -translate-x-1/2 lg:left-[28px] lg:translate-x-0">
          <Image
            src="/about/approach-arrow-circle.png"
            alt=""
            fill
            className="object-contain"
            sizes="40px"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Arrow glyph: points DOWN on stacked layouts, right on lg+ */}
            <div className="relative h-[11px] w-[15px] rotate-90 lg:rotate-0">
              <Image
                src="/about/approach-arrow-icon.webp"
                alt=""
                fill
                className="object-contain"
                sizes="15px"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function OurApproach() {
  return (
    <section className="bg-[#F2F8FE] py-[30px] lg:py-[60px] lg:py-[80px] overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportReveal}
        variants={staggerContainer}
        className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[60px]"
      >
        {/* Section header */}
        <motion.div variants={fadeUp} className="mb-[30px]">
          <h2 className="text-[22px] lg:text-[26px] font-bold text-[#0a4b6e] leading-normal mb-[10px]">
            Our Approach
          </h2>
          <p className="text-[16px] lg:text-[20px] text-[#0a4b6e] leading-[28px]">
            Simple system. Powerful impact.
          </p>
        </motion.div>

        {/* Cards row — its own stagger reveals children in DOM order so the
            flow plays out step by step from left to right. */}
        <motion.div
          variants={flowStagger}
          className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-[10px] lg:gap-0"
        >
          <ApproachCard card={CARDS[0]} />
          <ArrowConnector />
          <ApproachCard card={CARDS[1]} />
          <ArrowConnector />
          <ApproachCard card={CARDS[2]} />
        </motion.div>
      </motion.div>
    </section>
  );
}
