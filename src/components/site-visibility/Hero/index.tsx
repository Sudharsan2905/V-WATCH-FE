"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, MotionConfig } from "motion/react";
import {
  wipeTop,
  fadeUp,
  staggerContainer,
  viewportReveal,
} from "@/components/about/anim";
import { ArrowBadge } from "@/components/common/BookADemo";

const PRIMARY_BUTTON_STYLE: React.CSSProperties = {
  background: `
    linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1)) padding-box,
    linear-gradient(180deg, #21B1F1 -20.69%, #A6C936 151.72%) padding-box,
    linear-gradient(180deg, rgba(33,177,241,0.4) -20.69%, rgba(197,235,76,0.4)) border-box
  `,
  border: "1.24px solid transparent",
};

// Desktop
const CURVE_DEFAULT_FILL = "M0 88 C33.33 96 66.67 96 100 88 L100 100 L0 100 Z";

const CURVE_DEFAULT_STROKE = "M0 88 C33.33 96 66.67 96 100 88";

// Mobile
const CURVE_SMALL_FILL = "M0 93 C33.33 97 66.67 97 100 93 L100 100 L0 100 Z";

const CURVE_SMALL_STROKE = "M0 93 C33.33 97 66.67 97 100 93";

const CURVE_GLOWS = [
  { w: 6, o: 0.2 },
  { w: 3, o: 0.45 },
  { w: 1.5, o: 1 },
];

export default function SiteVisibilityHero() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-gradient-to-r from-[#000827] to-[#090518]">
        <div className="pointer-events-none absolute inset-0">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient
                id="sv-hero-curve-stroke"
                x1="0"
                y1="0"
                x2="100"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#21B1F1" stopOpacity="0" />
                <stop offset="0.5" stopColor="#7ECFFA" stopOpacity="1" />
                <stop offset="1" stopColor="#21B1F1" stopOpacity="0" />
              </linearGradient>
            </defs>

            <g className="max-lg:hidden">
              <path d={CURVE_DEFAULT_FILL} fill="#ffffff" />
              {CURVE_GLOWS.map(({ w, o }) => (
                <path
                  key={w}
                  d={CURVE_DEFAULT_STROKE}
                  fill="none"
                  stroke="url(#sv-hero-curve-stroke)"
                  strokeOpacity={o}
                  strokeWidth={w}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </g>

            <g className="lg:hidden">
              <path d={CURVE_SMALL_FILL} fill="#ffffff" />
              {CURVE_GLOWS.map(({ w, o }) => (
                <path
                  key={w}
                  d={CURVE_SMALL_STROKE}
                  fill="none"
                  stroke="url(#sv-hero-curve-stroke)"
                  strokeOpacity={o}
                  strokeWidth={w}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </g>
          </svg>
        </div>

        <div className="relative z-10 w-full px-[24px] lg:px-[60px] pt-[70px] pb-[80px] md:pb-[90px] lg:pb-[140px]">
          {/* Stacks below lg so the illustration sits under the copy; side by
              side from lg up. */}
          <div className="mx-auto flex max-w-[1410px] flex-col items-start gap-[40px] lg:flex-row lg:gap-[24px]">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportReveal}
              variants={staggerContainer}
              className="flex w-full min-w-0 max-w-[609px] flex-col items-start gap-[14px]"
            >
              <motion.h1
                variants={wipeTop}
                className="font-lato text-[30px] font-bold leading-[40px] tracking-[2%] text-white sm:text-[42px] sm:leading-[52px] lg:text-[50px] lg:leading-[65px]"
              >
                Stop letting manual site access and delivery coordination become
                your blind spot.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={0.15}
                className="max-w-[609px] font-lato text-[16px] font-bold leading-[32px] text-white sm:text-[20px]"
              >
                On a busy data centre site, one untracked contractor, one
                expired access pass, one unplanned vehicle or one missed
                delivery update can create unnecessary delays, security gaps and
                reporting headaches.
              </motion.p>

              <motion.p
                variants={fadeUp}
                custom={0.25}
                className="max-w-[609px] font-lato text-[16px] font-bold leading-[32px] text-white sm:text-[20px]"
              >
                V-Watch AI helps teams control who enters, what comes in, when
                it arrives and how site activity is reported from one
                centralised platform.
              </motion.p>

              <motion.div
                variants={fadeUp}
                custom={0.35}
                className="mt-6 flex flex-wrap items-center gap-4"
              >
                <Link
                  href="/book-demo"
                  className="text-[14px] md:text-[16px]  group inline-flex h-11 leading-[120%] items-center gap-2.5 rounded-full px-5 font-semibold text-white hover:brightness-110"
                  style={PRIMARY_BUTTON_STYLE}
                >
                  <ArrowBadge />
                  Book a Site Visibility Walkthrough
                </Link>
                <a
                  href="#"
                  className="group inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-base font-bold transition-colors duration-200 ease-out hover:bg-white/20"
                >
                  <span
                    className="bg-gradient-to-b bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(180deg, #1696D2 0%, #7FAF2B 100%)",
                    }}
                  >
                    Download the 1-Page Overview
                  </span>
                </a>
              </motion.div>
            </motion.div>

            <Image
              src="/site-visibility/hero_image.svg"
              alt="Site visibility hero illustration"
              width={548}
              height={550}
              className="h-auto w-full max-w-[548px] self-center lg:mt-[78px] lg:self-start"
              priority
              loading="eager"
            />
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
