"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Shared scroll-reveal viewport (matches the site-visibility page + FeatureGrid):
// the band must be 30% visible AND 80px past the bottom edge before it animates,
// so content never reveals before it's actually scrolled into view.
const VIEWPORT = { once: true, amount: 0.3, margin: "0px 0px -80px 0px" } as const;

// Reveal timeline (seconds): the dark band shows first, then the header,
// then the tiles row by row (all 3 of row 1 together, then both of row 2),
// and the bottom pill last.
const HEADER_DELAY = 0.25;
const CARDS_START = 0.55;
const ROW_STAGGER = 0.2;
const PILL_DELAY = CARDS_START + 2 * ROW_STAGGER + 0.15;

// `custom` is the per-element delay in seconds.
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE, delay },
  }),
};

// Opacity-only: the band's background is a large filtered SVG — translating
// it during the reveal forces full re-composites every frame, so it only
// fades.
const bandIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: EASE } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
};

// "Built for complex operational environments" — a full-bleed dark card with a
// 3 + 2 grid of industry photo tiles. (Figma node 219:1532)
type Industry = { name: string; img: string; desc: string; wide?: boolean; href?: string };

const ROW_1: Industry[] = [
  {
    name: "Construction",
    img: "/home/ind-construction.webp",
    href: "/industries/construction",
    desc: "Manage large, multi-contractor environments with full visibility across workforce, compliance, and site operations ensuring safety, coordination, and accountability at every stage of the project.",
  },
  {
    name: "Industrial & Energy",
    img: "/home/ind-industrial.webp",
    href: "/industries/industrial-energy",
    desc: "Operate safely in high-risk environments with real-time tracking, restricted zone monitoring, and instant response capabilities reducing risk while maintaining strict compliance.",
  },
  {
    name: "Commercial & Facilities",
    img: "/home/ind-commercial.webp",
    href: "/industries/commercial-facilities",
    desc: "Streamline building operations, enhance access control, and manage maintenance and workforce activities efficiently across offices, retail spaces, and multi-site facilities.",
  },
];

const ROW_2: Industry[] = [
  {
    name: "Data Centers",
    img: "/home/ind-datacenter.webp",
    wide: true,
    desc: "Maintain strict security and operational control in mission-critical environments — ensuring only authorized access while monitoring workforce activity and operational workflows with precision.",
  },
  {
    name: "Logistics & Warehousing",
    img: "/home/ind-logistics.webp",
    wide: true,
    desc: "Track movement of personnel and assets, optimize workflows, and improve coordination in fast-paced environments where efficiency and accuracy are essential.",
  },
];

function IndustryTile({
  name,
  img,
  desc,
  href,
  row,
  showLearnMore = false,
}: Readonly<Industry & { row: number; showLearnMore?: boolean }>) {
  // Shared "Learn More" affordance. On laptop (lg+) this is the ONLY thing that
  // navigates; below lg the whole-tile overlay link handles taps instead.
  const learnMoreInner = (
    <>
      Learn More
      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/60 transition-colors duration-300 group-hover/btn:border-white group-hover/btn:bg-white group-hover/btn:text-[#0A1A2F]">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M3.6 8.4 8.4 3.6M4.5 3.6h3.9v3.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </>
  );
  const learnMoreClass =
    "group/btn mt-2.5 inline-flex cursor-pointer items-center gap-2 text-[13px] font-bold text-white transition-all duration-300 hover:gap-3";

  return (
    // Motion wrapper carries the scroll reveal; the inner element keeps the CSS
    // hover scale so it doesn't fight Motion's inline transform.
    <motion.div
      variants={cardItem}
      custom={CARDS_START + row * ROW_STAGGER}
      className="w-full"
    >
      <div className="group relative h-[300px] w-full overflow-hidden rounded-[24px] transition-transform duration-300 ease-out hover:scale-[1.02] sm:h-[320px]">
        <Image
          src={img}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(min-width: 1024px) 555px, 100vw"
        />

        {/* Resting state: bottom scrim + name — fade out on hover */}
        <div className="absolute inset-x-0 bottom-0 h-[135px] bg-gradient-to-b from-transparent to-black/80 transition-opacity duration-300 group-hover:opacity-0" />
        <p className="absolute bottom-6 left-6 text-[20px] font-bold tracking-[-0.5px] text-white transition-opacity duration-300 group-hover:opacity-0">
          {name}
        </p>

        {/* Hover state: frosted glass card anchored near the bottom; wipes in
            from bottom → top on hover (clip-path inset reveal). */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-end justify-center p-4">
          <div className="pointer-events-auto w-[90%] max-w-[700px] rounded-[14px] border border-white/30 bg-black/40 backdrop-blur-[3px] p-6 transition-[clip-path] duration-500 ease-out [clip-path:inset(100%_0_0_0_round_14px)] group-hover:[clip-path:inset(0_0_0_0_round_14px)]">
            <h3 className="text-[20px] font-bold tracking-[-0.5px] text-white">{name}</h3>
            <p className="mt-1.5 line-clamp-3 text-[16px] font-normal leading-[17px] text-white/90 sm:line-clamp-4">{desc}</p>
            {/* "Learn More" only appears when the card has a real destination
                page. Data Centers and Logistics & Warehousing have no dedicated
                page yet, so they show the hover card (name + description) without
                a misleading, non-navigating "Learn More". */}
            {showLearnMore && href && (
              <Link href={href} className={learnMoreClass}>
                {learnMoreInner}
              </Link>
            )}
          </div>
        </div>

        {/* Mobile → tablet: the whole tile is the tap target. Hidden on laptop
            (lg+), where navigation is handled by "Learn More" above. */}
        {href && (
          <Link
            href={href}
            aria-label={name}
            className="absolute inset-0 z-10 lg:hidden"
          />
        )}
      </div>
    </motion.div>
  );
}

export default function Industries() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="bg-white">
        <motion.div
          className="relative w-full overflow-hidden rounded-[40px]"
          variants={bandIn}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {/* background texture + glow */}
          <Image
            src="/home/industries_bg.webp"
            alt=""
            fill
            className="object-cover object-[center_90%]"
            sizes="100vw"
          />

          {/* The band itself is full-bleed, but its content sits in the same
              rail as every other home section (max-w-[1410px] inside a 60px
              gutter → 1410 + 2 × 60 here) so the heading starts on the same
              vertical line as FeatureGrid / BuiltToScale at any viewport. */}
          <div className="relative mx-auto flex w-full max-w-[1530px] flex-col gap-[30px] px-6 py-12 lg:px-[60px] lg:py-[61px]">
            <motion.div
              variants={fadeUp}
              custom={HEADER_DELAY}
              className="flex max-w-[959px] flex-col gap-2.5 text-white"
            >
              <h2 className="text-[26px] font-bold leading-[44px]">
                Built for complex operational environments
              </h2>
              <p className="text-[20px] font-normal leading-[30px]">
                V-Watch AI is designed to adapt across industries where visibility, security, and
                operational efficiency are critical. While each environment is different, the need for
                real-time control and automation remains the same.
              </p>
            </motion.div>

            {/* grid */}
            <div className="flex flex-col gap-[30px]">
              <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-3">
                {ROW_1.map((ind) => (
                  <IndustryTile key={ind.name} {...ind} row={0} showLearnMore />
                ))}
              </div>
              <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2">
                {ROW_2.map((ind) => (
                  <IndustryTile key={ind.name} {...ind} row={1} showLearnMore />
                ))}
              </div>
            </div>

            {/* bottom unifying pill */}
            <motion.div
              variants={fadeUp}
              custom={PILL_DELAY}
              className="flex items-center justify-center gap-4 rounded-[30px] border border-[rgba(233,238,255,0.35)] bg-[linear-gradient(90deg,#063043_0%,#063043_24%,rgba(6,48,67,0.3)_52%,#063043_76%,#063043_100%)] px-4 py-4 lg:h-[60px] lg:px-2.5 lg:py-0">
            <span className="hidden flex-1 items-center lg:flex">
              <span className="h-0.5 flex-1 rounded-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.7)_100%)]" />
              <span className="size-1.5 shrink-0 rounded-full bg-white" />
            </span>
            <p className="text-center text-[16px] font-normal leading-[23px] text-white lg:whitespace-nowrap lg:text-[20px]">
              No matter the industry, V-Watch AI brings visibility, automation, and control into one
              unified system.
            </p>
              <span className="hidden flex-1 items-center lg:flex">
                <span className="size-1.5 shrink-0 rounded-full bg-white" />
                <span className="h-0.5 flex-1 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.7)_0%,transparent_100%)]" />
              </span>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
