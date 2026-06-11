import BookADemo from "@/components/common/BookADemo";
import Image from "next/image";

export default function IndustryHero() {
  return (
    <section className="relative min-h-[600px] overflow-hidden bg-[#030515] lg:min-h-[754px]">
      {/* Background: industrial night scene, full-bleed cover (no distortion at
          any width — replaces the old object-fill stretch). */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/industry/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
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

      {/* Curved bottom — white dip carved into the hero so it flows into the
          (white) Challenges section below. Same technique as PlatformVisibility:
          full-width SVG with preserveAspectRatio="none" stretches edge-to-edge so
          there are no corner gaps, and the responsive height keeps the curve
          proportional from mobile (h-12) to desktop (lg:h-[90px]). */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-12 w-full text-white lg:h-[90px]"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d="M0 0 Q720 100 1440 0 L1440 100 L0 100 Z" fill="currentColor" />
      </svg>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1410px] px-6 lg:px-[60px]">
        <div className="flex flex-col items-start justify-center gap-[30px] pt-[150px] pb-[100px] lg:min-h-[754px] lg:py-[140px]">
          {/* Badge + heading */}
          <div className="flex flex-col gap-[14px]">
            <div className="inline-flex w-fit items-center gap-[3.8px] rounded-full bg-white/10 px-[13px] py-[9.5px]">
              <span className="size-[11.4px] shrink-0 rounded-full bg-[#86D58B]" />
              <span className="whitespace-nowrap text-base font-semibold leading-none text-white lg:text-[18px]">
                What V-Watch Ai
              </span>
            </div>
            <h1 className="max-w-[642px] text-[34px] font-semibold leading-[1.2] tracking-[0.5px] text-white sm:text-[44px] lg:text-[50px] lg:leading-[68px] lg:tracking-[1px]">
              Built for Any Environment That Demands Control
            </h1>
          </div>

          {/* Subtitle */}
          <p className="max-w-[561px] text-base font-bold leading-7 text-white lg:text-[20px] lg:leading-8">
            V-Watch Ai is designed for complex, high-activity environments where
            visibility, safety, and operational control are critical from
            construction sites to data centers and beyond.
          </p>

          {/* CTA button */}
          <div className="flex flex-wrap items-center gap-5">
            <BookADemo />
          </div>
        </div>
      </div>
    </section>
  );
}
