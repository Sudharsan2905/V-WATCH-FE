import Image from "next/image";
import BookADemo from "@/components/common/BookADemo";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0A2A4A]">
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
        {/* Electric-blue glow tint over the render */}
        <div
          className="absolute inset-0 mix-blend-screen"
          style={{
            background:
              "radial-gradient(55% 55% at 60% 40%, rgba(59,130,246,0.45) 0%, rgba(59,130,246,0.12) 40%, transparent 72%)",
          }}
        />
        {/* Cyan highlights drifting in from the edges */}
        <div
          className="absolute inset-0 mix-blend-screen"
          style={{
            background:
              "radial-gradient(38% 48% at 100% 8%, rgba(34,211,238,0.20) 0%, transparent 60%)," +
              "radial-gradient(40% 50% at 96% 92%, rgba(34,211,238,0.18) 0%, transparent 60%)",
          }}
        />
        {/* Navy scrim keeps the left-side copy legible over the render */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2A4A] from-5% via-[#0A2A4A]/55 via-45% to-transparent" />
        {/* Soft vignette to deepen the edges */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 45%, transparent 55%, rgba(5,20,38,0.55) 90%, rgba(5,20,38,0.8) 100%)",
          }}
        />
      </div>

      {/* Left-side copy */}
      <div className="relative z-10 mx-auto w-full max-w-[1410px] px-6 lg:px-[60px]">
        <div className="flex min-h-[600px] max-w-[642px] flex-col justify-center gap-[30px] pt-[150px] pb-[100px] lg:min-h-[753px] lg:py-[140px]">
          <div className="flex flex-col items-start gap-[14px]">
            {/* "In Real Time" pill — glassmorphism with a directional gradient
                border: bright at the top corners, fading down the sides, dim at
                the bottom (light source from above). */}
            <span className="relative inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-[14px] py-[9px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.45),inset_0_-1px_0_0_rgba(255,255,255,0.16),0_4px_16px_rgba(0,0,0,0.35)] backdrop-blur-md">
              {/* gradient border ring — dominant top highlight + corner glow (masked to 1px) */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  padding: "1px",
                  background:
                    "radial-gradient(135% 135% at 50% -35%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.45) 26%, rgba(255,255,255,0.08) 58%, rgba(255,255,255,0) 100%)",
                  WebkitMask:
                    "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />
              {/* secondary faint reflected highlight along the bottom curve (masked to 1px) */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  padding: "1px",
                  background:
                    "radial-gradient(120% 120% at 50% 138%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0) 60%)",
                  WebkitMask:
                    "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />
              <span className="relative h-[11px] w-[11px] rounded-full bg-[#86D58B]" />
              <span className="relative text-[18px] font-bold leading-none text-white">In Real Time</span>
            </span>

            <h1 className="text-[34px] font-black leading-[1.25] tracking-[0.5px] text-white sm:text-[44px] sm:leading-[1.2] lg:text-[50px] lg:leading-[68px]">
              {/* Line 1 reveals left -> right; line 2 reveals top -> bottom, staggered after it. */}
              <span className="block motion-safe:animate-[wipeInLeft_1s_cubic-bezier(0.16,1,0.3,1)_both]">
                Run Your Operations on
              </span>
              <span className="block motion-safe:animate-[wipeInTop_1s_cubic-bezier(0.16,1,0.3,1)_0.5s_both]">
                One Intelligent System
              </span>
            </h1>
          </div>

          {/* Split into its visible lines so each wipes in left -> right, one after
              another, continuing the cascade started by the headline. */}
          <p className="max-w-[615px] text-[18px] font-bold leading-[28px] text-white lg:text-[20px] lg:leading-[32px]">
            <span className="block motion-safe:animate-[wipeInLeft_1s_cubic-bezier(0.16,1,0.3,1)_1.05s_both]">
              V-Watch Ai is an AI-driven platform that automates, secures, and
            </span>
            <span className="block motion-safe:animate-[wipeInTop_0.5s_cubic-bezier(0.16,1,0.3,1)_1.8s_both]">
              connects your entire operation giving you real-time visibility and
            </span>
            <span className="block motion-safe:animate-[wipeInTop_0.5s_cubic-bezier(0.16,1,0.3,1)_2.05s_both]">
              control across people, processes, assets, and movement.
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-5 motion-safe:animate-[heroFadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_2.8s_both]">
            <BookADemo />
            <a
              href="#"
              className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-base font-bold"
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
