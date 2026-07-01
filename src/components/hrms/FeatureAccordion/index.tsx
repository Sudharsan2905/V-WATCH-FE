"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import {
  fadeUp,
  staggerContainer,
  viewportReveal,
} from "@/components/about/anim";

// ─── Module data ─────────────────────────────────────────────────────────────

const MODULES = [
  {
    number: "01",
    title: "Mobile App",
    bullets: [
      "Check-in/out on the go",
      "Submit claims and leave instantly",
      "View attendance history",
      "Managers approve requests anywhere",
    ],
    image: "/hrms/mobileAppBanner.png",
  },
  {
    number: "02",
    title: "Employee Management",
    bullets: [
      "Maintain employee profiles and documents",
      "Manage roles, departments, and reporting lines",
      "Track employment history and contract details",
      "Onboard and offboard employees seamlessly",
    ],
    image: "/hrms/mobileAppBanner.png",
  },
  {
    number: "03",
    title: "Attendance Tracking",
    bullets: [
      "Real-time clock-in and clock-out recording",
      "Shift scheduling and roster management",
      "Overtime and late arrival detection",
      "Export attendance reports with one click",
    ],
    image: "/hrms/mobileAppBanner.png",
  },
  {
    number: "04",
    title: "Payroll Management",
    bullets: [
      "Auto-calculate salaries from attendance data",
      "Include allowances, deductions, and overtime",
      "Approve payroll runs with full audit trail",
      "Integrate with accounting systems",
    ],
    image: "/hrms/mobileAppBanner.png",
  },
  {
    number: "05",
    title: "Claims Management",
    bullets: [
      "Employees submit claims via mobile or web",
      "Attach receipts and supporting documents",
      "Multi-level approval workflow",
      "Auto-post approved claims to payroll",
    ],
    image: "/hrms/mobileAppBanner.png",
  },
  {
    number: "06",
    title: "Leave Management",
    bullets: [
      "Configure leave types and entitlements",
      "Employees apply and track leave online",
      "Manager approvals with coverage checks",
      "Leave balances updated in real time",
    ],
    image: "/hrms/mobileAppBanner.png",
  },
];

// ─── Icons ───────────────────────────────────────────────────────────────────

function PlusIcon() {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circle */}
      <circle
        cx="22"
        cy="22"
        r="18"
        fill="white"
        stroke="#9EDCC9"
        strokeWidth="1"
      />

      {/* Vertical line */}
      <line
        x1="22"
        y1="17"
        x2="22"
        y2="27"
        stroke="#6CCB5F"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Horizontal line */}
      <line
        x1="17"
        y1="22"
        x2="27"
        y2="22"
        stroke="#21B1F1"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="minusBg"
          x1="0"
          y1="0"
          x2="44"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#21B1F1" />
          <stop offset="100%" stopColor="#A6C936" />
        </linearGradient>

        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="4"
            stdDeviation="4"
            floodColor="#000000"
            floodOpacity="0.1"
          />
        </filter>
      </defs>

      {/* 44×44 button */}
      <circle
        cx="22"
        cy="22"
        r="18"
        fill="url(#minusBg)"
        filter="url(#shadow)"
      />

      {/* 18×18 minus */}
      <g transform="translate(13 13)">
        <line
          x1="4"
          y1="9"
          x2="14"
          y2="9"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="9" fill="rgba(33,177,241,1)" />
      <path
        d="M5 9.5l2.5 2.5 5.5-5.5"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Single accordion item ────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function AccordionItem({
  module,
  isOpen,
  onToggle,
  isLast,
}: {
  module: (typeof MODULES)[number];
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
}) {
  return (
    <div>
      {/* Header — only this gets the background when active */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`flex w-full items-center gap-4 rounded-2xl px-5 py-5 text-left transition-all duration-200 sm:px-7 sm:py-5 ${
          isOpen
            ? "bg-[linear-gradient(90deg,#e3f5ff_80%,#e2f4fe_10%,#ddf1fc_10%)] shadow-[0_2px_14px_0_rgba(0,117,180,0.15)]"
            : ""
        }`}
      >
        <span
          className={`font-anton text-[28px] font-extrabold leading-none sm:text-[36px] ${
            isOpen ? "text-[#5CB7E8]" : "text-[#3DA9F5]/25"
          }`}
        >
          {module.number}
        </span>
        <span
          className={`flex-1 font-lato text-[16px] font-bold leading-snug sm:text-[18px] ${
            isOpen ? "text-[#0A4B6E]" : "text-[#1E3A5F]"
          }`}
        >
          {module.title}
        </span>
        <span className="shrink-0">
          {isOpen ? <MinusIcon /> : <PlusIcon />}
        </span>
      </button>

      {/* Expanded content — no background, sits on the page surface */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between p-3">
              {/* Bullet list — keeps its own padding */}
              <ul className="flex shrink-0 flex-col gap-4 px-5 py-6 sm:max-w-[350px] sm:px-7 sm:py-8 md:max-w-[564px]">
                {module.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0">
                      <CheckIcon />
                    </span>
                    <span className="font-lato text-[15px] leading-[22px] text-[#314158] sm:text-[18px]">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Image — medium size, pushed to the right end */}
              <div
                className="
                  overflow-hidden
                  rounded-[20px]
                  py-1 pr-1
                  bg-white
                  shadow-[4.95px_7.92px_31.67px_3.96px_rgba(0,45,70,0.06),19.79px_13.85px_33.65px_rgba(29,108,151,0.10)]
                "
              >
                <div className="relative h-[232px] w-[300px] md:w-[350px] lg:w-[478px]">
                  <Image
                    src={module.image}
                    alt={module.title}
                    width={478}
                    height={232}
                    unoptimized
                    className="h-full w-full rounded-[20px] object-cover"
                  />

                  <div
                    className="
      pointer-events-none
      absolute
      inset-y-0
      left-0
      w-32
      rounded-l-[20px]
      bg-gradient-to-r
      from-[#f2f8fe]
      via-white/70
      to-transparent
    "
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Divider between items */}

      <div
        className="mx-1 h-[2px] rounded-full"
        style={{
          background:
            "linear-gradient(90deg, #F5FBFF 0%, #9CDCFF 50%, #F5FBFF 100%)",
        }}
      />
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function HrmsFeatureAccordion() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <MotionConfig reducedMotion="user">
      <section className="px-6 py-4 md:py-10 lg:px-[60px] bg-[#f5fbff]">
        <div className="mx-auto flex w-full max-w-[1410px] flex-col gap-8">
          {/* Section header */}
          {/* <motion.header
            initial="hidden"
            whileInView="show"
            viewport={viewportReveal}
            className="flex flex-col gap-2"
          >
            <motion.h2
              variants={wipeTop}
              className="font-lato text-[22px] font-bold leading-tight text-[#0A4B6E] sm:text-[26px]"
            >
              One platform, every HR function
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.15}
              className="max-w-[680px] font-lato text-[16px] leading-[26px] text-[#4A6C82] sm:text-[18px]"
            >
              Everything your team needs — from mobile check-ins to payroll — in
              a single connected system.
            </motion.p>
          </motion.header> */}

          {/* Accordion list */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportReveal}
            className="flex flex-col max-w-[1080px] w-full mx-auto"
          >
            {MODULES.map((module, i) => (
              <motion.div
                key={module.number}
                variants={fadeUp}
                custom={i * 0.05}
              >
                <AccordionItem
                  module={module}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                  isLast={i === MODULES.length - 1}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
