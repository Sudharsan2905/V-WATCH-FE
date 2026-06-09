import Image from "next/image";

type Challenge = {
  title: string;
  desc: string;
  icon: string;
  iconW: number;
  iconH: number;
};

const CHALLENGES: Challenge[] = [
  {
    title: "Blind Visibility",
    desc: "Limited real-time visibility of people and activity.",
    icon: "/industry/challenges/blind-visibility.svg",
    iconW: 32,
    iconH: 27,
  },
  {
    title: "Tracking Burden",
    desc: "Compliance requirements that are difficult to track.",
    icon: "/industry/challenges/tracking-burden.svg",
    iconW: 27,
    iconH: 22,
  },
  {
    title: "System Fragmentation",
    desc: "Disconnected systems across teams and functions.",
    icon: "/industry/challenges/system-fragmentation.svg",
    iconW: 29,
    iconH: 29,
  },
  {
    title: "Critical Delays",
    desc: "Delayed response to incidents and risks.",
    icon: "/industry/challenges/critical-delays.svg",
    iconW: 28,
    iconH: 28,
  },
  {
    title: "Data Misalignment",
    desc: "Workforce and operational data that don't align.",
    icon: "/industry/challenges/data-misalignment.svg",
    iconW: 28,
    iconH: 28,
  },
];

function ChallengeCard({
  title,
  desc,
  icon,
  iconW,
  iconH,
}: Readonly<Challenge>) {
  return (
    <div className="relative z-10 h-[171px] w-[314px] shrink-0">
      {/* Title card — behind, peeks below-right */}
      <div
        className="absolute left-[34px] top-[78px] flex h-[93px] w-[280px] flex-col justify-end rounded-[14px] px-4 pb-4 pt-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(233, 238, 255, 0.40) 0%, rgba(193, 236, 255, 0.40) 100%), white",
          boxShadow:
            "10px -16px 52px rgba(153, 224, 255, 0.18), 6px 10px 23px rgba(217, 226, 255, 0.85), -40px 14px 250px rgba(184, 230, 255, 0.20), 9px 7px 60px rgba(255, 255, 255, 0.40)",
          outlineOffset: "-1px",
        }}
      >
        <p className="text-[18px] font-bold text-[#0f172a]">{title}</p>
      </div>

      {/* Description card — in front */}
      <div
        className="absolute left-0 top-[24px] flex h-[98px] w-[280px] items-end overflow-hidden rounded-[16px] px-[19px] py-5"
        style={{
          background: "rgba(255, 247, 244, 0.20)",
          boxShadow:
            "0px 13px 100px rgba(199, 199, 199, 0.25), 0px 0px 24px rgba(255, 107, 107, 0.14) inset",
          outline: "2px rgba(255, 255, 255, 0.60) solid",
          outlineOffset: "-2px",
        }}
      >
        <p className="text-[18px] leading-[22px] text-[#314158]">{desc}</p>
      </div>

      {/* Icon badge — top-left, above both cards */}
      <div
        className="absolute left-[13px] top-0 flex size-12 items-center justify-center rounded-[14px] backdrop-blur-[2px]"
        style={{
          background: "rgba(222, 239, 255, 0.10)",
          outline: "1.5px white solid",
          outlineOffset: "-1.5px",
        }}
      >
        <Image
          src={icon}
          alt=""
          width={iconW}
          height={iconH}
          unoptimized
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default function Challenges() {
  return (
    <section className="relative z-10 mt-20 overflow-hidden bg-white px-6 pb-4 pt-10 lg:px-[60px]">
      {/* Decorative blur blobs */}
      <div
        className="pointer-events-none absolute hidden lg:block"
        style={{
          width: 274,
          height: 193,
          right: 60,
          top: 232,
          background: "rgba(193, 236, 255, 0.30)",
          filter: "blur(85px)",
        }}
      />
      <div
        className="pointer-events-none absolute hidden lg:block"
        style={{
          width: 274,
          height: 193,
          left: 60,
          top: 96,
          background: "rgba(184, 230, 255, 0.43)",
          filter: "blur(85px)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[1160px] flex-col gap-[30px]">
        <header className="flex flex-col gap-2.5">
          <h2 className="max-w-[889px] text-[26px] font-extrabold text-[#0A4B6E]">
            Different industries. The same core challenges.
          </h2>
          <p className="max-w-[735px] text-[20px] font-normal leading-[28px] text-[#0A4B6E]">
            No matter the environment, operations face similar problems
          </p>
        </header>

        <div className="flex flex-col gap-[50px]">
          {/* Row 1 — 3 cards */}
          <div className="relative flex flex-wrap gap-[30px]">
            {/* Dotted connector line */}
            <div className="pointer-events-none absolute left-[160px] right-[160px] top-[85px] z-0 hidden border-t-2 border-dashed border-[#9CD8F0]/60 lg:block" />
            {CHALLENGES.slice(0, 3).map((c) => (
              <ChallengeCard key={c.title} {...c} />
            ))}
          </div>

          {/* Row 2 — 2 cards + callout */}
          <div className="relative flex flex-wrap items-center gap-[30px]">
            {/* Dotted connector line (shorter — only spans the 2 cards) */}
            <div
              className="pointer-events-none absolute left-[160px] top-[85px] z-0 hidden border-t-2 border-dashed border-[#9CD8F0]/60 lg:block"
              style={{ right: "calc(100% - 628px)" }}
            />
            {CHALLENGES.slice(3).map((c) => (
              <ChallengeCard key={c.title} {...c} />
            ))}

            {/* Toggle callout */}
            <div className="relative flex flex-1 items-center gap-4">
              {/* Concentric circle rings background */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Image
                  src="/industry/challenges/circles-outer.svg"
                  alt=""
                  width={230}
                  height={238}
                  unoptimized
                  className="opacity-80"
                />
              </div>
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Image
                  src="/industry/challenges/circles-inner.svg"
                  alt=""
                  width={172}
                  height={178}
                  unoptimized
                  className="opacity-80"
                />
              </div>

              {/* Toggle + halos */}
              <div className="relative flex h-[100px] w-[142px] shrink-0 items-center justify-center">
                {/* Outer halo */}
                <div
                  className="absolute"
                  style={{
                    width: 141.92,
                    height: 100.18,
                    borderRadius: 67.74,
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.06) 100%)",
                  }}
                />
                {/* Middle halo */}
                <div
                  className="absolute"
                  style={{
                    width: 116.12,
                    height: 75.14,
                    borderRadius: 38.71,
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.16) 100%)",
                    boxShadow: "0px 2.15px 12.9px rgba(29, 108, 151, 0.10)",
                    borderTop: "0.81px rgba(255,255,255,0.02) solid",
                  }}
                />
                {/* Inner halo */}
                <div
                  className="absolute"
                  style={{
                    width: 103.22,
                    height: 62.61,
                    borderRadius: 38.71,
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.30) 0%, white 100%)",
                    boxShadow: "0px 2.15px 12.9px rgba(29, 108, 151, 0.24)",
                    borderTop: "0.81px rgba(255,255,255,0.04) solid",
                  }}
                />
                {/* Toggle switch — ON state (knob on right) */}
                <div
                  className="relative flex items-center justify-end"
                  style={{
                    width: 90,
                    height: 50,
                    borderRadius: 27.05,
                    background:
                      "linear-gradient(120deg, #E86C5C 0%, #97351D 100%)",
                    padding: "3px",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 19.35,
                      background: "white",
                      flexShrink: 0,
                    }}
                  />
                </div>
              </div>

              {/* Callout text */}
              <p className="flex-1 text-[16px] font-bold leading-6 text-[#314158]">
                When systems are fragmented, control is limited and risks
                increase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
