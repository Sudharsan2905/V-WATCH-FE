"use client";

import Image from "next/image";
import { motion, MotionConfig } from "motion/react";
import {
  loadIn,
  scaleIn,
  staggerContainer,
  viewportReveal,
} from "@/components/about/anim";

const FEATURES = [
  {
    title: "Productivity and manhour tracking",
    iconSrc: "/workforce/transferIcons/1.svg",
  },
  {
    title: "Access control systems",
    iconSrc: "/workforce/transferIcons/2.svg",
  },
  {
    title: "Workforce tracking and attendance",
    iconSrc: "/workforce/transferIcons/3.svg",
  },
  {
    title: "Task and operational activity",
    iconSrc: "/workforce/transferIcons/4.svg",
  },
  {
    title: "Power BI dashboards and reporting",
    iconSrc: "/workforce/transferIcons/5.svg",
  },
];

// ─── Card ────────────────────────────────────────────────────────────────────

const CARD_SHADOW =
  "0 2px 16px 0 rgba(0,117,180,0.10), 0 1px 4px 0 rgba(0,117,180,0.06)";

function FeatureCard({
  title,
  iconSrc,
}: Readonly<{ title: string; iconSrc: string }>) {
  return (
    <motion.div variants={scaleIn} className="flex flex-col gap-0">
      {/* Icon — overlaps the top-left corner of the card */}
      <div className="z-10 h-[44px] w-[44px]">
        {iconSrc && (
          <Image
            src={iconSrc}
            alt="icon"
            width={44}
            height={44}
            className="h-full w-full object-cover"
            
          />
        )}
      </div>
      {/* White card — text only, top padding clears the icon */}
      <div
        className="rounded-2xl border border-white/80 bg-white/70 p-[5px] md:p-[10px] backdrop-blur-sm"
        style={{ boxShadow: CARD_SHADOW }}
      >
        <span className="text-[14px] font-semibold leading-snug text-[#0A4B6E]">
          {title}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function ConnectedTo() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden px-6 md:py-16 lg:px-[60px]">
        {/* Grid background — centered in the section */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70 h-[400px]"
          style={{
            backgroundImage: "url('/workforce/Grids.webp')",
            backgroundSize: "contain",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="relative mx-auto flex w-full min-h-[340px] max-w-[1410px] flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">
          {/* Left — hub diagram */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportReveal}
            variants={loadIn}
            className="w-full shrink-0  h-[340px] lg:w-[480px]"
          >
            {/* Replace src with your actual hub image */}
            <Image
              src="/workforce/connected-hub1.svg"
              alt="V-Watch Ai connected to workforce systems"
              width={480}
              height={300}
              className="h-full w-full object-contain"
              unoptimized
            />
          </motion.div>

          {/* Right — 2-column card grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportReveal}
            className="grid w-full grid-cols-1 gap-[24px] sm:grid-cols-2"
          >
            {FEATURES.map(({ title, iconSrc }) => (
              <FeatureCard key={title} title={title} iconSrc={iconSrc} />
            ))}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
