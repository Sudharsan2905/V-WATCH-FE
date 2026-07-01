"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { scaleIn, staggerContainer, viewportReveal } from "../anim";

type FeatureCardData = {
  key: string;
  fullIcon: string;
  title: string;
  body: string;
};

const FEATURE_CARDS: FeatureCardData[] = [
  {
    key: "realtime",
    fullIcon: "/about/diff-icon-realtime.svg",
    title: "Real-Time Visibility Across Operations",
    body: "From access to movement to execution everything is tracked live.",
  },
  {
    key: "scale",
    fullIcon: "/about/diff-icon-scale.svg",
    title: "Built for Scale and Complexity",
    body: "Designed to support large workforces, multiple stakeholders, and high-activity environments.",
  },
  {
    key: "proof",
    fullIcon: "/about/diff-icon-proof.svg",
    title: "Proof-Driven, Not Assumption-Based",
    body: "Every action is backed by data — providing clear, verifiable insights.",
  },
  {
    key: "unified",
    fullIcon: "/about/diff-icon-unified.svg",
    title: "A Unified System Not Separate Tools",
    body: "All critical functions are connected in one platform.",
  },
];

function FeatureCard({ card }: { card: FeatureCardData }) {
  return (
    <motion.div
      variants={scaleIn}
      className="bg-white rounded-[22px] p-[18px] lg:p-[24px] shadow-[0px_4px_24px_rgba(10,75,110,0.07)] flex flex-col gap-[16px] lg:gap-[20px]"
    >
      <div className="relative size-[56px] lg:size-[60px] flex-shrink-0">
        <Image
          src={card.fullIcon}
          alt=""
          fill
          className="object-contain"
          sizes="60px"
        />
      </div>
      <div>
        <h4 className="font-['Lato'] text-[18px] font-bold leading-[100%] tracking-[0px] text-[#0F172A] mb-[8px]">
          {card.title}
        </h4>
        <p className="font-['Lato'] text-[16px] font-normal leading-[24px] tracking-[0px] text-[#314158]">
          {card.body}
        </p>
      </div>
    </motion.div>
  );
}

export default function WhatMakesUsDifferent() {
  return (
    <section className="relative z-10 bg-white py-[60px] lg:py-[80px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(75% 85% at 0% 100%, #CAE5EB 0%, rgba(202,229,235,0) 68%), " +
            "radial-gradient(75% 85% at 100% 100%, #EAF4DE 0%, rgba(234,244,222,0) 68%), " +
            "radial-gradient(60% 55% at 33% 45%, #CAE5EB 0%, rgba(202,229,235,0) 70%), " +
            "radial-gradient(60% 55% at 67% 45%, #E3F1D6 0%, rgba(227,241,214,0) 70%), " +
            "#FFFFFF",
        }}
      />
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[60px]">
        {/* Section heading with decorative lines */}
        <div className="flex items-center mb-[40px] lg:mb-[48px]">
          {/* Left line fading into dot */}
          <div className="flex-1 flex items-center">
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(to right, transparent, #0a4b6e)" }}
            />
            <div className="w-[7px] h-[7px] rounded-full bg-[#0a4b6e] flex-shrink-0" />
          </div>

          <h2 className="font-['Lato'] text-[24px] font-bold leading-[100%] tracking-[0px] text-center text-[#0A4B6E] whitespace-nowrap px-4">
            What make us different
          </h2>

          {/* Right dot fading into line */}
          <div className="flex-1 flex items-center">
            <div className="w-[7px] h-[7px] rounded-full bg-[#0a4b6e] flex-shrink-0" />
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(to left, transparent, #0a4b6e)" }}
            />
          </div>
        </div>

        {/* 4 cards in a single row */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportReveal}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px] lg:gap-[24px]"
        >
          {FEATURE_CARDS.map((card) => (
            <FeatureCard key={card.key} card={card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
