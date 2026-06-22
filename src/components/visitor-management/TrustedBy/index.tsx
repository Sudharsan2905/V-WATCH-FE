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
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: EASE, delay: d },
  }),
};

// Logos reuse the existing partner assets (see src/constants/integrators-partners.ts).
const LOGO = (name: string) =>
  `/integrators-partners/companies/${name}.png`;

// The brick wall, row by row. `null` = empty (decorative) card.
// Top & bottom rows have 5 cards (inset half a card); the middle row has 6
// (full width) — that half-card offset is what creates the brick stagger.
const ROW_TOP = [null, "alhua", null, "nable", null] as const;
const ROW_MID = [null, null, "bosch", "ivideon", null, null] as const;
const ROW_BOTTOM = [null, "fortinet", null, "virtuzzo1", null] as const;

// Flat list for the mobile fallback (just the real logos).
const LOGOS = ["alhua", "nable", "bosch", "ivideon", "fortinet", "virtuzzo1"];

function LogoMark({ name }: Readonly<{ name: string }>) {
  return (
    <Image
      src={LOGO(name)}
      alt={name}
      width={108}
      height={38}
      // 108 × 38 box (Figma logo size); object-contain fits each logo without
      // stretching, regardless of its own aspect ratio.
      className="h-[38px] w-[108px] object-contain"
    />
  );
}

// Outer tile — fills its 194 × 104 slot (radius 14, 2px faint border). Forms
// the continuous brick base; tiles touch edge-to-edge.
const OUTER_CLASS =
  "flex h-[104px] w-[194px] items-center justify-center rounded-[14px] border-[2px] border-[#dee6ea] bg-[#f1faff]";

// Inner card — 160 × 72 (82.47% × 69.23% of the tile), radius 10, white→#DDF3FF
// gradient, soft white drop shadow (Figma: #FFFFFF 4%, X0 Y4 blur14).
const INNER_CLASS =
  "flex h-[72px] w-[160px] items-center justify-center rounded-[10px] bg-[linear-gradient(180deg,#FFFFFF_0%,#DDF3FF_100%)] shadow-[0px_4px_14px_rgba(255,255,255,0.04)]";

// Brick variant — exact 194×104 / 160×72 at xl (desktop), but below xl the
// tile fills its grid cell so the whole brick scales down to fit a laptop.
const OUTER_FLUID =
  "flex h-full w-full items-center justify-center rounded-[14px] border-[2px] border-[#dee6ea] bg-[#f1faff] xl:h-[104px] xl:w-[194px]";
const INNER_FLUID =
  "flex h-[69.23%] w-[82.47%] items-center justify-center rounded-[10px] bg-[linear-gradient(180deg,#FFFFFF_0%,#DDF3FF_100%)] shadow-[0px_4px_14px_rgba(255,255,255,0.04)] xl:h-[72px] xl:w-[160px]";

// Nested tile: outer 194×104 base + inner 160×72 card. `fluid` makes it scale
// to its cell below xl (used by the brick); the mobile grid uses the fixed one.
function Tile({ logo, fluid }: Readonly<{ logo: string | null; fluid?: boolean }>) {
  return (
    <div className={fluid ? OUTER_FLUID : OUTER_CLASS}>
      <div className={fluid ? INNER_FLUID : INNER_CLASS}>
        {logo && <LogoMark name={logo} />}
      </div>
    </div>
  );
}

function BrickRow({
  cards,
  inset,
  startDelay,
}: Readonly<{ cards: readonly (string | null)[]; inset?: boolean; startDelay: number }>) {
  return (
    <div className="grid grid-cols-12">
      {cards.map((logo, i) => (
        <motion.div
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          variants={cardIn}
          custom={startDelay + i * 0.06}
          // 194 × 104 slot (col-span-2 of 12 = 1/6 width). Below xl the slot
          // gets an aspect ratio so the fluid tile can scale to fit the laptop.
          className={`col-span-2 ${inset && i === 0 ? "col-start-2" : ""} flex aspect-[194/104] xl:aspect-auto`}
        >
          <Tile logo={logo} fluid />
        </motion.div>
      ))}
    </div>
  );
}

export default function TrustedBy() {
  return (
    <section className="relative rounded-t-[48px] bg-[linear-gradient(180deg,#D8EBF6_0%,#EAF5FC_20%,#F5FBFF_50%)] px-5 pt-20 pb-20 sm:px-8 lg:px-[60px]">
      <motion.div
        className="mx-auto flex w-full max-w-[1154px] flex-col gap-12 lg:gap-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* ── Heading group (gap 10px) ─────────────────────────────────── */}
        <div className="flex max-w-[964px] flex-col gap-2.5">
          <motion.h2
            variants={wipeTop}
            className="text-[22px] font-bold leading-[1.1] text-[#0A4B6E] sm:text-[26px] sm:leading-none"
          >
            Trusted by teams operating in high-security environments
          </motion.h2>
          <motion.p
            variants={wipeTop}
            custom={0.12}
            className="text-[16px] font-normal leading-[1.4] text-[#0A4B6E] sm:text-[20px] sm:leading-[28px]"
          >
            From construction sites to critical facilities, organisations rely on
            V-Watch Ai to manage visitor access securely and efficiently.
          </motion.p>
        </div>

        {/* ── Brick wall (desktop) — rows touch; the mortar gaps come from
            each card sitting centered inside its larger 194×104 slot. ── */}
        <div className="relative hidden lg:block">
          <div className="flex flex-col">
            <BrickRow cards={ROW_TOP} inset startDelay={0.1} />
            <BrickRow cards={ROW_MID} startDelay={0.25} />
            <BrickRow cards={ROW_BOTTOM} inset startDelay={0.4} />
          </div>

          {/* Edge fade masks — 336px #F5FBFF gradient on each side, fading the
              outermost cards into the background (right side mirrored). */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-[400px] bg-[linear-gradient(90deg,#F5FBFF_0%,#F5FBFF_20%,rgba(245,251,255,0.6)_60%,rgba(245,251,255,0)_100%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-[400px] bg-[linear-gradient(270deg,#F5FBFF_0%,#F5FBFF_20%,rgba(245,251,255,0.6)_60%,rgba(245,251,255,0)_100%)]"
          />
        </div>

        {/* ── Logo grid (mobile / tablet) ──────────────────────────────── */}
        <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:hidden">
          {LOGOS.map((name, i) => (
            <motion.div
              key={name}
              variants={cardIn}
              custom={0.1 + i * 0.06}
            >
              <Tile logo={name} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
