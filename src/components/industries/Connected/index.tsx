"use client";

import Image from "next/image";
import { Fragment, type ReactNode } from "react";
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

const CARDS_START  = 0.45;
const CARD_STAGGER = 0.18;

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

function Medallion({ icon }: Readonly<{ icon: string }>) {
  const iconSrc = icon.startsWith("/") ? icon : ICON_SRC[icon];
  if (iconSrc) {
    return (
      <Image
        src={iconSrc}
        alt=""
        width={210}
        height={210}
        unoptimized
        className="size-[210px] object-contain"
      />
    );
  }
  return (
    <div className="relative flex size-[128px] items-center justify-center">
      <Image src={`${ASSET}/circle.png`} alt="" width={128} height={128} unoptimized className="absolute inset-0 size-[128px] object-contain" />
      <span className="relative flex items-center justify-center">{ICONS[icon] ?? null}</span>
    </div>
  );
}

function StepCard({
  step,
  tilt = 0,
  delay = 0,
}: Readonly<{ step: Step; tilt?: number; delay?: number }>) {
  return (
    <div
      className="relative flex w-full max-w-[380px] flex-col items-center justify-start gap-3 rounded-[26px] px-8 pb-6 pt-6 text-center lg:flex-1"
      style={{
        minHeight: 150,
        // Real 3D tilt: side cards rotate around the vertical axis so their
        // near edge comes forward and the far edge tapers away.
        transform: tilt
          ? `perspective(1100px) rotateY(${tilt}deg)`
          : undefined,
        transformOrigin: "center",
      
        border: "1px solid rgba(255,255,255,0.9)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow: "0 30px 60px -32px rgba(40,90,160,0.28), 0 4px 16px -6px rgba(40,90,160,0.08)",
      }}
    >
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-[44%] rounded-t-[26px]"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%)" }}
      />
      <Medallion icon={step.icon} />
      <div className="flex flex-col gap-2.5">
        <p className="text-[19px] font-bold text-[#13476B]">{step.title}</p>
        <p className="mx-auto max-w-[220px] text-[13.5px] leading-[20px] text-[#5E7C95]">{step.desc}</p>
      </div>
    </div>
  );
}

function Connector() {
  return (
    <div
      className="relative z-20 -mx-3 hidden shrink-0 items-center justify-center rounded-full lg:flex"
      style={{
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        padding: "5px 7px",
        boxShadow: "0 10px 26px -10px rgba(40,90,160,0.35), 0 2px 6px rgba(40,90,160,0.08)",
      }}
    >
      <span
        className="flex size-7 items-center justify-center rounded-full text-white"
        style={{
          backgroundImage: "linear-gradient(135deg, #3DA9F5 0%, #7A3BD0 130%)",
          boxShadow: "0 4px 10px -3px rgba(80,60,180,0.45)",
        }}
      >
        <svg viewBox="0 0 14 14" fill="none" aria-hidden className="size-3">
          <path d="M5 3l4 4-4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <svg viewBox="0 0 16 14" fill="none" aria-hidden className="ml-1 mr-0.5 w-[15px]">
        <path d="M2 7h11m0 0-3.5-3.5M13 7l-3.5 3.5" stroke="#3DA9F5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
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

  const tiltFor = (i: number, total: number) => {
    if (total < 2) return 0;
    if (i === 0) return 16;
    if (i === total - 1) return -16;
    return 0;
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        className="relative z-10 overflow-hidden px-6 py-20 lg:px-[60px]"
        style={{ background: "linear-gradient(180deg, #F8FCFF 0%, #ECF5FE 55%, #F8FCFF 100%)" }}
      >
        <span className="pointer-events-none absolute -left-32 top-10 size-[420px] rounded-full" style={{ background: "radial-gradient(circle, rgba(61,169,245,0.16) 0%, rgba(61,169,245,0) 70%)", filter: "blur(20px)" }} />
        <span className="pointer-events-none absolute -right-40 bottom-0 size-[460px] rounded-full" style={{ background: "radial-gradient(circle, rgba(122,59,208,0.10) 0%, rgba(122,59,208,0) 70%)", filter: "blur(20px)" }} />

        <motion.div
          className="relative mx-auto flex w-full max-w-[1320px] flex-col gap-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Header — wipeTop */}
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
              className="max-w-[620px] text-[16px] leading-[24px] text-[#5E7C95]"
            >
              {subtitle}
            </motion.p>
          </header>

          {/* Step cards — one by one */}
          <div
            className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-10"
            style={{ perspective: 1400 }}
          >
            {steps.map((step, i) => (
              <Fragment key={step.title}>
                {i > 0 && <Connector />}
                <StepCard
                  step={step}
                  tilt={tiltFor(i, steps.length)}
                  delay={CARDS_START + i * CARD_STAGGER}
                />
              </Fragment>
            ))}
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
