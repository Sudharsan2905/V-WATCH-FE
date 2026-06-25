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
 * Scalable glass-card outline with a left-edge notch for the icon.
 * Width/height come from a ResizeObserver, so the shape (and notch) stay
 * aligned and centred at any size — fully responsive. The notch is kept at
 * fixed pixel coords + fixed height so it always frames the 100px icon.
 */
function computeCardPath(W: number, H: number, compact = false): string {
  // Desktop/laptop values unchanged; compact (tablet/mobile) shrinks the notch
  // so the icon doesn't eat the narrow content width.
  const OL = compact ? 12 : 18; // left wall x (the notch sits here)
  const OCR = compact ? 14 : 16; // outer corner radius
  const PD = compact ? 92 : 130; // notch right-edge x (clears the icon)
  const PR = compact ? 14 : 18; // notch corner radius
  const PH = compact ? 80 : 116; // notch height (frames the icon)
  const cy = H / 2;
  const pt = cy - PH / 2;
  const pb = cy + PH / 2;
  const GAP = 18;
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
  const opacity = isActive ? 1 : diff === 1 ? 0.42 : 0.16;
  const containerRef = useRef<HTMLDivElement>(null);
  const [clipPath, setClipPath] = useState(`path('${computeCardPath(560, 220)}')`);
  // usePng: card is wide enough for the bg_card.png to look right and contain
  // the inner card. Narrower/taller cards fall back to the scalable CSS glass,
  // which always wraps the content. Toggle is driven by the card width itself.
  const [usePng, setUsePng] = useState(true);
  const compact = !usePng;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const { width: W, height: H } = el.getBoundingClientRect();
      if (W > 0 && H > 0) {
        const png = W >= 580;
        setUsePng(png);
        setClipPath(`path('${computeCardPath(W, H, !png)}')`);
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={stepRef} data-step className={!isLast ? "pb-4 lg:pb-5" : ""}>
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
        className="relative mx-auto flex w-full max-w-[636px] items-center"
        // Lock to the bg_card.png aspect (660×380) so the measured glass/notch
        // percentages below map exactly to the artwork. Box still grows if the
        // content is taller (aspect-ratio yields to content in the block axis).
        style={{ aspectRatio: usePng ? "66 / 38" : undefined }}
      >
        {usePng ? (
          /* ① BASE (wide cards) — bg_card.png glass shape. The container's
             locked 66/38 aspect matches the artwork exactly, so object-cover
             never crops horizontally and the measured notch/glass percentages
             line up; the inner card stays centred inside the glass. */
          <Image
            src="/contractor-complaince/bg_card.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 678px, 100vw"
            className="pointer-events-none select-none object-cover"
          />
        ) : (
          /* ① BASE (narrow/tall cards) — scalable CSS glass card with the icon
             notch. The clip-path recomputes with size, so the glass always
             wraps the content (the PNG can't at narrow/tall aspects). */
          <div
            className="absolute inset-0"
            style={{
              clipPath,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.60) 0%, rgba(212,240,255,0.24) 100%) padding-box, " +
                "linear-gradient(180deg, #FFFFFF, #EFF9FF) border-box",
              border: "2px solid transparent",
              boxShadow:
                "0px 13px 24px rgba(92,183,232,0.22), 6px 10px 30px rgba(245,248,255,0.40)",
            }}
          />
        )}

        {/* ② CONTENT AREA — clears the notch on the left, then centres the
            inner card in the remaining space (vertically + horizontally). */}
        <div
          className="relative z-10 flex flex-1 items-center justify-center py-[18px] sm:py-[22px]"
          style={{
            // Measured from bg_card.png (660×380): notch right wall 16.8%, glass
            // right edge 93.3%. With the 84px icon nested in the notch (right edge
            // ~18%), padL 24% leaves a clean ~36px gap after the icon, and padR
            // 13% keeps a ~40px gap before the glass right edge. Scales w/ width.
            paddingLeft: compact ? 116 : "24%",
            paddingRight: compact ? 24 : "13%",
          }}
        >
          {/* INNER CARD — width capped + centred on desktop/laptop; fills on
              tablet/mobile. Content drives the height. */}
          <div
            className="flex w-full flex-col gap-[14px] rounded-3xl p-4"
            style={{
              border: "1px solid transparent",
              background:
                "linear-gradient(rgba(255,255,255,0.80), rgba(255,255,255,0.80)) padding-box, " +
                "linear-gradient(180deg, #E4F6FD 0%, #D7F4FD 100%) border-box",
            }}
          >
          {/* Number badge (46×32) + dashed connector */}
          <div className="flex items-center gap-3.5">
            <span
              className="flex h-[32px] w-[46px] items-center justify-center rounded-[14px] text-[14px] font-bold tabular-nums text-[#006F9F]"
              style={{
                border: "2px solid transparent",
                background:
                  "linear-gradient(rgba(244,251,255,0.20), rgba(244,251,255,0.20)) padding-box, " +
                  "linear-gradient(180deg, #FFFFFF 0%, #EFF9FF 100%) border-box",
              }}
            >
              {step.number}
            </span>
            <div className="h-px flex-1 border-t-2 border-dashed border-[#C1E8FF]" />
          </div>

          {/* Title — Lato 700, 20/24, #006F9F */}
          <h3 className="text-[20px] font-bold leading-6 text-[#006F9F]">
            {step.title}
          </h3>

          {/* Description — Lato 400, 18/24, #1D6C97 */}
          <p className="text-[18px] font-normal leading-6 text-[#1D6C97]">
            {step.description}
          </p>

          {step.bullets && step.bullets.length > 0 && (
            <ul className="space-y-1.5">
              {step.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 text-[16px] leading-5 text-[#1D6C97]"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#006F9F]" />
                  {b}
                </li>
              ))}
            </ul>
          )}
          </div>
        </div>

        {/* ③ ICON BOX — nestled in the notch, vertically centred. Shrinks on
            tablet/mobile (compact) so it fits the narrower card. */}
        <div
          className="absolute top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-2xl"
          style={{
            // The PNG's notch cutout is only ~68px wide (measured: x=40→111 in
            // the 660px art). Size the icon to ~84px so it nests in the notch
            // without its right edge spilling into / overlapping the inner card.
            // Centre on the notch opening (~11.45% of width), offset by half.
            left: compact ? 12 : "calc(11.45% - 42px)",
            width: compact ? 68 : 84,
            height: compact ? 68 : 84,
            background: "#E8F4FB",
            backgroundImage:
              "linear-gradient(rgba(10,140,200,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(10,140,200,0.08) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
            border: "2px solid rgba(255,255,255,0.90)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.40), 0 0 12px rgba(255,255,255,0.70), 0 4px 16px rgba(10,78,110,0.12)",
          }}
        >
          <Image
            src={step.icon}
            alt=""
            width={64}
            height={64}
            className={`object-contain ${compact ? "h-11 w-11" : "h-13 w-13"}`}
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
          <h2 className="text-[20px] md:text-[26px] font-bold leading-8.5 text-[#0A4B6E] sm:leading-9.5">
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
              className="sticky top-14 mx-auto h-70 w-full max-w-[504px] overflow-hidden rounded-[20px] sm:h-90 lg:mx-0 lg:flex-1 lg:top-22 lg:h-110"
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
              className="mx-auto h-70 w-full max-w-[656px] overflow-y-auto sm:h-90 lg:mx-0 lg:flex-1 lg:h-110"
              style={{ scrollbarWidth: "none" }}
            >
              <div className="px-2">
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
