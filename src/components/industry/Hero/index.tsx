import Image from "next/image";
import Link from "next/link";

export default function IndustryHero() {
  return (
    <section className="relative">
      {/* Wave-masked 1280×828 industrial night scene. Extends 74px past the 754px
          hero frame so the curved bottom wave overlaps the next section. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[828px]">
        <Image
          src="/industry/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-fill"
        />
      </div>

      {/* Glow circles — desktop only, clipped to hero bounds.
          Positions derived from Figma container+inset values converted to direct px coords. */}
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
        {/* Right circle: 608×608 box@(714,48) inset -32.89% → 1008×1008 at (514,-152) */}
        <div
          className="absolute mix-blend-overlay"
          style={{ left: "514px", top: "-152px", width: "1008px", height: "1008px" }}
        >
          <Image src="/industry/hero-circle-right.svg" alt="" fill unoptimized />
        </div>

        {/* Left circle: 729×729 box@(-27,28) inset -24.42% → 1085×1085 at (-205,-150) */}
        <div
          className="absolute mix-blend-overlay"
          style={{ left: "-205px", top: "-150px", width: "1085px", height: "1085px" }}
        >
          <Image src="/industry/hero-circle-left.svg" alt="" fill unoptimized />
        </div>

        {/* Center circle: 275×275 box@(265,305) inset -78.18% → 705×705 at (50,90) */}
        <div
          className="absolute"
          style={{ left: "50px", top: "90px", width: "705px", height: "705px" }}
        >
          <Image src="/industry/hero-circle-center.svg" alt="" fill unoptimized />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[754px] flex-col items-start justify-center gap-[30px] px-[60px] py-[140px]">
        {/* Badge + heading */}
        <div className="flex flex-col gap-[14px]">
          <div className="inline-flex w-fit items-center gap-[3.8px] rounded-full bg-white/10 px-[13px] py-[9.5px]">
            <span className="size-[11.4px] shrink-0 rounded-full bg-[#86D58B]" />
            <span className="whitespace-nowrap text-[18px] font-semibold leading-none text-white">
              What V-Watch Ai
            </span>
          </div>
          <h1 className="w-[642px] max-w-full text-[50px] font-black leading-[68px] tracking-[1px] text-white">
            Built for Any Environment That Demands Control
          </h1>
        </div>

        {/* Subtitle */}
        <p className="w-[561px] max-w-full text-[20px] font-bold leading-8 text-white">
          V-Watch Ai is designed for complex, high-activity environments where visibility,
          safety, and operational control are critical from construction sites to data
          centers and beyond.
        </p>

        {/* CTA button */}
        <Link
          href="#"
          className="inline-flex h-11 items-center gap-[10px] overflow-hidden rounded-full border border-white px-4 shadow-[2px_5px_14px_rgba(79,148,104,0.6),0px_6px_42px_rgba(38,124,153,0.4)]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%), linear-gradient(180deg, rgb(33,177,241) 20.69%, rgb(166,201,54) 151.72%)",
          }}
        >
          {/* White icon badge — second arrow clips at overflow-clip boundary */}
          <span className="relative flex h-[25px] w-[25px] shrink-0 overflow-clip rounded-[12.5px] bg-white">
            <Image
              src="/industry/hero-icon.svg"
              alt=""
              width={10}
              height={11}
              unoptimized
              className="absolute"
              style={{ left: "7.5px", top: "7.16px" }}
            />
            <Image
              src="/industry/hero-icon.svg"
              alt=""
              width={10}
              height={11}
              unoptimized
              className="absolute"
              style={{ left: "-7.5px", top: "23.19px" }}
            />
          </span>
          <span className="whitespace-nowrap text-[16px] font-semibold text-white">
            Book a Demo
          </span>
        </Link>
      </div>
    </section>
  );
}
