import Image from "next/image";

// "Built for complex operational environments" — a full-bleed dark card with a
// 3 + 2 grid of industry photo tiles. (Figma node 219:1532)
type Industry = { name: string; img: string; desc: string; wide?: boolean };

const ROW_1: Industry[] = [
  {
    name: "Construction",
    img: "/home/ind-construction.png",
    desc: "Track workforce, equipment, and site activity in real time keeping projects safe, compliant, and on schedule from groundbreaking to handover.",
  },
  {
    name: "Industrial & Energy",
    img: "/home/ind-industrial.png",
    desc: "Operate safely in high-risk environments with real-time tracking, restricted zone monitoring, and instant response capabilities reducing risk while maintaining strict compliance.",
  },
  {
    name: "Commercial & Facilities",
    img: "/home/ind-commercial.png",
    desc: "Manage access, monitor occupancy, and coordinate teams across buildings ensuring security and efficiency in every facility.",
  },
];

const ROW_2: Industry[] = [
  {
    name: "Data Centers",
    img: "/home/ind-datacenter.png",
    wide: true,
    desc: "Secure critical infrastructure with controlled access, asset tracking, and continuous monitoring to protect uptime and compliance.",
  },
  {
    name: "Logistics & Warehousing",
    img: "/home/ind-logistics.png",
    wide: true,
    desc: "Gain end-to-end visibility over goods, vehicles, and people from on-site movement to cross-border delivery.",
  },
];

function IndustryTile({ name, img, desc }: Readonly<Industry>) {
  return (
    <div className="group relative h-[240px] w-full overflow-hidden rounded-[24px] sm:h-[320px]">
      <Image src={img} alt={name} fill className="object-cover" sizes="(min-width: 1024px) 555px, 100vw" />

      {/* Resting state: bottom scrim + name — fade out on hover */}
      <div className="absolute inset-x-0 bottom-0 h-[135px] bg-gradient-to-b from-transparent to-black/80 transition-opacity duration-300 group-hover:opacity-0" />
      <p className="absolute bottom-6 left-6 text-[20px] font-bold tracking-[-0.5px] text-white transition-opacity duration-300 group-hover:opacity-0">
        {name}
      </p>

      {/* Hover state: frosted glass card anchored near the bottom; wipes in
          from bottom → top on hover (clip-path inset reveal). */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center p-4">
        <div className="pointer-events-auto w-[90%] max-w-[700px] max-h-[200px] rounded-[14px] border border-white/30 bg-black/25 p-6 backdrop-blur-[1px] transition-[clip-path] duration-500 ease-out [clip-path:inset(100%_0_0_0_round_14px)] group-hover:[clip-path:inset(0_0_0_0_round_14px)]">
          <h3 className="text-[20px] font-bold tracking-[-0.5px] text-white">{name}</h3>
          <p className="mt-1.5 text-[16px] font-normal leading-[17px] text-white/90">{desc}</p>
          <a href="#" className="mt-2.5 inline-flex items-center gap-2 text-[13px] font-bold text-white">
            Learn More
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/60">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M3.6 8.4 8.4 3.6M4.5 3.6h3.9v3.9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Industries() {
  return (
    <section className="bg-white transition-transform duration-300 ease-out hover:scale-95">
      <div className="relative w-full overflow-hidden rounded-[40px]">
        {/* background texture + glow */}
        <Image
          src="/home/industries_bg.svg"
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
