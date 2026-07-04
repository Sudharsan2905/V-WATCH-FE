"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";

// Shared ease — matches the rest of the site (≈ easeOutQuint).
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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

// Right-hand isometric map — eases in from the right + soft scale.
const fromRight: Variants = {
  hidden: { opacity: 0, x: 48, scale: 0.96 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE, delay },
  }),
};

type Feature = { icon: string; label: string };

type SinglePlatformContent = {
  heading?: string;
  intro?: string;
  detail?: string;
  features?: Feature[];
  pill?: string;
  mapImage?: string;
  // "cards" → glass feature cards + connector (pre-construction). "checklist" →
  // vertical icon + full-sentence list (post-construction).
  variant?: "cards" | "checklist";
  // Whether the shield badge overlaps the pill's left edge. Off for post.
  pillBadge?: boolean;
};

const DEFAULT_FEATURES: Feature[] = [
  {
    icon: "/pre-construction/single-platform/icons/people.png",
    label: "People",
  },
  {
    icon: "/pre-construction/single-platform/icons/operations.png",
    label: "Operations",
  },
  {
    icon: "/pre-construction/single-platform/icons/movement.png",
    label: "Movement",
  },
  {
    icon: "/pre-construction/single-platform/icons/workforce.png",
    label: "Workforce",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────
// function FeatureCard({
//   icon,
//   label,
//   delay,
// }: Readonly<Feature & { delay: number }>) {
//   return (
//     <motion.div
//       variants={cardIn}
//       custom={delay}
//       whileHover={{
//         y: -4,
//         scale: 1.02,
//       }}
//       transition={{ duration: 0.25 }}
//       className="relative h-32.5 w-full overflow-hidden rounded-[18px] px-2 py-5 flex flex-col items-center justify-center gap-2"
//       style={{
//         // Frosted glass (matches the CalloutPill body): translucent ~50% white
//         // over an 8px backdrop blur so the section/map behind reads as a soft
//         // blur through the card, with a faint top-to-bottom gradient.
//         // background:
//         //   "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.42) 100%)",
//         WebkitBackdropFilter: "blur(1px)",

//         border: "1px solid rgba(255,255,255,0.6)",

//         boxShadow: `
//           0 18px 36px -18px rgba(56,116,170,0.30),
//           inset 0 1px 0 rgba(255,255,255,0.7)
//         `,
//       }}
//     >
//       {/* Top glass shine — subtle highlight along the upper edge */}
//       <div
//         className="pointer-events-none absolute inset-0 rounded-[18px]"
//         style={{
//           background: `
//             linear-gradient(
//               180deg,
//               rgba(255,255,255,0.5) 0%,
//               rgba(255,255,255,0.12) 24%,
//               transparent 55%
//             )
//           `,
//         }}
//       />

//       {/* Glow border */}
//       <div
//         className="pointer-events-none absolute inset-0 rounded-[18px]"
//         style={{
//           border: "1px solid rgba(255,255,255,0.5)",
//         }}
//       />

//       {/* Bottom veil — keeps the card bottom edge clean */}
//       <div
//         className="pointer-events-none absolute inset-x-0 bottom-0 h-6 rounded-b-[18px]"
//         style={{
//           background:
//             "linear-gradient(0deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 100%)",
//         }}
//       />

//       {/* Icon */}
//       <span
//         className="relative z-10 flex size-[48px] shrink-0 items-center justify-center rounded-full"
//         style={{
//           background: "#FFFFFF",
//           boxShadow: `
//             inset 0 1px 2px rgba(255,255,255,0.9),
//             0 6px 14px rgba(56,116,170,0.16)
//           `,
//         }}
//       >
//         <Image
//           src={icon}
//           alt=""
//           width={24}
//           height={24}
//           unoptimized
//           className="size-6 object-contain"
//         />
//       </span>

//       {/* Text */}
//       <span
//         className="relative z-10 text-center text-[14px] font-bold"
//         style={{
//           color: "#314158",
//           textShadow: "0 1px 1px rgba(255,255,255,0.6)",
//         }}
//       >
//         {label}
//       </span>
//     </motion.div>
//   );
// }

function FeatureCard({
  icon,
  label,
  delay,
}: Readonly<Feature & { delay: number }>) {
  return (
    <motion.div
      variants={cardIn}
      custom={delay}
      className="
        relative
        flex
        h-[130px]
        w-full
        flex-col
        items-center
        justify-center
        gap-3
        overflow-hidden
        rounded-[20px]
        bg-white/10
        backdrop-blur-[2px]
        border-2 border-white
        
       "
      style={{
        border: "1px solid rgba(255,255,255,0.7)",
        boxShadow: `
          inset 0 1px 0 rgba(255,255,255,0.9),
          0 18px 30px -12px rgba(56,116,170,0.35),
          0 6px 14px -4px rgba(56,116,170,0.20)
        `,
      }}
    >
      {/* Glass highlight */}
      <div
        className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full"
        style={{
          background: "rgba(88,190,255,0.06)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[20px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 45%, transparent 100%)",
        }}
      />

      {/* Icon circle */}
      <div
        className="relative z-10 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-white"
        style={{
          boxShadow:
            "0 6px 16px rgba(135,170,205,0.15), inset 0 1px 0 rgba(255,255,255,1)",
        }}
      >
        <Image src={icon} alt={label} width={28} height={28} unoptimized />
      </div>

      <span className="relative z-10 text-[14px] font-bold text-[#0D4E75]">
        {label}
      </span>
    </motion.div>
  );
}

// Connector — the supplied curve image. Its dots sit near the image edges
// (x ≈ 7…395 of 404), so the image is inset to ~80% and centred: that lands
// its four dots on the four card centres (which span the inner ~10%…90%).
const SP_CONNECTOR_SRC =
  "/pre-construction/single-platform/icons/curve_image.png";
// Secure-badge that overlaps the pill's left edge (shield + glowing rings).
const SP_PILL_BADGE_SRC =
  "/pre-construction/single-platform/icons/secure-badge.svg";
// The raster's navy dots are sharp; per Figma they should be soft frosted
// blurs. Layering a blurred copy on top doesn't hide the sharp originals, so we
// instead paint our own navy dots — opaque enough at center to cover the baked
// ones — then blur the whole overlay so each reads as a soft blur. The crisp
// light-blue arcs of the base image are untouched.
// x-positions of the 4 arc peaks as % of the 80%-wide connector container
const DOT_POSITIONS = ["2%", "34%", "66%", "98%"];

function Connector() {
  return (
    <div className="pointer-events-none relative mx-auto w-[80%]">
      <Image
        src={SP_CONNECTOR_SRC}
        alt=""
        width={404}
        height={46}
        unoptimized
        className="w-full"
        style={{ filter: "blur(0.5px)" }}
      />
      {/* Fade strip — hides baked-in flat dots; sits below custom dots */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{
          height: 22,
          background: "linear-gradient(180deg, #f2f6fb 0%, transparent 100%)",
        }}
      />
      {/* Each dot = large upward glow + solid sphere */}
      {DOT_POSITIONS.map((left, i) => (
        <div key={i} className="absolute" style={{ left, top: 4, transform: "translate(-50%, -50%)" }}>
          {/* Upper-only halo — sits entirely above the dot center */}
          <div
            style={{
              position: "absolute",
              width: 50,
              height: 28,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -100%)",
              borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
              background:
                "radial-gradient(ellipse at 50% 100%, rgba(10,75,140,0.72) 0%, rgba(10,75,140,0.32) 50%, rgba(10,75,140,0) 80%)",
              filter: "blur(9px)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function SinglePlatform({
  content = {},
}: Readonly<{ content?: SinglePlatformContent }> = {}) {
  const {
    heading = "A single platform to run your entire project",
    intro = "V-Watch Atlas connects every part of your construction environment into one intelligent system allowing you to manage people, operations, movement, and performance in real time.",
    detail = "From workforce co-ordination to logistics tracking and productivity monitoring, V-Watch Atlas gives you full control over how your project runs.",
    features = DEFAULT_FEATURES,
    pill = "Everything on your site mapped, tracked, and managed.",
    mapImage = "/pre-construction/single-platform/map.png",
    variant = "cards",
    pillBadge = true,
  } = content;

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative z-10 overflow-hidden bg-[#f2f6fb] pb-12 px-6 md:pb-[10px] lg:pb-[20px] xl:pb-0 lg:max-h-175 lg:px-15">
        <div className="mx-auto max-w-[1280px]">
          <motion.h2
            variants={wipeDown}
            custom={0.05}
            className="max-w-[889px] text-[26px] font-extrabold leading-[34px] text-[#0A4B6E] sm:text-[28px] sm:leading-[36px]"
          >
            {heading}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={0.2}
            className="mt-1 max-w-[878px] text-[20px] leading-[24px] text-[#0A4B6E]"
          >
            {intro}
          </motion.p>
        </div>
        <motion.div
          className="relative mt-[30px] mx-auto w-full max-w-[1280px]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* CONTENT — stacked above the map on mobile; from lg up it overlays the
              left while the map bleeds beneath it (glass cards sit over the map) */}
          <div className="relative z-10 flex w-full flex-col lg:absolute lg:inset-y-0 lg:left-0 lg:max-w-126.25">
            <motion.p
              variants={fadeUp}
              custom={0.32}
              className="mt-6 max-w-[442px] text-[20px] leading-[30px] text-[#006F9F]"
            >
              {detail}
            </motion.p>

            {variant === "checklist" ? (
              /* Checklist — vertical icon + full-sentence list (post-construction). */
              <ul className="relative z-20 mt-8 flex flex-col gap-3.5">
                {features.map((f, i) => (
                  <motion.li
                    key={f.label}
                    variants={cardIn}
                    custom={0.45 + i * 0.1}
                    /* Frosted glass — translucent #F4FBFF (20%) fill over a
                       backdrop blur so the map behind reads as a soft blur
                       through the row (Figma: 60px tall, radius 14, 2px border). */
                    className="relative flex min-h-15 items-center gap-2.5 rounded-[14px] px-4 py-1.5"
                    style={{
                      background: "rgba(244,251,255,0.20)",
                      backdropFilter: "blur(4px)",
                      WebkitBackdropFilter: "blur(8px)",
                      boxShadow: "0 12px 30px -14px rgba(20,46,92,0.20)",
                    }}
                  >
                    {/* 2px gradient border ring (Figma: #FFFFFF → #EFF9FF),
                        masked so the translucent fill stays see-through (a solid
                        border would hide the blur behind it). */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-[14px]"
                      style={{
                        padding: 2,
                        background:
                          "linear-gradient(180deg, #FFFFFF 0%, #EFF9FF 100%)",
                        WebkitMask:
                          "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                        WebkitMaskComposite: "xor",
                        mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                        maskComposite: "exclude",
                      }}
                    />
                    <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-white shadow-[0_6px_16px_rgba(33,177,241,0.15)]">
                      <Image
                        src={f.icon}
                        alt=""
                        width={20}
                        height={20}
                        unoptimized
                        className="size-5 object-contain"
                      />
                    </span>
                    <span className="relative z-10 text-[16px] font-semibold leading-snug text-[#0A4B6E]">
                      {f.label}
                    </span>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <>
                {/* Feature cards — 2×2 on mobile, single row from sm up.
                    z-20 keeps the cards above the connector so its dots tuck under. */}
                <div className="relative z-40 mt-10 grid max-w-full grid-cols-2 gap-3 sm:grid-cols-4">
                  {features.map((f, i) => (
                    <FeatureCard key={f.label} {...f} delay={0.45 + i * 0.1} />
                  ))}
                </div>

                {/* Connector — z-30 so blurred dots render above cards (z-20).
                    Arc image is transparent at top so only dot tops peek above
                    card edges; arcs naturally sit below. */}
                <motion.div
                  variants={fadeUp}
                  custom={0.9}
                  className="relative z-30 hidden w-full sm:block -mt-2"
                >
                  <Connector />
                </motion.div>
              </>
            )}

            {/* Pill — Figma spec: 505×54, 14px radius, 2px #FFFFFF→#EFF9FF
                gradient border over a semi-transparent #F4FBFF (20%) fill so the
                map shows softly through, plus a soft drop shadow. Single line
                from sm up; wraps on the narrowest screens where 505px can't fit. */}
            {pill && <motion.div
              variants={fadeUp}
              custom={1}
              className={`relative flex w-fit max-w-full items-center rounded-[14px] pl-2 ${
                variant === "checklist"
                  ? "mt-8 py-3.5 lg:mt-[80px] justify-center"
                  : "mt-12 sm:h-13.5"
              }`}
              style={
                variant === "checklist"
                  ? undefined
                  : {
                      background: "rgba(244,251,255,0.20)",
                      backdropFilter: "blur(14px)",
                      WebkitBackdropFilter: "blur(14px)",
                      boxShadow: "0px 18px 40px -16px rgba(20,46,92,0.20)",
                    }
              }
            >
              {/* 2px gradient border ring — masked so the chip fill stays
                  transparent (a solid border would hide the see-through fill).
                  Only for the pill (cards) variant; the checklist shows plain text. */}
              {variant !== "checklist" && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[14px]"
                  style={{
                    padding: 2,
                    background:
                      "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 70%, #F3FAFF 100%)",
                    WebkitMask:
                      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    maskComposite: "exclude",
                  }}
                />
              )}
              {/* Secure badge — overlaps the pill's left edge; its rings bleed
                  above/below the 54px chip and to the left of it. */}
              {pillBadge && (
                <Image
                  src={SP_PILL_BADGE_SRC}
                  alt=""
                  aria-hidden
                  width={254}
                  height={254}
                  unoptimized
                  className="pointer-events-none absolute z-20 h-[306px] w-274 -translate-x-[45%] -translate-y-[47%] left-[5px] top-[60px] sm:left-0 sm:top-[35px]"
                />
              )}
              <span
                className={`
                  relative z-10
                  inline-flex items-center justify-center
                  px-8 py-4
                  text-[17px] font-bold leading-[26px]
                  text-[#006F9F]
                  ${variant === "checklist" ? "text-center" : "sm:whitespace-nowrap"}
                  ${pillBadge ? "pl-20 sm:pl-17" : ""}
                `}
              >
                {pill}
              </span>
            </motion.div>}
          </div>

          {/* MAP — right-anchored; bleeds left beneath the content from lg up.
              Top, bottom and right edges feather out; the left edge stays solid
              (it tucks under the cards). Two linear masks intersected. */}
          <motion.div
            variants={fromRight}
            custom={0.3}
            className="relative z-0 mt-10 ml-auto w-full lg:mt-0 lg:w-[64%]"
          >
            <Image
              src={mapImage}
              alt="Isometric view of a construction project with people, operations, movement and workforce zones mapped in real time"
              width={708}
              height={528}
              priority
              sizes="(max-width: 1024px) 100vw, 70vw"
              className="h-auto w-full"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
              }}
            />
            {/* Left readability scrim — lg only; keeps the detail copy legible while
                still letting the map show softly through the glass cards */}
            {/* <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 hidden w-[60%] lg:block"
              style={{
                // background:
                //   "linear-gradient(90deg,rgba(245,251,255,0.85) 0%,rgba(245,251,255,0.35) 42%,rgba(245,251,255,0) 68%)",
              }}
            /> */}
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
