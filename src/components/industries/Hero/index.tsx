import BookADemo from "@/components/common/BookADemo";
import Image from "next/image";

/**
 * Shared hero for the per-industry pages (Construction, Industrial & Energy,
 * Commercial & Facilities). Same design as the Industry Hub hero, but all copy
 * comes from props so each industry route can supply its own content.
 */
type HeroContent = {
  badge?: string;
  heading?: string;
  subtitle?: string;
  bgImage?: string;
};

export default function IndustriesHero({
  hero = {},
}: Readonly<{ hero?: HeroContent }> = {}) {
  // Spread the content object, falling back to the Industry Hub defaults.
  const {
    badge = "What V-Watch Ai",
    heading = "Built for Any Environment That Demands Control",
    subtitle = "V-Watch Ai is designed for complex, high-activity environments where visibility, safety, and operational control are critical from construction sites to data centers and beyond.",
    bgImage = "/industry/hero-bg.png",
  } = hero;

  return (
    <section className="relative">
      {/* 1280×828 industrial night scene. Extends 74px past the 754px hero frame
          so the curved bottom overlaps the next section. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[828px]">
        <Image
          src={bgImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-fill"
        />
        {/* White wave curve — gives the flat scene the same curved transition as
            the shared hero, blending into the (white) section below. */}
        <svg
          className="absolute inset-x-0 bottom-0 h-[110px] w-full"
          viewBox="0 0 1440 110"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden
        >
          <path
            d="M0 110 L0 40 C 400 108 1040 108 1440 40 L1440 110 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>

      {/* Glow circles — desktop only, clipped to hero bounds.
          Positions derived from Figma container+inset values converted to direct px coords. */}
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
        {/* Right circle: 608×608 box@(714,48) inset -32.89% → 1008×1008 at (514,-152) */}
        <div
          className="absolute mix-blend-overlay"
          style={{
            left: "514px",
            top: "-152px",
            width: "1008px",
            height: "1008px",
          }}
        >
          <Image
            src="/industry/hero-circle-right.svg"
            alt=""
            fill
            unoptimized
          />
        </div>

        {/* Left circle: 729×729 box@(-27,28) inset -24.42% → 1085×1085 at (-205,-150) */}
        <div
          className="absolute mix-blend-overlay"
          style={{
            left: "-205px",
            top: "-150px",
            width: "1085px",
            height: "1085px",
          }}
        >
          <Image src="/industry/hero-circle-left.svg" alt="" fill unoptimized />
        </div>

        {/* Center circle: 275×275 box@(265,305) inset -78.18% → 705×705 at (50,90) */}
        <div
          className="absolute"
          style={{ left: "50px", top: "90px", width: "705px", height: "705px" }}
        >
          <Image
            src="/industry/hero-circle-center.svg"
            alt=""
            fill
            unoptimized
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[560px] flex-col items-start justify-center gap-6 px-6 py-24 sm:px-10 sm:py-28 lg:min-h-[754px] lg:gap-[30px] lg:px-[60px] lg:py-[140px]">
        {/* Badge + heading */}
        <div className="flex flex-col gap-[14px]">
          <div className="inline-flex w-fit items-center gap-[3.8px] rounded-full bg-white/10 px-[13px] py-[9.5px]">
            <span className="size-[11.4px] shrink-0 rounded-full bg-[#86D58B]" />
            <span className="whitespace-nowrap text-[16px] font-semibold leading-none text-white sm:text-[18px]">
              {badge}
            </span>
          </div>
          <h1 className="w-[642px] max-w-full text-[32px] font-black leading-[40px] tracking-[1px] text-white sm:text-[40px] sm:leading-[52px] lg:text-[50px] lg:leading-[68px]">
            {heading}
          </h1>
        </div>

        {/* Subtitle */}
        <p className="w-[561px] max-w-full text-[16px] font-bold leading-7 text-white sm:text-[18px] lg:text-[20px] lg:leading-8">
          {subtitle}
        </p>

        {/* CTA button */}
        <div className="flex flex-wrap items-center gap-5">
          <BookADemo />
        </div>
      </div>
    </section>
  );
}
