"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const wipeDown: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  show: (delay = 0) => ({
    clipPath: "inset(0 0 0% 0)",
    transition: { delay, duration: 0.65, ease: EASE },
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

type WhyChooseItem = { icon: string; title: string; desc: string; number: string };

type WhyChooseContent = {
  heading?: string;
  subheading?: string;
  cardTitle?: string;
  cardLogo?: string;
  cardImage?: string;
  items?: WhyChooseItem[];
  cardContent?: string;
};

function ValueRow({
  item,
  delay = 0,
}: Readonly<{ item: WhyChooseItem; delay?: number }>) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      className="flex items-center gap-4 rounded-[18px] bg-white px-5 py-4 shadow-[0px_8px_24px_0px_rgba(10,75,110,0.14)]"
    >
      <div className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-white shadow-[0px_2px_10px_rgba(10,75,110,0.10)]">
        <Image
          src={item.icon}
          alt=""
          width={32}
          height={32}
          unoptimized
          className="size-8 object-contain"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-[18px] font-medium leading-[20px] text-[#1D6C97]">{item.title}</p>
        <p className="text-[16px] font-medium leading-[19px] text-[#0F172A]">{item.desc}</p>
      </div>
      <Image
        src={item.number}
        alt=""
        width={56}
        height={40}
        unoptimized
        className="h-9 w-auto shrink-0 object-contain"
      />
    </motion.div>
  );
}

function ImageCardWithOverlay({
  cardImage,
  cardContent,
}: Readonly<{ cardImage: string; cardContent: string }>) {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div
      className="group relative flex-1 overflow-hidden rounded-[16px] min-h-[280px] cursor-pointer"
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
      onClick={() => setShowOverlay((prev) => !prev)}
    >
      <Image
        src={cardImage}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      {cardContent && (
        <div
          className={`absolute inset-x-0 bottom-0 bg-black/55 px-6 py-4 backdrop-blur-sm transition-all duration-300 ${
            showOverlay
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }`}
        >
          <p className="text-center text-[15px] font-medium leading-[22px] text-white">
            {cardContent}
          </p>
        </div>
      )}
    </div>
  );
}

export default function WhyChoose({
  whyChoose = {},
}: Readonly<{ whyChoose?: WhyChooseContent }> = {}) {
  const {
    heading     = "Why teams choose V-Watch Ai",
    subheading  = "Most solutions address only one part of the problem.",
    cardTitle   = "V-Watch AI connects everything.",
    cardImage   = "/industries/construction/v-watch-ai/commerical.webp",
    items       = [],
    cardContent = "",
  } = whyChoose;

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative z-10 px-6 py-16 lg:px-[60px]" style={{ background: "rgb(252, 252, 252)" }}>
        <motion.div
          className="mx-auto flex w-full max-w-[1320px] flex-col gap-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Header */}
          <header className="flex flex-col gap-2">
            <motion.h2
              variants={wipeDown}
              custom={0.05}
              className="text-[28px] font-extrabold leading-[34px] text-[#0A4B6E]"
            >
              {heading}
            </motion.h2>
            <motion.p
              variants={wipeDown}
              custom={0.2}
              className="font-['Lato'] text-[20px] font-medium leading-[28px] tracking-normal text-[#0A4B6E]"
            >
              {subheading}
            </motion.p>
          </header>

          {/* Left: title + value rows  |  Right: image */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-12">
            {/* Left column */}
            <div className="flex flex-col gap-6 lg:flex-1">
              <motion.p
                variants={fadeUp}
                custom={0.25}
                className="text-[20px] font-bold leading-[26px] text-[#0A4B6E]"
              >
                {cardTitle}
              </motion.p>

              <div className="flex flex-col gap-4">
                {items.map((item, i) => (
                  <ValueRow key={item.title} item={item} delay={0.35 + i * 0.12} />
                ))}
              </div>
            </div>

            {/* Right column — white card wrapping the image */}
            <motion.div
              variants={fadeUp}
              custom={0.3}
              className="lg:flex-1 flex flex-col rounded-[24px] bg-white p-3 min-h-[300px]"
              style={{
                boxShadow: "6px 6px 28px rgba(10, 75, 110, 0.15)",
              }}
            >
              <ImageCardWithOverlay cardImage={cardImage} cardContent={cardContent} />
            </motion.div>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
