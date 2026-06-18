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

// Right-hand glowing tower — eases in from the right + soft scale.
const fromRight: Variants = {
  hidden: { opacity: 0, x: 48, scale: 0.96 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE, delay },
  }),
};

type Feature = {
  /** Glass-badge icon. Left as a path — supply the asset under /icons later. */
  icon: string;
  label: string;
  /** Isometric scene shown inside the tile. Supply the asset later. */
  image: string;
};

type PostConstructionTransitionContent = {
  heading?: string;
  intro?: string;
  pill?: string;
  features?: Feature[];
  panelTitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Glowing isometric tower visual for the right panel. Supply later. */
  panelImage?: string;
};

const ICON_BASE = "/pre-construction/post-construction/badges";
const SCENE_BASE = "/pre-construction/post-construction/icons";

const DEFAULT_FEATURES: Feature[] = [
  {
    icon: `${ICON_BASE}/worker-identities.png`,
    label: "Worker identities",
    image: `${SCENE_BASE}/worker-identities.png`,
  },
  {
    icon: `${ICON_BASE}/asset-registry.png`,
    label: "Asset registry",
    image: `${SCENE_BASE}/asset-registry.png`,
  },
  {
    icon: `${ICON_BASE}/vendor-records.png`,
    label: "Vendor records",
    image: `${SCENE_BASE}/vendor-records.png`,
  },
  {
    icon: `${ICON_BASE}/as-built-data.png`,
    label: "As-built data",
    image: `${SCENE_BASE}/as-built-data.png`,
  },
  {
    icon: `${ICON_BASE}/access-security.png`,
    label: "Access and security policies",
    image: `${SCENE_BASE}/access-security.png`,
  },
];

// Diagonal chamfer on the top-right AND bottom-left corners. CHAMFER is the
// perpendicular inset of each 45° cut in px (each leg of the notch ≈ CHAMFER × √2).
// A mask is used instead of clip-path so the other two corners keep their
// border-radius; the soft outer shadow lives on a wrapper `drop-shadow` filter,
// which follows the masked (chamfered) alpha. The two corner gradients are
// composited with `intersect` so the alpha is clipped at BOTH corners (a single
// gradient can only notch one).
const CHAMFER = 30;
const CHAMFER_MASK = [
  `linear-gradient(225deg, transparent 0 ${CHAMFER}px, #000 ${CHAMFER + 1}px)`, // top-right
  `linear-gradient(45deg, transparent 0 ${CHAMFER}px, #000 ${CHAMFER + 1}px)`, // bottom-left
].join(", ");

// ─── Sub-components ──────────────────────────────────────────────────────────

function FeatureCard({
  icon,
  label,
  image,
  delay,
}: Readonly<Feature & { delay: number }>) {
  return (
    <motion.div
      variants={cardIn}
      custom={delay}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="relative w-65 max-w-full"
      // Soft outer shadow — on the wrapper so drop-shadow traces the chamfer.
      style={{ filter: "drop-shadow(0 22px 38px rgba(135,160,190,0.16))" }}
    >
      {/* Floating icon badge — straddles the card's top edge: half above the
          card, half inside. It lives OUTSIDE the masked card so its upper half
          isn't clipped by the chamfer mask. */}
      <span
        className="absolute left-4 top-0 z-20 inline-flex shrink-0 -translate-y-1/2 items-center justify-center rounded-xl border-[1.45px] border-white px-[7.5px] py-[2.5px]"
        style={{
          background: "linear-gradient(180deg, #CCE5FF 0%, #FFFFFF 100%)",
          boxShadow: "0 1.16px 2.31px 0 rgba(0,0,0,0.05)",
        }}
      >
        <Image
          src={icon}
          alt=""
          width={35}
          height={35}
          unoptimized
          className="h-10 w-auto object-contain"
        />
      </span>

      <div
        className="relative flex h-65 w-full flex-col gap-3 p-4 pt-8"
        style={{
          background: "linear-gradient(180deg,#F8FBFE 0%,#F2F6FB 100%)",
          borderRadius: 24,
          maskImage: CHAMFER_MASK,
          WebkitMaskImage: CHAMFER_MASK,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
          // Inner top highlight — the soft neumorphic rim.
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        {/* Label */}
        <span className="text-[15px] font-bold leading-tight text-[#2E7DA8]">
          {label}
        </span>

        {/* Illustration — floats directly on the card over a soft floor glow.
            Fills the leftover height inside the fixed 260px box. */}
        <div className="relative mt-1 w-full flex-1 min-h-0">
          <div className="pointer-events-none absolute inset-x-3 bottom-2 h-1/3 rounded-[50%] bg-[radial-gradient(60%_100%_at_50%_100%,rgba(124,135,210,0.16)_0%,transparent_70%)] blur-md" />
          <Image
            src={image}
            alt={label}
            fill
            unoptimized
            sizes="(max-width: 1024px) 40vw, 200px"
            className="object-contain"
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function PostConstructionTransition({
  content = {},
}: Readonly<{ content?: PostConstructionTransitionContent }> = {}) {
  const {
    heading = "No Re-onboarding, No data loss, Just continuity.",
    intro = "Data collected during construction doesn't disappear it becomes the foundation for long-term operational control.",
    pill = "TRANSITION TO POST-CONSTRUCTION",
    features = DEFAULT_FEATURES,
    panelTitle = "With V-Watch Ai, everything transitions seamlessly into post-construction operations",
    ctaLabel = "Explore Post-Construction (Aegis)",
    ctaHref = "#",
    panelImage = "/pre-construction/post-construction/transition-tower.png",
  } = content;

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative z-10 overflow-hidden bg-[#f5fbff] px-6 py-14 lg:px-15 lg:py-16">
        <motion.div
          className="mx-auto w-full max-w-[1320px]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Header row — heading + intro on the left, pill on the right. */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <div className="max-w-[733px]">
              <motion.h2
                variants={wipeDown}
                custom={0.05}
                className="text-[22px] font-bold leading-none text-[#0A4B6E] sm:text-[26px]"
              >
                {heading}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={0.2}
                className="mt-2 font-lato text-[20px] font-normal leading-7 tracking-normal text-[#0A4B6E]"
              >
                {intro}
              </motion.p>
            </div>

            {/* Pill — pale glass chip; gradient text with a 6px gradient accent
                bar pinned flush to the right edge (Figma: 44px tall, radius
                TL/BL 10px · TR/BR 4px, padding L20 / R14). */}
            <motion.div
              variants={fadeUp}
              custom={0.3}
              className="inline-flex h-11 w-fit shrink-0 items-center self-start overflow-hidden rounded-l-[10px] rounded-r-[4px] pl-5"
              style={{
                background:
                  "linear-gradient(90deg, rgba(33,177,241,0.10) 0%, rgba(197,235,76,0.10) 100%)",
              }}
            >
              <span
                className="bg-clip-text pr-3.5 font-lato text-[20px] font-bold leading-none tracking-normal text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #7ECFFA 0%, #3890C0 100%)",
                }}
              >
                {pill}
              </span>
              <span className="w-1.5 self-stretch bg-[linear-gradient(180deg,#21B1F1_0%,#C5EB4C_100%)]" />
            </motion.div>
          </div>

          {/* Card field with the glass panel woven behind the right column.
              On lg the panel spans the full height on the right (z-0) while the
              cards sit in front (z-10); the top-right grid cell is left open so
              the panel's copy shows through, and the Access card overlays the
              panel's lower-left — mirroring the Figma. */}
          <div className="relative mt-10">
            {/* Feature cards — row 1 holds two cards, row 2 holds three, with a
                uniform 30px gap. Row 1 stops at two so the panel occupies the open
                top-right, and the third card in row 2 nests into the panel's
                chamfered bottom-left corner. */}
            <div className="relative z-10 flex flex-col gap-7.5">
              {/* Row 1 — two cards */}
              <div className="flex flex-wrap gap-7.5">
                <FeatureCard {...features[0]} delay={0.45} />
                <FeatureCard {...features[1]} delay={0.55} />
              </div>
              {/* Row 2 — three cards */}
              <div className="flex flex-wrap gap-7.5">
                <FeatureCard {...features[2]} delay={0.65} />
                <FeatureCard {...features[3]} delay={0.75} />
                <FeatureCard {...features[4]} delay={0.85} />
              </div>
            </div>

            {/* PANEL — stacked below the grid on mobile; from lg up it bleeds in
                from the right and runs the full height behind the cards (z-0).
                The wrapper carries the soft shadow as a `drop-shadow` filter so it
                traces the chamfered bottom-left corner of the inner glass — the
                notch the "Access and security policies" card nests into (Figma
                580×580). */}
            <motion.div
              variants={fromRight}
              custom={0.5}
              className="relative mt-6 w-full lg:absolute lg:inset-y-0 lg:left-145 lg:right-[-1.5%] lg:z-0 lg:mt-0 lg:w-auto"
              style={{ filter: "drop-shadow(0 26px 50px rgba(20,46,92,0.20))" }}
            >
              {/* Inner glass — rounded on three corners, 45° chamfer at the
                  bottom-left (lg only; on mobile the panel is too short to notch). */}
              <div
                className="relative w-full overflow-hidden rounded-[24px] lg:absolute lg:inset-0 lg:[mask-image:linear-gradient(45deg,transparent_0_160px,#000_161px)] lg:[-webkit-mask-image:linear-gradient(45deg,transparent_0_160px,#000_161px)]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(231,240,251,0.9) 0%, rgba(214,228,247,0.6) 100%)",
                  border: "1px solid rgba(255,255,255,0.6)",
                }}
              >
                {/* Glowing tower — fills the panel, anchored to the bottom-right. */}
                <div className="pointer-events-none absolute bottom-0 right-0 z-0 h-[88%] w-[80%]">
                  <Image
                    src={panelImage}
                    alt="Post-construction operations tower"
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 70vw, 460px"
                    className="object-contain object-bottom-right"
                  />
                </div>

                {/* Copy + CTA — anchored top-left of the panel. Width tuned so the
                    heading wraps to two lines, matching the Figma. */}
                <div className="relative z-10 max-w-[88%] p-6 lg:max-w-135 lg:p-8">
                  <p className="font-lato text-[20px] font-bold leading-8 tracking-normal text-[#0A4B6E]">
                    {panelTitle}
                  </p>
                  <a
                    href={ctaHref}
                    className="mt-5 inline-flex items-center rounded-full bg-white px-5 py-2.5 shadow-[0px_14px_34px_-16px_rgba(20,46,92,0.45)] transition-transform hover:-translate-y-0.5"
                  >
                    {/* Gradient text fill — blue→green (Figma). The gradient sits
                        on the span, not the pill, so the white background stays. */}
                    <span
                      className="bg-clip-text text-[18px] font-bold leading-none tracking-normal text-transparent"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, #21B1F1 0%, #A6C936 100%)",
                      }}
                    >
                      {ctaLabel}
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
