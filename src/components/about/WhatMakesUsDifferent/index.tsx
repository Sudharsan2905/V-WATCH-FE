import Image from "next/image";

const FEATURE_CARDS = [
  {
    key: "unified",
    bgIcon: "/about/diff-icon-discovery-bg.png",
    icon: "/about/diff-icon-discovery-icon.png",
    borderColor: "#d4f0ff",
    title: "A Unified System Not Separate Tools",
    body: "All critical functions are connected in one platform.",
  },
  {
    key: "realtime",
    bgIcon: "/about/diff-icon-clock-bg.png",
    icon: "/about/diff-icon-clock-icon.png",
    borderColor: "#ff759f",
    title: "Real-Time Visibility Across Operations",
    body: "From access to movement to execution everything is tracked live.",
  },
  {
    key: "scale",
    bgIcon: "/about/diff-icon-activity-bg.png",
    icon: "/about/diff-icon-activity-icon.png",
    borderColor: "#bc94ff",
    title: "Built for Scale and Complexity",
    body: "Designed to support large workforces, multiple stakeholders, and high-activity environments.",
  },
  {
    key: "proof",
    bgIcon: "/about/diff-icon-tick-bg.png",
    icon: "/about/diff-icon-tick-icon.png",
    borderColor: "#9bf763",
    title: "Proof-Driven, Not Assumption-Based",
    body: "Every action is backed by data — providing clear, verifiable insights.",
  },
];

function FeatureCard({ card }: { card: (typeof FEATURE_CARDS)[0] }) {
  return (
    <div className="bg-white rounded-[22px] p-[18px] lg:p-[20px] shadow-[0px_4px_24px_rgba(10,75,110,0.07)] flex flex-col gap-[12px] lg:gap-[14px]">
      {/* Icon */}
      <div
        className="relative size-[56px] lg:size-[60px] rounded-[70px] border-2 flex items-center justify-center flex-shrink-0 overflow-hidden"
        style={{ borderColor: card.borderColor }}
      >
        <div className="absolute inset-0">
          <Image
            src={card.bgIcon}
            alt=""
            fill
            className="object-cover"
            sizes="60px"
          />
        </div>
        <div className="relative z-10 size-[28px] lg:size-[30px]">
          <Image
            src={card.icon}
            alt=""
            fill
            className="object-contain"
            sizes="30px"
          />
        </div>
      </div>
      {/* Text */}
      <div>
        <h4 className="font-bold text-[15px] lg:text-[18px] text-[#0f172a] mb-[6px] leading-[22px]">
          {card.title}
        </h4>
        <p className="text-[13px] lg:text-[16px] text-[#314158] leading-[22px] lg:leading-[24px]">
          {card.body}
        </p>
      </div>
    </div>
  );
}

export default function WhatMakesUsDifferent() {
  return (
    <section className="relative z-10 bg-white py-[40px] lg:py-[60px]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[60px]">
        {/* Row 1: large dark card + first feature card */}
        <div className="flex flex-col lg:flex-row items-stretch gap-[16px] lg:gap-[24px] mb-[16px] lg:mb-[24px]">
          {/* Large dark card — CSS background avoids Next.js Image stacking issues */}
          <div
            className="relative flex-1 min-h-[170px] lg:min-h-[194px] rounded-[22px] overflow-hidden"
            style={{
              backgroundImage: "url('/about/diff-card-bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* AI overlay — mix-blend-lighten */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-lighten"
              style={{
                backgroundImage: "url('/about/diff-card-overlay.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            {/* Sparkle */}
            <div className="absolute top-[16px] right-[20px] size-[28px] pointer-events-none">
              <Image
                src="/about/diff-card-sparkle.png"
                alt=""
                fill
                className="object-contain"
                sizes="28px"
              />
            </div>
            {/* Content */}
            <div className="relative z-10 p-[20px] lg:p-[24px] h-full flex flex-col justify-start min-h-[170px] lg:min-h-[194px]">
              <h3 className="text-[20px] lg:text-[24px] font-bold text-white leading-tight">
                What make us different
              </h3>
            </div>
          </div>

          {/* First feature card */}
          <div className="w-full lg:w-[367px] flex-shrink-0">
            <FeatureCard card={FEATURE_CARDS[0]} />
          </div>
        </div>

        {/* Row 2: 3 feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] lg:gap-[24px]">
          {FEATURE_CARDS.slice(1).map((card) => (
            <FeatureCard key={card.key} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
