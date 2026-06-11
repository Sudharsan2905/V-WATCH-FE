import Image from "next/image";
import ViewAllUseCases from "@/components/common/ViewAllUseCases";

/**
 * Shared "solve critical challenges" use-case gallery for the per-industry
 * pages. Design is fixed; copy + imagery come from props. Each card is a framed
 * photo with the title/description overlaid over a bottom gradient.
 */
type UseCaseCard = { image: string; title: string; desc: string };

type UseCasesContent = {
  heading?: string;
  subtitle?: string;
  ctaHref?: string;
  cards?: UseCaseCard[];
};

function Card({ image, title, desc }: Readonly<UseCaseCard>) {
  return (
    <div className="rounded-[20px] bg-white p-1.5 shadow-[0px_30px_50px_-30px_rgba(20,46,92,0.35)]">
      <div className="relative aspect-[256/282] overflow-hidden rounded-[15px]">
        <Image src={image} alt="" fill sizes="(max-width:1024px) 50vw, 23vw" className="object-cover" />
        {/* Bottom darkening for legible text */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,20,35,0.9)] via-[rgba(8,20,35,0.28)] to-transparent" />
        {/* Overlaid copy */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-4 backdrop-blur-[4px]">
          <p className="text-[17px] font-bold leading-[21px] text-white">{title}</p>
          <p className="text-[13px] leading-[18px] text-white/85">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function UseCases({
  useCases = {},
}: Readonly<{ useCases?: UseCasesContent }> = {}) {
  const {
    heading = "Solve critical challenges",
    subtitle = "",
    ctaHref = "#",
    cards = [],
  } = useCases;

  return (
    <section
      className="relative z-10 -mt-8 overflow-hidden rounded-t-[38px] px-6 py-16 lg:-mt-12 lg:rounded-t-[50px] lg:px-[60px]"
      style={{
        background: "linear-gradient(160deg, #E8F3FD 0%, #F5FAF2 100%)",
      }}
    >
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-10">
        {/* Header — copy left, CTA right */}
        <header className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          <div className="flex max-w-[680px] flex-col gap-2.5">
            <h2 className="text-[28px] font-extrabold leading-[34px] text-[#0A4B6E]">
              {heading}
            </h2>
            <p className="text-[16px] leading-[24px] text-[#3E6079]">{subtitle}</p>
          </div>
          <ViewAllUseCases href={ctaHref} className="shrink-0" />
        </header>

        {/* Card gallery */}
        {cards.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c) => (
              <Card key={c.title} {...c} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
