"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";

// Shared ease — matches the rest of the site (≈ easeOutQuint).
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Header clip-wipe from the top — the site's signature heading reveal.
const wipeDown: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  show: (delay = 0) => ({
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { delay, duration: 0.6, ease: EASE },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};

// Placeholder art, used as a fallback when a block has no `image` of its own.
// Space in the filename is URL-encoded for the asset request.
const CAP_IMAGE = "/pre-construction/platform-overview/Rectangle%2034624111.png";

// Each capability carries its own `image` — set a per-block path here to give
// every block a distinct visual. Falls back to CAP_IMAGE when omitted.
type Capability = {
  number: string;
  title: string;
  points: string[];
  image?: string;
};

const CAPABILITIES: Capability[] = [
  {
    number: "01",
    title: "Workforce & Site Management",
    image: "/pre-construction/platform-overview/Workforce_Site_Management_image.png",
    points: [
      "Person management and profiles",
      "Access and attendance tracking",
      "Contractor and company management",
      "Pass and badge management",
    ],
  },
  {
    number: "02",
    title: "Operations & Workflow Control",
    image: "/pre-construction/platform-overview/Operations_Workflow_Control_image.png",
    points: [
      "Task and project management",
      "Work program tracking",
      "Site coordination and execution",
      "Container and site logistics management",
    ],
  },
  {
    number: "03",
    title: "Vehicle, Fleet & Logistics",
    image: "/pre-construction/platform-overview/Vehicle_Fleet_Logistics_image.png",
    points: [
      "Vehicle tracking and reporting",
      "Delivery and logistics coordination",
      "Inventory and movement tracking",
      "Fleet visibility and control",
    ],
  },
  {
    number: "04",
    title: "Assets & Quality Management",
    image: "/pre-construction/platform-overview/Assets_Quality_Management_image.png",
    points: [
      "Asset tracking and utilisation",
      "Audit and quality assurance",
      "Equipment monitoring",
    ],
  },
  {
    number: "05",
    title: "Safety & Compliance",
    image: "/pre-construction/platform-overview/Safety_Compliance_image.png",
    points: [
      "Permit-to-work (PTW)",
      "LOTO and safety protocols",
      "AI safety monitoring",
      "Emergency monitoring systems",
    ],
  },
  {
    number: "06",
    title: "Productivity & Intelligence",
    image: "/pre-construction/platform-overview/Productivity_Intelligence_image.png",
    points: [
      "Manhour tracking",
      "Time-lapse and progress tracking",
      "BI reporting and insights",
      "Performance visibility",
    ],
  },
];

// Full-width pill that closes the capabilities list: centred tagline flanked by
// thin connector lines ending in dots. Figma: 1140×60, radius 30, 1px gradient
// border, soft translucent-purple fill, text Lato 700/18 tracking -0.6 #006F9F.
function ConnectedBanner({
  text = "Every part of your project connected in one system.",
}: Readonly<{ text?: string }>) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className="mx-auto mt-10 flex h-[60px] w-full max-w-[1140px] items-center justify-center gap-2.5 rounded-[30px] px-2.5"
      style={{
        // Fill: centre 70% is light lavender (#CDCDFE), outer 30% fades to white.
        // Border: vertical gradient — light blue (#C1ECFF) on top fading to white
        // (#FFFFFF) at the bottom, so the heavier 2px bottom edge reads white.
        // Inner shadow: X0 Y-4 Blur24 #FFFFFF.
        background:
          "linear-gradient(90deg,#FFFFFF 0%,#CDCDFE 15%,#CDCDFE 85%,#FFFFFF 100%) padding-box, linear-gradient(180deg,#C1ECFF 0%,#FFFFFF 100%) border-box",
        // Border weight: 1px top, 2px bottom (heavier base reads as a soft
        // shadow), 1px on the sides — the border-box gradient fills each side.
        borderStyle: "solid",
        borderColor: "transparent",
        borderWidth: "1px 1px 2px 1px",
        boxShadow: "inset 0 -4px 24px 0 #FFFFFF",
      }}
    >
      {/* Left line fades from transparent (outer) to solid blue at the dot. */}
      <span className="hidden items-center sm:flex">
        <span className="h-0.5 w-44 bg-linear-to-r from-[#006F9F]/0 to-[#006F9F]" />
        <span className="size-2.25 shrink-0 rounded-full bg-[#006F9F]" />
      </span>

      <span className="font-lato shrink-0 px-10 text-center text-[18px] font-bold leading-[26px] tracking-[-0.6px] text-[#006F9F]">
        {text}
      </span>

      {/* Right line mirrors the left: solid at the dot, fading out to the edge. */}
      <span className="hidden items-center sm:flex">
        <span className="size-2.25 shrink-0 rounded-full bg-[#006F9F]" />
        <span className="h-0.5 w-44 bg-linear-to-l from-[#006F9F]/0 to-[#006F9F]" />
      </span>
    </motion.div>
  );
}

function CheckItem({ children }: Readonly<{ children: string }>) {
  return (
    <li className="flex items-center gap-3">
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#E3F8EC]">
        <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
          <path
            d="M3 7.3 5.6 9.9 11 4.1"
            stroke="#1FA85A"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="font-lato text-[18px] font-normal leading-5 tracking-normal text-[#314158]">
        {children}
      </span>
    </li>
  );
}

function CapabilityRow({
  cap,
  index,
}: Readonly<{ cap: Capability; index: number }>) {
  // Alternate sides: even index → text left / image right; odd → reversed.
  const reverse = index % 2 === 1;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={`flex flex-col gap-6 rounded-3xl bg-white p-5 shadow-[0_20px_50px_-25px_rgba(20,46,92,0.25)] lg:flex-row lg:items-center lg:gap-16 lg:rounded-none lg:bg-transparent lg:p-0 lg:shadow-none ${
        reverse ? "lg:flex-row-reverse" : ""
      } ${index > 0 ? "lg:-mt-2" : ""}`}
    >
      {/* Text — vertically centred against the image height (lg:items-center).
          White card rounded 32px on its outer side (left for content-left, right
          for content-right). The inner, non-rounded side fades the white out to
          transparent so it melts into the page background instead of a hard edge. */}
      <div
        className={`flex-1 px-2 py-4 lg:p-8 ${
          reverse
            ? "lg:rounded-r-4xl lg:bg-[linear-gradient(to_left,#FFFFFF_60%,rgba(255,255,255,0)_100%)]"
            : "lg:rounded-l-4xl lg:bg-[linear-gradient(to_right,#FFFFFF_60%,rgba(255,255,255,0)_100%)]"
        }`}
      >
        <span className="block font-lato text-[36px] font-bold leading-none text-[#0A8EC880]">
          {cap.number}
        </span>
        <h3 className="mt-3 font-lato text-[24px] font-bold leading-[100%] tracking-[0] text-[#0A4B6E]">
          {cap.title}
        </h3>
        <ul className="mt-5 space-y-2.5">
          {cap.points.map((p) => (
            <CheckItem key={p}>{p}</CheckItem>
          ))}
        </ul>
      </div>

      {/* Image — per-block art, falls back to the shared placeholder. */}
      <div className="flex w-full flex-1 justify-center">
        <div className="relative w-full max-w-90">
          {/* Light-purple circle behind the image — a soft round glow (radial
              fill so its edge feathers cleanly instead of smearing). It sits low
              on the image's own (outer) side, bleeding out past the bottom:
              bottom-left when the image is on the left, bottom-right when it's on
              the right. */}
          <div
            aria-hidden
            className={`pointer-events-none absolute bottom-0 -z-10 aspect-square w-[110%] -translate-x-1/2 translate-y-1/3 rounded-full bg-[radial-gradient(circle,#E9E4FA_55%,rgba(233,228,250,0)_100%)] ${
              reverse ? "left-0" : "left-full"
            }`}
          />
          <div
            className={`w-full rounded-[20px] p-2.5 shadow-[0_28px_55px_-28px_rgba(20,46,92,0.40)] [--gdir:to_bottom_right] ${
              reverse ? "lg:[--gdir:to_bottom_right]" : "lg:[--gdir:to_bottom_left]"
            }`}
            style={{
            // 2px blue→white gradient border (Figma: 1.98px, #0A8EC8 → #FFFFFF).
            // Blue sits at the outer-top corner — but the image only has a real
            // left/right side at lg (below that the layout stacks). So --gdir
            // defaults to a single corner (top-left) when stacked, and only
            // flips per row at lg: top-left when the image is on the left
            // (reverse), top-right when it's on the right.
            background:
              "linear-gradient(#fff,#fff) padding-box, linear-gradient(var(--gdir),#0A8EC8,#FFFFFF) border-box",
            border: "2px solid transparent",
            }}
          >
            <Image
              src={cap.image ?? CAP_IMAGE}
              alt=""
              width={340}
              height={360}
              unoptimized
              className="aspect-340/360 w-full rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

type PlatformOverviewContent = {
  heading?: string;
  capabilities?: Capability[];
  bannerText?: string;
};

export default function PlatformOverview({
  content = {},
}: Readonly<{ content?: PlatformOverviewContent }> = {}) {
  const {
    heading = "A single platform to run your entire project",
    capabilities = CAPABILITIES,
    bannerText,
  } = content;

  return (
    <MotionConfig reducedMotion="user">
      {/* Full-width band, 60px horizontal padding (px-6 on mobile). */}
      <section className="relative z-10 w-full overflow-hidden bg-[#f5fbff] px-6 pb-8 pt-8 lg:px-[60px]">
        {/* Soft decorative blobs, behind the content. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-1/4 size-[440px] rounded-full bg-[#E9E4FA] opacity-50 blur-[90px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-28 top-2/3 size-[480px] rounded-full bg-[#E2ECFB] opacity-60 blur-[100px]"
        />

        <div className="relative z-10">
          {/* Heading — full width, sits at the section's 60px left padding. */}
          <motion.h2
            variants={wipeDown}
            custom={0.05}
            initial="hidden"
            animate="show"
            className="font-lato max-w-[889px] lg:pl-[112px] text-[26px] font-bold leading-[100%] tracking-[0] text-[#0A4B6E]"
          >
            {heading}
          </motion.h2>

          {/* Blocks — 996px wide, centred. */}
          <div className="mx-auto mt-14 flex max-w-[996px] flex-col gap-8 lg:mt-16 lg:gap-0">
            {capabilities.map((cap, i) => (
              <CapabilityRow key={cap.number} cap={cap} index={i} />
            ))}
          </div>

          <ConnectedBanner text={bannerText} />
        </div>
      </section>
    </MotionConfig>
  );
}
