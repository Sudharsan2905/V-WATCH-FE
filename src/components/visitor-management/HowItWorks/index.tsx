"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";

// Shared ease — matches the rest of the site's reveal language.
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const wipeTop: Variants = {
  hidden: { opacity: 0, y: -12 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay: d },
  }),
};

// Card reveal — rise + subtle scale so the soft shadow stays intact.
const cardIn: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE, delay: d },
  }),
};

// Central diagram (connectors + grid + glow + hub) — soft scale + fade.
const diagramIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE } },
};

const labelIn: Variants = {
  hidden: { opacity: 0 },
  show: (d = 0) => ({ opacity: 1, transition: { duration: 0.5, delay: d } }),
};

type Item = { text: string; icon: string };
type Side = "left" | "right";

// Card glyphs live in /public/visitor-management/how-to-work/ — each is mapped
// to the step it best represents.
const ICON = (file: string) => `/visitor-management/how-to-work/${file}.png`;

// System Input — top row (registration → access → identity → entry).
const INPUT_LEFT: Item[] = [
  {
    text: "Visitors are pre-registered or registered on arrival",
    icon: ICON("visitor-registration"),
  },
  {
    text: "Access is granted based on approval and permissions",
    icon: ICON("access-approval"),
  },
];
const INPUT_RIGHT: Item[] = [
  {
    text: "Identity is verified via digital pass, QR, or facial recognition",
    icon: ICON("identity-verification"),
  },
  {
    text: "Entry, movement, and exit are recorded in real time",
    icon: ICON("entry-exit-tracking"),
  },
];

// System Output — bottom row (logs → alerts → visibility → audit).
const OUTPUT_LEFT: Item[] = [
  {
    text: "Complete visitor logs know who entered and when",
    icon: ICON("visitor-logs"),
  },
  {
    text: "Alerts for unauthorized or unregistered access",
    icon: ICON("unauthorized-access-alert"),
  },
];
const OUTPUT_RIGHT: Item[] = [
  {
    text: "Real-time visibility of all visitors on-site",
    icon: ICON("realtime-visibility"),
  },
  {
    text: "Audit-ready records for compliance and reporting",
    icon: ICON("audit-records"),
  },
];

function HiwCard({
  text,
  icon,
  side,
  index,
}: Readonly<Item & { side: Side; index: number }>) {
  // The icon badge sits on the card's INNER edge (toward the central hub),
  // where the connector line meets it: right edge for left-column cards,
  // left edge for right-column cards.
  const iconRight = side === "left";

  return (
    <motion.div
      variants={cardIn}
      custom={0.1 + index * 0.08}
      // 350 × 76 in Figma — radius 16, 1.25px white/80 border, soft shadow.
      className="bg-[#e8f5fc] mx-auto relative flex max-h-[76px] h-[76px] w-full max-w-[350px] items-center rounded-[16px] border-[1.25px] border-white/90 shadow-[0px_1px_2px_0px_rgba(184,230,255,0.10)] backdrop-blur-[2px]"
    >
      <p
        className={`text-[16px] font-normal leading-[22px] text-[#1D293D] sm:text-[18px] sm:leading-6 ${
          iconRight
            ? "pl-5 pr-[72px] min-[1140px]:pr-[44px]"
            : "pl-[72px] pr-5 min-[1140px]:pl-[44px]"
        }`}
      >
        {text}
      </p>

      {/* Icon badge — 54 × 54 white circle, layered drop shadows */}
      <span
        className={`absolute top-1/2 flex h-[54px] w-[54px] -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0px_18px_72px_rgba(0,0,0,0.12),0px_3.6px_12.6px_rgba(156,220,255,0.40)] ${
          // Below lg the badge tucks inside the card; on desktop (lg) it sits
          // half-outside on the inner edge, where the connector meets it.
          iconRight
            ? "right-2 min-[1140px]:right-0 min-[1140px]:translate-x-1/2"
            : "left-2 min-[1140px]:left-0 min-[1140px]:-translate-x-1/2"
        }`}
      >
        <Image
          src={icon}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 object-contain"
        />
      </span>
    </motion.div>
  );
}

function CardColumn({
  items,
  side,
  align,
}: Readonly<{ items: Item[]; side: Side; align: "start" | "end" }>) {
  return (
    <div
      className={`flex flex-col gap-8 ${
        align === "start"
          ? "min-[1140px]:items-start"
          : "min-[1140px]:items-end"
      } ${side === "left" ? "items-start" : "items-start md:items-end"}`}
    >
      {items.map((it, i) => (
        <HiwCard key={it.text} {...it} side={side} index={i} />
      ))}
    </div>
  );
}

export default function HowItWorks() {
  return (
     <section className="relative z-10 flex-1 flex items-center w-full max-w-[1440px] mx-auto px-4 py-6 sm:px-6 lg:px-[60px] lg:py-[40px]">
        <motion.div
          // className="flex flex-col w-full max-w-[600px]"
        className="flex w-full max-w-[1280px] flex-col gap-5 xl:h-[687px] xl:max-h-[687px]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.h2
          variants={wipeTop}
          className="text-[24px] font-bold leading-tight text-[#0A4B6E] sm:text-[26px]"
        >
          How It Works
        </motion.h2>

        {/* Diagram area — 1160 × 556 at desktop. Hidden below lg (the connector
            diagram can't render in a single column); mobile uses the block below. */}
        <div className="relative mx-auto hidden w-full max-w-[1130px] min-[1140px]:block">
          {/* Central diagram — two layers: the faint grid behind, the hub +
              connector curves on top, both centered. Hidden below lg, where
              the layout collapses to a single column. */}
          <motion.div
            aria-hidden
            variants={diagramIn}
            className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 min-[1140px]:block"
          >
            <Image
              src="/visitor-management/how-it-works-grid.png"
              alt=""
              width={706}
              height={520}
              className="h-[520px] w-[706px] max-w-none"
            />
            <Image
              src="/visitor-management/how-it-works-hub.png"
              alt=""
              width={553}
              height={614}
              className="absolute left-1/2 top-1/2 w-[553px] max-w-none -translate-x-1/2 -translate-y-1/2"
            />
          </motion.div>

          {/* Cards grid: left column · center labels · right column,
              for the Input (top) and Output (bottom) rows. */}
          <div className="relative z-10 grid grid-cols-1 gap-x-6 gap-y-10 min-[1140px]:grid-cols-[350px_1fr_350px] min-[1140px]:gap-x-0 min-[1140px]:gap-y-[188px]">
            {/* ── System Input row ── */}
            <CardColumn items={INPUT_LEFT} side="left" align="start" />
            <motion.div
              variants={labelIn}
              custom={0.2}
              className="hidden items-center justify-center min-[1140px]:flex"
            >
              <span className="text-center text-[20px] font-bold leading-6 tracking-[-0.6px] text-[#006F9F]">
                System Input
              </span>
            </motion.div>
            <CardColumn items={INPUT_RIGHT} side="right" align="end" />

            {/* ── System Output row ── */}
            <CardColumn items={OUTPUT_LEFT} side="left" align="start" />
            <motion.div
              variants={labelIn}
              custom={0.2}
              className="hidden items-center justify-center min-[1140px]:flex"
            >
              <span className="text-center text-[20px] font-bold leading-6 tracking-[-0.6px] text-[#006F9F]">
                System Output
              </span>
            </motion.div>
            <CardColumn items={OUTPUT_RIGHT} side="right" align="end" />
          </div>
        </div>

        {/* ── Mobile / tablet — echoes the desktop diagram without the connector
            roads: centered labels (Input top · Output bottom) with the V-WATCH
            logo orb between the two groups, over a faint centered grid. 1 column
            on mobile, 2 columns on tablet (md). Desktop (lg) uses the block above. */}
        <div className="relative flex flex-col gap-10 md:gap-0 min-[1140px]:hidden">
          {/* Faint grid backdrop — centered behind the groups (tablet+ only). */}
          <motion.div
            aria-hidden
            variants={diagramIn}
            className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 md:block"
          >
            <Image
              src="/visitor-management/how-it-works-grid.png"
              alt=""
              width={706}
              height={520}
              className="mx-auto h-auto w-full max-w-[706px] opacity-60"
            />
          </motion.div>

          <div className="relative z-10">
            <motion.p
              variants={labelIn}
              className="mb-5 text-center text-[20px] font-bold tracking-[-0.6px] text-[#006F9F]"
            >
              System Input
            </motion.p>
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2">
              {[...INPUT_LEFT, ...INPUT_RIGHT].map((it, i) => (
                <HiwCard key={it.text} {...it} side="left" index={i} />
              ))}
            </div>
          </div>

          {/* V-WATCH logo orb — centered between the Input and Output groups.
              Tablet+ only; on mobile the groups stack directly. */}
          <motion.div
            aria-hidden
            variants={diagramIn}
            className="relative z-10 mx-auto hidden md:block"
          >
            <Image
              src="/visitor-management/vwatch-orb.png"
              alt=""
              width={130}
              height={130}
              className="h-[110px] w-[110px] object-contain sm:h-[130px] sm:w-[130px]"
            />
          </motion.div>

          <div className="relative z-10 flex flex-col">
            {/* Label sits above the cards on mobile, below them on tablet+. */}
            <motion.p
              variants={labelIn}
              className="order-first mb-5 text-center text-[20px] font-bold tracking-[-0.6px] text-[#006F9F] md:order-last md:mb-0 md:mt-5"
            >
              System Output
            </motion.p>
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2">
              {[...OUTPUT_LEFT, ...OUTPUT_RIGHT].map((it, i) => (
                <HiwCard key={it.text} {...it} side="left" index={i} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
