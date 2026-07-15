"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const wipeDown: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  show: (delay = 0) => ({
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { delay, duration: 0.6, ease: EASE },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay },
  }),
};

const NEED_TO_KNOW = [
  { icon: "/real-time-headcount/emergency-icon-1.svg", label: "Who is still on-site" },
  { icon: "/real-time-headcount/emergency-icon-2.svg", label: "Who has exited safely" },
  { icon: "/real-time-headcount/emergency-icon-3.svg", label: "Who is unaccounted for" },
];

const CANNOT_RELY_ON = [
  { icon: "/real-time-headcount/emergency-icon-4.svg", label: "Manual roll calls" },
  { icon: "/real-time-headcount/emergency-icon-5.svg", label: "Incomplete attendance records" },
  { icon: "/real-time-headcount/emergency-icon-6.svg", label: "Delayed information" },
];

export default function WhenEmergencyHappens() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative z-10 -mt-12 lg:-mt-16 ">
        <div className="overflow-hidden rounded-t-[28px] bg-[#EDF7FF] min-h-[320px]  px-6 py-10 sm:px-8 sm:py-12 lg:px-[60px] lg:py-10">
          <div className="mx-auto max-w-[1280px]">
            {/* Header */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="max-w-[953px]"
            >
              <motion.h2
                variants={wipeDown}
                custom={0.05}
                className="text-[22px] font-bold leading-8 text-[#0A4B6E] sm:text-[26px] sm:leading-9"
              >
                When an emergency happens
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={0.2}
                className="mt-2 text-[16px] md:text-[20px] font-normal leading-[28px] text-[#0A4B6E]"
              >
                During an emergency, teams need immediate visibility into
                workforce status because every second lost can directly impact
                safety and response effectiveness.
              </motion.p>
            </motion.div>

            {/* 3-column layout */}
            <motion.div
              className="mt-[30px] flex flex-col justify-center gap-8 lg:flex-row lg:items-center lg:gap-[20px]"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
            >
              {/* Left: You need to know */}
              <div className="flex w-full flex-col items-center gap-6 lg:flex-1 lg:items-start lg:text-left lg:py-[33px] lg:pl-[45px]">
                <motion.p
                  variants={fadeUp}
                  custom={0.1}
                  className="text-[20px] font-bold leading-[30px] text-[#1D6C97]"
                >
                  You need to know
                </motion.p>
                <div className="flex flex-col gap-5">
                  {NEED_TO_KNOW.map((item, i) => (
                    <motion.div
                      key={item.label}
                      variants={fadeUp}
                      custom={0.15 + i * 0.1}
                      className="flex items-center gap-4"
                    >
                      <div className="relative h-[54px] w-[54px] shrink-0">
                        <Image
                          src={item.icon}
                          alt=""
                          fill
                          sizes="54px"
                          className="object-contain"
                        />
                      </div>
                      <span className="text-[18px] font-normal leading-[24px] text-[#0F172A]">
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Centre: floor plan image */}
              <motion.div
                variants={fadeUp}
                custom={0.2}
                className="relative mx-auto flex justify-center w-full max-w-[400px] shrink-0 lg:w-[416px] lg:max-w-none"
              >
                <Image
                  src="/real-time-headcount/emergency-floor-plan.svg"
                  alt="Emergency floor plan showing occupant locations"
                  width={416}
                  height={320}
                  className="h-full w-full object-contain"
                />
              </motion.div>

              {/* Right: And you cannot rely on */}
              <div className="flex w-full flex-col items-center gap-6 lg:flex-1 lg:items-start lg:text-left lg:py-[33px] lg:pr-[45px]">
                <motion.p
                  variants={fadeUp}
                  custom={0.1}
                  className="text-[20px] font-bold leading-[30px] text-[#1D6C97]"
                >
                  And you cannot rely on
                </motion.p>
                <div className="flex flex-col gap-5">
                  {CANNOT_RELY_ON.map((item, i) => (
                    <motion.div
                      key={item.label}
                      variants={fadeUp}
                      custom={0.25 + i * 0.1}
                      className="flex items-center gap-4"
                    >
                      <div className="relative h-[54px] w-[54px] shrink-0 rounded-full bg-white shadow-sm overflow-hidden">
                        <Image
                          src={item.icon}
                          alt=""
                          fill
                          sizes="54px"
                          className="object-contain scale-[4] -translate-y-[-30%]"
                        />
                      </div>
                      <span className="text-[18px] font-normal leading-[24px] text-[#0F172A]">
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
