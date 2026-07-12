"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const wipeDown: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  show: (delay = 0) => ({
    clipPath: "inset(0 0 0% 0)",
    transition: { delay, duration: 0.65, ease: EASE },
  }),
};

const wipeUp: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  show: (delay = 0) => ({
    clipPath: "inset(0% 0 0 0)",
    transition: { delay, duration: 0.75, ease: EASE },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay },
  }),
};

const fromLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: EASE, delay },
  }),
};

const HEADER_H2     = 0.05;
const HEADER_P      = 0.25;
const SKYLINE       = 0.5;
const ALLOWS_LABEL  = 0.5;
const ALLOWS_START  = 0.6;
const ALLOWS_STAGGER = 0.15;
const PLATFORM_IMG  = 1.3;
const FEATURES_START = 1.3;
const FEATURES_STAGGER = 0.15;

// Auto-highlight cycles every N ms (longer for items with bullets)
const CYCLE_MS = 3500;
// After a manual scroll, wait this long before auto-cycling resumes
const RESUME_MS = 4000;

// ─── Types ────────────────────────────────────────────────────────────────────

type Feature = { icon: string; title: string; desc: string; active?: boolean; bullets?: string[] };
type Allow   = { badge: string; title: string };

type OnePlatformContent = {
  heading?: string;
  subtitle?: string;
  skylineImage?: string;
  features?: Feature[];
  allowsLabel?: string;
  allows?: Allow[];
  platformImage?: string;
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function FeatureRow({
  icon,
  title,
  desc,
  bullets,
  isActive,
  delay = 0,
}: Readonly<Feature & { isActive: boolean; delay?: number }>) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      className="flex items-center gap-6 px-2 py-3"
    >
      {/* Icon — centered glass box, sits outside the gradient */}
      <div className="relative flex size-14 shrink-0 items-center justify-center rounded-2xl p-2.5">
        {/* Active glass treatment as a single fading overlay (bg + outline + shadow) */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-2xl bg-sky-50/20 outline outline-2 -outline-offset-2 outline-white transition-opacity duration-500 ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundColor: "rgba(255,255,255,0.7)",
            boxShadow:
              "0px 13px 100px 0px rgba(199,199,199,0.25), 6px 10px 23px 0px rgba(217,226,255,0.85), 9px 7px 60px 0px rgba(255,255,255,0.40)",
          }}
        />
        <Image
          src={icon}
          alt=""
          width={37}
          height={36}
          unoptimized
          className={`relative z-10 size-9 object-contain transition-opacity duration-500 ${
            isActive ? "opacity-100" : "opacity-45"
          }`}
        />
      </div>

      {/* Text content — sky gradient sits behind only this block when active */}
      <div
        className="relative flex flex-1 flex-col gap-1.5 rounded-2xl px-4 py-3 transition-all duration-500"
        style={
          isActive
            ? {
                background:
                  "linear-gradient(90deg, rgba(125,211,252,0.20) 0%, rgba(240,249,255,0) 100%)",
              }
            : undefined
        }
      >
        <p
          className={`text-[16px] font-bold leading-tight transition-colors duration-500 ${
            isActive ? "text-[#0A4B6E]" : "text-[#9AA7B8]"
          }`}
        >
          {title}
        </p>
        <p
          className={`text-[14px] font-normal leading-[20px] transition-colors duration-500 ${
            isActive ? "text-[#1D6C97]" : "text-[#002D45]"
          }`}
        >
          {desc}
        </p>
        {/* Bullet sub-items — always visible when present */}
        {bullets && bullets.length > 0 && (
          <ul className="mt-2 flex flex-col gap-1.5">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <Image
                  src="/industries/construction/checkicon.svg"
                  width={18}
                  height={18}
                  alt=""
                  unoptimized
                  className={`shrink-0 transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-40"
                  }`}
                />
                <span
                  className={`text-[13px] leading-[18px] transition-colors duration-500 ${
                    isActive ? "text-[#475569]" : "text-[#B6C0CE]"
                  }`}
                >
                  {b}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

function AllowCard({
  badge,
  title,
  delay = 0,
}: Readonly<Allow & { delay?: number }>) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      className="flex items-center justify-center rounded-[16px] border border-[#EAF1F8] px-4 py-4 shadow-[0px_10px_30px_-18px_rgba(20,46,92,0.25)]"
      style={{ background: "rgb(245, 251, 255)" }}
    >
      <p className="text-center text-[18px] font-normal leading-[20px] text-[#002D45]">
        {title}
      </p>
    </motion.div>
  );
}

// Brand gradient chevron (#21B1F1 → #C5EB4C), matching the arrows elsewhere.
function Chevron({ dir }: Readonly<{ dir: "up" | "down" }>) {
  const gid = `op-chev-${dir}`;
  return (
    <svg
      width="12"
      height="7"
      viewBox="0 0 12 7"
      fill="none"
      aria-hidden
      className={dir === "up" ? "" : "rotate-180"}
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
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowButton({
  dir,
  onClick,
}: Readonly<{ dir: "up" | "down"; onClick: () => void }>) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "up" ? "Previous capability" : "Next capability"}
      className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#D6E7F5] bg-white shadow-[0_6px_16px_rgba(33,177,241,0.18)] transition hover:bg-[#F0F8FE]"
    >
      <Chevron dir={dir} />
    </button>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function OnePlatform({
  onePlatform = {},
}: Readonly<{ onePlatform?: OnePlatformContent }> = {}) {
  const {
    heading      = "One platform to manage your entire site",
    subtitle     = "",
    skylineImage = "",
    features     = [],
    allowsLabel  = "It allows you to",
    allows       = [],
    platformImage = "",
  } = onePlatform;

  // ── Auto-cycling active highlight ──────────────────────────────────────────
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused]           = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const rowRefs   = useRef<(HTMLDivElement | null)[]>([]);
  // True only while the USER is actively scrolling (wheel/touch)
  const userDriving  = useRef(false);
  // Skip the "scroll into view" effect once when the user set the active row
  const skipAutoScroll = useRef(false);
  const resumeTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Advance active item on interval (paused while the user is scrolling)
  useEffect(() => {
    if (features.length <= 1 || paused) return;
    const id = setInterval(
      () => setActiveIndex(i => (i + 1) % features.length),
      CYCLE_MS,
    );
    return () => clearInterval(id);
  }, [features.length, paused]);

  // Auto-cycle: scroll the active row into view when it changes
  useEffect(() => {
    if (skipAutoScroll.current) {
      skipAutoScroll.current = false; // change came from the user; don't yank
      return;
    }
    const container = scrollRef.current;
    const row       = rowRefs.current[activeIndex];
    if (!container || !row) return;
    // Position active item roughly ⅓ from the top of the visible window
    const top = row.offsetTop - container.clientHeight / 3;
    container.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, [activeIndex]);

  // The user touched the wheel/trackpad/touchscreen → take manual control
  const onUserScrollIntent = () => {
    userDriving.current = true;
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      userDriving.current = false;
      setPaused(false); // resume auto-cycle from the current row
    }, RESUME_MS);
  };

  // Up / down arrow buttons: move to the previous/next capability (wrapping).
  // We leave skipAutoScroll false so the scroll-into-view effect brings the new
  // active row into the focal line, and pause the auto-cycle briefly like a
  // manual scroll so it doesn't fight the user.
  const step = (dir: -1 | 1) => {
    if (features.length <= 1) return;
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), RESUME_MS);
    setActiveIndex((i) => (i + dir + features.length) % features.length);
  };

  // On every scroll, if the user is driving, activate the row whose centre is
  // nearest the focal line — the same ⅓-from-top point the auto-scroll targets.
  // Measuring real row positions (rather than mapping the overall scroll
  // fraction) keeps the highlight locked to what the user is actually reading,
  // so it switches the instant a row crosses the threshold with no lag.
  const onScroll = () => {
    if (!userDriving.current) return; // ignore our own programmatic scrolls
    const container = scrollRef.current;
    if (!container) return;

    let nearest = 0;

    // Check if scrolled completely to the top
    if (container.scrollTop <= 5) {
      nearest = 0;
    }
    // Check if scrolled completely to the bottom
    else if (container.scrollTop + container.clientHeight >= container.scrollHeight - 15) {
      nearest = features.length - 1;
    }
    // Otherwise calculate based on proximity to focal line
    else {
      const focal = container.scrollTop + container.clientHeight / 3;
      let best = Infinity;
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const center = row.offsetTop + row.offsetHeight / 2;
        const dist = Math.abs(center - focal);
        if (dist < best) {
          best = dist;
          nearest = i;
        }
      });
    }

    setActiveIndex(prev => {
      if (prev !== nearest) skipAutoScroll.current = true;
      return nearest;
    });
  };

  // Clean up the resume timer on unmount
  useEffect(() => () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative z-10 overflow-hidden bg-[#f5fbff] px-6 py-0 pb-16 lg:px-[60px]">
        <motion.div
          className="mx-auto flex w-full max-w-[1320px] flex-col gap-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Header — wipeTop */}
          <header className="flex flex-col gap-2.5">
            <motion.h2
              variants={wipeDown}
              custom={HEADER_H2}
              className="text-[28px] font-extrabold leading-[34px] text-[#0A4B6E]"
            >
              {heading}
            </motion.h2>
            <motion.p
              variants={wipeDown}
              custom={HEADER_P}
              className="max-w-[760px] text-[20px] font-normal leading-[24px] text-[#0A4B6E]"
            >
              {subtitle}
            </motion.p>
          </header>

          {/* Two columns — on mobile, all 4 blocks stack with CSS order;
              on lg they group back into left/right columns. */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-14">

            {/* Left column wrapper (lg only) */}
            <div className="contents lg:flex lg:w-[44%] lg:flex-none lg:flex-col lg:gap-8">

              {/* 1) Skyline image — order-1 on mobile */}
              {skylineImage && (
                <motion.div
                  variants={fromLeft}
                  custom={SKYLINE}
                  className="relative order-1 flex items-center justify-center lg:order-none"
                >
                  <div
                    className="pointer-events-none absolute inset-0 -z-0"
                    style={{ filter: "blur(8px)" }}
                  />
                  <Image
                    src={skylineImage}
                    alt=""
                    width={548}
                    height={330}
                    className="relative z-10 h-auto w-full max-w-[520px]"
                  />
                </motion.div>
              )}

              {/* 3) Feature list — order-3 on mobile. Centered up/down arrows
                  step through the capabilities (wrapping). */}
              <div className="order-3 flex flex-col items-center gap-3 lg:order-none">
                {features.length > 1 && (
                  <ArrowButton dir="up" onClick={() => step(-1)} />
                )}

                <div className="relative w-full">
                  {/* Top fade hint */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-[#f5fbff] to-transparent" />

                  <div
                    ref={scrollRef}
                    onWheel={onUserScrollIntent}
                    onTouchMove={onUserScrollIntent}
                    onScroll={onScroll}
                    className="flex flex-col gap-2 overflow-y-auto outline-none [&::-webkit-scrollbar]:hidden"
                    style={{ maxHeight: 420, scrollbarWidth: "none" }}
                  >
                    {features.map((f, i) => (
                      <div
                        key={f.title}
                        ref={el => { rowRefs.current[i] = el; }}
                      >
                        <FeatureRow
                          {...f}
                          isActive={i === activeIndex}
                          delay={FEATURES_START + i * FEATURES_STAGGER}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Bottom fade hint */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-6 bg-gradient-to-t from-[#f5fbff] to-transparent" />
                </div>

                {features.length > 1 && (
                  <ArrowButton dir="down" onClick={() => step(1)} />
                )}
              </div>

            </div>{/* end left column wrapper */}

            {/* Right column wrapper (lg only) */}
            <div className="contents lg:flex lg:flex-1 lg:flex-col lg:gap-7 lg:pt-20">

              {/* 2) "You can" cards — order-2 on mobile */}
              <div className="order-2 flex flex-col gap-4 lg:order-none">
                <motion.p
                  variants={fadeUp}
                  custom={ALLOWS_LABEL}
                  className="text-[18px] font-bold font-[700] text-[#183B56]"
                >
                  {allowsLabel}
                </motion.p>
                {allows.length > 0 && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {allows.map((a, i) => (
                      <AllowCard
                        key={a.title}
                        {...a}
                        delay={ALLOWS_START + i * ALLOWS_STAGGER}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* 4) Platform image — order-4 on mobile */}
              {platformImage && (
                <motion.div variants={wipeUp} custom={PLATFORM_IMG} className="order-4 -mx-3 lg:order-none lg:mx-0">
                  {/* Source asset has a decorative glow border baked in; on
                      mobile we crop it out by zooming into an overflow-hidden
                      frame (desktop shows the asset at its native scale). */}
                  <div className="relative aspect-703/510 w-full overflow-hidden rounded-[20px]">
                    <Image
                      src={platformImage}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 703px"
                      className="scale-[1.18] object-cover lg:scale-100"
                    />
                  </div>
                </motion.div>
              )}

            </div>{/* end right column wrapper */}

          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
