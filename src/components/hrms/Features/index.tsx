"use client";

import Image from "next/image";
import { motion, MotionConfig } from "motion/react";
import {
  fadeUp,
  loadIn,
  staggerContainer,
} from "@/components/about/anim";
import { HRMS_FEATURES, FLOATING_CARDS } from "@/constants/hrms-features";

// A later trigger than the shared `viewportReveal` (amount 0.2, no margin):
// with Lenis smoothing the scroll, firing as the section's top edge peeks over
// the viewport bottom leaves the reveal finished before it's really on screen.
const VIEWPORT = {
  once: true,
  amount: 0.3,
  margin: "0px 0px -120px 0px",
} as const;

const CONTAINER_SHADOW =
  "inset -20px -6px 64px rgba(255,255,255,0.80), inset 0px 4px 74px rgba(255,255,255,0.60)";

function FeatureCard({
  number,
  title,
  bullets,
  index,
  hasCenteredContent = false,
  className = "",
}: {
  number: string;
  title: string;
  bullets: string[];
  index: number;
  hasCenteredContent?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index * 0.1}
      className={`relative flex flex-col p-5 ${hasCenteredContent ? "justify-center" : ""} ${className}`}
    >
      {/* Surface layer. The fill, the rounded left edge and the shadow all live
          here rather than on the card itself so a mask can dissolve the right
          edge into the panel — otherwise the 1px white ring draws a hard line
          down the right side. Content sits above it, unmasked and opaque. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-l-[40px] bg-[linear-gradient(90deg,#F1F6FF_0%,#E6F2FC_100%)]"
        style={{
          boxShadow:
            "0 4px 24px rgba(100,180,230,0.18), 0 0 0 1px rgba(255,255,255,0.85)",
          maskImage: "linear-gradient(to right, #000 62%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, #000 62%, transparent 100%)",
        }}
      />

      <div className="relative flex flex-col gap-4">
        <div
          className="rounded-[31px] h-[44px] w-[44px] flex items-center justify-center"
          style={{
            background:
              "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), linear-gradient(180deg, #21B1F1 0%, #A6C936 100%)",
          }}
        >
          <Image
            src={HRMS_FEATURES[index].icon}
            alt={title}
            width={20}
            height={20}
          />
        </div>

        <div className="flex items-center gap-2.5">
          <span className="font-lato text-[25px] md:text-[32px] font-bold text-[#5CB7E8]">
            {number}
          </span>
          <span className="font-lato text-[24px] font-bold text-[#0A4B6E]">
            {title}
          </span>
        </div>

        <div className="flex flex-col gap-3.5 pl-4">
          {bullets.map((bullet) => (
            <div key={bullet} className="shrink-0 flex items-center gap-2.5">
              <div className="flex h-[21px] w-[21px]">
                <Image
                  src="/hrms/Features/tick_icon.svg"
                  alt="bullet"
                  width={21}
                  height={21}
                  className="shrink-0 h-[21px] w-[21px]"
                />
              </div>mm
              <span className="font-lato text-[18px] leading-[24px] text-[#314158]">
                {bullet}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function HrmsFeatures() {
  const [card1, card2, card3, card4, card5, card6] = HRMS_FEATURES;

  return (
    <MotionConfig reducedMotion="user">
      <section className="bg-[#f7fbfe] relative overflow-hidden px-6 py-10 lg:px-[60px]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={staggerContainer}
          className="mx-auto w-full max-w-[1080px] rounded-[32px] "
          style={{ boxShadow: CONTAINER_SHADOW }}
        >
          {/*
            One grid at every size, re-spanned per breakpoint:
            Phone  — single column, image first.
            Tablet — image full width, then all six cards two per row, so no
                     card is left full-width or orphaned on its own row.
            Desktop— card 1 + image (5/7), then cards 2-3 (6/6), then 4-6 (4/4/4).
          */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
            <FeatureCard
              number={card1.number}
              title={card1.title}
              bullets={card1.bullets}
              index={0}
              hasCenteredContent={true}
              className="lg:col-span-5 lg:min-h-[420px]"
            />

            <div className="order-first overflow-hidden rounded-[50px] md:col-span-2 lg:order-none lg:col-span-7">
              {/* Intrinsic size matches the asset's 527x359 viewBox — a
                  mismatched ratio here is what let object-cover crop the
                  phones. Height stays auto so the full frame always shows. */}
              <Image
                src="/hrms/Features/Mobile_shows.webp"
                alt="mobile_image"
                width={527}
                height={359}
                className="h-auto w-full"
              />
            </div>

            <FeatureCard
              number={card2.number}
              title={card2.title}
              bullets={card2.bullets}
              index={1}
              className="lg:col-span-6"
            />
            <FeatureCard
              number={card3.number}
              title={card3.title}
              bullets={card3.bullets}
              index={2}
              className="lg:col-span-6"
            />
            <FeatureCard
              number={card4.number}
              title={card4.title}
              bullets={card4.bullets}
              index={3}
              className="lg:col-span-4"
            />
            <FeatureCard
              number={card5.number}
              title={card5.title}
              bullets={card5.bullets}
              index={4}
              className="lg:col-span-4"
            />
            <FeatureCard
              number={card6.number}
              title={card6.title}
              bullets={card6.bullets}
              index={5}
              className="lg:col-span-4"
            />
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
