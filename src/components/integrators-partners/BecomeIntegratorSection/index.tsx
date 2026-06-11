"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";
import {
  BECOME_INTEGRATOR_HEADER,
  BECOME_INTEGRATOR_MAP,
  PARTNERSHIP_FORM_TITLE,
  PARTNERSHIP_FIELDS,
  COMPANY_TYPE_ICON,
  COMPANY_TYPES,
  FOCUS_AREAS,
  PARTNERSHIP_FORM_NOTE,
} from "@/constants/integrators-partners";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const mapReveal: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } },
};

const formReveal: Variants = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 1, ease: EASE } },
};

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden>
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-3.5" aria-hidden>
      <path
        d="m5 12.5 4.5 4.5L19 7.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Figma: label Lato 400 / 16px / 100% line-height; asterisk Lato 900 / 16px.
const labelClass =
  "text-[16px] font-normal leading-none text-[#1D293D]";
const fieldClass =
  "h-11 w-full rounded-[10px] bg-[#EFF8FE] text-[14px] text-[#1D293D] outline-none ring-1 ring-transparent transition placeholder:text-[#8AB6D6] focus:ring-[#9ED3F2]";

function RequiredMark() {
  return (
    <span
      aria-hidden
      className="text-[16px] font-black leading-none text-[#E11D48]"
    >
      {" "}
      *
    </span>
  );
}

// "Become a V-Watch Ai System Integrator" — three pieces: the section header,
// one full-width navy world-map container that runs behind the form, and the
// white partnership-enquiry form card on top of it.
export default function BecomeIntegratorSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#F6FBFF_0%,#E9F2FA_60%,#F4FAFF_100%)] px-6 py-16 lg:px-[60px]">
        <motion.div
          className="relative mx-auto w-full max-w-[1410px]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* World-map container — spans the full width, vertically centered,
              the form card overlaps its right side. lg only; hidden below
              that. */}
          <motion.div
            variants={mapReveal}
            className="absolute inset-x-0 top-1/2 hidden aspect-[1160/401] w-full -translate-y-1/2 overflow-hidden rounded-[32px] border border-white/40 bg-[linear-gradient(160deg,#0E4FA8_0%,#072B66_100%)] shadow-[0_24px_60px_rgba(7,43,102,0.35)] lg:block"
          >
            <Image
              src={BECOME_INTEGRATOR_MAP}
              alt="V-Watch Ai global integrator network"
              fill
              sizes="(max-width: 1530px) 92vw, 1410px"
              className="object-cover"
            />
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-[1fr_600px] lg:gap-[70px]">
            {/* Left column — header */}
            <div className="flex flex-col gap-8">
              <motion.header variants={fadeUp} className="flex flex-col gap-2.5">
                <h2 className="text-[26px] font-bold leading-tight text-[#0A4B6E]">
                  {BECOME_INTEGRATOR_HEADER.title}
                </h2>
                <p className="max-w-[440px] text-[16px] font-normal leading-[24px] text-[#3a6e8c]">
                  {BECOME_INTEGRATOR_HEADER.subtitle}
                </p>
              </motion.header>
            </div>

            {/* Right column — partnership enquiry form on top of the map
                container */}
            <motion.div variants={formReveal} className="relative">
              <form
              onSubmit={(e) => e.preventDefault()}
              className="relative z-10 flex flex-col gap-4 rounded-[24px] bg-white p-7 shadow-[0_24px_70px_rgba(120,160,200,0.3)] lg:p-8"
            >
              <h3 className="text-center text-[20px] font-bold text-[#0A4B6E]">
                {PARTNERSHIP_FORM_TITLE}
              </h3>

              {/* Name / email / company / country — two columns */}
              <div className="grid gap-4 sm:grid-cols-2">
                {PARTNERSHIP_FIELDS.map((field) => (
                  <label key={field.name} className="flex flex-col gap-1.5">
                    <span className={labelClass}>
                      {field.label}
                      <RequiredMark />
                    </span>
                    <span className="relative">
                      <Image
                        src={field.icon}
                        alt=""
                        width={18}
                        height={18}
                        className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-auto -translate-y-1/2"
                      />
                      <input
                        name={field.name}
                        type={field.type}
                        required
                        placeholder={field.placeholder}
                        className={`${fieldClass} pl-10 pr-3`}
                      />
                    </span>
                  </label>
                ))}
              </div>

              {/* Company type — full-width select */}
              <label className="flex flex-col gap-1.5">
                <span className={labelClass}>Company Type</span>
                <span className="relative">
                  <Image
                    src={COMPANY_TYPE_ICON}
                    alt=""
                    width={18}
                    height={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-auto -translate-y-1/2"
                  />
                  <select
                    name="companyType"
                    required
                    defaultValue=""
                    className={`${fieldClass} appearance-none pl-10 pr-9 invalid:text-[#8AB6D6]`}
                  >
                    <option value="" disabled hidden>
                      Select Option
                    </option>
                    {COMPANY_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#2B9CD8]">
                    <ChevronIcon />
                  </span>
                </span>
              </label>

              {/* Focus areas — two-column checkbox pills */}
              <fieldset className="flex flex-col gap-1.5">
                <legend className={`${labelClass} mb-1.5`}>
                  Experience / Focus Areas
                </legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {FOCUS_AREAS.map((area) => (
                    <label
                      key={area}
                      className="flex h-10 cursor-pointer items-center justify-between rounded-[10px] bg-[#EFF8FE] px-3.5"
                    >
                      <span className="text-[13px] font-medium text-[#1D293D]">
                        {area}
                      </span>
                      <input
                        type="checkbox"
                        name="focusAreas"
                        value={area}
                        className="peer sr-only"
                      />
                      <span className="flex size-5 items-center justify-center rounded-md bg-[#DCEFFB] text-transparent transition peer-checked:bg-[#14B8C4] peer-checked:text-white">
                        <CheckIcon />
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Additional details */}
              <label className="flex flex-col gap-1.5">
                <span className={labelClass}>Additional Details</span>
                <textarea
                  name="additionalDetails"
                  placeholder="Tell us about your company and how you'd like to collaborate..."
                  className="min-h-[96px] w-full resize-none rounded-[10px] bg-[#EFF8FE] p-3.5 text-[14px] text-[#1D293D] outline-none ring-1 ring-transparent transition placeholder:text-[#8AB6D6] focus:ring-[#9ED3F2]"
                />
              </label>

              {/* Submit */}
              {/* Figma: fill 21B1F1→A6C936, 1.24px gradient border
                  21B1F1→C5EB4C, drop shadow 0 6 42 rgba(38,124,153,0.1) */}
              <button
                type="submit"
                className="mx-auto mt-1 h-11 rounded-full border-[1.24px] border-transparent px-7 text-[14px] font-semibold text-white shadow-[0_6px_42px_rgba(38,124,153,0.1)] transition [background:linear-gradient(90deg,#21B1F1_0%,#A6C936_100%)_padding-box,linear-gradient(90deg,#21B1F1_0%,#C5EB4C_100%)_border-box] hover:brightness-105"
              >
                Submit Partnership Enquiry
              </button>

              <p className="mx-auto max-w-[320px] text-center text-[12px] leading-[17px] text-[#2B9CD8]">
                {PARTNERSHIP_FORM_NOTE}
              </p>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
