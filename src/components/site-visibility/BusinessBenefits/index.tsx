"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  fadeUp,
  scaleIn,
  staggerContainer,
  viewportReveal,
} from "@/components/about/anim";

/* ------------------------------------------------------------------ *
 * "Business benefits" — dark panel with six role cards.
 *
 * Figma (Frame: 1280 fill, hug 774, radius 40, padding 62/60, gap 30):
 *   header    1160 × 136   vertical, gap 10 (31 / 29 / 56)
 *   ↕ 30
 *   grid      1160 × 484   gap 24 → 2 rows × 3 cards
 *     └ card    371 × 230  radius 32, border 1, pad 20/16/16/16, gap 14
 *         ├ row   badge 54 + pill (hug × 30)
 *         └ copy  339 × 100  gap 10 (title 24 + body 66)
 * 62+136+30+484+62 = 774 ✓   2×230+24 = 484 ✓   24+10+66 = 100 ✓
 *
 * Backdrop is the starfield already used by the industries/Environments
 * section (Figma's "rm373batch2-09.png", renamed on import).
 * ------------------------------------------------------------------ */

const BG_IMAGE = "/industries/construction/designed-environment/env-bg.png";

// Drop the supplied icons at /public/site-visibility/business-benefits/<key>.svg
const ICON = (key: string) => `/site-visibility/${key}.svg`;

type Benefit = {
  key: string;
  role: string;
  title: string;
  body: string;
};

const BENEFITS: Benefit[] = [
  {
    key: "project-directors",
    role: "Project Directors",
    title: "Programme risk you can actually see.",
    body: "A live, honest view of who is on site, what has arrived and where the friction is so decisions are made against reality, not a WhatsApp thread.",
  },
  {
    key: "operations-directors",
    role: "Operations Directors",
    title: "Fewer surprises at the gate.",
    body: "Deliveries booked, sequenced and tracked; contractors approved before they arrive; unplanned events flagged early instead of discovered late.",
  },
  {
    key: "facility-managers",
    role: "Facility Managers",
    title: "One source of truth per site.",
    body: "Access, deliveries, visitor logs and daily activity in one place no chasing gate staff, no reconciling three different systems at week-end.",
  },
  {
    key: "security-managers",
    role: "Security Managers",
    title: "Enforceable, auditable access.",
    body: "Every entry, exit, pass check, denial and exception recorded ready for internal audit, client review or incident investigation.",
  },
  {
    key: "engineering-teams",
    role: "Engineering Teams",
    title: "Materials where they need to be.",
    body: "Deliveries sequenced against the install programme, unloading conflicts eliminated, and craneage / escort resources pre-assigned.",
  },
  {
    key: "main-contractors",
    role: "Main Contractors",
    title: "Client-ready reporting, by default.",
    body: "Attendance, delivery performance and exception logs generated automatically strengthening client trust and protecting your commercial position.",
  },
];

/* Card — #19213D→#00041F fill under a faint white gradient hairline, with the
   #C9D5FF 10% inner shadow that gives the surface its lit top edge. */
const CARD_STYLE: React.CSSProperties = {
  background: `
    linear-gradient(180deg, #19213D 0%, #00041F 60%) padding-box,
    linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(204,215,255,0.02) 100%) border-box
  `,
  border: "1px solid transparent",
  boxShadow: "inset 3px 5px 34px rgba(201,213,255,0.10)",
};

/* Icon badge — Figma is #F4FBFF at 10% inside a white→#EFF9FF hairline.
   The fill must be OPAQUE here: in this gradient-border technique the
   padding-box layer is what masks the border gradient off the interior, so a
   translucent fill lets the near-white gradient flood the whole badge. The
   colours below are that 10% tint pre-composited over the card's #19213D.

   Figma's two drop shadows (#041752 85%, #484545 40%) are both dark on a
   near-black card, so on their own they render as nothing. They are kept for
   the downward weight and paired with a soft light rim + glow, which is what
   actually separates the badge from the card in the design. */
const BADGE_STYLE: React.CSSProperties = {
  background: `
    linear-gradient(180deg, #2F3750 0%, #272E45 100%) padding-box,
    linear-gradient(180deg, #FFFFFF 0%, #EFF9FF 100%) border-box
  `,
  border: "1px solid transparent",
  boxShadow: [
    "8px 14px 28px rgba(4,23,82,0.95)",
    "10px 10px 60px rgba(72,69,69,0.50)",
    "0 0 0 1px rgba(255,255,255,0.16)",
    "0 0 26px rgba(174,210,255,0.42)",
    "0 0 54px rgba(174,210,255,0.22)",
    "inset 0 1px 2px rgba(255,255,255,0.32)",
  ].join(", "),
};

function BenefitCard({ benefit }: Readonly<{ benefit: Benefit }>) {
  return (
    <motion.li
      variants={scaleIn}
      style={CARD_STYLE}
      className="flex flex-col gap-[14px] rounded-[32px] px-[16px] pb-[16px] pt-[20px] lg:min-h-[230px]"
    >
      {/* Badge (54) left, role pill (h 30) right. */}
      <div className="flex items-center justify-between gap-[12px]">
        <div
          style={BADGE_STYLE}
          className="grid size-[54px] shrink-0 place-items-center rounded-[34px] p-[10px]"
        >
          <Image
            src={ICON(benefit.key)}
            alt=""
            width={30}
            height={30}
            className="size-[30px] object-contain"
          />
        </div>
        <span className="inline-flex h-[30px] shrink-0 items-center rounded-[80px] border border-[#AED2FF] px-[14px] font-lato text-[10px] font-bold uppercase leading-none tracking-[0.4px] text-[#AED2FF] lg:text-[11px]">
          {benefit.role}
        </span>
      </div>

      {/* Copy — gap 10. */}
      <div className="flex flex-col gap-[10px]">
        <h4 className="font-lato text-[18px] font-bold leading-[24px] text-white lg:text-[20px]">
          {benefit.title}
        </h4>
        <p className="font-lato text-[15px] font-normal leading-[21px] text-[#D0DDFF] lg:text-[16px] lg:leading-[22px]">
          {benefit.body}
        </p>
      </div>
    </motion.li>
  );
}

export default function SiteVisibilityBusinessBenefits() {
  return (
    <section className="relative z-10 w-full bg-[#F4FBFF]">
      <div className="relative w-full overflow-hidden rounded-[40px] bg-black py-[48px] lg:py-[62px]">
        {/* Figma: the starfield sits at 50% over the black fill, scale=crop. */}
        <Image
          src={BG_IMAGE}
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none select-none object-cover object-top opacity-50"
        />

        {/* Same wrapper shape as the other sections so the content shares
            their left edge; `relative` lifts it above the fill image. */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportReveal}
          variants={staggerContainer}
          className="relative w-full px-[24px] lg:px-[60px]"
        >
          <div className="mx-auto flex w-full max-w-[1410px] flex-col gap-[24px] lg:gap-[30px]">
            {/* Header — gap 10; copy caps at 889 (headings) / 1068 (body). */}
            <div className="flex flex-col gap-[10px]">
              <motion.h2
                variants={fadeUp}
                className="max-w-[889px] font-lato text-[22px] font-bold leading-[100%] text-white lg:text-[26px]"
              >
                Business benefits
              </motion.h2>
              <motion.h3
                variants={fadeUp}
                custom={0.06}
                className="max-w-[889px] font-lato text-[20px] font-bold leading-[120%] text-white lg:text-[24px] lg:leading-[100%]"
              >
                What changes for the people held accountable.
              </motion.h3>
              <motion.p
                variants={fadeUp}
                custom={0.12}
                className="max-w-[1068px] font-lato text-[16px] font-medium leading-[24px] text-white lg:text-[20px] lg:leading-[28px]"
              >
                V-Watch Ai is deliberately designed around the roles that carry
                the risk on a data centre programme project directors,
                operations, security, engineering and main contractors.
              </motion.p>
            </div>

            {/* Grid — 3 × 371 with 24px gaps at lg. */}
            <motion.ul
              variants={staggerContainer}
              className="grid grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-3"
            >
              {BENEFITS.map((b) => (
                <BenefitCard key={b.key} benefit={b} />
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
