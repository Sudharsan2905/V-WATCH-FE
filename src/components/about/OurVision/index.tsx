"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { fadeUp, fadeIn, wipeTop, staggerContainer, viewportReveal } from "../anim";

const ICONS = [
  { src: "/about/vision-icon-people.webp", label: "People" },
  { src: "/about/vision-icon-movement.webp", label: "Movement" },
  { src: "/about/vision-icon-operations.webp", label: "Operations" },
  { src: "/about/vision-icon-workforce.webp", label: "Workforce" },
];

// Desktop illustration is laid out at this native design width (Figma frame),
// then scaled uniformly to fill the container so it stays pixel-perfect at any width.
const DESIGN_WIDTH = 1280;
const DESIGN_HEIGHT = 419;

export default function OurVision() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / DESIGN_WIDTH);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="bg-[#F5FBFF] overflow-hidden pb-[60px] lg:pb-0">
      {/* Section header */}
      <motion.div
        variants={wipeTop}
        initial="hidden"
        whileInView="show"
        viewport={viewportReveal}
        className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[60px] pt-[40px] lg:pt-[60px]"
      >
        <h2 className="text-[22px] lg:text-[26px] font-bold text-[#0a4b6e] leading-normal mb-[10px]">
          Our Vision
        </h2>
        <p className="text-[16px] lg:text-[20px] text-[#0a4b6e] leading-[28px]">
          We believe operations should not be managed in silos.
        </p>
      </motion.div>

      {/* Mobile layout */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportReveal}
        className="lg:hidden w-full max-w-[1440px] mx-auto px-4 sm:px-6 mt-[24px] flex flex-col gap-[20px]"
      >
        <motion.div
          variants={fadeUp}
          className="relative rounded-[30px] overflow-hidden min-h-[300px]"
          style={{ background: "linear-gradient(155deg, #0c1e40 0%, #0e2649 40%, #112d56 70%, #0c2044 100%)" }}
        >
          <div className="relative z-10 px-[24px] py-[30px] flex flex-col justify-between gap-[24px] min-h-[300px]">
            <div>
              <p className="font-bold text-[16px] text-white leading-[26px] mb-[10px]">
                We believe operations should not be managed in silos.
              </p>
              <p className="text-[14px] text-[#eaf8ff] leading-[22px]">
                V-Watch Ai was built to unify every critical layer of your
                environment into a single system giving you real-time visibility
                and control across
              </p>
            </div>
            <div className="flex items-end justify-between gap-[4px]">
              {ICONS.map((icon) => (
                <div
                  key={icon.label}
                  className="flex flex-col items-center gap-[6px] flex-1"
                >
                  <div className="size-[44px] bg-white border border-[#9cdcff] rounded-full flex items-center justify-center">
                    <div className="relative size-[22px]">
                      <Image
                        src={icon.src}
                        alt={icon.label}
                        fill
                        className="object-contain"
                        sizes="22px"
                      />
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-white text-center leading-tight">
                    {icon.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        <motion.div
          variants={fadeUp}
          className="bg-white rounded-[24px] p-[20px] shadow-[0px_4px_24px_rgba(10,75,110,0.10)]"
        >
          <p className="font-bold text-[16px] text-[#0a4b6e] mb-[8px]">
            Our goal is simple
          </p>
          <p className="text-[14px] text-[#1d6c97] leading-[22px]">
            To help organisations move from fragmented management to complete
            operational intelligence.
          </p>
        </motion.div>
      </motion.div>

      {/* Desktop layout — contained within max-width, dark card at container left-0 */}
      <motion.div
        ref={frameRef}
        variants={fadeIn}
        initial="hidden"
        whileInView="show"
        viewport={viewportReveal}
        className="hidden lg:block w-full max-w-[1440px] mx-auto mt-[30px] overflow-hidden"
        style={{ height: DESIGN_HEIGHT * scale }}
      >
        {/* Native-width design frame, scaled uniformly to fill the container so the whole
            illustration stays aligned and pixel-accurate at every screen size. */}
        <div
          className="relative origin-top-left h-[419px] w-[1280px]"
          style={{ transform: `scale(${scale})` }}
        >
        {/* Faint splaying arrows (up + down) behind the target — Figma node 1043:2286 */}
        <div className="absolute right-[457px] top-1/2 -translate-y-1/2 w-[1045px] pointer-events-none">
          <svg
            width="100%"
            viewBox="0 0 1044.88 414.537"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              opacity="0.26"
              d="M1022.55 51.9611C1022.41 68.1322 1018.12 83.8546 1009.79 98.7048C1001.63 113.257 989.963 126.338 975.116 137.583C960.27 148.828 942.999 157.665 923.786 163.847C903.849 170.262 882.722 173.515 860.991 173.515H0V139.637H860.991C892.046 139.637 921.344 130.4 943.488 113.628C965.513 96.9461 977.694 74.9046 977.825 51.5255L953.192 51.2857L1000.23 0L1044.88 52.1785L1022.55 51.9611Z"
              fill="#29A9E1"
            />
            <path
              opacity="0.26"
              d="M1022.55 362.576C1022.41 346.404 1018.12 330.682 1009.79 315.832C1001.63 301.279 989.963 288.199 975.116 276.954C960.27 265.709 942.999 256.872 923.786 250.69C903.849 244.275 882.722 241.022 860.991 241.022L0 241.021V274.899L860.991 274.9C892.046 274.9 921.344 284.137 943.488 300.909C965.513 317.591 977.694 339.632 977.825 363.011L953.192 363.251L1000.23 414.537L1044.88 362.358L1022.55 362.576Z"
              fill="#29A9E1"
            />
          </svg>
        </div>
        {/* Right target graphic */}
        <div className="absolute right-[0px] inset-y-0 w-[480px] pointer-events-none">
          <Image
            src="/about/vision-bg-right.png"
            alt=""
            fill
            className="object-contain object-right"
            sizes="480px"
          />
        </div>
        {/* Fade gradient to blend dark card edge */}
        <div
          className="absolute inset-y-0 left-[480px] w-[280px] pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, #F5FBFF 0%, rgba(245,251,255,0.6) 60%, transparent 100%)",
          }}
        />

        {/* Goal card — floating on right. Figma node 1043:2290 layers three fills:
            (1) light gradient #F5FBFF → #E2F6FF(0%) right→left, ON TOP;
            (2) blue gradient #1B75BB → #2C3460 at 10% opacity, top→bottom, BEHIND;
            (3) inner shadow — rgb(126,207,250) @ 31%, offset right + heavily blurred,
                reading as a soft blue glow on the card's left side. */}
        <div
          className="absolute top-1/2 -translate-y-1/2 right-[4.5%] w-[260px] rounded-[24px] p-[20px]"
          style={{
            background:
              "linear-gradient(270deg, #F5FBFF 3%, rgba(226,246,255,0) 66%), " +
              "linear-gradient(180deg, rgba(27,117,187,0.1) 0%, rgba(30,132,198,0.1) 12.07%, rgba(38,169,224,0.1) 33.45%, rgba(39,147,200,0.1) 43.34%, rgba(42,96,144,0.1) 68.95%, rgba(43,64,109,0.1) 88%, rgba(44,52,96,0.1) 98.23%)",
            boxShadow: "inset 76px 0 140px 0 rgba(126,207,250,0.31)",
          }}
        >
          <p className="font-bold text-[18px] text-[#0a4b6e] leading-[24px] mb-[8px]">
            Our goal is simple
          </p>
          <p className="text-[18px] text-[#1d6c97] leading-[24px]">
            To help organisations move from fragmented management to complete
            operational intelligence.
          </p>
        </div>

        {/* Dark card — starts at container left (left-0) */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[419px] w-[592px] rounded-tr-[46px] rounded-br-[46px] overflow-hidden">
          {/* Card background image — Figma Frame 2147231126 (592×419) */}
          <Image
            src="/Frame 2147231126.webp"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="592px"
          />
          <div className="relative z-10 h-full pl-[60px] pr-[10px] py-[40px] flex flex-col justify-between">
            {/* Top text */}
            <div>
              <p className="font-bold text-[18px] text-white leading-[26px] mb-[14px]">
                We believe operations should not be managed in silos.
              </p>
              <p className="text-[18px] text-[#eaf8ff] leading-[26px]">
                V-Watch Ai was built to unify every critical layer of your
                environment into a single system giving you real-time visibility
                and control across
              </p>
            </div>

            {/* Icon row with arrow connectors */}
            <div className="relative flex items-end justify-between pr-[40px]">
              {/* Dashed flow connectors — a riser from each icon curves right into a
                  shared horizontal bus that exits toward the main arrow. Widths decrease so
                  all four converge to the same exit point. Figma nodes 1043:2356-2363. */}
              {[
                { left: 50, w: 486 },
                { left: 170, w: 347 },
                { left: 290, w: 209 },
                { left: 410, w: 70 },
              ].map(({ left, w }, i) => (
                <svg
                  key={`conn-${i}`}
                  className="absolute pointer-events-none"
                  style={{ left, top: -80, width: w, height: 82, overflow: "visible" }}
                  viewBox={`0 0 ${w} 82`}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient
                      id={`vconn-${i}`}
                      x1="11"
                      y1="0"
                      x2={w}
                      y2="0"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FEFEFE" />
                      <stop offset="1" stopColor="#FEFEFE" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* glow rail */}
                  <path
                    d={`M11 82V25C11 17.268 17.3541 11 25.0861 11H${w}`}
                    stroke={`url(#vconn-${i})`}
                    strokeOpacity="0.4"
                    strokeWidth="22"
                  />
                  {/* dashed centre line */}
                  <path
                    d={`M11 80.5V25.5C11 18.4 17 12.5 25 12.5H${w}`}
                    stroke={`url(#vconn-${i})`}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="5 5"
                    opacity="0.6"
                  />
                </svg>
              ))}

              {ICONS.map((icon, i) => (
                <div
                  key={icon.label}
                  className="relative z-10 flex flex-col items-center gap-[6px]"
                  style={{ flex: "1 0 0" }}
                >
                  <div className="size-[66px] bg-white border border-[#9cdcff] rounded-full shadow-[0px_4px_8px_0px_rgba(126,207,250,0.12)] flex items-center justify-center">
                    <div className="relative size-[30px]">
                      <Image
                        src={icon.src}
                        alt={icon.label}
                        fill
                        className="object-contain"
                        sizes="30px"
                      />
                    </div>
                  </div>
                  <span className="text-[16px] font-bold text-white text-center leading-tight">
                    {icon.label}
                  </span>
                </div>
              ))}

              {/* Arrow connectors between icons */}
              {[104, 224, 344].map((leftPx, i) => (
                <div
                  key={i}
                  className="absolute z-10 top-[15px] flex items-center justify-center"
                  style={{ left: leftPx, width: 36, height: 36 }}
                >
                  <div className="relative w-[24px] h-[13px]">
                    <Image
                      src="/Group (1).svg"
                      alt=""
                      fill
                      className="object-contain"
                      sizes="24px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main solid arrow into the target — Figma node 1043:2354 (on top, tail fades into card) */}
        <div className="absolute right-[444px] top-1/2 -translate-y-1/2 w-[1041px] h-[92px] pointer-events-none">
          <Image
            src="/about/vision-main-arrow.svg"
            alt=""
            fill
            className="object-fill"
            sizes="1041px"
          />
        </div>
        </div>
      </motion.div>
    </section>
  );
}
