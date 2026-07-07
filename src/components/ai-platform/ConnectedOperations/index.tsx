"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const AUTO_ADVANCE_MS = 1800;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE, delay: 0.2 },
  },
};

const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE, delay: 0.25 },
  },
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
    image: "/ai-platform/connected-operation.webp",
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
    image: "/ai-platform/operations-worklows.webp",
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
    image: "/ai-platform/movement-vehicle.webp",
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
    image: "/ai-platform/assets-equipment.webp",
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
    image: "/ai-platform/safety-compliance.webp",
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
    image: "/ai-platform/productivity-intelligence.webp",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function ConnectedOperations() {
  const [active, setActive] = useState(0);

  // Refs that the RAF loop reads without triggering re-renders
  const activeRef = useRef(active);
  // The RAF loop writes the active segment's fill percentage to this CSS var on
  // the panel root; the active progress segment reads it (height on the desktop
  // side rail, width on the mobile bar) so one loop feeds both without a ref.
  const rootRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  // Whether the device actually supports hovering (desktop). On touch devices
  // there is no hover, so the auto-advance never pauses.
  const canHoverRef = useRef(false);

  // Keep activeRef in sync
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    canHoverRef.current = window.matchMedia("(hover: hover)").matches;
  }, []);

  // RAF-based progress loop — drives both the visual fill and the auto-advance.
  // Using requestAnimationFrame instead of CSS animations or setTimeout avoids
  // the CSS keyframe / onAnimationEnd reliability issues on mobile and in
  // React dev-mode Strict Mode (which double-invokes effects).
  //
  // Pause-on-hover is done by checking the panel's live :hover state each frame
  // rather than pointer enter/leave events. :hover is true whenever the cursor
  // is over the panel OR any descendant — including the arrow buttons and the
  // progress segments — so hovering a control reliably freezes progress, with no
  // pointerType guesswork. On touch devices (no hover) it simply never pauses.
  const startLoop = () => {
    startTimeRef.current = null;
    lastTsRef.current = null;
    rootRef.current?.style.setProperty("--seg-progress", "0%");

    const tick = (ts: number) => {
      if (startTimeRef.current === null) startTimeRef.current = ts;
      if (lastTsRef.current === null) lastTsRef.current = ts;

      const dt = ts - lastTsRef.current;
      lastTsRef.current = ts;

      const hovered =
        canHoverRef.current && !!rootRef.current?.matches(":hover");
      // While hovered, push the virtual start time forward by this frame's delta
      // so elapsed (and thus progress) stays frozen at its current value.
      if (hovered) startTimeRef.current += dt;

      const elapsed = ts - startTimeRef.current;
      const pct = Math.min((elapsed / AUTO_ADVANCE_MS) * 100, 100);

      rootRef.current?.style.setProperty("--seg-progress", `${pct}%`);

      if (pct >= 100) {
        // Advance to the next module; the new active triggers a new loop via useEffect
        setActive((prev) => (prev + 1) % MODULES.length);
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  const stopLoop = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  // Restart the loop every time the active module changes
  useEffect(() => {
    startLoop();
    return stopLoop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // Vertical card-roll track position
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
    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [active]);

  // Touch swipe for mobile navigation
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = Math.abs(touchStartY.current - e.changedTouches[0].clientY);
    if (Math.abs(dx) > 40 && Math.abs(dx) > dy) {
      setActive((prev) =>
        dx > 0 ? Math.min(prev + 1, MODULES.length - 1) : Math.max(prev - 1, 0),
      );
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative px-6 pt-8 lg:pt-16 lg:pb-20 lg:px-[60px]">
        <motion.div
          className="mx-auto w-full max-w-[1410px]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Header */}
          <motion.header
            variants={fadeUp}
            className="flex max-w-[807px] flex-col gap-2.5"
          >
            <h2 className="text-[26px] font-black text-[#0A4B6E]">
              Everything your operations depend on connected
            </h2>
            <p className="text-[18px] font-normal leading-[26px] text-[#0A4B6E] lg:text-[20px]">
              A unified architecture designed to handle the complexity of modern
              enterprise environments without the clutter.
            </p>
          </motion.header>

          {/* Two-column panel. Hover-pause is read from this element's live
              :hover state in the RAF loop (covers the arrow buttons too), so no
              pointer handlers are needed here. */}
          <div
            ref={rootRef}
            className="mt-10 flex flex-col gap-[30px] lg:flex-row lg:items-start"
          >
            {/* Left: image carousel + pagination dots */}
            <motion.div
              variants={slideFromLeft}
              className="mx-auto flex w-full flex-col items-center gap-4 md:max-w-[600px] lg:mx-0 lg:w-[600px] lg:shrink-0"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="relative h-[320px] w-full overflow-hidden rounded-[24px] border-4 border-white/60 bg-[#EDF5FC] lg:h-[480px]"
                style={{
                  boxShadow:
                    "0px 13px 110px 0px rgba(199,199,199,0.25), 6px 10px 33px 0px rgba(217,226,255,0.65), -6px -20px 33px 0px rgba(217,226,255,0.65), 9px 7px 60px 0px rgba(255,255,255,0.40)",
                }}
              >
                {/* All images are mounted and crossfaded via opacity so every
                    slide is fetched once up front and stays cached — this avoids
                    the blank card that appeared when each ~MB image only started
                    loading at the moment it became active. */}
                {MODULES.map((mod, i) => (
                  <motion.div
                    key={mod.key}
                    className="absolute inset-0"
                    initial={false}
                    animate={{
                      opacity: i === active ? 1 : 0,
                      scale: i === active ? 1 : 1.04,
                    }}
                    transition={{ duration: 0.55, ease: EASE }}
                  >
                    <Image
                      src={mod.image}
                      alt={mod.title}
                      fill
                      sizes="600px"
                      className="object-cover object-center"
                      priority={i === 0}
                    />
                  </motion.div>
                ))}

                <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-[51px] bg-gradient-to-r from-[#F3F8FC] to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-[51px] bg-gradient-to-l from-[#F3F8FC] to-transparent" />
                <div className="pointer-events-none absolute left-0 top-0 z-10 h-[51px] w-full bg-gradient-to-b from-[#F3F8FC] to-transparent" />
                <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-[51px] w-full bg-gradient-to-t from-[#F3F8FC] to-transparent" />
              </div>

              {/* Segmented progress — tablet & mobile only; on desktop this
                  lives in the vertical side rail. Prev/next arrows flank the bar
                  (wrapping), and the active-segment width is driven by the RAF
                  loop via the --seg-progress CSS var (no re-renders). */}
              <div className="flex w-full items-center gap-3 lg:hidden">
                <button
                  type="button"
                  onClick={() =>
                    setActive((p) => (p - 1 + MODULES.length) % MODULES.length)
                  }
                  aria-label="Previous module"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#D6E7F5] bg-white shadow-[0_6px_16px_rgba(33,177,241,0.18)] transition hover:bg-[#F0F8FE]"
                >
                  <Chevron dir="left" />
                </button>

                <div className="flex flex-1 items-center gap-2">
                  {MODULES.map((mod, i) => (
                    <button
                      key={mod.key}
                      type="button"
                      aria-label={`View ${mod.key}`}
                      onClick={() => setActive(i)}
                      className="relative h-[6px] flex-1 cursor-pointer overflow-hidden rounded-full bg-[#CDE9FA]"
                    >
                      {/* Completed segments stay fully filled */}
                      {i < active && (
                        <span className="absolute inset-0 rounded-full bg-[#0A8EC8]" />
                      )}
                      {/* Active segment: RAF-driven width via CSS var */}
                      {i === active && (
                        <span
                          className="absolute inset-y-0 left-0 rounded-full bg-[#0A8EC8]"
                          style={{ width: "var(--seg-progress, 0%)" }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setActive((p) => (p + 1) % MODULES.length)}
                  aria-label="Next module"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#D6E7F5] bg-white shadow-[0_6px_16px_rgba(33,177,241,0.18)] transition hover:bg-[#F0F8FE]"
                >
                  <Chevron dir="right" />
                </button>
              </div>
            </motion.div>

            {/* Right: fixed-height vertical card roll */}
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
              {/* Subtle sky-blue background grid */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.25]"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(33, 177, 241, 0.14) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(33, 177, 241, 0.14) 1px, transparent 1px)
                  `,
                  backgroundSize: "30px 30px",
                }}
              />

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
                    {/* Faded watermark icon */}
                    <div
                      className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 lg:right-[80px]"
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
                        <p className="text-[17px] font-bold text-[#0A4B6E]">
                          {mod.title}
                        </p>
                        <p className="text-[14px] font-normal text-[#1391D4]">
                          {mod.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Bullets */}
                    <ul className="relative flex flex-col gap-2.5 px-5 pt-4 lg:ml-15">
                      {mod.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <Image
                            src="/ai-platform/bulletpoint.svg"
                            alt=""
                            width={22}
                            height={22}
                            className="mt-0.75 shrink-0"
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

            {/* Right-edge vertical nav: up / down arrows + progress track.
                Clamps at the ends (matching the touch-swipe behaviour) and, like
                the dots, changing active restarts the auto-advance loop. */}
            <div className="hidden shrink-0 flex-col items-center gap-3 self-stretch lg:flex lg:h-[480px]">
              <button
                type="button"
                onClick={() =>
                  setActive((p) => (p - 1 + MODULES.length) % MODULES.length)
                }
                aria-label="Previous module"
                className="hover:cursor-pointer flex size-9 shrink-0 items-center justify-center rounded-full border border-[#D6E7F5] bg-white shadow-[0_6px_16px_rgba(33,177,241,0.18)] transition hover:bg-[#F0F8FE]"
              >
                <Chevron dir="up" />
              </button>

              {/* Vertical segmented progress — one segment per module. Completed
                  segments stay filled; the active one fills top→bottom via the
                  RAF-driven --seg-progress CSS var. Click a segment to jump. */}
              <div className="flex w-[5px] flex-1 flex-col items-stretch gap-2">
                {MODULES.map((mod, i) => (
                  <button
                    key={mod.key}
                    type="button"
                    aria-label={`View ${mod.key}`}
                    onClick={() => setActive(i)}
                    className="relative w-full flex-1 cursor-pointer overflow-hidden rounded-full bg-[#CDE9FA]"
                  >
                    {i < active && (
                      <span className="absolute inset-0 rounded-full bg-[#0A8EC8]" />
                    )}
                    {i === active && (
                      <span
                        className="absolute inset-x-0 top-0 rounded-full bg-[#0A8EC8]"
                        style={{ height: "var(--seg-progress, 0%)" }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setActive((p) => (p + 1) % MODULES.length)}
                aria-label="Next module"
                className="hover:cursor-pointer flex size-9 shrink-0 items-center justify-center rounded-full border border-[#D6E7F5] bg-white shadow-[0_6px_16px_rgba(33,177,241,0.18)] transition hover:bg-[#F0F8FE]"
              >
                <Chevron dir="down" />
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}

const CHEVRON_ROTATION = {
  up: "",
  down: "rotate-180",
  left: "-rotate-90",
  right: "rotate-90",
} as const;

function Chevron({
  dir,
}: Readonly<{ dir: keyof typeof CHEVRON_ROTATION }>) {
  // Brand linear-gradient stroke (#21B1F1 → #C5EB4C), matching the Figma vector
  // spec. Unique gradient id per direction so every instance can render.
  const gid = `chev-grad-${dir}`;
  return (
    <svg
      width="12"
      height="7"
      viewBox="0 0 12 7"
      fill="none"
      aria-hidden
      className={CHEVRON_ROTATION[dir]}
    >
      <defs>
        <linearGradient
          id={gid}
          x1="0"
          y1="0"
          x2="12"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#21B1F1" />
          <stop offset="1" stopColor="#C5EB4C" />
        </linearGradient>
      </defs>
      <path
        d="M1 6l5-5 5 5"
        stroke={`url(#${gid})`}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
