"use client";

import Image from "next/image";
import { Fragment, useEffect, useState, type ReactNode } from "react";
import { motion, MotionConfig, type Variants } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";

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
    transition: { duration: 0.45, ease: EASE, delay },
  }),
};

const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  show: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1], delay },
  }),
};

const CARDS_START  = 0.3;
const CARD_STAGGER = 0.45;

const VIEWPORT = { once: true, amount: 0.15, margin: "0px 0px -120px 0px" } as const;

type Step = { icon: string; title: string; desc: string };

type ConnectedContent = {
  heading?: string;
  subtitle?: string;
  steps?: Step[];
};

const ASSET = "/industries/construction/connected";

const ICON_SRC: Record<string, string> = {
  capture: `${ASSET}/capture-1.png`,
  control: `${ASSET}/control-1.png`,
  prove:   `${ASSET}/prove-1.png`,
};

const ICONS: Record<string, ReactNode> = {
  capture: (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className="size-8">
      <g fill="#3DA9F5">
        <ellipse cx="20" cy="11" rx="4" ry="8.5" />
        <ellipse cx="29" cy="20" rx="8.5" ry="4" />
        <ellipse cx="20" cy="29" rx="4" ry="8.5" />
        <ellipse cx="11" cy="20" rx="8.5" ry="4" />
      </g>
      <circle cx="20" cy="20" r="3.4" fill="#1E8FD6" />
    </svg>
  ),
  control: (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className="size-8">
      <path d="M20 6 L24 16 L34 20 L24 24 L20 34 L16 24 L6 20 L16 16 Z" fill="#3DA9F5" />
      <circle cx="20" cy="20" r="3" fill="#1E8FD6" />
    </svg>
  ),
  prove: (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className="size-8">
      <rect x="11" y="7" width="18" height="26" rx="2.5" fill="#D7ECFB" stroke="#3DA9F5" strokeWidth="1.6" />
      <rect x="15.5" y="21" width="3" height="7" rx="1" fill="#1E8FD6" />
      <rect x="20" y="17" width="3" height="11" rx="1" fill="#1E8FD6" />
      <rect x="24.5" y="19" width="3" height="9" rx="1" fill="#1E8FD6" />
    </svg>
  ),
};

// Per-icon CSS transform to compensate for differences in PNG content:
// - control: circle is larger (occupies more of the image) and sits higher → scale down + shift down
// - capture & prove: circle is smaller and roughly centered → no adjustment needed
// translateY is expressed as a % of the element so it holds at any rendered size.
const ICON_TRANSFORM: Record<string, string> = {
  control: "translateY(9.2%) scale(0.88)",
};

function Medallion({ icon }: Readonly<{ icon: string }>) {
  const iconSrc = icon.startsWith("/") ? icon : ICON_SRC[icon];
  const transform = ICON_TRANSFORM[icon];
  if (iconSrc) {
    return (
      <Image
        src={iconSrc}
        alt=""
        width={220}
        height={220}
        className="size-[140px] object-contain lg:size-[220px]"
        style={transform ? { transform } : undefined}
      />
    );
  }
  return (
    <div
      className="relative flex size-[140px] items-center justify-center lg:size-[220px]"
      style={transform ? { transform } : undefined}
    >
      <Image src={`${ASSET}/circle.png`} alt="" width={128} height={128} unoptimized className="absolute inset-0 size-[128px] object-contain" />
      <span className="relative flex items-center justify-center">{ICONS[icon] ?? null}</span>
    </div>
  );
}

// Description card — full 2px #0A8EC8 border, 16px radius, gradient fill.
// Figma: width 288 (fill), min-height 135, padding 16, gap 6.
function DescCard({ step, delay = 0 }: Readonly<{ step: Step; delay?: number }>) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      className="flex w-full min-h-[135px] flex-col items-center justify-center gap-1.5 rounded-[16px] border-2 border-[#0A8EC8] p-4 text-center"
      style={{ background: "linear-gradient(to bottom, #F4FBFF 0%, #FFFFFF 100%)" }}
    >
      <p className="text-[19px] font-bold leading-[24px] text-[#13476B]">{step.title}</p>
      <p className="font-['Lato'] text-[16px] font-normal leading-[24px] tracking-normal text-[#005276]">{step.desc}</p>
    </motion.div>
  );
}

function Connector({ delay = 0 }: Readonly<{ delay?: number }>) {
  return (
    <motion.div
      variants={popIn}
      custom={delay}
      className="relative z-20 hidden shrink-0 lg:flex"
      style={{ width: 67.83, height: 40 }}
    >
      {/* Gradient pill — full width */}
      <div
        className="absolute inset-x-0 top-1/2 flex h-[30px] -translate-y-1/2 items-center justify-center rounded-full pr-10"
        style={{ background: "linear-gradient(135deg, #21B1F1 0%, #9B85E8 100%)" }}
      >
        <svg viewBox="0 0 14 14" fill="none" aria-hidden className="size-4 translate-x-[2px]">
          <path d="M5 3l4 4-4 4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* White circle — overlaps right side of pill */}
      <div
        className="absolute right-0 top-0 flex size-10 items-center justify-center rounded-full bg-white"
        style={{ boxShadow: "0 3.48px 3.48px 0 rgba(92,183,232,0.2)" }}
      >
        <svg viewBox="0 0 21 21" fill="none" aria-hidden className="size-[21px]">
          <path d="M4 10.5h11m0 0l-4.5-4.5M15 10.5l-4.5 4.5" stroke="#1E8FD6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </motion.div>
  );
}

// Mobile layout: Embla carousel — one step per view with icon + desc card stacked
function MobileCarousel({ steps }: Readonly<{ steps: Step[] }>) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
  });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <motion.div
      className="lg:hidden"
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="flex min-w-0 flex-[0_0_100%] flex-col items-center gap-2 px-4"
            >
              <motion.div variants={fadeUp} custom={CARDS_START + i * CARD_STAGGER}>
                <Medallion icon={step.icon} />
              </motion.div>
              <DescCard step={step} delay={CARDS_START + i * CARD_STAGGER + 0.1} />
            </div>
          ))}
        </div>
      </div>

      {steps.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {steps.map((step, i) => (
            <button
              key={step.title}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`rounded-full transition-all duration-200 ${
                i === selected
                  ? "h-[8px] w-[24px] bg-[#3D8FD6]"
                  : "size-[8px] bg-[#C6E3F8]"
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function Connected({
  connected = {},
}: Readonly<{ connected?: ConnectedContent }> = {}) {
  const {
    heading = "From site entry to project execution fully connected",
    subtitle = "",
    steps = [],
  } = connected;

  return (
    <MotionConfig reducedMotion="user">
      <section
        className="relative z-10 overflow-hidden px-6 pt-10 pb-6 md:py-20 lg:px-[60px]"
        style={{ background: "rgb(255, 255, 255)" }}
      >
        <div
          className="relative mx-auto flex w-full max-w-[1320px] flex-col gap-2"
        >
          {/* Header */}
          <motion.header
            className="flex flex-col gap-2.5"
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.h2
              variants={wipeDown}
              custom={0.05}
              className="text-[28px] font-extrabold leading-[34px] text-[#13476B]"
            >
              {heading}
            </motion.h2>
            <motion.p
              variants={wipeDown}
              custom={0.2}
              className="max-w-[620px] font-['Lato'] text-[20px] font-medium leading-[28px] tracking-normal text-[#0A4B6E]"
            >
              {subtitle}
            </motion.p>
          </motion.header>

          {/* Mobile: Embla carousel */}
          <MobileCarousel steps={steps} />

          {/* Desktop: each step is one 320px column (medallion + card stacked,
              16px gap — Figma frame), with connectors between columns aligned
              to the medallion centre. */}
          <motion.div
            className="hidden items-start justify-center lg:flex"
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {steps.map((step, i) => (
              <Fragment key={step.title}>
                {i > 0 && (
                  <div className="z-20 -mx-[34px] mt-[90px] shrink-0">
                    <Connector delay={CARDS_START + (i - 0.5) * CARD_STAGGER} />
                  </div>
                )}
                <div className="flex w-full max-w-[320px] flex-1 flex-col items-center gap-4 px-4">
                  <motion.div variants={fadeUp} custom={CARDS_START + i * CARD_STAGGER}>
                    <Medallion icon={step.icon} />
                  </motion.div>
                  <DescCard step={step} delay={CARDS_START + i * CARD_STAGGER + 0.15} />
                </div>
              </Fragment>
            ))}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
