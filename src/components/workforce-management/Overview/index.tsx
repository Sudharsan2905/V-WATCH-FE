"use client";

import Image from "next/image";
import { motion, MotionConfig } from "motion/react";
import { wipeTop, fadeUp, loadIn, viewportReveal } from "@/components/about/anim";

// ─── Decorative blade fan ─────────────────────────────────────────────────────
// Identical flat 35×555 radial-glow fins behind the dashboard, masked top/bottom.
const BLADE_COUNT = 60; // plenty to span any desktop width; clipped by the section
const BLADE_GRADIENT =
  "radial-gradient(101.76% 69.46% at 50% 50%, rgba(245,251,255,0.40) 36.61%, rgba(255,255,255,0.00) 67.79%)";
// Blue wash behind the fan so the translucent white fins read blue-tinted.
const BLADE_BLUE_WASH =
  "radial-gradient(70% 50% at 50% 50%, rgba(91,184,245,0.40) 0%, rgba(91,184,245,0.12) 45%, rgba(91,184,245,0.00) 75%)";

function BladeFan() {
  const center = (BLADE_COUNT - 1) / 2;
  return (
    <div className="flex h-[555px] items-stretch justify-center">
      {Array.from({ length: BLADE_COUNT }).map((_, i) => {
        const boxShadow = i < center ? "inset 6px 0 30px 0 #FFF" : "inset -6px 0 30px 0 #FFF";
        return (
          <span
            key={i}
            className="block h-[555px] w-[35px] shrink-0"
            style={{ background: BLADE_GRADIENT, boxShadow }}
          />
        );
      })}
    </div>
  );
}

// "Everything you need in one view" — intro copy above a single dashboard mockup.
export default function Overview() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden px-6 pb-20 pt-10 lg:px-[60px]">
        <div className="mx-auto flex w-full max-w-[1410px] flex-col gap-8">
          {/* Header */}
          <motion.header
            initial="hidden"
            whileInView="show"
            viewport={viewportReveal}
            className="relative z-10 flex flex-col gap-2 text-[#0A4B6E]"
          >
            <motion.h2
              variants={wipeTop}
              className="font-lato text-[22px] font-bold leading-tight sm:text-[26px]"
            >
              Everything you need in one view
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.15}
              className="max-w-[760px] font-lato text-[16px] font-normal leading-[24px] sm:text-[20px] sm:leading-[28px]"
            >
              V-Watch Ai brings together attendance, workforce activity, and
              administrative processes into a single dashboard giving you a clear,
              real-time overview of your operation.
            </motion.p>
          </motion.header>

          {/* Dashboard mockup + fanned side glow (lg:mt-6 keeps it close to the copy). */}
          <div className="relative flex flex-col items-center lg:mt-6">
            {/* Decorative blade fan behind the mockup (desktop only), masked top/bottom. */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[555px] w-screen -translate-x-1/2 -translate-y-1/2 items-center justify-center lg:flex"
              style={{
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, #000 16%, #000 56%, transparent 78%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, #000 16%, #000 56%, transparent 78%)",
              }}
            >
              {/* Blue wash so the fins read blue-tinted, not white */}
              <div className="absolute inset-0" style={{ background: BLADE_BLUE_WASH }} />
              <BladeFan />
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportReveal}
              variants={loadIn}
              className="relative z-10 mx-auto w-[81%] max-w-[614px]"
            >
              <Image
                src="/workforce/dashboard-mockup.svg"
                alt="V-Watch Ai workforce dashboard overview"
                width={615}
                height={407}
                sizes="(min-width: 1024px) 614px, 100vw"
                className="h-auto w-full"
              />
              {/* Ground shadow under the laptop base */}
              <Image
                src="/workforce/divider-shadow.svg"
                alt=""
                aria-hidden="true"
                width={759}
                height={10}
                className="absolute left-1/2 top-full z-10 w-[123.5%] max-w-none -translate-x-1/2 -translate-y-1/2"
              />
              {/* Blue ground glow below the shadow — kept short so it fades before the clip. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-full -z-10 h-[90px] w-[120%] -translate-x-1/2"
                style={{
                  background:
                    "radial-gradient(50% 100% at 50% 0%, rgba(91,184,245,0.22) 0%, rgba(91,184,245,0.00) 70%)",
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
