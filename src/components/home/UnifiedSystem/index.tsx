"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, type Variants } from "motion/react";

// ---------------- Animations ----------------

const wipeTop: Variants = {
  hidden: {
    clipPath: "inset(0 0 100% 0)",
    opacity: 0,
  },
  visible: (delay = 0) => ({
    clipPath: "inset(0 0 0 0)",
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      delay,
    },
  }),
};

const loadIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      delay,
    },
  }),
};

const BASE_H = 90;
const BENEFITS_DELAY = 0.5;
const CARD_STEP = 0.15;

const benefitCard: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    height: BASE_H,
  },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    height: BASE_H,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      delay: BENEFITS_DELAY + i * CARD_STEP,
    },
  }),
};

// ---------------- Data ----------------

type Benefit = {
  n: number;
  text: string;
};

const BENEFITS: Benefit[] = [
  {
    n: 1,
    text: "One source of truth",
  },
  {
    n: 2,
    text: "One operational view",
  },
  {
    n: 3,
    text: "One platform to control everything",
  },
];

// ---------------- Components ----------------

function NumberBadge({
  n,
  active,
}: Readonly<{
  n: number;
  active?: boolean;
}>) {
  return (
    <span className="flex size-11 shrink-0 items-center justify-center rounded-[11px] border-[1.63px] border-white bg-[rgba(244,251,255,0.40)] shadow-[7.3px_5.7px_48.9px_rgba(255,255,255,0.4),4.9px_8.1px_18.7px_rgba(217,226,255,0.85),0_10.6px_81.5px_rgba(199,199,199,0.25)]">
      <motion.span
        animate={{
          color: active ? "#3890c0" : "rgba(15,23,42,0.6)",
        }}
        transition={{
          duration: 0.35,
        }}
        className="text-[27px] font-black leading-none tracking-[-0.054px]"
      >
        {n}
      </motion.span>
    </span>
  );
}

// ---------------- Main Component ----------------

export default function UnifiedSystem() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Rotate active card every 2.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % BENEFITS.length);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative z-20 -mt-10 overflow-hidden rounded-t-[40px] bg-[#EDF1F8] px-6 pb-20 pt-[80px] lg:px-[60px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#E7EDF7_0%,#EDF2FA_30%,#F6F9FD_62%,#FFFFFF_92%)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 hidden select-none lg:block"
        style={{
          bottom: "-60.78125vw",
          height: "111.5625vw",
        }}
      >
        <Image
          src="/home/one-system.svg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_42%_at_50%_46%,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_72%)]"
      />

      <div className="relative mx-auto flex w-full max-w-[1410px] flex-col gap-[30px]">
        <motion.header
          className="flex max-w-[807px] flex-col gap-2.5 text-[#0A4B6E]"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >
          <motion.h2
            variants={wipeTop}
            custom={0}
            className="max-w-[642px] text-[26px] font-bold"
          >
            What if everything worked as one system?
          </motion.h2>

          <motion.p
            variants={wipeTop}
            custom={0.15}
            className="text-[20px] font-normal leading-[26px]"
          >
            V-Watch AI brings your entire operation into a single, connected
            platform where everything is tracked, managed and automated in real
            time.
          </motion.p>
        </motion.header>

        <motion.div
          className="flex flex-col items-stretch gap-[30px] lg:flex-row lg:items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >
          {/* Left */}
          <div className="flex flex-1 flex-col gap-3.5 p-3.5">
            <motion.p
              variants={wipeTop}
              custom={BENEFITS_DELAY - 0.3}
              className="max-w-[415px] text-[20px] font-bold text-[#0A4B6E]"
            >
              Instead of switching between systems, you get
            </motion.p>

            <div className="flex flex-col">
              {BENEFITS.map((b, i) => {
                const isActive = activeIndex === i;

                return (
                  <motion.div
                    key={b.n}
                    variants={benefitCard}
                    custom={i}
                    initial={false}
                    animate={{
                      scale: isActive ? 1 : 0.975,
                      opacity: isActive ? 1 : 0.72,
                      y: isActive ? -4 : 0,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      zIndex: BENEFITS.length - i,
                    }}
                    className={`relative flex items-start overflow-hidden rounded-[16px] px-5 ${
                      i === 0 ? "py-5" : "-mt-[11px] pb-5 pt-[31px]"
                    }`}
                  >
                    {/* Animated Background */}
                    <motion.div
                      className="absolute inset-0 overflow-hidden rounded-[16px] border backdrop-blur-md"
                      initial={false}
                      animate={{
                        background: isActive
                          ? "linear-gradient(180deg, rgba(248,253,255,.95) 0%, rgba(236,247,255,.82) 100%)"
                          : "linear-gradient(180deg, rgba(255,255,255,.42) 0%, rgba(255,255,255,.20) 100%)",

                        borderColor: isActive
                          ? "rgba(255,255,255,.98)"
                          : "rgba(255,255,255,.55)",

                        boxShadow: isActive
                          ? `
        0 28px 60px rgba(56,144,192,.18),
        0 10px 28px rgba(165,215,255,.35),
        inset 0 1px 0 rgba(255,255,255,.95),
        inset 0 -1px 0 rgba(255,255,255,.45)
      `
                          : `
        0 10px 22px rgba(130,145,170,.08),
        0 2px 10px rgba(255,255,255,.20),
        inset 0 1px 0 rgba(255,255,255,.55)
      `,
                      }}
                      transition={{
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {/* Top Shine */}
                      <motion.div
                        className="absolute inset-x-6 top-0 h-px rounded-full"
                        animate={{
                          opacity: isActive ? 1 : 0.45,
                          background: isActive
                            ? "linear-gradient(90deg,transparent,rgba(255,255,255,.95),transparent)"
                            : "linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent)",
                        }}
                      />

                      {/* Blue Ambient Glow */}
                      <motion.div
                        className="absolute -right-6 -top-6 h-24 w-24 rounded-full blur-3xl"
                        animate={{
                          opacity: isActive ? 0.28 : 0,
                          backgroundColor: "#76D5FF",
                        }}
                      />

                      {/* Bottom Light */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-10"
                        animate={{
                          opacity: isActive ? 0.8 : 0.25,
                          background:
                            "linear-gradient(180deg,transparent,rgba(255,255,255,.45))",
                        }}
                      />
                    </motion.div>

                    <div className="relative flex items-center gap-3.5">
                      <NumberBadge n={b.n} active={isActive} />

                      <motion.p
                        initial={false}
                        animate={{
                          color: isActive ? "#0A8EC8" : "rgba(15,23,42,.62)",
                          x: isActive ? 3 : 0,
                        }}
                        transition={{
                          duration: 0.35,
                        }}
                        className="text-[18px] font-bold"
                      >
                        {b.text}
                      </motion.p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Side Image */}
          <motion.div
            variants={loadIn}
            custom={0.25}
            className="relative aspect-[590/302] w-full overflow-hidden rounded-[16px] lg:w-[590px] lg:shrink-0"
          >
            <Image
              src="/home/unified-visual.png"
              alt="From security to execution, everything is connected, automated, and measurable"
              fill
              priority
              sizes="590px"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
