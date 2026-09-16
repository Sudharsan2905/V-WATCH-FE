"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, MotionConfig, type Variants } from "motion/react";
import { ArrowBadge } from "@/components/common/BookADemo";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay },
  }),
};

const VIEWPORT = { once: true, amount: 0.25, margin: "0px 0px -100px 0px" } as const;

const FREE_ACCESS = [
  "Employee management",
  "Mobile and portal attendance",
  "Payroll management",
  "Leave management",
  "Claims management",
  "Employee mobile access",
  "Payslip generation",
  "Approval workflows",
  "Reports and dashboards",
];

const PRICING_EXAMPLES = [
  { employees: "10", price: "50", icon: "/hrms-new/employee.svg" },
  { employees: "25", price: "125", icon: "/hrms-new/employees-25.svg" },
  { employees: "50", price: "250", icon: "/hrms-new/employees-50.svg" },
  // employees-100.svg was exported as a 0-byte file — falling back to the
  // 50-tier icon until a real one lands, rather than shipping a blank image.
  { employees: "100", price: "500", icon: "/hrms-new/employees-50.svg" },
];

function CheckTick({ className = "" }: Readonly<{ className?: string }>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={className}
    >
      <circle cx="8" cy="8" r="8" fill="currentColor" />
      <path
        d="M4.8 8.2 6.8 10.2 11.2 5.6"
        stroke="#05080F"
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

/** Section eyebrow — label, then the dot+fading-line asset trailing to the
    edge (line-icon.svg bakes the dot and the fade into one image, rather
    than two separately styled elements). */
function SectionLabel({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex items-center gap-3">
      <span className="shrink-0 font-lato text-[20px] font-bold uppercase tracking-[0.04em] text-white">
        {children}
      </span>
      <span className="relative min-w-0 flex-1">
        <Image
          src="/hrms-new/line-icon.svg"
          alt=""
          aria-hidden
          width={339}
          height={11}
          unoptimized
          className="h-auto w-full"
        />
      </span>
    </div>
  );
}

export default function HrmsPlanStructure() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden rounded-t-[40px] rounded-b-[40px] bg-[#05080F] px-6 py-14 lg:px-15 lg:py-20">
        {/* Background image needs an explicit z-index, not just `fill` —
            without one, its stacking order versus the content below is
            decided by whether Framer Motion's `transform` on those
            motion.divs happens to win a stacking-context tiebreak, which is
            NOT reliable (it's why this was covering the pricing card). z-0
            here + z-10 on the content below pins it behind, guaranteed. */}
        <Image
          src="/industries/construction/designed-environment/env-bg.png"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="pointer-events-none absolute inset-0 z-0 select-none object-cover object-top opacity-20"
        />
        <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col gap-8">
          {/* Full-width header — deliberately OUTSIDE the two-column grid
              below. It used to live inside the left column, which pushed the
              calendar box down while the pricing card (nothing above it)
              started right at the top — the two columns never lined up.
              Pulling it out means both columns below start level. */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="flex flex-col gap-1"
          >
            <motion.h2
              variants={fadeUp}
              custom={0.05}
              className="font-lato text-[26px] font-bold leading-[1.25] text-white sm:text-[30px]"
            >
              Use Every HRMS Feature Free for Two Full Months
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.12}
              className="font-lato  font-normal text-[20px] text-[#FFFFFF]"
            >
              This is not a limited-feature demonstration.
            </motion.p>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-[1fr_560px] lg:items-stretch lg:gap-12">
          {/* Left — calendar note + free-access checklist + CTA */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="flex flex-col gap-6"
          >
            <motion.div
              variants={fadeUp}
              custom={0.2}
              className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3.5"
            >
              {/* calendar.svg is just the glyph — the rounded-square badge
                  around it is built here, not baked into the asset. */}
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] shadow-[0_8px_16px_rgba(0,0,0,0.25)]">
                <Image
                  src="/hrms-new/calendar.svg"
                  alt=""
                  aria-hidden
                  width={39}
                  height={38}
                  unoptimized
                  className="h-8 w-8"
                />
              </span>
              <span className="font-lato text-[18px] leading-[21px] text-[#DCE6F0] sm:text-[18px]">
                Sign up by{" "}
                <span className="font-bold text-[18px] text-[#C5EB4C]">
                  31st December 2026
                </span>{" "}
                and receive full access to the V-Watch HRMS platform for two
                months.
              </span>
            </motion.div>

            <motion.div variants={fadeUp} custom={0.28}>
              <SectionLabel>Your Free Access Includes</SectionLabel>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={0.34}
              className="grid grid-cols-1 gap-x-8 gap-y-2.5"
            >
              {FREE_ACCESS.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 font-lato text-[18px] text-[#DCE6F0] sm:text-[18px]"
                >
                  <CheckTick className="shrink-0 text-[#3DA9F5]" />
                  {item}
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} custom={0.42}>
              <Link
                href="#trial"
                className="inline-flex h-12 items-center gap-2 rounded-full px-6 font-lato text-[18px] font-bold text-white shadow-[0_10px_30px_-6px_rgba(74,222,128,0.45)] transition hover:brightness-110"
                style={{
                  background: "linear-gradient(90deg,#12967F 0%,#5CBE72 100%)",
                }}
              >
             <ArrowBadge />
                Start My 2 Free Months
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — pricing card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.55, ease: EASE, delay: 0.15 }}
            className="relative flex flex-col gap-5 overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.04] p-6 lg:p-7"
          >
            {/* soft dark-blue glow blobs */}
            <div className="pointer-events-none absolute -right-16 top-8 h-56 w-56 rounded-full bg-[#1D4ED8] opacity-40 blur-[110px]" />
            <div className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-[#2563EB] opacity-35 blur-[130px]" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-[#1D4ED8] opacity-35 blur-[130px]" />
            <div className="pointer-events-none absolute -left-10 top-1/3 h-48 w-48 rounded-full bg-[#2563EB] opacity-30 blur-[110px]" />

            <div className="relative flex items-center justify-between gap-3">
              <h3 className="font-lato text-[16px] font-bold text-white">
                Your Cost for the First Two Months
              </h3>
              <span
                className="shrink-0 rounded-full px-3 py-1 font-lato text-[11px] font-bold uppercase tracking-[0.04em] text-[#0A4B6E]"
                style={{
                  background: "linear-gradient(90deg,#3DA9F5 0%,#4ADE80 100%)",
                }}
              >
                Full Access
              </span>
            </div>

            <div className="relative">
              <p className="flex items-center gap-1.5">
                <span
                  className="bg-clip-text font-lato text-[30px] font-black leading-none tracking-normal text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgb(33,177,241) 20.69%, rgb(166,201,54) 151.72%)",
                  }}
                >
                  RM
                </span>
                <span
                  className="bg-clip-text font-lato text-[80px] font-extrabold leading-none text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgb(33,177,241) 20.69%, rgb(166,201,54) 151.72%)",
                  }}
                >
                  0
                </span>
              </p>
              <p className="mt-2 font-lato text-[13px] text-[#93A3B8]">
                No credit card required.
              </p>
            </div>

            <div className="relative h-px w-full bg-white/10" />

            <div className="relative">
              <p className="font-lato text-[13px] text-[#93A3B8]">
                Continue using V-Watch HRMS for only
              </p>
              <p className="mt-1 flex flex-wrap items-center gap-x-2">
                <span
                  className="bg-clip-text font-lato text-[30px] font-black leading-none tracking-normal text-transparent"
                 style={{
                  backgroundImage: "linear-gradient(180deg, rgb(33,177,241) 20.69%, rgb(166,201,54) 151.72%)",
            
                 }}
                >
                  RM
                </span>
                <span
                  className="bg-clip-text font-lato text-[80px] font-black leading-none tracking-normal text-transparent"
                 style={{
                  backgroundImage: "linear-gradient(180deg, rgb(33,177,241) 20.69%, rgb(166,201,54) 151.72%)",
            
                 }}
                >
                  5
                </span>
                <span className="font-lato text-[13px] text-[#DCE6F0]">
                  Per Subscribed Employee/ Month
                </span>
              </p>
              <span className="mt-2 inline-block rounded-full border border-white/15 px-2.5 py-1 font-lato text-[10px] font-bold uppercase tracking-[0.04em] text-[#93A3B8]">
                After Your Free Period
              </span>
              <p className="mt-2 font-lato text-[13px] leading-[19px] text-[#93A3B8]">
                You decide how many employee subscriptions your company
                requires.
              </p>
            </div>

            <div className="relative h-px w-full bg-white/10" />

            <div className="relative">
              <div className="mb-3">
                <SectionLabel>Simple Pricing Example</SectionLabel>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {PRICING_EXAMPLES.map((ex) => (
                  <div
                    key={ex.employees}
                    className="relative flex flex-col gap-2.5 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5"
                  >
                    {/* Each icon already bakes in its own circular badge
                        background (rx=12 on a 24x24 canvas) — no wrapping
                        span needed, same pattern as calendar.svg. */}
                    <Image
                      src={ex.icon}
                      alt=""
                      aria-hidden
                      width={24}
                      height={24}
                      unoptimized
                      className="absolute right-3 top-3 h-6 w-6"
                    />
                    <div>
                      <p className="font-lato text-[20px] font-bold text-white">
                        {ex.employees}
                      </p>
                      <p className="font-lato text-[13px] text-[#93A3B8]">
                        Employees
                      </p>
                    </div>
                    <div>
                      <p className="font-lato leading-tight">
                        <span
                          className="bg-clip-text text-[13px] font-semibold text-transparent"
                          style={{
                            backgroundImage:
                              "linear-gradient(180deg, rgb(33,177,241) 20.69%, rgb(166,201,54) 151.72%)",
                          }}
                        >
                          RM{" "}
                        </span>
                        <span
                          className="bg-clip-text text-[20px] font-extrabold text-transparent"
                          style={{
                            backgroundImage:
                              "linear-gradient(180deg, rgb(33,177,241) 20.69%, rgb(166,201,54) 151.72%)",
                          }}
                        >
                          {ex.price}
                        </span>
                      </p>
                      <p className="font-lato text-[12px] text-[#93A3B8]">
                        Per Month
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="relative text-center font-lato text-[12px] text-[#93A3B8]">
              There is no obligation to continue after the free period.
            </p>
          </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
