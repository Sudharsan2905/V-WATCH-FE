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

const CARDS = [
  {
    key: "speed",
    title: "Speed",
    icon: "/facial-recognition/icon-speed.png",
    image: "/facial-recognition/speed.png",
    description: "Real-time updates ensure decisions can be made immediately during emergencies",
  },
  {
    key: "accuracy",
    title: "Accuracy",
    icon: "/facial-recognition/icon-accuracy.png",
    image: "/real-time-headcount/accuracy.png",
    description: "Headcount is based on actual on-site data not assumptions or manual checks.",
  },
  {
    key: "reliability",
    title: "Reliability",
    icon: "/real-time-headcount/reliability-icon.png",
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
          top: -45,
          width: 86,
          height: 86,
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
        padding: "24px 16px 16px",
      }}>
        <p className="text-center mb-4 text-[17px] font-bold text-[#0A4B6E]">{title}</p>

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
            viewport={{ once: true, amount: 0.1 }}
            className="mb-16 text-[24px] font-bold leading-8 text-[#0A4B6E] sm:text-[28px] sm:leading-9"
          >
            Powered by real-time operational data
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 gap-16 sm:gap-8 sm:grid-cols-3"
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
