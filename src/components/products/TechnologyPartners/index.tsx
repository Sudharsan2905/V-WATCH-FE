"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";
import { TECH_PARTNER_LOGOS } from "@/constants/integrators-partners";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const headerStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const logoItem: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } },
};

// Trigger each group as IT enters the viewport rather than on the whole section
// wrapper, with a negative bottom margin so it reveals just after clearing the
// fold (matches the other sections).
const VIEWPORT = { once: true, amount: 0.2, margin: "0px 0px -120px 0px" } as const;

function IconBox({ src }: Readonly<{ src: string }>) {
  return (
    <span className="flex size-[54px] shrink-0 items-center justify-center overflow-hidden rounded-[14px] border-2 border-white bg-[rgba(244,251,255,0.2)] shadow-[9px_7px_60px_rgba(255,255,255,0.4),6px_10px_23px_rgba(217,226,255,0.85),0_13px_100px_rgba(199,199,199,0.25)]">
      <Image
        src={src}
        alt=""
        width={36}
        height={36}
        className="size-9 scale-[5.3] translate-x-[35.5%] translate-y-[22%] p-1"
      />
    </span>
  );
}

type TechnologyPartnersContent = {
  title?: string;
  subtitle?: string;
  description?: string;
  note?: string;
  /**
   * Trust-strip variant: a single centered line above the marquee, with no
   * leading icon box and no left-aligned title. Used by /site-visibility.
   * Mutually exclusive with `title` — `heading` wins if both are passed.
   */
  heading?: string;
};

export default function TechnologyPartners({
  content = {},
}: Readonly<{ content?: TechnologyPartnersContent }> = {}) {
  const { title, subtitle, description, note, heading } = content;

  const mid = Math.ceil(TECH_PARTNER_LOGOS.length / 2);
  const row1 = TECH_PARTNER_LOGOS.slice(0, mid);
  const row2 = TECH_PARTNER_LOGOS.slice(mid);

  if (title || heading) {
    return (
      <MotionConfig reducedMotion="user">
        {/* Outer wrapper holds the section padding; inner caps content at
            1280px centered — same structure as the other page sections so
            the heading/logos line up with them. */}
        <div className="w-full px-6 lg:px-15">
          <div
            className={`mx-auto flex w-full max-w-[1410px] flex-col ${
              heading ? "gap-[28px]" : "gap-[30px] mt-10"
            }`}
          >
            {/* Header: icon + title/subtitle + description */}
            <motion.div
              variants={headerStagger}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="flex flex-col gap-[10px]"
            >
              {heading && (
                <motion.p
                  variants={fadeUp}
                  className="text-center font-lato text-[16px] font-bold leading-[22px] text-[#1D6C97] sm:text-[18px] sm:leading-[24px] lg:text-[20px] lg:leading-[26px]"
                >
                  {heading}
                </motion.p>
              )}
              {!heading && ( 
              <motion.div
                variants={fadeUp}
                className="flex w-full items-center gap-[10px]"
              >
                <span className="relative flex size-[54px] shrink-0 items-center justify-center overflow-hidden rounded-[14px] border-2 border-white bg-[rgba(244,251,255,0.2)] shadow-[9px_7px_60px_rgba(255,255,255,0.4),6px_10px_23px_rgba(217,226,255,0.85),0_13px_100px_rgba(199,199,199,0.25)]">
                  <Image
                    src="/products/eco/icon-partners.svg"
                    alt="Technology Partner"
                    width={32}
                    height={32}
                    className="size-8"
                  />
                </span>
                <p className="flex-1 font-lato text-[26px] font-bold leading-[26px] text-[#0A4B6E]">
                  {title}
                  {subtitle && (
                    <>
                      <br />
                      {subtitle}
                    </>
                  )}
                </p>
              </motion.div>
              )}
              {description && !heading && (
                <motion.div
                  variants={fadeUp}
                  className="max-w-[964px] ml-[70px]"
                >
                  <p className="font-lato text-[20px] font-normal leading-[26px] text-[#0A4B6E]">
                    {description}
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Logo rows — infinite marquee */}
            <div
              className="flex flex-col gap-5"
              style={{
                overflow: "hidden",
                maxWidth: "100vw",
                // Trust-strip variant fades both ends so logos dissolve into the
                // section instead of being cut off mid-scroll. A mask (rather
                // than a gradient overlay) keeps this independent of the page
                // background colour.
                ...(heading 
                  ? {
                      maskImage:
                        "linear-gradient(90deg, transparent 0%, #000 7%, #000 93%, transparent 100%)",
                      WebkitMaskImage:
                        "linear-gradient(90deg, transparent 0%, #000 7%, #000 93%, transparent 100%)",
                    }
                  : {}),
              }}
            >
              {/* Row 1 — scrolls left */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  width: "max-content",
                  animation: "marquee-left 28s linear infinite",
                  willChange: "transform",
                }}
              >
                {[...row1, ...row1].map((src, i) => (
                  <div
                    key={`r1-${i}`}
                    className="flex h-[72px] w-[160px] shrink-0 items-center justify-center rounded-[10px] bg-[linear-gradient(180deg,#FFFFFF,#DDF3FF)] px-5 py-4 shadow-[0_4px_14px_rgba(255,255,255,0.04)] transition-shadow duration-300 ease-out hover:shadow-[0_12px_30px_rgba(29,108,151,0.18)]"
                  >
                    <span className="relative block size-full">
                      <Image
                        src={src}
                        alt="Technology partner"
                        fill
                        className="object-contain [filter:grayscale(1)]"
                        sizes="160px"
                      />
                     </span>
                  </div>
                ))}
              </div>

              {/* Row 2 — scrolls right */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  width: "max-content",
                  animation: "marquee-right 28s linear infinite",
                  willChange: "transform",
                }}
              >
                {[...row2, ...row2].map((src, i) => (
                  <div
                    key={`r2-${i}`}
                    className="flex h-[72px] w-[160px] shrink-0 items-center justify-center rounded-[10px] bg-[linear-gradient(180deg,#FFFFFF,#DDF3FF)] px-5 py-4 shadow-[0_4px_14px_rgba(255,255,255,0.04)] transition-shadow duration-300 ease-out hover:shadow-[0_12px_30px_rgba(29,108,151,0.18)]"
                  >
                    <span className="relative block size-full">
                      <Image
                        src={src}
                        alt="Technology partner"
                        fill
                        className="object-contain [filter:grayscale(1)]"
                        sizes="160px"
                      />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom note */}
            {note && (
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
                className="text-center font-lato text-[20px] font-bold leading-[26px] text-[#1d6c97]"
              >
                {note}
              </motion.p>
            )}
          </div>
        </div>
      </MotionConfig>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <div>
        <div className="mx-auto flex w-full max-w-[1410px] flex-col gap-[30px]">
          <motion.div
            variants={headerStagger}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="flex flex-col items-center gap-3.5"
          >
            <motion.div
              variants={fadeUp}
              className="flex w-full items-center gap-3.5"
            >
              <IconBox src="/products/eco/icon-partners.svg" />
              <p className="flex-1 text-[20px] font-bold leading-[26px] text-[#0A4B6E]">
                {title}
                {subtitle && (
                  <>
                    <br />
                    {subtitle}
                  </>
                )}
              </p>
            </motion.div>
            {description && (
              <motion.div variants={fadeUp} className="w-full pl-[70px]">
                <p className="text-[20px] font-normal leading-[26px] text-[#0A4B6E]">
                  {description}
                </p>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="flex flex-col items-center gap-2.5"
          >
            <div className="flex flex-col gap-5">
              {[row1, row2].map((row) => (
                <div
                  key={row[0]}
                  className="flex flex-wrap justify-center gap-4 sm:gap-8 lg:gap-12"
                >
                  {row.map((src) => (
                    <motion.div
                      key={src}
                      variants={logoItem}
                      whileHover={{ y: -4, scale: 1.04 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className="flex h-[56px] w-[120px] shrink-0 items-center justify-center rounded-[10px] bg-[linear-gradient(180deg,#FFFFFF,#DDF3FF)] px-3 py-2.5 shadow-[0_4px_14px_rgba(255,255,255,0.04)] transition-shadow duration-300 ease-out hover:shadow-[0_12px_30px_rgba(29,108,151,0.18)] sm:h-[72px] sm:w-[160px] sm:px-5 sm:py-4"
                    >
                      <span className="relative block size-full">
                        <Image
                          src={src}
                          alt="Technology partner"
                          fill
                          className="object-contain [filter:grayscale(1)]"
                          sizes="160px"
                        />
                      </span>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
            {note && (
              <motion.p
                variants={fadeUp}
                className="text-[20px] font-bold leading-[26px] text-[#1d6c97]"
              >
                {note}
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}
