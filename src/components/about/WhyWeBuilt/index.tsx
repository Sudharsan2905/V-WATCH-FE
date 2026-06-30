"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { fadeUp, wipeTop, loadIn, staggerContainer, viewportReveal } from "../anim";

const LIST_ITEMS = [
  "Risks can be identified and prevented early",
  "Compliance becomes manageable and predictable",
  "Teams become more accountable and efficient",
  "Decisions are made with confidence not assumptions",
];

export default function WhyWeBuilt() {
  return (
    <section className="relative z-10 -mt-[46px] rounded-tl-[46px] rounded-tr-[46px] bg-[#F5FBFF] pt-[60px] lg:py-[80px]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[60px]">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportReveal}
          variants={wipeTop}
          className="mb-[30px] lg:mb-[40px]"
        >
          <h2 className="text-[22px] lg:text-[26px] font-bold text-[#0a4b6e] leading-normal mb-[10px]">
            Why we built this
          </h2>
          <p className="text-[16px] font-normal lg:text-[20px] text-[#0A4B6E] leading-[28px]">
            Because visibility changes everything
          </p>
        </motion.div>

        {/* 2-column layout */}
        <div className="flex flex-col lg:flex-row items-start gap-[30px] lg:gap-[40px]">
          {/* LEFT: numbered list */}
          <motion.div
            className="w-full lg:max-w-[538px] flex-shrink-0"
            initial="hidden"
            whileInView="show"
            viewport={viewportReveal}
            variants={staggerContainer}
          >
            <motion.p
              variants={fadeUp}
              className="font-bold text-[15px] lg:text-[18px] text-[#0f172a] leading-[26px] mb-[24px]"
            >
              When organizations can clearly see what is happening across their
              operations.
            </motion.p>

            {/* Timeline — Figma node 1043:2626 (Container) */}
            <motion.div variants={fadeUp} className="relative w-full max-w-[538px]">
              {/* Vertical line — Figma 1043:2627: 4px wide, centered on the 40px
                  circles (left 18px), spanning circle-1 centre to circle-4 centre. */}
              <div className="absolute bottom-[23px] left-[18px] h-[211px] w-[4px] rounded-full bg-[#9cdcff]" />

              <div className="flex flex-col gap-[24px]">
                {LIST_ITEMS.map((text, i) => {
                  const num = String(i + 1).padStart(2, "0");
                  const isActive = i === 0;
                  return (
                    <div
                      key={i}
                      className="relative flex min-h-[47px] items-center gap-[20px]"
                    >
                      {/* Active-row highlight — Figma 1043:2631: 54px tall, starts
                          8px past the circle, fades out to the right, left-rounded. */}
                      {isActive && (
                        <div
                          className="pointer-events-none absolute left-[48px] right-[7px] top-1/2 h-[54px] -translate-y-1/2 rounded-bl-[14px] rounded-tl-[14px]"
                          style={{
                            background:
                              "linear-gradient(90deg, rgba(126,207,250,0.16) 0%, rgba(239,249,255,0) 100%)",
                          }}
                        />
                      )}

                      {/* Number circle — Figma 1043:2629 (active) / 2636 (idle) */}
                      <div
                        className="relative z-10 flex size-[40px] shrink-0 items-center justify-center overflow-hidden rounded-full"
                        style={
                          isActive
                            ? {
                                border: "1px solid #0a8ec8",
                                background:
                                  "linear-gradient(180deg, #0a8ec8 0%, #054662 100%)",
                              }
                            : {
                                // Figma: 40% translucent white fill (so the timeline line
                                // shows through lightly) + a 1px GRADIENT border
                                // (#0A8EC8 → #054662 at 10% opacity). Borders can't take a
                                // gradient directly, so layer fill on padding-box and the
                                // border gradient on border-box behind a transparent border.
                                border: "1px solid transparent",
                                background:
                                  "linear-gradient(180deg, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.40) 100%) padding-box, linear-gradient(180deg, rgba(10,142,200,0.10) 0%, rgba(5,70,98,0.10) 100%) border-box",
                              }
                        }
                      >
                        {isActive ? (
                          <span
                            className="w-full text-center text-[15px] font-bold leading-[20px] text-[#faecff]"
                            style={{
                              fontFamily: "var(--font-jakarta)",
                              fontFeatureSettings: '"dlig" 1',
                            }}
                          >
                            {num}
                          </span>
                        ) : (
                          <span
                            className="w-full bg-clip-text text-center text-[15px] font-bold leading-[20px] text-transparent"
                            style={{
                              fontFamily: "var(--font-jakarta)",
                              fontFeatureSettings: '"dlig" 1',
                              backgroundImage:
                                "linear-gradient(180deg, #1d6c97 0%, #092331 100%)",
                            }}
                          >
                            {num}
                          </span>
                        )}
                      </div>

                      {/* Title — Figma 1043:2633: Lato Bold 18px, -0.036px tracking */}
                      <p
                        className={[
                          "relative z-10 min-w-0 flex-1 text-[18px] font-bold leading-[normal] tracking-[-0.036px]",
                          isActive ? "text-[#0a4b6e]" : "text-[#0f172a]",
                        ].join(" ")}
                      >
                        {text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: image card — Figma node 1043:2653 (outer "nested" container):
              flex column, centered, bottom-justified, 10px bottom padding, ≥386px tall on
              desktop (Figma's 340px card + caption; grows as the card scales up). */}
          <div className="flex-1 min-w-0 w-full flex flex-col items-center justify-end pb-[4px] md:pb-[10px] lg:min-h-[386px] lg:flex-[1_0_0]">
            {/* Parent Wrapper for Main Card */}
            <motion.div
              className="relative w-full max-w-[760px] flex items-center justify-center p-[8px] md:p-[12px]"
              initial="hidden"
              whileInView="show"
              viewport={viewportReveal}
              variants={loadIn}
            >

              {/* Main Card Container — styled exactly like the Figma design */}
              <div
                className="relative z-10 w-[95%] rounded-[32px] flex flex-col items-center gap-[20px] pt-[20px] pb-[24px] px-[16px] md:px-[24px]"
                style={{
                  background: "linear-gradient(180deg, rgba(245, 251, 255, 0.95) 0%, rgba(215, 235, 250, 0.55) 100%)",
                  border: "1px solid rgba(245, 251, 255, 0.65)",
                  boxShadow: "inset 0 0 24px rgba(245, 251, 255, 0.7)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                {/* Dashboard image wrapper */}
                <div className="relative w-full rounded-[26px] border-2 border-white backdrop-blur-[10px] bg-[rgba(255,255,255,0.55)] p-[4px] shadow-[0px_10px_20px_0px_rgba(0,0,0,0.01)]">
                  <div className="relative w-full aspect-[443/277] rounded-[22px] overflow-hidden">
                    <Image
                      src="/about/why-built-photo.webp"
                      alt="V-Watch operations intelligence"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 700px"
                    />
                  </div>
                </div>

                {/* Caption (Figma 1043:2660) — Lato Bold 18px, #0a4b6e, max 422px */}
                <p className="relative z-10 text-[14px] lg:text-[18px] font-bold text-[#0a4b6e] text-center max-w-[422px] mx-auto leading-[24px]">
                  We built V-Watch AI to make this level of visibility possible in
                  real time.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
