"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { fadeUp, scaleIn } from "@/components/about/anim";

const VIEWPORT = { once: true, amount: 0.5, margin: "0px 0px -120px 0px" } as const;

/* ------------------------------------------------------------------ *
 * "How it works" — four numbered step cards.
 *
 * Figma (Frame: 1280 fill, hug 616, 60px side padding → 1160 content):
 *   section   80 top padding
 *   header    1160 × 136   vertical, gap 10 (h1 31 / h2 29 / body 56)
 *   ↕ 10
 *   cards row 1160 × 310   horizontal, gap 20
 *     └ card    275 × 310  radius 20, border 2, padding 16, gap 14
 *   section   80 bottom padding
 * 4×275 + 3×20 = 1160 ✓   80+136+10+310+80 = 616 ✓
 * Card height: 16 + 82 (number) + 14 + 24 (title) + 14 + 144 (body) + 16 ✓
 *
 * Lato ships 400/700/900 only, so Figma's 800 ExtraBold renders as 700 and
 * 500 Medium as 400 — the same mapping used across the rest of the site.
 * ------------------------------------------------------------------ */

// Drop the supplied icons at /public/site-visibility/how-it-works/<key>.svg
const ICON = (key: string) => `/site-visibility/${key}.svg`;

type Step = {
  key: string;
  number: string;
  title: string;
  body: string;
};

const STEPS: Step[] = [
  {
    key: "onboard",
    number: "1",
    title: "Onboard your site.",
    body: "Gates, zones, bays and reporting lines configured; sub-contractors self-onboard.",
  },
  {
    key: "rules",
    number: "2",
    title: "Set your site rules.",
    body: "Access, delivery windows, escort rules and induction validity enforced automatically",
  },
  {
    key: "capture",
    number: "3",
    title: "Capture site activity live.",
    body: "Gate check-in, passes, vehicles and deliveries feed into one live picture.",
  },
  {
    key: "report",
    number: "4",
    title: "Report without the rework.",
    body: "Attendance, delivery performance and exception logs, generated automatically.",
  },
];

/* Card surface: #F4FBFF at 20% over a white→#EFF9FF 2px gradient border. */
const SURFACE: React.CSSProperties = {
  background: `
    linear-gradient(rgba(244,251,255,0.2), rgba(244,251,255,0.2)) padding-box,
    linear-gradient(180deg, #FFFFFF 0%, #EFF9FF 100%) border-box
  `,
  border: "2px solid transparent",
};

/* Badge surface: same gradient border, but an opaque white fill so it reads as
   a raised tile. The card's 20% fill is near-transparent, so reusing it here
   would leave the badge invisible against the card. */
const BADGE_SURFACE: React.CSSProperties = {
  background: `
    linear-gradient(#FFFFFF, #FFFFFF) padding-box,
    linear-gradient(180deg, #FFFFFF 0%, #EFF9FF 100%) border-box
  `,
  border: "2px solid transparent",
  boxShadow:
    "0px 6px 16px rgba(10,75,110,0.08), 0px 2px 5px rgba(156,220,255,0.35)",
};

// Figma: 0/13/100 #C7C7C7 25% + 6/10/23 #D9E2FF 85%.
const CARD_SHADOW =
  "0px 13px 100px rgba(199,199,199,0.25), 6px 10px 23px rgba(217,226,255,0.85)";

function StepCard({ step, index }: Readonly<{ step: Step; index: number }>) {
  return (
    <motion.li
      variants={scaleIn}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      custom={index * 0.1}
      style={{ ...SURFACE, boxShadow: CARD_SHADOW }}
      className="flex flex-1 flex-col gap-[14px] rounded-[20px] p-[16px] lg:min-h-[238px]"
    >
      {/* Icon badge + numeral. The 82px numeral sets this row's height (82). */}
      <div className="flex items-center justify-between">
        <div
          style={BADGE_SURFACE}
          className="grid size-[54px] shrink-0 place-items-center rounded-[14px] p-[10px]"
        >
          <Image
            src={ICON(step.key)}
            alt=""
            width={30}
            height={30}
            className="size-[30px] object-contain"
          />
        </div>
        <span
          aria-hidden
          className="select-none font-lato text-[64px] font-black leading-none text-[#3EA0FE]/35 lg:text-[82px]"
        >
          {step.number}
        </span>
      </div>

      <h4 className="font-lato text-[18px] font-bold leading-[100%] tracking-[-0.002em] text-[#0F172A] lg:text-[20px]">
        {step.title}
      </h4>
      <p className="font-lato text-[16px] font-normal leading-[22px] tracking-[-0.002em] text-[#0F172A] lg:text-[18px] lg:leading-[24px]">
        {step.body}
      </p>
    </motion.li>
  );
}

export default function SiteVisibilityHowItWorks() {
  return (
    <section className="relative z-10 w-full bg-[#F4FBFF]">
      {/* Full-bleed rounded panel; the 1160 content is centred inside it via
          the 1280 cap + 60px side padding. */}
      <div
        className="w-full rounded-[40px] py-[48px] lg:py-[80px]"
        style={{
          background: "linear-gradient(180deg, #D6ECFA 0%, #FFFFFF 25%)",
        }}
      >
        {/* Same wrapper shape as the Modules section (padding outside the 1410
            cap) so both sections' content starts on the same x position. */}
        <div className="w-full px-[24px] lg:px-[60px]">
          <div className="mx-auto flex w-full max-w-[1410px] flex-col gap-[24px] lg:gap-[10px]">
          {/* Header — gap 10; copy caps at 889 (headings) / 1068 (body). */}
          <div className="flex flex-col gap-[10px]">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="max-w-[889px] font-lato text-[20px] font-bold leading-[120%] text-[#0A4B6E] lg:text-[24px] lg:leading-[100%]"
            >
              From site mobilisation to live control in four moves.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.08}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="max-w-[1068px] font-lato text-[16px] font-medium leading-[24px] text-[#0A4B6E] lg:text-[20px] lg:leading-[28px]"
            >
              Designed to slot into how data centre sites already run: main
              contractor programme, sub-contractor onboarding, security
              protocol, client reporting. No re-plumbing your site just a
              clearer, faster operational layer over the top.
            </motion.p>
          </div>

          {/* Cards — 4 × 275 with 20px gaps at lg; stacked below. */}
          <ul className="mt-[8px] grid grid-cols-1 gap-[20px] sm:grid-cols-2 lg:mt-0 lg:flex lg:items-stretch">
              {STEPS.map((s, i) => (
                <StepCard key={s.key} step={s} index={i} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
