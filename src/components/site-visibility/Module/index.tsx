"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowBadge } from "@/components/common/BookADemo";
import {
  fadeUp,
  scaleIn,
  zoomIn,
  staggerContainer,
  staggerFast,
  viewportReveal,
} from "@/components/about/anim";

/* ------------------------------------------------------------------ *
 * Reusable "Module NN" section — one component driving both Digital
 * Site Access and Delivery Management (and any further modules).
 *
 * Figma geometry (Frame 2147231258, 1280 fill, 60px side padding →
 * 1160 content):
 *   header block   1160 × 164   vertical, gap 10   (text capped at 986)
 *   ↕ 70
 *   content row    1160 × 356   horizontal, gap 40
 *     ├ copy col     540 × 338  vertical, gap 30
 *     │   ├ bullets  540 × 264  vertical, gap 24
 *     │   │    └ bullet 540 × 48  horizontal, gap 12 (icon 24)
 *     │   └ cta      258 × 44
 *     └ media        580 × 356
 * 540 + 40 + 580 = 1160 ✓   164 + 70 + 356 = 590 ✓ (frame hug height)
 * ------------------------------------------------------------------ */

const HEADING_COLOR = "text-[#0A4B6E]";

export type ModuleBullet = {
  /** Bold lead-in, e.g. "Digital access passes". */
  lead: string;
  /** Regular-weight remainder of the sentence. */
  rest: string;
};

/* Figma exports the panel with its drop shadow baked in, so the SVG canvas is
   larger than the 580×356 card and the card sits inset within it. Describing
   that inset lets the *card* land exactly on the layout slot while the shadow
   bleeds outside it — without it, object-contain letterboxes the wider canvas
   and the card renders ~24% too small. Omit for an asset with no bleed. */
export type MediaFrame = {
  /** Intrinsic SVG canvas. */
  w: number;
  h: number;
  /** Card rect within that canvas. */
  cardX: number;
  cardY: number;
  cardW: number;
  cardH: number;
};

export type ModuleMedia = {
  src: string;
  alt: string;
  frame?: MediaFrame;
};

export type ModuleContent = {
  /** e.g. "Module 01 · Digital Site Access" */
  eyebrow: string;
  headline: string;
  body: string;
  bullets: ModuleBullet[];
  cta: { label: string; href: string };
  media: ModuleMedia;
  /** Module 02 mirrors the row: media left, copy right. */
  reverse?: boolean;
};

/* Green tick — 24×24, #36B37E, per the Figma icon export. Swap for the
   supplied SVG by pointing `src` at it if the artwork differs. */
function CheckIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="mt-[2px] size-[24px] shrink-0"
    >
      <circle cx="12" cy="12" r="12" fill="#36B37E" fillOpacity="0.15" />
      <path
        d="M7 12.2L10.4 15.6L17 9"
        stroke="#36B37E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* CTA — Figma: 44px tall, 31.03 radius, 1.24px gradient border, gap 10,
   padding 16 left / 20 right. The gradient and badge are the ones already
   used by BookADemo, so the two CTAs stay visually identical. */
const CTA_STYLE: React.CSSProperties = {
  background: `
    linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)) padding-box,
    linear-gradient(180deg, #21B1F1 -20.69%, #A6C936 151.72%) padding-box,
    linear-gradient(180deg, rgba(33, 177, 241, 0.4) -20.69%, rgba(197, 235, 76, 0.4) 151.72%) border-box
  `,
  border: "1.24px solid transparent",
};

function ModuleCta({ label, href }: Readonly<{ label: string; href: string }>) {
  return (
    <Link
      href={href}
      style={CTA_STYLE}
      className="group inline-flex h-[44px] w-fit items-center justify-center gap-[10px] rounded-full pl-[16px] pr-[20px] font-lato text-[16px] font-semibold leading-none text-white shadow-[2px_5px_14px_rgba(79,148,104,0.60),0_6px_42px_rgba(38,124,153,0.40)] transition-[transform,filter] duration-200 ease-out hover:scale-102 hover:brightness-110"
    >
      <ArrowBadge />
      {label}
    </Link>
  );
}

function Bullet({ bullet }: Readonly<{ bullet: ModuleBullet }>) {
  return (
    <motion.li
      variants={fadeUp}
      className="flex items-start gap-[12px] font-lato text-[16px] leading-[22px] text-[#314158] lg:text-[18px] lg:leading-[24px]"
    >
      <CheckIcon />
      <span className="font-normal">
        <span className="font-bold">{bullet.lead}</span> {bullet.rest}
      </span>
    </motion.li>
  );
}

/* Media panel — the slot is the 580×356 card. When the asset carries shadow
   bleed, the image is scaled and offset so the card registers exactly on the
   slot and the shadow spills outside it (nothing here clips). */
function ModuleMediaPanel({ media }: Readonly<{ media: ModuleMedia }>) {
  const { frame } = media;

  // Percentages are relative to the slot, so this holds at any width.
  const bleed: React.CSSProperties = frame
    ? {
        width: `${(frame.w / frame.cardW) * 100}%`,
        height: `${(frame.h / frame.cardH) * 100}%`,
        left: `${(-frame.cardX / frame.cardW) * 100}%`,
        top: `${(-frame.cardY / frame.cardH) * 100}%`,
      }
    : { width: "100%", height: "100%", left: 0, top: 0 };

  return (
    <motion.div
      variants={zoomIn}
      className="relative w-full min-w-0 lg:w-[580px]"
      style={{ aspectRatio: "580 / 356" }}
    >
      <div className="absolute" style={bleed}>
        <Image
          src={media.src}
          alt={media.alt}
          fill
          className="object-fill"
          sizes="(min-width: 1024px) 640px, 110vw"
        />
      </div>
    </motion.div>
  );
}

export default function SiteVisibilityModule({
  eyebrow,
  headline,
  body,
  bullets,
  cta,
  media,
  reverse = false,
}: Readonly<ModuleContent>) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewportReveal}
      variants={staggerContainer}
      className="flex flex-col gap-[40px] lg:gap-[70px]"
    >
      {/* Header — text capped at 986px per Figma, gap 10 between the three. */}
      <div className="flex max-w-[986px] flex-col gap-[10px]">
        <motion.h3
          variants={fadeUp}
          className={`font-lato text-[20px] font-bold leading-[100%] lg:text-[26px] ${HEADING_COLOR}`}
        >
          {eyebrow}
        </motion.h3>
        <motion.h4
          variants={fadeUp}
          custom={0.06}
          className={`font-lato text-[19px] font-bold leading-[120%] lg:text-[24px] lg:leading-[100%] ${HEADING_COLOR}`}
        >
          {headline}
        </motion.h4>
        <motion.p
          variants={fadeUp}
          custom={0.12}
          className={`font-lato text-[16px] font-medium leading-[24px] lg:text-[20px] lg:leading-[28px] ${HEADING_COLOR}`}
        >
          {body}
        </motion.p>
      </div>

      {/* Content row — copy 540 / gap 40 / media 580 = the Figma's 1160. The
          container caps at 1280, so justify-center splits the 120px remainder
          evenly instead of pooling it all after the media panel. */}
      <div
        className={`flex flex-col gap-[32px] lg:flex-row lg:items-center lg:justify-center lg:gap-[40px] ${
          reverse ? "lg:flex-row-reverse" : ""
        }`}
      >
        <motion.div
          variants={scaleIn}
          className="flex w-full min-w-0 flex-col gap-[30px] lg:w-[540px]"
        >
          <motion.ul
            variants={staggerFast}
            className="flex flex-col gap-[20px] lg:gap-[24px]"
          >
            {bullets.map((b) => (
              <Bullet key={b.lead} bullet={b} />
            ))}
          </motion.ul>
          <ModuleCta label={cta.label} href={cta.href} />
        </motion.div>

        <ModuleMediaPanel media={media} />
      </div>
    </motion.div>
  );
}
