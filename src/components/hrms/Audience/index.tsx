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

const VIEWPORT = { once: true, amount: 0.25, margin: "0px 0px -100px 0px" } as const;

const AUDIENCE_CARDS = [
  {
    title: "For HR Teams",
    description:
      "Maintain employee information, attendance, payroll, leave and claims through one system",
    image: "/hrms-new/everyone/hr.webp",
  },
  {
    title: "For Managers",
    description:
      "See pending requests and approve employee submissions without waiting for paperwork.",
    image: "/hrms-new/everyone/manager.webp",
  },
  {
    title: "For Employees",
    description:
      "Complete everyday HR tasks through a simple mobile and web experience.",
    image: "/hrms-new/everyone/employee.webp",
  },
  {
    title: "For Business Owners",
    description:
      "Gain clearer visibility over workforce information while keeping HR costs predictable.",
    image: "/hrms-new/everyone/owner.webp",
  },
];

export default function HrmsAudience() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative z-0 overflow-hidden rounded-t-[40px] bg-[#e9f3fb] px-6 py-14 lg:px-15 lg:py-20">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-10">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={fadeUp}
            className="max-w-[860px] font-lato text-[26px] font-bold leading-[1.3] text-[#0A4B6E] sm:text-[28px]"
          >
            Less Administration for HR. A Better Experience for Everyone
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {AUDIENCE_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                custom={0.1 + i * 0.08}
                className="flex aspect-[150/161] flex-col justify-between rounded-[20px] border border-[#E3EEFB] bg-white p-5 shadow-[0_10px_32px_rgba(10,75,110,0.08)]"
              >
                <h3 className="font-lato text-[20px] font-bold text-[#0F172A]">
                  {card.title}
                </h3>

                <div className="relative mx-auto my-4 aspect-[242/161] w-full max-w-[180px]">
                  <Image
                    src={card.image}
                    alt=""
                    aria-hidden
                    fill
                    unoptimized
                    sizes="180px"
                    className="object-contain"
                  />
                </div>

                <p className="text-center font-lato font-normal text-[18px] leading-[20px] text-[#0F172A]">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
