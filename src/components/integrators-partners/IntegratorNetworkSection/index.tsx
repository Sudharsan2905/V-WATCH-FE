"use client";

import Image from "next/image";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  type Variants,
} from "motion/react";
import { INTEGRATORS, NETWORK_NOTE } from "@/constants/integrators-partners";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const listStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
};

const panelReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function DoubleChevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden>
      <path
        d="m7 6 5 6-5 6M13 6l5 6-5 6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckDot() {
  return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 0C4.47734 0 0 4.47734 0 10C0 15.5227 4.47734 20 10 20C15.5227 20 20 15.5227 20 10C20 4.47734 15.5227 0 10 0ZM15.7031 8.34453L9.69258 14.6566C9.52878 14.8285 9.33198 14.9655 9.11397 15.0595C8.89596 15.1534 8.66122 15.2024 8.42383 15.2035H8.41602C8.17994 15.2036 7.94626 15.1562 7.72884 15.0642C7.51143 14.9722 7.31472 14.8375 7.15039 14.668L3.96094 11.3824C3.79614 11.217 3.66584 11.0205 3.5776 10.8043C3.48936 10.5881 3.44493 10.3566 3.4469 10.1231C3.44887 9.88961 3.49719 9.65883 3.58906 9.44417C3.68093 9.2295 3.81452 9.03523 3.98208 8.87261C4.14964 8.70999 4.34783 8.58227 4.56515 8.49686C4.78246 8.41145 5.01458 8.37006 5.24802 8.37508C5.48147 8.38009 5.71159 8.43143 5.92503 8.5261C6.13848 8.62077 6.33099 8.75689 6.49141 8.92656L8.40352 10.8961L13.1492 5.9125C13.4717 5.57383 13.9156 5.37715 14.3831 5.36572C14.8506 5.35429 15.3035 5.52906 15.6422 5.85156C15.9809 6.17407 16.1775 6.6179 16.189 7.08543C16.2004 7.55295 16.0256 8.00586 15.7031 8.34453Z"
          fill="url(#paint0_linear_476_2044)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_476_2044"
            x1="10"
            y1="0"
            x2="10"
            y2="20"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#005276" />
            <stop offset="1" stopColor="#006F9F" />
          </linearGradient>
        </defs>
      </svg>
  );
}

function SparkIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.8">
        <path
          d="M23.4443 10.396L21.7655 8.49505C21.4057 8.13861 21.1659 7.42574 21.1659 6.9505V5.0495C21.1659 3.74257 20.0866 2.79208 18.8874 2.79208H16.8487C16.3691 2.79208 15.6496 2.55446 15.2898 2.19802L13.3711 0.534653C12.5316 -0.178218 11.2125 -0.178218 10.3731 0.534653L8.57428 2.19802C8.21451 2.55446 7.49499 2.79208 7.01531 2.79208H4.97668C3.65756 2.79208 2.6982 3.86139 2.6982 5.0495V7.06931C2.6982 7.54455 2.45836 8.25743 2.0986 8.61386L0.53964 10.5149C-0.17988 11.3465 -0.17988 12.6535 0.53964 13.4851L2.0986 15.3861C2.45836 15.7426 2.6982 16.4554 2.6982 16.9307V18.9505C2.6982 20.2574 3.77748 21.2079 4.97668 21.2079H7.01531C7.49499 21.2079 8.21451 21.4455 8.57428 21.802L10.493 23.4653C11.3324 24.1782 12.6516 24.1782 13.491 23.4653L15.4097 21.802C15.7695 21.4455 16.489 21.2079 16.9687 21.2079H19.0073C20.3264 21.2079 21.2858 20.1386 21.2858 18.9505V16.9307C21.2858 16.4554 21.5256 15.7426 21.8854 15.3861L23.5643 13.4851C24.1639 12.6535 24.1639 11.2277 23.4443 10.396Z"
          fill="url(#paint0_linear_476_2026)"
        />
        <path
          d="M17.8291 11.2827C17.7092 11.6392 16.3901 15.5599 16.3901 15.5599C16.2702 16.2728 15.4307 16.8669 14.7112 16.8669H12.4327C12.073 16.8669 11.4734 16.7481 11.2335 16.5104L9.43472 15.2035C9.43472 15.9164 9.07496 16.2728 8.23552 16.2728C8.23552 16.2728 8.59528 16.2728 7.75584 16.2728C6.9164 16.2728 6.55664 15.9164 6.55664 15.0847V9.38172C6.55664 8.55004 6.9164 8.19361 7.75584 8.19361H8.35544C9.19488 8.19361 9.55464 8.55004 9.55464 9.38172V9.85697L11.8331 6.41143C12.073 6.05499 12.6726 5.81737 13.1522 5.93618C13.7518 6.1738 14.1116 6.76786 13.9917 7.24311L13.7518 9.1441C13.7518 9.26291 13.7518 9.50054 13.8718 9.61935C13.9917 9.73816 14.1116 9.73816 14.2315 9.73816H16.6299C17.1096 9.73816 17.7092 10.2134 17.7092 10.2134C17.949 10.451 17.949 10.9263 17.8291 11.2827Z"
          fill="#D9FF60"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_476_2026"
          x1="12"
          y1="0"
          x2="12"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#005276" />
          <stop offset="1" stopColor="#006F9F" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// "Our system integrator network" — interactive directory. Clickable
// integrator cards on the left drive the detail panel on the right
// (description, capabilities checklist, country map). Visual language
// borrowed from the products Ecosystem section (frosted cards over a soft
// blue gradient).
export default function IntegratorNetworkSection() {
  const [active, setActive] = useState(0);
  const current = INTEGRATORS[active];

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden px-6 pb-20 lg:px-[60px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_85%_35%,rgba(176,226,243,0.5),transparent_60%),linear-gradient(180deg,#eaf7fa_0%,#f6fcfe_45%,#dff2f3_100%)]"
        />

        <motion.div
          className="relative z-10 mx-auto flex w-full max-w-[1410px] flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-[34px]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Integrator cards */}
          <motion.div
            variants={listStagger}
            className="flex w-full flex-col gap-5 lg:w-[550px] lg:shrink-0"
          >
            {INTEGRATORS.map((integrator, i) => {
              const isActive = i === active;
              return (
                <motion.button
                  key={integrator.name}
                  variants={cardItem}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={`relative flex min-h-[80px] w-full items-center gap-3.5 rounded-[16px] border-[1.25px] border-white/80 py-4 pl-4 pr-5 text-left transition-colors duration-300 ${
                    isActive
                      ? "bg-[linear-gradient(180deg,#B8E6FF,#C1ECFF)] shadow-[0_8px_22px_rgba(126,207,250,0.45)]"
                      : "bg-white/[0.32] shadow-[inset_0_4px_84px_white,inset_20px_0_24px_rgba(126,207,250,0.1),inset_-20px_0_24px_rgba(126,207,250,0.1),0_6px_16px_rgba(126,207,250,0.28)]"
                  }`}
                >
                  <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
                    <Image
                      src={integrator.logo}
                      alt=""
                      width={48}
                      height={48}
                      className="size-full object-cover"
                    />
                  </span>
                  <span className="flex-1">
                    <span className="block text-[18px] font-medium leading-[1.1] text-[#1d293d]">
                      {integrator.name}
                    </span>
                    <span className="mt-[5px] block text-[16px] font-normal leading-[22px] text-[#314158]">
                      {integrator.country}
                    </span>
                  </span>
                  <span
                    className={isActive ? "text-[#1273A6]" : "text-[#7FC4EA]"}
                  >
                    <DoubleChevron />
                  </span>
                </motion.button>
              );
            })}

            {/* expansion note */}
            <motion.div
              variants={cardItem}
              className="mt-1 flex items-center gap-4"
            >
              <span className="flex size-[54px] shrink-0 items-center justify-center rounded-full border-[1.25px] border-white bg-[linear-gradient(180deg,rgba(184,230,255,0.6),rgba(193,236,255,0.6))] shadow-[0_10px_24px_rgba(126,207,250,0.3)]">
                <Image
                  src="/products/Globe.svg"
                  alt=""
                  width={32}
                  height={32}
                  className="size-8"
                />
              </span>
              <p className="max-w-[300px] text-[16px] font-medium leading-[22px] text-[#1d293d]">
                {NETWORK_NOTE}
              </p>
            </motion.div>
          </motion.div>

          {/* Detail panel */}
          <motion.div
            variants={panelReveal}
            className="relative flex w-full flex-1 flex-col overflow-hidden rounded-[32px] border-2 border-white bg-[linear-gradient(rgba(255,255,255,0.2),rgba(255,255,255,0.2)),linear-gradient(rgba(212,240,255,0.14),rgba(212,240,255,0.14))] p-5 shadow-[0_13px_24px_rgba(92,183,232,0.1),6px_10px_23px_rgba(245,248,255,0.2)]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="flex min-h-0 flex-1 flex-col gap-5"
              >
                <p className="text-[18px] font-normal leading-[26px] text-[#314158]">
                  {current.description}
                </p>

                <div className="flex min-h-0 flex-1 flex-col gap-8 rounded-[24px] border border-[#DEF5FD] bg-white/60 px-5 pb-6 pt-5 sm:flex-row sm:items-stretch sm:justify-between sm:gap-6">
                  {/* capabilities */}
                  <div className="flex flex-1 flex-col gap-5">
                    <div className="flex items-center gap-2.5">
                      <SparkIcon />
                      <span className="bg-[linear-gradient(90deg,#005276,#1D6C97,#6A8515)] bg-clip-text text-[16px] font-semibold leading-5 text-transparent">
                        Capabilities
                      </span>
                    </div>
                    <ul className="flex flex-col gap-3.5">
                      {current.capabilities.map((capability) => (
                        <li
                          key={capability}
                          className="flex items-center gap-3"
                        >
                          <CheckDot />
                          <span className="text-[18px] font-normal leading-[18.75px] text-[#314158]">
                            {capability}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* country map + label — the map box is contained by the
                      panel height (fixed height only on mobile, where there
                      is no row height to inherit) */}
                  <div className="flex min-h-0 flex-1 flex-col items-end gap-4">
                    <div className="relative h-[170px] w-full sm:min-h-0 sm:flex-1">
                      <Image
                        src={current.map}
                        alt={`${current.country} map`}
                        fill
                        className="object-contain [filter:drop-shadow(0_10px_24px_rgba(46,159,216,0.35))]"
                        sizes="(max-width: 640px) 90vw, 320px"
                      />
                    </div>
                    <p className="text-right text-[40px] font-normal leading-[22px] text-[#314158]/60">
                      {current.country}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
