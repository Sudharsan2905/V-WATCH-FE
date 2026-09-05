"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay },
  }),
};

const VIEWPORT = { once: true, amount: 0.3, margin: "0px 0px -100px 0px" } as const;

const PAIN_POINTS = [
  {
    icon: "/hrms-new/managing/attendance.svg",
    text: "Attendance records need to be checked manually",
  },
  {
    icon: "/hrms-new/managing/conversation.svg",
    text: "Leave and claim approvals get buried in conversations",
  },
  {
    icon: "/hrms-new/managing/payroll.svg",
    text: "Payroll information has to be entered more than once.",
  },
  {
    icon: "/hrms-new/managing/query.svg",
    text: "Employees constantly ask HR for balances, records and updates.",
  },
  {
    icon: "/hrms-new/managing/workforce.svg",
    text: "Managers lack one clear view of their workforce",
  },
];

export default function HrmsOverview() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-[#F2F8FE] px-6 py-14 lg:px-15 lg:py-20">
        <div className="relative mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[1fr_420px] lg:items-center lg:gap-16">
          {/* Left — copy + pain-point checklist */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-3">
              <motion.h2
                variants={fadeUp}
                custom={0.05}
                className="max-w-[640px] font-lato text-[26px] font-bold leading-[1.25] text-[#0A4B6E] sm:text-[30px]"
              >
                Still Managing HR Through Spreadsheets, Paper Forms and
                WhatsApp?
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={0.12}
                className="max-w-[600px] font-lato text-[15px] leading-[24px] text-[#0A6FA8] sm:text-[16px]"
              >
                Everyday HR tasks become unnecessarily difficult when employee
                information is spread across different files, messages and
                systems.
              </motion.p>
            </div>

            <div className="flex flex-col gap-3">
              {PAIN_POINTS.map((point, i) => (
                <motion.div
                  key={point.text}
                  variants={fadeUp}
                  custom={0.18 + i * 0.06}
                  className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[8px_14px_32px_0px_rgba(10,75,110,0.12)]"
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px]"
                    style={{
                      background:
                        "linear-gradient(180deg, #EAF4FC 0%, #F7FBFF 100%)",
                      boxShadow: "4.89px 8.15px 18.74px 0px rgba(217,226,255,0.85)",
                    }}
                  >
                    <Image
                      src={point.icon}
                      alt=""
                      width={24}
                      height={24}
                      unoptimized
                    />
                  </span>
                  <span className="font-lato text-[14px] font-medium leading-[20px] text-[#0F172A] sm:text-[15px]">
                    {point.text}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.p
              variants={fadeUp}
              custom={0.5}
              className="max-w-[560px] text-center font-lato text-[15px] font-semibold leading-[24px] text-[#0A6FA8] sm:text-[16px]"
            >
              V-Watch HRMS brings everything together, giving your team one
              reliable place to manage employees and the HR work surrounding
              them.
            </motion.p>
          </motion.div>

          {/* Right — illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="relative mx-auto aspect-[497/559] w-full max-w-[420px]"
          >
            <Image
              src="/hrms-new/managing-hr.webp"
              alt="Illustration of a connected HR dashboard replacing scattered spreadsheets and folders"
              fill
              unoptimized
              sizes="(max-width: 1024px) 70vw, 420px"
              className="object-contain"
            />
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
