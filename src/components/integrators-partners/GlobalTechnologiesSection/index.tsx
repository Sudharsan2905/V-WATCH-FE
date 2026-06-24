"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";
import {
  GLOBAL_TECH_HEADER,
  TECH_PARTNER_LOGOS,
} from "@/constants/integrators-partners";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function LogoCard({ src }: { src: string }) {
  return (
    <div className="flex h-[72px] w-[160px] shrink-0 items-center justify-center rounded-[10px] bg-[linear-gradient(180deg,#FFFFFF,#DDF3FF)] px-5 py-4 shadow-[0_4px_14px_rgba(255,255,255,0.04)]">
      <span className="relative block size-full">
        <Image
          src={src}
          alt="Technology partner"
          fill
          className="object-contain"
          sizes="160px"
        />
      </span>
    </div>
  );
}

function MarqueeRow({ logos, direction }: { logos: string[]; direction: "left" | "right" }) {
  const doubled = [...logos, ...logos];
  const animClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";
  return (
    <div className="flex overflow-hidden">
      <div className={`flex gap-5 ${animClass}`}>
        {doubled.map((src, i) => (
          <LogoCard key={`${src}-${i}`} src={src} />
        ))}
      </div>
    </div>
  );
}

export default function GlobalTechnologiesSection() {
  const mid = Math.ceil(TECH_PARTNER_LOGOS.length / 2);
  const row1 = TECH_PARTNER_LOGOS.slice(0, mid);
  const row2 = TECH_PARTNER_LOGOS.slice(mid);

  return (
    <MotionConfig reducedMotion="user">
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left  { animation: marquee-left  28s linear infinite; }
        .animate-marquee-right { animation: marquee-right 28s linear infinite; }
      `}</style>

      <section className="relative bg-[#dff2f3]">
        <div className="relative overflow-hidden rounded-t-[40px] px-6 lg:px-[60px]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_120%_at_85%_0%,rgba(64,120,255,0.3),transparent_60%),linear-gradient(118deg,#12306B_0%,#0A1A44_35%,#070F2B_70%,#0B1C4A_100%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[140px] bg-[linear-gradient(90deg,#0A1A44_0%,rgba(10,26,68,0.55)_45%,transparent_100%)] sm:w-[180px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[140px] bg-[linear-gradient(270deg,#0A1A44_0%,rgba(10,26,68,0.55)_45%,transparent_100%)] sm:w-[180px]"
          />

          <motion.div
            className="relative mx-auto flex w-full max-w-[1410px] flex-col gap-10 pb-28 pt-14"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.header variants={fadeUp} className="relative z-30 flex flex-col gap-2.5">
              <h2 className="text-[26px] font-bold leading-none text-white">
                {GLOBAL_TECH_HEADER.title}
              </h2>
              <p className="max-w-[720px] text-[16px] font-normal leading-[24px] text-white/85">
                {GLOBAL_TECH_HEADER.subtitle}
              </p>
            </motion.header>

            <div className="flex flex-col gap-5 pb-3">
              <MarqueeRow logos={row1} direction="left" />
              <MarqueeRow logos={row2} direction="right" />
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
