"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  wipeTop,
  scaleIn,
  loadIn,
  staggerContainer,
  viewportReveal,
} from "@/components/about/anim";

// ─── Feature data ─────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: "/icons/feature-raise-track.svg",
    iconW: 24,
    iconH: 32,
    title: "Raise & Track Requests",
    body: "Log maintenance issues instantly with full details, location, and priority level.",
  },
  {
    icon: "/icons/feature-assign.svg",
    iconW: 32,
    iconH: 32,
    title: "Assign Responsibility",
    body: "Assign tasks to the right personnel or teams with clear ownership and deadlines.",
  },
  {
    icon: "/icons/feature-monitor.svg",
    iconW: 30,
    iconH: 31,
    title: "Monitor Progress",
    body: "Track the status of each request in real time from open to completion.",
  },
  {
    icon: "/icons/feature-history.svg",
    iconW: 30,
    iconH: 31,
    title: "Maintain Service History",
    body: "Keep a complete record of all maintenance activities for future reference and audits.",
  },
];

// Shared shadow tokens from the Figma spec.
const CARD_SHADOW =
  "6px 10px 23px 0 rgba(217,226,255,0.85), 0 13px 100px 0 rgba(199,199,199,0.25)";
const ICON_SHADOW =
  "9px 7px 60px 0 rgba(255,255,255,0.40), 6px 10px 23px 0 rgba(217,226,255,0.85), 0 13px 100px 0 rgba(199,199,199,0.25)";

function FeatureCard({
  icon,
  iconW,
  iconH,
  title,
  body,
}: Readonly<(typeof FEATURES)[number]>) {
  return (
    <motion.div
      variants={scaleIn}
      className="flex max-h-[200px] flex-1 flex-col justify-center gap-[14px] rounded-[20px] border-2 border-white bg-[rgba(244,251,255,0.20)] p-5"
      style={{ boxShadow: CARD_SHADOW }}
    >
      {/* Icon tile */}
      <div
        className="flex size-[64px] shrink-0 items-center justify-center rounded-[16px] border-2 border-white bg-[rgba(244,251,255,0.20)] p-[10px]"
        style={{ boxShadow: ICON_SHADOW }}
      >
        <Image
          src={icon}
          alt=""
          width={iconW}
          height={iconH}
          aria-hidden="true"
          className="h-[30px] w-auto object-contain"
        />
      </div>
      <h3 className="text-[20px] font-bold leading-tight text-[#1E293B]">
        {title}
      </h3>
      <p className="text-[16px] leading-[24px] text-[#475569]">{body}</p>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function FeatureGrid() {
  return (
    <section className="px-6 pb-12 lg:pb-20 lg:px-[60px]">
      <div className="mx-auto flex w-full max-w-[1410px] flex-col items-center gap-[30px]">
        {/* Header */}
        <motion.header
          initial="hidden"
          whileInView="show"
          viewport={viewportReveal}
          className="flex w-full flex-col gap-2 text-[#0A4B6E]"
        >
          <motion.h2
            variants={wipeTop}
            className="text-[22px] font-bold leading-tight sm:text-[26px]"
          >
            Everything you need to manage maintenance in one place
          </motion.h2>
        </motion.header>

        {/* Image + 2×2 card grid */}
        <div className="flex w-full flex-col gap-[30px] lg:flex-row lg:items-stretch">
          {/* Left illustration */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportReveal}
            variants={loadIn}
            className="
                relative
                w-full
                max-w-[360px]
                self-center
                overflow-hidden
                rounded-[24px]
                lg:h-[424px]
                lg:w-[352px]
                lg:aspect-auto
                lg:max-w-none
                lg:shrink-0
              "
          >
            <Image
              src="/maintenance/maintenance-features.webp"
              alt="V-Watch Ai maintenance operations overview"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Cards — 1 col on mobile, 2×2 on sm+ */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportReveal}
            className="grid flex-1 grid-cols-1 gap-[24px] sm:grid-cols-2"
          >
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
