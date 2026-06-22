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
  images?: string[];
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[]">
      <svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-3.5">
        <path
          d="M3.5 8.2 6.5 11l6-6.5"
          stroke="#36B37E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function FeatureCard({
  icon,
  title,
  delay = 0,
}: Readonly<Feature & { delay?: number }>) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      className="relative flex min-h-[180px] flex-col gap-6 rounded-[30px] px-10 py-8"
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
        width={42}
        height={42}
        unoptimized
        className="size-[42px] object-contain"
      />
      <p className="text-[18px] font-bold leading-[24px] text-[#1E293B]">
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
      unoptimized
      className={`h-auto ${className ?? ""}`}
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

function CalloutPill({ text, icon }: Readonly<{ text: string; icon: string }>) {
  return (
    <div className="relative flex items-end">
      {/* Icon card — solid white, sits on top */}
      <div className="relative z-10 flex shrink-0 items-center justify-center rounded-[20px] border border-white/80 bg-white px-2 py-2 shadow-[0px_8px_24px_rgba(120,170,205,0.20)]">
        <Image
          src={icon}
          alt=""
          width={50}
          height={80}
          unoptimized
          className="drop-shadow-[0_8px_18px_rgba(120,170,205,0.35)]"
        />
      </div>
      {/* Text card — frosted glass, overlaps icon card on the left */}
      <div className="-ml-4 rounded-[14px] border border-white/80 bg-white/40 py-2 pl-8 pr-6 backdrop-blur-xl shadow-[0px_16px_44px_rgba(120,170,205,0.30)]">
        <p className="text-[18px] font-bold leading-[26px] text-[#1B3A57]">
          {text}
        </p>
      </div>
    </div>
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
    callout = "When visibility is incomplete, risks increase and control is lost.",
    calloutIcon = "/industries/construction/sites/grow-light.svg",
    images = [],
  } = challenges;

  const [aerial, worker, lower, crane] = images;

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative z-10 overflow-hidden bg-[#f5fbff] px-6 lg:px-[60px]">
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
              className="text-[18px] font-normal text-[#3890C0]"
            >
              {subheading}
            </motion.p>
          </header>

          {/* Two columns */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            {/* Left column — feature cards + results (loadIn) */}
            <div className="flex w-full flex-col gap-7 lg:flex-1">
              {features.length > 0 && (
                <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Cross dividers */}
                  <div className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
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
              <DotGrid className="absolute left-2 top-0 z-10 hidden lg:block" />

              {images.length >= 4 && (
                <div className="mx-auto flex max-w-[500px] flex-col gap-3 overflow-hidden sm:gap-4 lg:mx-0 lg:max-w-none">
                  {/* Top row — aerial offset down, worker starts at top */}
                  <div className="flex items-start gap-3 sm:gap-4">
                    <motion.div
                      variants={wipeUp}
                      custom={IMGS_START}
                      className="w-[44%] overflow-hidden pt-6 sm:pt-10 lg:pt-14"
                    >
                      <CollageImg src={aerial} w={210} h={297} className="w-full" />
                    </motion.div>
                    <motion.div
                      variants={wipeUp}
                      custom={IMGS_START + IMG_STAGGER}
                      className="flex-1 overflow-hidden"
                    >
                      <CollageImg src={worker} w={270} h={366} className="w-full" />
                    </motion.div>
                  </div>
                  {/* Bottom row — entire row shifted right to match Figma stagger */}
                  <div className="flex items-start gap-3 ml-[18%] mr-[12%] sm:ml-[20%] sm:mr-[10%] sm:gap-4">
                    <motion.div
                      variants={wipeUp}
                      custom={IMGS_START + IMG_STAGGER * 2}
                      className="flex-1 overflow-hidden"
                    >
                      <CollageImg src={lower} w={175} h={224} className="w-full" />
                    </motion.div>
                    <motion.div
                      variants={wipeUp}
                      custom={IMGS_START + IMG_STAGGER * 3}
                      className="flex-1 overflow-hidden"
                    >
                      <CollageImg src={crane} w={210} h={278} className="w-full" />
                    </motion.div>
                  </div>
                </div>
              )}

              {callout && (
                <motion.div
                  variants={fadeUp}
                  custom={IMGS_START + IMG_STAGGER * 4}
                  className="mt-5 lg:absolute lg:bottom-[10px] lg:left-[-40px] xl:left-[-80px] lg:mt-0 lg:max-w-[450px]"
                >
                  <CalloutPill text={callout} icon={calloutIcon} />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
