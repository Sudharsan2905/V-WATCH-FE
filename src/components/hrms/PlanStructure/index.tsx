"use client";

import Image from "next/image";
import { motion, MotionConfig } from "motion/react";
import {
  scaleIn,
  staggerContainer,
  viewportReveal,
  wipeTop,
} from "@/components/about/anim";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PLANS = [
  {
    role: "Employees",
    tag: null,
    price: "USD 10",
    period: "/ User / Month",
    image: "/hrms/Card1BG.png",
  },
  {
    role: "Managers",
    tag: "with payroll tools",
    price: "USD 20",
    period: "/ User / Month",
    image: "/hrms/Card2BG.png",
  },
];

const INCLUSIONS = [
  "Full HRMS access",
  "Mobile app",
  "Payroll workflows",
  "Claims & leave management",
  "Reporting and dashboards",
];

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
      className="bg-[#edf7fd] relative min-h-[300px] md:min-h-[356px] h-full flex flex-col overflow-hidden rounded-2xl border-2 border-white"
    >
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `
      radial-gradient(
        ellipse 90% 80% at 50% 80%,
        rgba(255,255,255,1) 0%,
        rgba(255,255,255,1) 25%,
        rgba(180,215,250,0.75) 48%,
        rgba(200,225,250,0.3) 65%,
        rgba(255,255,255,0) 80%
      )
    `,
        }}
      />
      <div className="relative z-20 flex flex-col gap-1 px-6 pt-6 ">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="font-lato text-[20px] font-bold text-[#0F172A]">
            {role}
          </span>
          {tag && (
            <span className="font-lato text-[18px] font-normal text-[#0F172A]">
              ({tag})
            </span>
          )}
        </div>
        <p className="font-lato">
          <span className="text-[28px] font-black leading-tight text-[#005276] sm:text-[32px]">
            {price}
          </span>
          <span className="ml-1 text-[15px] md:text-[18px] text-[#005276]">
            {period}
          </span>
        </p>
      </div>

      {/* Illustration container */}
      <div className="relative h-[200px] w-full sm:h-[250px]">
        {/* Glow layer — sits ABOVE white bg but BELOW the image */}

        <Image
          src={image}
          alt={role}
          fill
          sizes="(min-width: 768px) 30vw, 100vw"
          className="relative z-10 object-contain object-bottom-right"
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
      className="max-h-[310px] max-w-[547px] w-full h-full flex flex-col justify-center rounded-2xl bg-white px-6 py-6"
      style={{
        maskImage:
          "linear-gradient(to right, black 0%, black 80%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, black 0%, black 80%, transparent 100%)",
      }}
    >
      <h3 className="mb-6 font-lato text-[16px] font-bold text-[#0A4B6E] sm:text-[20px]">
        What&apos;s included
      </h3>
      <ul className="flex flex-col gap-5">
        {INCLUSIONS.map((item) => (
          <li key={item} className="flex items-center gap-3">
            <Image
              src={"/hrms/tick.svg"}
              alt="tick-icon"
              height={24}
              width={24}
            />
            <span className="font-lato text-[14px] leading-snug text-[#314158] sm:text-[18px]">
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
      <div
        className="w-full rounded-t-[40px]"
        style={{
          background: `
      radial-gradient(
        ellipse 120% 60% at 50% 0%,
        rgba(255,255,255,0.55) 0%,
        rgba(255,255,255,0.15) 40%,
        rgba(255,255,255,0) 72%
      ),
      linear-gradient(
        180deg,
        #E1EFFB 0%,
        #D8EBF9 30%,
        #D0E7F7 60%,
        #E8F4FF 100%
      )
    `,
        }}
      >
        <section className="px-6 py-6 md:py-10 lg:px-[60px]">
          <div className="mx-auto w-full max-w-[1410px]">
            {/* Outer container — no border */}

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
              className="min-h-[356px] grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {PLANS.map((plan) => (
                <PlanCard key={plan.role} {...plan} />
              ))}
              <InclusionList />
            </motion.div>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}
