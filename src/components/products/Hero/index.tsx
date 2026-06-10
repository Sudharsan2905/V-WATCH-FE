import Image from "next/image";
import BookADemo from "@/components/common/BookADemo";

// Products hero — "One Platform / Multiple Capabilities / Total Control" over a
// baked 3D isometric illustration. (Figma node 270:5601)
export default function ProductsHero() {
  return (
    <section className="relative overflow-hidden bg-[#030515]">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/products/hero.png"
          alt=""
          fill
          quality={80}
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
        {/* left scrim to keep copy legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030515] from-5% via-[#030515]/55 via-45% to-transparent" />

        {/* bottom bezier divider — fills everything below the curve with the
            colour of the next section (white) so the hero reads as a curved edge
            that flows straight into CapabilityTabs, then traces it with a glow.
            Normalised viewBox keeps the curve aligned at any size. */}
        <svg
          className="absolute inset-0 h-full w-full"
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

          {/* fill below the curve with the next section's colour */}
          <path
            d="M0 84 C33.33 103 66.67 103 100 84 L100 100 L0 100 Z"
            fill="#ffffff"
          />

          {/* layered strokes give the glow without a blur filter (which would
              distort when the viewBox is stretched) */}
          {[
            { w: 6, o: 0.2 },
            { w: 3, o: 0.45 },
            { w: 1.5, o: 1 },
          ].map(({ w, o }) => (
            <path
              key={w}
              d="M0 84 C33.33 103 66.67 103 100 84"
              fill="none"
              stroke="url(#hero-curve-stroke)"
              strokeOpacity={o}
              strokeWidth={w}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1410px] px-6">
        <div className="flex min-h-[754px] flex-col justify-center gap-[30px] pt-[140px] pb-[240px]">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3.5">
              {/* badge */}
              <span className="inline-flex w-fit items-center gap-[4px] rounded-full bg-white/10 px-[13px] py-[9px]">
                <span className="size-[11px] rounded-full bg-[#86D58B]" />
                <span className="text-[18px] font-bold leading-none text-white">
                  What V-Watch Ai
                </span>
              </span>

              <h1 className="w-[642px] max-w-full text-[50px] font-black leading-[68px] tracking-[0.5px] text-white">
                One Platform
                <br />
                Multiple Capabilities
                <br />
                Total Control
              </h1>
            </div>

            <p className="max-w-[561px] text-[20px] font-bold leading-8 text-white">
              V-Watch Ai brings together a suite of integrated capabilities that
              manage your workforce, operations, assets, and security all in one
              connected system.
            </p>
            <p className="max-w-[561px] text-[20px] font-extrabold leading-8 text-white">
              Start with what you need. Scale as you grow.
            </p>
          </div>

          <BookADemo className="self-start" />
        </div>
      </div>
    </section>
  );
}
