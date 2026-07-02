"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
    image: `${SCENE_BASE}/worker-identities.svg`,
  },
  {
    icon: `${ICON_BASE}/asset-registry.png`,
    label: "Asset registry",
    image: `${SCENE_BASE}/asset-registry.svg`,
  },
  {
    icon: `${ICON_BASE}/vendor-records.png`,
    label: "Vendor records",
    image: `${SCENE_BASE}/vendor-records.svg`,
  },
  {
    icon: `${ICON_BASE}/as-built-data.png`,
    label: "As-built data",
    image: `${SCENE_BASE}/as-built-data.svg`,
  },
  {
    icon: `${ICON_BASE}/access-security.png`,
    label: "Access and security policies",
    image: `${SCENE_BASE}/access-security.svg`,
  },
];

// Diagonal chamfer on the top-right AND bottom-left corners. CHAMFER is the
// perpendicular inset of each 45° cut in px. A mask is used instead of clip-path
// so the other two corners keep their border-radius; the two corner gradients
// are composited with `intersect` so the alpha is clipped at BOTH corners.
const CHAMFER = 30;
// Top-right AND bottom-left corners are chamfered on each feature card.
// Two linear-gradient masks are composited with `intersect` so both cuts apply.
const CHAMFER_MASK_TR = `linear-gradient(225deg, transparent 0 ${CHAMFER}px, #000 ${CHAMFER + 1}px)`;
const CHAMFER_MASK_BL = `linear-gradient(55deg, transparent 0 ${CHAMFER}px, #000 ${CHAMFER + 1}px)`;
const CHAMFER_MASK = `${CHAMFER_MASK_TR}, ${CHAMFER_MASK_BL}`;

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
      className="relative w-65 max-w-full lg:pointer-events-auto"
      // Soft outer shadow — on the wrapper so drop-shadow traces the chamfer.
      style={{ filter: "drop-shadow(0 22px 38px rgba(135,160,190,0.16))" }}
    >
      {/* Floating icon badge — straddles the card's top edge: half above the
          card, half inside. It lives OUTSIDE the masked card so its upper half
          isn't clipped by the chamfer mask. */}
      <span
        className="absolute left-4 top-0 z-20 inline-flex size-15 shrink-0 -translate-y-1/2 items-center justify-center rounded-[18.52px] border-[1.45px] border-white"
        style={{
          background: "linear-gradient(180deg, #CCE5FF 0%, #FFFFFF 100%)",
          boxShadow: "0 1.16px 2.31px 0 rgba(0,0,0,0.05)",
        }}
      >
        <Image
          src={icon}
          alt=""
          width={36}
          height={36}
          unoptimized
          className="h-9 w-auto object-contain"
        />
      </span>

      <div
        className="relative flex h-65 w-full flex-col gap-3 p-4 pt-8"
        style={{
          background: "linear-gradient(to top, rgb(235, 248, 255) 0%, rgb(247, 248, 255) 100%)",
          borderRadius: 24,
          maskImage: CHAMFER_MASK,
          WebkitMaskImage: CHAMFER_MASK,
          maskComposite: "intersect",
          WebkitMaskComposite: "destination-in",
          // Inner top highlight — the soft neumorphic rim.
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        {/* Label */}
        <span className="text-[15px] font-bold leading-tight text-[#2E7DA8]">
          {label}
        </span>

        {/* Illustration — extends to left, right, and bottom card edges. */}
        <div className="relative mt-1 flex-1 min-h-0 overflow-hidden -mx-2 -mb-2">
          <Image
            src={image}
            alt={label}
            fill
            unoptimized
            sizes="(max-width: 1024px) 40vw, 200px"
            className="object-contain object-bottom mix-blend-multiply"
            style={{ transform: "scale(1.3) translateX(0px) translateY(10px)" }}
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
    heading = "",
    intro = "",
    features = DEFAULT_FEATURES,
    panelTitle = "With V-Watch AI, everything transitions seamlessly into post-construction operations",
    ctaLabel,
    ctaHref,
    panelImage = "/pre-construction/post-construction/transition-tower.svg",
  } = content;

  // Toggle target + label: from the post-construction page link back to
  // pre-construction, otherwise (e.g. the pre-construction page) link forward to
  // post-construction. Explicit `ctaHref` / `ctaLabel` from content always win.
  const pathname = usePathname();
  const onPostConstruction =
    pathname?.startsWith("/post-construction") ?? false;
  const ctaTarget =
    ctaHref ??
    (onPostConstruction ? "/pre-construction" : "/post-construction");
  const resolvedLabel =
    ctaLabel ??
    (onPostConstruction
      ? "Explore Pre-Construction (Atlas)"
      : "Explore Post-Construction (Aegis)");

  return (
    <MotionConfig reducedMotion="user">
      <section className="mx-auto max-w-[1280px] relative z-10 overflow-hidden bg-[#f5fbff] px-6 py-14 lg:px-15 lg:py-16">
        <motion.div
          className="mx-auto w-full max-w-full"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Header row — heading + intro on the left, CTA button on the right. */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-[733px]">
              <motion.h2
                variants={wipeDown}
                custom={0.05}
                className="font-lato text-[26px] font-bold leading-none text-[#0A4B6E]"
              >
                {heading || "No Re-onboarding, No data loss, Just continuity."}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={0.2}
                className="mt-2 font-lato text-[20px] font-normal leading-7 tracking-normal text-[#0A4B6E]"
              >
                {intro || "Data collected during construction doesn\u2019t disappear it becomes the foundation for long-term operational control."}
              </motion.p>
            </div>

            {/* CTA button — gradient pill matching the site's demo button style */}
            <motion.div variants={fadeUp} custom={0.3} className="shrink-0 self-start lg:self-center">
              <Link
                href={ctaTarget}
                className="inline-flex h-11 items-center gap-2.5 rounded-full px-5 text-sm font-bold text-white shadow-[0px_2.5px_8.7px_rgba(13,97,31,0.10),0px_9.9px_31px_rgba(12,75,26,0.10)] transition-transform hover:-translate-y-0.5"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgb(33,177,241) 20.69%, rgb(166,201,54) 151.72%)",
                }}
              >
                {/* Arrow icon */}
                <span className="flex size-8 items-center justify-center rounded-full bg-white">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M5 11l6-6M5 5h6v6" stroke="#21B1F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="font-lato text-[16px] font-bold leading-none">
                  {resolvedLabel}
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Card field with the glass panel woven behind the right column.
              On lg the panel spans the full height on the right (z-0) while the
              cards sit in front (z-10); the top-right grid cell is left open so
              the panel's copy shows through, and the Access card overlays the
              panel's lower-left — mirroring the Figma. */}
          <div className="relative mt-20">
            {/* Feature cards — row 1 holds two cards, row 2 holds three. Within a
                row the gap is 30px (gap-7.5). Between rows it's 60px (gap-15): the
                lower row's icon badges float up 30px past their cards, so the extra
                30px keeps a true 30px clear gap between the rows. Row 1 stops at two
                so the panel occupies the open top-right, and the third card in row 2
                nests into the panel's chamfered bottom-left corner. */}
            {/* lg: let clicks in the empty card area fall through to the panel
                CTA behind it (the cards re-enable their own pointer events). */}
            <div className="relative z-10 flex flex-col gap-15 lg:pointer-events-none">
              {/* Row 1 — two cards */}
              <div className="flex flex-wrap justify-center gap-7.5 lg:justify-start">
                <FeatureCard {...features[0]} delay={0.45} />
                <FeatureCard {...features[1]} delay={0.55} />
              </div>
              {/* Row 2 — on mobile & desktop shows 3 cards; on tablet the
                  5th card is hidden here (shown with the panel instead). */}
              <div className="flex flex-wrap justify-center gap-7.5 lg:justify-start">
                <FeatureCard {...features[2]} delay={0.65} />
                <FeatureCard {...features[3]} delay={0.75} />
                {/* 5th card in grid — hidden on tablet (md), visible on mobile & lg+ */}
                <motion.div variants={cardIn} custom={0.85} className="relative md:hidden lg:block lg:pointer-events-auto">
                  <div
                    className="pointer-events-none absolute hidden lg:block -z-10"
                    style={{
                      top: -17,
                      left: 0,
                      right: -17,
                      bottom: 0,
                      background: "rgb(235, 241, 247)",
                      borderBottomLeftRadius: 24,
                      maskImage: CHAMFER_MASK_TR,
                      WebkitMaskImage: CHAMFER_MASK_TR,
                    }}
                  />
                  <div
                    className="pointer-events-none absolute hidden lg:block -z-10"
                    style={{
                      top: -43,
                      left: 5,
                      width: 85,
                      height: 50,
                      background: "rgb(235, 241, 247)",
                      borderRadius: "25px 25px 0 0",
                    }}
                  />
                  <FeatureCard {...features[4]} delay={0.85} />
                </motion.div>
              </div>
            </div>

            {/* PANEL + 5th card group — on tablet they stack together below
                the first 4 cards; on lg the panel is absolutely positioned
                behind the card grid with the 5th card overlapping. */}
            <motion.div
              variants={fromRight}
              custom={0.5}
              className="relative mt-6 flex w-full flex-col md:min-h-[500px] lg:absolute lg:inset-y-0 lg:left-145 lg:right-[-1.5%] lg:z-0 lg:mt-0 lg:min-h-0 lg:w-auto"
              style={{ filter: "drop-shadow(0 26px 50px rgba(20,46,92,0.20))" }}
            >
              {/* Inner glass */}
              <div
                className="relative flex w-full flex-1 flex-col overflow-hidden rounded-[24px] lg:absolute lg:inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(231,240,251,0.9) 0%, rgba(214,228,247,0.6) 100%)",
                  border: "1px solid rgba(255,255,255,0.6)",
                }}
              >
                {/* Glowing tower — fills the entire panel. */}
                <div className="pointer-events-none absolute inset-0 z-0">
                  <Image
                    src={panelImage}
                    alt="Post-construction operations tower"
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 70vw, 460px"
                    className="object-cover object-center"
                    style={{ transform: "scale(1.1)" }}
                  />
                </div>

                {/* Copy — anchored top-left of the panel. */}
                <div className="relative z-10 max-w-[88%] p-6 lg:max-w-135 lg:p-8">
                  <p className="font-lato text-[20px] font-bold leading-8 tracking-normal text-[#0A4B6E]">
                    {panelTitle}
                  </p>
                </div>

                {/* 5th card — inside the panel on tablet only.
                    Hidden on mobile (<md) and desktop (lg+). */}
                <motion.div
                  variants={cardIn}
                  custom={0.85}
                  className="relative z-10 mb-0 ml-0 mt-auto hidden w-65 max-w-[70%] md:block lg:hidden"
                >
                  <div
                    className="pointer-events-none absolute -z-10"
                    style={{
                      top: -20,
                      left: 0,
                      right: -15,
                      bottom: 0,
                      background: "rgb(235, 241, 247)",
                      borderBottomLeftRadius: 24,
                      maskImage: CHAMFER_MASK_TR,
                      WebkitMaskImage: CHAMFER_MASK_TR,
                    }}
                  />
                  {/* Bump — rises upward around the badge icon. */}
                  <div
                    className="pointer-events-none absolute -z-10"
                    style={{
                      top: -43,
                      left: 5,
                      width: 85,
                      height: 50,
                      background: "rgb(235, 241, 247)",
                      borderRadius: "25px 25px 0 0",
                    }}
                  />
                  <FeatureCard {...features[4]} delay={0.85} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
