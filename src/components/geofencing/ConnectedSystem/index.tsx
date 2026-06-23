"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";

// Shared ease — matches the rest of the site (≈ easeOutQuint).
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Header clip-wipe from the top — the site's signature heading reveal.
const wipeDown: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  show: (delay = 0) => ({
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { delay, duration: 0.6, ease: EASE },
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

// Isometric map — eases in from the left + soft scale.
const fromLeft: Variants = {
  hidden: { opacity: 0, x: -48, scale: 0.96 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE, delay },
  }),
};

// Feature row — rises into place inside a stagger.
const rowIn: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay },
  }),
};

// ─── The geofencing illustration ─────────────────────────────────────────────
// Geofencing zone map → public/geofencing/connected-system.jpg
const CONNECTED_SYSTEM_MAP = "/geofencing/connected-system.jpg";

// ─── Feature icons (inline so only the map image needs supplying) ────────────
type IconProps = Readonly<{ className?: string }>;

function PinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 21s7-6.04 7-11a7 7 0 1 0-14 0c0 4.96 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function WarningIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 3.5 1.8 20.5h20.4L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M12 9.5v4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1.1" fill="currentColor" />
    </svg>
  );
}

function BellIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M6 9a6 6 0 0 1 12 0c0 5 1.5 6.5 1.5 6.5h-15S6 14 6 9Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

type Feature = {
  icon: "pin" | "warning" | "bell";
  tone: string;
  title: string;
  desc: string;
};

const ICONS = {
  pin: PinIcon,
  warning: WarningIcon,
  bell: BellIcon,
} as const;

const DEFAULT_FEATURES: Feature[] = [
  {
    icon: "pin",
    tone: "#13B5A6",
    title: "Define Zones",
    desc: "Mark restricted, controlled, or high-risk zones across your site.",
  },
  {
    icon: "pin",
    tone: "#21B1F1",
    title: "Track Movement",
    desc: "Monitor the live location of workers, vehicles, and assets.",
  },
  {
    icon: "warning",
    tone: "#F5A623",
    title: "Detect Breaches",
    desc: "Instantly identify when someone enters a restricted zone.",
  },
  {
    icon: "bell",
    tone: "#E5484D",
    title: "Trigger Alerts",
    desc: "Notify teams immediately or activate automated responses.",
  },
];

type ConnectedSystemContent = {
  heading?: string;
  intro?: string;
  features?: Feature[];
  mapImage?: string;
};

// ─── Sub-components ──────────────────────────────────────────────────────────
function FeatureRow({
  icon,
  tone,
  title,
  desc,
  delay,
}: Readonly<Feature & { delay: number }>) {
  const Icon = ICONS[icon];
  return (
    <motion.div variants={rowIn} custom={delay} className="flex items-start gap-4">
      <span
        className="flex size-10 shrink-0 items-center justify-center rounded-xl"
        style={{ background: `${tone}1A`, color: tone }}
      >
        <Icon className="size-5" />
      </span>
      <div className="flex flex-col gap-1">
        <p className="text-[16px] font-bold leading-tight text-[#0A4B6E]">{title}</p>
        <p className="text-[14px] leading-[20px] text-[#5B7A93]">{desc}</p>
      </div>
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function ConnectedSystem({
  content = {},
}: Readonly<{ content?: ConnectedSystemContent }> = {}) {
  const {
    heading = "Part of a connected workforce and safety system",
    intro = "Contractor compliance is fully integrated within the V-Watch Ai platform linking identity, access, safety, and workforce management.",
    features = DEFAULT_FEATURES,
    mapImage = CONNECTED_SYSTEM_MAP,
  } = content;

  return (
    <MotionConfig reducedMotion="user">
      <section className="px-6 py-8 lg:px-15 lg:py-16">
        <motion.div
          className="mx-auto w-full max-w-[1280px] overflow-hidden rounded-[24px] border border-[#21B1F1]/35 bg-white p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.6),0_24px_60px_-24px_rgba(20,46,92,0.25),0_0_40px_rgba(33,177,241,0.18)] lg:p-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            variants={wipeDown}
            custom={0.05}
            className="text-[22px] font-bold leading-snug text-[#0A4B6E] sm:text-[26px]"
          >
            {heading}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={0.18}
            className="mt-2 max-w-[760px] text-[15px] leading-[22px] text-[#5B7A93]"
          >
            {intro}
          </motion.p>

          <div className="mt-8 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-center lg:gap-12">
            {/* Isometric site map — full width (centered, capped) when stacked;
                takes the left ~55% from lg up. */}
            <motion.div
              variants={fromLeft}
              custom={0.25}
              className="mx-auto w-full max-w-[560px] lg:mx-0 lg:w-[55%] lg:max-w-none lg:shrink-0"
            >
              <Image
                src={mapImage}
                alt="Isometric site map with restricted, controlled and high-risk zones outlined"
                width={1024}
                height={576}
                unoptimized
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="h-auto w-full"
              />
            </motion.div>

            {/* Feature list — 1 column on mobile, 2 on tablet, back to a single
                column beside the map from lg up. */}
            <motion.div
              className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:gap-7"
              variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            >
              {features.map((f, i) => (
                <FeatureRow key={f.title} {...f} delay={0.35 + i * 0.1} />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
