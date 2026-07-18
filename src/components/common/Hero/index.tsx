import Image from "next/image";
import BookADemo from "@/components/common/BookADemo";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0A2A4A]  px-6 lg:px-[60px]">
      {/* Baked glass-tile render (labels + icons composited in Figma) */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/hero/hero-visual.webp"
          alt="V-Watch AI platform modules: HRMS (Human Resource Management System), Secure Access, SMS, RTL, Workflow Management and AI Location Tracking"
          fill
          sizes="100vw"
          className="object-cover object-top"
          // priority is next/image's preload: it emits <link rel="preload">,
          // sets fetchpriority="high" and forces eager loading. (There is no
          // `preload` prop — it was being passed straight through to the DOM.)
          priority
          loading="eager"
        />
      </div>

      {/* Left-side copy */}
      <div className="relative z-10 mx-auto w-full max-w-[1410px]">
        <div className="flex min-h-[600px] max-w-[642px] flex-col justify-center gap-[30px] pt-[150px] pb-[100px] lg:min-h-[753px] lg:py-[140px]">
          <div className="flex flex-col items-start gap-[14px]">
            {/* "In Real Time" pill — glassmorphism with a directional gradient
                border: bright at the top corners, fading down the sides, dim at
                the bottom (light source from above). */}

            <h1 className="text-[clamp(22px,7.2vw,34px)] font-black leading-[1.25] tracking-[0.5px] text-white sm:text-[44px] sm:leading-[1.2] lg:text-[50px] lg:leading-[68px]">
              {/* Line 1 reveals left -> right; line 2 reveals top -> bottom, staggered after it.
                  Below sm, the font-size fluidly scales down with viewport width (clamp) instead
                  of a fixed 34px — at a fixed size, each of these two hardcoded lines no longer
                  fits on one line on phones narrower than ~430px (e.g. iPhone 12 Pro at 390px),
                  so they'd each wrap a second time into an orphaned single word. */}
              <span className="block motion-safe:animate-[wipeInLeft_1s_cubic-bezier(0.16,1,0.3,1)_both]">
                Run Your Operations on
              </span>
              <span className="block motion-safe:animate-[wipeInTop_1s_cubic-bezier(0.16,1,0.3,1)_0.5s_both]">
                One Intelligent System
              </span>
            </h1>
          </div>

          {/* lg+: split into its visible lines so each wipes in left -> right,
              one after another, continuing the cascade started by the
              headline. These 3 breaks were authored to each fit one line at
              this width — below lg the same fragments no longer fit on one
              line each and wrap a second time into short, ragged lines, so
              a plain reflowing paragraph is used there instead (below). */}
          <p className="hidden max-w-[615px] text-[20px] font-bold leading-[32px] text-white lg:block">
            <span className="block motion-safe:animate-[wipeInLeft_1s_cubic-bezier(0.16,1,0.3,1)_1.05s_both]">
              V-Watch AI is an AI-driven platform that automates, secures, and
            </span>
            <span className="block motion-safe:animate-[wipeInTop_0.5s_cubic-bezier(0.16,1,0.3,1)_1.8s_both]">
              connects your entire operation giving you real-time visibility and
            </span>
            <span className="block motion-safe:animate-[wipeInTop_0.5s_cubic-bezier(0.16,1,0.3,1)_2.05s_both]">
              control across people, processes, assets, and movement.
            </span>
          </p>

          {/* Below lg: same copy, no manual line breaks — wraps naturally at
              any mobile/tablet width instead of double-wrapping. */}
          <p className="max-w-[615px] text-base font-bold leading-7 text-white motion-safe:animate-[heroFadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_1.05s_both] lg:hidden">
            V-Watch AI is an AI-driven platform that automates, secures, and
            connects your entire operation giving you real-time visibility and
            control across people, processes, assets, and movement.
          </p>

          <div className="flex flex-wrap items-center gap-5 motion-safe:animate-[heroFadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_2.8s_both]">
            <BookADemo />
            <a
              href="#how-it-works"
              className="group inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-base font-bold transition-colors duration-200 ease-out hover:bg-white/20"
            >
              <span className="bg-gradient-to-b from-[#21B1F1] to-[#A6C936] bg-clip-text text-transparent transition-colors group-hover:from-white group-hover:to-white">
                See How It Works
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
