"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Header reveals top → bottom
const wipeDown: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  show: (delay = 0) => ({
    clipPath: "inset(0 0 0% 0)",
    transition: { delay, duration: 0.65, ease: EASE },
  }),
};

// Right-column images reveal bottom → top (wipebottom)
const wipeUp: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  show: (delay = 0) => ({
    clipPath: "inset(0% 0 0 0)",
    transition: { delay, duration: 0.7, ease: EASE },
  }),
};

// Cards + results: fade up (loadIn)
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay },
  }),
};

const CARDS_START = 0.4;
const CARD_STAGGER = 0.15;
const SUMMARY_DELAY = 0.9;
const RESULT_LABEL_DELAY = 1.1;
const RESULTS_START = 1.3;
const RESULT_STAGGER = 0.15;
const IMGS_START = 0.4;
const IMG_STAGGER = 0.2;

// ─── Types ────────────────────────────────────────────────────────────────────

type Feature = { icon: string; title: string };

type ChallengesContent = {
  heading?: string;
  subheading?: string;
  features?: Feature[];
  summary?: string;
  resultLabel?: string;
  results?: string[];
  callout?: string;
  calloutIcon?: string;
  calloutWidth?: number;
  images?: string[];
};



function FeatureCard({
  icon,
  title,
  delay = 0,
}: Readonly<Feature & { delay?: number }>) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      className="relative flex h-[140px] w-full flex-col gap-3 rounded-[24px] p-5"
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #FCFAFB 100%)",
        boxShadow: `
          inset 0 0 0 1px rgba(255,238,233,0.9),
          inset 0 0 22px 6px rgba(255,224,217,0.55),
          inset 0 1px 0 rgba(255,255,255,0.9),
          0 24px 48px rgba(15,23,42,0.05)
        `,
      }}
    >
      <Image
        src={icon}
        alt=""
        width={36}
        height={36}
        unoptimized
        className="size-[36px] object-contain"
      />
      <p className="text-[18px] font-regular font-[400] leading-[23px] text-[#1E293B]">
        {title}
      </p>
    </motion.div>
  );
}

function CollageImg({
  src,
  w,
  h,
  className,
}: Readonly<{ src: string; w: number; h: number; className?: string }>) {
  return (
    <Image
      src={src}
      alt=""
      width={w}
      height={h}
      className={`h-auto ${className ?? ""}`}
      style={{ maxWidth: w, maxHeight: h }}
    />
  );
}

function DotGrid({ className }: Readonly<{ className?: string }>) {
  return (
    <div
      className={`pointer-events-none ${className ?? ""}`}
      style={{
        width: 112,
        height: 38,
        backgroundImage: "radial-gradient(#A9C9DE 1.3px, transparent 1.4px)",
        backgroundSize: "12px 11px",
        opacity: 0.7,
      }}
    />
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function Challenges({
  challenges = {},
}: Readonly<{ challenges?: ChallengesContent }> = {}) {
  const {
    heading = "Sites are complex and difficult to control",
    subheading = "Every project involves multiple moving parts",
    features = [],
    summary = "But most sites still rely on manual processes and disconnected systems.",
    resultLabel = "The Result",
    results = [],
    // callout = "When visibility is incomplete, risks increase and control is lost.",
    // calloutIcon = "/industries/construction/sites/grow-light.svg",
    // calloutWidth = 376,
    images = [],
  } = challenges;

  const [aerial, worker, lower, crane] = images;

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative z-10 overflow-hidden bg-[#f5fbff] px-6 pb-16 lg:px-[60px] lg:pb-24">
        <motion.div
          className="mx-auto flex w-full max-w-[1320px] flex-col gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Header — wipeDown */}
          <header className="flex flex-col gap-2.5">
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
              className="text-[20px] font-normal text-[#0A4B6E]"
            >
              {subheading}
            </motion.p>
          </header>

          {/* Two columns */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            {/* Left column — feature cards + results (loadIn) */}
            <div className="flex w-full min-w-0 flex-col gap-7 lg:flex-1">
              {features.length > 0 && (
                <div className="relative grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {/* Cross dividers */}
                  <div className="pointer-events-none absolute inset-0 z-10 hidden sm:block lg:hidden xl:block">
                    <div
                      className="absolute left-1/2 top-1 h-[calc(50%-12px)] w-px -translate-x-1/2"
                      style={{ background: "rgba(255, 147, 132, 0.4" }}
                    />
                    <div
                      className="absolute bottom-1 left-1/2 h-[calc(50%-12px)] w-px -translate-x-1/2"
                      style={{ background: "rgba(255, 147, 132, 0.4" }}
                    />
                    <div
                      className="absolute left-1 top-1/2 h-px w-[calc(50%-12px)] -translate-y-1/2"
                      style={{ background: "rgba(255, 147, 132, 0.4)" }}
                    />
                    <div
                      className="absolute right-1 top-1/2 h-px w-[calc(50%-12px)] -translate-y-1/2"
                      style={{ background: "rgba(255, 147, 132, 0.4" }}
                    />
                  </div>
                  {features.map((f, i) => (
                    <FeatureCard
                      key={f.title}
                      {...f}
                      delay={CARDS_START + i * CARD_STAGGER}
                    />
                  ))}
                </div>
              )}

              <motion.p
                variants={fadeUp}
                custom={SUMMARY_DELAY}
                className="text-[16px] font-bold text-[#0A4B6E]"
              >
                {summary}
              </motion.p>

              <div className="flex flex-col gap-3">
                <motion.p
                  variants={fadeUp}
                  custom={RESULT_LABEL_DELAY}
                  className="text-[13px] font-bold uppercase tracking-[1.5px] text-[#36B37E]"
                >
                  {resultLabel}
                </motion.p>
                <ul className="flex flex-col gap-2.5">
                  {results.map((r, i) => (
                    <motion.li
                      key={r}
                      variants={fadeUp}
                      custom={RESULTS_START + i * RESULT_STAGGER}
                      className="flex items-start gap-2.5"
                    >
                      <Image
                        src="/industries/construction/checkicon.svg"
                        width={24}
                        height={24}
                        alt="Check"
                      />
                      <span className="text-[15px] leading-[20px] text-[#314158]">
                        {r}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right column — photo collage (wipebottom) */}
            <div className="relative w-full shrink-0 lg:w-[540px]">
              <DotGrid className="absolute top-4 z-10 hidden lg:block lg:left-[calc(22%_-_56px)]" />

              {images.length >= 4 && (
                <div className="mx-auto flex max-w-[500px] flex-col gap-3 overflow-hidden sm:gap-4 lg:mx-0 lg:max-w-none">
                  {/* Top row — aerial offset down, worker starts at top */}
                  <div className="flex items-start gap-3 sm:gap-4">
                    <motion.div
                      variants={wipeUp}
                      custom={IMGS_START}
                      className="w-[42%] max-w-[210px] overflow-hidden pt-6 sm:pt-10 lg:pt-14"
                    >
                      <CollageImg src={aerial} w={210} h={297} className="w-full" />
                    </motion.div>
                    <motion.div
                      variants={wipeUp}
                      custom={IMGS_START + IMG_STAGGER}
                      className="flex-1 overflow-hidden"
                    >
                      <CollageImg src={worker} w={270} h={355} className="w-full" />
                    </motion.div>
                  </div>
                  {/* Bottom row — entire row shifted right to match Figma stagger */}
                  <div className="flex items-start gap-3 ml-[18%] mr-[12%] sm:ml-[20%] sm:mr-[10%] sm:gap-4">
                    <motion.div
                      variants={wipeUp}
                      custom={IMGS_START + IMG_STAGGER * 2}
                      className="flex-1 overflow-hidden max-w-[166px]"
                    >
                      <CollageImg src={lower} w={166} h={212} className="w-full" />
                    </motion.div>
                    <motion.div
                      variants={wipeUp}
                      custom={IMGS_START + IMG_STAGGER * 3}
                      className="flex-1 overflow-hidden max-w-[200px]"
                    >
                      <CollageImg src={crane} w={200} h={265} className="w-full" />
                    </motion.div>
                  </div>
                </div>
              )}


            </div>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
