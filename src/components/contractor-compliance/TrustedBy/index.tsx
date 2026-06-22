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
  hidden: { opacity: 0, y: 18 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay },
  }),
};

const LOGOS = [
  { src: "/contractor-complaince/ajhua.webp", alt: "Dahua Technology" },
  { src: "/contractor-complaince/nable.webp", alt: "N-ABLE" },
  { src: "/contractor-complaince/bosch.webp", alt: "Bosch" },
  { src: "/contractor-complaince/ivideon.webp", alt: "iVideon" },
  { src: "/contractor-complaince/fortinet.webp", alt: "Fortinet" },
  { src: "/contractor-complaince/virtusa.webp", alt: "Virtuozzo" },
];

// Desktop 5-col staggered grid (null = ghost placeholder)
type Cell = { src: string; alt: string } | null;
const GRID_CELLS: Cell[] = [
  null, { src: LOGOS[0].src, alt: LOGOS[0].alt }, null, { src: LOGOS[1].src, alt: LOGOS[1].alt }, null,
  null, { src: LOGOS[2].src, alt: LOGOS[2].alt }, { src: LOGOS[3].src, alt: LOGOS[3].alt }, null, null,
  null, { src: LOGOS[4].src, alt: LOGOS[4].alt }, null, { src: LOGOS[5].src, alt: LOGOS[5].alt }, null,
];

function LogoCard({ cell, delay }: { cell: Cell; delay: number }) {
  const isEmpty = cell === null;
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      className="flex h-18 items-center justify-center sm:h-20"
      style={{
        borderRadius: "10px",
        background: "linear-gradient(180deg, #FFFFFF 0%, #DDF3FF 100%)",
        boxShadow: "0 0 0 1px #D6EAF8, 0 4px 14px rgba(255,255,255,0.04)",
      }}
    >
      {!isEmpty && (
        <Image
          src={cell.src}
          alt={cell.alt}
          width={140}
          height={44}
          className="h-9 w-auto object-contain sm:h-10"
          style={{ filter: "grayscale(1)" }}
        />
      )}
    </motion.div>
  );
}

export default function TrustedBy() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative z-10 -mt-12 lg:-mt-16">
        <div
          className="overflow-hidden rounded-t-[45px] px-6 py-12 sm:px-10 lg:px-15 lg:py-16 mt-10"
          style={{ background: "linear-gradient(160deg, #EDF7FF 0%, #EEF7FF 60%, #F0F8FF 100%)" }}
        >
        {/* Decorative blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-[260px] w-[260px] rounded-full bg-[#D6EFFE] opacity-50 blur-[70px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -left-16 h-[220px] w-[220px] rounded-full bg-[#E2F4FE] opacity-60 blur-[60px]"
        />

        <div className="relative z-10 mx-auto max-w-[1320px]">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              variants={wipeDown}
              custom={0.05}
              className="max-w-[640px] text-[22px] font-bold leading-[32px] text-[#0A4B6E] sm:text-[26px] sm:leading-[36px]"
            >
              Trusted in environments where compliance is critical
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="mt-3 max-w-[640px] text-[15px] leading-[24px] text-[#556394] sm:text-[16px] sm:leading-[26px]"
            >
              From construction sites to industrial facilities, organisations
              rely on V-Watch Ai to ensure every worker meets safety and
              regulatory requirements.
            </motion.p>
          </motion.div>

          {/* Mobile / tablet — real logos only, no ghost cells */}
          <motion.div
            className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:hidden"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {LOGOS.map((logo, i) => (
              <LogoCard key={logo.alt} cell={logo} delay={0.2 + i * 0.06} />
            ))}
          </motion.div>

          {/* Desktop — staggered 5-col grid with ghost placeholders */}
          <motion.div
            className="mt-8 hidden gap-3 lg:grid lg:grid-cols-5 xl:gap-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
            }}
          >
            {GRID_CELLS.map((cell, i) => (
              <LogoCard key={i} cell={cell} delay={0.2 + i * 0.04} />
            ))}
          </motion.div>
        </div>
        </div>
      </section>
    </MotionConfig>
  );
}
