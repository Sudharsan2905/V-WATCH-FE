"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
};

const STEPS: {
  number: string;
  icon: string;
  title: string;
  description: string;
  bullets?: string[];
}[] = [
  {
    number: "01",
    icon: "/contractor-complaince/icons/01.svg",
    title: "Register Contractor Profiles",
    description:
      "All workers are registered with their identity, employer, certifications, and safety requirements.",
  },
  {
    number: "02",
    icon: "/contractor-complaince/icons/02.svg",
    title: "Track Certifications & Expiry",
    description:
      "Safety passes, training records, and certifications are continuously monitored with expiry dates tracked automatically.",
  },
  {
    number: "03",
    icon: "/contractor-complaince/icons/03.svg",
    title: "Enforce Access Based on Compliance",
    description:
      "Only workers with valid certifications are granted access — expired or non-compliant individuals are automatically restricted.",
  },
  {
    number: "04",
    icon: "/contractor-complaince/icons/04.svg",
    title: "Monitor & Alert in Real Time",
    description: "Receive alerts for",
    bullets: [
      "Upcoming expiry",
      "Expired certifications",
      "Non-compliant personnel attempting entry",
    ],
  },
  {
    number: "05",
    icon: "/contractor-complaince/icons/05.svg",
    title: "Maintain Full Audit Records",
    description:
      "All compliance data is logged and available for audits, inspections, and reporting.",
  },
];

const AUTO_ADVANCE_MS = 3500;
// Container height in px (matches lg:h-110 = 520px)
const PANEL_H = 440;

/** Absolute Y position of an element inside a scroll container */
function getOffsetTop(el: HTMLElement, container: HTMLElement): number {
  return (
    el.getBoundingClientRect().top -
    container.getBoundingClientRect().top +
    container.scrollTop
  );
}

/**
 * S-curve notch shape based on the user's CustomCard reference (530×240).
 * The pocket (icon slot) is kept at fixed pixel coordinates so the icon
 * and text card left-edge are always aligned regardless of card width.
 *
 * Pocket: x=20→135 (fixed depth), vertically centred, 80 px tall.
 */
function computeCardPath(W: number, H: number): string {
  const OL  = 20;   // outer left wall x
  const OCR = 10;   // outer corner radius
  const PD  = 135;  // pocket right-edge x (fixed)
  const PR  = 15;   // pocket corner radius
  const cy  = H / 2;
  const PH  = Math.max(120, H - 56); // pocket scales with card; 28 px margin each side
  const pt  = cy - PH / 2;   // pocket top y
  const pb  = cy + PH / 2;   // pocket bottom y
  const GAP = 20;   // left-wall length above/below pocket

  const f = (n: number) => +n.toFixed(2);
  const p = (x: number, y: number) => `${f(x)} ${f(y)}`;

  return (
    `M ${p(OL + OCR, 0)} Q ${p(OL, 0)} ${p(OL, OCR)} ` +
    `L ${p(OL, Math.max(OCR + 1, pt - GAP))} ` +
    `Q ${p(OL, pt)} ${p(OL + PR, pt)} ` +
    `L ${p(PD - PR, pt)} Q ${p(PD, pt)} ${p(PD, pt + PR)} ` +
    `L ${p(PD, pb - PR)} Q ${p(PD, pb)} ${p(PD - PR, pb)} ` +
    `L ${p(OL + PR, pb)} Q ${p(OL, pb)} ${p(OL, Math.min(H - OCR - 1, pb + GAP))} ` +
    `L ${p(OL, H - OCR)} Q ${p(OL, H)} ${p(OL + OCR, H)} ` +
    `L ${p(W - OCR, H)} Q ${p(W, H)} ${p(W, H - OCR)} ` +
    `L ${p(W, OCR)} Q ${p(W, 0)} ${p(W - OCR, 0)} Z`
  );
}

function StepItem({
  step,
  diff,
  isLast,
  stepRef,
}: {
  step: (typeof STEPS)[number];
  diff: number;
  isLast: boolean;
  stepRef: (el: HTMLDivElement | null) => void;
}) {
  const isActive = diff === 0;
  const opacity  = isActive ? 1 : diff === 1 ? 0.42 : 0.16;
  const containerRef = useRef<HTMLDivElement>(null);
  const [clipPath, setClipPath] = useState(
    `path('${computeCardPath(530, 200)}')`
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const { width: W, height: H } = el.getBoundingClientRect();
      if (W > 0 && H > 0) setClipPath(`path('${computeCardPath(W, H)}')`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={stepRef}
      data-step
      className={!isLast ? "pb-4 lg:pb-5" : ""}
    >
      <motion.div
        ref={containerRef}
        animate={{
          opacity,
          y: isActive ? 0 : 8,
          scale: isActive ? 1 : 0.975,
          filter: isActive
            ? "drop-shadow(0 0 1.5px rgba(92,183,232,0.75)) drop-shadow(0 8px 24px rgba(92,183,232,0.18))"
            : "drop-shadow(0 0 1px rgba(148,210,240,0.55))",
        }}
        transition={{ duration: 0.45, ease: EASE }}
        className="relative"
      >
        {/* ① BASE — full-bleed background with clip-path */}
        <div
          className="absolute inset-0"
          style={{
            clipPath,
            /* Fill: #FFFFFF 60% → #D4F0FF 24% | Border: #FFFFFF → #EFF9FF */
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.60) 0%, rgba(212,240,255,0.24) 100%) padding-box, " +
              "linear-gradient(180deg, #FFFFFF, #EFF9FF) border-box",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "2px solid transparent",
            /* Shadow 1: #5CB7E8 24% | Shadow 2: #F5F8FF 40% */
            boxShadow:
              "0px 13px 24px rgba(92,183,232,0.24), " +
              "6px 10px 30px rgba(245,248,255,0.40)",
          }}
        />

        {/* ② TEXT CARD — drives the container height; left margin clears the pocket */}
        <div
          className="relative z-10 rounded-2xl p-4"
          style={{
            marginLeft: 140,
            marginRight: 16,
            marginTop: 28,
            marginBottom: 28,
            background: "rgba(255,255,255,0.92)",
            boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
          }}
        >
          <div className="mb-2.5 flex items-center gap-2">
            <span className="text-[12px] font-bold tabular-nums text-[#0A8EC8]">
              {step.number}
            </span>
            <div className="h-px flex-1 border-t-2 border-dashed border-[#C1E8FF]" />
          </div>
          <h3 className="text-[15px] font-bold text-[#0A4B6E] sm:text-[17px]">
            {step.title}
          </h3>
          <p className="mt-1.5 text-[13px] leading-5.5 text-navy-700 sm:text-[14px] sm:leading-6">
            {step.description}
          </p>
          {step.bullets && step.bullets.length > 0 && (
            <ul className="mt-2.5 space-y-1.5">
              {step.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 text-[13px] leading-5 text-navy-700 sm:text-[14px]"
                >
                  <span className="mt-1.25 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0A8EC8]" />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ③ ICON CARD — sits in the pocket (x=20→135), vertically centred */}
        <div
          className="absolute z-20 flex items-center justify-center rounded-2xl"
          style={{
            left: 22,
            top: "50%",
            transform: "translateY(-50%)",
            width: 96,
            height: 96,
            background: "#E8F4FB",
            backgroundImage:
              "linear-gradient(rgba(10,140,200,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(10,140,200,0.08) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
            border: "2px solid rgba(255,255,255,0.90)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.40), " +
              "0 0 12px rgba(255,255,255,0.70), " +
              "0 4px 16px rgba(10,78,110,0.12)",
          }}
        >
          <Image
            src={step.icon}
            alt=""
            width={64}
            height={64}
            className="h-16 w-16 object-contain"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function HowItWorks() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const userPaused = useRef(false);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeStepRef = useRef(0);
  const [activeStep, setActiveStep] = useState(0);

  const scrollToStep = useCallback((index: number) => {
    const el = stepRefs.current[index];
    const container = scrollRef.current;
    if (!el || !container) return;
    const top =
      index === STEPS.length - 1
        ? container.scrollHeight
        : Math.max(0, getOffsetTop(el, container) - 20);
    container.scrollTo({ top, behavior: "smooth" });
    activeStepRef.current = index;
    setActiveStep(index);
  }, []);

  // Auto-advance every AUTO_ADVANCE_MS unless user is interacting
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (userPaused.current) return;
      const next = (activeStepRef.current + 1) % STEPS.length;
      scrollToStep(next);
    }, AUTO_ADVANCE_MS);
  }, [scrollToStep]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  function handleScroll() {
    // Pause auto-advance while user scrolls; resume 2.5s after they stop
    userPaused.current = true;
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => {
      userPaused.current = false;
    }, 2500);

    const container = scrollRef.current;
    if (!container) return;

    // At bottom of scroll → last step always becomes active
    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 40) {
      setActiveStep(STEPS.length - 1);
      return;
    }

    // Otherwise find which step is closest to the top of the visible panel
    const scrollTop = container.scrollTop;
    let closest = 0;
    let minDist = Infinity;
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const elTop = getOffsetTop(el, container);
      const dist = Math.abs(elTop - scrollTop);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setActiveStep(closest);
  }

  return (
    <MotionConfig reducedMotion="user">
      <section
        className="relative overflow-hidden px-6 py-10 lg:px-15 lg:py-16"
        style={{
          backgroundColor: "white",
          backgroundImage: "url('/contractor-complaince/bg-wave.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundBlendMode: "exclusion",
        }}
      >
        {/* Top gradient — fades bg-wave into the section above */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-28"
          style={{
            background: "linear-gradient(to bottom, #EDF7FF 0%, transparent 100%)",
          }}
        />

        <div className="relative mx-auto max-w-[1280px] w-full">
          {/* Heading — always rendered visible (no scroll-triggered reveal,
              which could strand it hidden on fast scroll / observer timing) */}
          <h2 className="text-[24px] font-bold leading-8.5 text-[#0A4B6E] sm:text-[28px] sm:leading-9.5">
            How contractor compliance and safety pass control works
          </h2>

          {/* Two-column layout — both columns locked to the same height on desktop */}
          <div className="mt-6 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-start lg:gap-12">
            {/* LEFT: sticky image */}
            <motion.div
              variants={slideLeft}
              custom={0.15}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="sticky top-14 h-70 overflow-hidden rounded-[20px] sm:h-90 lg:flex-1 lg:top-22 lg:h-110"
            >
              <Image
                src="/contractor-complaince/safety.webp"
                alt="Contractor site compliance workflow"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[20px]"
                style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.18)" }}
              />
            </motion.div>

            {/* RIGHT: scrollable panel — height matches image at every breakpoint */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="h-70 overflow-y-auto sm:h-90 lg:flex-1 lg:h-110"
              style={{ scrollbarWidth: "none" }}
            >
              <div className="pr-1">
                {STEPS.map((step, i) => (
                  <StepItem
                    key={step.number}
                    step={step}
                    diff={i - activeStep}
                    isLast={i === STEPS.length - 1}
                    stepRef={(el) => {
                      stepRefs.current[i] = el;
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
