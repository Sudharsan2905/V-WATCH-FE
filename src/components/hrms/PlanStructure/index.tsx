"use client";

import Image from "next/image";
import { motion, MotionConfig } from "motion/react";
import { scaleIn, staggerContainer, viewportReveal, wipeTop } from "@/components/about/anim";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PLANS = [
  {
    role: "Employees",
    tag: null,
    price: "USD 10",
    period: "/ User / Month",
    image: "/hrms/CardBG.png",
  },
  {
    role: "Managers",
    tag: "with payroll tools",
    price: "USD 20",
    period: "/ User / Month",
    image: "/hrms/CardBG.png",
  },
];

const INCLUSIONS = [
  "Full HRMS access",
  "Mobile app",
  "Payroll workflows",
  "Claims & leave management",
  "Reporting and dashboards",
];

// ─── Check icon ───────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] bg-[#21B1F1]/15">
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
        <path
          d="M2 5.5l2.5 2.5 4.5-5"
          stroke="#21B1F1"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

// ─── Plan card ────────────────────────────────────────────────────────────────

function PlanCard({
  role,
  tag,
  price,
  period,
  image,
}: {
  role: string;
  tag: string | null;
  price: string;
  period: string;
  image: string;
}) {
  return (
    <motion.div
      variants={scaleIn}
      className="flex flex-col overflow-hidden rounded-2xl border border-[#C8E8F8] bg-[linear-gradient(180deg,#FFFFFF_30%,#DAF0FD_100%)]"
    >
      {/* Text block */}
      <div className="flex flex-col gap-1 px-5 pt-5 pb-3">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="font-lato text-[16px] font-bold text-[#0A4B6E]">{role}</span>
          {tag && (
            <span className="font-lato text-[12px] font-normal text-[#5A7F9A]">
              ({tag})
            </span>
          )}
        </div>
        <p className="font-lato">
          <span className="text-[28px] font-black leading-tight text-[#0A4B6E] sm:text-[32px]">
            {price}
          </span>
          <span className="ml-1 text-[13px] text-[#6B8EA5]">{period}</span>
        </p>
      </div>

      {/* Illustration — fills bottom */}
      <div className="relative mt-auto h-[200px] w-full sm:h-[220px]">
        <Image
          src={image}
          alt={role}
          fill
          sizes="(min-width: 768px) 30vw, 100vw"
          className="object-contain object-bottom"
        />
      </div>
    </motion.div>
  );
}

// ─── What's included ──────────────────────────────────────────────────────────

function InclusionList() {
  return (
    <motion.div
      variants={scaleIn}
      className="flex flex-col justify-center rounded-2xl bg-white px-6 py-6"
      style={{
        maskImage: "linear-gradient(to right, black 0%, black 65%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, black 0%, black 65%, transparent 100%)",
      }}
    >
      <h3 className="mb-5 font-lato text-[16px] font-bold text-[#0A4B6E] sm:text-[17px]">
        What&apos;s included
      </h3>
      <ul className="flex flex-col gap-3.5">
        {INCLUSIONS.map((item) => (
          <li key={item} className="flex items-center gap-3">
            <CheckIcon />
            <span className="font-lato text-[14px] leading-snug text-[#3A6480] sm:text-[15px]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function HrmsPlanStructure() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="px-6 py-16 lg:px-[60px]">
        <div className="mx-auto w-full max-w-[1410px]">
          {/* Outer container — no border */}
          <div className="rounded-2xl bg-[#EEF7FD] p-5 sm:p-7">
            {/* Title */}
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={viewportReveal}
              variants={wipeTop}
              className="mb-5 font-lato text-[20px] font-bold text-[#0A4B6E] sm:text-[22px]"
            >
              Plan Structure
            </motion.h2>

            {/* 3-column grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={viewportReveal}
              className="grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
              {PLANS.map((plan) => (
                <PlanCard key={plan.role} {...plan} />
              ))}
              <InclusionList />
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
