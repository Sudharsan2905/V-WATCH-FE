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

function IndustryTile({ name, img }: Readonly<Industry>) {
  return (
    <div className="relative h-[240px] w-full overflow-hidden rounded-[24px] sm:h-[320px]">
      <Image src={img} alt={name} fill className="object-cover" sizes="(min-width: 1024px) 555px, 100vw" />
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
      <div className="relative w-full overflow-hidden rounded-[40px]">
        {/* background texture + glow */}
        <Image
          src="/home/industries-bg.png"
          alt=""
          fill
          className="object-cover object-[center_90%]"
          sizes="100vw"
        />

        <div className="relative mx-auto flex w-full flex-col gap-[30px] px-6 py-12 lg:px-[70px] lg:py-[61px]">
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
            <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-3">
              {ROW_1.map((i) => (
                <IndustryTile key={i.name} {...i} />
              ))}
            </div>
            <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2">
              {ROW_2.map((i) => (
                <IndustryTile key={i.name} {...i} />
              ))}
            </div>
          </div>

          {/* bottom unifying pill */}
          <div className="flex items-center justify-center gap-4 rounded-[30px] border border-[rgba(233,238,255,0.35)] bg-[linear-gradient(90deg,#063043_0%,#063043_24%,rgba(6,48,67,0.3)_52%,#063043_76%,#063043_100%)] px-4 py-4 backdrop-blur-sm lg:h-[60px] lg:px-2.5 lg:py-0">
            <span className="hidden flex-1 items-center lg:flex">
              <span className="h-0.5 flex-1 rounded-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.7)_100%)]" />
              <span className="size-1.5 shrink-0 rounded-full bg-white" />
            </span>
            <p className="text-center text-[16px] font-normal leading-[23px] text-white lg:whitespace-nowrap lg:text-[20px]">
              No matter the industry, V-Watch Ai brings visibility, automation, and control into one
              unified system.
            </p>
            <span className="hidden flex-1 items-center lg:flex">
              <span className="size-1.5 shrink-0 rounded-full bg-white" />
              <span className="h-0.5 flex-1 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.7)_0%,transparent_100%)]" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
