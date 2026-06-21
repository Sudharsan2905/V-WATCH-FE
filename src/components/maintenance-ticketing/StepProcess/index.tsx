"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  AnimatePresence,
  motion,
  MotionConfig,
  useMotionValue,
  useScroll,
  useMotionValueEvent,
  useTransform,
  type Variants,
} from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Whole-card scroll-in entrance.
const cardReveal: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

// ─── Step data ────────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: "01",
    title: "Issue Identification",
    body: "Maintenance requests are logged manually or triggered through system alerts.",
    image: "/maintenance/process-step-1.webp",
  },
  {
    num: "02",
    title: "Task Creation & Assignment",
    body: "Service orders are created and assigned based on priority, location, and expertise.",
    image: "/maintenance/process-step-2.webp",
  },
  {
    num: "03",
    title: "Execution & Updates",
    body: "Assigned personnel update progress, upload notes, and record actions taken.",
    image: "/maintenance/process-step-3.webp",
  },
  {
    num: "04",
    title: "Verification & Closure",
    body: "Completed work is verified before the request is closed ensuring quality and accountability.",
    image: "/maintenance/process-step-4.webp",
  },
];

const ARC_CX = -30;
const ARC_CY = 150;
const ARC_R = 146; // on the bright part of the crescent band so dots sit on the line
const NODE_CENTER_ANGLE = 0; // active node at the card's vertical centre (step 1 dots below, step 4 above — exact mirrors)
const NODE_ANGLE_STEP = 25; // degrees between consecutive nodes along the arc
// Radius (viewBox units ≈ 24/20/16/12px) by distance from the active node.
const NODE_RADII = [10.4, 8.7, 7, 5.2];

const STEP_THRESHOLDS = [0.25, 0.5, 0.75];

function NodeCircle({ angleDeg, radius }: Readonly<{ angleDeg: number; radius: number }>) {
  const angle = useMotionValue(angleDeg);
  useEffect(() => {
    const controls = animate(angle, angleDeg, { duration: 0.6, ease: EASE });
    return () => controls.stop();
  }, [angleDeg, angle]);
  const cx = useTransform(angle, (degrees) => ARC_CX + ARC_R * Math.cos((degrees * Math.PI) / 180));
  const cy = useTransform(angle, (degrees) => ARC_CY + ARC_R * Math.sin((degrees * Math.PI) / 180));
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      fill="white"
      animate={{ r: radius }}
      transition={{ duration: 0.6, ease: EASE }}
    />
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

// True below the lg breakpoint (1024px); defaults to false so SSR matches desktop, then corrects after mount.
function useBelowLg() {
  const [below, setBelow] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 1023px)");
    const update = () => setBelow(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return below;
}

function progressToStep(progress: number) {
  const clamped = Math.min(1, Math.max(0, progress));
  return STEP_THRESHOLDS.filter((threshold) => clamped >= threshold).length;
}

// Below lg: the card pins while the user scrolls through the steps, then releases (scroll-jacking, mobile/tablet only).
function PinnedSteps({
  active,
  setActive,
}: Readonly<{ active: number; setActive: (index: number) => void }>) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setActive(progressToStep(progress));
  });
  return (
    <div ref={trackRef} className="relative h-[200vh]">
      <div className="sticky top-[76px] px-6 pb-10">
        <StepCard active={active} />
      </div>
    </div>
  );
}

// lg and up: the card stays in normal flow; steps advance from its scroll position.
function FlowSteps({
  active,
  setActive,
}: Readonly<{ active: number; setActive: (index: number) => void }>) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["end end", "start start"],
  });
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setActive(progressToStep(progress));
  });
  return (
    <section ref={sectionRef} className="px-6 pb-16 pt-2 lg:px-[60px]">
      <StepCard active={active} />
    </section>
  );
}

export default function StepProcess() {
  const [active, setActive] = useState(0);
  const belowLg = useBelowLg();
  return (
    <MotionConfig reducedMotion="user">
      {belowLg ? (
        <PinnedSteps active={active} setActive={setActive} />
      ) : (
        <FlowSteps active={active} setActive={setActive} />
      )}
    </MotionConfig>
  );
}

// The visual card shared by both layouts; `active` drives the arc, copy and progress dots.
function StepCard({ active }: Readonly<{ active: number }>) {
  const step = STEPS[active];
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={cardReveal}
      className="relative mx-auto w-full max-w-[1410px] overflow-hidden rounded-[28px] border border-[#1E4D7B]/40 bg-[linear-gradient(120deg,#0B1E3A_0%,#0A1730_55%,#081124_100%)] shadow-[0_4px_14px_0_rgba(56,144,192,0.40),0_4px_14px_0_rgba(0,45,69,0.10)] lg:h-[345px]"
    >
      {/* Illustration: top banner on mobile, full-cover backdrop on desktop */}
      <div className="relative h-[260px] w-full lg:absolute lg:inset-0 lg:h-full">
        <AnimatePresence>
          <motion.div
            key={step.image}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Image
              src={step.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 1410px, 100vw"
              className="object-cover object-right"
            />
          </motion.div>
        </AnimatePresence>
        {/* Left-to-right scrim keeps the copy legible over the artwork (desktop) */}
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,#081124_0%,#081124_28%,rgba(8,17,36,0.85)_45%,rgba(8,17,36,0)_70%)] lg:block" />
      </div>

      {/* Half-circle arc (saved SVG, stretched) + animated progress dots overlay */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden h-full w-[155px] lg:block">
        <Image src="/maintenance/step-arc.svg" alt="" fill aria-hidden="true" className="object-fill" />
        <svg
          viewBox="0 0 135 300"
          fill="none"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          {STEPS.map((stepItem, index) => (
            <NodeCircle
              key={stepItem.num}
              angleDeg={NODE_CENTER_ANGLE + (index - active) * NODE_ANGLE_STEP}
              radius={NODE_RADII[Math.min(NODE_RADII.length - 1, Math.abs(index - active))]}
            />
          ))}
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pb-8 pt-7 lg:max-w-[66%] lg:py-[56px] lg:pl-[175px] lg:pr-[40px]">
        {/* Heading + underline */}
        <h2 className="text-[20px] font-bold text-white sm:text-[24px]">
          Simple, Step by Step Process
        </h2>
        <div className="mt-3 h-[8px] w-[321px] max-w-full rounded-[1111px] bg-[linear-gradient(90deg,#C1ECFF_0%,#11214C_100%)] opacity-[0.16]" />

        {/* Active step copy */}
        <div className="relative mt-8 min-h-[150px] lg:mt-10 lg:min-h-[120px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="flex items-start gap-5"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <span className="font-lato text-[44px] font-bold leading-normal text-[#EFF9FF] sm:text-[62px]">
                {step.num}
              </span>
              <div className="flex flex-col gap-2 pt-1">
                <h3 className="text-[22px] font-bold text-white sm:text-[26px] lg:whitespace-nowrap">
                  {step.title}
                </h3>
                <p className="max-w-[480px] text-[15px] leading-[24px] text-white/70 sm:text-[16px]">
                  {step.body}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center gap-2 lg:hidden" aria-hidden>
          {STEPS.map((stepItem, index) => (
            <span
              key={stepItem.num}
              className={`h-[8px] rounded-full transition-all duration-300 ${
                index === active ? "w-[24px] bg-white" : "w-[8px] bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
