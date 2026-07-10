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
const CONNECTED_SYSTEM_MAP = "/geofencing/connected-system.webp";

// ─── Feature data ────────────────────────────────────────────────────────────
type Feature = {
  icon: string;
  title: string;
  desc: string;
};

const DEFAULT_FEATURES: Feature[] = [
  {
    icon: "/geofencing/define_zone.svg",
    title: "Define Zones",
    desc: "Mark restricted, controlled, or high-risk areas across your site.",
  },
  {
    icon: "/geofencing/track_movement.svg",
    title: "Track Movement",
    desc: "Monitor the live location of workers, vehicles, and assets.",
  },
  {
    icon: "/geofencing/detect_breaches.svg",
    title: "Detect Breaches",
    desc: "Instantly identify when someone enters a restricted zone.",
  },
  {
    icon: "/geofencing/trigger_alerts.svg",
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
  title,
  desc,
  delay,
}: Readonly<Feature & { delay: number }>) {
  return (
    <motion.div
      variants={rowIn}
      custom={delay}
      className="flex items-center gap-5 lg:h-full lg:flex-1"
    >
      {/* Icon box — 54×54, radius 14, 2px white→#EFF9FF gradient border,
          #F4FBFF/20% fill, soft drop shadow (Figma). */}
      <span
        className="flex size-[54px] shrink-0 items-center justify-center"
        style={{
          borderRadius: 14,
          border: "2px solid transparent",
          background:
            "rgba(244,251,255,0.2) padding-box, linear-gradient(180deg, #FFFFFF 0%, #EFF9FF 100%) border-box",
          boxShadow: "0 8px 20px rgba(20,46,92,0.10)",
        }}
      >
        <Image
          src={icon}
          alt=""
          width={28}
          height={28}
          className="size-7 object-contain"
        />
      </span>
      <div className="flex flex-col gap-2.5">
        <p className="font-lato text-[20px] font-bold leading-none text-black">{title}</p>
        <p className="font-lato text-[18px] font-normal leading-[1.25] text-black">{desc}</p>
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
    intro = "Contractor compliance is fully integrated within the V-Watch AI platform linking identity, access, safety, and workforce management.",
    features = DEFAULT_FEATURES,
    mapImage = CONNECTED_SYSTEM_MAP,
  } = content;

  return (
    <MotionConfig reducedMotion="user">
      {/* Light panel overlaps the (flat) hero with a rounded top — matches the
          ComplianceControl / TrustedBy pattern used across the site. */}
      <section className="relative z-10 -mt-8 lg:-mt-16">
        <div
          className="overflow-hidden rounded-t-[28px] px-6 lg:px-15"
          style={{ background: "#f5fbff" }}
        >
        <motion.div
          className="mx-auto flex w-full max-w-[1280px] flex-col gap-8 py-8 sm:py-10 lg:gap-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Header group — gap 10px */}
          <div className="flex flex-col gap-2.5">
            <motion.h2
              variants={wipeDown}
              custom={0.05}
              className="font-lato text-[22px] font-bold leading-none text-[#0A4B6E] sm:text-[26px]"
            >
              {heading}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.18}
              className="max-w-[953px] font-lato text-[16px] font-normal leading-[1.4] text-[#0A4B6E] sm:text-[20px] sm:leading-[28px]"
            >
              {intro}
            </motion.p>
          </div>

          {/* Content row — gap 24px, height 470 at lg */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-6 lg:h-[470px]">
            {/* Isometric site map — fills the remaining width; fixed 470 height
                at lg, intrinsic aspect when stacked. */}
            <motion.div
              variants={fromLeft}
              custom={0.25}
              className="relative aspect-[823/470] w-full overflow-hidden rounded-[16px] lg:aspect-auto lg:h-full lg:flex-1"
            >
              <Image
                src={mapImage}
                alt="Isometric site map with restricted, controlled and high-risk zones outlined"
                fill
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover"
              />
            </motion.div>

            {/* Feature list — fixed 461px column at lg (4 × 110 + 3 × 10 = 470);
                1 col mobile, 2 col tablet. */}
            <motion.div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:flex lg:w-[461px] lg:shrink-0 lg:flex-col lg:gap-2.5 lg:h-full"
              variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            >
              {features.map((f, i) => (
                <FeatureRow key={f.title} {...f} delay={0.35 + i * 0.1} />
              ))}
            </motion.div>
          </div>
        </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
