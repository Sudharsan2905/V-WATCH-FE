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
const ICON_TRANSFORM: Record<string, string> = {
  control: "translateY(24px) scale(0.88)",
};

function Medallion({ icon }: Readonly<{ icon: string }>) {
  const iconSrc = icon.startsWith("/") ? icon : ICON_SRC[icon];
  const transform = ICON_TRANSFORM[icon];
  if (iconSrc) {
    return (
      <Image
        src={iconSrc}
        alt=""
        width={260}
        height={260}
        unoptimized
        className="size-[260px] object-contain"
        style={transform ? { transform } : undefined}
      />
    );
  }
  return (
    <div
      className="relative flex size-[260px] items-center justify-center"
      style={transform ? { transform } : undefined}
    >
      <Image src={`${ASSET}/circle.png`} alt="" width={128} height={128} unoptimized className="absolute inset-0 size-[128px] object-contain" />
      <span className="relative flex items-center justify-center">{ICONS[icon] ?? null}</span>
    </div>
  );
}

// Description card — rounded border at top corners, fades down the sides, none at bottom
function DescCard({ step, delay = 0 }: Readonly<{ step: Step; delay?: number }>) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      className="relative w-full rounded-[18px] px-6 py-5 text-center"
      style={{ background: "linear-gradient(to bottom, rgb(250, 252, 255) 0%, rgb(255, 255, 255) 100%)" }}
    >
      {/* Border overlay: real border + border-radius gives proper rounded corners.
          The mask fades it out downward so only top + partial sides are visible. */}
      <span
        className="pointer-events-none absolute inset-0 rounded-[18px]"
        style={{
          border: "2px solid rgb(106, 185, 222)",
          maskImage: "linear-gradient(to bottom, black 0%, black 35%, transparent 68%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 35%, transparent 68%)",
        }}
      />
      <p className="relative text-[19px] font-bold text-[#13476B]">{step.title}</p>
      <p className="relative mt-2 font-['Lato'] text-[16px] font-normal leading-[24px] tracking-normal text-[#005276]">{step.desc}</p>
    </motion.div>
  );
}

function Connector({ delay = 0 }: Readonly<{ delay?: number }>) {
  return (
    <motion.div
      variants={popIn}
      custom={delay}
      className="relative z-20 hidden shrink-0 lg:flex"
      style={{ width: 60, height: 32 }}
    >
      {/* Gradient pill — full width */}
      <div
        className="absolute inset-0 flex items-center rounded-full pl-3"
        style={{ background: "linear-gradient(135deg, #6AADEE 0%, #9B85E8 100%)" }}
      >
        <svg viewBox="0 0 14 14" fill="none" aria-hidden className="size-[13px]">
          <path d="M5 3l4 4-4 4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* White circle — overlaps right side of pill */}
      <div
        className="absolute right-0 top-0 flex size-8 items-center justify-center rounded-full bg-white"
        style={{ boxShadow: "0 2px 10px rgba(80,100,200,0.18)" }}
      >
        <svg viewBox="0 0 18 14" fill="none" aria-hidden className="w-[14px]">
          <path d="M2 7h12m0 0L9.5 2.5M14 7l-4.5 4.5" stroke="#5B9FE8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
    <div className="lg:hidden">
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
    </div>
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
        className="relative z-10 overflow-hidden px-6 py-20 lg:px-[60px]"
        style={{ background: "rgb(255, 255, 255)" }}
      >
        <motion.div
          className="relative mx-auto flex w-full max-w-[1320px] flex-col gap-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Header */}
          <header className="flex flex-col gap-2.5">
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
          </header>

          {/* Mobile: Embla carousel */}
          <MobileCarousel steps={steps} />

          {/* Desktop: icons row + connectors, desc cards below */}
          <div className="hidden flex-col gap-0 lg:flex">
            {/* Top row: medallions with connectors between */}
            <div className="flex items-center justify-center" style={{ height: 260 }}>
              {steps.map((step, i) => (
                <Fragment key={step.title}>
                  {i > 0 && (
                    <div className="shrink-0 self-center">
                      <Connector delay={CARDS_START + (i - 0.5) * CARD_STAGGER} />
                    </div>
                  )}
                  <motion.div
                    variants={fadeUp}
                    custom={CARDS_START + i * CARD_STAGGER}
                    className="flex h-full flex-1 items-center justify-center"
                  >
                    <Medallion icon={step.icon} />
                  </motion.div>
                </Fragment>
              ))}
            </div>

            {/* Bottom row: description cards aligned under each medallion */}
            <div className="-mt-14 flex items-start justify-center gap-6">
              {steps.map((step, i) => (
                <div key={step.title} className="flex flex-1">
                  <DescCard step={step} delay={CARDS_START + i * CARD_STAGGER + 0.15} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
