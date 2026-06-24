"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import {
  wipeTop,
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
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="9" stroke="#3DA9F5" strokeWidth="1.5" />
      <path
        d="M10 6v8M6 10h8"
        stroke="#3DA9F5"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle
        cx="10"
        cy="10"
        r="9"
        fill="#3DA9F5"
        stroke="#3DA9F5"
        strokeWidth="1.5"
      />
      <path
        d="M6 10h8"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
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
        className={`flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left transition-all duration-200 sm:px-7 sm:py-5 ${
          isOpen
            ? "bg-[linear-gradient(135deg,#E8F5FD_0%,#F4FBFF_100%)] shadow-[0_2px_14px_0_rgba(0,117,180,0.10)]"
            : ""
        }`}
      >
        <span
          className={`font-lato text-[28px] font-extrabold leading-none sm:text-[36px] ${
            isOpen ? "text-[#3DA9F5]" : "text-[#3DA9F5]/30"
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
              <ul className="flex shrink-0 flex-col gap-4 px-5 py-6 sm:w-[38%] sm:px-7 sm:py-8">
                {module.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0">
                      <CheckIcon />
                    </span>
                    <span className="font-lato text-[14px] leading-[22px] text-[#3A6480] sm:text-[15px]">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Image — medium size, pushed to the right end */}
              <Image
                src={module.image}
                alt={module.title}
                width={350}
                height={100}
                unoptimized
                className="object-cover"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Divider between items */}
      {!isLast && <div className="mx-1 border-b border-[#E0F0FA]" />}
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function HrmsFeatureAccordion() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <MotionConfig reducedMotion="user">
      <section className="px-6 py-16 lg:px-[60px]">
        <div className="mx-auto flex w-full max-w-[1410px] flex-col gap-8">
          {/* Section header */}
          <motion.header
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
          </motion.header>

          {/* Accordion list */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportReveal}
            className="flex flex-col gap-3"
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
