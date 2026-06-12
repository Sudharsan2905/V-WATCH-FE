import Image from "next/image";

const CARDS = [
  {
    key: "capture",
    title: "Capture",
    description:
      "Collect real-time data across access, movement, and operations.",
    icon: "/about/approach-icon-capture.png",
    bg: "/about/approach-card-bg-left.png",
    ghost: true,
  },
  {
    key: "control",
    title: "Control",
    description:
      "Manage permissions, workflows, and compliance from one platform.",
    icon: "/about/approach-icon-control.png",
    bg: null,
    ghost: false,
  },
  {
    key: "prove",
    title: "Prove",
    description:
      "Generate insights and reports that provide full operational visibility.",
    icon: "/about/approach-icon-prove.png",
    bg: "/about/approach-card-bg-right.png",
    ghost: true,
  },
];

function ApproachCard({ card }: { card: (typeof CARDS)[0] }) {
  return (
    <div
      className={[
        "relative flex flex-col items-center gap-[16px] pb-[50px] pt-[24px] px-[16px] rounded-[20px] w-full max-w-[340px] lg:flex-1 lg:min-w-0 flex-shrink-0 lg:flex-shrink",
        !card.ghost
          ? "bg-white border border-white shadow-[9px_7px_60px_0px_rgba(56,144,192,0.10),6px_10px_14px_0px_rgba(217,226,255,0.20)] min-h-[300px]"
          : "min-h-[360px]",
      ].join(" ")}
    >
      {/* Ghost card background (extends beyond bounds visually) */}
      {card.bg && (
        <div className="absolute inset-[-65%_-62%_-73%_-85%] pointer-events-none">
          <Image
            src={card.bg}
            alt=""
            fill
            className="object-contain object-center"
            sizes="600px"
          />
        </div>
      )}

      {/* Glow blobs */}
      {card.ghost && (
        <>
          <div className="absolute right-0 top-[100px] w-[93px] h-[160px] rounded-full bg-[rgba(56,189,248,0.2)] blur-[32px] opacity-60 pointer-events-none" />
          <div className="absolute left-0 top-[100px] w-[72px] h-[160px] rounded-full bg-[rgba(56,189,248,0.2)] blur-[32px] opacity-40 pointer-events-none" />
        </>
      )}
      {!card.ghost && (
        <>
          <div className="absolute right-[184px] top-[73px] size-[160px] rounded-full bg-[rgba(56,189,248,0.2)] blur-[32px] opacity-60 pointer-events-none" />
          <div className="absolute left-[-86px] top-[73px] size-[160px] rounded-full bg-[rgba(56,189,248,0.2)] blur-[32px] opacity-40 pointer-events-none" />
        </>
      )}

      {/* Concentric rings — CSS-based (SVG ellipses have oversized filter halos in browser) */}
      <div className="relative z-10 size-[151px] flex-shrink-0 flex items-center justify-center">
        {/* Outer diffuse glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 50% 48%, rgba(126,207,250,0.22) 0%, rgba(126,207,250,0.08) 55%, transparent 78%)",
            boxShadow: "0 8px 40px rgba(126,207,250,0.18), 6px 10px 24px rgba(217,226,255,0.55)",
          }}
        />
        {/* Ring 1 */}
        <div
          className="absolute inset-[10px] rounded-full border border-[rgba(126,207,250,0.28)]"
          style={{
            background: "radial-gradient(circle at 50% 45%, #fff 25%, rgba(212,240,255,0.85) 65%, rgba(160,218,250,0.4) 100%)",
          }}
        />
        {/* Ring 2 — bright inner */}
        <div
          className="absolute inset-[27px] rounded-full bg-white"
          style={{ boxShadow: "0 2px 10px rgba(126,207,250,0.35)" }}
        />
        {/* Icon */}
        <div className="relative z-10 size-[50px]">
          <Image src={card.icon} alt={card.title} fill className="object-contain" sizes="50px" />
        </div>
      </div>

      {/* Text */}
      <div className="relative z-10 flex flex-col items-center gap-[6px] text-center">
        <h3 className="text-[20px] font-bold text-[#1d6c97] tracking-[-0.04px]">
          {card.title}
        </h3>
        <p className="text-[18px] text-[#005276] leading-[24px]">
          {card.description}
        </p>
      </div>
    </div>
  );
}

function ArrowConnector() {
  return (
    <div className="hidden lg:flex flex-col items-center gap-[6px] flex-shrink-0 relative z-20 -mx-[10px]">
      {/* Gradient pill */}
      <div
        className="w-[55px] h-[29px] rounded-full flex items-center justify-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #21b1f1 20.69%, #6badf6 43.97%, #e7a7ff 151.72%)",
        }}
      >
        <div className="relative size-[20px]">
          <Image
            src="/about/approach-arrow-pill.png"
            alt=""
            fill
            className="object-contain"
            sizes="20px"
          />
        </div>
      </div>
      {/* Circle button with arrow */}
      <div className="relative size-[40px]">
        <Image
          src="/about/approach-arrow-circle.png"
          alt=""
          fill
          className="object-contain"
          sizes="40px"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[15px] h-[11px]">
            <Image
              src="/about/approach-arrow-icon.png"
              alt=""
              fill
              className="object-contain"
              sizes="15px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OurApproach() {
  return (
    <section className="bg-[#F2F8FE] py-[40px] lg:py-[80px] overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[60px]">
        {/* Section header */}
        <div className="mb-[30px]">
          <h2 className="text-[22px] lg:text-[26px] font-bold text-[#0a4b6e] leading-normal mb-[10px]">
            Our Approach
          </h2>
          <p className="text-[16px] lg:text-[20px] text-[#0a4b6e] leading-[28px]">
            Simple system. Powerful impact.
          </p>
        </div>

        {/* Cards row */}
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-[20px] lg:gap-0">
          <ApproachCard card={CARDS[0]} />
          <ArrowConnector />
          <ApproachCard card={CARDS[1]} />
          <ArrowConnector />
          <ApproachCard card={CARDS[2]} />
        </div>
      </div>
    </section>
  );
}
