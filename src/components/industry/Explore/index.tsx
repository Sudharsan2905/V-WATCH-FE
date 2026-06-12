"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Reveal order: header first, then the photo cards slide up from below.
const CARDS_START = 0.3;
const CARD_STAGGER = 0.1;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// `custom` is the per-card delay in seconds.
const slideUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay },
  }),
};

// "Explore how V-Watch Ai works across different environments" (Figma 270:13092)
type Card = { title: string; img: string; desc?: string; link?: string };

const CARDS: Card[] = [
  {
    title: "Construction",
    img: "/industry/exp-construction.png",
    desc: "Manage large, multi-contractor environments with full visibility across workforce, compliance, and site operations ensuring safety at every stage.",
    link: "Learn More",
  },
  {
    title: "Industrial & Energy",
    img: "/industry/exp-industrial.png",
    desc: "Operate safely in high-risk environments with real-time tracking, restricted zone monitoring, and instant response capabilities reducing risk while maintaining strict compliance.",
    link: "Learn More",
  },
  {
    title: "Commercial & Facilities",
    img: "/industry/exp-commercial.png",
    desc: "Streamline building operations, enhance access control, and manage maintenance across offices, retail spaces, and multi-site facilities.",
    link: "Learn More",
  },
];

function Arrow() {
  return (
    <span className="flex size-6 items-center justify-center rounded-[12.5px] bg-white/10">
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path
          d="M3.6 8.4 8.4 3.6M4.5 3.6h3.9v3.9"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function Explore() {
  return (
    <MotionConfig reducedMotion="user">
    <section className="relative z-[2] px-6 pb-20 pt-[30px] lg:px-[60px]">
      <motion.div
        className="mx-auto flex w-full max-w-[1410px] flex-col gap-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.header variants={fadeUp} className="flex max-w-[1160px] flex-col gap-2.5">
          <h2 className="max-w-[889px] text-[26px] font-extrabold text-[#0A4B6E]">
            Explore how V-Watch Ai works across different environments
          </h2>
          <p className="max-w-[804px] text-[20px] font-normal leading-[28px] text-[#0A4B6E]">
            While every industry is unique, the need for visibility, safety, and
            control remains the same. These are some of the environments where
            V-Watch Ai delivers the most impact.
          </p>
        </motion.header>

        <div className="flex flex-wrap justify-center gap-[30px]">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              variants={slideUp}
              custom={CARDS_START + i * CARD_STAGGER}
              className="group relative h-[500px] w-full max-w-[367px] grow basis-[260px] overflow-hidden rounded-[20px] border-[1.245px] border-[#0a8ec8] p-1 shadow-[0_16px_54px_rgba(184,230,255,0.18)]"
            >
              <div className="relative h-full w-full overflow-hidden rounded-[16px]">
                <Image
                  src={c.img}
                  alt={c.title}
                  fill
                  className="object-cover"
                  sizes="367px"
                />
                {/* Dark glass panel — holds title (always) + desc/link (hover) */}
                <div className="absolute inset-x-3 bottom-3 flex flex-col rounded-[14px] bg-black/55 p-5">
                  <p className="text-[18px] font-bold leading-6 text-white">
                    {c.title}
                  </p>
                  {/* Hidden at rest; expands and fades in smoothly on hover
                      (grid-rows 0fr → 1fr animates the height). */}
                  {(c.desc || c.link) && (
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
                      <div className="flex translate-y-3 flex-col gap-2.5 overflow-hidden opacity-0 transition-[opacity,transform] duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                        {/* zero-height spacer — its flex gap recreates the
                            title→description spacing inside the collapsing row */}
                        <div aria-hidden className="h-0" />
                        {c.desc && (
                          <p className="text-[16px] font-normal leading-5 text-white">
                            {c.desc}
                          </p>
                        )}
                        {c.link && (
                          <div className="flex items-center gap-2.5">
                            <p className="text-[16px] font-bold text-white">
                              {c.link}
                            </p>
                            <Arrow />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
    </MotionConfig>
  );
}
