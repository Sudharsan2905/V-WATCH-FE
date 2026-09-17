"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, MotionConfig, type Variants } from "motion/react";

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

const FAQS = [
  {
    question: "Is the entire V-Watch HRMS platform free for two months?",
    answer:
      "Yes. Companies that register by 31st December 2026 will receive full access to all available V-Watch HRMS features for two months.",
  },
  {
    question: "Are any modules excluded from the offer?",
    answer:
      "No. Employee management, attendance, payroll, leave, claims, mobile access, approval workflows and reporting are included.",
  },
  {
    question: "When does my two-month free period begin?",
    answer:
      "Your free period begins once your company's V-Watch HRMS account is activated.",
  },
  {
    question: "Do I need to provide a credit card?",
    answer: "No. A credit card is not required to claim the offer.",
  },
  {
    question: "What happens after the two months?",
    answer:
      "You can choose whether you want to continue using V-Watch HRMS. Continued access costs RM5 per subscribed employee per month.",
  },
  {
    question: "Will I be charged automatically?",
    answer:
      "No. Your company will only be charged if you decide to continue and confirm the number of employee subscriptions required.",
  },
  {
    question: "Can employees use V-Watch HRMS on mobile?",
    answer:
      "Yes. Employees can use the mobile experience to check in, submit leave and claims, upload supporting documents and review their information.",
  },
  {
    question: "Who can claim this offer?",
    answer:
      "The offer is available to Malaysian SMEs that complete their registration by 31st December 2026.",
  },
];

function PlusMinusIcon({ open }: Readonly<{ open: boolean }>) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M9 3v12M3 9h12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        style={{
          transformOrigin: "9px 9px",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.25s ease",
        }}
      />
    </svg>
  );
}

function QuestionBlob() {
  return (
    <div className="relative mx-auto aspect-[480/420] w-full max-w-[320px]">
      <Image
        src="/hrms-new/question.svg"
        alt=""
        aria-hidden
        fill
        unoptimized
        sizes="320px"
        className="object-contain"
      />
    </div>
  );
}

export default function HrmsFAQ() {
  const [openIndex, setOpenIndex] = useState(1);

  return (
    <MotionConfig reducedMotion="user">
      {/* No overflow-hidden here — any ancestor with non-visible overflow
          silently disables position:sticky for the blob below, since sticky
          only works relative to a genuine scrolling container. */}
      <section className="relative bg-[#F2F8FE] px-6 py-14 lg:px-15 lg:py-20">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-8 lg:gap-10">
          {/* flex-row (not a grid) so the left column's width is driven by
              its own content — the heading renders at full size on one line
              instead of being squeezed into a fixed track. Default
              align-items: stretch (don't override with items-start) gives
              this column the full row height, i.e. room for the sticky
              wrapper below to actually move within. */}
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              variants={fadeUp}
              custom={0.2}
              className="lg:shrink-0"
            >
              {/* Heading + image stick together as one unit while the
                  (taller) question list on the right scrolls past, and
                  un-stick naturally once the last question does too: their
                  containing block is the stretched column above, exactly as
                  tall as that list. The top offset clears the fixed header
                  (--nav-h, kept in sync by Navbar) plus a little breathing
                  room. */}
              <div className="flex flex-col gap-6 lg:sticky lg:top-[calc(var(--nav-h,60px)+24px)]">
                <div className="flex flex-col gap-2">
                  <h2 className="whitespace-nowrap font-lato text-[26px] font-bold leading-[1.25] text-[#0A4B6E] sm:text-[30px]">
                    Frequently Asked Questions
                  </h2>
                  <p className="whitespace-nowrap font-lato text-[15px] leading-[24px] text-[#0A4B6E] sm:text-[20px]">
                    Everything you need to know before you start.
                  </p>
                </div>
                <div className="hidden lg:block">
                  <QuestionBlob />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="flex min-w-0 flex-col gap-3"
            >
              {FAQS.map((faq, i) => {
              const open = openIndex === i;
              return (
                <motion.div
                  key={faq.question}
                  variants={fadeUp}
                  custom={0.1 + i * 0.05}
                  className={`overflow-hidden rounded-[20px] border transition-colors ${
                    open
                      ? "border-[#3DA9F5]/20 border-b-2 border-b-[#3DA9F5] bg-gradient-to-b from-[#EAF4FC] to-[#F7FBFF] shadow-[0px_24px_36px_-12px_rgba(61,169,245,0.45)]"
                      : "border-transparent bg-white shadow-[0px_6px_20px_0px_rgba(10,75,110,0.06)] hover:border-[#8ED0F5]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? -1 : i)}
                    className="flex w-full items-center gap-3 px-5 py-4 text-left"
                  >
                    <span
                      className={`shrink-0 font-lato text-[13px] font-bold ${
                        open ? "text-[#0A6FA8]" : "text-[#AEBBD1]"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`min-w-0 flex-1 font-lato text-[18px] font-semibold sm:text-[18px] ${
                        open ? "text-[#0A6FA8]" : "text-[#0A4B6E]"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                        open ? "text-[#0A6FA8]" : "text-[#5C7E97]"
                      }`}
                    >
                      <PlusMinusIcon open={open} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-4 pl-[42px] font-lato text-[16px] leading-[20px] text-[#0A6FA8]">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
