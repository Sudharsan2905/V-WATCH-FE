import Image from "next/image";

// "Built to perform at scale" — heading + an arch-shaped command-center image
// with an overlaid caption. (Figma node 215:8382)
export default function BuiltToScale() {
  return (
    <section className="bg-white px-6 py-20 lg:px-[60px]">
      <div className="relative mx-auto max-w-[1410px] lg:h-[557px]">
        <div className="max-w-[860px]">
          <h2 className="text-[26px] font-bold text-[#0A4B6E]">Built to perform at scale</h2>
          <p className="mt-2.5 text-[20px] font-normal leading-[26px] text-[#0A4B6E]">
            V-Watch Ai is designed for high-volume, high-complexity environments delivering
            real-time performance without compromise.
          </p>
        </div>

        {/* Arch-shaped image: left corners 30px, right side a full semicircle */}
        <div className="mt-10 w-full max-w-[516px] lg:absolute lg:left-[219px] lg:top-[212px] lg:mt-0 lg:w-[516px]">
          <div className="relative h-[271px] w-full rounded-l-[30px] rounded-r-[600px] border border-white bg-white/[0.04] p-2.5">
            <div className="relative h-full w-full overflow-hidden rounded-l-[20px] rounded-r-[600px]">
              <Image
                src="/home/scale-arch.png"
                alt="V-Watch command center"
                fill
                className="object-cover"
                sizes="516px"
              />
              {/* legibility scrim */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
              <p className="absolute inset-x-0 bottom-[26px] mx-auto max-w-[406px] text-center text-[16px] font-bold leading-6 text-white">
                When operations scale, V-Watch Ai scales with you, without loss of visibility or
                control.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
