"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, MotionConfig, type Variants } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const wipeDown: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  show: (delay = 0) => ({
    clipPath: "inset(0 0 0% 0)",
    transition: { delay, duration: 0.65, ease: EASE },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay },
  }),
};

const wipeUp: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  show: (delay = 0) => ({
    clipPath: "inset(0% 0 0 0)",
    transition: { delay, duration: 0.75, ease: EASE },
  }),
};

const CARDS_START  = 0.5;
const CARD_STAGGER = 0.12;

type EnvCardData = {
  image: string;
  /** Shown at rest; on hover it crossfades to `image`. Falls back to `image`. */
  originalImage?: string;
  title: string;
  desc: string;
  active?: boolean;
};

type EnvFooterPanel = { 
  image: string; 
  label: string; 
  /** Page-specific responsive left offset values (e.g. { default: "0px", md: "24px", lg: "96px" }) */
  leftOffsets?: {
    default?: string;
    md?: string;
    lg?: string;
  };
};

type EnvironmentsContent = {
  heading?: string;
  subtitle?: string;
  cards?: EnvCardData[];
  footerPanels?: EnvFooterPanel[];
  footerKeywords?: string[];
  /**
   * Controls where the label is placed relative to each footer panel image.
   * "top-right"  → label pinned to the absolute top-right corner of the image
   *                  container (no overlap). Used on the industrial-energy page.
   * "default"    → original layout (absolute left-positioned overlay).
   */
  footerLabelPosition?: "top-right" | "default";
};

function EnvCard({
  card,
  delay = 0,
  selected = false,
  onSelect,
}: Readonly<{ card: EnvCardData; delay?: number; selected?: boolean; onSelect?: () => void }>) {

  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      onClick={onSelect}
      className={`group flex flex-col gap-4 transition-all duration-300 ${
        selected
          ? "rounded-[30px] px-[10px] pt-[10px] pb-[20px]"
          : "rounded-[20px] border border-transparent p-3 hover:border-white/10 hover:bg-gradient-to-br hover:from-[#21B1F1] hover:via-[#5CB7E8] hover:to-[#EFF9FF] hover:shadow-[0_24px_60px_rgba(0,0,0,0.4)]"
      }`}
      style={
        selected
          ? { background: "linear-gradient(135deg, #21B1F1 0%, #5CB7E8 55%, #EFF9FF 100%)" }
          : {}
      }
    >
      {/* Image frame — fixed Figma ratio 328×290, 24px radius */}
      <div className={`relative aspect-[328/290] w-full overflow-hidden rounded-[24px] border ${selected ? "border-white/40" : "border-white/10"}`}>
        {/* Resting image */}
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 424px"
          className="object-cover"
        />
        {/* Hover/tap image — crossfades in on hover (desktop) or tap (mobile) */}
        {card.originalImage && (
          <Image
            src={card.originalImage}
            alt=""
            aria-hidden
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 424px"
            className={`object-cover transition-opacity duration-300 ease-out group-hover:opacity-100 ${selected ? "opacity-100" : "opacity-0"}`}
          />
        )}
      </div>
      <div className="flex flex-col gap-2 px-1 pb-1">
        <p className={`text-[18px] font-bold leading-[21px] ${selected ? "text-[#0A2540]" : "text-white group-hover:text-[#0A2540]"}`}>
          {card.title}
        </p>
        <p className={`text-[14px] font-normal leading-[22px] ${selected ? "text-[#0A4B6E]" : "text-white group-hover:text-[#0A2540]"} sm:text-[16px] sm:leading-[24px] lg:text-[18px]`}>
          {card.desc}
        </p>
      </div>
    </motion.div>
  );
}

// Mobile-only (< sm): an Embla carousel — one card per view with a peek of the
// next, swipeable right-to-left. Dots below page through. Tablet/desktop keep
// the grid layout untouched.
function MobileCarousel({
  cards,
  selectedCard,
  onSelect,
}: Readonly<{ cards: EnvCardData[]; selectedCard: number | null; onSelect: (i: number) => void }>) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
  });
  const [scrollIndex, setScrollIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onScroll = () => setScrollIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onScroll).on("reInit", onScroll);
    return () => {
      emblaApi.off("select", onScroll).off("reInit", onScroll);
    };
  }, [emblaApi]);

  return (
    <div className="sm:hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {cards.map((card, i) => (
            <div key={card.title} className="min-w-0 flex-[0_0_88%] pr-4">
              <EnvCard
                card={card}
                delay={CARDS_START + i * CARD_STAGGER}
                selected={selectedCard === i}
                onSelect={() => onSelect(i)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      {cards.length > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {cards.map((card, i) => (
            <button
              key={card.title}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`rounded-full transition-all duration-200 ${
                i === scrollIndex ? "h-[8px] w-[24px] bg-white" : "size-[8px] bg-white/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Environments({
  environments = {},
}: Readonly<{ environments?: EnvironmentsContent }> = {}) {
  const {
    heading = "Designed for any environment.",
    subtitle = "V-Watch Ai adapts to different types of construction projects wherever workforce coordination, compliance, and site control are critical.",
    cards = [],
    footerPanels = [
      { image: "/industries/industrial&energy/confined-industry.png", label: "Confined Industrial" },
      { image: "/industries/industrial&energy/large-scale-operations.png", label: "Large Scale Operations" },
    ],
    footerKeywords = ["Real-time visibility", "Safety", "Control"] as [string, string, string],
    footerLabelPosition = "default",
  } = environments;

  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleSelect = (i: number) => setSelectedCard(selectedCard === i ? null : i);

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative z-10 -mt-8 overflow-hidden rounded-[38px] bg-[#040b14] px-6 py-16 lg:-mt-12 lg:rounded-[50px] lg:px-[60px]">
        <Image
          src="/industries/construction/designed-environment/env-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none select-none object-cover object-top"
        />

        <motion.div
          className="relative mx-auto flex w-full max-w-[1320px] flex-col gap-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Header — wipeTop */}
          <header className="flex flex-col gap-2.5">
            <motion.h2
              variants={wipeDown}
              custom={0.05}
              className="text-[28px] font-extrabold leading-[34px] text-white"
            >
              {heading}
            </motion.h2>
            <motion.p
              variants={wipeDown}
              custom={0.2}
              className="max-w-[640px] font-['Lato'] text-[20px] font-medium leading-[28px] tracking-normal text-[#FAECFF]"
            >
              {subtitle}
            </motion.p>
          </header>

          {/* Mobile (< sm): swipeable carousel */}
          <MobileCarousel cards={cards} selectedCard={selectedCard} onSelect={handleSelect} />

          {/* Tablet & up: grid — one by one */}
          <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, i) => (
              <EnvCard
                key={card.title}
                card={card}
                delay={CARDS_START + i * CARD_STAGGER}
                selected={selectedCard === i}
                onSelect={() => handleSelect(i)}
              />
            ))}
          </div>

          {/* Footer banner */}
          <motion.div
            variants={wipeUp}
            custom={CARDS_START + cards.length * CARD_STAGGER}
            className="relative overflow-hidden rounded-[20px]"
            style={{
              background: "linear-gradient(180deg, #FFFFFF 0%, #EFF9FF 100%)",
              border: "1px solid #FFFFFF",
              boxShadow: "-4px -4px 10px 0px rgba(255,255,255,0.24), 0px 14px 14px 0px rgba(193,236,255,0.10), 0px 4px 24px 0px rgba(10,75,110,0.10)",
            }}
          >
            {/* Spiral SVG — left-anchored, fades out before text */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-[68%]"
              style={{
                maskImage: "linear-gradient(to right, black 50%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, black 50%, transparent 100%)",
              }}
            >
              <Image
                src="/spiral.svg"
                alt=""
                aria-hidden
                fill
                unoptimized
                className="select-none object-cover object-left"
              />
            </div>

            {/* Figma Ellipse 3550 — #0A8EC8 with massive layer blur, creates the soft blue glow arc */}
            <div
              className="pointer-events-none absolute"
              style={{
                width: "800px",
                height: "800px",
                left: "-300px",
                bottom: "-520px",
                background: "#0A8EC8",
                borderRadius: "50%",
                filter: "blur(180px)",
                opacity: 0.25,
              }}
            />

            <div className="relative flex flex-col gap-3 px-5 md:flex-row md:items-stretch md:gap-4 md:px-0 lg:gap-6">

              {/* Images + arrow */}
              <div className="flex shrink-0 items-end justify-center gap-3 md:gap-4 lg:gap-6">

                {/* Panel 0 */}
                {footerLabelPosition === "top-right" ? (
                  /*
                   * TOP-RIGHT mode (industrial-energy page only):
                   * Flex-col stretches full height of the banner row.
                   * Label sits in normal flow at the top, right-aligned (self-end).
                   * Image is pushed to the bottom with mt-auto.
                   * No overlap — matches Figma exactly.
                   */
                  <div className="panel-0-container relative flex flex-col">
                    <span 
                      className="absolute top-1 z-10 whitespace-nowrap text-[10px] font-bold leading-none text-[#0F172B] sm:text-[11px] md:text-[12px] lg:text-[14px]"
                      style={{
                        // Apply responsive CSS properties for left positioning
                        left: `var(--panel-0-left-default, ${footerPanels[0].leftOffsets?.default ?? "0px"})`
                      }}
                    >
                      {/* CSS Variables injected to support tailwind breakpoint styling natively */}
                      <style jsx={false}>{`
                        @media (min-width: 768px) {
                          :global(.panel-0-container span) {
                            left: ${footerPanels[0].leftOffsets?.md ?? "10px"} !important;
                          }
                        }
                        @media (min-width: 1024px) {
                          :global(.panel-0-container span) {
                            left: ${footerPanels[0].leftOffsets?.lg ?? "40px"} !important;
                          }
                        }
                      `}</style>
                      {footerPanels[0].label}
                    </span>
                    <Image
                      src={footerPanels[0].image}
                      alt={footerPanels[0].label}
                      width={160}
                      height={130}
                      unoptimized
                      className="mt-[20px] h-[100px] w-auto object-contain object-bottom sm:h-[110px] md:h-[120px] lg:h-[145px]"
                    />
                  </div>
                ) : (
                  /* DEFAULT mode — original layout, other pages unaffected */
                  <div className="relative flex items-end self-stretch">
                    <span className="absolute top-1 md:left-25 lg:left-38 z-10 whitespace-nowrap text-[10px] font-bold leading-none text-[#0F172B] md:text-[10px] lg:text-[14px]">
                      {footerPanels[0].label}
                    </span>
                    <Image
                      src={footerPanels[0].image}
                      alt={footerPanels[0].label}
                      width={160}
                      height={130}
                      unoptimized
                      className="h-[135px] w-auto object-contain object-bottom min-[50px]:h-[110px] md:h-[130px] lg:h-[160px]"
                    />
                  </div>
                )}

                <Image
                  src="/industries/industrial&energy/right-arrow.svg"
                  alt=""
                  aria-hidden
                  width={40}
                  height={18}
                  className="h-4 w-auto shrink-0 mb-[21px] min-[321px]:mb-[50px] md:h-5 lg:h-6"
                />

                {/* Panel 1 */}
                {footerLabelPosition === "top-right" ? (
                  <div className="panel-1-container relative flex flex-col">
                    <span 
                      className="absolute top-1 z-10 whitespace-nowrap text-[10px] font-bold leading-none text-[#0F172B] sm:text-[11px] md:text-[12px] lg:text-[14px]"
                      style={{
                        left: footerPanels[1].leftOffsets?.default ?? "0px"
                      }}
                    >
                      <style jsx={false}>{`
                        @media (min-width: 768px) {
                          :global(.panel-1-container span) {
                            left: ${footerPanels[1].leftOffsets?.md ?? "10px"} !important;
                          }
                        }
                        @media (min-width: 1024px) {
                          :global(.panel-1-container span) {
                            left: ${footerPanels[1].leftOffsets?.lg ?? "45px"} !important;
                          }
                        }
                      `}</style>
                      {footerPanels[1].label}
                    </span>
                    <Image
                      src={footerPanels[1].image}
                      alt={footerPanels[1].label}
                      width={200}
                      height={150}
                      unoptimized
                      className="mt-[20px] h-[100px] w-auto object-contain object-bottom sm:h-[110px] md:h-[120px] lg:h-[145px]"
                    />
                  </div>
                ) : (
                  <div className="relative flex items-end self-stretch">
                    <span className="absolute top-1 -left-4 md:left-25 lg:left-38 z-10 whitespace-nowrap text-[10px] font-bold leading-none text-[#0F172B] md:text-[10px] lg:text-[14px]">
                      {footerPanels[1].label}
                    </span>
                    <Image
                      src={footerPanels[1].image}
                      alt={footerPanels[1].label}
                      width={200}
                      height={150}
                      unoptimized
                      className="h-[135px] w-auto object-contain object-bottom min-[50px]:h-[110px] md:h-[130px] lg:h-[160px]"
                    />
                  </div>
                )}

              </div>

              {/* Text + Logo */}
              <div className="flex min-w-0 flex-1 items-center justify-center gap-4 md:justify-end lg:gap-6">
                <div className="flex flex-col gap-0.5 text-center md:text-left">
                  <p className="text-[14px] font-bold leading-snug text-[#0B1F3A] md:text-[17px] lg:text-[20px]">
                    The need remains the same
                  </p>
                  <p className="text-[14px] leading-[18px] md:text-[17px] lg:text-[20px]">
                    <span className="font-semibold text-[#21B1F1]">{footerKeywords[0]}</span>
                    <span className="text-[#1A2B3C]">, </span>
                    <span className="font-semibold text-[#88A724]">{footerKeywords[1]}</span>
                    <span className="text-[#1A2B3C]">, and </span>
                    <span className="font-semibold text-[#9E21CB]">{footerKeywords[2]}</span>
                    <span className="text-[#1A2B3C]">.</span>
                  </p>
                </div>

                {/* V-Watch circle — with #3890C0 layer blur glow behind */}
                <div className="relative shrink-0">
                  <div
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{
                      background: "#3890C0",
                      filter: "blur(49px)",
                      transform: "translateY(90px) translateX(50px)",
                    }}
                  />
                  <Image
                    src="/industries/industrial&energy/vwatch-circle.png"
                    alt="V-Watch"
                    width={100}
                    height={100}
                    unoptimized
                    className="relative h-auto w-auto"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
