"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { loadIn, scaleIn, staggerContainer, viewportReveal } from "../anim";

type FeatureCardData = {
  key: string;
  borderColor: string;
  title: string;
  body: string;
  bgIcon?: string;
  icon?: string;
  // Self-contained 60×60 badge SVG (already includes its own border/background);
  // when present it renders in place of the bgIcon/icon + border wrapper.
  fullIcon?: string;
};

const FEATURE_CARDS: FeatureCardData[] = [
  {
    key: "unified",
    fullIcon: "/about/diff-icon-unified.svg",
    borderColor: "#d4f0ff",
    title: "A Unified System Not Separate Tools",
    body: "All critical functions are connected in one platform.",
  },
  {
    key: "realtime",
    fullIcon: "/about/diff-icon-realtime.svg",
    borderColor: "#ff759f",
    title: "Real-Time Visibility Across Operations",
    body: "From access to movement to execution everything is tracked live.",
  },
  {
    key: "scale",
    fullIcon: "/about/diff-icon-scale.svg",
    borderColor: "#bc94ff",
    title: "Built for Scale and Complexity",
    body: "Designed to support large workforces, multiple stakeholders, and high-activity environments.",
  },
  {
    key: "proof",
    fullIcon: "/about/diff-icon-proof.svg",
    borderColor: "#9bf763",
    title: "Proof-Driven, Not Assumption-Based",
    body: "Every action is backed by data — providing clear, verifiable insights.",
  },
];

function FeatureCard({ card }: { card: FeatureCardData }) {
  return (
    <motion.div
      variants={scaleIn}
      className="bg-white rounded-[22px] p-[18px] lg:p-[20px] shadow-[0px_4px_24px_rgba(10,75,110,0.07)] flex flex-col gap-[12px] lg:gap-[14px]"
    >
      {/* Icon */}
      {card.fullIcon ? (
        <div className="relative size-[56px] lg:size-[60px] flex-shrink-0">
          <Image
            src={card.fullIcon}
            alt=""
            fill
            className="object-contain"
            sizes="60px"
          />
        </div>
      ) : (
        <div
          className="relative size-[56px] lg:size-[60px] rounded-[70px] border-2 flex items-center justify-center flex-shrink-0 overflow-hidden"
          style={{ borderColor: card.borderColor }}
        >
          <div className="absolute inset-0">
            <Image
              src={card.bgIcon!}
              alt=""
              fill
              className="object-cover"
              sizes="60px"
            />
          </div>
          <div className="relative z-10 size-[28px] lg:size-[30px]">
            <Image
              src={card.icon!}
              alt=""
              fill
              className="object-contain"
              sizes="30px"
            />
          </div>
        </div>
      )}
      {/* Text */}
      <div>
        <h4 className="font-bold text-[15px] lg:text-[18px] text-[#0f172a] mb-[6px] leading-[22px]">
          {card.title}
        </h4>
        <p className="text-[13px] lg:text-[16px] text-[#314158] leading-[22px] lg:leading-[24px]">
          {card.body}
        </p>
      </div>
    </motion.div>
  );
}

export default function WhatMakesUsDifferent() {
  return (
    <section className="relative z-10 bg-white py-[60px] lg:py-[60px]">
      {/* Split background: blue (left half) → green (right half), shown in the
          gap behind/between the cards. Soft tints so the white cards stay legible. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          // Two soft glows centered behind the cards — blue on the left,
          // green on the right — plus a half/half blue-green band along the
          // bottom that fades up into white. Surroundings stay white.
          background:
            // bottom-left corner: light blue, fading toward the center & up
            "radial-gradient(75% 85% at 0% 100%, #CAE5EB 0%, rgba(202,229,235,0) 68%), " +
            // bottom-right corner: lighter green, fading toward the center & up
            // (the two collapse softly into white where they meet in the middle)
            "radial-gradient(75% 85% at 100% 100%, #EAF4DE 0%, rgba(234,244,222,0) 68%), " +
            // centered glows behind the cards
            "radial-gradient(60% 55% at 33% 45%, #CAE5EB 0%, rgba(202,229,235,0) 70%), " +
            "radial-gradient(60% 55% at 67% 45%, #E3F1D6 0%, rgba(227,241,214,0) 70%), " +
            "#FFFFFF",
        }}
      />
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[60px]">
        {/* Row 1: large dark card + first feature card */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportReveal}
          variants={staggerContainer}
          className="flex flex-col lg:flex-row items-stretch gap-[16px] lg:gap-[24px] mb-[16px] lg:mb-[24px]"
        >
          {/* Large dark card (Figma node 1043:2665) — CSS background avoids Next.js Image
              stacking issues. The banner (c3a7…) is stretched to fill (100% 100%) over
              #101010, so the door/arrow streaks show without cover-cropping. */}
          <motion.div
            variants={loadIn}
            className="relative flex-1 min-h-[170px] lg:min-h-[194px] rounded-[22px] overflow-hidden"
            style={{
              backgroundImage: "url('/about/diff-card-bg.webp')",
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundColor: "#101010",
              boxShadow: "0 13px 100px 0 rgba(199,199,199,0.25)",
            }}
          >
            {/* AI graphic overlay (Figma node 1043:2666) — a fixed 797×270 box anchored to
                the lower-left (left -22 / bottom -52), so the orb + icons sit in the left
                half while the banner streaks flow right. Because the box is fixed-size and
                left/bottom anchored, the orb (and the V-Watch mark inside it) stay put
                regardless of the fluid card width. */}
            <div className="absolute left-[-22px] bottom-[-52px] w-[797px] h-[270px] pointer-events-none">
              {/* AI graphic — mix-blend-lighten over the banner. Inner background
                  offset/size match Figma's 60.506px 36.177px / 48.204% 81.608%. */}
              <div
                className="absolute inset-0 mix-blend-lighten"
                style={{
                  backgroundImage: "url('/about/diff-card-overlay.webp')",
                  backgroundSize: "48.204% 81.608%",
                  backgroundPosition: "60.506px 36.177px",
                  backgroundRepeat: "no-repeat",
                }}
              />
              {/* V-Watch mark centered in the orb (Figma node 1043:2669) — the 46×9 glyph
                  plus its built-in white glow; placed at the orb position within this box. */}
              <div className="absolute left-[216px] top-[120px] w-[78px] h-[41px]">
                <Image
                  src="/about/diff-card-vw-logo.svg"
                  alt=""
                  fill
                  className="object-contain"
                  sizes="78px"
                />
              </div>
            </div>
            {/* Content */}
            <div className="relative z-10 p-[20px] lg:p-[24px] h-full flex flex-col justify-start min-h-[170px] lg:min-h-[194px]">
              <h3 className="text-[20px] lg:text-[24px] font-bold text-white leading-tight">
                What make us different
              </h3>
            </div>
          </motion.div>

          {/* First feature card */}
          <div className="w-full lg:w-[367px] flex-shrink-0">
            <FeatureCard card={FEATURE_CARDS[0]} />
          </div>
        </motion.div>

        {/* Row 2: 3 feature cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportReveal}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] lg:gap-[24px]"
        >
          {FEATURE_CARDS.slice(1).map((card) => (
            <FeatureCard key={card.key} card={card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
