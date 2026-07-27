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

// Trigger each group as IT enters the viewport — never on one tall wrapping
// container (which, being taller than the screen, fires the moment its top
// scrolls in and animates the card rows while they're still below the fold).
// The negative bottom margin pulls the trigger line up so a group animates just
// after it clears the fold.
const VIEWPORT = { once: true, amount: 0.2, margin: "0px 0px -120px 0px" } as const;

type EnvCard = {
  title: string;
  description: string;
  // Card background photo. Left empty on purpose — supply the URL per card.
  image: string;
};

// Top row: three equal cards. Bottom row: two wide cards.
const TOP_CARDS: EnvCard[] = [
  {
    title: "Construction & Infrastructure",
    description:
      "Manage large-scale developments, civil works, and infrastructure projects with full visibility and coordination.",
    image: "/pre-construction/complex-environments/Construction_Infrastructure_image.webp",
  },
  {
    title: "Data Centre Construction",
    description:
      "Ensure high-security access control, precise coordination, and strict compliance for mission-critical builds.",
    image: "/pre-construction/complex-environments/Data_Centre_Construction_image.webp",
  },
  {
    title: "Industrial & Energy Projects",
    description:
      "Handle complex construction environments with high safety requirements and operational risk.",
    image: "/pre-construction/complex-environments/Industrial_EnergyProjects_image.webp",
  },
];

const BOTTOM_CARDS: EnvCard[] = [
  {
    title: "Commercial Developments",
    description:
      "Coordinate multi-stakeholder projects across office, retail, and mixed-use developments.",
    image: "/pre-construction/complex-environments/Commercial_Developments_image.webp",
  },
  {
    title: "Residential Projects",
    description:
      "Manage multi-phase developments with better workforce tracking and operational efficiency.",
    // No dedicated residential photo in /public yet — reusing the construction
    // shot as the closest stand-in. Swap for a residential image when available.
    image: "/pre-construction/complex-environments/Residential_Projects_image.webp",
  },
];

function EnvironmentCard({
  card,
  index,
  sizeClassName = "h-[230px] sm:h-[260px]",
}: Readonly<{ card: EnvCard; index: number; sizeClassName?: string }>) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index * 0.08}
      className={`group relative overflow-hidden rounded-[20px] ${sizeClassName}`}
    >
      {/* Card photo — supply `image` per card. While empty it falls back to a
          neutral slate fill so the layout never breaks. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[#1c2742] bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.04]"
        style={
          card.image ? { backgroundImage: `url(${card.image})` } : undefined
        }
      />

      {/* Bottom-up black gradient behind the copy so the title/description stay
          legible over any photo (Figma: 154px band, black 10% → 60% → 80% → 100%). */}
      <div className="absolute inset-x-0 bottom-0 h-38.5 bg-[linear-gradient(180deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.6)_45%,rgba(0,0,0,0.8)_75%,rgba(0,0,0,1)_100%)]" />

      {/* Copy, anchored bottom-left. */}
      <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
        <h3 className="font-lato text-[18px] font-bold leading-tight text-white lg:text-[20px]">
          {card.title}
        </h3>
        <p className="font-lato mt-2 max-w-77 text-[16px] font-normal leading-5.5 tracking-normal text-[#F2F2F2]">
          {card.description}
        </p>
      </div>
    </motion.div>
  );
}

type ComplexEnvironmentsContent = {
  heading?: string;
  // Full-cover background texture/glow behind the card (shared with the home
  // "Industries" band). Pass "" to fall back to the flat dark gradient.
  backgroundImage?: string;
  // Radial-glow PNG that frames the top of the section. Empty by default; pass a
  // path to overlay it on top of the background image.
  framingImage?: string;
  // Top row = three equal cards, bottom row = two wide cards.
  topCards?: EnvCard[];
  bottomCards?: EnvCard[];
};

export default function ComplexEnvironments({
  content = {},
}: Readonly<{ content?: ComplexEnvironmentsContent }> = {}) {
  const {
    heading = "Built for complex construction environments",
    // Background texture/glow — shared with the home "Industries" band so both
    // sections read the same. Pass a value to overlay the old radial framing.
    backgroundImage = "/home/industries_bg.webp",
    framingImage = "",
    topCards = TOP_CARDS,
    bottomCards = BOTTOM_CARDS,
  } = content;

  return (
    <MotionConfig reducedMotion="user">
      {/* Light page band — the dark card floats on the page background. */}
      <section className="mt-5 w-full bg-[#f5fbff]">
        {/* The section frame itself: fixed-width rounded card (Figma: width
            1281.98px, radius 36px), dark gradient fill, clipped corners. */}
        <div
          className="relative mx-auto w-full max-w-[1282px] overflow-hidden rounded-[36px] border border-white/10 px-6 py-14 sm:px-10 lg:px-[60px] lg:py-16"
          style={{
            // Fallback fill behind the background image (also used when
            // backgroundImage is "").
            background:
              "linear-gradient(180deg,#070a1c 0%,#0c1130 45%,#0a0e26 100%)",
          }}
        >
          {/* Background texture + glow — same asset as the home "Industries"
              band, covering the whole card. */}
          {backgroundImage ? (
            <Image
              src={backgroundImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="pointer-events-none z-0 object-cover object-[center_90%] select-none"
            />
          ) : null}

          {/* Radial-glow framing — only the BOTTOM HALF of rader_image (1840 × 1693),
            attached to the top edge. The image renders at full width (full height =
            width × 1693/1840) and is anchored to the wrapper's bottom; the wrapper
            is clipped to half that height (aspect 1840 × 847), so the top half
            overflows above and is cropped off. A soft fade at the cut blends it
            into the base. */}
          {framingImage ? (
            <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 aspect-1840/847 w-full overflow-hidden">
              <Image
                src={framingImage}
                alt=""
                width={1840}
                height={1693}
                priority
                unoptimized
                className="absolute inset-x-0 bottom-0 h-auto w-full select-none"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,transparent_82%,#0a0e26_100%)]" />
            </div>
          ) : null}

          <div className="relative z-10 w-full">
            {/* Heading */}
            <motion.h2
              variants={wipeDown}
              custom={0.05}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="font-lato text-[24px] font-bold leading-tight text-white lg:text-[30px]"
            >
              {heading}
            </motion.h2>

            {/* Top row — three equal cards (Figma: 356 × 318). Flex + wrap so a
                lone card (e.g. the 3rd at the 2-column breakpoint) centres instead
                of hugging the left. At xl all three fill the row exactly. */}
            <motion.div
              className="mt-10 flex flex-wrap justify-center gap-7.5 lg:mt-12"
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              {topCards.map((card, i) => (
                <EnvironmentCard
                  key={card.title}
                  card={card}
                  index={i}
                  sizeClassName="h-[318px] w-full sm:w-[calc(50%-15px)] xl:w-[calc(33.333%-20px)]"
                />
              ))}
            </motion.div>

            {/* Bottom row — two wide cards (Figma: 551.53 × 318). */}
            <motion.div
              className="mt-7.5 grid grid-cols-1 gap-7.5 xl:grid-cols-2"
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              {bottomCards.map((card, i) => (
                <EnvironmentCard
                  key={card.title}
                  card={card}
                  index={i + topCards.length}
                  sizeClassName="h-[318px] w-full"
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
