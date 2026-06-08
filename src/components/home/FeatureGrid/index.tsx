import Image from "next/image";

type Feature = { icon: string; title: string; desc: string };

const FEATURES: Feature[] = [
  {
    icon: "/home/icons/people.svg",
    title: "Your People",
    desc: "Know who is working, where they are, how long they've worked, and whether they're safe and compliant.",
  },
  {
    icon: "/home/icons/work.svg",
    title: "Your Work",
    desc: "Track tasks, workflows, and operations from assignment to completion with full accountability.",
  },
  {
    icon: "/home/icons/movement.svg",
    title: "Your Movement",
    desc: "Monitor vehicles, assets, and goods from on-site activity to cross-border logistics.",
  },
  {
    icon: "/home/icons/assets.svg",
    title: "Your Assets",
    desc: "Track equipment, manage usage, and maintain full visibility across locations.",
  },
  {
    icon: "/home/icons/safety.svg",
    title: "Your Safety & Compliance",
    desc: "Control access, monitor risks, manage permits, and ensure standards are always met.",
  },
  {
    icon: "/home/icons/performance.svg",
    title: "Your Performance",
    desc: "Measure manhours, productivity, and efficiency using real, verifiable data.",
  },
];

const CARD_GRADIENT =
  "linear-gradient(90deg, rgba(156,220,255,0.04) 0%, rgba(156,220,255,0.04) 100%), linear-gradient(90deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.10) 100%)";

function FeatureCard({ icon, title, desc }: Readonly<Feature>) {
  return (
    // Outer shell: natural on mobile, fixed 554×211.5 cell on desktop
    <div className="relative w-full shrink-0 lg:h-[211.5px] lg:w-[554px]">
      {/* Blob background — desktop only, inset to match SVG natural dims */}
      <div className="pointer-events-none absolute bottom-0 left-[5px] right-[3px] top-[4px] hidden lg:block">
        <Image src="/home/feature-card-bg.svg" alt="" fill className="object-fill" />
      </div>

      {/* Card — full-width on mobile; offset 46.5 × 43.5 on desktop */}
      <div className="relative h-[144px] w-full lg:absolute lg:left-[46.5px] lg:top-[43.5px] lg:h-[144px] lg:w-[469px]">
        {/* Card glass border/background */}
        <div
          className="absolute inset-0 rounded-[20px] border-2 border-white shadow-[6px_10px_23px_0px_rgba(217,226,255,0.85),0px_13px_100px_0px_rgba(199,199,199,0.25)] lg:inset-auto lg:-left-[3.5px] lg:-top-[0.5px] lg:h-[144px] lg:w-[473px]"
          style={{ backgroundImage: CARD_GRADIENT }}
        />

        {/* Icon shield — behind the icon tile */}
        <div className="absolute left-[12.5px] top-[0.5px] h-[94px] w-[60px]">
          <Image src="/home/feature-icon-bg.svg" alt="" fill className="object-fill" />
        </div>

        {/* Icon tile */}
        <div className="absolute left-[17.5px] top-[19.5px] flex h-[50px] w-[50px] items-center justify-center rounded-[11.4px] border-[1.2px] border-white bg-[rgba(244,251,255,0.4)] p-[9.35px] shadow-[4.889px_8.148px_18.741px_0px_rgba(217,226,255,0.4)]">
          <Image src={icon} alt="" width={32} height={32} className="h-8 w-8 brightness-0 invert" />
        </div>

        {/* Text content */}
        <div className="flex h-full flex-col justify-center pl-[90px] pr-2.5 py-2.5">
          <p className="text-[20px] font-bold text-[#0A4B6E]">{title}</p>
          <p className="mt-2.5 text-[18px] leading-6 text-[#202020]">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function FeatureGrid() {
  const rows = [FEATURES.slice(0, 2), FEATURES.slice(2, 4), FEATURES.slice(4, 6)];

  return (
    <section className="bg-white px-6 pb-20 lg:px-[60px]">
      <div className="mx-auto flex w-full max-w-[1410px] flex-col gap-[30px]">
        <header className="flex max-w-[807px] flex-col gap-2.5">
          <h2 className="max-w-[642px] text-[26px] font-bold text-[#0A4B6E]">
            Everything your operation depends on in one place
          </h2>
          <p className="text-[20px] font-normal leading-[26px] text-[#0A4B6E]">
            V-Watch <span className="uppercase">Ai</span> is built around how your business actually runs.
          </p>
        </header>

        <div className="flex flex-col items-center gap-[30px]">
          <div className="flex w-full max-w-[1160px] flex-col gap-[30px]">
            {rows.map((row) => (
              <div
                key={row[0].title}
                className="flex flex-col gap-[30px] lg:flex-row lg:items-center lg:justify-between"
              >
                {row.map((f) => (
                  <FeatureCard key={f.title} {...f} />
                ))}
              </div>
            ))}
          </div>

          <p className="text-center text-[20px] font-normal text-[#0A8EC8]">
            Not separate systems, One connected operation.
          </p>
        </div>
      </div>
    </section>
  );
}
