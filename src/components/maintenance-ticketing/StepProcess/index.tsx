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
const NODE_CENTER_ANGLE = 0; // degrees: active node at the card's vertical centre, so
// step 1 (dots below) and step 4 (dots above) are exact vertical mirrors.
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

// True below the lg breakpoint (1024px) on the client. Defaults to false so SSR and
// first paint match the desktop layout, then corrects after mount.
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

// Below lg: the card pins while the user scrolls through the steps, then releases so
// the next section follows right below (scroll-jacking, mobile/tablet only).
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
        <StepCard active={active} setActive={setActive} />
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
      <StepCard active={active} setActive={setActive} />
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

// The visual card, shared by both layouts. `active` drives the arc + copy; the
// mobile dots call `setActive`.
function StepCard({
  active,
  setActive,
}: Readonly<{ active: number; setActive: (index: number) => void }>) {
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

      <svg
        viewBox="0 0 135 300"
        fill="none"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden h-full w-[155px] lg:block"
        aria-hidden
      >
        <defs>
          <filter
            id="arcInner"
            x="-101.002"
            y="-1"
            width="221.096"
            height="301"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dx="-1" dy="-1" />
            <feGaussianBlur stdDeviation="4" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.359514 0 0 0 0 0.75708 0 0 0 0 0.971154 0 0 0 0.6 0" />
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
          </filter>
          <linearGradient id="arcFill" x1="113.592" y1="150.5" x2="-60.4082" y2="170.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0E8CD0" />
            <stop offset="1" stopColor="#003C5C" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* The Figma half-circle */}
        <g filter="url(#arcInner)">
          <path
            d="M-29.9062 0C52.9365 0 120.094 67.1573 120.094 150C120.094 232.843 52.9365 300 -29.9062 300C-55.227 300 -79.0816 293.725 -100.002 282.646C-80.5374 292.474 -58.6025 298 -35.3984 298C44.959 298 110.102 231.738 110.102 150C110.102 68.2619 44.959 2 -35.3984 2C-58.6023 2 -80.5374 7.52528 -100.002 17.3525C-79.0817 6.27459 -55.2268 0 -29.9062 0Z"
            fill="url(#arcFill)"
          />
        </g>

        {STEPS.map((stepItem, index) => (
          <NodeCircle
            key={stepItem.num}
            angleDeg={NODE_CENTER_ANGLE + (index - active) * NODE_ANGLE_STEP}
            radius={NODE_RADII[Math.min(NODE_RADII.length - 1, Math.abs(index - active))]}
          />
        ))}
      </svg>

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

        {/* Horizontal dots (mobile) */}
        <div className="mt-8 flex items-center gap-2 lg:hidden">
          {STEPS.map((stepItem, index) => (
            <button
              key={stepItem.num}
              type="button"
              aria-label={`Go to step ${index + 1}`}
              onClick={() => setActive(index)}
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
