"use client";

import Image from "next/image";
import { motion, MotionConfig } from "motion/react";
import {
  fadeUp,
  loadIn,
  staggerContainer,
  viewportReveal,
} from "@/components/about/anim";
import { HRMS_FEATURES, FLOATING_CARDS } from "@/constants/hrms-features";

const CONTAINER_SHADOW =
  "inset -20px -6px 64px rgba(255,255,255,0.80), inset 0px 4px 74px rgba(255,255,255,0.60)";

function FeatureCard({
  number,
  title,
  bullets,
  index,
  hasCenteredContent = false,
}: {
  number: string;
  title: string;
  bullets: string[];
  index: number;
  hasCenteredContent?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index * 0.1}
      className={`flex flex-col gap-4 rounded-l-[40px] bg-[linear-gradient(90deg,#F1F6FF_0%,#E6F2FC_100%)] p-5 ${hasCenteredContent ? "justify-center" : ""}`}
      style={{
        boxShadow:
          "0 4px 24px rgba(100,180,230,0.18), 0 0 0 1px rgba(255,255,255,0.85)",
      }}
    >
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
            </div>
            <span className="font-lato text-[18px] leading-[24px] text-[#314158]">
              {bullet}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function FloatingCard({
  title,
  subtitle,
  iconBg,
}: {
  title: string;
  subtitle: string;
  iconBg: string;
  width?: number;
}) {
  return (
    <div className="z-100 flex items-center gap-2 rounded-[10px] bg-white">
      <div className="flex h-[22.8px] w-[22.8px]">
        <Image src={iconBg} alt={title} width={22.8} height={22.8} />
      </div>
      <div className="flex flex-col">
        <span className="font-lato text-[10px] font-bold leading-tight text-[#17181B]">
          {title}
        </span>
        <span className="font-lato text-[9px] leading-tight text-[#9CA2AA]">
          {subtitle.replace("\n", " ")}
        </span>
      </div>
    </div>
  );
}

function PhoneShowcase() {
  return (
    <motion.div
      variants={loadIn}
      className="flex justify-center items-center relative h-[380px] w-full rounded-[32px] bg-white lg:h-full lg:max-h-[380px]"
      style={{
        boxShadow: "2px -4px 10px rgba(126,207,250,.16)",
      }}
    >
      <div className="relative max-h-[358px] h-full max-w-[331px] w-full ">
        <Image
          src="/hrms/Features/feature_mobile.png"
          alt="mobile_image"
          fill
          className="object-contain h-[458px] w-full"
        />
      </div>

      {/* Floating notification cards */}
      <div className="pointer-events-none absolute inset-0">
        {FLOATING_CARDS.map((card) => {
          const posClass =
            card.position === "top-left"
              ? "top-4 left-4"
              : card.position === "top-right"
                ? "top-4 right-4"
                : card.position === "bottom-left"
                  ? "bottom-4 left-4"
                  : "bottom-4 right-4";

          return (
            <motion.div
              key={card.title}
              variants={fadeUp}
              className={`absolute w-[140px] h-[40px] px-[10px] py-2 bg-white rounded-[10px] ${posClass}`}
              style={{
                boxShadow: "0 4px 12px rgba(0,0,0,.08)",
              }}
            >
              <FloatingCard
                title={card.title}
                subtitle={card.subtitle}
                iconBg={card.iconBg}
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function HrmsFeatures() {
  const [card1, card2, card3, card4, card5, card6] = HRMS_FEATURES;

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden px-6 py-10 lg:px-[60px]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportReveal}
          variants={staggerContainer}
          className="mx-auto w-full max-w-[1080px] rounded-[32px] "
          style={{ boxShadow: CONTAINER_SHADOW }}
        >
          {/* Row 1: Card 1 (Large) + Phone Showcase */}
          <div className="grid min-h-[420px] grid-cols-1 gap-4 lg:grid-cols-[451px_1fr]">
            <FeatureCard
              number={card1.number}
              title={card1.title}
              bullets={card1.bullets}
              index={0}
              hasCenteredContent={true}
            />

            {/* <PhoneShowcase /> */}
            <div className="overflow-hidden rounded-[50px]">
              <Image
                src="/hrms/Features/Mobile_shows.jpg"
                alt="mobile_image"
                width={331}
                height={398}
                className="lg:h-[358px] w-full object-cover"
              />
            </div>
          </div>

          {/* Row 2: Card 2 + Card 3 */}
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <FeatureCard
              number={card2.number}
              title={card2.title}
              bullets={card2.bullets}
              index={1}
            />
            <FeatureCard
              number={card3.number}
              title={card3.title}
              bullets={card3.bullets}
              index={2}
            />
          </div>

          {/* Row 3: Card 4 + Card 5 + Card 6 */}
          <div className="mt-4 grid-cols-1 grid md:grid-cols-2 gap-4 lg:grid-cols-3">
            <FeatureCard
              number={card4.number}
              title={card4.title}
              bullets={card4.bullets}
              index={3}
            />
            <FeatureCard
              number={card5.number}
              title={card5.title}
              bullets={card5.bullets}
              index={4}
            />
            <FeatureCard
              number={card6.number}
              title={card6.title}
              bullets={card6.bullets}
              index={5}
            />
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
