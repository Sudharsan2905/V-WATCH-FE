"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, MotionConfig, type Variants } from "motion/react";

// Show this many cards per view; the carousel only adds arrows past this.
const VISIBLE = 4;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Reveal order: header first, then the cards one after another.
const CARDS_START = 0.25;
const CARD_STAGGER = 0.15;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// Cards fade in from their centre — slightly scaled down, growing into place
// while fading. `custom` is the delay in seconds.
const paintIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};

type Card = {
  title: string;
  desc: string;
  img: string;
  descColor: string;
  descWeight: number;
  href?: string;
};

const CARDS: Card[] = [
  {
    title: "Workforce automation",
    desc: "Manage payroll, leave, and workforce activity centrally.",
    img: "/industry/sol-1.webp",
    descColor: "#EFF9FF",
    descWeight: 500,
  },
  {
    title: "Emergency headcount and muster",
    desc: "Ensure every third-party worker meets safety requirements.",
    img: "/industry/sol-3.webp",
    descColor: "#D4F0FF",
    descWeight: 500,
    href: "/real-time-headcount",
  },
  {
    title: "Compliance tracking",
    desc: "Track safety, missing, and onsite personnel during emergencies.",
    img: "/industry/sol-2.webp",
    descColor: "#D4F0FF",
    descWeight: 400,
    href: "/contractor-compliance",
  },
  {
    title: "Facial recognition access control",
    desc: "Deploy touchless entry points across high-traffic zones.",
    img: "/industry/sol-4.webp",
    descColor: "#D4F0FF",
    descWeight: 500,
    href: "/facial-recognition",
  },
  {
    title: "Maintenance and task management",
    desc: "Streamline task assignment, tracking, and completion across teams.",
    img: "/industries/industrial&energy/critical-usecase/maintenance.svg",
    descColor: "#D4F0FF",
    descWeight: 500,
  },
];

function NavButton({
  dir,
  disabled,
  onClick,
}: Readonly<{ dir: "prev" | "next"; disabled: boolean; onClick: () => void }>) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || undefined}
      aria-label={dir === "prev" ? "Previous" : "Next"}
      className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#CFE9F7] bg-white text-[#1273A6] shadow-[0_6px_16px_rgba(126,207,250,0.28)] transition hover:bg-[#EFF9FF] disabled:cursor-not-allowed disabled:opacity-40"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d={dir === "prev" ? "m15 6-6 6 6 6" : "m9 6 6 6-6 6"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default function Solutions() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  // Pagination dots (mobile/tablet only). Page count and the active page are
  // derived from the scroller's own metrics, so they stay correct across the
  // 1-/2-card-per-view breakpoints without hard-coding either.
  const [pageCount, setPageCount] = useState(1);
  const [activePage, setActivePage] = useState(0);
  // Gates the client-only carousel arrows: false during SSR and the first
  // client render (so the markup matches), flipped true after mount.
  const [mounted, setMounted] = useState(false);
  const hasNav = CARDS.length > VISIBLE;

  const updateEdges = useCallback(() => {
    setMounted(true);
    const el = scrollerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
    const w = el.clientWidth;
    if (w > 0) {
      setPageCount(Math.max(1, Math.round((el.scrollWidth - w) / w) + 1));
      setActivePage(Math.round(el.scrollLeft / w));
    }
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(updateEdges);
    window.addEventListener("resize", updateEdges);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const page = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  const goToPage = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative z-10 -mt-10 overflow-hidden rounded-t-[40px] bg-white px-6 pt-10 pb-20 lg:px-[60px]">
        {/* Ellipse 3550 — blue, W:610 H:148, centred at gap between cards 1 and 2 */}
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            width: 610,
            height: 148,
            left: "27%",
            top: "57%",
            transform: "translate(-50%, -50%)",
            background: "rgba(33, 177, 241, 0.55)",
            borderRadius: "50%",
            filter: "blur(100px)",
          }}
        />
        {/* Ellipse 3551 — yellow/lime, W:810 H:172, centred at gap between cards 3 and 4 */}
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            width: 810,
            height: 172,
            left: "73%",
            top: "57%",
            transform: "translate(-50%, -50%)",
            background: "rgba(166, 201, 54, 0.45)",
            borderRadius: "50%",
            filter: "blur(100px)",
          }}
        />

        <motion.div
          className="relative z-10 mx-auto flex w-full max-w-[1410px] flex-col gap-[30px]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Header */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center"
          >
            <div className="flex max-w-[845px] flex-col gap-2.5 text-[#0A4B6E]">
              <h2 className="text-[26px] font-extrabold">
                Start with your challenge
              </h2>
              <p className="text-[20px] font-medium leading-[28px]">
                Every environment faces similar operational challenges explore
                solutions based on your specific needs.
              </p>
            </div>
            {/* Desktop-only arrows. On mobile/tablet the controls move below
                the carousel (see the controls row after the scroller). */}
            <div className="hidden shrink-0 items-center gap-3 lg:flex">
              {hasNav && mounted && (
                <div className="flex items-center gap-2.5">
                  <NavButton
                    dir="prev"
                    disabled={atStart}
                    onClick={() => page(-1)}
                  />
                  <NavButton
                    dir="next"
                    disabled={atEnd}
                    onClick={() => page(1)}
                  />
                </div>
              )}
              {/* <ViewAllUseCases className="shrink-0" /> */}
            </div>
          </motion.div>

          {/* Cards — a horizontal snap carousel at every breakpoint: 1 card per
            view on mobile, 2 on tablet (sm+), 4 on desktop (lg+), with the
            header arrows paging through the rest. The negative margin + padding
            gives the cards' -10px image bleed room so the overflow-x scroller
            doesn't clip it. */}
          <div
            ref={scrollerRef}
            onScroll={updateEdges}
            className="-my-2.5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {CARDS.map((c, i) => {
              const cardInner = (
                <div className="relative flex h-full flex-col items-start justify-end">
                  {/* Image: inset -10px so it sits 10px from each card edge.
                    Its own borderRadius(20px) + position(10px) stays within card(30px) radius — no overflow:hidden needed. */}
                  <div
                    className="absolute overflow-hidden rounded-[20px]"
                    style={{ inset: -10 }}
                  >
                    <Image
                      src={c.img}
                      alt={c.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1023px) 100vw, 25vw"
                    />
                  </div>

                  {/* Text block — the frosted glass is a bleeding background that
                    GROWS with the content, so on hover the panel expands with
                    the text instead of the title spilling above a fixed panel.
                    Figma: rgba(24,23,23,0.40) + blur(5px), bled to card edges. */}
                  <div className="relative z-10 self-stretch pt-4">
                    <div
                      aria-hidden
                      className="absolute rounded-b-[20px]"
                      style={{
                        left: -10,
                        right: -10,
                        bottom: -10,
                        top: 0,
                        background: "rgba(24, 23, 23, 0.40)",
                        backdropFilter: "blur(5px)",
                      }}
                    />

                    {/* Title + description */}
                    <div className="relative flex flex-col gap-2.5">
                      <p className="text-[18px] font-bold leading-6 text-white">
                        {c.title}
                      </p>
                      <p
                        className="text-[16px] leading-5"
                        style={{ color: c.descColor, fontWeight: c.descWeight }}
                      >
                        {c.desc}
                      </p>
                    </div>

                    {/* Learn More — collapsed to zero height at rest (no reserved
                      space); expands and fades in on hover. */}
                    {c.href && (
                      <div className="relative z-30 grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                          <div className="flex w-fit items-center gap-2.5 pt-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            {/* Text stays plain white — no highlight on hover. */}
                            <span className="text-[16px] font-medium text-white">
                              Learn More
                            </span>
                            {/* Only the arrow reacts — it turns green, slides, and
                                lifts on card/image hover (group-hover), no need to
                                hover the tiny arrow itself. */}
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                              aria-hidden
                              className="text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:text-[#A6C936]"
                            >
                              <path
                                d="M14 11.3479L13.7195 0.255009L2.62659 0L2.65209 2.42259L10.0474 2.37158L0 12.4189L1.58106 14L11.6029 3.97814L11.5519 11.3224L14 11.3479Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );

              return (
                <motion.div
                  key={c.title}
                  variants={paintIn}
                  custom={CARDS_START + i * CARD_STAGGER}
                  className="group relative h-[302px] flex-[0_0_100%] snap-start rounded-[30px] bg-white/50 p-5 shadow-[0_20px_20px_rgba(0,0,0,0.02)] backdrop-blur-[10px] sm:flex-[0_0_calc((100%-20px)/2)] lg:flex-[0_0_calc((100%-60px)/4)]"
                  style={{ outline: "2px solid white", outlineOffset: -2 }}
                >
                  {c.href ? (
                    <Link href={c.href} className="block h-full w-full" aria-label={c.title}>
                      {cardInner}
                    </Link>
                  ) : (
                    cardInner
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Mobile/tablet controls — arrows + pagination dots below the
              carousel. Hidden from lg up, where the arrows sit in the header. */}
          {hasNav && mounted && (
            <div className="flex items-center justify-center gap-4 lg:hidden">
              <NavButton
                dir="prev"
                disabled={atStart}
                onClick={() => page(-1)}
              />
              <div className="flex items-center gap-2">
                {Array.from({ length: pageCount }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === activePage || undefined}
                    onClick={() => goToPage(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === activePage ? "w-5 bg-[#1273A6]" : "w-2 bg-[#CFE9F7]"
                    }`}
                  />
                ))}
              </div>
              <NavButton dir="next" disabled={atEnd} onClick={() => page(1)} />
            </div>
          )}
        </motion.div>
      </section>
    </MotionConfig>
  );
}
