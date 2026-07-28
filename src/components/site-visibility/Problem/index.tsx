"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { fadeUp, scaleIn } from "@/components/about/anim";

const VIEWPORT = { once: true, amount: 0.5, margin: "0px 0px -120px 0px" } as const;

type ProblemCardData = {
  key: string;
  icon: string;
  title: string;
  body: string;
};

const PROBLEM_CARDS: ProblemCardData[] = [
  {
    key: "access",
    icon: "/site-visibility/contractors_icon.svg",
    title: "Contractors you cannot fully account for.",
    body: "No live view of who is inside the perimeter right now.",
  },
  {
    key: "compliance",
    icon: "/site-visibility/expired_icon.svg",
    title: "Expired inductions slipping through.",
    body: "Paper sign-in cannot flag out-of-date documents in real time.",
  },
  {
    key: "logistics",
    icon: "/site-visibility/delivery_icon.svg",
    title: "Delivery chaos at the gate.",
    body: "Unplanned arrivals, queuing and double-booked bays cost programme days.",
  },
  {
    key: "reporting",
    icon: "/site-visibility/reporting_icon.svg",
    title: "Reporting stitched together after the fact.",
    body: "Different teams working from different versions of the truth.",
  },
];

// Soft "glass" surface used by both the card and the icon chip: a translucent
// #F4FBFF fill with a white→#EFF9FF gradient border (padding-box / border-box trick).
const GLASS_SURFACE: React.CSSProperties = {
  background: `
    linear-gradient(rgba(244,251,255,0.2), rgba(244,251,255,0.2)) padding-box,
    linear-gradient(180deg, #FFFFFF 0%, #EFF9FF 100%) border-box
  `,
  border: "2px solid transparent",
};

// Card sits on a wide, very soft lift; the chip gets the same shape scaled down
// so it reads as a raised tile inside the card.
const CARD_SHADOW =
  "0px 4px 12px rgba(9, 46, 84, 0.04), 0px 13px 40px rgba(9, 46, 84, 0.08)";

const CHIP_SHADOW =
  "0px 2px 6px rgba(9, 46, 84, 0.05), 0px 6px 16px rgba(9, 46, 84, 0.08)";

function ProblemCard({ card, index }: { card: ProblemCardData; index: number }) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      custom={index * 0.1}
      style={{ ...GLASS_SURFACE, boxShadow: CARD_SHADOW }}
      className="flex h-full flex-col gap-[14px] rounded-[20px] p-[16px]"
    >
      <div
        style={{ ...GLASS_SURFACE, boxShadow: CHIP_SHADOW }}
        className="grid size-[54px] shrink-0 place-items-center rounded-[14px] p-[10px]"
      >
        {card.icon ? (
          <Image
            src={card.icon}
            alt=""
            width={27}
            height={27}
            className="h-full w-full object-contain"
          />
        ) : null}
      </div>

      <h3 className="font-lato text-[18px] font-bold leading-[24px] tracking-[-0.2px] text-[#0F172A] lg:text-[20px] lg:leading-[26px]">
        {card.title}
      </h3>

      <p className="font-lato text-[16px] font-normal leading-[22px] tracking-[-0.2px] text-[#0F172A] lg:text-[18px] lg:leading-[24px]">
        {card.body}
      </p>
    </motion.div>
  );
}

export default function SiteVisibilityProblem() {
  return (
    <section className="relative z-10 bg-[#f5fbff] py-[56px] md:py-[40px] lg:py-[50px]">
      <div className="w-full px-[24px] lg:px-[60px]">
        <div className="mx-auto w-full max-w-[1410px]">
          <div
          className="flex flex-col gap-[10px]"
        >
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="font-lato text-[22px] font-extrabold leading-[100%] text-[#0A4B6E] sm:text-[24px]"
          >
            Where control quietly slips on a data centre site.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            custom={0.08}
            className="max-w-[1068px] font-lato text-[16px] font-medium leading-[24px] text-[#0A4B6E] sm:text-[18px] lg:text-[20px] lg:leading-[28px]"
          >
            Small manual gaps compound into programme risk, security exposure
            and audit failures.
          </motion.p>
        </div>

        <div
          className="mt-[30px] grid grid-cols-1 gap-[20px] sm:grid-cols-2 lg:mt-[40px] lg:grid-cols-4"
        >
          {PROBLEM_CARDS.map((card, i) => (
            <ProblemCard key={card.key} card={card} index={i} />
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
