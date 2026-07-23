"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const VIEWPORT = { once: true, amount: 0.5, margin: "0px 0px -120px 0px" } as const;

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

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
};

const CHIPS = [
  { icon: "/contractor-complaince/icons/face.svg", label: "Facial recognition access control" },
  { icon: "/contractor-complaince/icons/workforce.svg", label: "Workforce tracking and attendance" },
  { icon: "/contractor-complaince/icons/safety.svg", label: "Safety monitoring systems" },
  { icon: "/contractor-complaince/icons/geofencing.svg", label: "Geofencing and restricted zones" },
  { icon: "/contractor-complaince/icons/powerbi.svg", label: "Power BI dashboards and reporting" },
];

/* Icon box — 54×54, radius 14.4px, #FEFFFF fill, 1px linear-gradient border */
function IconBox({ icon }: { icon: string }) {
  return (
    <div
      className="flex h-13.5 w-13.5 shrink-0 items-center justify-center rounded-[14.4px]"
      style={{
        padding: "8.23px",
        background:
          "linear-gradient(#FEFFFF, #FEFFFF) padding-box, linear-gradient(135deg, #5CB7E8 10%, #B8E6FF) border-box",
        border: "1px solid transparent",
        boxShadow: "0 4px 20px rgba(10,78,110,0.10), 0 1px 4px rgba(10,78,110,0.06)",
      }}
    >
      <Image src={icon} alt="icon" width={32} height={32} className="object-contain" />
    </div>
  );
}

/* Text pill — 312px wide, min-height 54px (grows for 2-line labels so text
   is never clipped), radius 16px, 1px border, padding 6px/16px */
function TextPill({ label, fluid = false }: { label: string; fluid?: boolean }) {
  return (
    <div
      className={`flex min-h-13.5 items-center justify-center rounded-2xl bg-white px-4 py-1.5 text-center ${
        fluid ? "min-w-0 flex-1" : "w-78"
      }`}
      style={{
        border: "1px solid rgba(92,183,232,0.30)",
        boxShadow: "0 4px 20px rgba(10,78,110,0.08), 0 1px 3px rgba(10,78,110,0.04)",
      }}
    >
      <p className="font-lato text-[17px] font-medium leading-6 tracking-normal text-[#0F172B]">
        {label}
      </p>
    </div>
  );
}

/* Horizontal chip — gap 14px; left side (iconRight=true) or right side (iconRight=false) */
function Chip({
  icon,
  label,
  delay,
  iconRight = false,
  fluid = false,
}: {
  icon: string;
  label: string;
  delay: number;
  iconRight?: boolean;
  fluid?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className={`flex min-w-0 items-center gap-3.5 ${iconRight ? "" : "flex-row-reverse"}`}
    >
      <TextPill label={label} fluid={fluid} />
      <IconBox icon={icon} />
    </motion.div>
  );
}

/* Bottom chip — icon on top, text pill below; vertical gap 14px */
function BottomChip({ icon, label, delay }: { icon: string; label: string; delay: number }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="flex flex-col items-center gap-3.5"
    >
      <IconBox icon={icon} />
      <TextPill label={label} />
    </motion.div>
  );
}

export default function ConnectedSystem() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="overflow-x-hidden px-6 py-14 lg:px-15 lg:py-16" style={{ background: "linear-gradient(to bottom, #EDF7FF 75%, #ffffff 100%)" }}>
        <div className="mx-auto max-w-[1280px] w-full">
          {/* Heading */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.h2
              variants={wipeDown}
              custom={0.05}
              className="max-w-[680px] text-[24px] font-bold leading-[34px] text-[#0A4B6E] sm:text-[28px] sm:leading-[38px]"
            >
              Part of a connected workforce and safety system
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="mt-3 max-w-165.75 text-[17px] font-normal leading-6.5 tracking-normal text-[#0A4B6E] sm:text-[20px] sm:leading-7"
            >
              Contractor compliance is fully integrated within the V-Watch AI
              platform linking identity, access, safety, and workforce
              management.
            </motion.p>
          </motion.div>

          {/* Hub layout — trigger lives on each chip/image (this block is too
              tall to reach amount:0.5 as a single observed element). */}
          <div className="mt-6 lg:mt-10">
            {/* Desktop: chips absolutely anchored to the image corners so they
                overlap inward (1160 × 520 stage, image 630×420 centered) */}
            <div className="relative mx-auto hidden h-130 w-full max-w-290 lg:block">
              {/* Center image — 630×420, Blend: Darken (per Figma) */}
              <motion.div
                variants={scaleIn}
                custom={0.2}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
                className="absolute left-1/2 top-0 h-105 w-157.5 -translate-x-1/2"
              >
                <Image
                  src="/contractor-complaince/v-watch.webp"
                  alt="V-Watch AI connected platform hub"
                  fill
                  sizes="630px"
                  priority
                  className="object-contain"
                  style={{ mixBlendMode: "darken" }}
                />
                {/* V-Watch logo centered on the hub platform */}
                <Image
                  src="/contractor-complaince/icons/v-watch.svg"
                  alt="V-Watch"
                  width={79}
                  height={18}
                  className="absolute left-[50.5%] top-[48%] w-[12.5%] -translate-x-1/2 -translate-y-1/2 object-contain"
                />
              </motion.div>

              {/* Top-left */}
              <div className="absolute left-0 top-2">
                <Chip {...CHIPS[0]} delay={0.3} iconRight />
              </div>
              {/* Top-right */}
              <div className="absolute right-0 top-2">
                <Chip {...CHIPS[1]} delay={0.4} />
              </div>
              {/* Bottom-left */}
              <div className="absolute left-0 top-80">
                <Chip {...CHIPS[2]} delay={0.5} iconRight />
              </div>
              {/* Bottom-right */}
              <div className="absolute right-0 top-80">
                <Chip {...CHIPS[3]} delay={0.6} />
              </div>
              {/* Bottom-center */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bottom-4">
                <BottomChip {...CHIPS[4]} delay={0.7} />
              </div>
            </div>

            {/* Mobile: image + chip grid */}
            <div className="lg:hidden">
              <motion.div
                variants={scaleIn}
                custom={0.15}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
                className="relative mx-auto aspect-3/2 w-full max-w-120"
              >
                <Image
                  src="/contractor-complaince/v-watch.webp"
                  alt="V-Watch AI connected platform hub"
                  fill
                  sizes="(max-width: 640px) 100vw, 480px"
                  className="object-contain"
                  style={{ mixBlendMode: "darken" }}
                />
                {/* V-Watch logo centered on the hub platform */}
                <Image
                  src="/contractor-complaince/icons/v-watch.svg"
                  alt="V-Watch"
                  width={79}
                  height={18}
                  className="absolute left-[50.5%] top-[48%] w-[12.5%] -translate-x-1/2 -translate-y-1/2 object-contain"
                />
              </motion.div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {CHIPS.map((chip, i) => (
                  <Chip key={chip.label} {...chip} delay={0.25 + i * 0.08} fluid iconRight />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
