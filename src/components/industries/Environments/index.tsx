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

type EnvironmentsContent = {
  heading?: string;
  subtitle?: string;
  cards?: EnvCardData[];
  footerImage?: string;
};

function EnvCard({
  card,
  delay = 0,
}: Readonly<{ card: EnvCardData; delay?: number }>) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      className="group flex flex-col gap-4 rounded-[20px] border border-transparent p-3 transition-all duration-300 hover:border-white/10 hover:bg-white/10 hover:shadow-[0_24px_60px_rgba(0,0,0,0.4)]"
    >
      {/* Image frame — fixed Figma ratio 328×290, 24px radius, 1px white border.
          The border stays constant; only the image crossfades on hover. */}
      <div className="relative aspect-[328/290] w-full overflow-hidden rounded-[24px] border border-white/10">
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
        <p className="text-[16px] font-bold leading-[21px] text-white">{card.title}</p>
        <p className="text-[13px] leading-[19px] text-[#8FA6BE]">{card.desc}</p>
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
    footerImage = "/industries/construction/designed-environment/env-footer.png",
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

          {/* Footer banner — wipebottom */}
          {footerImage && (
            <motion.div variants={wipeUp} custom={CARDS_START + cards.length * CARD_STAGGER}>
              <Image
                src={footerImage}
                alt=""
                width={1168}
                height={180}
                unoptimized
                className="h-auto w-full rounded-[20px]"
              />
            </motion.div>
          )}
        </motion.div>
      </section>
    </MotionConfig>
  );
}
