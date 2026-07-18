"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { fadeUp, scaleIn, staggerContainer, viewportReveal } from "@/components/about/anim";

type ProblemCardData = {
  key: string;
  // Icon path — left empty for now; drop the provided asset in /public and set it here.
  icon: string;
  title: string;
  body: string;
  tag: string;
};

const PROBLEM_CARDS: ProblemCardData[] = [
  {
    key: "access",
    icon: "/site-visibility/contractors_icon.svg",
    title: "Contractors you cannot fully account for.",
    body: "Multiple sub-trades, agency labor and one-off visitors on site but no single, live view of who is inside the perimeter right now.",
    tag: "Access & Security",
  },
  {
    key: "compliance",
    icon: "/site-visibility/expired_icon.svg",
    title: "Expired inductions and access passes slipping through.",
    body: "Paper sign-in and manual pass checks can't flag out-of-date inductions, permits or right-to-work quickly enough at a busy gate.",
    tag: "Compliance",
  },
  {
    key: "logistics",
    icon: "/site-visibility/delivery_icon.svg",
    title: "Delivery chaos at the gate.",
    body: "Vehicles arriving unannounced, queuing on the highway, double-booked bays and unloading conflicts that quietly delay the programme.",
    tag: "Logistics",
  },
  {
    key: "reporting",
    icon: "/site-visibility/reporting_icon.svg",
    title: "Reporting stitched together after the fact.",
    body: "End-of-week reports assembled from disconnected logs leaving project directors, security and clients working from different versions of the truth.",
    tag: "Reporting",
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

function ProblemCard({ card }: { card: ProblemCardData }) {
  return (
    <motion.div
      variants={scaleIn}
      style={{
        ...GLASS_SURFACE,
        boxShadow: "0px 13px 100px rgba(9, 46, 84, 0.06)",
      }}
      className="flex h-full flex-col gap-[14px] rounded-[20px] p-[16px]"
    >
      {/* Icon chip — inner icon left empty until the asset is provided. */}
      <div
        style={GLASS_SURFACE}
        className="grid size-[54px] flex-shrink-0 place-items-center rounded-[14px] p-[10px]"
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

      <p className="flex-1 font-lato text-[16px] font-normal leading-[22px] tracking-[-0.2px] text-[#0F172A] lg:text-[18px] lg:leading-[24px]">
        {card.body}
      </p>

      <span className="inline-flex w-fit items-center rounded-full border border-[#3890C0] px-[14px] py-[6px] font-lato text-[11px] font-semibold uppercase tracking-[0.06em] text-[#3890C0]">
        {card.tag}
      </span>
    </motion.div>
  );
}

export default function SiteVisibilityProblem() {
  return (
    <section className="relative z-10 bg-[#f5fbff] py-[56px] md:py-[40px] lg:py-[50px]">
      <div className="w-full px-[24px] lg:px-[60px]">
        <div className="mx-auto w-full max-w-[1410px]">
          <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportReveal}
          variants={staggerContainer}
          className="flex flex-col gap-[10px]"
        >
          <motion.p
            variants={fadeUp}
            className="font-lato text-[22px] font-extrabold leading-[100%] text-[#0A4B6E] sm:text-[24px] lg:text-[26px]"
          >
            The problem
          </motion.p>

          <motion.h2
            variants={fadeUp}
            custom={0.08}
            className="font-lato text-[22px] font-extrabold leading-[100%] text-[#0A4B6E] sm:text-[24px]"
          >
            The moments where control quietly slips on a data centre site.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={0.16}
            className="max-w-[1068px] font-lato text-[16px] font-medium leading-[24px] text-[#0A4B6E] sm:text-[18px] lg:text-[20px] lg:leading-[28px]"
          >
            Data Centre programmes are unforgiving. When access, deliveries and
            site movement are managed on clipboards, spreadsheets and WhatsApp
            threads, small gaps compound into programme risk, security exposure
            and audit failures.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportReveal}
          variants={staggerContainer}
          className="mt-[30px] grid grid-cols-1 gap-[20px] sm:grid-cols-2 lg:mt-[40px] lg:grid-cols-4"
        >
          {PROBLEM_CARDS.map((card) => (
            <ProblemCard key={card.key} card={card} />
          ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
