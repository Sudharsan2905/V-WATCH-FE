"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";

// Shared ease — matches the rest of the site (≈ easeOutQuint).
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Auto-advance cadence, mirroring PlatformOverview's carousel on the same page.
const CYCLE_MS = 3000; // step the active card every 3 s
const RESUME_MS = 6000; // resume auto-play 6 s after the pointer leaves

// Header clip-wipe from the top — the site's signature heading reveal.
const wipeDown: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  show: (delay = 0) => ({
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { delay, duration: 0.6, ease: EASE },
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

// Card reveal — rise + subtle scale, kept inside a stagger container.
const cardIn: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.94 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE, delay },
  }),
};

// Left-hand isometric panel — eases in from the left + soft scale (mirrors the
// `fromRight` map reveal used by SinglePlatform).
const fromLeft: Variants = {
  hidden: { opacity: 0, x: -48, scale: 0.96 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE, delay },
  }),
};

// Capability rows slide in from the right, staggered down the list.
const rowIn: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE, delay },
  }),
};

// Each dotted connector segment draws itself downward as its row reveals.
const railDraw: Variants = {
  hidden: { scaleY: 0 },
  show: (delay = 0) => ({
    scaleY: 1,
    transition: { duration: 1.1, ease: EASE, delay },
  }),
};

// Trigger each group as IT enters the viewport — never on one tall wrapping
// container (which, being taller than the screen, fires the moment its top
// scrolls in and animates everything below the fold too early).
const VIEWPORT = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -120px 0px",
} as const;

// Rail geometry — two columns per row. The connector shares the number's column
// and is laid out in flow (not absolutely positioned), so each dashed segment
// stretches exactly from one figure down to the next however long the copy runs.
const NUMBER_COL = 68; // px — width of the outlined "01" column + its connector
const CARD_GAP = 10; // px — gap between the number column and the content card

// Soft blue blush behind the timeline. Two offset ellipses rather than one so
// the wash reads as an organic glow instead of a centred halo.
const TIMELINE_BLUSH = `
  radial-gradient(58% 42% at 36% 28%, rgba(133,196,236,0.30) 0%, rgba(133,196,236,0) 100%),
  radial-gradient(48% 38% at 74% 70%, rgba(160,214,240,0.24) 0%, rgba(160,214,240,0) 100%)
`;

// Bottom fade applied to the frame while rows remain below its edge.
const FRAME_FADE =
  "linear-gradient(to bottom, #000 78%, rgba(0,0,0,0.15) 96%, transparent 100%)";

type Capability = {
  /** Two-digit index. Auto-derived from position when omitted. */
  number?: string;
  title: string;
  description: string;
};

type Stat = { label: string; value: string };

type ConnectedCapabilitiesContent = {
  heading?: string;
  intro?: string;
  /** Product wordmark image shown at the panel's top-left (ATLAS / AEGIS). */
  badgeImage?: string;
  /** Accessible name for the wordmark — also the fallback if the asset 404s. */
  badge?: string;
  /** V-Watch logo mark tucked into the panel's bottom-right. */
  logoImage?: string;
  /** Pale ribbon backdrop behind the whole section. */
  backgroundImage?: string;
  /** Isometric render that fills the dark panel. */
  panelImage?: string;
  panelAlt?: string;
  stats?: Stat[];
  capabilities?: Capability[];
};

const DEFAULT_STATS: Stat[] = [
  { label: "Modules", value: "30" },
  { label: "Connected Cluster", value: "05" },
  { label: "Operating Spine", value: "01" },
];

const DEFAULT_CAPABILITIES: Capability[] = [
  {
    title: "Workforce & Access",
    description:
      "Worker identity, entry, occupancy, accountability and workforce performance.",
  },
  {
    title: "Tracking & Mobility",
    description:
      "Real-time movement, identification and density awareness across people and assets.",
  },
  {
    title: "Safety & Compliance",
    description:
      "Policy-led controls before entry, during work and when every person must be accounted for.",
  },
  {
    title: "Delivery & Handover",
    description:
      "Preserve commissioning records and move project intelligence into live operations.",
  },
  {
    title: "AI Video Analytics",
    description:
      "Convert camera feeds into identity, safety, intrusion and operational event alerts.",
  },
];

const PC_BASE = "/pre-construction/connected-capabilities";
// The render already carries its own dark background and rounded corners, at
// 638×397 — the panel below is sized to that exact ratio so nothing is cropped.
const DEFAULT_PANEL_IMAGE = `${PC_BASE}/integrated-intelligence.webp`;
const DEFAULT_BADGE_IMAGE = `${PC_BASE}/ATLAS.webp`;
const DEFAULT_LOGO_IMAGE = `${PC_BASE}/V-WATCH.webp`;
const DEFAULT_BACKGROUND_IMAGE = `${PC_BASE}/background.webp`;

// Intrinsic size of the panel renders — drives the panel's aspect ratio.
const PANEL_W = 638;
const PANEL_H = 397;

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatTile({ label, value, delay }: Readonly<Stat & { delay: number }>) {
  return (
    <motion.div
      variants={cardIn}
      custom={delay}
      className="relative flex flex-1 flex-col items-center justify-center gap-0.5 overflow-hidden rounded-[14px] px-3 py-3"
      style={{
        // Frosted glass over the section wash — same treatment as the
        // SinglePlatform pill so the two sections read as one system.
        background: "rgba(255,255,255,0.62)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.85)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.9), 0 10px 22px -16px rgba(20,46,92,0.22)",
      }}
    >
      <span className="font-lato text-[12px] font-semibold leading-none tracking-[0.01em] text-[#5C7E97]">
        {label}
      </span>
      <span className="mt-1.5 font-lato text-[24px] font-extrabold leading-none text-[#0A4B6E]">
        {value}
      </span>
    </motion.div>
  );
}

function CapabilityRow({
  number,
  title,
  description,
  delay,
  isLast,
  isActive,
  rowRef,
  onHover,
}: Readonly<
  Capability & {
    number: string;
    delay: number;
    isLast: boolean;
    isActive: boolean;
    rowRef: (el: HTMLLIElement | null) => void;
    onHover: () => void;
  }
>) {
  return (
    <motion.li
      ref={rowRef}
      variants={rowIn}
      custom={delay}
      // Each row triggers on ITS OWN scroll position rather than inheriting one
      // trigger from the list. The list is taller than the fold, so a single
      // trigger on the <ol> fired every row the moment row 1 appeared — rows 5
      // and 6 played their reveal while still below the fold and were already
      // sitting there, static, by the time you scrolled to them.
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      // grow (not flex-1) is deliberate: rows expand to share any spare frame
      // height, but shrink-0 stops them compressing to fit. With five rows they
      // fill the frame; a sixth overflows it and becomes scrollable rather than
      // squeezing all six shorter. min-h keeps a row from collapsing under
      // short copy, which is what guarantees the sixth falls below the fold.
      onMouseEnter={onHover}
      className={`relative flex items-stretch ${
        isLast ? "" : "lg:grow lg:shrink-0 lg:min-h-[92px]"
      }`}
    >
      {/* Number + connector share one column, so the dashed segment runs down
          the centre of the figures and links each one to the next. The last row
          draws no segment, so the rail always ends on a number however long the
          copy runs. */}
      <div
        className="flex shrink-0 flex-col items-center"
        style={{ width: NUMBER_COL }}
      >
        {/* Outlined figure — transparent fill with a light-blue stroke. The
            fallback `color` still paints the glyph solid on the rare engine
            that lacks -webkit-text-fill-color, so it is never invisible. */}
        <span
          className="font-lato text-[60px] font-extrabold leading-none"
          style={{
            color: "#0A8EC8",
            WebkitTextFillColor: "transparent",
            WebkitTextStrokeWidth: "1.4px",
            WebkitTextStrokeColor: "#0A8EC8",
          }}
        >
          {number}
        </span>
        {!isLast && (
          <motion.span
            aria-hidden
            variants={railDraw}
            custom={delay + 0.08}
            className="mt-2 w-0 flex-1 border-l border-dashed border-[#7FC8EA]"
            style={{ originY: 0 }}
          />
        )}
      </div>

      {/* Content card — the only thing the active state touches: it lifts to
          solid white while the rest sit back translucent. The numbers stay at
          full strength throughout so the rail reads as one continuous scale. */}
      <div
        className={`min-w-0 flex-1 ${isLast ? "" : "pb-4 lg:pb-5"}`}
        style={{ paddingLeft: CARD_GAP }}
      >
        <motion.div
          className="rounded-[14px] px-4 py-3"
          animate={{
            backgroundColor: isActive
              ? "rgba(255,255,255,1)"
              : "rgba(255,255,255,0.42)",
            boxShadow: isActive
              ? "0 16px 34px -18px rgba(20,46,92,0.35)"
              : "0 10px 26px -18px rgba(20,46,92,0.14)",
            y: isActive ? -2 : 0,
          }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <h3 className="font-lato text-[15px] font-bold leading-[20px] text-[#0A4B6E]">
            {title}
          </h3>
          <p className="mt-1 font-lato text-[13px] font-normal leading-[19px] text-[#5C7E97]">
            {description}
          </p>
        </motion.div>
      </div>
    </motion.li>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function ConnectedCapabilities({
  content = {},
}: Readonly<{ content?: ConnectedCapabilitiesContent }> = {}) {
  const {
    heading = "Five connected capabilities. One continuous operation.",
    intro = "Integrated intelligence for project-wide visibility, coordination and control.",
    badge = "ATLAS",
    backgroundImage = DEFAULT_BACKGROUND_IMAGE,
    badgeImage = DEFAULT_BADGE_IMAGE,
    logoImage = DEFAULT_LOGO_IMAGE,
    panelImage = DEFAULT_PANEL_IMAGE,
    panelAlt = "Isometric view of the V-Watch Atlas connected capability clusters",
    stats = DEFAULT_STATS,
    capabilities = DEFAULT_CAPABILITIES,
  } = content;

  const [panelImageFailed, setPanelImageFailed] = useState(false);

  // ── Auto-advancing active card ────────────────────────────────────────────
  // The frame only fits five rows, so a sixth is unreachable without the
  // scrollbar we removed. Instead the active card steps forward on a timer and
  // the frame follows it, which brings the last row into view on its own.
  const frameRef = useRef<HTMLOListElement>(null);
  const rowEls = useRef<Array<HTMLLIElement | null>>([]);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inView = useInView(frameRef, { amount: 0.25 });
  const reduceMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // True while list remains below the frame's bottom edge — drives the soft
  // fade that hints at the rows still to come.
  const [moreBelow, setMoreBelow] = useState(false);

  const syncFade = useCallback(() => {
    const frame = frameRef.current;
    if (!frame) return;
    setMoreBelow(frame.scrollHeight - frame.clientHeight - frame.scrollTop > 8);
  }, []);

  // Step the active card while the list is on screen and not being hovered.
  useEffect(() => {
    if (!inView || paused || capabilities.length <= 1) return;
    const id = setInterval(
      () => setActiveIndex((i) => (i + 1) % capabilities.length),
      CYCLE_MS,
    );
    return () => clearInterval(id);
  }, [inView, paused, capabilities.length]);

  // Keep the active row inside the frame. Only scrolls when the row is actually
  // out of view, so the common case (rows one to five) never moves the frame.
  useEffect(() => {
    const frame = frameRef.current;
    const row = rowEls.current[activeIndex];
    if (!frame || !row) return;
    if (frame.scrollHeight <= frame.clientHeight) return;

    const top = row.offsetTop;
    const bottom = top + row.offsetHeight;
    const behavior: ScrollBehavior = reduceMotion ? "auto" : "smooth";

    if (bottom > frame.scrollTop + frame.clientHeight) {
      frame.scrollTo({ top: bottom - frame.clientHeight, behavior });
    } else if (top < frame.scrollTop) {
      frame.scrollTo({ top, behavior });
    }
  }, [activeIndex, reduceMotion]);

  useEffect(() => {
    syncFade();
  }, [syncFade, capabilities.length]);

  useEffect(
    () => () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    },
    [],
  );

  // Hovering a row hands control to the reader; auto-play resumes shortly after
  // the pointer leaves the list.
  const holdAt = (i: number) => {
    setActiveIndex(i);
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  };
  const releaseHold = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), RESUME_MS);
  };

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative z-10 w-full overflow-hidden bg-[#f5fbff] px-6 py-10 lg:px-15 lg:py-14">
        {/* Ribbon backdrop. mix-blend-multiply drops the asset's white ground
            into the section wash, so only the pale blue ribbon paints and the
            #f5fbff tint survives underneath it. */}
        {backgroundImage && (
          <Image
            src={backgroundImage}
            alt=""
            aria-hidden
            fill
            unoptimized
            priority={false}
            sizes="100vw"
            className="pointer-events-none select-none object-cover object-center mix-blend-multiply"
          />
        )}

        <div className="relative z-10 mx-auto max-w-[1280px]">
          {/* Heading + intro */}
          <motion.div initial="hidden" whileInView="show" viewport={VIEWPORT}>
            <motion.h2
              variants={wipeDown}
              custom={0.05}
              className="max-w-[720px] font-lato text-[22px] font-extrabold leading-[30px] text-[#0A4B6E] sm:text-[24px] sm:leading-[32px]"
            >
              {heading}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="mt-1.5 max-w-[620px] font-lato text-[15px] font-normal leading-[22px] text-[#006F9F] sm:text-[16px]"
            >
              {intro}
            </motion.p>
          </motion.div>

          {/* Two-column body — panel + stats on the left, capability rail right */}
          <div className="mt-7 flex flex-col gap-8 lg:mt-9 lg:flex-row lg:items-stretch lg:gap-12">
            {/* ── LEFT: dark isometric panel + stat tiles ── */}
            <motion.div
              // pb on lg is what lengthens the timeline. The frame opposite is
              // stretched to this column's height, so adding room below the stat
              // cards is the only way to make the frame taller without cutting
              // it loose from the artwork it aligns to.
              className="flex w-full flex-col gap-3.5 lg:w-[54%] lg:flex-none lg:pb-12"
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              <motion.div
                variants={fromLeft}
                custom={0.25}
                className="relative w-full overflow-hidden rounded-[24px]"
                style={{
                  aspectRatio: `${PANEL_W} / ${PANEL_H}`,
                  // Matches the render's own backdrop, so the panel's rounded
                  // corners read as part of the artwork rather than a frame.
                  background:
                    "linear-gradient(155deg, #0A1A2E 0%, #0B2340 45%, #071627 100%)",
                  boxShadow: "0 30px 60px -30px rgba(9,38,70,0.55)",
                }}
              >
                {/* The isometric render. Hidden if the asset is missing so the
                    panel falls back to its gradient rather than showing a broken
                    image. */}
                {panelImage && !panelImageFailed && (
                  <Image
                    src={panelImage}
                    alt={panelAlt}
                    fill
                    unoptimized
                    priority={false}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                    onError={() => setPanelImageFailed(true)}
                  />
                )}

                {/* Slow cyan breathing glow over the render's central hologram —
                    the only looping motion in the section. Screen-blended and
                    low-contrast so it reads as the core pulsing, not as a
                    rectangle fading in and out. */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-[46%] h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(33,177,241,0.28) 0%, rgba(33,177,241,0) 100%)",
                    filter: "blur(26px)",
                  }}
                  animate={{
                    opacity: [0.4, 1, 0.4],
                    scale: [0.92, 1.08, 0.92],
                  }}
                  transition={{
                    duration: 6,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                />

                {/* Product wordmark — top-left over the render. */}
                {badgeImage ? (
                  <Image
                    src={badgeImage}
                    alt={badge}
                    width={67}
                    height={17}
                    unoptimized
                    className="absolute left-5 top-5 z-10 h-[15px] w-auto object-contain sm:h-[17px] lg:left-7 lg:top-6"
                  />
                ) : (
                  badge && (
                    <span className="absolute left-5 top-5 z-10 font-lato text-[15px] font-extrabold uppercase leading-none tracking-[0.04em] text-[#5BC8FF] lg:left-7 lg:top-6">
                      {badge}
                    </span>
                  )
                )}

                {/* V-Watch logo mark — bottom-right of the panel. */}
                {logoImage && (
                  <Image
                    src={logoImage}
                    alt="V-Watch"
                    width={108}
                    height={25}
                    unoptimized
                    className="absolute bottom-4 right-5 z-10 h-[20px] w-auto object-contain sm:h-[25px] lg:bottom-5 lg:right-7"
                  />
                )}
              </motion.div>

              {/* Stat tiles */}
              {stats.length > 0 && (
                <div className="flex flex-wrap gap-2.5 sm:flex-nowrap sm:gap-3">
                  {stats.map((s, i) => (
                    <StatTile key={s.label} {...s} delay={0.55 + i * 0.1} />
                  ))}
                </div>
              )}
            </motion.div>

            {/* ── RIGHT: numbered capability rail ──
                On lg the list is a frame: the wrapper stretches to the left
                column's height (panel + stat cards) and the <ol> fills it
                absolutely, so anything past five rows scrolls inside the frame
                instead of running the section taller than the artwork beside
                it. Below lg there is no frame — the rows simply flow. */}
            {/* -mt on lg lifts the timeline slightly above the panel's top
                edge. The wrapper is stretched, so pulling the top up also adds
                that much to the frame's height rather than shifting the whole
                column down past the stat cards. */}
            <div className="relative flex-1 lg:-mt-8">
              {/* Blush — painted inside the timeline wrapper and before the
                  list, so it sits above the section's ribbon backdrop but
                  behind the cards. Bleeds past the column edges so the wash
                  fades out rather than stopping on a hard boundary. */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-x-10 -inset-y-14"
                style={{ background: TIMELINE_BLUSH, filter: "blur(24px)" }}
              />
              <ol
                ref={frameRef}
                onScroll={syncFade}
                onMouseLeave={releaseHold}
                // overflow-x-hidden kills the stray horizontal bar the card
                // shadows provoked. The scrollbar utilities hide the vertical
                // one in every engine while leaving the frame scrollable — the
                // timer drives it, and a wheel still works.
                className="relative flex flex-col [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:absolute lg:inset-0 lg:overflow-x-hidden lg:overflow-y-auto lg:pr-1"
                style={{
                  msOverflowStyle: "none",
                  // Soft bottom fade while rows remain below the edge, dropped
                  // once scrolled to the end so the final row is never left
                  // sitting under a permanent haze.
                  maskImage: moreBelow ? FRAME_FADE : undefined,
                  WebkitMaskImage: moreBelow ? FRAME_FADE : undefined,
                }}
              >
                {capabilities.map((cap, i) => (
                  <CapabilityRow
                    key={cap.title}
                    {...cap}
                    number={cap.number ?? String(i + 1).padStart(2, "0")}
                    // Small per-index offset so rows sharing a screen land one
                    // after another. Kept short (max ~0.35s) because the viewport
                    // margin already fires a row before it clears the fold, so a
                    // row scrolled to on its own is never left waiting.
                    delay={i * 0.07}
                    isLast={i === capabilities.length - 1}
                    isActive={i === activeIndex}
                    rowRef={(el) => {
                      rowEls.current[i] = el;
                    }}
                    onHover={() => holdAt(i)}
                  />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
