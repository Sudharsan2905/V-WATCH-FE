"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { fadeUp, scaleIn, staggerContainer, viewportReveal } from "@/components/about/anim";

// Brand marks live under /public/integrators-partners/companies (shared with the
// partners page). Two rows of 7 — order matches the Figma layout.
const LOGO = (file: string) => `/integrators-partners/companies/${file}.png`;

type Brand = { file: string; label: string };

const ROW_ONE: Brand[] = [
  { file: "virtuzzo", label: "Virtuozzo" },
  { file: "alhua", label: "Dahua" },
  { file: "bosch", label: "Bosch" },
  { file: "axis", label: "Axis Communications" },
  { file: "hkvision", label: "Hikvision" },
  { file: "ivideon", label: "iVideon" },
  { file: "cisco", label: "Cisco" },
];

const ROW_TWO: Brand[] = [
  { file: "icomputin", label: "iComputing" },
  { file: "fortinet", label: "Fortinet" },
  { file: "nable", label: "N-able" },
  { file: "cloudflare", label: "Cloudflare" },
  { file: "solarwinds", label: "SolarWinds" },
  { file: "digifort", label: "Digifort" },
  { file: "sentinalor", label: "Sentinel" },
];

// Chip — Figma: 160×72, radius 10, white→#DDF3FF gradient, luminosity blend and a
// soft white drop shadow. Fluid below xl so the 7-up row scales down to fit; caps
// at the exact 160×72 from xl upward.
const CHIP_CLASS =
  "flex aspect-[160/72] w-full items-center justify-center rounded-[10px] " +
  "bg-[linear-gradient(180deg,#FFFFFF_0%,#DDF3FF_100%)] " +
  "[background-blend-mode:luminosity] shadow-[0px_4px_14px_rgba(255,255,255,0.04)] " +
  "px-[18px] py-[12px] xl:aspect-auto xl:h-[72px] xl:w-[160px]";

function LogoChip({ brand }: { brand: Brand }) {
  return (
    <motion.div variants={scaleIn} className={CHIP_CLASS}>
      <Image
        src={LOGO(brand.file)}
        alt={brand.label}
        width={108}
        height={38}
        // object-contain fits every logo without stretching; muted to sit quietly
        // in the trust strip (matches the Figma grayscale treatment).
        className="h-full max-h-[38px] w-full max-w-[108px] object-contain opacity-80 [filter:grayscale(1)]"
      />
    </motion.div>
  );
}

export default function SiteVisibilityTrustedLogos() {
  const brands = [...ROW_ONE, ...ROW_TWO];

  return (
    <section className="relative z-10 bg-[#f5fbff] pb-[20px] md:pb-[35px]">
      <div className="w-full px-[24px] lg:px-[60px]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportReveal}
          variants={staggerContainer}
          className="mx-auto flex w-full max-w-[1410px] flex-col items-center gap-[28px]"
        >
          <motion.p
            variants={fadeUp}
            className="text-center font-lato text-[16px] font-bold leading-[22px] text-[#1D6C97] sm:text-[18px] sm:leading-[24px] lg:text-[20px] lg:leading-[26px]"
          >
            Trusted on live data Centre and infrastructure sites
          </motion.p>

          {/* Grid wrapper carries the left/right edge fade masks (Figma: #F1F9FF
              gradient fading the outermost chips into the background). */}
          <div className="relative w-full">
            <div className="grid grid-cols-2 gap-x-[20px] gap-y-[16px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 lg:gap-x-[40px] lg:gap-y-[28px]">
              {brands.map((brand) => (
                <LogoChip key={brand.file} brand={brand} />
              ))}
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 hidden w-[120px] bg-[linear-gradient(90deg,#F5FBFF_0%,rgba(245,251,255,0.5)_60%,rgba(245,251,255,0)_100%)] lg:block xl:w-[200px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 hidden w-[120px] bg-[linear-gradient(270deg,#F5FBFF_0%,rgba(245,251,255,0.5)_60%,rgba(245,251,255,0)_100%)] lg:block xl:w-[200px]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
