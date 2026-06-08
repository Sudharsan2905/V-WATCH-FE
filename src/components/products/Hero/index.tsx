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
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
        {/* left scrim to keep copy legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030515] from-5% via-[#030515]/55 via-45% to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1410px] px-6 lg:px-[60px]">
        <div className="flex min-h-[754px] flex-col justify-center gap-[30px] py-[140px]">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3.5">
              {/* badge */}
              <span className="inline-flex w-fit items-center gap-[4px] rounded-full bg-white/10 px-[13px] py-[9px]">
                <span className="size-[11px] rounded-full bg-[#86D58B]" />
                <span className="text-[18px] font-bold leading-none text-white">What V-Watch Ai</span>
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
              V-Watch Ai brings together a suite of integrated capabilities that manage your
              workforce, operations, assets, and security all in one connected system.
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
