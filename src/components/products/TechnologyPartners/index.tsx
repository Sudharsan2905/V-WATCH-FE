"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";
import { TECH_PARTNER_LOGOS } from "@/constants/integrators-partners";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const headerStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const gridStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
};

const logoItem: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } },
};


function IconBox({ src }: Readonly<{ src: string }>) {
  return (
    <span className="flex size-[54px] shrink-0 items-center justify-center rounded-[14px] border-2 border-white bg-[rgba(244,251,255,0.2)] shadow-[9px_7px_60px_rgba(255,255,255,0.4),6px_10px_23px_rgba(217,226,255,0.85),0_13px_100px_rgba(199,199,199,0.25)]">
      <Image src={src} alt="" width={36} height={36} className="size-9" />
    </span>
  );
}

export default function TechnologyPartners() {
  const mid = Math.ceil(TECH_PARTNER_LOGOS.length / 2);
  const rows = [TECH_PARTNER_LOGOS.slice(0, mid), TECH_PARTNER_LOGOS.slice(mid)];

  return (
    <MotionConfig reducedMotion="user">
      <div className="px-6 lg:px-[60px]">
        <motion.div
          className="mx-auto flex w-full max-w-[1410px] flex-col gap-[30px]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            variants={headerStagger}
            className="flex flex-col items-center gap-3.5"
          >
            <motion.div variants={fadeUp} className="flex w-full items-center gap-3.5">
              <IconBox src="/products/eco/icon-partners.svg" />
              <p className="flex-1 text-[20px] font-bold leading-[26px] text-[#0A4B6E]">
                Technology Partners
                <br />
                Integrated with leading systems
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="w-full pl-[70px]">
              <p className="text-[20px] font-normal leading-[26px] text-[#0A4B6E]">
                V-Watch Ai integrates with industry-leading technologies to
                extend functionality and work within your existing ecosystem.
              </p>
            </motion.div>
          </motion.div>

          <div className="flex flex-col items-center gap-2.5">
            <motion.div variants={gridStagger} className="flex flex-col gap-5">
              {rows.map((row) => (
                <div key={row[0]} className="flex justify-center gap-4 sm:gap-8 lg:gap-12">
                  {row.map((src) => (
                    <motion.div
                      key={src}
                      variants={logoItem}
                      className="flex h-[56px] w-[120px] shrink-0 items-center justify-center rounded-[10px] bg-[linear-gradient(180deg,#FFFFFF,#DDF3FF)] px-3 py-2.5 shadow-[0_4px_14px_rgba(255,255,255,0.04)] sm:h-[72px] sm:w-[160px] sm:px-5 sm:py-4"
                    >
                      <span className="relative block size-full">
                        <Image
                          src={src}
                          alt="Technology partner"
                          fill
                          className="object-contain [filter:grayscale(1)]"
                          sizes="160px"
                        />
                      </span>
                    </motion.div>
                  ))}
                </div>
              ))}
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="text-[20px] font-bold leading-[26px] text-[#1d6c97]"
            >
              Designed to integrate not replace your existing systems.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </MotionConfig>

  );
}
