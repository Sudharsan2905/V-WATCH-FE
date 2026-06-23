"use client";

import { motion, MotionConfig, type Variants } from "motion/react";
import ContactInfoPanel from "./ContactInfoPanel";
import ContactForm from "./ContactForm";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};

const panelLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE, delay: 0.1 } },
};

const formRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE, delay: 0.25 } },
};

export default function DirectContact() {
  return (
    <MotionConfig reducedMotion="user">
    <section className="relative overflow-hidden bg-[#F2F8FE] px-6 pt-8 pb-12 lg:px-[60px] lg:pt-10 lg:pb-[120px]">
      <motion.div
        className="mx-auto flex w-full max-w-[1160px] flex-col gap-[30px]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Heading */}
        <motion.header variants={fadeUp} className="flex max-w-[552px] flex-col gap-2.5">
          <h2 className="text-[19px] font-bold leading-[25px] text-[#0A4B6E] sm:text-[26px] sm:leading-[31px]">
            Prefer to reach out directly?
          </h2>
          <p className="text-[14px] font-normal leading-[21px] text-[#0A4B6E] sm:text-[20px] sm:leading-[28px]">
            Get in touch with the right team faster through our direct contact
            channels.
          </p>
        </motion.header>

        {/* Body: blue panel + form. Form overlaps on lg, stacks on mobile. */}
        <div className="relative">
          <motion.div variants={panelLeft}>
            <ContactInfoPanel />
          </motion.div>

          {/* Form: stacks below on mobile; on lg sits at right:45px, vertically
              centered with a slight upward offset per Figma (top:50% - 563/2 - 20.5). */}
          <motion.div
            variants={formRight}
            className="mt-6 lg:absolute lg:right-[45px] lg:top-1/2 lg:mt-0 lg:-translate-y-[calc(50%+20px)]"
          >
            <ContactForm />
          </motion.div>

          {/* Availability microcopy — sits directly under the blue panel on lg,
              regardless of the absolute-positioned form on the right. */}
          <motion.p
            variants={fadeUp}
            custom={0.4}
            className="mt-6 flex items-center gap-2 text-[14px] font-bold leading-[20px] text-[#0A8EC8] lg:mt-5"
          >
            <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full border border-[#0A8EC8]">
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2 5l2 2 4-4"
                  stroke="#0A8EC8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Our team is available Monday–Friday, 9:00 AM – 5:00 PM.
          </motion.p>
        </div>
      </motion.div>
    </section>
    </MotionConfig>
  );
}
