"use client";

import Image from "next/image";
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

const wipeUp: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  show: (delay = 0) => ({
    clipPath: "inset(0% 0 0 0)",
    transition: { delay, duration: 0.75, ease: EASE },
  }),
};

const CARDS_START  = 0.5;
const CARD_STAGGER = 0.12;

type EnvCardData = { image: string; title: string; desc: string; active?: boolean };

type EnvironmentsContent = {
  heading?: string;
  subtitle?: string;
  cards?: EnvCardData[];
  footerImage?: string;
};

function EnvCard({
  card,
  delay = 0,
}: Readonly<{ card: EnvCardData; delay?: number }>) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      className="flex flex-col gap-4 rounded-[20px] border border-transparent p-3 transition-all duration-300 hover:border-[#3FA7EA] hover:bg-white/[0.03] hover:shadow-[0_0_44px_rgba(63,167,234,0.30)]"
    >
      <Image
        src={card.image}
        alt={card.title}
        width={347}
        height={312}
        unoptimized
        className="h-auto w-full rounded-[14px] object-cover"
      />
      <div className="flex flex-col gap-2 px-1 pb-1">
        <p className="text-[16px] font-bold leading-[21px] text-white">{card.title}</p>
        <p className="text-[13px] leading-[19px] text-[#8FA6BE]">{card.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Environments({
  environments = {},
}: Readonly<{ environments?: EnvironmentsContent }> = {}) {
  const {
    heading = "Designed for any environment.",
    subtitle = "V-Watch Ai adapts to different types of construction projects wherever workforce coordination, compliance, and site control are critical.",
    cards = [],
    footerImage = "/industries/construction/designed-environment/env-footer.png",
  } = environments;

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative z-10 -mt-8 overflow-hidden rounded-[38px] bg-[#040b14] px-6 py-16 lg:-mt-12 lg:rounded-[50px] lg:px-[60px]">
        <Image
          src="/industries/construction/designed-environment/env-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none select-none object-cover object-top"
        />

        <motion.div
          className="relative mx-auto flex w-full max-w-[1320px] flex-col gap-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Header — wipeTop */}
          <header className="flex flex-col gap-2.5">
            <motion.h2
              variants={wipeDown}
              custom={0.05}
              className="text-[28px] font-extrabold leading-[34px] text-white"
            >
              {heading}
            </motion.h2>
            <motion.p
              variants={wipeDown}
              custom={0.2}
              className="max-w-[640px] text-[16px] leading-[24px] text-[#9DB2C9]"
            >
              {subtitle}
            </motion.p>
          </header>

          {/* Cards — one by one */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, i) => (
              <EnvCard
                key={card.title}
                card={card}
                delay={CARDS_START + i * CARD_STAGGER}
              />
            ))}
          </div>

          {/* Footer banner — wipebottom */}
          {footerImage && (
            <motion.div variants={wipeUp} custom={CARDS_START + cards.length * CARD_STAGGER}>
              <Image
                src={footerImage}
                alt=""
                width={1168}
                height={180}
                unoptimized
                className="h-auto w-full rounded-[20px]"
              />
            </motion.div>
          )}
        </motion.div>
      </section>
    </MotionConfig>
  );
}
