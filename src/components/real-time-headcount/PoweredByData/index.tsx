"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// With Lenis smoothing the scroll, a low `amount` fires the reveal as the
// section's top edge peeks over the viewport bottom — finished before it's
// really on screen. Pull the trigger line up and require a real slice visible.
const VIEWPORT = {
  once: true,
  amount: 0.3,
  margin: "0px 0px -120px 0px",
} as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay },
  }),
};

const CARDS = [
  {
    key: "speed",
    title: "Speed",
    icon: "/facial-recognition/icon-speed.svg",
    image: "/facial-recognition/speed.png",
    description: "Real-time updates ensure decisions can be made immediately during emergencies",
  },
  {
    key: "accuracy",
    title: "Accuracy",
    icon: "/facial-recognition/icon-accuracy.svg",
    image: "/real-time-headcount/accuracy.png",
    description: "Headcount is based on actual on-site data not assumptions or manual checks.",
  },
  {
    key: "reliability",
    title: "Reliability",
    icon: "/real-time-headcount/reliability-icon.svg",
    image: "/real-time-headcount/reliability.png",
    description: "Designed to perform under pressure in high-volume, high-risk environments.",
  },
];

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
      className="relative w-full max-h-[381px] h-full"
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
        {/* Notch SVG */}
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

      {/* Floating badge icon */}
      <div
        className="absolute left-1/2 z-10 flex items-center justify-center overflow-hidden"
        style={{
          top: -25,
          width: 64,
          height: 64,
          transform: "translateX(-50%)",
          background: "rgb(240, 249, 255)",
          borderRadius: 22,
          boxShadow: "0 6px 24px rgba(10,78,110,0.18)",
        }}
      >
        <Image
          src={icon}
          alt={title}
          width={86}
          height={86}
          unoptimized
          className="w-full h-full"
          style={{ objectFit: "cover", transform: "scale(4.5) translateY(5%) translateX(0.2%)", transformOrigin: "center" }}
        />
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
        padding: "3px 10px",
      }} >
        <p className="text-center mb-[14px] text-[20px] font-bold text-[#005276] leading-[22px]">{title}</p>

        <div className="max-h-[284px] h-full relative w-full overflow-hidden rounded-[16px]" style={{ paddingBottom: "78%" }}>
          <Image
            src={image}
            alt={title}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover h-[284px]"
          />
          <div
  className="absolute bottom-0 left-0 right-0 rounded-t-[16px] px-4 py-4"
  style={{
    background:
      "linear-gradient(180deg, rgba(34,34,34,0.08) 0%, rgba(34,34,34,0.55) 100%)",
    backdropFilter: "blur(7px)",
    WebkitBackdropFilter: "blur(6px)",
    borderTop: "1px solid rgba(255,255,255,0.15)",
    boxShadow: "0 -4px 20px rgba(0,0,0,0.20)",
  }}
>
  <p className="text-[13px] md:text-[16px] leading-[22px] text-white">
    {description}
  </p>
</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PoweredByData() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        className="px-6 py-14 lg:px-15 lg:py-16"
        style={{ background: "linear-gradient(180deg, #EDF7FF 0%, #F5FBFF 100%)" }}
      >
        <div className="mx-auto max-w-330">

          <motion.h2
            variants={fadeUp}
            custom={0.05}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="mb-16 text-[24px] font-bold leading-8 text-[#0A4B6E] sm:text-[26px] sm:leading-9"
          >
            Powered by real-time operational data
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 gap-16 sm:gap-8 sm:grid-cols-3"
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
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
