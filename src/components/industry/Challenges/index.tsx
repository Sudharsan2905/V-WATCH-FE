"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Reveal timeline (seconds): header → cards one by one → toggle cluster →
// connector rails drawing in last.
const CARDS_START = 0.25;
const CARD_STAGGER = 0.15;
const TOGGLE_DELAY = 1.05;
const RINGS_DELAY = 1.15;
const CALLOUT_DELAY = 1.25;
const RAILS_DELAY = 1.5;

// `custom` is the per-element delay in seconds.
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay },
  }),
};

// Connector rails draw in along their length.
const railDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: RAILS_DELAY, duration: 0.8, ease: "easeInOut" },
      opacity: { delay: RAILS_DELAY, duration: 0.2 },
    },
  },
};

type Challenge = {
  title: string;
  desc: string;
  icon: string;
  iconW: number;
  iconH: number;
};

const CHALLENGES: Challenge[] = [
  {
    title: "Blind Visibility",
    desc: "Limited real-time visibility of people and activity.",
    icon: "/industry/challenges/blind-visibility.svg",
    iconW: 32,
    iconH: 27,
  },
  {
    title: "Tracking Burden",
    desc: "Compliance requirements that are difficult to track.",
    icon: "/industry/challenges/tracking-burden.svg",
    iconW: 27,
    iconH: 22,
  },
  {
    title: "System Fragmentation",
    desc: "Disconnected systems across teams and functions.",
    icon: "/industry/challenges/system-fragmentation.svg",
    iconW: 29,
    iconH: 29,
  },
  {
    title: "Critical Delays",
    desc: "Delayed response to incidents and risks.",
    icon: "/industry/challenges/critical-delays.svg",
    iconW: 28,
    iconH: 28,
  },
  {
    title: "Data Misalignment",
    desc: "Workforce and operational data that don't align.",
    icon: "/industry/challenges/data-misalignment.svg",
    iconW: 32,
    iconH: 32,
  },
];

function ChallengeCard({
  title,
  desc,
  icon,
  iconW,
  iconH,
  index,
}: Readonly<Challenge & { index: number }>) {
  return (
    <motion.div
      variants={cardItem}
      custom={CARDS_START + index * CARD_STAGGER}
      className="relative z-10 h-[171px] w-[314px] shrink-0"
    >
      {/* Title card — behind, peeks below-right */}
      <div
        className="absolute left-[34px] top-[78px] flex h-[93px] w-[280px] flex-col justify-end rounded-[14px] px-4 pb-4 pt-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(233, 238, 255, 0.40) 0%, rgba(193, 236, 255, 0.40) 100%), white",
          boxShadow:
            "10px -16px 52px rgba(153, 224, 255, 0.18), 6px 10px 23px rgba(217, 226, 255, 0.85), -40px 14px 250px rgba(184, 230, 255, 0.20), 9px 7px 60px rgba(255, 255, 255, 0.40)",
          outlineOffset: "-1px",
        }}
      >
        <p className="text-[18px] font-bold text-[#0f172a]">{title}</p>
      </div>

      {/* Description card — in front */}
      <div
        className="absolute left-0 top-[24px] flex h-[98px] w-[280px] items-end overflow-hidden rounded-[16px] px-[19px] py-5"
        style={{
          background: "rgba(255, 247, 244, 0.20)",
          boxShadow:
            "0px 13px 100px rgba(199, 199, 199, 0.25), 0px 0px 24px rgba(255, 107, 107, 0.14) inset",
          outline: "2px rgba(255, 255, 255, 0.60) solid",
          outlineOffset: "-2px",
        }}
      >
        <p className="text-[18px] leading-[22px] text-[#314158]">{desc}</p>
      </div>

      {/* Icon badge — top-left, above both cards */}
      <div
        className="absolute left-[13px] top-0 flex size-12 items-center justify-center rounded-[14px] backdrop-blur-[2px]"
        style={{
          background: "rgba(222, 239, 255, 0.10)",
          outline: "1.5px white solid",
          outlineOffset: "-1.5px",
        }}
      >
        <Image
          src={icon}
          alt=""
          width={iconW}
          height={iconH}
          unoptimized
          className="object-contain"
        />
      </div>
    </motion.div>
  );
}

/**
 * Thin connector vector (exact export from Figma — do not modify the paths).
 * It links each card pair with a ⊔ bracket and routes the trunk lines into the
 * toggle. Its own origin sits ~165px right of the card column's left edge, so
 * the parent positions it at left:165 / top:171 (bottom edge of row 1); the
 * trunk's natural endpoint (854, 87) then lands at the toggle past card 3.
 */
function ChallengeConnectors({ className }: { className?: string }) {
  return (
    <svg
      width="855"
      height="281"
      viewBox="0 0 855 281"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g opacity="0.6">
        <motion.path
          variants={railDraw}
          d="M1 0V22.5C1 31.3366 8.16344 38.5 17 38.5H343C351.837 38.5 359 31.3366 359 22.5V3.5"
          stroke="#E08665"
          strokeOpacity="0.6"
          strokeWidth="2"
        />
        <motion.path
          variants={railDraw}
          d="M359 0V22.5C359 31.3366 366.163 38.5 375 38.5H701C709.837 38.5 717 31.3366 717 22.5V3.5"
          stroke="#E08665"
          strokeOpacity="0.6"
          strokeWidth="2"
        />
        <motion.path
          variants={railDraw}
          d="M1 220V242.5C1 251.337 8.16344 258.5 17 258.5H343C351.837 258.5 359 251.337 359 242.5V223.5"
          stroke="#E08665"
          strokeOpacity="0.6"
          strokeWidth="2"
        />
        <motion.path
          variants={railDraw}
          d="M179 39V53C179 61.8366 186.163 69 195 69H593L772 69C776.971 69 781 73.0294 781 78C781 82.9706 785.029 87 790 87H854.5"
          stroke="#E08665"
          strokeOpacity="0.6"
          strokeWidth="2"
        />
        <motion.path
          variants={railDraw}
          d="M533 38V53C533 61.8366 540.163 69 549 69L772 69C776.971 69 781 73.0294 781 78C781 82.9706 785.029 87 790 87H854"
          stroke="#E08665"
          strokeOpacity="0.6"
          strokeWidth="2"
        />
        <motion.path
          variants={railDraw}
          d="M180 259.5V264C180 272.837 187.163 280 196 280H560C568.837 280 576 272.837 576 264V119.5C576 110.663 583.163 103.5 592 103.5H772.75C777.306 103.5 781 99.8063 781 95.25C781 90.6937 784.694 87 789.25 87H834.5"
          stroke="#E08665"
          strokeOpacity="0.6"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}

function ToggleDial() {
  return (
    <div className="relative flex h-[100px] w-[142px] shrink-0 items-center justify-center">
      {/* Outer halo */}
      <div
        className="absolute"
        style={{
          width: 141.92,
          height: 100.18,
          borderRadius: 67.74,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.06) 100%)",
        }}
      />
      {/* Middle halo */}
      <div
        className="absolute"
        style={{
          width: 116.12,
          height: 75.14,
          borderRadius: 38.71,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.16) 100%)",
          boxShadow: "0px 2.15px 12.9px rgba(29, 108, 151, 0.10)",
          borderTop: "0.81px rgba(255,255,255,0.02) solid",
        }}
      />
      {/* Inner halo */}
      <div
        className="absolute"
        style={{
          width: 103.22,
          height: 62.61,
          borderRadius: 38.71,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.30) 0%, white 100%)",
          boxShadow: "0px 2.15px 12.9px rgba(29, 108, 151, 0.24)",
          borderTop: "0.81px rgba(255,255,255,0.04) solid",
        }}
      />
      {/* Toggle switch — ON state (knob on right) */}
      <div
        className="relative flex items-center justify-end"
        style={{
          width: 90,
          height: 50,
          borderRadius: 27.05,
          background: "linear-gradient(120deg, #E86C5C 0%, #97351D 100%)",
          padding: "3px",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 19.35,
            background: "white",
            flexShrink: 0,
          }}
        />
      </div>
    </div>
  );
}

/**
 * Concentric dotted rings that sit behind the toggle (exact arc geometry from
 * Figma). Three circles centered at (137, 144) — radii ~143 / 118 / 88 — that
 * fade inward; the dotted look is rendered with a fine round-capped dash.
 */
function ToggleRings({ className }: { className?: string }) {
  const outer =
    "M-6.44434 143.938C-6.44434 115.629 1.95001 87.9563 17.6775 64.4185C33.405 40.8807 55.7593 22.5352 81.9133 11.7019C108.067 0.868657 136.846 -1.96582 164.611 3.55693C192.375 9.07969 217.879 22.7116 237.896 42.7289C257.913 62.7462 271.545 88.2499 277.068 116.014C282.591 143.779 279.756 172.558 268.923 198.712C258.09 224.866 239.744 247.22 216.206 262.947C192.669 278.675 164.996 287.069 136.687 287.069";
  const middle =
    "M19.31 143.938C19.31 120.546 26.2465 97.6785 39.2427 78.2285C52.2388 58.7785 70.7108 43.619 92.3226 34.6672C113.934 25.7153 137.715 23.3731 160.658 27.9367C183.6 32.5003 204.675 43.7648 221.216 60.3056C237.757 76.8466 249.021 97.921 253.585 120.863C258.148 143.807 255.806 167.587 246.854 189.199C237.903 210.811 222.743 229.283 203.293 242.279C183.843 255.275 160.976 262.211 137.584 262.211";
  return (
    <svg
      width="281"
      height="291"
      viewBox="0 0 281 291"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d={outer}
        stroke="#3890C0"
        strokeOpacity="0.45"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 7.5"
      />
      <path
        d={middle}
        stroke="#3890C0"
        strokeOpacity="0.28"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray="1 7"
      />
      <g transform="translate(137 144) scale(0.74) translate(-137 -144)">
        <path
          d={middle}
          stroke="#3890C0"
          strokeOpacity="0.16"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="1.3 9"
        />
      </g>
    </svg>
  );
}

function CalloutCard({ className }: { className?: string }) {
  return (
    <div className={`relative h-[111px] w-[376px] ${className ?? ""}`}>
      {/* Card shape — rounded body with a curved tab cut into the top-left for
          the badge. Exact Figma vector; the SVG carries the gradient border and
          layered glassy shadows. The card art sits at (290,236) inside the
          876×611 canvas, so the image is offset to land at the container origin. */}
      <Image
        src="/industry/challenges/callout-card.svg"
        alt=""
        aria-hidden="true"
        width={876}
        height={611}
        unoptimized
        className="pointer-events-none absolute"
        style={{ left: -282, top: -236, maxWidth: "none" }}
      />

      {/* Bot badge — nestles in the curved top-left tab, rising above the body */}
      <Image
        src="/industry/callout-logo.svg"
        alt=""
        width={55}
        height={95}
        unoptimized
        className="absolute bottom-1.5 left-4 drop-shadow-[0_10px_22px_rgba(120,170,205,0.35)]"
      />

      {/* Callout text — in the card body, to the right of the badge */}
      <div className="absolute left-[88px] top-[35px] flex h-[76px] items-center pr-5">
        <p className="text-[15px] font-bold leading-[21px] text-[#314158]">
          When systems are fragmented, control is limited and risks increase.
        </p>
      </div>
    </div>
  );
}

export default function Challenges() {
  return (
    <MotionConfig reducedMotion="user">
    <section className="relative z-10 overflow-hidden bg-white px-6 pb-4 pt-10 lg:px-[60px]">
      {/* Decorative blur blobs */}
      <div
        className="pointer-events-none absolute hidden lg:block"
        style={{
          width: 274,
          height: 193,
          right: 60,
          top: 232,
          background: "rgba(193, 236, 255, 0.30)",
          filter: "blur(85px)",
        }}
      />
      <div
        className="pointer-events-none absolute hidden lg:block"
        style={{
          width: 274,
          height: 193,
          left: 60,
          top: 96,
          background: "rgba(184, 230, 255, 0.43)",
          filter: "blur(85px)",
        }}
      />

      <motion.div
        className="relative mx-auto flex w-full max-w-[1160px] flex-col gap-[30px]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.header variants={fadeUp} custom={0} className="flex flex-col gap-2.5">
          <h2 className="max-w-[889px] text-[26px] font-extrabold text-[#0A4B6E]">
            Different industries. The same core challenges.
          </h2>
          <p className="max-w-[735px] text-[20px] font-normal leading-[28px] text-[#0A4B6E]">
            No matter the environment, operations face similar problems
          </p>
        </motion.header>

        {/* Diagram — cards, connector vector, toggle + callout.
            The absolute connector/toggle layout needs the full 1160px container,
            so it's gated on xl (≥1280px); below that the cards wrap and a stacked
            callout is shown instead. */}
        <div className="relative xl:min-h-[470px]">
          {/* Connector vector — its own origin sits ~165px right of the card
              column, so the brackets land in the gaps between cards (xl only) */}
          <ChallengeConnectors className="pointer-events-none absolute left-[165px] top-[171px] z-0 hidden xl:block" />

          {/* Card rows */}
          <div className="flex flex-col">
            {/* Row 1 — 3 cards */}
            <div className="flex flex-wrap gap-[30px] xl:flex-nowrap xl:gap-[44px]">
              {CHALLENGES.slice(0, 3).map((c, i) => (
                <ChallengeCard key={c.title} {...c} index={i} />
              ))}
            </div>

            {/* Row 2 — 2 cards */}
            <div className="mt-[30px] flex flex-wrap gap-[30px] xl:mt-[49px] xl:flex-nowrap xl:gap-[44px]">
              {CHALLENGES.slice(3).map((c, i) => (
                <ChallengeCard key={c.title} {...c} index={3 + i} />
              ))}
            </div>
          </div>

          {/* Toggle dial — sits where the trunk lines converge (xl only) */}
          <motion.div
            variants={fadeUp}
            custom={TOGGLE_DELAY}
            className="absolute z-10 hidden xl:block"
            style={{ left: 1000, top: 208 }}
          >
            <ToggleDial />
          </motion.div>

          {/* Concentric dotted rings behind the toggle — centered on the dial
              (toggle center 1071, 258; ring center 137, 144) (xl only) */}
          <motion.div
            variants={fadeUp}
            custom={RINGS_DELAY}
            className="pointer-events-none absolute left-[934px] top-[114px] z-0 hidden xl:block"
          >
            <ToggleRings />
          </motion.div>

          {/* Callout card (xl only) — positioned by its tab top-left */}
          <motion.div
            variants={fadeUp}
            custom={CALLOUT_DELAY}
            className="absolute z-10 hidden xl:block"
            style={{ left: 782, top: 300 }}
          >
            <CalloutCard />
          </motion.div>

          {/* Callout message under the cards (below xl). The toggle is part of
              the connector diagram, so it's hidden whenever the connector is. */}
          <motion.div variants={fadeUp} custom={CALLOUT_DELAY} className="mt-8 xl:hidden">
            <CalloutCard />
          </motion.div>
        </div>
      </motion.div>
    </section>
    </MotionConfig>
  );
}
