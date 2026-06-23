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

type EnvFooterPanel = { image: string; label: string };

type EnvironmentsContent = {
  heading?: string;
  subtitle?: string;
  cards?: EnvCardData[];
  footerPanels?: EnvFooterPanel[];
  footerKeywords?: string[];
};

function EnvCard({
  card,
  delay = 0,
}: Readonly<{ card: EnvCardData; delay?: number }>) {
  const isActive = card.active;

  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      className={`group flex flex-col gap-4 transition-all duration-300 ${
        isActive
          ? "rounded-[30px] px-[10px] pt-[10px] pb-[20px]"
          : "rounded-[20px] border border-transparent p-3 hover:border-white/10 hover:bg-gradient-to-br hover:from-[#21B1F1] hover:via-[#5CB7E8] hover:to-[#EFF9FF] hover:shadow-[0_24px_60px_rgba(0,0,0,0.4)]"
      }`}
      style={
        isActive
          ? { background: "linear-gradient(135deg, #21B1F1 0%, #5CB7E8 55%, #EFF9FF 100%)" }
          : {}
      }
    >
      {/* Image frame — fixed Figma ratio 328×290, 24px radius */}
      <div className={`relative aspect-[328/290] w-full overflow-hidden rounded-[24px] border ${isActive ? "border-white/40" : "border-white/10"}`}>
        {/* Resting image */}
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 424px"
          className="object-cover"
        />
        {/* Hover image — crossfades in on top when the card is hovered */}
        {card.originalImage && (
          <Image
            src={card.originalImage}
            alt=""
            aria-hidden
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 424px"
            className="object-cover opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
          />
        )}
      </div>
      <div className="flex flex-col gap-2 px-1 pb-1">
        <p className={`text-[18px] font-bold leading-[21px] ${isActive ? "text-[#0A2540]" : "text-white group-hover:text-[#0A2540]"}`}>
          {card.title}
        </p>
        <p className={`text-[14px] font-normal leading-[22px] ${isActive ? "text-[#0A4B6E]" : "text-white group-hover:text-[#0A2540]"} sm:text-[16px] sm:leading-[24px] lg:text-[18px]`}>
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
}: Readonly<{ cards: EnvCardData[] }>) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
  });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="sm:hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {cards.map((card, i) => (
            <div key={card.title} className="min-w-0 flex-[0_0_88%] pr-4">
              <EnvCard card={card} delay={CARDS_START + i * CARD_STAGGER} />
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
                i === selected ? "h-[8px] w-[24px] bg-white" : "size-[8px] bg-white/30"
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
  } = environments;

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
              className="max-w-[640px] text-[16px] leading-[24px] text-[#9DB2C9]"
            >
              {subtitle}
            </motion.p>
          </header>

          {/* Mobile (< sm): swipeable carousel */}
          <MobileCarousel cards={cards} />

          {/* Tablet & up: grid — one by one */}
          <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, i) => (
              <EnvCard
                key={card.title}
                card={card}
                delay={CARDS_START + i * CARD_STAGGER}
              />
            ))}
          </div>

          {/* Footer banner */}
          <motion.div
            variants={wipeUp}
            custom={CARDS_START + cards.length * CARD_STAGGER}
            className="overflow-hidden rounded-[20px]"
            style={{
              background:
                "linear-gradient(120deg,#cce6f6 0%,#dff0fb 35%,#eef7fd 70%,#f5fbff 100%)",
            }}
          >
            <div className="flex flex-col gap-3 px-5 py-1 sm:flex-row sm:items-center sm:gap-4 sm:px-7 lg:gap-6">

              {/* Images + arrow — centered on all breakpoints */}
              <div className="flex shrink-0 items-end justify-center gap-2 sm:gap-3 lg:gap-5">
                <div className="flex flex-col items-start gap-1.5">
                  <span className="px-2 py-0.5 text-[10px] font-bold leading-none text-[#0F172B] sm:text-[11px] lg:px-3 lg:py-1 lg:text-[14px]">
                    {footerPanels[0].label}
                  </span>
                  <Image
                    src={footerPanels[0].image}
                    alt={footerPanels[0].label}
                    width={110}
                    height={80}
                    unoptimized
                    className="h-auto w-auto object-contain"
                  />
                </div>

                <Image
                  src="/industries/industrial&energy/right-arrow.svg"
                  alt=""
                  aria-hidden
                  width={36}
                  height={16}
                  className="mb-3 h-3.5 w-auto shrink-0 sm:mb-4 sm:h-4 lg:mb-5 lg:h-5"
                />

                <div className="flex flex-col items-start gap-1.5">
                  <span className="px-2 py-0.5 text-[10px] font-bold leading-none text-[#0F172B] sm:text-[11px] lg:px-3 lg:py-1 lg:text-[14px]">
                    {footerPanels[1].label}
                  </span>
                  <Image
                    src={footerPanels[1].image}
                    alt={footerPanels[1].label}
                    width={140}
                    height={100}
                    unoptimized
                    className="h-auto w-auto object-contain"
                  />
                </div>
              </div>

              {/* Text + Logo — grouped tight on the right side */}
              <div className="flex min-w-0 flex-1 items-center justify-center gap-4 sm:justify-end lg:gap-6">
                <div className="flex flex-col gap-0.5 text-center sm:text-left">
                  <p className="text-[14px] font-bold leading-snug text-[#0B1F3A] sm:text-[17px] lg:text-[20px]">
                    The need remains the same
                  </p>
                  <p className="text-[14px] leading-[18px] sm:text-[17px] lg:text-[20px]">
                    <span className="font-semibold text-[#21B1F1]">{footerKeywords[0]}</span>
                    <span className="text-[#1A2B3C]">, </span>
                    <span className="font-semibold text-[#88A724]">{footerKeywords[1]}</span>
                    <span className="text-[#1A2B3C]">, and </span>
                    <span className="font-semibold text-[#9E21CB]">{footerKeywords[2]}</span>
                    <span className="text-[#1A2B3C]">.</span>
                  </p>
                </div>

                <Image
                  src="/industries/industrial&energy/vwatch-circle.png"
                  alt="V-Watch"
                  width={72}
                  height={72}
                  unoptimized
                  className="h-auto w-auto shrink-0 self-center"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
