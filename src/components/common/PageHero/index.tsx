"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, MotionConfig, type Variants } from "motion/react";
import BookADemo from "@/components/common/BookADemo";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const badgeReveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { delay: 0.15, duration: 0.4, ease: EASE } },
};

const headingReveal: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.3, duration: 0.6, ease: EASE },
  },
};

const copyReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5, ease: EASE },
  }),
};

type SecondaryCta = { label: string; href: string };

type PageHeroProps = {
  bgImage: string;
  bgAlt?: string;
  bgObjectPosition?: string;
  badge?: string;
  heading: string;
  description: string;
  showBookADemo?: boolean;
  secondaryCta?: SecondaryCta;
};

export default function PageHero({
  bgImage,
  bgAlt = "",
  bgObjectPosition = "center",
  badge = "",
  heading,
  description,
  showBookADemo = false,
  secondaryCta,
}: Readonly<PageHeroProps>) {
  const hasCtas = showBookADemo || secondaryCta;

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative min-h-[600px] overflow-hidden bg-[#030515] lg:min-h-[754px]">
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{ '--desktop-pos': bgObjectPosition } as React.CSSProperties}
        >
          <Image
            src={bgImage}
            alt={bgAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[68%_center] sm:object-center"
          />
        </motion.div>

        <div className="relative z-10 mx-auto w-full max-w-[1410px] px-6 lg:px-[60px]">
          <motion.div
            className="flex flex-col justify-center pt-[150px] pb-[100px] lg:min-h-[754px] lg:max-w-[700px] lg:py-[140px]"
            initial="hidden"
            animate="show"
          >
            {badge && (
              <motion.span
                variants={badgeReveal}
                className="inline-flex w-fit items-center gap-[6px] rounded-full border border-white/15 bg-linear-to-b from-white/20 to-white/5 px-[13px] py-[9px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_8px_24px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md"
              >
                <span className="size-[11px] rounded-full bg-[#86D58B] shadow-[0_0_8px_2px_rgba(134,213,139,0.6)]" />
                <span className="text-sm leading-none text-white sm:text-base">{badge}</span>
              </motion.span>
            )}

            <motion.h1
              variants={headingReveal}
              className="text-[28px] font-black leading-[1.25] tracking-[0.5px] text-white sm:text-[44px] sm:leading-[1.2] lg:text-[50px] lg:leading-[68px]"
            >
              {heading}
            </motion.h1>

            <motion.p
              variants={copyReveal}
              custom={0.5}
              className="max-w-140 mt-[20px]  text-sm leading-6 text-white sm:text-base sm:leading-7 lg:text-[20px] lg:leading-8"
            >
              {description}
            </motion.p>

            {hasCtas && (
              <motion.div
                variants={copyReveal}
                custom={0.65}
                className="flex mt-[30px] flex-wrap items-center gap-4"
              >
                {showBookADemo && <BookADemo />}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-white/40 bg-white px-5 text-base font-bold text-[#516413] backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
