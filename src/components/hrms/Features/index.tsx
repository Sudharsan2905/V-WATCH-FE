"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";
import { HRMS_FEATURES } from "@/constants/hrms-features";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay },
  }),
};

const VIEWPORT = { once: true, amount: 0.2, margin: "0px 0px -100px 0px" } as const;

function CheckTick({ className = "" }: Readonly<{ className?: string }>) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={className}
    >
      <circle cx="8" cy="8" r="8" fill="currentColor" opacity="0.14" />
      <path
        d="M4.8 8.2 6.8 10.2 11.2 5.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HrmsFeatures() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-[#f7fbfe] px-6 py-14 lg:px-15 lg:py-20">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="flex flex-col gap-3"
          >
            <motion.h2
              variants={fadeUp}
              custom={0.05}
              className="max-w-[720px] font-lato text-[26px] font-bold leading-[1.25] text-[#0A4B6E] sm:text-[30px]"
            >
              Everything Your Team Needs in One Connected HRMS
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.12}
              className="max-w-[700px] font-lato text-[15px] leading-[24px] text-[#0A6FA8] sm:text-[16px]"
            >
              Give HR teams, managers and employees the tools they need to
              complete everyday tasks faster and with fewer manual processes.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="grid grid-cols-1 gap-5 md:grid-cols-2"
          >
            {HRMS_FEATURES.map((f, i) => (
              <motion.div
                key={f.number}
                variants={fadeUp}
                custom={0.1 + i * 0.07}
                className="relative flex flex-col gap-4 rounded-[18px] p-6"
              >
                {/* Surface layer — fill, border and shadow all live here so a
                    mask can dissolve the right edge into the section
                    background; content sits above it, unmasked and opaque. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[18px] bg-[#f2f6ff]"
                  style={{
                    boxShadow:
                      "0 4px 20px rgba(10,75,110,0.05), 0 0 0 1px rgba(220,239,252,0.9)",
                    maskImage: "linear-gradient(to right, #000 65%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to right, #000 65%, transparent 100%)",
                  }}
                />

                <div className="relative flex items-center gap-2.5">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background:
                        "linear-gradient(180deg, #21B1F1 0%, #A6C936 100%)",
                    }}
                  >
                    <Image src={f.icon} alt="" width={18} height={18} />
                  </span>
                </div>
                <div className="relative flex items-start gap-2.5">
                  <span className="font-lato text-[28px] font-bold leading-[1.1] text-[#5CB7E8]">
                    {f.number}
                  </span>
                  <div className="flex flex-col gap-0.5 pt-0.5">
                    <span className="font-lato text-[16px] font-bold text-[#0A4B6E]">
                      {f.title}
                    </span>
                    <h3 className="font-lato text-[15px] font-bold leading-[21px] text-[#0A4B6E]">
                      {f.headline}
                    </h3>
                  </div>
                </div>

                <ul className="relative flex flex-col gap-2">
                  {f.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 font-lato text-[13.5px] leading-[19px] text-[#314158]"
                    >
                      {/* <CheckTick className="mt-0.5 shrink-0 text-[#2FA84F]" /> */}
                      <Image
                        src="/hrms-new/check-icon.svg"
                        alt=""
                        width={15}
                        height={15}
                        className="mt-0.5 shrink-0"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {f.footnote && (
                  <p className="relative font-lato text-[13.5px] italic leading-[19px] text-[#5C7E97]">
                    {f.footnote}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
