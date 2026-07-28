"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay },
  }),
};

const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

const dotPop: Variants = {
  hidden: { opacity: 0, scale: 0 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE, delay: 0.15 } },
};

const STEPS = [
  {
    num: "01",
    title: "Issue Identification",
    body: "Maintenance requests are logged manually or triggered through system alerts.",
    icon: "/maintenance/step-1.svg",
  },
  {
    num: "02",
    title: "Task Creation & Assignment",
    body: "Service orders are created and assigned based on priority, location, and expertise.",
    icon: "/maintenance/step-2.svg",
  },
  {
    num: "03",
    title: "Execution & Updates",
    body: "Assigned personnel update progress, upload notes, and record actions taken.",
    icon: "/maintenance/step-3.svg",
  },
  {
    num: "04",
    title: "Verification & Closure",
    body: "Completed work is verified before the request is closed ensuring quality and accountability.",
    icon: "/maintenance/step-4.svg",
  },
];

function IconBadge({ icon }: Readonly<{ icon: string }>) {
  return (
    <div
      className="flex size-[58px] shrink-0 items-center justify-center rounded-[14px]"
      style={{
        background: "rgba(58,175,212,0.12)",
        border: "1px solid rgba(58,175,212,0.25)",
      }}
    >
      <Image
        src={icon}
        alt=""
        width={34}
        height={34}
        unoptimized
        style={{ transform: "scale(2.4) translateX(4px) translateY(5.7px)" }}
      />
    </div>
  );
}

function StepContent({ step, flip = false }: Readonly<{ step: typeof STEPS[number]; flip?: boolean }>) {
  const gradientDir = flip ? "225deg" : "135deg";
  return (
    <div className={`relative max-w-[300px] rounded-[16px] px-5 py-4 ${flip ? "text-right" : "text-left"}`}>
      {/* Card background — invisible by default, fades in when parent row is hovered */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[16px] opacity-0 transition-all duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(${flip ? "270deg" : "90deg"}, rgba(30,77,123,0.5) 0%, rgba(20,50,90,0.6) 30%, rgba(10,22,50,0.82) 60%, rgba(10,22,50,0.82) 100%) padding-box, linear-gradient(${gradientDir}, rgba(126,207,250,0.20) 0%, rgba(239,249,255,0.08) 40%, rgba(239,249,255,0) 55%) border-box`,
          border: "1.5px solid transparent",
          boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
        }}
      />
      <p className="relative font-['Lato'] text-[18px] font-bold leading-[100%] tracking-[-0.04px] text-white">{step.title}</p>
      <p className="relative mt-2 font-['Lato'] text-[16px] font-normal leading-[24px] tracking-normal text-white">{step.body}</p>
    </div>
  );
}

// Matches WorkflowSection / FeatureGrid above: with Lenis smoothing the
// scroll, a low `amount` fires the reveal before the panel is really on screen.
const VIEWPORT = {
  once: true,
  amount: 0.5,
  margin: "0px 0px -120px 0px",
} as const;

export default function StepProcess() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="px-3 pb-16 pt-2 sm:px-6 lg:px-[60px]">
        <div className="relative mx-auto w-full max-w-[1410px] overflow-hidden rounded-[28px] border border-[#1E4D7B]/40 bg-[linear-gradient(120deg,#0B1E3A_0%,#0A1730_55%,#081124_100%)] px-4 py-10 sm:px-8 shadow-[0_4px_14px_0_rgba(56,144,192,0.40)]">
          {/* Grid pattern — same technique as ai-platform ThreePillars */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
              `,
              backgroundSize: "32px 32px",
              maskImage: "linear-gradient(to bottom, black 20%, transparent 50%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 20%, transparent 50%)",
            }}
          />

          <div className="relative z-10">
            {/* Title with decorative lines */}
            <div className="mb-10 flex items-center justify-center gap-0">
              {/* Left line + dot */}
              <div
                className="h-[2px] w-full max-w-[200px]"
                style={{
                  background: "linear-gradient(to right, rgba(9,25,51,0) 0%, rgba(137,192,222,1) 100%)",
                }}
              />
              <div className="size-[7px] shrink-0 rounded-full bg-[rgba(137,192,222,1)]" />

              <h2 className="whitespace-nowrap px-4 text-[18px] font-bold text-white sm:text-[22px]">
                Simple, Step by Step Process
              </h2>

              {/* Right dot + line */}
              <div className="size-[7px] shrink-0 rounded-full bg-[rgba(137,192,222,1)]" />
              <div
                className="h-[2px] w-full max-w-[200px]"
                style={{
                  background: "linear-gradient(to left, rgba(9,25,51,0) 0%, rgba(137,192,222,1) 100%)",
                }}
              />
            </div>

            {/* Mobile: vertical stack */}
            <div className="flex flex-col gap-5 lg:hidden">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={VIEWPORT}
                  custom={i * 0.1}
                  className="flex items-start gap-4 rounded-[16px] p-4"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(58,175,212,0.18)" }}
                >
                  <span className="shrink-0 text-[40px] font-black leading-none text-[#3AAFD4]">{step.num}</span>
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <IconBadge icon={step.icon} />
                      <p className="min-w-0 flex-1 font-['Lato'] text-[15px] font-bold text-white">{step.title}</p>
                    </div>
                    <p className="font-['Lato'] text-[13px] leading-[21px] text-white">{step.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop: zigzag with centre line */}
            <div className="relative hidden lg:block">
              <div className="flex flex-col">
                {STEPS.map((step, i) => {
                  const isLeft = i % 2 === 0;
                  const isLast = i === STEPS.length - 1;
                  return (
                    <motion.div
                      key={step.num}
                      initial="hidden"
                      whileInView="show"
                      viewport={VIEWPORT}
                      className={`group relative flex min-h-[140px] ${isLast ? "items-start" : "items-center"}`}
                    >
                      {/* Centre dot — white bg, blue border, 7px padding, blue inner dot */}
                      <motion.div
                        variants={dotPop}
                        aria-hidden
                        className={`absolute left-1/2 z-10 flex -translate-x-1/2 items-center justify-center rounded-full bg-white ${isLast ? "top-12" : "top-1/2 -translate-y-1/2"}`}
                        style={{
                          width: 20,
                          height: 20,
                          border: "1.11px solid rgba(56, 144, 192, 1)",
                          padding: 7,
                        }}
                      >
                        <div className="size-full rounded-full bg-[rgba(56,144,192,1)]" />
                      </motion.div>

                      {/* Left cell */}
                      <motion.div variants={slideFromLeft} className="flex w-1/2 justify-end pr-14">
                        {isLeft ? (
                          <div className="flex items-center gap-5">
                            <span className="select-none font-black leading-none text-[#3AAFD4]" style={{ fontSize: 100 }} aria-hidden>
                              {step.num}
                            </span>
                            <IconBadge icon={step.icon} />
                          </div>
                        ) : (
                          <StepContent step={step} flip />
                        )}
                      </motion.div>

                      {/* Right cell */}
                      <motion.div variants={slideFromRight} className="flex w-1/2 justify-start pl-14">
                        {isLeft ? (
                          <StepContent step={step} />
                        ) : (
                          <div className="flex items-center gap-5">
                            <IconBadge icon={step.icon} />
                            <span className="select-none font-black leading-none text-[#3AAFD4]" style={{ fontSize: 100 }} aria-hidden>
                              {step.num}
                            </span>
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Centre vertical line — 6px wide, 40px radius, 4px padding */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-0 bottom-14 w-[6px] -translate-x-1/2 rounded-[40px] p-[4px]"
                style={{
                  background: "rgba(184, 230, 255, 1)",
                  boxShadow: "0 0 12px rgba(184,230,255,0.5), 0 0 24px rgba(184,230,255,0.2)",
                }}
              >
                <div className="h-full w-full rounded-[40px] bg-[#0A1730]" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
