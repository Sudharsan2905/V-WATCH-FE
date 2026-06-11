import Image from "next/image";

/**
 * Shared "Why teams choose V-Watch Ai" section for the per-industry pages.
 * Design is fixed; all copy + imagery comes from props so each industry route
 * can supply its own content. A left "connects everything" card branches via
 * connector lines into three "not just X — but Y" value rows.
 */
type WhyChooseItem = {
  icon: string;
  title: string;
  desc: string;
  number: string;
};

type WhyChooseContent = {
  heading?: string;
  subheading?: string;
  cardTitle?: string;
  cardLogo?: string;
  cardImage?: string;
  items?: WhyChooseItem[];
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function ConnectCard({
  title,
  logo,
  image,
}: Readonly<{ title: string; logo: string; image: string }>) {
  // Bold the name ("V-Watch AI") above a lighter tail ("connects everything.").
  const ci = title.toLowerCase().indexOf("connects");
  const lead = ci > 0 ? title.slice(0, ci).trim() : title;
  const tail = ci > 0 ? title.slice(ci) : "";
  return (
    <div className="relative mt-12 flex w-full flex-col gap-5 rounded-[24px] border border-white bg-white p-5 pt-10 shadow-[0px_30px_60px_-30px_rgba(20,46,92,0.35),0px_2px_10px_rgba(20,46,92,0.05)] lg:w-[380px]">
      {/* Oversized logo — breaks past the top edge with a soft glow */}
      <Image
        src={logo}
        alt=""
        width={104}
        height={104}
        unoptimized
        className="absolute -top-10 left-5 size-[104px] shrink-0 object-contain drop-shadow-[0_12px_28px_rgba(61,143,214,0.45)]"
      />
      {/* Title */}
      <p className="text-[18px] leading-[23px] text-[#1E3A52]">
        <span className="block font-extrabold">{lead}</span>
        {tail && <span className="block font-medium">{tail}</span>}
      </p>

      {/* Decorative progress line */}
      <div className="relative h-[3px] w-full rounded-full bg-[#E5F0FB]">
        <div className="absolute inset-y-0 left-0 w-[88%] rounded-full bg-gradient-to-r from-[#7AC0F2] to-[#3D8FD6]" />
        <span className="absolute right-[8%] top-1/2 size-2 -translate-y-1/2 rounded-full bg-[#3D8FD6] shadow-[0_0_0_3px_rgba(61,143,214,0.18)]" />
      </div>

      {/* AI visual — caption is baked into the asset */}
      <Image
        src={image}
        alt=""
        width={280}
        height={210}
        unoptimized
        className="h-auto w-full rounded-[16px] object-cover"
      />
    </div>
  );
}

/**
 * Branching connector lines (desktop only), built from the design assets:
 * `top.png` rises from the card-center up to row 1, `down.png` drops from
 * center down to row 3, and a straight dashed line links the middle row.
 */
function Connectors() {
  const base = "/industries/construction/v-watch-ai";
  return (
    <div className="relative hidden h-[252px] min-w-[120px] shrink self-center lg:block lg:flex-1">
      {/* Upper link → row 1 (top half, meeting the center line on the left) */}
      <Image
        src={`${base}/top.png`}
        alt=""
        width={493}
        height={181}
        unoptimized
        className="absolute inset-x-0 top-0 h-1/2 w-full object-fill"
      />
      {/* Lower link → row 3 (bottom half) */}
      <Image
        src={`${base}/down.png`}
        alt=""
        width={486}
        height={184}
        unoptimized
        className="absolute inset-x-0 bottom-0 h-1/2 w-full object-fill"
      />
      {/* Straight link → row 2 */}
      <Image
        src={`${base}/center.png`}
        alt=""
        width={483}
        height={23}
        unoptimized
        className="absolute inset-x-0 top-1/2 h-auto w-full -translate-y-1/2"
      />
    </div>
  );
}

function ValueRow({ item }: Readonly<{ item: WhyChooseItem }>) {
  return (
    <div className="flex items-center gap-4 rounded-[18px] border border-white bg-white px-5 py-4 shadow-[0px_20px_44px_-26px_rgba(20,46,92,0.30),0px_1px_6px_rgba(20,46,92,0.04)]">
      <Image
        src={item.icon}
        alt=""
        width={36}
        height={36}
        unoptimized
        className="size-9 shrink-0 object-contain"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-[16px] font-bold leading-[20px] text-[#0A4B6E]">
          {item.title}
        </p>
        <p className="text-[14px] leading-[19px] text-[#5B7385]">
          {item.desc}
        </p>
      </div>
      <Image
        src={item.number}
        alt=""
        width={56}
        height={40}
        unoptimized
        className="h-9 w-auto shrink-0 object-contain"
      />
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function WhyChoose({
  whyChoose = {},
}: Readonly<{ whyChoose?: WhyChooseContent }> = {}) {
  const {
    heading = "Why teams choose V-Watch Ai",
    subheading = "Most solutions address only one part of the problem.",
    cardTitle = "V-Watch AI connects everything.",
    cardLogo = "/industries/construction/v-watch-ai/vwatch.png",
    cardImage = "/industries/construction/v-watch-ai/AI.png",
    items = [],
  } = whyChoose;

  return (
    <section className="relative z-10 overflow-hidden bg-white px-6 py-16 lg:px-[60px]">
      {/* Full-bleed backdrop — light wash + angled arrow panel on the right.
          object-fill stretches the whole tag shape to span the entire section. */}
      <Image
        src="/industries/construction/v-watch-ai/ai-bg.png"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none select-none object-fill"
      />

      <div className="relative mx-auto flex w-full max-w-[1320px] flex-col gap-10">
        {/* Header */}
        <header className="flex flex-col gap-2">
          <h2 className="text-[28px] font-extrabold leading-[34px] text-[#0A4B6E]">
            {heading}
          </h2>
          <p className="text-[16px] font-normal text-[#3890C0]">{subheading}</p>
        </header>

        {/* Card → connectors → value rows. Card pins left, rows pin right, the
            connectors stretch across the middle so the block spans full width. */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-0">
          <ConnectCard title={cardTitle} logo={cardLogo} image={cardImage} />

          <Connectors />

          <div className="flex w-full shrink-0 flex-col gap-6 lg:w-[540px]">
            {items.map((item) => (
              <ValueRow key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
