"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { CircleArrowButton, Eyebrow, Section, T } from "../ui";

const STAGES = [
  {
    icon: "/landing/icons/icon-atlas-stage.svg",
    step: "1 / Build",
    title: "Atlas",
    desc: "Manage construction delivery and capture relevant workforce, access and vendor records as work happens.",
  },
  {
    icon: "/landing/icons/icon-handover-stage.svg",
    step: "2 / Connect",
    title: "Digital Handover",
    desc: "Carry relevant construction information into Aegis so it can inform the operating team’s work after handover.",
  },
  {
    icon: "/landing/icons/icon-aegis-stage.svg",
    step: "3 / Operate",
    title: "Aegis",
    desc: "Use the project context to support the Defects Liability Period and ongoing facility operations.",
  },
] as const;

export default function Journey() {
  // Carousel on mobile (one stage at a time, arrow controls); a plain
  // three-up row from `lg`.
  // Loops so both arrows always work, matching the Figma frame that shows
  // both on the first card.
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    breakpoints: { "(min-width: 1024px)": { active: false } },
  });

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <Section
      id="journey"
      aria-labelledby="journey-title"
      className="border-t border-[#E7EEF3] bg-[linear-gradient(180deg,#FFFFFF_0%,#F5F8FA_100%)]"
      innerClassName="flex flex-col gap-5 lg:gap-6"
    >
      <div className="flex flex-col gap-[30px] lg:flex-row lg:items-center">
        <div className="flex flex-col gap-[15px] lg:max-w-[720px] lg:flex-1">
          <Eyebrow>How it works</Eyebrow>
          <h2 id="journey-title" className={`${T.h2} text-[#122338]`}>
            One journey, three connected stages.
          </h2>
          <p className={`${T.body} text-[#4E6174]`}>
            Atlas supports the build. Digital Handover brings relevant
            information across. Aegis supports the people operating the
            facility.
          </p>
        </div>
        <Image
          src="/landing/journey-site.webp"
          alt="Miniature construction site beside an active data centre"
          width={1083}
          height={629}
          sizes="(min-width: 1024px) 450px, 100vw"
          className="h-auto w-full lg:w-[450px] lg:shrink-0"
        />
      </div>

      <div className="relative">
        <div className="overflow-hidden lg:overflow-visible" ref={emblaRef}>
          <ol className="-ml-4 flex lg:ml-0 lg:gap-[18px]">
            {STAGES.map((stage) => (
              <li
                key={stage.title}
                className="min-w-0 flex-[0_0_100%] pl-4 lg:flex-1 lg:pl-0"
              >
                <article className="flex h-full flex-col gap-2 rounded-[5px] border-[0.5px] border-[#D4D4D4] bg-white p-[25px] transition-shadow duration-200 hover:border-transparent hover:shadow-[inset_0_0_0_2px_#0A8EC8]">
                  <div className="flex items-center justify-between">
                    <Image
                      src={stage.icon}
                      alt=""
                      width={60}
                      height={60}
                      unoptimized
                      className="size-[60px]"
                    />
                    <span className={`${T.sub2} text-[#0A8EC8]`}>
                      {stage.step}
                    </span>
                  </div>
                  <h3 className={`${T.h5} text-[#122338]`}>{stage.title}</h3>
                  <p className={`${T.points} text-[#4E6174]`}>{stage.desc}</p>
                </article>
              </li>
            ))}
          </ol>
        </div>

        {/* Mobile carousel controls, centred on the card edges (Figma: 34px,
            13–14px outside the 400px column). */}
        <CircleArrowButton
          direction="prev"
          label="Previous stage"
          onClick={prev}
          className="absolute -left-[13px] top-1/2 -translate-y-1/2 lg:hidden"
        />
        <CircleArrowButton
          direction="next"
          label="Next stage"
          onClick={next}
          className="absolute -right-[14px] top-1/2 -translate-y-1/2 lg:hidden"
        />
      </div>
    </Section>
  );
}
