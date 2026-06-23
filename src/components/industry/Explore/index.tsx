"use client";

import Image from "next/image";
import Link from "next/link";
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
type Card = { title: string; img: string; desc?: string; link?: string; href?: string };

const CARDS: Card[] = [
  {
    title: "Construction",
    img: "/industry/exp-construction.png",
    href: "/industries/construction",
    desc: "Manage large workforces, multiple contractors, and strict compliance requirements with full visibility across your site.",
    link: "View Construction Solutions",
  },
  {
    title: "Industrial & Energy",
    img: "/industry/exp-industrial.png",
    href: "/industries/industrial-energy",
    desc: "Maintain safety in high-risk environments with real-time tracking, restricted zone monitoring, and rapid emergency response.",
    link: "View Industrial & Energy Solutions",
  },
  {
    title: "Commercial & Facilities",
    img: "/industry/exp-commercial.png",
    href: "/industries/commercial-facilities",
    desc: "Streamline building operations, enhance security, and improve efficiency across tenants, staff, and service providers.",
    link: "View Commercial & Facilities Solutions",
  },
];

function Arrow() {
  return (
    <span className="flex size-6 items-center justify-center rounded-[12.5px] bg-white/10 transition-colors duration-200 group-hover/link:bg-white/25">
      <svg width="15" height="15" viewBox="0 0 12 12" fill="none" aria-hidden>
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
          <motion.header
            variants={fadeUp}
            className="flex max-w-[1160px] flex-col gap-2.5"
          >
            <h2 className="max-w-[889px] text-[26px] font-extrabold text-[#0A4B6E]">
              Explore how V-Watch Ai works across different environments
            </h2>
            <p className="max-w-[804px] text-[20px] font-normal leading-[28px] text-[#0A4B6E]">
              While every industry is unique, the need for visibility, safety,
              and control remains the same. These are some of the environments
              where V-Watch Ai delivers the most impact.
            </p>
          </motion.header>

          <div className="flex flex-wrap justify-center gap-[30px]">
            {CARDS.map((c, i) => {
              const cardStyle = {
                borderTop: i === 0 ? "0.625px solid transparent" : "1.25px solid transparent",
                borderLeft: "1.25px solid transparent",
                borderBottom: "1.25px solid transparent",
                borderRight: i === 0 ? "0px" : "1.25px solid transparent",
                background:
                  "linear-gradient(180deg, #daeced 0%, #FFFFFF 100%) padding-box, " +
                  "linear-gradient(135deg, #0A8EC8 0%, #9DD2E9 100%) border-box",
              };
              const cardContent = (
                <div className="relative h-full w-full overflow-hidden rounded-[14px]">
                  <Image
                    src={c.img}
                    alt=""
                    aria-hidden
                    fill
                    className="object-cover"
                    sizes="367px"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "rgba(24, 23, 23, 0.40)", backdropFilter: "blur(2px)" }}
                  />
                  <div className="relative flex h-full flex-col p-3.5">
                    <div className="relative min-h-0 flex-1 overflow-hidden rounded-[10px]">
                      <Image
                        src={c.img}
                        alt={c.title}
                        fill
                        className="object-cover"
                        sizes="367px"
                      />
                    </div>
                    <div className="flex flex-col px-1 pt-3">
                      <p className="text-[18px] font-bold leading-6 text-white">{c.title}</p>
                      {(c.desc || c.link) && (
                        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
                          <div className="flex translate-y-3 flex-col gap-2.5 overflow-hidden opacity-0 transition-[opacity,transform] duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                            <div aria-hidden className="h-0" />
                            {c.desc && (
                              <p className="text-[16px] font-normal leading-5 text-white">{c.desc}</p>
                            )}
                            {c.link && (
                              <div className="group/link flex w-fit cursor-pointer items-center gap-2.5">
                                <p className="text-[16px] font-bold text-white">{c.link}</p>
                                <Arrow />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );

              return (
                <motion.div
                  key={c.title}
                  variants={slideUp}
                  custom={CARDS_START + i * CARD_STAGGER}
                  className="group relative h-[500px] w-full max-w-[367px] grow basis-[260px] overflow-hidden rounded-[20px] p-1 shadow-[0_16px_54px_rgba(184,230,255,0.18)]"
                  style={cardStyle}
                >
                  {c.href ? (
                    <Link href={c.href} className="block h-full w-full">
                      {cardContent}
                    </Link>
                  ) : (
                    cardContent
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
