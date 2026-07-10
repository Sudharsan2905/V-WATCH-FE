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

const FEATURES = [
  {
    icon: "/real-time-headcount/track.svg",
    title: "Track",
    body: "Workforce presence is continuously tracked through access control and RTLS.",
  },
  {
    icon: "/real-time-headcount/detect.svg",
    title: "Detect",
    body: "System identifies real-time status during an incident.",
  },
  {
    icon: "/real-time-headcount/display.svg",
    title: "Display",
    body: "Live dashboard shows headcount and evacuation progress.",
  },
  {
    icon: "/real-time-headcount/respond.svg",
    title: "Respond",
    body: "Teams act immediately with accurate, complete information.",
  },
];

const CARD_SHADOW =
  "6px 10px 23px 0 rgba(217,226,255,0.85), 0 13px 100px 0 rgba(199,199,199,0.25)";
const ICON_SHADOW =
  "9px 7px 60px 0 rgba(255,255,255,0.40), 6px 10px 23px 0 rgba(217,226,255,0.85), 0 13px 100px 0 rgba(199,199,199,0.25)";

function FeatureCard({ icon, title, body }: Readonly<(typeof FEATURES)[number]>) {
  return (
    <motion.div
      variants={scaleIn}
      className="flex min-h-[200px] flex-1 flex-col justify-center gap-[14px] rounded-[20px] border-2 border-white bg-[rgba(244,251,255,0.20)] p-5"
      style={{ boxShadow: CARD_SHADOW }}
    >
      {/* Icon tile */}
      <div
        className="flex size-[54px] shrink-0 items-center justify-center overflow-hidden rounded-[16px]"
        style={{ boxShadow: ICON_SHADOW }}
      >
        <Image
          src={icon}
          alt=""
          width={160}
          height={160}
          aria-hidden="true"
          className="h-[54px] w-[54px]  border-2 border-white scale-[4.8] translate-y-[9%] object-contain"
        />
      </div>
      <h3 className="text-[20px] font-bold leading-[100%] tracking-[0px] text-[#0F172A]">{title}</h3>
      <p className="text-[18px] font-normal leading-[24px] tracking-[-0.2%] text-[#0F172A]">{body}</p>
    </motion.div>
  );
}

export default function HeadcountFeatureGrid() {
  return (
    <section className="px-6 pb-12 lg:pb-20 lg:px-[60px]">
      <div className="flex w-full max-w-[1410px] flex-col gap-[30px]">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportReveal}
          variants={wipeTop}
          className="w-full text-[20px] font-normal leading-[28px] tracking-[0%] text-[#0A4B6E] max-w-[953px]"
        >
          V-Watch AI provides real-time headcount and muster visibility giving you immediate insight into workforce status during emergencies.
        </motion.div>

        {/* Image + 2×2 card grid */}
        <div className="flex w-full flex-col gap-[30px] lg:flex-row lg:items-stretch">
          {/* Left illustration */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportReveal}
            variants={loadIn}
            className="relative aspect-[352/427] w-full max-w-[360px] self-center overflow-hidden rounded-[24px] border-2 border-white lg:aspect-auto lg:max-w-none lg:w-[352px] lg:shrink-0 lg:self-stretch"
          >
            <Image
              src="/maintenance/maintenance-features.webp"
              alt="V-Watch AI real-time headcount overview"
              fill
              sizes="(min-width: 1024px) 352px, 100vw"
              className="object-cover"
            />
          </motion.div>

          {/* Cards — 1 col on mobile, 2×2 on sm+ */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportReveal}
            className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2"
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
