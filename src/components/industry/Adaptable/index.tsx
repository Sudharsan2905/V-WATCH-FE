"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// Cards enter from their own side — left card from the left, right card from
// the right — slightly after the header so the order reads header → cards.
const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE, delay: 0.2 },
  },
};

const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE, delay: 0.2 },
  },
};

// "Also used across a wide range of environments" — dark masonry of industry
// image cards (alternating 488 / 608 widths). (Figma node 270:13152)
type Card = { title: string; img: string; icon: string; size: "sm" | "lg" };

const ROWS: Card[][] = [
  [
    {
      title: "Data Centers",
      img: "/industry/adapt-datacenter.png",
      icon: "/industries/industries-hub/datacenters.svg",
      size: "sm",
    },
    {
      title: "Manufacturing",
      img: "/industry/adapt-manufacturing.png",
      icon: "/industries/industries-hub/manufacturing.svg",
      size: "lg",
    },
  ],
  [
    {
      title: "Healthcare Facilities",
      img: "/industry/adapt-healthcare.png",
      icon: "/industries/industries-hub/healthcare.svg",
      size: "lg",
    },
    {
      title: "Infrastructure & Utilities",
      img: "/industry/adapt-infrastructure.png",
      icon: "/industries/industries-hub/infrastructure.svg",
      size: "sm",
    },
  ],
  [
    {
      title: "Logistics & Warehousing",
      img: "/industry/adapt-logistics.png",
      icon: "/industries/industries-hub/logistics.svg",
      size: "sm",
    },
    {
      title: "Transportation Hubs (airports, ports, rail)",
      img: "/industry/adapt-transport.png",
      icon: "/industries/industries-hub/transport.svg",
      size: "lg",
    },
  ],
];

function IndustryCard({
  title,
  img,
  icon,
  size,
  side,
}: Readonly<Card & { side: "left" | "right" }>) {
  return (
    <motion.div
      variants={side === "left" ? slideFromLeft : slideFromRight}
      className={`relative h-[280px] w-full overflow-hidden rounded-[24px] border-8 border-white/10 sm:w-auto ${
        // flex-basis:0 only on sm+ (row axis = width). On mobile the cards are a
        // column, where flex-basis:0 would zero their HEIGHT — so keep w-full.
        size === "lg" ? "sm:flex-[608_1_0]" : "sm:flex-[488_1_0]"
      }`}
    >
      <Image
        src={img}
        alt={title}
        fill
        className="object-cover"
        sizes="608px"
      />
      <div className="absolute inset-x-0 bottom-0 h-[100px] bg-gradient-to-t from-black/85 to-transparent" />
      <div className="absolute bottom-5 left-5 flex items-center gap-2.5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/25 bg-white/10 backdrop-blur-sm">
          <Image
            src={icon}
            alt=""
            width={20}
            height={20}
            aria-hidden
            className="h-5 w-auto"
          />
        </span>
        <p className="text-[20px] font-bold text-white">{title}</p>
      </div>
    </motion.div>
  );
}

export default function Adaptable() {
  return (
    <MotionConfig reducedMotion="user">
    <section className="relative overflow-hidden px-6 pt-[21em] pb-14 lg:pb-24 lg:px-[60px]">
      <div className="relative mx-auto flex w-full max-w-[1410px] flex-col gap-[30px]">
        <motion.header
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="flex max-w-[804px] flex-col gap-2.5 text-white"
        >
          <h2 className="text-[26px] font-extrabold">
            Also used across a wide range of environments
          </h2>
          <p className="text-[20px] font-normal leading-[28px]">
            V-Watch Ai is adaptable and scalable making it suitable for any
            environment where operational control matters.
          </p>
        </motion.header>

        <div className="flex flex-col gap-6">
          {/* each row reveals as it scrolls into view: left card slides in
              from the left, right card from the right */}
          {ROWS.map((row) => (
            <motion.div
              key={row[0].title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col gap-6 sm:flex-row"
            >
              {row.map((c, i) => (
                <IndustryCard key={c.title} {...c} side={i === 0 ? "left" : "right"} />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </MotionConfig>
  );
}
