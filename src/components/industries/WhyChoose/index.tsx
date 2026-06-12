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
  // Bold the product name ("V-Watch AI") above a lighter tail
  // ("connects everything." / "provides complete awareness.").
  const split = title.match(/^(.*?\bAI\b)\s*(.*)$/i);
  const lead = split ? split[1] : title;
  const tail = split ? split[2] : "";
  return (
    <div className="relative flex w-full flex-col gap-4 rounded-[24px] border border-[#E6EAF0] bg-white p-4 shadow-[0px_30px_60px_-30px_rgba(20,46,92,0.35),0px_2px_10px_rgba(20,46,92,0.05)] lg:w-[380px]">
      {/* Logo badge — floats OUT past the card's top-left corner. The card has
          no overflow-hidden, so its rounded corners stay intact while the badge
          is NOT clipped. A white ring sits behind the metallic V-WATCH badge. */}
      <div className="absolute -left-4 -top-4 z-20 flex size-[72px] items-center justify-center rounded-full border border-[#E6EAF0] bg-white shadow-[0_10px_24px_-8px_rgba(61,143,214,0.45)]">
        <div className="relative flex size-[58px] items-center justify-center overflow-hidden rounded-full">
          <Image
            src={logo}
            alt=""
            width={58}
            height={58}
            unoptimized
            className="absolute inset-0 size-full object-cover"
          />
          <Image
            src="/industries/construction/v-watch-ai/logo.png"
            alt="V-Watch"
            width={44}
            height={14}
            unoptimized
            className="relative z-10 w-full object-contain"
          />
        </div>
      </div>

      {/* Title — left-padded so it clears the overflowing badge */}
      <div className="pl-[66px] pt-1">
        <p className="text-[18px] leading-[23px] text-[#1E3A52]">
          <span className="block font-extrabold">{lead}</span>
          {tail && (
            <span className="block font-medium text-[#3890C0]">{tail}</span>
          )}
        </p>
      </div>

      {/* Blue connector line + end dot — aligned to the lower title line,
          running out to the card's right edge. */}
      <span className="pointer-events-none absolute right-2 top-[70px] flex items-center">
        <span className="h-[2px] w-[200px] rounded-full bg-gradient-to-r from-[#C6E3F8] to-[#3D8FD6]" />
        <span className=" size-2.5 rounded-full bg-[#3D8FD6] " />
      </span>

      {/* AI visual — the glassmorphism caption overlay is baked into the asset */}
      <Image
        src={image}
        alt=""
        width={370}
        height={305}
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
    <div className="relative hidden self-stretch lg:block lg:w-[170px]">
      {/* Upper link → row 1 (top half, meeting the center line on the left).
          The lines extend ~56px past the right edge so their dashed ends tuck
          under the value cards — a clean connection independent of width. */}
      <Image
        src={`${base}/top.png`}
        alt=""
        width={493}
        height={181}
        unoptimized
        className="absolute left-0 top-0 h-1/2 w-[calc(100%+10px)] object-fill"
      />
      {/* Lower link → row 3 (bottom half) */}
      <Image
        src={`${base}/down.png`}
        alt=""
        width={486}
        height={184}
        unoptimized
        className="absolute bottom-0 left-0 h-1/2 w-[calc(100%+10px)] object-fill"
      />
      {/* Straight link → row 2 */}
      <Image
        src={`${base}/center.png`}
        alt=""
        width={483}
        height={23}
        unoptimized
        className="absolute left-0 top-1/2 h-auto w-[calc(100%+10px)] -translate-y-1/2"
      />
    </div>
  );
}

function ValueRow({ item }: Readonly<{ item: WhyChooseItem }>) {
  return (
    <div className="flex items-center gap-4 rounded-[18px] border border-white  px-5 py-4 shadow-[0px_20px_44px_-26px_rgba(20,46,92,0.30),0px_1px_6px_rgba(20,46,92,0.04)]">
      <div className="border border-white rounded-[10px] p-2">
      <Image
        src={item.icon}
        alt=""
        width={36}
        height={36}
        unoptimized
        className="size-9 shrink-0 object-contain"
      />
      </div>
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

          {/* Connectors stretch to exactly the value-rows column height so the
              top branch meets row 1, the centre line meets row 2, and the
              bottom branch meets row 3 — regardless of row content height. */}
          <div className="flex w-full flex-col gap-8 lg:w-auto lg:flex-1 lg:flex-row lg:items-stretch lg:gap-0">
            <Connectors />

            <div className="flex w-full flex-col justify-between gap-6 lg:flex-1">
              {items.map((item) => (
                <ValueRow key={item.title} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
