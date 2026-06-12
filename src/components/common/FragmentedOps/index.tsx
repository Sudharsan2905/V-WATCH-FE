"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";

// Animation timeline (seconds)
const TEXT_DELAY = 0;
const IMAGE_DELAY = 0.2;
const CARDS_START = 0.3;
const CARD_STAGGER = 0.12;
const RESULTS_START = 0.6;
const RESULTS_ITEMS_START = 0.8;
const RESULTS_ITEM_STAGGER = 0.12;
// After the 4 result items have finished staggering in.
const RESULTS_FOOTER_START = RESULTS_ITEMS_START + 4 * RESULTS_ITEM_STAGGER;

// ── Scroll-reveal variants ──────────────────────────────────────────────────
// Wipe-in-from-top: content reveals downward behind a moving top edge.
// `custom` is the per-element delay in seconds.
const wipeTop: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  visible: (delay = 0) => ({
    clipPath: "inset(0 0 0 0)",
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const wipeBottom: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const riseItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// Soft fade + scale, used for the centre render "loading" in.
const loadIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: IMAGE_DELAY },
  },
};

// ── Left column: the four "fragmented" cards ───────────────────────────────
type Frag = { text: string; iconSrc: string; iconW: number; iconH: number };

const FRAG_CARDS: Frag[] = [
  { text: "Workforce is tracked in one place",        iconSrc: "/frag-icons/workforce.svg",   iconW: 21, iconH: 23 },
  { text: "Tasks and workflows in another",           iconSrc: "/frag-icons/workflows.svg",   iconW: 19, iconH: 24 },
  { text: "Assets and vehicles somewhere else",       iconSrc: "/frag-icons/assets.svg",      iconW: 23, iconH: 23 },
  { text: "Compliance and safety managed separately", iconSrc: "/frag-icons/compliance.svg",  iconW: 21, iconH: 19 },
];

function FragCard({ text, iconSrc, iconW, iconH, index }: Readonly<Frag & { index: number }>) {
  return (
    // Transparent wrapper carries the wipe; pt/-mt expand the clip region to
    // include the icon badge that overhangs the card top by 17px (no layout shift).
    <motion.div
      variants={wipeTop}
      custom={CARDS_START + index * CARD_STAGGER}
      className="-mt-[17px] pt-[17px]"
    >
      <div className="relative rounded-[14px] bg-[linear-gradient(180deg,#E9EEFF_0%,#C1ECFF_100%)] px-4 pb-4 pt-[34px] shadow-[8px_14px_28px_-10px_rgba(130,175,215,0.35)]">
        {/* Blue accent stroke: gradient ring that's brightest at the top-left corner and fades out along the top + left edges */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[14px]"
          style={{
            padding: "2px",
            background:
              "radial-gradient(100% 100% at 0% 0%, #2FA8DC 0%, rgba(47,168,220,0.5) 30%, rgba(47,168,220,0) 62%)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
        <div className="absolute -top-[17px] left-5 flex h-10 w-10 items-center justify-center rounded-[10px] bg-white shadow-[2.5px_5.8px_25px_-2.5px_rgba(56,144,192,0.40)]">
          <Image src={iconSrc} alt="" width={iconW} height={iconH} />
        </div>
        <p className="text-[18px] font-normal leading-6 text-[#202020]">{text}</p>
      </div>
    </motion.div>
  );
}

// ── Right column: the "Results" card ───────────────────────────────────────
const RESULTS: { text: string; icon: string }[] = [
  { text: "Limited visibility", icon: "/hero/icons/res-visibility.svg" },
  { text: "Slower decision-making", icon: "/hero/icons/res-decisions.svg" },
  { text: "Gaps in security and compliance", icon: "/hero/icons/res-security.svg" },
  { text: "Lost productivity across the board", icon: "/hero/icons/res-productivity.svg" },
];

function ResultsCard() {
  return (
    <motion.div
      variants={wipeBottom}
      custom={RESULTS_START}
      className="relative w-full self-stretch overflow-hidden rounded-[32px] bg-[#FBFEFF] p-5 shadow-[0_13px_100px_rgba(219,219,219,0.25),6px_10px_23px_rgba(219,228,255,0.85),9px_7px_60px_rgba(255,255,255,0.40)] lg:flex-1"
    >
      <motion.h3 variants={wipeTop} custom={RESULTS_START + 0.1} className="text-[20px] font-bold text-[#0A4B6E]">The Results?</motion.h3>
      <ul className="mt-[14px] flex flex-col gap-4">
        {RESULTS.map((r, i) => (
          <motion.li
            key={r.text}
            variants={riseItem}
            custom={RESULTS_ITEMS_START + i * RESULTS_ITEM_STAGGER}
            className="flex items-center gap-[14px]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[11px] bg-[#F4FBFF]/70 shadow-[0_10px_48px_rgba(199,199,199,0.25),5px_8px_19px_rgba(217,226,255,0.85)] outline outline-[1.6px] -outline-offset-[1.6px] outline-white/60">
              <Image src={r.icon} alt="" width={24} height={24} className="h-6 w-6" />
            </span>
            <span className="text-[18px] font-normal text-[#0F172A]">{r.text}</span>
          </motion.li>
        ))}
      </ul>

      <div className="mt-6 flex items-end justify-between">
        <motion.p
          variants={riseItem}
          custom={RESULTS_FOOTER_START}
          className="mb-7 text-[20px] font-normal leading-7 text-[#FE5E33]"
        >
          You&apos;re not lacking data
          <br />
          You&apos;re lacking connection.
        </motion.p>
        <motion.div variants={riseItem} custom={RESULTS_FOOTER_START + 0.15} className="shrink-0">
          <Image src="/home/results-illustration.svg" alt="" width={76.45} height={108.44} style={{ width: "76.45px", height: "108.44px" }} />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────
export default function FragmentedOps() {
  return (
    <section className="relative z-10 -mt-[40px] rounded-t-[40px] bg-white px-6 pb-20 pt-10 lg:-mt-[62px] lg:px-[60px]">
      <motion.div
        className="mx-auto w-full max-w-[1410px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-[642px]">
          <motion.h2
            variants={wipeTop}
            custom={TEXT_DELAY}
            className="text-[26px] font-bold text-[#0A4B6E]"
          >
            Operations today are fragmented and it shows
          </motion.h2>
          <motion.p
            variants={wipeTop}
            custom={TEXT_DELAY + 0.15}
            className="mt-2.5 text-[20px] font-normal leading-[26px] text-[#0A4B6E]"
          >
            Most organizations manage their operations across multiple systems, teams, and manual processes.
          </motion.p>
        </div>

        <div className="mt-10 flex flex-col items-stretch gap-8 lg:flex-row lg:items-center lg:gap-[40px]">
          {/* Left: fragmented cards — primary content, grows to fill */}
          <div className="flex w-full flex-col gap-9 lg:flex-1">
            {FRAG_CARDS.map((c, i) => (
              <FragCard key={c.text} {...c} index={i} />
            ))}
          </div>

          {/* Middle: connected-core render — compact, fixed-size supporting square */}
          <motion.div
            variants={loadIn}
            className="relative mx-auto aspect-square w-full max-w-[300px] shrink-0 overflow-hidden rounded-[20px] lg:mx-0 lg:w-[300px] lg:max-w-none"
          >
            <Image src="/hero/connected-core.png" alt="Connected operations core" fill sizes="300px" className="object-cover" />
          </motion.div>

          {/* Right: results */}
          <ResultsCard />
        </div>
      </motion.div>
    </section>
  );
}
