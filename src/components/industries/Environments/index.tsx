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
      className={`group flex flex-col gap-4 transition-all duration-700 ${
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
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 424px"
            className={`object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-100 ${selected ? "opacity-100" : "opacity-0"}`}
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
    align: "start",
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
            <div key={card.title} className="min-w-0 flex-[0_0_100%]">
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
    subtitle = "V-Watch AI adapts to different types of construction projects wherever workforce coordination, compliance, and site control are critical.",
    cards = [],
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
        </motion.div>
      </section>
    </MotionConfig>
  );
}
