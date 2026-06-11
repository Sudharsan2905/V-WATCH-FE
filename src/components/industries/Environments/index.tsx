import Image from "next/image";

/**
 * Shared "Designed for any environment" section for the per-industry pages.
 * Design is fixed; all copy + imagery comes from props so each industry route
 * can supply its own content. A dark network-pattern backdrop holds a 3×2 grid
 * of environment cards (one may be highlighted) above a full-width banner.
 */
type EnvCardData = {
  image: string;
  title: string;
  desc: string;
  active?: boolean;
};

type EnvironmentsContent = {
  heading?: string;
  subtitle?: string;
  cards?: EnvCardData[];
  footerImage?: string;
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function EnvCard({ card }: Readonly<{ card: EnvCardData }>) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-transparent p-3 transition-all duration-300 hover:border-[#3FA7EA] hover:bg-white/[0.03] hover:shadow-[0_0_44px_rgba(63,167,234,0.30)]">
      <Image
        src={card.image}
        alt={card.title}
        width={347}
        height={312}
        unoptimized
        className="h-auto w-full rounded-[14px] object-cover"
      />
      <div className="flex flex-col gap-2 px-1 pb-1">
        <p className="text-[16px] font-bold leading-[21px] text-white">
          {card.title}
        </p>
        <p className="text-[13px] leading-[19px] text-[#8FA6BE]">{card.desc}</p>
      </div>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function Environments({
  environments = {},
}: Readonly<{ environments?: EnvironmentsContent }> = {}) {
  const {
    heading = "Designed for any environment.",
    subtitle = "V-Watch Ai adapts to different types of construction projects wherever workforce coordination, compliance, and site control are critical.",
    cards = [],
    footerImage = "/industries/construction/designed-environment/env-footer.png",
  } = environments;

  return (
    <section className="relative z-10 -mt-8 overflow-hidden rounded-[38px] bg-[#040b14] px-6 py-16 lg:-mt-12 lg:rounded-[50px] lg:px-[60px]">
      {/* Dark network-pattern backdrop */}
      <Image
        src="/industries/construction/designed-environment/env-bg.png"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none select-none object-cover object-top"
      />

      <div className="relative mx-auto flex w-full max-w-[1320px] flex-col gap-10">
        {/* Header */}
        <header className="flex flex-col gap-2.5">
          <h2 className="text-[28px] font-extrabold leading-[34px] text-white">
            {heading}
          </h2>
          <p className="max-w-[640px] text-[16px] leading-[24px] text-[#9DB2C9]">
            {subtitle}
          </p>
        </header>

        {/* 3×2 environment grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <EnvCard key={card.title} card={card} />
          ))}
        </div>

        {/* Full-width summary banner */}
        {footerImage && (
          <Image
            src={footerImage}
            alt=""
            width={1168}
            height={180}
            unoptimized
            className="h-auto w-full rounded-[20px]"
          />
        )}
      </div>
    </section>
  );
}
