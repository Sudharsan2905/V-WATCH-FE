"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, MotionConfig, type Variants } from "motion/react";

// Dedicated hero for the HRMS promo redesign — intentionally NOT built on
// ProductsHero (shared by /products), since that component stays untouched.

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay },
  }),
};

const CHECKLIST = [
  "Full access to all HR modules",
  "No credit card required",
  "Mobile and web access",
  "Only RM5 per employee/month",
];

const FEATURE_STRIP = [
  {
    title: "Everything in One Place",
    description: "Attendance, payroll, leave, claims and employee information.",
  },
  {
    title: "Made for Malaysian SMEs",
    description: "Practical HR tools without complicated enterprise pricing.",
  },
  {
    title: "Accessible Anywhere",
    description:
      "Employees and managers can complete essential HR tasks on mobile or web.",
  },
  {
    title: "Simple Pricing",
    description:
      "Continue after your free period for only RM5 per subscribed employee each month.",
  },
];

function CheckIcon({ className = "" }: Readonly<{ className?: string }>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={className}
    >
      <circle cx="8" cy="8" r="8" fill="currentColor" opacity="0.16" />
      <path
        d="M4.8 8.2 6.8 10.2 11.2 5.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RefreshIcon({ className = "" }: Readonly<{ className?: string }>) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M13.5 3v3.2h-3.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeroCopy() {
  return (
    <motion.div initial="hidden" animate="show" className="flex flex-col gap-5">
      <motion.span
        variants={fadeUp}
        custom={0.05}
        className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] font-semibold text-white"
      >
        <span className="h-2 w-2 rounded-full bg-[#4ADE80]" />
        One HR System for Your Entire Team
      </motion.span>

      <motion.h1
        variants={fadeUp}
        custom={0.15}
        className="max-w-[560px] text-[34px] font-extrabold leading-[1.15] sm:text-[42px] lg:text-[48px]"
      >
        <span className="block text-white">Take HR Off Your Spreadsheets</span>
        <span
          className="mt-1 block bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(90deg,#4ADE80,#22D3EE)",
          }}
        >
          Free for Two Months
        </span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        custom={0.25}
        className="max-w-[520px] text-[15px] leading-[24px] text-[#C7D3E0] sm:text-[16px]"
      >
        Manage employee records, attendance, leave, claims and payroll from
        one connected HR platform built for Malaysian SMEs. Sign up by 15
        September 2026 and enjoy full access for two months at no cost.
      </motion.p>

      <motion.div
        variants={fadeUp}
        custom={0.35}
        className="mt-1 flex flex-wrap items-center gap-3"
      >
        <Link
          href="#trial"
          className="inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-bold text-white shadow-[0_10px_30px_-6px_rgba(74,222,128,0.45)] transition hover:brightness-110"
          style={{
            background: "linear-gradient(90deg,#12967F 0%,#5CBE72 100%)",
          }}
        >
          <RefreshIcon />
          Claim My 2 Free Months
        </Link>
        <Link
          href="#features"
          className="inline-flex h-12 items-center rounded-full bg-white px-6 text-[15px] font-bold text-[#0A1220] transition hover:brightness-95"
        >
          Explore the Features
        </Link>
      </motion.div>

      <motion.div
        variants={fadeUp}
        custom={0.45}
        className="mt-2 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2"
      >
        {CHECKLIST.map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 text-[14px] text-[#DCE6F0]"
          >
            <CheckIcon className="shrink-0 text-[#4ADE80]" />
            {item}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function HrmsHero() {
  const [mockupFailed, setMockupFailed] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-[#05080F]">
        {/* Promo banner — first thing in normal document flow, directly under
            the fixed global Navbar (which always overlays the viewport top
            regardless of DOM order, so this can't render visually "above" it
            without touching that shared component). */}
        {/* <div
          className="relative z-0 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 px-4 py-2.5 pt-[calc(0.625rem+76px)] text-center text-[13px] font-semibold text-white sm:text-[14px]"
          style={{ background: "linear-gradient(90deg,#12967F 0%,#5CBE72 100%)" }}
        >
          <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.04em] sm:text-[12px]">
            Limited-Time SME Offer
          </span>
          <span className="max-w-[560px]">
            Sign up by 15 September 2026 and get full V-Watch HR System
            access FREE for two months
          </span>
          <Link
            href="#trial"
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[12px] font-bold text-[#12967F] transition hover:brightness-95"
          >
            Claim This Offer <span aria-hidden>→</span>
          </Link>
        </div> */}

        {/* Dark hero panel. pt-[132px]/lg:pt-[140px] = 76px fixed-navbar
            clearance + the panel's own breathing room — the banner above
            used to carry that 76px clearance; with it commented out, this is
            now the only thing keeping content from starting under the fixed
            nav on every device. */}
        <div className="relative px-6 pb-24 pt-[132px] lg:px-15 lg:pb-32 lg:pt-[140px]">
          {/* Faint light-ray texture, screen-blended over the flat dark
              panel. Purely decorative — sits behind the copy/mockup row and
              the feature strip below it. Desktop only: on mobile/tablet the
              panel stays a flat solid dark background.
              object-fill (stretch), not object-cover: this is an abstract,
              edge-to-edge texture in Figma, not a photo with a subject to
              protect from cropping — object-cover was scaling it up to cover
              the panel's full (taller-than-the-image) box and cropping the
              sides in the process, leaving plain dark margins instead of the
              texture reaching the panel's actual edges. */}
          <Image
            src="/hrms-new/hero-background.webp"
            alt=""
            aria-hidden
            fill
            unoptimized
            sizes="100vw"
            className="pointer-events-none hidden select-none object-fill opacity-25 mix-blend-screen lg:block"
          />

          {/* Copy next to the plain device mockup (Macbook.webp) — one
              layout at every size (side-by-side from sm up, stacked on
              phones below that), just re-sized per breakpoint. Deliberately
              NOT the old full-width composite: that image had a huge plain
              band baked in below the laptop, which needed a percentage
              negative-margin hack on the feature strip to compensate. This
              snug device crop needs no such correction. */}
          <div className="relative mx-auto flex max-w-[1280px] flex-col gap-8 sm:flex-row sm:items-center sm:gap-6 lg:gap-16">
            <div className="sm:min-w-0 sm:flex-1">
              <HeroCopy />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
              className="relative mx-auto aspect-[756/472] w-full max-w-[320px] shrink-0 sm:mx-0 sm:w-[42%] sm:max-w-[360px] lg:w-[56%] lg:max-w-[760px]"
            >
              {!mockupFailed && (
                <Image
                  src="/hrms-new/Macbook.webp"
                  alt="V-Watch HRMS dashboard and mobile app preview"
                  fill
                  unoptimized
                  priority
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 360px, 760px"
                  className="object-contain"
                  onError={() => setMockupFailed(true)}
                />
              )}
            </motion.div>
          </div>

          {/* Feature strip. Plain positive margin now — the old negative,
              percentage-based pull-up was only needed to compensate for the
              full-width composite's large empty band, which no longer
              exists with this snug mockup. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative z-10 mx-auto mt-10 grid max-w-[1280px] grid-cols-1 divide-y divide-white/10 rounded-[18px] border border-white/10 bg-white/[0.04] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4"
          >
            {FEATURE_STRIP.map((f) => (
              <div key={f.title} className="px-6 py-5">
                <h4 className="text-[14px] font-bold text-white">{f.title}</h4>
                <p className="mt-1 text-[13px] leading-[19px] text-[#AEBBCC]">
                  {f.description}
                </p>
              </div>
            ))}
          </motion.div>

          <p className="relative mx-auto mt-8 max-w-[720px] text-center text-[13px] text-[#93A3B8]">
            Limited-time offer for Malaysian SMEs. Registration closes on 15
            September 2026.
          </p>
        </div>

        {/* Bottom curve — matches the pattern used across the other Hero
            components (see pre-construction/Hero): a single smooth arc on a
            fixed 1440x100 viewBox, plus a 2px sealing strip so no subpixel
            gap can bleed through between sections. Blends into the white top
            of the section that follows (HrmsOverview's gradient starts at
            #FFFFFF). */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-12 w-full lg:h-[100px]"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <path d="M0 0 Q720 100 1440 0 L1440 100 L0 100 Z" fill="#FFFFFF" />
        </svg>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[2px] bg-white" />
      </section>
    </MotionConfig>
  );
}
