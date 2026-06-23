"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay },
  }),
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};


const STEPS = [
  {
    number: "01",
    icon: "/facial-recognition/icon-01.png",
    label: "Verified access logs know exactly who entered",
  },
  {
    number: "02",
    icon: "/facial-recognition/icon-02.png",
    label: "Real-time alerts for unauthorized attempts",
  },
  {
    number: "03",
    icon: "/facial-recognition/icon-03.png",
    label: "Integrated compliance and audit tracking",
  },
  {
    number: "04",
    icon: "/facial-recognition/icon-04.png",
    label: "Complete activity history for investigation",
  },
];

const CARDS = [
  {
    key: "accuracy",
    title: "Accuracy",
    icon: "/facial-recognition/icon-accuracy.png",
    image: "/facial-recognition/accuracy.png",
    description: "Designed to perform reliably across real-world conditions including varied lighting, PPE, and high-traffic environments.",
  },
  {
    key: "privacy",
    title: "Privacy",
    icon: "/facial-recognition/icon-privacy.png",
    image: "/facial-recognition/privacy.png",
    description: "Biometric data is securely stored and managed with strict access controls and compliance standards.",
  },
  {
    key: "speed",
    title: "Speed",
    icon: "/facial-recognition/icon-speed.png",
    image: "/facial-recognition/speed.png",
    description: "Verification happens instantly enabling high-volume entry without delays.",
  },
];

function StepRow({
  number,
  icon,
  label,
  delay,
}: {
  number: string;
  icon: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      className="flex flex-1 items-center gap-4 rounded-[16px] px-5 py-3"
      style={{
        background: "rgb(242, 249, 255)",
        border: "1.5px solid #D6E8F5",
        boxShadow: "0 4px 16px rgba(10,78,110,0.08), 0 1px 4px rgba(10,78,110,0.04)",
      }}
    >
      {/* 254×254 PNG — icon content is ~80px centered. Scale so 80px fills 50px of the 56px box */}
      <div
        className="shrink-0 overflow-hidden"
        style={{ width: 56, height: 56, borderRadius: 12, background: "#FFF3F0" }}
      >
        <div style={{
          width: 254,
          height: 254,
          transform: "scale(0.965)",
          transformOrigin: "center center",
          marginTop: `${(56 - 254) / 2}px`,
          marginLeft: `${(56 - 254) / 2}px`,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={icon} alt="" style={{ width: 254, height: 282, display: "block" }} />
        </div>
      </div>
      <p className="flex-1 text-[15px] font-semibold leading-6 text-[#1A2B4B]">
        {label}
      </p>
      <span
        className="shrink-0 text-[28px] font-bold tabular-nums"
        style={{ color: "rgba(10,140,200,0.15)" }}
      >
        {number}
      </span>
    </motion.div>
  );
}

function FeatureCard({
  title,
  icon,
  image,
  description,
  delay,
}: {
  title: string;
  icon: string;
  image: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      className="relative w-full"
      style={{ filter: "drop-shadow(0 16px 36px rgba(184,209,236,0.45))" }}
    >
      {/* Header: left piece + SVG notch + right piece */}
      <div className="flex" style={{ position: "relative", zIndex: 2 }}>
        {/* Left */}
        <div style={{
          flex: 1,
          height: 48,
          background: "rgb(240, 249, 255)",
          borderTop: "1.5px solid #dce9f7",
          borderLeft: "1.5px solid #dce9f7",
          borderTopLeftRadius: 24,
        }} />
        {/* Notch SVG — 160px wide, 48px deep to cradle the 86px badge */}
        <svg
          width="160"
          height="48"
          viewBox="0 0 160 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0 }}
        >
          <path
            d="M 0,0.75 C 20,0.75 20,47.25 40,47.25 L 120,47.25 C 140,47.25 140,0.75 160,0.75 L 160,48 L 0,48 Z"
            fill="rgb(240, 249, 255)"
          />
          <path
            d="M 0,0.75 C 20,0.75 20,47.25 40,47.25 L 120,47.25 C 140,47.25 140,0.75 160,0.75"
            stroke="#dce9f7"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
        {/* Right */}
        <div style={{
          flex: 1,
          height: 48,
          background: "rgb(240, 249, 255)",
          borderTop: "1.5px solid #dce9f7",
          borderRight: "1.5px solid #dce9f7",
          borderTopRightRadius: 24,
        }} />
      </div>

      {/* Floating badge icon — large rounded-square, half above the notch */}
      <div
        className="absolute left-1/2 z-10 flex items-center justify-center overflow-hidden"
        style={{
          top: -45,
          width: 86,
          height: 86,
          transform: "translateX(-50%)",
          background: "rgb(240, 249, 255)",
          borderRadius: 22,
          boxShadow: "0 6px 24px rgba(10,78,110,0.18)",
        }}
      >
        <Image src={icon} alt={title} width={86} height={86} unoptimized className="w-full h-full" style={{ objectFit: "cover", transform: "scale(2.8)", transformOrigin: "center" }} />
      </div>

      {/* Card body */}
      <div style={{
        marginTop: -1,
        background: "rgb(240, 249, 255)",
        borderLeft: "1.5px solid #dce9f7",
        borderRight: "1.5px solid #dce9f7",
        borderBottom: "1.5px solid #dce9f7",
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        padding: "24px 16px 16px",
      }}>
        {/* Title */}
        <p className="text-center mb-4 text-[17px] font-bold text-[#0A4B6E]">{title}</p>

        {/* Image */}
        <div className="relative w-full overflow-hidden rounded-[14px]" style={{ paddingBottom: "78%" }}>
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover"
          />
          <div
            className="absolute bottom-0 left-0 right-0 px-4 py-4"
            style={{
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              background: "rgba(10, 20, 40, 0.45)",
              borderBottomLeftRadius: 14,
              borderBottomRightRadius: 14,
            }}
          >
            <p className="text-[13px] leading-5 text-white">{description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


export default function HowItWorksNew() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        className="px-6 py-14 lg:px-15 lg:py-16"
        style={{ background: "linear-gradient(180deg, #EDF7FF 0%, #F5FBFF 100%)" }}
      >
        <div className="mx-auto max-w-330">

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            custom={0.05}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="mb-8 text-[24px] font-bold leading-8 text-[#0A4B6E] sm:text-[28px] sm:leading-9"
          >
            How It Works
          </motion.h2>

          {/* Top: left face image + right step rows */}
          <motion.div
            className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
          >
            {/* Left image — matches height of the 4 step rows */}
            <motion.div
              variants={slideLeft}
              custom={0.1}
              className="relative w-full overflow-hidden rounded-[20px] lg:w-[44%] lg:shrink-0"
              style={{ minHeight: 340 }}
            >
              <Image
                src="/facial-recognition/how-it-works-left.png"
                alt="Facial recognition scan"
                fill
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover"
              />
            </motion.div>

            {/* Right: 4 step rows — stretch to fill same height */}
            <div className="flex flex-1 flex-col gap-4">
              {STEPS.map((step, i) => (
                <StepRow key={step.number} {...step} delay={0.2 + i * 0.1} />
              ))}
            </div>
          </motion.div>

          {/* Bottom: 3 feature cards */}
          <motion.div
            className="mt-30 grid grid-cols-1 gap-16 sm:gap-8 sm:grid-cols-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {CARDS.map(({ key, title, icon, image, description }, i) => (
              <FeatureCard key={key} title={title} icon={icon} image={image} description={description} delay={0.2 + i * 0.12} />
            ))}
          </motion.div>

        </div>
      </section>
    </MotionConfig>
  );
}
