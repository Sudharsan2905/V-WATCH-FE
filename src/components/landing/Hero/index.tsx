import { Fragment } from "react";
import HeroVideo from "./HeroVideo";
import { ArrowDown, ArrowRightNarrow, ButtonLink, Eyebrow, T } from "../ui";

const STAGES = [
  { title: "Construction", desc: "Capture records" },
  { title: "Handover", desc: "Carry context forward" },
  { title: "Operations", desc: "Put records to work" },
] as const;

export default function Hero() {
  return (
    <section
      className="px-5 lg:px-10"
      // Figma's radial glow, sized relative to the section (handles at
      // 64.5%/42.8%, radii 75.6% × 119%, fading out at 54%) so it scales the
      // same way on the 440px and 1920px frames.
      style={{
        background:
          "radial-gradient(75.6% 119% at 64.5% 42.8%, rgba(182,234,247,0.6) 0%, rgba(198,244,204,0) 54%), #ffffff",
      }}
    >
      {/* Desktop: Figma's hero is a fixed 733px with the content centred in
          the space left by its 110/70px padding. */}
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-10 py-10 lg:min-h-[733px] lg:grid-cols-2 lg:content-center lg:gap-[70px] lg:pb-[70px] lg:pt-[110px]">
        {/* Copy */}
        <div className="flex flex-col gap-5">
          <Eyebrow marker="dot">V-Watch Ai by SS Group International</Eyebrow>
          <h1 className={`flex flex-col gap-2 ${T.h1}`}>
            <span className="text-[#000B47]">One operational data journey.</span>
            <span className="text-[#0A8EC8]">
              From construction to live operations.
            </span>
          </h1>
          <p className={`${T.bodyBig} text-[#19213D]`}>
            Keep relevant construction records available at handover, through
            the Defects Liability Period (DLP) and into live operations.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <ButtonLink href="#book-demo">Book a Demonstration</ButtonLink>
            <a
              href="#journey"
              className="group inline-flex items-center gap-2 text-[14px] font-[650] text-[#0A8EC8] transition-colors hover:text-[#0A6E9C]"
            >
              Explore the journey
              <ArrowDown />
            </a>
          </div>
        </div>

        {/* Lifecycle figure */}
        <figure className="overflow-hidden rounded-[5px] border-[0.5px] border-[#D4D4D4] shadow-[0_26px_64px_rgba(2,8,14,0.10)]">
          <div className="flex items-center justify-between border-b-[0.5px] border-[#D4D4D4] bg-white px-[18px] py-4">
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase leading-[1.2] tracking-[1.05px] text-[#A6C936]">
              <span aria-hidden className="size-1.5 rounded-full bg-[#A6C936]" />
              Data centre lifecycle
            </span>
            <span className="text-[10px] font-bold uppercase leading-[1.2] tracking-[1.05px] text-[#0A8EC8]">
              Build to operate
            </span>
          </div>
          <div
            // Figma: 16:9 (400×225) on mobile, 565×333 on desktop.
            className="relative aspect-video w-full lg:aspect-565/333"
            style={{
              background:
                "radial-gradient(72.1% 73.5% at 51% 48%, #1a4051 0%, #12283a 61%, #0d2031 100%)",
            }}
          >
            <HeroVideo />
          </div>
          <figcaption className="flex items-center border-t-[0.5px] border-[#D4D4D4] bg-white">
            {STAGES.map((stage, i) => (
              <Fragment key={stage.title}>
                {i > 0 && <ArrowRightNarrow />}
                {/* nowrap: Figma lets "Carry context forward" overflow its
                    narrow mobile cell rather than wrap. */}
                <div className="flex min-w-0 flex-1 basis-0 flex-col items-center gap-0.5 whitespace-nowrap px-3 py-3.5 text-center">
                  <span className="text-[12px] font-[750] leading-[1.3] text-[#0A8EC8]">
                    {stage.title}
                  </span>
                  <span className="text-[10px] leading-[1.3] text-[#4E6174]">
                    {stage.desc}
                  </span>
                </div>
              </Fragment>
            ))}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
