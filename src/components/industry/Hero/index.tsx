import Image from "next/image";
import BookADemo from "@/components/common/BookADemo";

// Industry Hub hero — "Built for Any Environment That Demands Control" over a
// dark industrial scene. (Figma node 270:12921)
export default function IndustryHero() {
  return (
    <section className="relative overflow-hidden bg-[#030515]">
      <div className="pointer-events-none absolute inset-0">
        <Image src="/industry/hero.png" alt="" fill priority sizes="100vw" className="object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030515] from-5% via-[#030515]/55 via-45% to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#030515] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1410px] px-6 lg:px-[60px]">
        <div className="flex min-h-[754px] flex-col justify-center gap-5 py-[140px]">
          <div className="flex flex-col gap-3.5">
            <span className="inline-flex w-fit items-center gap-[4px] rounded-full bg-white/10 px-[13px] py-[9px]">
              <span className="size-[11px] rounded-full bg-[#86D58B]" />
              <span className="text-[18px] font-bold leading-none text-white">What V-Watch Ai</span>
            </span>

            <h1 className="w-[642px] max-w-full text-[50px] font-black leading-[68px] tracking-[0.5px] text-white">
              Built for Any Environment That Demands Control
            </h1>
          </div>

          <p className="max-w-[561px] text-[20px] font-bold leading-8 text-white">
            V-Watch Ai is designed for complex, high-activity environments where visibility, safety,
            and operational control are critical from construction sites to data centers and beyond.
          </p>

          <BookADemo className="self-start" />
        </div>
      </div>
    </section>
  );
}
