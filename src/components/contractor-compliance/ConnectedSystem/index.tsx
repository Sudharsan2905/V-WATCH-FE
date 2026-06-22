"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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

/* Icon box — white rounded square, no border, soft shadow */
function IconBox({ icon }: { icon: string }) {
  return (
    <div
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white"
      style={{
        boxShadow: "0 4px 20px rgba(10,78,110,0.10), 0 1px 4px rgba(10,78,110,0.06)",
      }}
    >
      <Image src={icon} alt="" width={34} height={34} className="object-contain" />
    </div>
  );
}

/* Horizontal chip — left side (iconRight=true) or right side (iconRight=false) */
function Chip({
  icon,
  label,
  delay,
  iconRight = false,
}: {
  icon: string;
  label: string;
  delay: number;
  iconRight?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      className={`flex items-center gap-3 ${iconRight ? "" : "flex-row-reverse"}`}
    >
      <div
        className="rounded-[14px] bg-white px-5 py-3"
        style={{ boxShadow: "0 4px 20px rgba(10,78,110,0.08), 0 1px 3px rgba(10,78,110,0.04)" }}
      >
        <p className="text-[13px] font-semibold text-[#0A3D62] sm:text-[14px]">
          {label}
        </p>
      </div>
      <IconBox icon={icon} />
    </motion.div>
  );
}

/* Bottom chip — icon on top, text pill below */
function BottomChip({ icon, label, delay }: { icon: string; label: string; delay: number }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      className="flex flex-col items-center gap-3"
    >
      <IconBox icon={icon} />
      <div
        className="rounded-[14px] bg-white px-6 py-3"
        style={{ boxShadow: "0 4px 20px rgba(10,78,110,0.08), 0 1px 3px rgba(10,78,110,0.04)" }}
      >
        <p className="text-[13px] font-semibold text-[#0A3D62] sm:text-[14px]">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

export default function ConnectedSystem() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="overflow-x-hidden px-6 py-14 lg:px-15 lg:py-16" style={{ background: "linear-gradient(to bottom, #EDF7FF 75%, #ffffff 100%)" }}>
        <div className="mx-auto max-w-[1320px]">
          {/* Heading */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
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
              className="mt-3 max-w-[680px] text-[16px] leading-[26px] text-[#314158] sm:text-[18px] sm:leading-[28px]"
            >
              Contractor compliance is fully integrated within the V-Watch Ai
              platform — linking identity, access, safety, and workforce
              management.
            </motion.p>
          </motion.div>

          {/* Hub layout */}
          <motion.div
            className="mt-10"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Desktop: 3-column hub */}
            <div className="hidden lg:flex lg:flex-col lg:items-center lg:gap-3">
              <div className="flex w-full max-w-300 items-stretch justify-center gap-4">
                {/* Left chips — justify-around puts them at ~25% and ~75% of image height */}
                <div className="flex flex-1 flex-col items-end justify-around">
                  <Chip {...CHIPS[0]} delay={0.3} iconRight />
                  <Chip {...CHIPS[2]} delay={0.5} iconRight />
                </div>

                {/* Center image */}
                <motion.div
                  variants={scaleIn}
                  custom={0.2}
                  className="relative h-130 w-130 shrink-0"
                >
                  <Image
                    src="/contractor-complaince/v-watch.webp"
                    alt="V-Watch Ai connected platform hub"
                    fill
                    sizes="520px"
                    priority
                    className="object-contain"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse 80% 75% at center, transparent 55%, #EDF7FF 90%)",
                    }}
                  />
                </motion.div>

                {/* Right chips */}
                <div className="flex flex-1 flex-col items-start justify-around">
                  <Chip {...CHIPS[1]} delay={0.4} />
                  <Chip {...CHIPS[3]} delay={0.6} />
                </div>
              </div>

              {/* Bottom chip — icon on top, text pill below */}
              <BottomChip {...CHIPS[4]} delay={0.7} />
            </div>

            {/* Mobile: image + chip grid */}
            <div className="lg:hidden">
              <motion.div
                variants={scaleIn}
                custom={0.15}
                className="relative mx-auto h-75 w-full max-w-100"
              >
                <Image
                  src="/contractor-complaince/v-watch.webp"
                  alt="V-Watch Ai connected platform hub"
                  fill
                  sizes="360px"
                  className="object-contain"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 75% at center, transparent 55%, #EDF7FF 90%)",
                  }}
                />
              </motion.div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {CHIPS.map((chip, i) => (
                  <Chip key={chip.label} {...chip} delay={0.25 + i * 0.08} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
