"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { fadeUp, scaleIn, zoomIn } from "@/components/about/anim";

const VIEWPORT = { once: true, amount: 0.5, margin: "0px 0px -120px 0px" } as const;

/* ------------------------------------------------------------------ *
 * Assets — drop the provided files at these exact paths:
 *   Icons:   /public/site-visibility/platform/<key>.svg
 *   Diagram: /public/site-visibility/platform/core-platform.png
 * ------------------------------------------------------------------ */
const ICON = (key: string) => `/site-visibility/platform/${key}.svg`;
const CORE_DIAGRAM = "/site-visibility/SiteVisibilityPlatform_image.svg";
// Connector-free centre square, generated from the diagram above (< lg only).
const CORE_CENTER = "/site-visibility/SiteVisibilityPlatform_center.svg";
const CENTER_SIZE = 468;

type Feature = { key: string; label: string };

const LEFT_FEATURES: Feature[] = [
  { key: "personnel", label: "Personnel & passes" },
  { key: "vehicles", label: "Vehicles & deliveries" },
  { key: "gates", label: "Gates, cameras & sensors" },
  { key: "permits", label: "Permits & inductions" },
];

const RIGHT_FEATURES: Feature[] = [
  { key: "dashboard", label: "Live site dashboard" },
  { key: "reports", label: "Auto-generated reports" },
  { key: "alerts", label: "Real-time alerts" },
  { key: "exports", label: "Client & audit exports" },
];

/* ------------------------------------------------------------------ *
 * Diagram geometry — read straight off SiteVisibilityPlatform_image.svg
 * (viewBox 666×468). The connector stubs terminate at x=62 (left) and
 * x=604 (right), i.e. ±271 from the 333 centre line, at these four y's.
 * Every number below is derived from these, so the cards land exactly on
 * the connector tips at any width.
 * ------------------------------------------------------------------ */
const SVG_W = 666;
const SVG_H = 468;
const CONNECTOR_Y = [112.961, 192.962, 272.96, 353.961];
const CONNECTOR_DX = 271; // horizontal reach of a stub from the centre
const CARD_H = 50;

// Design box = card + stub + stub + card, laid out around the diagram.
const STAGE_W = 2 * (CONNECTOR_DX + 315);
const pctW = (px: number) => `${(px / STAGE_W) * 100}%`;
const pctH = (px: number) => `${(px / SVG_H) * 100}%`;

// Column width: from the stage edge all the way to the connector tip, so the
// card's inner edge and the stub meet with no gap.
const COLUMN_W = pctW(STAGE_W / 2 - CONNECTOR_DX);

// Card — white surface with the soft Figma drop shadow.
const CARD_SHADOW =
  "0px 10px 30px rgba(10,75,110,0.10), 0px 2px 6px rgba(156,220,255,0.28)";

// Icon disc — white circle with the soft Figma shadow (#000 12% + #9CDCFF 4%).
const DISC_SHADOW =
  "0px 16px 40px rgba(0,0,0,0.10), 0px 3px 11px rgba(156,220,255,0.30)";

function FeatureCard({
  feature,
  fill = false,
  index = 0,
}: {
  feature: Feature;
  fill?: boolean;
  index?: number;
}) {
  return (
    <motion.div
      variants={scaleIn}
      custom={index * 0.08}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      style={{ boxShadow: CARD_SHADOW }}
      // Hard-rounded on the icon (left) side, 14px on the right — same for
      // both columns (icon always on the left, per Figma).
      className={`flex w-full items-center gap-[14px] rounded-l-[26px] rounded-r-[14px] bg-white pr-[16px] ${
        fill ? "h-full" : "h-[50px]"
      }`}
    >
      {/* Disc slightly overflows the card height, exactly like the Figma. */}
      <div
        className="grid aspect-square h-[108%] max-h-[54px] shrink-0 place-items-center rounded-full bg-white"
        style={{ boxShadow: DISC_SHADOW }}
      >
        <Image
          src={ICON(feature.key)}
          alt=""
          width={24}
          height={21}
          className="size-[24px] object-contain"
        />
      </div>
      {/* Sized to the card it sits in: the stage is widest at xl+ (container
          caps at 1280, so it stops growing there) and tightest at lg, where
          the card is only ~243px wide. */}
      <span className="truncate font-lato text-[15px] font-normal leading-[20px] text-[#0F172A] lg:text-[18px] lg:leading-[24px]">
        {feature.label}
      </span>
    </motion.div>
  );
}

/* Provided centre diagram — 666×468 including the connector stubs, so it must
   be rendered uncropped (object-contain) at its native aspect ratio. */
function CorePlatformDiagram({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full ${className}`}>
      <Image
        src={CORE_DIAGRAM}
        alt="V-Watch AI core platform"
        width={SVG_W}
        height={SVG_H}
        className="h-full w-full object-contain"
        sizes="(min-width: 1024px) 666px, 100vw"
      />
    </div>
  );
}

/* Below lg there are no side cards for the connectors to reach, so this uses a
   companion asset with the 16 connector paths stripped out and the viewBox
   cropped to the centre square. Cropping alone is not enough — the connector
   curves run all the way into the orb, so they stay visible inside the crop. */
function CorePlatformCenter({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-square w-full ${className}`}>
      <Image
        src={CORE_CENTER}
        alt="V-Watch AI core platform"
        width={CENTER_SIZE}
        height={CENTER_SIZE}
        className="h-full w-full object-contain"
        sizes="(max-width: 1023px) 100vw, 420px"
      />
    </div>
  );
}

/* Desktop stage: the diagram sized to its true aspect ratio, with the eight
   cards absolutely anchored to the connector y-positions above. */
function PlatformStage() {
  return (
    <div
      className="relative mx-auto w-full"
      style={{ maxWidth: STAGE_W, aspectRatio: `${STAGE_W} / ${SVG_H}` }}
    >
      {/* Diagram, centred — its 666 width sits exactly between the columns. */}
      <motion.div
        variants={zoomIn}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="absolute inset-y-0 left-1/2 -translate-x-1/2"
        style={{ width: pctW(SVG_W) }}
      >
        <CorePlatformDiagram className="h-full" />
      </motion.div>

      {LEFT_FEATURES.map((f, i) => (
        <div
          key={f.key}
          className="absolute left-0"
          style={{
            width: COLUMN_W,
            top: pctH(CONNECTOR_Y[i] - CARD_H / 2),
            height: pctH(CARD_H),
          }}
        >
          <FeatureCard feature={f} fill index={i} />
        </div>
      ))}

      {RIGHT_FEATURES.map((f, i) => (
        <div
          key={f.key}
          className="absolute right-0"
          style={{
            width: COLUMN_W,
            top: pctH(CONNECTOR_Y[i] - CARD_H / 2),
            height: pctH(CARD_H),
          }}
        >
          <FeatureCard feature={f} fill index={i} />
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
const PILLS = [
  "Digital Site Access",
  "Delivery Management",
  "Vehicle Check-In",
  "Live Reporting",
];

export default function SiteVisibilityPlatform() {
  return (
    <section className="relative z-10 bg-[#F4FBFF] py-[56px] md:py-[72px] lg:py-[50px]">
      <div className="w-full px-[24px] lg:px-[60px]">
        <div className="mx-auto w-full max-w-[1410px]">
          {/* Header */}
          <div className="flex flex-col gap-[6px]">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="max-w-[986px] font-lato text-[20px] font-bold leading-[28px] text-[#0A4B6E] sm:text-[22px] sm:leading-[30px] lg:text-[24px] lg:leading-[32px]"
            >
              One centralized platform for who enters, what comes in, and how
              the site reports.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.08}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="max-w-[986px] font-lato text-[16px] font-medium leading-[24px] text-[#0A4B6E] sm:text-[18px] lg:text-[20px] lg:leading-[28px]"
            >
              Access, deliveries, vehicles and live reporting brought into a
              single operational layer for modern data centre sites.
            </motion.p>

            {/* Pills */}
            <motion.div
              variants={fadeUp}
              custom={0.14}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="mt-[16px] flex flex-wrap items-center justify-center gap-[10px]"
            >
              {PILLS.map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center rounded-full border border-[#3890C0] px-[14px] py-[8px] font-lato text-[12px] font-bold uppercase leading-none tracking-[0.4px] text-[#3890C0] lg:text-[14px]"
                >
                  {pill}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Platform card */}
          <div className="relative py-[28px] lg:py-0">
            {/* Laptop & up (lg+): cards anchored to the connector tips. */}
            <div className="relative hidden lg:block">
              <PlatformStage />
            </div>

            {/* Tablet & mobile (< lg): 4 cards → centre image (no connectors)
                → 4 cards. */}
            <div className="relative flex flex-col items-center gap-[24px] lg:hidden">
              <div className="grid w-full max-w-[560px] grid-cols-1 gap-[14px] sm:grid-cols-2">
                {LEFT_FEATURES.map((f, i) => (
                  <FeatureCard key={f.key} feature={f} index={i} />
                ))}
              </div>
              <motion.div
                variants={zoomIn}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
                className="w-full max-w-[420px]"
              >
                <CorePlatformCenter />
              </motion.div>
              <div className="grid w-full max-w-[560px] grid-cols-1 gap-[14px] sm:grid-cols-2">
                {RIGHT_FEATURES.map((f, i) => (
                  <FeatureCard key={f.key} feature={f} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
