import Image from "next/image";

const MODULES = [
  {
    key: "dsa",
    label: "DSA",
    bg: "/about/platform-dsa-bg.png",
    inner: "/about/platform-dsa-inner.png",
    icon: "/about/platform-dsa-icon.png",
    title: "Digital Site Access",
    subtitle: "Identity, access, and compliance",
    flip: true,
  },
  {
    key: "rtls",
    label: "RTLS",
    bg: "/about/platform-rtls-bg.png",
    inner: "/about/platform-rtls-inner.png",
    icon: "/about/platform-rtls-icon.png",
    title: "Real-Time Location System",
    subtitle: "Movement, safety, and tracking",
    flip: false,
  },
  {
    key: "sms",
    label: "SMS",
    bg: "/about/platform-dsa-bg.png",
    inner: "/about/platform-sms-inner.png",
    icon: "/about/platform-sms-icon.png",
    title: "Site Management System",
    subtitle: "Operations and workflows",
    flip: true,
  },
  {
    key: "hrms",
    label: "HRMS",
    bg: "/about/platform-rtls-bg.png",
    inner: "/about/platform-hrms-inner.png",
    icon: "/about/platform-hrms-icon.png",
    title: "HRMS + Task Management",
    subtitle: "Workforce and performance",
    flip: false,
  },
];

function ModuleCard({ mod }: { mod: (typeof MODULES)[0] }) {
  return (
    <div className="relative rounded-[20px] overflow-hidden w-full min-h-[170px] sm:min-h-[200px] lg:min-h-[246px]">
      {/* Card background */}
      <div
        className={[
          "absolute inset-0 pointer-events-none",
          mod.flip ? "-scale-x-100" : "",
        ].join(" ")}
      >
        <Image
          src={mod.bg}
          alt=""
          fill
          className="object-cover object-center"
          sizes="(max-width: 640px) 50vw, (max-width: 1280px) 45vw, 303px"
        />
      </div>

      {/* Inner 3D illustration — upper portion of card */}
      <div className="absolute right-0 top-0 w-[60%] h-[72%] pointer-events-none">
        <Image
          src={mod.inner}
          alt=""
          fill
          className="object-contain object-right-top"
          sizes="200px"
        />
      </div>

      {/* Content: badge absolute at top, icon + text pushed to bottom */}
      <div className="relative z-10 p-[12px] sm:p-[14px] lg:p-[24px] flex flex-col justify-end h-full min-h-[170px] sm:min-h-[200px] lg:min-h-[246px] gap-[8px] sm:gap-[10px] lg:gap-[20px]">
        {/* Label badge — absolute top-left */}
        <div
          className="absolute top-[12px] left-[13.5px] inline-flex items-center h-[28px] sm:h-[34px] lg:h-[44px] px-[10px] sm:px-[14px] lg:px-[20px] rounded-[80px] border border-white shadow-[4px_7px_26px_0px_rgba(217,226,255,0.1),0px_13px_100px_0px_rgba(199,199,199,0.1)]"
          style={{ background: "rgba(255,255,255,0.14)" }}
        >
          <span className="text-[11px] sm:text-[13px] lg:text-[20px] font-bold text-white leading-none">
            {mod.label}
          </span>
        </div>

        {/* Icon — in flex flow at bottom, above title */}
        <div className="size-[36px] sm:size-[44px] lg:size-[60px] bg-white rounded-[9px] sm:rounded-[11px] lg:rounded-[16px] flex items-center justify-center flex-shrink-0 shadow-[6.25px_3.75px_17.5px_0px_rgba(255,255,255,0.33),2.626px_7.878px_29.177px_0px_rgba(29,108,151,0.2)]">
          <div className="relative size-[20px] sm:size-[26px] lg:size-[34px]">
            <Image
              src={mod.icon}
              alt={mod.label}
              fill
              className="object-contain"
              sizes="34px"
            />
          </div>
        </div>

        {/* Title + subtitle */}
        <div className="flex flex-col gap-[3px] lg:gap-[6px]">
          <p className="text-[10px] sm:text-[12px] lg:text-[20px] font-bold text-white leading-tight">
            {mod.title}
          </p>
          <p className="text-[9px] sm:text-[11px] lg:text-[18px] text-[#eaf3ff] leading-tight lg:leading-[20px]">
            {mod.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VWatchAIPlatform() {
  return (
    <section className="relative z-10 -mt-[46px] rounded-tl-[46px] rounded-tr-[46px] bg-[#19213d] py-[60px] lg:py-[80px] overflow-hidden">
      {/* Section background */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/about/platform-union-bg.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[60px]">
        {/* Section header */}
        <div className="mb-[20px] lg:mb-[30px]">
          <h2 className="text-[22px] lg:text-[26px] font-bold text-white leading-normal mb-[10px]">
            What is V-Watch AI
          </h2>
          <p className="text-[16px] lg:text-[20px] text-white leading-[28px]">
            More than a system a connected platform.
          </p>
        </div>

        {/* Subtitle card */}
        <div
          className="mx-auto w-full max-w-[498px] border border-white rounded-[16px] px-[20px] sm:px-[24px] py-[14px] lg:py-[16px] mb-[20px] lg:mb-[30px] text-center"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(153,153,153,0) 80%), linear-gradient(270deg, rgba(212,240,255,0) 0%, rgba(212,240,255,0.01) 50%, rgba(212,240,255,0) 100%)",
          }}
        >
          <p className="text-[13px] sm:text-[15px] lg:text-[18px] font-bold text-white leading-[22px] sm:leading-[24px]">
            V-Watch Ai is not just an access system, a tracking tool, or a
            workforce solution.{" "}
          </p>
          <p className="text-[13px] sm:text-[15px] lg:text-[18px] font-bold text-[#67d0ff] leading-[22px] sm:leading-[24px]">
            It is a connected platform that integrates.
          </p>
        </div>

        {/* Mobile/tablet grid — 1 col at 320px, 2 col at 375px+ */}
        <div className="grid grid-cols-1 min-[375px]:grid-cols-2 gap-[10px] sm:gap-[12px] xl:hidden">
          {MODULES.map((mod) => (
            <ModuleCard key={mod.key} mod={mod} />
          ))}
        </div>

        {/* Desktop: 3-col with center orbital — xl+ (1280px+) only */}
        <div className="hidden xl:grid grid-cols-[1fr_467px_1fr] gap-[20px] items-center">
          {/* Left column: DSA + SMS */}
          <div className="flex flex-col gap-[20px]">
            <ModuleCard mod={MODULES[0]} />
            <ModuleCard mod={MODULES[2]} />
          </div>

          {/* Center orbital — exact Figma sizes */}
          <div className="relative flex-shrink-0" style={{ width: "467px", height: "467px" }}>
            {/* Outer ring: size 467px, opacity 44% */}
            <div
              className="absolute inset-0 rounded-full border border-[rgba(126,207,250,0.24)]"
              style={{ background: "rgba(255,255,255,0.10)", opacity: 0.44 }}
            />
            {/* Mid ring: offset 63px, size 341px, opacity 77% */}
            <div
              className="absolute rounded-full border border-[rgba(126,207,250,0.20)] backdrop-blur-[3px]"
              style={{
                top: 63, right: 63, bottom: 63, left: 63,
                background: "rgba(255,255,255,0.30)",
                opacity: 0.77,
              }}
            />
            {/* Inner ring: offset 114px, size 239px, opacity 77% */}
            <div
              className="absolute rounded-full border border-[rgba(126,207,250,0.20)] backdrop-blur-[3px]"
              style={{
                top: 114, right: 114, bottom: 114, left: 114,
                background: "rgba(255,255,255,0.70)",
                opacity: 0.77,
              }}
            />
            {/* Center badge: offset ~178.5px, size 110px */}
            <div
              className="absolute flex items-center justify-center rounded-full border-[1.4px] border-white overflow-hidden shadow-[0px_0px_114px_24px_#feffff,0px_14px_24px_0px_rgba(255,255,255,0.7),0px_0px_62px_0px_rgba(29,108,151,0.16)]"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 110,
                height: 110,
                background:
                  "linear-gradient(180deg, #fff 0%, rgba(212,240,255,0.6) 100%)",
              }}
            >
              <div className="flex flex-col items-center justify-center gap-[4px]">
                <div className="relative w-[52px] h-[12px]">
                  <Image
                    src="/industry/challenges/vwatch-logo-mark.svg"
                    alt=""
                    fill
                    className="object-contain"
                    sizes="52px"
                  />
                </div>
                <span className="text-[7px] font-extrabold tracking-[2px] text-[#0686c0] leading-none">
                  V-WATCH
                </span>
              </div>
            </div>
          </div>

          {/* Right column: RTLS + HRMS */}
          <div className="flex flex-col gap-[20px]">
            <ModuleCard mod={MODULES[1]} />
            <ModuleCard mod={MODULES[3]} />
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mx-auto mt-[20px] lg:mt-[30px] w-full max-w-[1016px] border border-[rgba(233,238,255,0.4)] rounded-[30px] min-h-[48px] lg:h-[60px] flex items-center justify-center px-[12px] sm:px-[16px] gap-[10px] sm:gap-[16px]"
          style={{ background: "rgba(255,255,255,0.10)" }}
        >
          <div className="relative w-[60px] sm:w-[100px] lg:w-[150px] h-[11px] flex-shrink-0 hidden sm:block">
            <Image
              src="/about/platform-line-left.png"
              alt=""
              fill
              className="object-contain"
              sizes="150px"
            />
          </div>
          <p className="text-[11px] sm:text-[13px] lg:text-[20px] text-white text-center leading-snug flex-1 py-[10px] sm:py-0">
            Together, these modules create a complete view of your operations
            from entry to execution.
          </p>
          <div className="relative w-[60px] sm:w-[100px] lg:w-[150px] h-[11px] flex-shrink-0 hidden sm:block">
            <Image
              src="/about/platform-line-right.png"
              alt=""
              fill
              className="object-contain"
              sizes="150px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
