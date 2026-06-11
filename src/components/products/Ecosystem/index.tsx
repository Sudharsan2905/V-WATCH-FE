"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const cardLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

// Sequence for the top block: header first, cards staggering in on the left,
// the map revealing alongside, then the callout label over it.
const cardsStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const mapReveal: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE, delay: 0.35 },
  },
};

const calloutReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay: 0.8 },
  },
};

const headerStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const logoStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const logoItem: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: EASE },
  },
};

const COMPANIES: { name: string; country: string; logo: string }[] = [
  {
    name: "SS Surveillance and Communication Sdn Bhd",
    country: "Malaysia",
    logo: "/products/eco/si-1.png",
  },
  {
    name: "SS Tech Pte Ltd",
    country: "Singapore",
    logo: "/products/eco/si-2.png",
  },
  {
    name: "QuSol Innovations India Pvt Ltd",
    country: "India",
    logo: "/products/eco/si-3.png",
  },
];

const ROW_1 = ["p-1", "p-2", "p-3", "p-4", "p-5", "p-6"];
const ROW_2 = ["p-7", "p-8", "p-9", "p-10", "p-11", "p-12"];

function IconBox({ src }: Readonly<{ src: string }>) {
  return (
    <span className="flex size-[54px] shrink-0 items-center justify-center rounded-[14px] border-2 border-white bg-[rgba(244,251,255,0.2)] shadow-[9px_7px_60px_rgba(255,255,255,0.4),6px_10px_23px_rgba(217,226,255,0.85),0_13px_100px_rgba(199,199,199,0.25)]">
      <Image src={src} alt="" width={36} height={36} className="size-9" />
    </span>
  );
}

function LogoRow({ items }: Readonly<{ items: string[] }>) {
  return (
    <motion.div
      variants={logoStagger}
      className="flex flex-wrap items-center justify-center gap-x-[18px] gap-y-4"
    >
      {items.map((p) => (
        <motion.div
          key={p}
          variants={logoItem}
          className="relative h-[80px] w-[174px] shrink-0"
        >
          <Image
            src={`/products/eco/${p}.png`}
            alt="Technology partner"
            fill
            className="object-contain"
            sizes="174px"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function Ecosystem() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-white px-6 pb-20 lg:px-[60px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_85%_35%,rgba(176,226,243,0.5),transparent_60%),linear-gradient(180deg,#f6fcfe_0%,#eaf7fa_45%,#dff2f3_70%)]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0, #000 180px, #000 90%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0, #000 180px, #000 80%)",
          }}
        />

        <Image
          src="/products/BackgroundEcoSystem.webp"
          alt=""
          aria-hidden
          width={1728}
          height={1629}
          className="pointer-events-none absolute inset-0 h-full w-full max-w-none object-cover object-top opacity-20 [filter:invert(1)_hue-rotate(25deg)_saturate(0.4)_brightness(1.2)]"
          sizes="100vw"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0, #000 180px, #000 80%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0, #000 180px, #000 80%)",
          }}
        />

        <div className="relative z-10 mx-auto flex w-full max-w-[1410px] flex-col gap-[30px]">
          {/* System integrators + world map */}
          <motion.div
            className="flex flex-col items-start gap-[30px] lg:flex-row"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="flex w-full flex-col gap-[30px] lg:w-[482px]">
              <motion.div variants={fadeUp} className="flex items-center gap-3.5">
                <IconBox src="/products/eco/icon-integrators.svg" />
                <p className="flex-1 text-[20px] font-bold leading-[26px] text-[#0A4B6E]">
                  System Integrators
                  <br />
                  On-ground delivery and implementation
                </p>
              </motion.div>

              <motion.div variants={cardsStagger} className="flex flex-col gap-6">
                {COMPANIES.map((c) => (
                  <motion.div
                    key={c.name}
                    variants={cardLeft}
                    className="relative w-full overflow-hidden rounded-[16px] border-[1.25px] border-white/80 bg-white/[0.32] py-4 pl-[78px] pr-5 shadow-[inset_0_4px_84px_white,inset_20px_0_24px_rgba(126,207,250,0.1),inset_-20px_0_24px_rgba(126,207,250,0.1),0_10px_30px_rgba(126,207,250,0.22)]"
                  >
                    <span className="absolute left-[18px] top-4 flex size-12 items-center justify-center overflow-hidden rounded-full bg-white">
                      <Image
                        src={c.logo}
                        alt={c.name}
                        width={48}
                        height={48}
                        className="size-full object-cover"
                      />
                    </span>
                    <p className="text-[18px] font-medium leading-[1.1] text-[#1d293d]">
                      {c.name}
                    </p>
                    <p className="mt-1.5 text-[16px] font-normal leading-[22px] text-[#314158]">
                      {c.country}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* World map with callout — top-aligned in the upper-right, bleeding
                to the right edge */}
            <div className="relative flex flex-1 items-start self-stretch">
              <motion.div
                variants={mapReveal}
                className="relative h-[380px] w-full lg:-mr-[60px] lg:-mt-2"
              >
                <Image
                  src="/products/World_map.webp"
                  alt="Global delivery map"
                  height={380}
                  width={700}
                  className="object-contain [filter:drop-shadow(0_18px_34px_rgba(79,194,255,0.28))]"
                  sizes="900px"
                />
              </motion.div>
              <motion.div
                variants={calloutReveal}
                className="absolute bottom-2 left-0 flex h-[60px] w-full max-w-[633px] items-center gap-3.5 rounded-l-[40px] rounded-r-[16px] border border-white/60 bg-[linear-gradient(180deg,rgba(184,230,255,0.6),rgba(193,236,255,0.6))] py-px pl-px pr-[14px] shadow-[0_1px_2px_0_rgba(184,230,255,0.5),inset_0_-6px_23px_rgba(212,240,255,0.24)] backdrop-blur-[10px]"
              >
                <span className="flex size-[58px] shrink-0 items-center justify-center rounded-full border-[1.25px] border-white bg-[linear-gradient(180deg,rgba(184,230,255,0.6),rgba(193,236,255,0.6))]">
                  <Image
                    src="/products/Globe.svg"
                    alt="Delivery icon"
                    width={35}
                    height={35}
                    className="size-11"
                  />
                </span>
                <p className="flex-1 text-[18px] font-medium leading-6 text-[#1d293d]">
                  Ensuring reliable implementation across regions and
                  environments.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Technology partners */}
          <motion.div
            className="flex flex-col gap-[30px]"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              variants={headerStagger}
              className="flex flex-col items-center gap-3.5"
            >
              <motion.div variants={fadeUp} className="flex w-full items-center gap-3.5">
                <IconBox src="/products/eco/icon-partners.svg" />
                <p className="flex-1 text-[20px] font-bold leading-[26px] text-[#0A4B6E]">
                  Technology Partners
                  <br />
                  Integrated with leading systems
                </p>
              </motion.div>
              <motion.div variants={fadeUp} className="w-full pl-[70px]">
                <p className="text-[20px] font-normal leading-[26px] text-[#0A4B6E]">
                  V-Watch Ai integrates with industry-leading technologies to
                  extend functionality and work within your existing ecosystem.
                </p>
              </motion.div>
            </motion.div>

            <div className="flex flex-col items-center gap-2.5">
              <LogoRow items={ROW_1} />
              <LogoRow items={ROW_2} />
              <motion.p
                variants={fadeUp}
                className="text-[20px] font-bold leading-[26px] text-[#1d6c97]"
              >
                Designed to integrate not replace your existing systems.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
