const FEATURES = [
  {
    icon: "/book-a-demo/icons/industry-walkthrough-icon.svg",
    text: "A walkthrough tailored to your industry and use case",
  },
  {
    icon: "/book-a-demo/icons/operational-recommendations-icon.svg",
    text: "Recommendations based on your operational needs",
  },
  {
    icon: "/book-a-demo/icons/feature-exploration-icon.svg",
    text: "A chance to explore features with your team",
  },
  {
    icon: "/book-a-demo/icons/platform-visibility-icon.svg",
    text: "A clear view of how the platform works end-to-end",
  },
];

function FeatureCard({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="relative">
      {/* Outside accent */}
      <span className="absolute -left-1.5 top-6 h-10 w-2.5 rounded-r-full bg-[#0A8EC8] rotate-180" />

      {/* Card */}
      <div className="relative z-0 lg:max-w-[412px] items-center flex flex-row gap-[14px] rounded-[24px] border border-[#E8EEF6] bg-white px-5 py-3.5 shadow-[0_4px_10px_0_rgba(126,207,250,0.40)] lg:flex-col lg:items-start">
        <div className="flex h-11 w-11 items-center justify-center">
          <img
            src={icon}
            alt=""
            aria-hidden
            className="h-10 w-10 object-contain"
          />
        </div>

        <p className="text-[16px] font-lato font-[400] leading-relaxed text-[#0A4B6E] sm:text-[16px] lg:text-[18px]">
          {text}
        </p>
      </div>
    </div>
  );
}

export default function ExpectSection() {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-lato text-[26px] font-bold leading-[100%] tracking-[0] text-[#0A4B6E]">
        What to expect from your demo
      </h2>

      <div className="flex flex-col gap-5">
        {FEATURES.map((f) => (
          <FeatureCard key={f.text} {...f} />
        ))}
      </div>

      <div className="mt-1">
        <p className="font-lato font-[700] text-[20px] font-bold text-[#0A8EC8]">
          No commitment
        </p>
        <p className="font-lato font-[400] text-[18px] font-regular text-[#21293A]">
          Just a clear understanding of what&apos;s possible.
        </p>
      </div>
    </div>
  );
}
