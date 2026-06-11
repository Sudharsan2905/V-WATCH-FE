"use client";

import type { ReactNode } from "react";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

type Props = {
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  /** Tailwind background class for the full-width band (default white). */
  background?: string;
};

// Standalone section heading dropped between sections in page.tsx. Carries
// the shared section gutters and white backdrop itself, and fades up on its
// own when scrolled into view. Figma: title 26px/100% bold, subtitle
// 20px/28px regular, both rgba(10,75,110,1).
export default function SectionHeader({
  title,
  subtitle,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
  background = "bg-white",
}: Readonly<Props>) {
  return (
    <MotionConfig reducedMotion="user">
      <div className={`${background} px-6 py-10 lg:px-[60px] ${className}`}>
        <motion.header
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="mx-auto flex w-full max-w-[1410px] flex-col gap-2.5 text-[#0A4B6E]"
        >
          <h2 className={`text-[26px] font-bold leading-none ${titleClassName}`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`text-[20px] font-normal leading-7 ${subtitleClassName}`}>
              {subtitle}
            </p>
          )}
        </motion.header>
      </div>
    </MotionConfig>
  );
}
