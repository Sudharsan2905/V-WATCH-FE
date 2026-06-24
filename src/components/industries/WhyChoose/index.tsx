"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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

const fromLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: EASE, delay },
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

// Figma card shape: rectangular step-notch at TL with a cubic-bezier concave inner corner.
// Left-side geometry is fixed; right side scales with card width.
// Notch: bottom edge at y=72, right edge at x=72.906, concave arc C(56.788,72)(72.906,55.882)(72.906,36)
// Corner radius: 24px (Figma: 24 = 10.745 bezier tangent inset)
const CARD_H = 400;
const R = 24;       // corner radius
const T = 10.745;   // bezier tangent inset for R=24 quarter-circle (= R*(1-0.5523))

function buildCardPath(w: number): string {
  const h = CARD_H;
  return (
    // Start at bottom-right, go clockwise
    `M${w} ${h - R}` +
    // Bottom-right corner
    ` C${w} ${h - T} ${w - T} ${h} ${w - R} ${h}` +
    // Bottom edge →left
    ` H${R}` +
    // Bottom-left corner
    ` C${T} ${h} 0 ${h - T} 0 ${h - R}` +
    // Left edge going up to notch bottom
    ` V96` +
    // Round into notch horizontal edge (left inner notch corner, r=24)
    ` C0 82.745 ${T} 72 ${R} 72` +
    // Notch horizontal bottom edge
    ` H36.906` +
    // Figma concave arc: cubic bezier from (36.906,72) → (72.906,36)
    // tangent is horizontal at start and vertical at end — smooth concave corner
    ` C56.788 72 72.906 55.882 72.906 36` +
    // Notch right vertical edge going up
    ` V${R}` +
    // Round into top edge (top-left inner notch corner, r=24)
    ` C72.906 ${T} 83.651 0 96.906 0` +
    // Top edge →right
    ` H${w - R}` +
    // Top-right corner
    ` C${w - T} 0 ${w} ${T} ${w} ${R}` +
    // Right edge going down
    ` V${h - R} Z`
  );
}

function ConnectCard({
  title,
  logo,
  image,
  content,
  delay = 0,
}: Readonly<{ title: string; logo: string; image: string; content?: string; delay?: number }>) {
  const split = title.match(/^(.*?\bAI\b)\s*(.*)$/i);
  const lead = split ? split[1] : title;
  const tail = split ? split[2] : "";

  const cardRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(380);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      if (el.offsetWidth) setCardWidth(el.offsetWidth);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      variants={fromLeft}
      custom={delay}
      className="relative w-full lg:w-[380px]"
      style={{ height: CARD_H }}
    >
      {/* SVG card shape: Figma path — white fill, border stroke, drop-shadow */}
      <svg
        className="pointer-events-none absolute left-0 top-0 z-[1] overflow-visible"
        width={cardWidth}
        height={CARD_H}
        aria-hidden
        style={{
          filter:
            "drop-shadow(6px 10px 23px rgba(217,226,255,0.85))",
        }}
      >
        <path
          d={buildCardPath(cardWidth)}
          fill="white"
          stroke="#E6EAF0"
          strokeWidth="1"
        />
      </svg>

      {/* Badge — sits in the step-notch at the top-left */}
      <div className="absolute -top-1 -left-1 z-20 flex size-[72px] items-center justify-center rounded-full">
        <div className="relative flex size-[58px] items-center justify-center overflow-hidden rounded-full">
          <Image
            src={logo}
            alt=""
            width={58}
            height={58}
            unoptimized
            className="absolute inset-0 size-full object-cover"
          />
          <Image
            src="/industries/construction/v-watch-ai/logo.png"
            alt="V-Watch"
            width={44}
            height={14}
            unoptimized
            className="relative z-10 w-full object-contain"
          />
        </div>
      </div>

      {/* Card content */}
      <div className="relative z-10 flex h-full flex-col gap-4 p-4">
        {/* Title — left-padded to clear the badge notch */}
        <div className="relative pl-[84px] pt-1">
          <p className="text-[18px] leading-[23px] text-[#1E3A52]">
            <span className="block font-extrabold">{lead}</span>
            {tail && <span className="block font-medium text-[#3890C0]">{tail}</span>}
          </p>
          {/* Blue connector line + end dot — mobile/tablet: right-anchored below title */}
          <span className="pointer-events-none absolute -right-4 -bottom-3 flex items-center lg:hidden">
            <span className="h-[2px] w-[200px] rounded-full bg-gradient-to-r from-[#C6E3F8] to-[#3D8FD6]" />
            <span className="size-2.5 rounded-full bg-[#3D8FD6]" />
          </span>
        </div>

        {/* Blue connector line + end dot — desktop: absolute positioned */}
        <span className="pointer-events-none absolute right-2 top-[70px] hidden items-center lg:flex">
          <span className="h-[2px] w-[200px] rounded-full bg-gradient-to-r from-[#C6E3F8] to-[#3D8FD6]" />
          <span className="size-2.5 rounded-full bg-[#3D8FD6]" />
        </span>

        {/* AI visual */}
        <div className="group relative overflow-hidden rounded-[16px]">
          <Image
            src={image}
            alt=""
            width={370}
            height={305}
            unoptimized
            className="h-[304px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          {content && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
              <div className="rounded-[12px] border border-white/25 bg-white/15 p-3 shadow-[0_8px_30px_rgba(10,75,110,0.25)] backdrop-blur-md">
                <p className="text-[14px] font-medium leading-[19px] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
                  {content}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Connectors({ delay = 0 }: Readonly<{ delay?: number }>) {
  const base = "/industries/construction/v-watch-ai";
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      className="relative z-10 hidden self-stretch lg:block lg:w-[240px]"
    >
      {/* Upper link → row 1 (top half, meeting the center line on the left).
          Each link is shifted 5px left and widened by 10px so it tucks 5px
          under the left card and 5px under the right value cards (z-10). */}
      <Image
        src={`${base}/top.png`}
        alt=""
        width={493}
        height={181}
        unoptimized
        className="absolute -left-[20px] top-2 h-1/2 w-[calc(100%+10px)] object-fill"
      />
      {/* Lower link → row 3 (bottom half) */}
      <Image
        src={`${base}/down.png`}
        alt=""
        width={486}
        height={184}
        unoptimized
        className="absolute bottom-3 -left-[20px] h-1/2 w-[calc(100%+10px)] object-fill"
      />
      {/* Straight link → row 2 */}
      <Image
        src={`${base}/center.png`}
        alt=""
        width={483}
        height={23}
        unoptimized
        className="absolute -left-[20px]  top-1/2 h-auto w-[calc(100%+10px)] -translate-y-1/2"
      />
    </motion.div>
  );
}

function ValueRow({
  item,
  delay = 0,
}: Readonly<{ item: WhyChooseItem; delay?: number }>) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      className="flex items-center gap-4 rounded-[18px] border border-white  px-5 py-4 shadow-[0px_20px_44px_-26px_rgba(20,46,92,0.30),0px_1px_6px_rgba(20,46,92,0.04)]"
       style={{
    background: "rgba(255, 255, 255, 0.12)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  }}
    >
      <div className="border border-white rounded-[10px] p-2">
      <Image
        src={item.icon}
        alt=""
        width={36}
        height={36}
        unoptimized
        className="size-9 shrink-0 object-contain"
      />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-[16px] font-bold leading-[20px] text-[#0A4B6E]">{item.title}</p>
        <p className="text-[14px] leading-[19px] text-[#5B7385]">{item.desc}</p>
      </div>
      <Image src={item.number} alt="" width={56} height={40} unoptimized className="h-9 w-auto shrink-0 object-contain" />
    </motion.div>
  );
}

export default function WhyChoose({
  whyChoose = {},
}: Readonly<{ whyChoose?: WhyChooseContent }> = {}) {
  const {
    heading    = "Why teams choose V-Watch Ai",
    subheading = "Most solutions address only one part of the problem.",
    cardTitle  = "V-Watch AI connects everything.",
    cardLogo   = "/industries/construction/v-watch-ai/vwatch.png",
    cardImage  = "/industries/construction/v-watch-ai/commerical.webp",
    items      = [],
    cardContent = ""
  } = whyChoose;

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative z-10 overflow-hidden bg-white px-6 py-16 lg:px-[60px]">
        <Image src="/industries/construction/v-watch-ai/ai-bg.png" alt="" fill sizes="100vw" className="pointer-events-none select-none object-fill" />

        <motion.div
          className="relative mx-auto flex w-full max-w-[1320px] flex-col gap-10"
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
              className="text-[16px] font-normal text-[#3890C0]"
            >
              {subheading}
            </motion.p>
          </header>

          {/* Connect card → connectors → value rows */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-0">
            <ConnectCard title={cardTitle} logo={cardLogo} image={cardImage} content={cardContent} delay={0.3} />

          <div className="flex w-full flex-col gap-8 lg:w-auto lg:flex-1 lg:flex-row lg:items-stretch lg:gap-0">
            <Connectors delay={0.5} />

            <div className="z-100 -ml-[40px] flex w-full flex-col justify-between gap-6 lg:flex-1">
              {items.map((item, i) => (
                <ValueRow key={item.title} item={item} delay={0.55 + i * 0.15} />
              ))}
            </div>
          </div>
        </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
