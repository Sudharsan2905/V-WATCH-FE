"use client";

import Image from "next/image";
import ViewAllUseCases from "@/components/common/ViewAllUseCases";
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

const CARDS_START   = 0.5;
const CARD_STAGGER  = 0.15;

type UseCaseCard = { image: string; title: string; desc: string };

type UseCasesContent = {
  heading?: string;
  subtitle?: string;
  ctaHref?: string;
  cards?: UseCaseCard[];
};

function Card({
  image,
  title,
  desc,
  delay = 0,
}: Readonly<UseCaseCard & { delay?: number }>) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      className="rounded-[20px] bg-white p-1.5 shadow-[0px_30px_50px_-30px_rgba(20,46,92,0.35)]"
    >
      <div className="relative aspect-[256/282] overflow-hidden rounded-[15px]">
        <Image src={image} alt="" fill sizes="(max-width:1024px) 50vw, 23vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,20,35,0.9)] via-[rgba(8,20,35,0.28)] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-4 backdrop-blur-[4px]">
          <p className="text-[17px] font-bold leading-[21px] text-white">{title}</p>
          <p className="text-[13px] leading-[18px] text-white/85">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function UseCases({
  useCases = {},
}: Readonly<{ useCases?: UseCasesContent }> = {}) {
  const {
    heading = "Solve critical challenges",
    subtitle = "",
    ctaHref = "#",
    cards = [],
  } = useCases;

  return (
    <MotionConfig reducedMotion="user">
      <section
        className="relative z-10 -mt-8 overflow-hidden rounded-t-[38px] px-6 py-16 lg:-mt-12 lg:rounded-t-[50px] lg:px-[60px]"
        style={{ background: "linear-gradient(160deg, #E8F3FD 0%, #F5FAF2 100%)" }}
      >
        <motion.div
          className="mx-auto flex w-full max-w-[1320px] flex-col gap-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Header — wipeTop */}
          <header className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
            <div className="flex max-w-[680px] flex-col gap-2.5">
              <motion.h2
                variants={wipeDown}
                custom={0.05}
                className="text-[28px] font-extrabold leading-[34px] text-[#0A4B6E]"
              >
                {heading}
              </motion.h2>
              <motion.p
                variants={wipeDown}
                custom={0.2}
                className="text-[16px] leading-[24px] text-[#3E6079]"
              >
                {subtitle}
              </motion.p>
            </div>
            <motion.div variants={fadeUp} custom={0.3} className="shrink-0">
              <ViewAllUseCases href={ctaHref} />
            </motion.div>
          </header>

          {/* Cards — load one by one */}
          {cards.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {cards.map((c, i) => (
                <Card
                  key={c.title}
                  {...c}
                  delay={CARDS_START + i * CARD_STAGGER}
                />
              ))}
            </div>
          )}
        </motion.div>
      </section>
    </MotionConfig>
  );
}
