"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const listStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
};

const railFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

// Inline icons (no icon dependency in the project). They draw with currentColor
// so the badge sets the tint.
function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-[19px]" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 9h17M3.5 15h17" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[19px]" aria-hidden>
      <path d="M13 2 4 13h6l-1 9 9-12h-6l1-8Z" fill="currentColor" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[19px]" aria-hidden>
      <path d="M12 2 4 5v6c0 5 3.4 8.3 8 11 4.6-2.7 8-6 8-11V5l-8-3Z" fill="currentColor" />
      <path d="m8.5 12 2.4 2.4L15.5 9.8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function CubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-[19px]" aria-hidden>
      <path d="M12 2.8 21 7.5v9L12 21.2 3 16.5v-9L12 2.8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M3 7.5 12 12m0 0 9-4.5M12 12v9.2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

const STEPS = [
  { num: "01", label: "Deploy and configure the platform", Icon: GlobeIcon },
  { num: "02", label: "Integrate with existing systems", Icon: BoltIcon },
  { num: "03", label: "Provide on-ground support and expertise", Icon: ShieldIcon },
  { num: "04", label: "Ensure long-term operational success", Icon: CubeIcon },
];

// Trust marker: two concentric glowing circles, a translucent shield with a
// bright white edge, and a location-pin (ring + check) standing on a base disc.
// Fully fluid — every layer is sized as a percentage of the wrapper width
// (design reference 300px), so the badge scales with the illustration instead
// of staying a fixed size while the image shrinks.
function ShieldBadge() {
  return (
    <div aria-hidden className="pointer-events-none relative grid aspect-square w-full place-items-center">
      {/* outer circle */}
      <span className="absolute inset-0 rounded-full border border-white/40 bg-[radial-gradient(circle,rgba(255,255,255,0.4)_0%,rgba(202,235,250,0.18)_55%,transparent_72%)]" />
      {/* inner circle — 206/300 of the badge */}
      <span className="absolute aspect-square w-[68.7%] rounded-full border border-white/60 bg-[radial-gradient(circle,rgba(255,255,255,0.92)_0%,rgba(222,243,253,0.5)_60%,transparent_80%)] shadow-[0_0_40px_rgba(255,255,255,0.55)]" />

      {/* shield + pin icon — 160/300 of the badge */}
      <svg
        viewBox="0 0 160 180"
        fill="none"
        className="relative h-auto w-[53.3%] drop-shadow-[0_12px_30px_rgba(120,200,245,0.4)]"
      >
        <defs>
          <linearGradient id="shield-fill" x1="80" y1="12" x2="80" y2="170" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" stopOpacity="0.78" />
            <stop offset="1" stopColor="#CFEBFB" stopOpacity="0.32" />
          </linearGradient>
        </defs>

        {/* shield body with a bright white edge */}
        <path
          d="M80 12 143 33V82C143 126 114 154 80 168 46 154 17 126 17 82V33L80 12Z"
          fill="url(#shield-fill)"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* base disc under the pin */}
        <ellipse cx="80" cy="128" rx="26" ry="7" fill="#54B7EC" opacity="0.4" />
        {/* location pin */}
        <path
          d="M80 58C95 58 107 70 107 84 107 102 80 128 80 128 80 128 53 102 53 84 53 70 65 58 80 58Z"
          fill="#54B7EC"
        />
        {/* ring + check inside the pin head */}
        <circle cx="80" cy="82" r="15" stroke="#FFFFFF" strokeWidth="2.4" />
        <path
          d="m73.5 82 5 5 9.5-10.5"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// Curved connector chain on the left of the card list. Each card is a fixed
// 68px tall with a 14px gap, so the knobs land at fixed y centres; the cubic
// curves bulge left to link consecutive knobs (the geometry matches the cards
// because they share the same fixed height). lg only.
const CARD_H = 60;
const CARD_GAP = 14;
const KNOB_X = 46; // circle centre — sits 6px left of the card edge so its right
//                    side tucks behind the card
const KNOB_R = 12;
const KNOB_CENTERS = [0, 1, 2, 3].map((i) => CARD_H / 2 + i * (CARD_H + CARD_GAP));
const RAIL_H = KNOB_CENTERS[3] + CARD_H / 2;

function ConnectorRail() {
  return (
    <motion.svg
      variants={railFade}
      aria-hidden
      width="60"
      height={RAIL_H}
      viewBox={`0 0 60 ${RAIL_H}`}
      fill="none"
      className="pointer-events-none absolute left-0 top-0 hidden lg:block"
    >
      <defs>
        {/* connector palette from Figma: 35,178,241 → 28,140,190 → 33,177,241 */}
        <linearGradient id="conn-grad" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#23B2F1" />
          <stop offset="0.5" stopColor="#1C8CBE" />
          <stop offset="1" stopColor="#21B1F1" />
        </linearGradient>
      </defs>

      {/* thin curves bulging deep to the left, linking each knob to the next */}
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${KNOB_X} ${KNOB_CENTERS[i]} C 0 ${KNOB_CENTERS[i]} 0 ${KNOB_CENTERS[i + 1]} ${KNOB_X} ${KNOB_CENTERS[i + 1]}`}
          stroke="url(#conn-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      ))}

      {/* round knobs — drawn behind the cards so the card edge overlaps them */}
      {KNOB_CENTERS.map((y, i) => (
        <circle key={i} cx={KNOB_X} cy={y} r={KNOB_R} fill="#1D6C97" />
      ))}
    </motion.svg>
  );
}

// "Built for real-world implementation" — flows straight out of the Hero's
// white curve. Puzzle illustration on the left, the four integrator
// responsibilities on the right, then a closing line beneath.
export default function RealTimeImplementationSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-white px-6 pb-20 lg:px-[60px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_75%_30%,rgba(176,226,243,0.35),transparent_60%),linear-gradient(180deg,#ffffff_0%,#f2fafd_55%,#eaf7fa_100%)]"
        />

        <motion.div
          className="relative z-10 mx-auto flex w-full max-w-[1410px] flex-col gap-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >

          {/* Illustration + integrator responsibilities */}
          <div className="relative flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-[40px]">
            <motion.div variants={imageReveal} className="relative w-full lg:flex-1">
              <Image
                src="/integrators-partners/leftSidePick.webp"
                alt="Connected puzzle pieces representing integrated deployment"
                width={744}
                height={376}
                sizes="(max-width: 1024px) 92vw, 640px"
                className="h-auto w-full max-w-[680px]"
              />
              {/* trust shield — sits in the gap between the puzzle and the
                  cards, its bottom edge flush with the bottom of the
                  illustration. Percentage offsets/width keep the composition
                  identical as it scales. */}
              <div className="absolute bottom-0 right-[1%] w-[26%]">
                <ShieldBadge />
              </div>
            </motion.div>

            <div className="flex w-full flex-col gap-5 lg:w-[560px] lg:shrink-0">
              <motion.h3 variants={fadeUp} className="text-[24px] font-bold text-[#0A4B6E]">
                Our integrators
              </motion.h3>

              <motion.ul
                variants={listStagger}
                className="relative flex flex-col lg:pl-[52px]"
                style={{ gap: `${CARD_GAP}px` }}
              >
                {/* curved connector chain (lg only) */}
                <ConnectorRail />

                {STEPS.map(({ num, label, Icon }) => (
                  <motion.li
                    key={num}
                    variants={cardItem}
                    style={{ minHeight: `${CARD_H}px` }}
                    className="relative flex items-center gap-3.5 rounded-[14px] border-2 border-transparent pl-4 pr-5 [background:linear-gradient(180deg,#ffffff,#f4fbff)_padding-box,linear-gradient(180deg,#ffffff,#eff9ff)_border-box] shadow-[0_13px_100px_0_rgba(199,199,199,0.2),7px_6px_20px_0_rgba(196,204,228,0.4),inset_0_1px_0_rgba(255,255,255,0.9)]"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#dbeefb] bg-white text-[#21B1F1] shadow-[0_6px_16px_rgba(33,177,241,0.18)]">
                      <Icon />
                    </span>
                    <span className="bg-[linear-gradient(135deg,#5CB7E8,#A6C936)] bg-clip-text text-[18px] font-black leading-6 text-transparent">
                      {num}
                    </span>
                    <span aria-hidden className="h-6 w-px shrink-0 bg-[#cfe3ef]" />
                    <span className="text-[16px] font-bold leading-none tracking-[-0.002em] text-[#1D6C97]">
                      {label}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>

          {/* Closing line */}
          <motion.p
            variants={fadeUp}
            className="mx-auto max-w-[760px] text-center text-[18px] font-medium leading-[26px] text-[#1d6c97]"
          >
            V-Watch Ai partners with experienced system integrators who understand local
            environments, infrastructure, and operational requirements ensuring smooth
            implementation from day one.
          </motion.p>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
