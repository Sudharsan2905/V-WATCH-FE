"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// How long each module stays in focus before auto-advancing (ms).
const AUTO_ADVANCE_MS = 3500;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE, delay: 0.2 } },
};

const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE, delay: 0.25 } },
};

type Module = {
  key: string;
  icon: string;
  iconBg: string;
  title: string;
  subtitle: string;
  bullets: string[];
  image: string;
};

// ── Data ──────────────────────────────────────────────────────────────────────

const MODULES: Module[] = [
  {
    key: "People & Workforce",
    icon: "/ai-platform/ai-platform-icons/people.svg",
    iconBg: "/ai-platform/ai-platform-icons/people-background.svg",
    title: "People & Workforce",
    subtitle: "Manage identities, access, attendance, and safety.",
    bullets: [
      "Facial recognition & access control",
      "Profile and credential management",
      "Attendance and workforce tracking",
      "Fatigue monitoring and safety compliance",
    ],
    image: "/ai-platform/connected-operation.svg",
  },
  {
    key: "Operations & Workflows",
    icon: "/ai-platform/ai-platform-icons/operations.svg",
    iconBg: "/ai-platform/ai-platform-icons/operations-background.svg",
    title: "Operations & Workflows",
    subtitle: "Run daily operations with structure and visibility.",
    bullets: [
      "Task and project management",
      "Service orders and maintenance workflows",
      "Scheduling and execution tracking",
      "Work program and site coordination",
    ],
    image: "/ai-platform/operations-worklows.svg",
  },
  {
    key: "Movement, Vehicles & Logistics",
    icon: "/ai-platform/ai-platform-icons/movement.svg",
    iconBg: "/ai-platform/ai-platform-icons/movement-background.svg",
    title: "Movement, Vehicles & Logistics",
    subtitle: "Track everything that moves — internally and externally.",
    bullets: [
      "Vehicle tracking and fleet management",
      "Delivery and logistics tracking",
      "Inventory and shipment visibility",
      "Global goods tracking across locations",
    ],
    image: "/ai-platform/movement-vehicle.svg",
  },
  {
    key: "Assets & Equipment",
    icon: "/ai-platform/ai-platform-icons/assets.svg",
    iconBg: "/ai-platform/ai-platform-icons/assest-background.svg",
    title: "Assets & Equipment",
    subtitle: "Maintain control over physical resources.",
    bullets: [
      "Asset tracking and utilisation",
      "Equipment monitoring and auditing",
      "Leasing and lifecycle management",
    ],
    image: "/ai-platform/assets-equipment.svg",
  },
  {
    key: "Safety & Compliance",
    icon: "/ai-platform/ai-platform-icons/safety.svg",
    iconBg: "/ai-platform/ai-platform-icons/safety-background.svg",
    title: "Safety & Compliance",
    subtitle: "Reduce risk and enforce operational standards.",
    bullets: [
      "Permit-to-work (PTW)",
      "Safety training and compliance tracking",
      "Real-time alerts and monitoring",
      "Incident and risk detection",
    ],
    image: "/ai-platform/safety-compliance.svg",
  },
  {
    key: "Productivity & Intelligence",
    icon: "/ai-platform/ai-platform-icons/productivity.svg",
    iconBg: "/ai-platform/ai-platform-icons/productivity-background.svg",
    title: "Productivity & Intelligence",
    subtitle: "Understand how your operations actually perform.",
    bullets: [
      "Manhour tracking and reporting",
      "Productivity insights",
      "BI dashboards and analytics",
      "Real-time operational reporting",
    ],
    image: "/ai-platform/productivity-intelligence.svg",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function ConnectedOperations() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = MODULES[active]!;

  // Advancing is driven by the progress bar: when the active segment finishes
  // filling, we move to the next module. The sequence stops once the last
  // (6th) box is reached — no looping back to the first.
  const goNext = () => setActive((prev) => Math.min(prev + 1, MODULES.length - 1));

  // The credits roll is locked to the active index so it stays in step with
  // the progress timeline. We translate the track to bring the active card to
  // the top of the viewport (leaving a small peek of the previous one).
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [trackY, setTrackY] = useState(0);

  useLayoutEffect(() => {
    const PEEK = 56;
    const measure = () => {
      const el = cardRefs.current[active];
      if (!el) return;
      setTrackY(active === 0 ? 0 : -(el.offsetTop - PEEK));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative px-6 pb-20 pt-16 lg:px-[60px]">
        <motion.div
          className="mx-auto w-full max-w-[1410px]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Header */}
          <motion.header variants={fadeUp} className="flex max-w-[807px] flex-col gap-2.5">
            <h2 className="text-[26px] font-black text-[#0A4B6E]">
              Everything your operations depend on connected
            </h2>
            <p className="text-[18px] font-normal leading-[26px] text-[#0A4B6E] lg:text-[20px]">
              A unified architecture designed to handle the complexity of modern
              enterprise environments without the clutter.
            </p>
          </motion.header>

          {/* Two-column panel */}
          <div
            className="mt-10 flex flex-col gap-[30px] lg:flex-row lg:items-start"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Left: image carousel + pagination dots */}
            <motion.div
              variants={slideFromLeft}
              className="mx-auto flex w-full flex-col items-center gap-4 md:max-w-[600px] lg:mx-0 lg:w-[600px] lg:shrink-0"
            >
              <div className="relative h-[320px] w-full overflow-hidden rounded-[24px] border border-[#B8E6FF]/60 bg-[#EDF5FC] shadow-[6px_10px_23px_rgba(217,226,255,0.85)] lg:h-[480px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.key}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.55, ease: EASE }}
                  >
                    <Image
                      src={current.image}
                      alt={current.title}
                      fill
                      sizes="600px"
                      className="object-cover object-center"
                      priority={active === 0}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Full-width segmented progress — each segment fills like a
                  timer, then advances to the next module. */}
              <style>{`@keyframes co-fill{from{width:0%}to{width:100%}}`}</style>
              <div className="flex w-full items-center gap-2">
                {MODULES.map((mod, i) => (
                  <button
                    key={mod.key}
                    type="button"
                    aria-label={`View ${mod.key}`}
                    onClick={() => setActive(i)}
                    className="relative h-[6px] flex-1 cursor-pointer overflow-hidden rounded-full bg-[#CDE9FA]"
                  >
                    {i < active && <span className="absolute inset-0 rounded-full bg-[#0A8EC8]" />}
                    {i === active && (
                      <span
                        key={active}
                        onAnimationEnd={goNext}
                        style={{
                          animation: `co-fill ${AUTO_ADVANCE_MS}ms linear forwards`,
                          animationPlayState: paused ? "paused" : "running",
                        }}
                        className="absolute inset-y-0 left-0 w-0 rounded-full bg-[#0A8EC8]"
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Right: fixed-height vertical roll, locked to the active index so
                it stays in step with the progress timeline. It scrolls from the
                first box to the last and stops there (no looping). Top/bottom
                mask gradients fade content in and out. */}
            <motion.div
              variants={slideFromRight}
              className="relative h-[420px] w-full overflow-hidden lg:h-[480px] lg:flex-1"
              style={{
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, #000 11%, #000 87%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, #000 11%, #000 87%, transparent 100%)",
              }}
            >
              <motion.div
                className="flex flex-col"
                animate={{ y: trackY }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                {MODULES.map((mod, i) => (
                  <article
                    key={mod.key}
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    className={`relative mb-4 flex min-h-[260px] shrink-0 flex-col justify-center overflow-hidden rounded-[20px] py-5 shadow-[0_12px_34px_rgba(217,226,255,0.5)] transition-all duration-300 ${
                      i === active
                        ? "bg-white opacity-100"
                        : "border-white/50 bg-white/40 opacity-60 backdrop-blur-md"
                    }`}
                  >
                    {/* Faded watermark icon (already low-opacity in the asset) */}
                    <div
                      className="pointer-events-none absolute right-6 lg:right-[80px] top-1/2 -translate-y-1/2"
                      aria-hidden
                    >
                      <Image
                        src={mod.iconBg}
                        alt=""
                        width={150}
                        height={150}
                        className="h-[150px] w-[150px] object-contain"
                      />
                    </div>

                    {/* Module header */}
                    <div className="relative flex items-center gap-4 px-5">
                      <span className="flex size-[46px] shrink-0 items-center justify-center rounded-[12px] border border-[#EAF3FB] bg-white shadow-[0_6px_16px_rgba(33,177,241,0.18)]">
                        <Image
                          src={mod.icon}
                          alt=""
                          width={28}
                          height={28}
                          className="h-[24px] w-[28px] object-contain"
                        />
                      </span>
                      <div className="flex flex-1 flex-col gap-0.5">
                        <p className="text-[17px] font-bold text-[#0A4B6E]">{mod.title}</p>
                        <p className="text-[14px] font-normal text-[#1391D4]">{mod.subtitle}</p>
                      </div>
                    </div>

                    {/* Bullets */}
                    <ul className="relative flex flex-col gap-2.5 px-5 pt-4 lg:ml-15">
                      {mod.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-center gap-3">
                          <Image
                            src="/ai-platform/bulletpoint.svg"
                            alt=""
                            width={22}
                            height={22}
                            className="shrink-0"
                          />
                          <span className="text-[15px] font-normal leading-[22px] text-[#0A4B6E]">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
