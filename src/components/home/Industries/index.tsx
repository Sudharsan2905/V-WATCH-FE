import Image from "next/image";

// "Built for complex operational environments" — a full-bleed dark card with a
// 3 + 2 grid of industry photo tiles. (Figma node 219:1532)
type Industry = { name: string; img: string; wide?: boolean };

const ROW_1: Industry[] = [
  { name: "Construction", img: "/home/ind-construction.png" },
  { name: "Industrial & Energy", img: "/home/ind-industrial.png" },
  { name: "Commercial & Facilities", img: "/home/ind-commercial.png" },
];

const ROW_2: Industry[] = [
  { name: "Data Centers", img: "/home/ind-datacenter.png", wide: true },
  { name: "Logistics & Warehousing", img: "/home/ind-logistics.png", wide: true },
];

function IndustryTile({ name, img, wide }: Readonly<Industry>) {
  return (
    <div
      className={`relative h-[320px] shrink-0 overflow-hidden rounded-[24px] ${
        wide ? "w-[555px]" : "w-[360px]"
      }`}
    >
      <Image src={img} alt={name} fill className="object-cover" sizes="555px" />
      {/* bottom scrim */}
      <div className="absolute inset-x-0 bottom-0 h-[135px] bg-gradient-to-b from-transparent to-black/80" />
      <p className="absolute bottom-6 left-6 text-[20px] font-bold tracking-[-0.5px] text-white">
        {name}
      </p>
    </div>
  );
}

export default function Industries() {
  return (
    <section className="bg-white">
      <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[40px]">
        {/* background texture + glow */}
        <Image
          src="/home/industries-bg.png"
          alt=""
          fill
          className="object-cover"
          sizes="1280px"
        />

        <div className="relative mx-auto flex w-full max-w-[1140px] flex-col gap-[30px] py-[61px]">
          <div className="flex max-w-[959px] flex-col gap-2.5 text-white">
            <h2 className="text-[26px] font-bold leading-[44px]">
              Built for complex operational environments
            </h2>
            <p className="text-[20px] font-normal leading-[30px]">
              V-Watch Ai is designed to adapt across industries where visibility, security, and
              operational efficiency are critical. While each environment is different, the need for
              real-time control and automation remains the same.
            </p>
          </div>

          {/* grid */}
          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-wrap gap-[30px]">
              {ROW_1.map((i) => (
                <IndustryTile key={i.name} {...i} />
              ))}
            </div>
            <div className="flex flex-wrap gap-[30px]">
              {ROW_2.map((i) => (
                <IndustryTile key={i.name} {...i} />
              ))}
            </div>
          </div>

          {/* bottom unifying pill */}
          <div className="flex h-[60px] items-center justify-center gap-4 rounded-[30px] border border-[rgba(233,238,255,0.4)] bg-white/10 px-2.5">
            <span className="h-px flex-1 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.5)_100%)]" />
            <p className="whitespace-nowrap text-[20px] font-normal leading-[23px] text-white">
              No matter the industry, V-Watch Ai brings visibility, automation, and control into one
              unified system.
            </p>
            <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(255,255,255,0.5)_0%,transparent_100%)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
