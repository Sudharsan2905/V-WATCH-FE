"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import ViewAllUseCases from "@/components/common/ViewAllUseCases";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const wipeDown: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  show: (delay = 0) => ({
    clipPath: "inset(0 0 0% 0)",
    transition: { delay, duration: 0.65, ease: EASE },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay },
  }),
};

const CARDS_START   = 0.5;
const CARD_STAGGER  = 0.15;

type UseCaseCard = { image: string; title: string; desc: string };

type UseCasesContent = {
  heading?: string;
  subtitle?: string;
  ctaHref?: string;
  cards?: UseCaseCard[];
};

function Card({
  image,
  title,
  desc,
  delay = 0,
}: Readonly<UseCaseCard & { delay?: number }>) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      className="snap-start h-75.5 w-68.75 rounded-[30px] border-2 border-white/70 bg-white/50 p-2 shadow-[0px_30px_50px_-30px_rgba(20,46,92,0.35)] backdrop-blur-[6px]"
    >
      <div className="relative h-full w-full overflow-hidden rounded-[20px]">
        <Image src={image} alt="" fill sizes="(max-width:1024px) 50vw, 23vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,20,35,0.92)] via-[rgba(8,20,35,0.30)] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-5">
          <p className="text-[18px] font-bold leading-[22px] text-white">{title}</p>
          <p className="text-[13px] leading-[18px] text-white/85">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

function ScrollArrow({
  direction,
  onClick,
  disabled = false,
  className = "",
}: Readonly<{
  direction: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}>) {
  return (
    <button
      type="button"
      aria-label={direction === "left" ? "Previous use cases" : "Next use cases"}
      onClick={onClick}
      disabled={disabled}
      className={`flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0A4B6E] shadow-[0_6px_20px_-6px_rgba(20,46,92,0.4)] transition hover:bg-[#0A4B6E] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:bg-white disabled:hover:text-[#0A4B6E] ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d={direction === "left" ? "M15 6 9 12l6 6" : "M9 6l6 6-6 6"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default function UseCases({
  useCases = {},
}: Readonly<{ useCases?: UseCasesContent }> = {}) {
  const {
    heading = "Solve critical challenges",
    subtitle = "",
    ctaHref = "#",
    cards = [],
  } = useCases;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setAtStart(scrollLeft <= 1);
    // -1 tolerance for sub-pixel rounding; also true when content fits (no overflow).
    setAtEnd(scrollLeft >= scrollWidth - clientWidth - 1);
    // Update active dot based on scroll position
    const cardWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth + 20 : clientWidth;
    setActiveIndex(Math.round(scrollLeft / cardWidth));
  }, []);

  useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows, cards.length]);

  const scrollByCards = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    // Advance by one card: first card's width + the row gap (20px).
    const first = el.firstElementChild as HTMLElement | null;
    const step = (first?.offsetWidth ?? el.clientWidth / 4) + 20;
    el.scrollBy({ left: step * (direction === "left" ? -1 : 1), behavior: "smooth" });
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        className="relative z-10 -mt-8 overflow-hidden rounded-t-[38px] px-6 py-16 lg:-mt-12 lg:rounded-t-[50px] lg:px-[60px]"
        style={{ background: "linear-gradient(90deg, #E0F0FC 0%, #ECF6FE 45%, #EEF7E9 100%)" }}
      >
        <motion.div
          className="mx-auto flex w-full max-w-[1320px] flex-col gap-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Header — wipeTop */}
          <header className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
            <div className="flex max-w-[680px] flex-col gap-2.5">
              <motion.h2
                variants={wipeDown}
                custom={0.05}
                className="text-[28px] font-extrabold leading-[34px] text-[#0A4B6E]"
              >
                {heading}
              </motion.h2>
              <motion.p
                variants={wipeDown}
                custom={0.2}
                className="text-[16px] leading-[24px] text-[#3E6079]"
              >
                {subtitle}
              </motion.p>
            </div>

            <motion.div variants={fadeUp} custom={0.3} className="shrink-0">
              <ViewAllUseCases href={ctaHref} />
            </motion.div>
          </header>

          {/* Cards — scroll row with arrows placed before & after, not over the images */}
          {cards.length > 0 && (
            <div className="flex items-center gap-3 lg:gap-4">
              {/* Front (previous) arrow */}
              <ScrollArrow
                direction="left"
                onClick={() => scrollByCards("left")}
                disabled={atStart}
                className="hidden shrink-0 sm:flex"
              />

              <div
                ref={scrollRef}
                className="grid min-w-0 flex-1 snap-x snap-mandatory grid-flow-col auto-cols-max gap-5 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {cards.map((c, i) => (
                  <Card
                    key={c.title}
                    {...c}
                    delay={CARDS_START + i * CARD_STAGGER}
                  />
                ))}
              </div>

              {/* Rear (next) arrow */}
              <ScrollArrow
                direction="right"
                onClick={() => scrollByCards("right")}
                disabled={atEnd}
                className="hidden shrink-0 sm:flex"
              />
            </div>
          )}

          {/* Dots — mobile only */}
          {cards.length > 1 && (
            <div className="flex items-center justify-center gap-2 sm:hidden">
              {cards.map((c, i) => (
                <button
                  key={c.title}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => {
                    const el = scrollRef.current;
                    if (!el) return;
                    const cardWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth + 20 : el.clientWidth;
                    el.scrollTo({ left: cardWidth * i, behavior: "smooth" });
                  }}
                  className={`rounded-full transition-all duration-200 ${
                    i === activeIndex ? "h-[8px] w-[24px] bg-[#0A4B6E]" : "size-[8px] bg-[#0A4B6E]/30"
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </section>
    </MotionConfig>
  );
}
