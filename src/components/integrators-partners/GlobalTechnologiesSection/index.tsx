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

const gridStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
};

const logoItem: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } },
};

// "Integrated with leading global technologies" — dark navy rounded band with
// two rows of technology-partner cards. The rows are centered and masked so
// the outermost cards fade toward the edges, matching the design.
export default function GlobalTechnologiesSection() {
  const mid = Math.ceil(TECH_PARTNER_LOGOS.length / 2);
  const rows = [TECH_PARTNER_LOGOS.slice(0, mid), TECH_PARTNER_LOGOS.slice(mid)];

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative bg-[#dff2f3]">
        {/* full-width rounded band — the gradient covers the whole band, the
            40px top corners curve against the light backdrop */}
        <div className="relative overflow-hidden rounded-t-[40px] px-6 lg:px-[60px]">
          {/* deep navy base with a diagonal light beam from the upper right */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_120%_at_85%_0%,rgba(64,120,255,0.3),transparent_60%),linear-gradient(118deg,#12306B_0%,#0A1A44_35%,#070F2B_70%,#0B1C4A_100%)]"
          />

          {/* side shades spanning the full band — cards (and the future
              carousel) slide under these and fade toward the band edges */}
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
            {/* z-30 keeps the header above the side shades; the card rows
                stay below them so they fade at the edges */}
            <motion.header variants={fadeUp} className="relative z-30 flex flex-col gap-2.5">
              <h2 className="text-[26px] font-bold leading-none text-white">
                {GLOBAL_TECH_HEADER.title}
              </h2>
              <p className="max-w-[720px] text-[16px] font-normal leading-[24px] text-white/85">
                {GLOBAL_TECH_HEADER.subtitle}
              </p>
            </motion.header>

            <motion.div variants={gridStagger} className="flex flex-col gap-5">
              {rows.map((row) => (
                <div key={row[0]} className="flex justify-center gap-12">
                  {row.map((src) => (
                    <motion.div
                      variants={logoItem}
                      key={src}
                      className="flex h-[72px] w-[160px] shrink-0 items-center justify-center rounded-[10px] bg-[linear-gradient(180deg,#FFFFFF,#DDF3FF)] px-5 py-4 shadow-[0_4px_14px_rgba(255,255,255,0.04)]"
                    >
                      <span className="relative block size-full">
                        <Image
                          src={src}
                          alt="Technology partner"
                          fill
                          className="object-contain"
                          sizes="160px"
                        />
                      </span>
                    </motion.div>
                  ))}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
