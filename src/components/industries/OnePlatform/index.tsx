import Image from "next/image";

/**
 * Shared "one platform to manage your entire site" section for the per-industry
 * pages. Design is fixed; all copy + imagery come from props.
 */
type Feature = { icon: string; title: string; desc: string; active?: boolean };
type Allow = { badge: string; title: string };

type OnePlatformContent = {
  heading?: string;
  subtitle?: string;
  skylineImage?: string;
  features?: Feature[];
  allowsLabel?: string;
  allows?: Allow[];
  platformImage?: string;
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function FeatureRow({ icon, title, desc, active }: Readonly<Feature>) {
  return (
    <div
      className={`flex items-start gap-4 rounded-[16px] px-4 py-4 transition-colors ${
        active ? "border border-white" : ""
      }`}
      style={
        active
          ? {
              background:
                "linear-gradient(180deg, rgba(233,244,255,0.8) 0%, rgba(255,255,255,0.7) 100%)",
              boxShadow: "0px 16px 36px -16px rgba(20,46,92,0.18)",
            }
          : undefined
      }
    >
      <Image
        src={icon}
        alt=""
        width={37}
        height={36}
        unoptimized
        className={`mt-0.5 size-9 shrink-0 object-contain ${active ? "" : "opacity-45"}`}
      />
      <div className="flex flex-col gap-1.5">
        <p
          className={`text-[16px] font-bold leading-tight ${
            active ? "text-[#0A4B6E]" : "text-[#9AA7B8]"
          }`}
        >
          {title}
        </p>
        <p
          className={`text-[14px] leading-[20px] ${
            active ? "text-[#475569]" : "text-[#B6C0CE]"
          }`}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}

function AllowCard({ badge, title }: Readonly<Allow>) {
  return (
    <div className="flex flex-col gap-3 rounded-[16px] border border-[#EAF1F8] bg-white px-4 py-4 shadow-[0px_10px_30px_-18px_rgba(20,46,92,0.25)]">
      <Image
        src={badge}
        alt=""
        width={33}
        height={33}
        unoptimized
        className="size-[33px] object-contain"
      />
      <p className="text-[15px] font-bold leading-[20px] text-[#314158]">
        {title}
      </p>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function OnePlatform({
  onePlatform = {},
}: Readonly<{ onePlatform?: OnePlatformContent }> = {}) {
  const {
    heading = "One platform to manage your entire site",
    subtitle = "",
    skylineImage = "",
    features = [],
    allowsLabel = "It allows you to",
    allows = [],
    platformImage = "",
  } = onePlatform;

  return (
    <section className="relative z-10 overflow-hidden bg-[#f5fbff] px-6 py-16 lg:px-[60px]">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-12">
        {/* Full-width header */}
        <header className="flex flex-col gap-2.5">
          <h2 className="text-[28px] font-extrabold leading-[34px] text-[#0A4B6E]">
            {heading}
          </h2>
          <p className="max-w-[760px] text-[16px] leading-[24px] text-[#3E6079]">
            {subtitle}
          </p>
        </header>

        {/* Two columns */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-14">
          {/* Left column — skyline + feature list */}
          <div className="flex w-full flex-col gap-8 lg:w-[44%]">
            {skylineImage && (
              <div className="relative flex items-center justify-center">
                {/* Soft dome glow behind the skyline */}
                <div
                  className="pointer-events-none absolute inset-0 -z-0"
                  style={{
                    filter: "blur(8px)",
                  }}
                />
                <Image
                  src={skylineImage}
                  alt=""
                  width={548}
                  height={330}
                  unoptimized
                  className="relative z-10 h-auto w-full max-w-[520px]"
                />
              </div>
            )}

            <div className="flex flex-col gap-2">
              {features.map((f) => (
                <FeatureRow key={f.title} {...f} />
              ))}
            </div>
          </div>

          {/* Right column — "it allows you to" cards + platform image */}
          <div className="flex w-full flex-col gap-7 lg:flex-1">
            <div className="flex flex-col gap-4">
              <p className="text-[14px] font-bold text-[#64748B]">{allowsLabel}</p>
              {allows.length > 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {allows.map((a) => (
                    <AllowCard key={a.title} {...a} />
                  ))}
                </div>
              )}
            </div>

            {platformImage && (
              <Image
                src={platformImage}
                alt=""
                width={703}
                height={510}
                unoptimized
                className="h-auto w-full rounded-[20px]"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
