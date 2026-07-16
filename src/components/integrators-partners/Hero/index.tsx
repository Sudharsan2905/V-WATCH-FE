import Image from "next/image";

// Bottom bezier divider. The curve enters both edges at y=84; the control-point
// depth sets how deep the belly dips. Default (>=425px) keeps the current deep
// curve; below 425px a shallower control depth flattens it to a small angle so
// it doesn't read as a steep scoop on narrow phones.
const CURVE_DEFAULT_FILL =
  "M0 84 C33.33 103 66.67 103 100 84 L100 100 L0 100 Z";
const CURVE_DEFAULT_STROKE = "M0 84 C33.33 103 66.67 103 100 84";
const CURVE_SMALL_FILL = "M0 84 C33.33 92 66.67 92 100 84 L100 100 L0 100 Z";
const CURVE_SMALL_STROKE = "M0 84 C33.33 92 66.67 92 100 84";
const CURVE_GLOWS = [
  { w: 6, o: 0.2 },
  { w: 3, o: 0.45 },
  { w: 1.5, o: 1 },
];

// Server component (no "use client"): the hero paints entirely from SSR HTML.
// The background image renders statically with `priority`, and the headline /
// copy animate in via CSS keyframes (motion-safe:animate-[...] — same pattern as
// common/Hero). This keeps the LCP text visible on the first frame instead of
// gating it behind a framer-motion hydration, and ships zero client JS for the
// hero — both the previous fade-in wrapper and framer-motion were inflating LCP.
export default function IntegratorsHero() {
  return (
    <section className="relative overflow-hidden bg-[#030515]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0">
          <Image
            src="/integrators-partners/integratorsHero.webp"
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-[68%_center] sm:object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#030515] from-5% via-[#030515]/55 via-45% to-transparent" />

        <svg
          className="absolute inset-0 h-full w-full my-1"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient
              id="hero-curve-stroke"
              x1="0"
              y1="0"
              x2="100"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#21B1F1" stopOpacity="0" />
              <stop offset="0.5" stopColor="#7ECFFA" stopOpacity="1" />
              <stop offset="1" stopColor="#21B1F1" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* deep curve — 425px and up */}
          <g className="max-[424px]:hidden">
            <path d={CURVE_DEFAULT_FILL} fill="#ffffff" />
            {CURVE_GLOWS.map(({ w, o }) => (
              <path
                key={w}
                d={CURVE_DEFAULT_STROKE}
                fill="none"
                stroke="url(#hero-curve-stroke)"
                strokeOpacity={o}
                strokeWidth={w}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>

          {/* shallow small-angle curve — below 425px */}
          <g className="min-[426px]:hidden">
            <path d={CURVE_SMALL_FILL} fill="#ffffff" />
            {CURVE_GLOWS.map(({ w, o }) => (
              <path
                key={w}
                d={CURVE_SMALL_STROKE}
                fill="none"
                stroke="url(#hero-curve-stroke)"
                strokeOpacity={o}
                strokeWidth={w}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>
        </svg>
      </div>

      <div className="relative z-10 w-full px-6 lg:px-[60px]">
        <div className="flex min-h-[754px] mx-auto  max-w-[1410px]  flex-col justify-center gap-[30px] pt-[140px] pb-[240px]">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3.5">
              {/* Line 1 wipes left -> right; line 2 wipes top -> bottom, staggered
                  after it — same cascade language as common/Hero. */}
              <h1 className="w-[642px] max-w-full text-[34px] font-black leading-[1.2] tracking-[0.5px] text-white sm:text-[44px] lg:text-[50px] lg:leading-[68px]">
                <span className="block motion-safe:animate-[wipeInLeft_1s_cubic-bezier(0.16,1,0.3,1)_both]">
                  Delivered Through Trusted
                </span>
                <span className="block motion-safe:animate-[wipeInTop_1s_cubic-bezier(0.16,1,0.3,1)_0.5s_both]">
                  System Integrators
                </span>
              </h1>
            </div>

            <p className="max-w-[561px] text-base font-bold leading-7 text-white lg:text-[20px] lg:leading-8">
              <span className="block motion-safe:animate-[wipeInLeft_1s_cubic-bezier(0.16,1,0.3,1)_1.05s_both]">
                V-Watch AI works with certified system integrators across
              </span>
              <span className="block motion-safe:animate-[wipeInTop_0.5s_cubic-bezier(0.16,1,0.3,1)_1.8s_both]">
                regions to deploy, implement, and support our platform
              </span>
              <span className="block motion-safe:animate-[wipeInTop_0.5s_cubic-bezier(0.16,1,0.3,1)_2.05s_both]">
                ensuring reliable execution in every environment.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
