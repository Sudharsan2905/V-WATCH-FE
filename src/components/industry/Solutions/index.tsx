import ViewAllUseCases from "@/components/common/ViewAllUseCases";
import Image from "next/image";

type Card = {
  title: string;
  desc: string;
  img: string;
  descColor: string;
  descWeight: number;
};

const CARDS: Card[] = [
  {
    title: "Workforce Operations",
    desc: "Manage payroll, leave, and workforce activity centrally.",
    img: "/industry/sol-1.png",
    descColor: "#EFF9FF",
    descWeight: 500,
  },
  {
    title: "Emergency Muster & Headcount",
    desc: "Track safety, missing, and onsite personnel during emergencies.",
    img: "/industry/sol-2.png",
    descColor: "#D4F0FF",
    descWeight: 400,
  },
  {
    title: "Compliance tracking",
    desc: "Ensure every third-party worker meets safety requirements.",
    img: "/industry/sol-3.png",
    descColor: "#D4F0FF",
    descWeight: 500,
  },
  {
    title: "Facial Recognition",
    desc: "Deploy touchless entry points across high-traffic zones.",
    img: "/industry/sol-4.png",
    descColor: "#D4F0FF",
    descWeight: 500,
  },
];

export default function Solutions() {
  return (
    <section className="relative z-10 -mt-10 overflow-hidden rounded-t-[40px] bg-white px-6 pt-10 pb-20 lg:px-[60px]">
      {/* Ellipse 3550 — blue, W:610 H:148, centred at gap between cards 1 and 2 */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          width: 610,
          height: 148,
          left: "27%",
          top: "57%",
          transform: "translate(-50%, -50%)",
          background: "rgba(33, 177, 241, 0.55)",
          borderRadius: "50%",
          filter: "blur(100px)",
        }}
      />
      {/* Ellipse 3551 — yellow/lime, W:810 H:172, centred at gap between cards 3 and 4 */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          width: 810,
          height: 172,
          left: "73%",
          top: "57%",
          transform: "translate(-50%, -50%)",
          background: "rgba(166, 201, 54, 0.45)",
          borderRadius: "50%",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1410px] flex-col gap-[30px]">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex max-w-[845px] flex-col gap-2.5 text-[#0A4B6E]">
            <h2 className="text-[26px] font-extrabold">
              Start with your challenge
            </h2>
            <p className="text-[20px] font-medium leading-[28px]">
              Every environment faces similar operational challenges explore
              solutions based on your specific needs.
            </p>
          </div>
          <ViewAllUseCases className="shrink-0" />
        </div>

        {/* Cards */}
        <div className="flex flex-wrap gap-5">
          {CARDS.map((c) => (
            <div
              key={c.title}
              className="group relative h-[302px] min-w-[240px] flex-1 rounded-[30px] bg-white/50 p-5 shadow-[0_20px_20px_rgba(0,0,0,0.02)] backdrop-blur-[10px]"
              style={{ outline: "2px solid white", outlineOffset: -2 }}
            >
              {/* Inner flex — justify-end pushes text to bottom */}
              <div className="relative flex h-full flex-col items-start justify-end gap-3.5">
                {/* Image: inset -10px so it sits 10px from each card edge.
                    Its own borderRadius(20px) + position(10px) stays within card(30px) radius — no overflow:hidden needed. */}
                <div
                  className="absolute overflow-hidden rounded-[20px]"
                  style={{ inset: -10 }}
                >
                  <Image
                    src={c.img}
                    alt={c.title}
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                </div>

                {/* Frosted glass overlay — matches Figma: rgba(24,23,23,0.40) + blur(5px), pinned to bottom */}
                <div
                  className="absolute rounded-b-[20px]"
                  style={{
                    left: -10,
                    right: -10,
                    bottom: -10,
                    height: 134,
                    background: "rgba(24, 23, 23, 0.40)",
                    backdropFilter: "blur(5px)",
                  }}
                />

                {/* Title + description */}
                <div className="relative z-10 flex flex-col gap-2.5 self-stretch">
                  <p className="text-[18px] font-bold leading-6 text-white">
                    {c.title}
                  </p>
                  <p
                    className="text-[16px] leading-5"
                    style={{ color: c.descColor, fontWeight: c.descWeight }}
                  >
                    {c.desc}
                  </p>
                </div>

                {/* Learn More — always in layout (no shift on hover), invisible until hover */}
                <div className="relative z-10 flex h-6 items-center gap-2.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <span className="text-[16px] font-medium text-white">
                    Learn More
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M14 11.3479L13.7195 0.255009L2.62659 0L2.65209 2.42259L10.0474 2.37158L0 12.4189L1.58106 14L11.6029 3.97814L11.5519 11.3224L14 11.3479Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
