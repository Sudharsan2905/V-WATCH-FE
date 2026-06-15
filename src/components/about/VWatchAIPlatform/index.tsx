"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { fadeUp, wipeTop, zoomIn, scaleIn, staggerContainer, viewportReveal } from "../anim";

type Module = {
  key: string;
  label: string;
  illustration: string;
  icon: string;
  title: string;
  subtitle: string;
  /** Left-column cards (DSA, SMS) are the right-card design mirrored horizontally. */
  flip: boolean;
  /**
   * Illustration box in the card's LOCAL (un-flipped) coordinate space, as % of the
   * 303×246 card. Anchored to the right; flipped cards mirror it to the left. Values
   * are the Figma node positions (node 1043:2476 etc.).
   */
  illus: { left: number; top: number; w: number; h: number };
};

const MODULES: Module[] = [
  {
    key: "dsa",
    label: "DSA",
    illustration: "/about/platform-dsa-illus.svg",
    icon: "/about/platform-dsa-icon.svg",
    title: "Digital Site Access",
    subtitle: "Identity, access, and compliance",
    flip: true,
    // Figma: 120.218×174 at left 163.103 (of 303×246), anchored to the top edge
    illus: { left: 53.83, top: 0, w: 39.68, h: 70.73 },
  },
  {
    key: "rtls",
    label: "RTLS",
    illustration: "/about/platform-rtls-inner.svg",
    icon: "/about/platform-rtls-icon.webp",
    title: "Real-Time Location System",
    subtitle: "Movement, safety, and tracking",
    flip: false,
    // Figma: 140×130 at left 140, top 20
    illus: { left: 46.36, top: 8.13, w: 46.49, h: 52.85 },
  },
  {
    key: "sms",
    label: "SMS",
    illustration: "/about/platform-sms-inner.webp",
    icon: "/about/platform-sms-icon.webp",
    title: "Site Management System",
    subtitle: "Operations and workflows",
    flip: true,
    illus: { left: 46, top: 4, w: 46.5, h: 54 },
  },
  {
    key: "hrms",
    label: "HRMS",
    illustration: "/about/platform-hrms-inner.webp",
    icon: "/about/platform-hrms-icon.webp",
    title: "HRMS + Task Management",
    subtitle: "Workforce and performance",
    flip: false,
    // Figma: 137.9×120 at left 147.5, top 24
    illus: { left: 48.7, top: 9.76, w: 45.5, h: 48.8 },
  },
];

function ModuleCard({ mod }: { mod: Module }) {
  const flip = mod.flip;
  // Counter-flip class: keeps content (text, icon glyph, illustration) readable/correct
  // when the whole card is mirrored.
  const cf = flip ? "-scale-x-100" : "";

  return (
    <motion.div
      variants={scaleIn}
      className={[
        "relative w-full min-h-[180px] sm:min-h-[210px] xl:min-h-0 xl:aspect-[303/246]",
        flip ? "-scale-x-100" : "",
      ].join(" ")}
    >
      {/* Frosted-glass card shape + soft glow (Figma "Subtract"). Rendered larger than the
          card box (negative inset) so the glow isn't cropped. The notch (top-left in the
          asset) lands top-right on the flipped/left cards, holding the label pill. */}
      <div
        className="absolute pointer-events-none"
        style={{ inset: "-35.37% -32.79% -45.93% -32.79%" }}
      >
        <Image
          src="/about/platform-rtls-bg.png"
          alt=""
          fill
          className="object-fill"
          sizes="(max-width: 1280px) 50vw, 340px"
        />
      </div>

      {/* Illustration — positioned in the card's local (right-side) space and clipped to the
          rounded card. The image is counter-flipped so it is not mirrored on flipped cards. */}
      <div className="absolute inset-0 rounded-[20px] overflow-hidden pointer-events-none">
        <div
          className="absolute"
          style={{
            left: `${mod.illus.left}%`,
            top: `${mod.illus.top}%`,
            width: `${mod.illus.w}%`,
            height: `${mod.illus.h}%`,
          }}
        >
          <Image
            src={mod.illustration}
            alt=""
            fill
            className={["object-contain object-top", cf].join(" ")}
            sizes="160px"
          />
        </div>
      </div>

      {/* Content — icon badge + title pinned to the bottom. On flipped cards the icon moves
          to the right while the title stays left-aligned and readable. */}
      <div className="absolute inset-0 z-10 flex flex-col items-start justify-end gap-[14px] sm:gap-[16px] xl:gap-[20px] p-[14px] sm:p-[18px] xl:p-[24px]">
        {/* Icon badge — Figma 60×60, white, rounded-16, soft shadow + top inner highlight */}
        <div className="relative flex items-center justify-center shrink-0 size-[44px] sm:size-[52px] xl:size-[60px] rounded-[12px] xl:rounded-[16px] bg-white shadow-[6.25px_3.75px_17.5px_0px_rgba(255,255,255,0.33),2.626px_7.878px_29.177px_0px_rgba(29,108,151,0.2)]">
          <div
            aria-hidden
            className="absolute inset-0 rounded-[inherit] pointer-events-none shadow-[inset_0px_2px_10px_0px_rgba(255,255,255,0.8)]"
          />
          <div className={["relative size-[26px] sm:size-[32px] xl:size-[40px]", cf].join(" ")}>
            <Image
              src={mod.icon}
              alt={mod.label}
              fill
              className="object-contain"
              sizes="40px"
            />
          </div>
        </div>

        {/* Title + subtitle */}
        <div className={["flex flex-col gap-[3px] xl:gap-[6px] w-full", cf].join(" ")}>
          <p className="text-[14px] sm:text-[16px] xl:text-[20px] font-bold text-white leading-[normal]">
            {mod.title}
          </p>
          <p className="text-[12px] sm:text-[14px] xl:text-[18px] text-[#eaf3ff] leading-[16px] xl:leading-[20px]">
            {mod.subtitle}
          </p>
        </div>
      </div>

      {/* Label pill — sits in the top-left notch (mirrors to the top-right notch on flipped
          cards). Figma: h-44, px-20, white border, translucent fill. */}
      <div
        className="absolute top-[5%] left-[4.5%] inline-flex items-center justify-center h-[28px] sm:h-[34px] xl:h-[44px] px-[12px] sm:px-[16px] xl:px-[20px] rounded-[80px] border border-white shadow-[4px_7px_26px_0px_rgba(217,226,255,0.1),0px_13px_100px_0px_rgba(199,199,199,0.1)]"
        style={{ background: "rgba(255,255,255,0.14)" }}
      >
        <span
          className={[
            "text-[12px] sm:text-[14px] xl:text-[20px] font-bold text-white leading-none whitespace-nowrap",
            cf,
          ].join(" ")}
        >
          {mod.label}
        </span>
      </div>
    </motion.div>
  );
}

export default function VWatchAIPlatform() {
  return (
    <section
      className="relative z-10 -mt-[46px] bg-[#19213d] py-[60px] lg:py-[80px] overflow-hidden [content-visibility:auto] [contain-intrinsic-size:auto_900px]"
      // Convex curved top edge (the light section above shows through at the corners).
      style={{ borderRadius: "50% 50% 0 0 / 52px 52px 0 0" }}
    >
      {/* Section background */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/about/platform-union-bg.webp"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Decorative corner rings (Figma: 558px circles) — clipped to semi-circles by the
          section's overflow. */}
      <div
        className="absolute bottom-[-360px] left-[-150px] w-[558px] h-[558px] rounded-full pointer-events-none border border-[rgba(126,207,250,0.18)]"
        style={{
          background:
            "radial-gradient(circle, rgba(126,207,250,0.07) 0%, rgba(126,207,250,0.02) 55%, transparent 72%)",
        }}
      >
        <div className="absolute inset-[90px] rounded-full border border-[rgba(126,207,250,0.12)]" />
      </div>
      <div
        className="absolute bottom-[-360px] right-[-150px] w-[558px] h-[558px] rounded-full pointer-events-none border border-[rgba(126,207,250,0.18)]"
        style={{
          background:
            "radial-gradient(circle, rgba(126,207,250,0.07) 0%, rgba(126,207,250,0.02) 55%, transparent 72%)",
        }}
      >
        <div className="absolute inset-[90px] rounded-full border border-[rgba(126,207,250,0.12)]" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[60px]">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportReveal}
          variants={wipeTop}
          className="mb-[20px] lg:mb-[30px]"
        >
          <h2 className="text-[22px] lg:text-[26px] font-bold text-white leading-normal mb-[10px]">
            What is V-Watch AI
          </h2>
          <p className="text-[16px] lg:text-[20px] text-white leading-[28px]">
            More than a system a connected platform.
          </p>
        </motion.div>

        {/* Subtitle card — Figma: 498px wide, 16px 24px padding, flex column centered,
            4px gap, 16px radius. Border is NOT solid: it's a faint white→transparent
            gradient that only catches light on the top edge (soft glass edge — kept low
            so it reads as a highlight, not a hard box outline), layered over the two bg
            gradients via padding-box (fill) / border-box (border). */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportReveal}
          variants={fadeUp}
          className="mx-auto flex w-full max-w-[498px] flex-col items-center justify-center gap-[4px] rounded-[16px] px-[24px] py-[16px] mb-[20px] lg:mb-[30px] text-center"
          style={{
            border: "1px solid transparent",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(153,153,153,0) 80.56%) padding-box, " +
              "linear-gradient(270deg, rgba(212,240,255,0) 0%, rgba(212,240,255,0.01) 50%, rgba(212,240,255,0) 100%) padding-box, " +
              "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 45%, rgba(153,153,153,0) 100%) border-box",
          }}
        >
          <p className="text-[13px] sm:text-[15px] lg:text-[18px] font-bold text-white leading-[22px] sm:leading-[24px]">
            V-Watch Ai is not just an access system, a tracking tool, or a
            workforce solution.{" "}
          </p>
          <p className="text-[13px] sm:text-[15px] lg:text-[18px] font-bold text-[#67d0ff] leading-[22px] sm:leading-[24px]">
            It is a connected platform that integrates.
          </p>
        </motion.div>

        {/* Mobile/tablet grid — 1 col at 320px, 2 col at 375px+ */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportReveal}
          variants={staggerContainer}
          className="grid grid-cols-1 min-[375px]:grid-cols-2 gap-[14px] sm:gap-[16px] xl:hidden"
        >
          {MODULES.map((mod) => (
            <ModuleCard key={mod.key} mod={mod} />
          ))}
        </motion.div>

        {/* Desktop: 3-col with center orbital — xl+ (1280px+) only */}
        <div className="hidden xl:grid grid-cols-[1fr_467px_1fr] gap-[20px] items-center">
          {/* Left column: DSA + SMS (aligned toward the orb) */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportReveal}
            variants={staggerContainer}
            className="flex flex-col gap-[20px] items-end"
          >
            <div className="w-full max-w-[340px]">
              <ModuleCard mod={MODULES[0]} />
            </div>
            <div className="w-full max-w-[340px]">
              <ModuleCard mod={MODULES[2]} />
            </div>
          </motion.div>

          {/* Center orbital — exact Figma sizes (node 1043:2586) */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportReveal}
            variants={zoomIn}
            className="relative flex-shrink-0"
            style={{ width: "467px", height: "467px" }}
          >
            {/* Outer ring */}
            <div
              className="absolute inset-0 rounded-full border border-[rgba(126,207,250,0.24)]"
              style={{ background: "rgba(255,255,255,0.10)", opacity: 0.44 }}
            />
            {/* Mid ring */}
            <div
              className="absolute rounded-full border border-[rgba(126,207,250,0.20)] backdrop-blur-[3px]"
              style={{
                top: 63, right: 63, bottom: 63, left: 63,
                background: "rgba(255,255,255,0.30)",
                opacity: 0.77,
              }}
            />
            {/* Inner ring */}
            <div
              className="absolute rounded-full border border-[rgba(126,207,250,0.20)] backdrop-blur-[3px]"
              style={{
                top: 114, right: 114, bottom: 114, left: 114,
                background: "rgba(255,255,255,0.70)",
                opacity: 0.77,
              }}
            />
            {/* Center badge — navy gradient fill + white V-WATCH wordmark (Figma 1043:2590) */}
            <div
              className="absolute flex items-center justify-center rounded-full border-[1.4px] border-white overflow-hidden shadow-[0px_0px_114px_24px_#feffff,0px_14px_24px_0px_rgba(255,255,255,0.7),0px_0px_62px_0px_rgba(29,108,151,0.16)]"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 110,
                height: 110,
              }}
            >
              {/* Navy inner frame — slightly wider than the circle so it fills it after the
                  rounded clip (Figma 1043:2591). */}
              <div
                className="flex items-center justify-center"
                style={{
                  width: 118,
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #0a4b6e 14.6%, #002d45 85.4%)",
                }}
              >
                <div className="relative w-[96px] h-[56px]">
                  <Image
                    src="/about/platform-orb-logo.svg"
                    alt="V-Watch"
                    fill
                    className="object-contain"
                    sizes="96px"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column: RTLS + HRMS (aligned toward the orb) */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportReveal}
            variants={staggerContainer}
            className="flex flex-col gap-[20px] items-start"
          >
            <div className="w-full max-w-[340px]">
              <ModuleCard mod={MODULES[1]} />
            </div>
            <div className="w-full max-w-[340px]">
              <ModuleCard mod={MODULES[3]} />
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportReveal}
          variants={fadeUp}
          className="mx-auto mt-[20px] lg:mt-[30px] w-full max-w-[1016px] border border-[rgba(233,238,255,0.4)] rounded-[30px] min-h-[48px] lg:h-[60px] flex items-center justify-center px-[12px] sm:px-[16px] gap-[10px] sm:gap-[16px]"
          style={{ background: "rgba(255,255,255,0.10)" }}
        >
          <div className="relative w-[60px] sm:w-[100px] lg:w-[150px] h-[11px] flex-shrink-0 hidden sm:block">
            <Image
              src="/about/platform-line-left.webp"
              alt=""
              fill
              className="object-contain"
              sizes="150px"
            />
          </div>
          <p className="text-[11px] sm:text-[13px] lg:text-[20px] text-white text-center leading-snug flex-1 py-[10px] sm:py-0">
            Together, these modules create a complete view of your operations
            from entry to execution.
          </p>
          {/* Same asset as the left connector; flipped so its dot sits on the
              left (inner) side, mirroring the left connector toward the text. */}
          <div className="relative w-[60px] sm:w-[100px] lg:w-[150px] h-[11px] flex-shrink-0 hidden sm:block -scale-x-100">
            <Image
              src="/about/platform-line-right.webp"
              alt=""
              fill
              className="object-contain"
              sizes="150px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
