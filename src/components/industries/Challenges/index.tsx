import Image from "next/image";

/**
 * Shared "site complexity / the result" section for the per-industry pages.
 * Design is fixed; all copy + imagery comes from props so each industry route
 * can supply its own content. Icons and photos are passed as asset paths.
 */
type Feature = { icon: string; title: string };

type ChallengesContent = {
  heading?: string;
  subheading?: string;
  features?: Feature[];
  summary?: string;
  resultLabel?: string;
  results?: string[];
  callout?: string;
  calloutIcon?: string;
  images?: string[];
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[]">
      <svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-3.5">
        <path
          d="M3.5 8.2 6.5 11l6-6.5"
          stroke="#36B37E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function FeatureCard({ icon, title }: Readonly<Feature>) {
  return (
     <div
      className="relative flex min-h-[180px] flex-col gap-6 rounded-[30px] px-10 py-8"
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #FCFAFB 100%)",
        boxShadow: `
          inset 0 0 0 1px rgba(255,238,233,0.9),
          inset 0 0 22px 6px rgba(255,224,217,0.55),
          inset 0 1px 0 rgba(255,255,255,0.9),
          0 24px 48px rgba(15,23,42,0.05)
        `,
      }}
    >
      <Image
        src={icon}
        alt=""
        width={42}
        height={42}
        unoptimized
        className="size-[42px] object-contain"
      />
      <p className="text-[18px] font-bold leading-[24px] text-[#1E293B]">
        {title}
      </p>
    </div>
  );
}

function CollageImg({
  src,
  w,
  h,
  className,
}: Readonly<{ src: string; w: number; h: number; className?: string }>) {
  // The SVGs already carry rounded corners; render at natural aspect ratio.
  return (
    <Image
      src={src}
      alt=""
      width={w}
      height={h}
      unoptimized
      className={`h-auto ${className ?? ""}`}
    />
  );
}

function DotGrid({ className }: Readonly<{ className?: string }>) {
  return (
    <div
      className={`pointer-events-none ${className ?? ""}`}
      style={{
        width: 112,
        height: 38,
        backgroundImage: "radial-gradient(#A9C9DE 1.3px, transparent 1.4px)",
        backgroundSize: "12px 11px",
        opacity: 0.7,
      }}
    />
  );
}

function CalloutPill({ text, icon }: Readonly<{ text: string; icon: string }>) {
  return (
    <div className="flex items-center gap-3 rounded-[10px] border border-white/60 bg-white/40 px-4 py-3 shadow-[0px_16px_44px_rgba(120,170,205,0.30)] backdrop-blur-xl">
      <Image
        src={icon}
        alt=""
        width={34}
        height={58}
        unoptimized
        className="shrink-0 drop-shadow-[0_8px_18px_rgba(120,170,205,0.35)]"
      />
      <p className="text-[14px] font-bold leading-[20px] text-[#1B3A57]">
        {text}
      </p>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function Challenges({
  challenges = {},
}: Readonly<{ challenges?: ChallengesContent }> = {}) {
  const {
    heading = "Sites are complex and difficult to control",
    subheading = "Every project involves multiple moving parts",
    features = [],
    summary = "But most sites still rely on manual processes and disconnected systems.",
    resultLabel = "The Result",
    results = [],
    callout = "When visibility is incomplete, risks increase and control is lost.",
    calloutIcon = "/industries/construction/sites/grow-light.svg",
    images = [],
  } = challenges;

  const [aerial, worker, lower, crane] = images;

  return (
    <section className="relative z-10 overflow-hidden bg-[#f5fbff] px-6 py-16 lg:px-[60px]">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-8">
        {/* Full-width header */}
        <header className="flex flex-col gap-2.5">
          <h2 className="text-[28px] font-extrabold leading-[34px] text-[#0A4B6E]">
            {heading}
          </h2>
          <p className="text-[18px] font-normal text-[#3890C0]">{subheading}</p>
        </header>

        {/* Two columns */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Left column — features + result list */}
          <div className="flex w-full flex-col gap-7 lg:flex-1">
            {features.length > 0 && (
              <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Cross divider centred in the gaps (2×2 grid only) */}
                <div className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
                  {/* Vertical divider — top row pair */}
                  <div
                    className="absolute left-1/2 top-1 h-[calc(50%-12px)] w-px -translate-x-1/2"
                    style={{ background: "rgba(255, 147, 132, 0.4" }}
                  />
                  {/* Vertical divider — bottom row pair */}
                  <div
                    className="absolute bottom-1 left-1/2 h-[calc(50%-12px)] w-px -translate-x-1/2"
                    style={{ background: "rgba(255, 147, 132, 0.4" }}
                  />
                  {/* Horizontal divider — left column pair */}
                  <div
                    className="absolute left-1 top-1/2 h-px w-[calc(50%-12px)] -translate-y-1/2"
                    style={{ background: "rgba(255, 147, 132, 0.4)" }}
                  />
                  {/* Horizontal divider — right column pair */}
                  <div
                    className="absolute right-1 top-1/2 h-px w-[calc(50%-12px)] -translate-y-1/2"
                    style={{ background: "rgba(255, 147, 132, 0.4" }}
                  />
                </div>
                {features.map((f) => (
                  <FeatureCard key={f.title} {...f} />
                ))}
              </div>
            )}

            <p className="text-[16px] font-bold text-[#0A4B6E]">{summary}</p>

            <div className="flex flex-col gap-3">
              <p className="text-[13px] font-bold uppercase tracking-[1.5px] text-[#36B37E]">
                {resultLabel}
              </p>
              <ul className="flex flex-col gap-2.5">
                {results.map((r) => (
                  <li key={r} className="flex items-start gap-2.5">
                    <Image src="/industries/construction/checkicon.svg" width={24} height={24} alt="Check" />
                    <span className="text-[15px] leading-[20px] text-[#314158]">
                      {r}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column — staggered photo collage + decorations + callout */}
          <div className="relative w-full shrink-0 lg:w-[540px]">
            {/* Decorative dot grid, top-left above the aerial shot */}
            <DotGrid className="absolute left-2 top-0 z-10 hidden lg:block" />

            {images.length >= 4 && (
              <div className="mx-auto flex max-w-[500px] gap-3 sm:gap-4 lg:mx-0 lg:max-w-none">
                {/* Left sub-column — pushed down so the worker shot rises above it.
                    Fluid widths (%) so the collage scales on every screen. */}
                <div className="flex w-[44%] flex-col items-start gap-3 pt-8 sm:gap-4 sm:pt-12">
                  <CollageImg src={aerial} w={210} h={297} className="w-full" />
                  <CollageImg src={lower} w={175} h={224} className="w-[83%] ml-11" />
                </div>
                {/* Right sub-column — the worker/hologram anchor */}
                <div className="flex w-[56%] flex-col items-end gap-3 sm:gap-4">
                  <CollageImg src={worker} w={270} h={366} className="w-full mr-1" />
                  <CollageImg src={crane} w={210} h={278} className="w-[78%] mr-12" />
                </div>
              </div>
            )}

            {/* Floating callout — overlaps the lower-left of the collage,
                extending right over the crane (matches Figma). */}
            {callout && (
              <div className="mt-5 lg:absolute lg:bottom-[50px] lg:mt-0 lg:max-w-[340px]">
                <CalloutPill text={callout} icon={calloutIcon} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
