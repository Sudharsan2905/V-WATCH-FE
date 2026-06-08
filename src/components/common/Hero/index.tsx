import Image from "next/image";
import BookADemo from "@/components/common/BookADemo";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#030515]">
      {/* Baked glass-tile render (labels + icons composited in Figma) */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/hero/hero-visual.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        {/* Light scrim keeps the left-side copy legible over the render */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030515] from-5% via-[#030515]/55 via-45% to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#030515] to-transparent" />
      </div>

      {/* Left-side copy */}
      <div className="relative z-10 mx-auto w-full max-w-[1410px] px-6 lg:px-[60px]">
        <div className="flex min-h-[640px] max-w-[642px] flex-col justify-center gap-[30px] pt-[160px] pb-[120px] lg:min-h-[760px]">
          <div className="flex flex-col items-start gap-[14px]">
            {/* "In Real Time" pill — dark-navy with a subtle light edge */}
            <span className="inline-flex items-center gap-[6px] rounded-full bg-[linear-gradient(180deg,#1E1E3D_0%,#222349_100%)] px-[13px] py-[9px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]">
              <span className="h-[11px] w-[11px] rounded-full bg-[#86D58B]" />
              <span className="text-[18px] font-bold leading-none text-white">In Real Time</span>
            </span>

            <h1 className="text-[34px] font-black leading-[1.15] tracking-[0.5px] text-white sm:text-[44px] lg:text-[50px] lg:leading-[68px]">
              Run Your Operations on One Intelligent System
            </h1>
          </div>

          <p className="max-w-[615px] text-[18px] font-bold leading-[28px] text-white lg:text-[20px] lg:leading-[32px]">
            V-Watch Ai is an AI-driven platform that automates, secures, and connects your entire operation giving you
            real-time visibility and control across people, processes, assets, and movement.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <BookADemo />
            <a
              href="#"
              className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-base font-bold shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]"
            >
              <span className="bg-gradient-to-b from-[#21B1F1] to-[#A6C936] bg-clip-text text-transparent">
                See How It Works
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
