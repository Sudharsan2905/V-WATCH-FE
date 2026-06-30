"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { fadeUp, wipeTop, zoomIn, staggerContainer, viewportReveal } from "../anim";

// The center illustration is composed at a fixed 407×455 design size with
// absolutely-positioned px children, so it can't reflow. To show it on every
// breakpoint (it stacks between the columns below lg) we measure the available
// width and scale the whole composition down to fit narrow screens — never up
// past 1:1. Mirrors the OurVision scaling approach.
const CENTER_W = 407;
const CENTER_H = 455;

function useFitScale(designWidth: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / designWidth));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [designWidth]);
  return [ref, scale] as const;
}

const LEFT_ROWS = [
  {
    icon: "/about/what-we-see-icon-access.webp",
    text: "Access control is separate from workforce management",
  },
  {
    icon: "/about/what-we-see-icon-safety.webp",
    text: "Safety and compliance are tracked manually",
  },
  {
    icon: "/about/what-we-see-icon-incident.webp",
    text: "Operational workflows are managed across multiple tools",
  },
  {
    icon: "/about/what-we-see-icon-assets.webp",
    text: "Data exists — but it is fragmented and difficult to trust",
  },
];

const RIGHT_ITEMS = [
  "Know what is happening in real time",
  "Respond quickly to risks or issues",
  "Make decisions backed by accurate data",
];

export default function WhatWeSee() {
  const [centerRef, centerScale] = useFitScale(CENTER_W);
  return (
    <section className="relative z-10 -mt-[46px] rounded-tl-[46px] rounded-tr-[46px] bg-[#F5FBFF] py-[60px] lg:py-[80px]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[60px]">


        {/* 3-column layout. On tablet (md) the fixed-width illustration can't sit
            between two text columns, so it spans full width on top and the two
            text columns drop below it side-by-side, spread across the width. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_407px_1fr] gap-x-[20px] gap-y-[30px] lg:gap-[30px] items-start md:items-start lg:items-center">
          <motion.div
            className="w-full max-w-[360px] justify-self-center md:order-2 md:justify-self-center lg:order-none lg:justify-self-stretch"
            initial="hidden"
            whileInView="show"
            viewport={viewportReveal}
            variants={staggerContainer}
          >
            <motion.p
              variants={fadeUp}
              className="font-bold text-[15px] lg:text-[18px] text-[#1d6c97] mb-[20px] leading-[30px]"
            >
              Across industries, operations are often managed through
              disconnected systems.
            </motion.p>
            <div className="flex flex-col gap-[20px] lg:gap-[30px]">
              {LEFT_ROWS.map((row, i) => (
                <motion.div key={i} variants={fadeUp} className="flex items-center gap-[16px]">
                  <div className="size-[44px] lg:size-[50px] bg-white rounded-full shadow-[0px_3.333px_11.667px_0px_rgba(156,220,255,0.04),0px_16.667px_66.667px_0px_rgba(0,0,0,0.12)] flex-shrink-0 flex items-center justify-center">
                    <div className="relative size-[26px]">
                      <Image
                        src={row.icon}
                        alt=""
                        fill
                        className="object-contain"
                        sizes="26px"
                      />
                    </div>
                  </div>
                  <p className="flex-1 min-w-0 text-[14px] lg:text-[18px] text-[#0f172a] leading-[24px]">
                    {row.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CENTER ILLUSTRATION — sits in the 407px center grid track on lg, and
              stacks between the columns on smaller screens. The fixed 407×455
              composition is uniformly scaled to fit the available width; the
              sized box reserves the scaled footprint so layout stays exact. */}
          <div ref={centerRef} className="flex w-full justify-center items-center md:order-1 md:col-span-2 lg:order-none lg:col-span-1">
            <div style={{ width: CENTER_W * centerScale, height: CENTER_H * centerScale }}>
            <div className="origin-top-left" style={{ transform: `scale(${centerScale})` }}>
            <motion.div
              className="relative w-[407px] h-[455px] overflow-hidden"
              initial="hidden"
              whileInView="show"
              viewport={viewportReveal}
              variants={zoomIn}
            >
              {/* White background blob */}
              <div className="absolute pointer-events-none" style={{ left: "105px", top: "110px", width: "186px", height: "186px" }}>
                <Image src="/about/what-we-see-center-blob.svg" alt="" fill className="object-contain" sizes="186px" />
              </div>
              {/* Glass swirl — Figma node 2059 (Union (1).svg): purple→blue gradient glass
                  with inner-shadow glow; the V-Watch badge sits on top of this */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Union%20(1).svg"
                alt=""
                width={158}
                height={140}
                className="absolute pointer-events-none"
                style={{ left: "123px", top: "139px", width: "158px", height: "140px" }}
              />
              {/* Swirl outline ring — Figma node 2063 (Union.svg): thin white gradient stroke
                  rendered on top of the glass to form its bright rim */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Union.svg"
                alt=""
                width={151}
                height={134}
                className="absolute pointer-events-none"
                style={{ left: "125.88px", top: "142.71px", width: "150.652px", height: "133.299px" }}
              />

              {/* Bottom-left floating card (Subtract 236×226) */}
              <div className="absolute left-0 top-[192px] w-[236px] h-[226px]">
                <Image src="/about/what-we-see-center-bottom.webp" alt="" fill className="object-contain" sizes="236px" />
              </div>
              {/* Top-right floating card (Subtract 234×226) — Figma SVG with embedded image fill */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Subtract.webp"
                alt=""
                width={234}
                height={226}
                loading="lazy"
                decoding="async"
                className="absolute"
                style={{ left: "171px", top: "0px" }}
              />
              
              {/* Eye badge (top-left) — Figma "Group 1321317120" (node 1043:1989) is a
                  fully self-contained 124×124 badge: white circle + dotted sparkle ring +
                  eye + soft glow, exported as a 186×186 SVG (the extra ~31px per side is the
                  glow). Render the badge on its own. The old code additionally stacked a
                  manual white circle + the solid Vector(1) ring (the worker-badge recipe),
                  which laid an unwanted solid ring on top of the badge's own dotted ring. */}
              <div
                className="absolute z-10 pointer-events-none"
                style={{ left: "21px", top: "37px", width: "124.089px", height: "124.093px" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Group%201321317120.svg"
                  alt="Vision"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none"
                  style={{ width: "186px", height: "186px" }}
                />
              </div>
              {/* Worker circle (bottom-right) — Figma Group 1321316998 (124.089×124.093) */}
              <div
                className="absolute z-10 pointer-events-none"
                style={{ left: "265px", top: "265px", width: "124.089px", height: "124.093px" }}
              >
                {/* White circle background (drawn first so its glow sits behind the rings) */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FEFEFE]"
                  style={{ width: "99px", height: "99px", boxShadow: "0 0 21.6px rgba(56,143,192,0.30)" }}
                />
                {/* Thin ring — Vector (1).svg */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Vector%20(1).svg"
                  alt=""
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ width: "111px", height: "110px" }}
                />
                {/* Dotted outer ring — dotted-ring.svg (on top of the glow so the dots stay visible) */}
                
                {/* Worker icon — Group.svg */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Group.svg"
                  alt="Worker"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ width: "52px", height: "52px" }}
                />
              </div>
              {/* Central V-Watch badge — Figma node 2067 (outer glass circle) */}
              <div
                className="absolute z-20 flex items-center justify-center rounded-full overflow-hidden"
                style={{
                  left: "148px",
                  top: "155px",
                  width: "106.527px",
                  height: "106.968px",
                  border: "1.646px solid rgba(255,255,255,0.40)",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.60) 0%, rgba(212,240,255,0.36) 100%), rgba(255,255,255,0.10)",
                  boxShadow: "0 0 55.267px 0 rgba(29,108,151,0.16)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Inner frame — Figma node 2068 */}
                <div
                  className="flex flex-col items-start"
                  style={{
                    width: "104.701px",
                    padding: "43.672px 13.437px",
                    gap: "11.198px",
                    flexShrink: 0,
                    background:
                      "linear-gradient(315deg, rgba(239,245,255,0.20) 14.64%, rgba(224,235,255,0.00) 85.36%)",
                  }}
                >
                  {/* V-WATCH logo — Figma node 2069 (Group 1): 78.421×17.798 layout box,
                      with the 107×85 glow canvas centered and overflowing (clipped to the circle) */}
                  <div className="relative" style={{ width: "78.421px", height: "17.798px" }}>
                    <div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{ width: "107px", height: "85px" }}
                    >
                      <Image
                        src="/Group 1.svg"
                        alt="V-WATCH"
                        fill
                        unoptimized
                        className="object-contain"
                        sizes="107px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <motion.div
            className="w-full max-w-[360px] justify-self-center md:order-3 md:justify-self-center lg:order-none lg:justify-self-stretch"
            initial="hidden"
            whileInView="show"
            viewport={viewportReveal}
            variants={staggerContainer}
          >
            <motion.p
              variants={fadeUp}
              className="font-bold text-[15px] lg:text-[18px] text-[#1d6c97] leading-[30px]"
            >
              This creates blind spots.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-[15px] lg:text-[18px] text-[#1d6c97] leading-[30px] mt-[4px]"
            >
              Teams struggle to
            </motion.p>

            <div className="flex flex-col gap-[16px] mt-[16px]">
              {RIGHT_ITEMS.map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="flex items-center gap-[10px]">
                  <div className="size-[20px] bg-[#fe5768] rounded-[10px] border-[0.667px] border-white flex-shrink-0 flex items-center justify-center shadow-[2.667px_2px_0px_rgba(255,142,142,0.25)]">
                    <div className="relative size-[10.667px]">
                      <Image
                        src="/about/what-we-see-icon-x.webp"
                        alt=""
                        fill
                        className="object-contain"
                        sizes="11px"
                      />
                    </div>
                  </div>
                  <p className="flex-1 min-w-0 text-[14px] lg:text-[18px] text-[#0f172a] leading-[24px]">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Chain illustration */}
            <motion.div variants={fadeUp} className="mt-[16px] flex flex-col items-center gap-[10px]">
              <div className="relative w-full" style={{ maxWidth: "360px", height: "130px" }}>
                <Image
                  src="/about/what-we-see-chain-illustration.svg"
                  alt=""
                  fill
                  className="object-contain"
                  sizes="360px"
                />
              </div>
              <p className="text-[13px] lg:text-[18px] text-[#1d6c97] text-center leading-[24px]">
                When systems are{" "}
                <span className="font-bold text-[#e7000b]">disconnected</span>
                {", "}control becomes reactive, not proactive.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
