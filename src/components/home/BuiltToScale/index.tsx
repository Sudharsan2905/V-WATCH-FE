import Image from "next/image";

// "Built to perform at scale" — heading plus a single pre-rendered visual
// (rocket/rings on the left and the three capability cards on the right) with
// the arch-shaped command-center image overlaid in the centre. (Figma node 215:8382)

export default function BuiltToScale() {
  return (
    <section className="bg-white px-6 py-20 lg:px-[60px]">
      <div className="mx-auto w-full max-w-[1410px]">
        <div className="mx-auto w-full max-w-[1160px]">
          {/* Heading */}
          <div className="max-w-[860px]">
            <h2 className="text-[26px] font-bold text-[#0A4B6E]">Built to perform at scale</h2>
            <p className="mt-2.5 text-[20px] font-normal leading-[26px] text-[#0A4B6E]">
              V-Watch Ai is designed for high-volume, high-complexity environments delivering
              real-time performance without compromise.
            </p>
          </div>

          {/* Visual composition — pre-rendered background + arch overlay in the centre */}
          <div className="relative mt-10 w-full">
            {/* Base: rocket/rings (left) + capability cards (right) */}
            <Image
              src="/home/scale.png"
              alt="Monitor up to 100,000 profiles per site, real-time data processing across multiple operations, and built for scalability across large and distributed environments"
              width={1221}
              height={499}
              className="h-auto w-full object-contain"
              priority
            />

            {/* Centre: arch-shaped command-center image with caption */}
            <div
              className="absolute"
              style={{ left: "26%", top: "26%", width: "40%", aspectRatio: "516 / 271" }}
            >
              <div
                className="relative h-full w-full border border-[#DCEBF5] bg-white/[0.04] p-[1.6%] shadow-[0_12px_44px_rgba(92,183,232,0.20)]"
                style={{ borderRadius: "110px 9999px 9999px 110px" }}
              >
                <div
                  className="relative h-full w-full overflow-hidden"
                  style={{ borderRadius: "102px 9999px 9999px 102px" }}
                >
                  <Image src="/home/scale-arch.png" alt="V-Watch command center" fill className="object-cover" sizes="440px" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
                  <p className="absolute inset-x-0 bottom-[10%] mx-auto max-w-[80%] px-2 text-center text-[clamp(9px,1.05vw,16px)] font-bold leading-tight text-white">
                    When operations scale, V-Watch Ai scales with you, without loss of visibility or control.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
