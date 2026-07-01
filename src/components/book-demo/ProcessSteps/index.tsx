"use client";

import { Fragment } from "react";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};

const STEPS = [
  {
    number: "1",
    icon: "/book-a-demo/icons/review-icon.svg",
    title: "We review your requirements",
    description: "Our team assesses your needs based on your submission.",
  },
  {
    number: "2",
    icon: "/book-a-demo/icons/contacts-icon.svg",
    title: "A consultant contacts you within 24 hours",
    description: "We'll schedule a session at your convenience.",
  },
  {
    number: "3",
    icon: "/book-a-demo/icons/platform-icon.svg",
    title: "You get a guided demo + trial access",
    description: "Explore the platform with support from our team.",
  },
];

// ─── SVG card background (Rectangle.svg path translated to origin) ────────────

function CardBackground({ id }: { id: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full overflow-visible"
      viewBox="0 0 313 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <filter
          id={`csf-${id}`}
          x="-290"
          y="-236"
          width="815"
          height="680"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          {/* shadow 1 */}
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="ha1" />
          <feOffset dx="10" dy="20" in="ha1" result="s1o" />
          <feGaussianBlur stdDeviation="26" in="s1o" result="s1b" />
          <feComposite in="s1b" in2="ha1" operator="out" result="s1c" />
          <feColorMatrix in="s1c" type="matrix" values="0 0 0 0 0.6 0 0 0 0 0.878431 0 0 0 0 1 0 0 0 0.18 0" result="s1col" />
          <feBlend mode="normal" in="s1col" in2="BackgroundImageFix" result="eff1" />
          {/* shadow 2 */}
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="ha2" />
          <feOffset dx="6" dy="10" in="ha2" result="s2o" />
          <feGaussianBlur stdDeviation="11.5" in="s2o" result="s2b" />
          <feComposite in="s2b" in2="ha2" operator="out" result="s2c" />
          <feColorMatrix in="s2c" type="matrix" values="0 0 0 0 0.85098 0 0 0 0 0.886275 0 0 0 0 1 0 0 0 0.85 0" result="s2col" />
          <feBlend mode="normal" in="s2col" in2="eff1" result="eff2" />
          {/* shadow 3 – large left glow */}
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="ha3" />
          <feOffset dx="-40" dy="14" in="ha3" result="s3o" />
          <feGaussianBlur stdDeviation="125" in="s3o" result="s3b" />
          <feComposite in="s3b" in2="ha3" operator="out" result="s3c" />
          <feColorMatrix in="s3c" type="matrix" values="0 0 0 0 0.721569 0 0 0 0 0.901961 0 0 0 0 1 0 0 0 0.2 0" result="s3col" />
          <feBlend mode="normal" in="s3col" in2="eff2" result="eff3" />
          {/* shadow 4 – white glow */}
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="ha4" />
          <feOffset dx="9" dy="14" in="ha4" result="s4o" />
          <feGaussianBlur stdDeviation="30" in="s4o" result="s4b" />
          <feComposite in="s4b" in2="ha4" operator="out" result="s4c" />
          <feColorMatrix in="s4c" type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0" result="s4col" />
          <feBlend mode="normal" in="s4col" in2="eff3" result="eff4" />
          <feBlend mode="normal" in="SourceGraphic" in2="eff4" result="shape" />
        </filter>
        <linearGradient
          id={`csg-${id}`}
          x1="163.237"
          y1="0"
          x2="110.401"
          y2="183.193"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="0.207865" stopColor="#AEDBF4" stopOpacity="0.2" />
          <stop offset="0.849387" stopColor="white" />
        </linearGradient>
      </defs>
      <g filter={`url(#csf-${id})`}>
        {/* white fill */}
        <path
          d="M0 24C0 10.745 10.7452 0 24 0H232.551C242.373 0 251.652 4.511 257.718 12.236L313.203 82.892C316.026 86.486 316.053 91.535 313.269 95.159L257.716 167.492C251.659 175.378 242.281 180 232.337 180H24C10.7451 180 0 169.255 0 156V24Z"
          fill="white"
        />
        {/* gradient stroke (0.5 px inset path) */}
        <path
          d="M24 0.5H232.551C242.22 0.5 251.353 4.94 257.325 12.545L312.811 83.201C315.491 86.615 315.517 91.412 312.873 94.854L257.319 167.188C251.357 174.95 242.125 179.5 232.337 179.5H24C11.0213 179.5 0.5 168.979 0.5 156V24C0.5 11.021 11.0213 0.5 24 0.5Z"
          stroke={`url(#csg-${id})`}
        />
      </g>
    </svg>
  );
}

// ─── Connector atoms ─────────────────────────────────────────────────────────

function ConnectorPill({ isLast }: { isLast: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center justify-between"
      style={{
        height: 29,
        borderRadius: 52,
        background:
          "linear-gradient(180deg, #21B1F1 0%, #6BADF6 55%, #E7A7FF 100%)",
        boxShadow: "0 3px 12px rgba(33,177,241,0.35)",
        padding: "0 0 0 6px",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/book-a-demo/icons/iconsax-arrow-left4.svg"
        alt=""
        aria-hidden
        width={20}
        height={20}
      />
      <div
        className="flex shrink-0 items-center justify-center rounded-full bg-white"
        style={{
          width: 40,
          height: 40,
          boxShadow: "0px 3.48px 3.48px 0px rgba(92,183,232,0.20)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            isLast
              ? "/book-a-demo/icons/iconsax-tick-circle.svg"
              : "/book-a-demo/icons/iconsax-arrow-right3.svg"
          }
          alt=""
          aria-hidden
          width={24}
          height={24}
          className={isLast ? "-rotate-90 lg:rotate-0" : ""}
        />
      </div>
    </div>
  );
}

// ─── Connectors ───────────────────────────────────────────────────────────────

function DesktopConnector({ isLast }: { isLast: boolean }) {
  return (
    <div className="relative z-20 hidden shrink-0 items-center lg:flex lg:-ml-6 lg:mr-4">
      <ConnectorPill isLast={isLast} />
    </div>
  );
}

function MobileConnector({ isLast }: { isLast: boolean }) {
  return (
    <div className="flex items-center justify-center py-2 lg:hidden">
      <div className={"rotate-90"}>
        <ConnectorPill isLast={isLast} />
      </div>
    </div>
  );
}

// ─── Step card ────────────────────────────────────────────────────────────────

function StepCard({
  number,
  icon,
  title,
  description,
  delay = 0,
}: (typeof STEPS)[number] & { delay?: number }) {
  return (
    <motion.div variants={fadeUp} custom={delay} className="flex flex-1 items-center">
      {/* Icon circle straddling the card's left edge */}
      <div
        className="relative z-20 flex shrink-0 items-center justify-center rounded-full bg-white"
        style={{
          width: 48,
          height: 48,
          marginRight: -16,
          boxShadow:
            "0 6px 22px rgba(10,78,110,0.18), 0 1px 4px rgba(10,78,110,0.08)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={icon}
          alt=""
          aria-hidden
          className="h-[26px] w-[26px] object-contain"
        />
      </div>

      {/* Arrow card */}
      <div className="relative z-10 flex-1 h-full">
        {/* SVG background from Rectangle.svg (path translated to origin) */}
        <CardBackground id={number} />

        {/* Bottom-right corner highlight — rgb(245,246,255) shade, clipped to arrow shape */}
        <div
          className="pointer-events-none absolute bottom-0 right-0 z-[1]"
          style={{
            width: "48%",
            height: "65%",
            background:
              "radial-gradient(ellipse at 85% 100%, rgba(245,246,255,0.95) 0%, rgba(245,246,255,0.55) 35%, transparent 70%)",
            clipPath:
              "polygon(0% 0%, 88% 0%, 100% 22%, 64% 90%, 46% 100%, 0% 100%)",
          }}
        />

        {/* Desktop number: absolutely positioned, ~50% above card top edge */}
        <span
          aria-hidden
          className="pointer-events-none hidden select-none leading-none lg:absolute lg:block lg:z-30"
          style={{
            fontSize: 70,
            fontWeight: 900,
            lineHeight: "100%",
            color: "rgba(62,160,254,0.45)",
            top: -40,
            left: 44,
          }}
        >
          {number}
        </span>

        {/* Content — drives the outer div height */}
        <div
          className="relative pb-4 pt-3.5 lg:pt-6"
          style={{ paddingLeft: 36, paddingRight: "22%", zIndex: 2 }}
        >
          {/* Mobile: number left + text right (hidden on desktop) */}
          <div className="flex items-start gap-3 lg:hidden">
            <span
              className="shrink-0 select-none leading-none"
              style={{ fontSize: 82, fontWeight: 900, lineHeight: "100%", color: "rgba(62,160,254,0.45)" }}
            >
              {number}
            </span>
            <div className="flex flex-col gap-0.5 pt-1">
              <h3 className="text-[18px] font-bold leading-[24px] text-[#006F9F]">
                {title}
              </h3>
              <p className="text-[16px] font-normal leading-[20px] text-[#006F9F]">
                {description}
              </p>
            </div>
          </div>

          {/* Desktop: text only — number is the absolute span above */}
          <div className="hidden lg:flex lg:flex-col lg:gap-0.5">
            <h3 className="text-[18px] font-bold leading-[24px] text-[#006F9F]">
              {title}
            </h3>
            <p className="text-[16px] font-normal leading-[20px] text-[#006F9F]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ProcessSteps() {
  return (
    <MotionConfig reducedMotion="user">
    <section
      className="sm:py-6"
      style={{
        background:
          "linear-gradient(180deg, #EBF5FF 0%, #F2F8FE 55%, #FFFFFF 100%)",
      }}
    >
      <motion.div
        className="mx-auto max-w-[1280px] px-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Heading */}
        <motion.div variants={fadeUp} className="mb-14 sm:mb-10">
          <h2 className="mb-3 text-[22px] font-black text-[#0D1F35] sm:text-[32px] lg:text-[34px]">
            What happens next
          </h2>
        </motion.div>

        {/* Steps row */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-0 my-10">
          {STEPS.map((step, i) => (
            <Fragment key={step.number}>
              <StepCard {...step} delay={0.1 + i * 0.15} />
              <DesktopConnector isLast={i === STEPS.length - 1} />
              <MobileConnector isLast={i === STEPS.length - 1} />
            </Fragment>
          ))}
        </div>
      </motion.div>
    </section>
    </MotionConfig>
  );
}
