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
      unoptimized
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

function CalloutPill({
  text,
  icon,
  width,
}: Readonly<{ text: string; icon: string; width: number }>) {
  // The card silhouette is a fixed 384px-wide vector. Stretch it horizontally to
  // the requested width with a single factor `k` so the glass clip, the SVG
  // border/shadows and the text box all grow together. (k === 1 at width 376.)
  const k = (width + 8) / 384;
  const sx = (n: number) => +(n * k).toFixed(2);
  const clipPath = `path('M${sx(43)} 0C${sx(55.355)} 0 ${sx(66.215)} 6.402 ${sx(72.444)} 16.069C${sx(78.426)} 25.355 ${sx(86.954)} 35 ${sx(98)} 35H${sx(374)}C${sx(379.523)} 35 ${sx(384)} 39.477 ${sx(384)} 45V101C${sx(384)} 106.523 ${sx(379.523)} 111 ${sx(374)} 111H${sx(32)}C${sx(18.745)} 111 ${sx(8)} 100.255 ${sx(8)} 87V51C${sx(8)} 46.743 ${sx(8.515)} 42.373 ${sx(8.138)} 38.133C${sx(8.047)} 37.101 ${sx(8)} 36.056 ${sx(8)} 35C${sx(8)} 15.67 ${sx(23.67)} 0 ${sx(43)} 0Z')`;

  // The pill is built at a fixed pixel `width`, which overflows narrow phones.
  // Scale the whole thing down on mobile so it fits the smallest viewport
  // (~272px content area at 320px), then restore full size from `sm` up.
  const mobileScale = Math.min(1, 270 / width);
  // The transform-scale above only shrinks the pill visually — its layout box is
  // still `width`px wide, which overflows narrow phones and throws centering off.
  // Collapse the layout footprint to the scaled width with symmetric negative
  // margins so `justify-center` lands the pill dead-center on mobile.
  const mobileMargin = -(width * (1 - mobileScale)) / 2;

  return (
    <div
      className="relative md:left-10 h-[111px] origin-center scale-(--pill-scale) mx-(--pill-mx) sm:mx-0 sm:scale-100"
      style={
        {
          width,
          "--pill-scale": mobileScale,
          "--pill-mx": `${mobileMargin}px`,
        } as Record<string, string | number>
      }
    >
      {/* Frosted glass body — clipped to the card silhouette (rounded tab flowing
          into the rectangle) so the body keeps the glass look. */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-[111px] bg-white/50 backdrop-blur-[8px]"
        style={{ width: width + 8, clipPath }}
      />

      {/* Card shape — gradient border + layered glassy shadows (Figma vector).
          Stretched horizontally only (scaleX) to match the clip above, so the
          height/aspect is untouched and it stays aligned with the glass. */}
      <Image
        src="/industry/challenges/callout-card.svg"
        alt=""
        aria-hidden="true"
        width={876}
        height={611}
        unoptimized
        className="pointer-events-none absolute"
        style={{
          left: -282 * k,
          top: -236,
          maxWidth: "none",
          transform: `scaleX(${k})`,
          transformOrigin: "left top",
        }}
      />

      {/* Icon — nestles in the rounded top-left tab */}
      <Image
        src={icon}
        alt=""
        width={50}
        height={80}
        unoptimized
        className="absolute left-5 top-1/2 -translate-y-1/2 drop-shadow-[0_8px_18px_rgba(120,170,205,0.35)]"
      />

      {/* Text — in the body, to the right of the tab. Sized to wrap to two lines. */}
      <div
        className="absolute top-[35px] flex h-[76px] items-center"
        style={{ left: 100, width: width - 94 }}
      >
        <p className="text-[15px] font-bold leading-[21px] text-[#1B3A57]">
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
    calloutWidth = 376,
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
