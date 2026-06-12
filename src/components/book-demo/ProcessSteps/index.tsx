import { Fragment } from "react";

const STEPS = [
  {
    number: "1",
    icon: "/book-a-demo/icons/review-icon.svg",
    title: "We review your requirements",
    description: "Our team assesses your needs based on your submission.",
  },
  {
    number: "2",
    icon: "/book-a-demo/icons/contacts-icon.svg",
    title: "A consultant contacts you within 24 hours",
    description: "We'll schedule a session at your convenience.",
  },
  {
    number: "3",
    icon: "/book-a-demo/icons/platform-icon.svg",
    title: "You get a guided demo + trial access",
    description: "Explore the platform with support from our team.",
  },
];

const CARD_SHADOW =
  "drop-shadow(0px 8px 28px rgba(10,78,110,0.10)) drop-shadow(0px 1px 4px rgba(10,78,110,0.05))";

// ─── Connector atoms ─────────────────────────────────────────────────────────

function ConnectorPill({ isLast }: { isLast: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center justify-between"
      style={{
        height: 29,
        borderRadius: 52,
        background:
          "linear-gradient(180deg, #21B1F1 0%, #6BADF6 55%, #E7A7FF 100%)",
        boxShadow: "0 3px 12px rgba(33,177,241,0.35)",
        padding: "0 0 0 6px",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/book-a-demo/icons/iconsax-arrow-left4.svg"
        alt=""
        aria-hidden
        width={20}
        height={20}
      />
      <div
        className="flex shrink-0 items-center justify-center rounded-full bg-white"
        style={{
          width: 40,
          height: 40,
          boxShadow: "0px 3.48px 3.48px 0px rgba(92,183,232,0.20)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            isLast
              ? "/book-a-demo/icons/iconsax-tick-circle.svg"
              : "/book-a-demo/icons/iconsax-arrow-right3.svg"
          }
          alt=""
          aria-hidden
          width={24}
          height={24}
          className={isLast ? "-rotate-90 lg:rotate-0" : ""}
        />
      </div>
    </div>
  );
}

// ─── Connectors ───────────────────────────────────────────────────────────────

function DesktopConnector({ isLast }: { isLast: boolean }) {
  return (
    <div className="relative z-20 hidden shrink-0 items-center lg:flex lg:-ml-6 lg:mr-4">
      <ConnectorPill isLast={isLast} />
    </div>
  );
}

function MobileConnector({ isLast }: { isLast: boolean }) {
  return (
    <div className="flex items-center justify-center py-2 lg:hidden">
      <div className={"rotate-90"}>
        <ConnectorPill isLast={isLast} />
      </div>
    </div>
  );
}

// ─── Step card ────────────────────────────────────────────────────────────────

function StepCard({
  number,
  icon,
  title,
  description,
}: (typeof STEPS)[number]) {
  return (
    <div className="flex flex-1 items-center">
      {/* Icon circle straddling the card's left edge */}
      <div
        className="relative z-20 flex shrink-0 items-center justify-center rounded-full bg-white"
        style={{
          width: 48,
          height: 48,
          marginRight: -16,
          boxShadow:
            "0 6px 22px rgba(10,78,110,0.18), 0 1px 4px rgba(10,78,110,0.08)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={icon}
          alt=""
          aria-hidden
          className="h-[26px] w-[26px] object-contain"
        />
      </div>

      {/* Arrow card */}
      <div className="relative z-10 flex-1" style={{ filter: CARD_SHADOW }}>
        {/* Rounded rect body — true border-radius on left corners only */}
        <div
          className="absolute inset-y-0 bg-white"
          style={{ left: 0, right: "17%", borderRadius: "16px 0 0 16px" }}
        />
        {/* Scalable SVG arrow — overlaps body by ~3% to seal the seam */}
        <div className="absolute inset-y-0" style={{ left: "80%", right: 0 }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 200"
            preserveAspectRatio="none"
            aria-hidden
          >
            <polygon points="15,0 100,100 0,220" fill="white" />
          </svg>
        </div>

        {/* Desktop number: absolutely positioned, ~50% above card top edge */}
        <span
          aria-hidden
          className="pointer-events-none hidden select-none font-black leading-none lg:absolute lg:block lg:z-30"
          style={{
            fontSize: "clamp(40px, 3.5vw, 60px)",
            color: "rgba(172,212,238,0.65)",
            top: -28,
            left: 44,
          }}
        >
          {number}
        </span>

        {/* Content — drives the outer div height */}
        <div
          className="relative pb-4 pt-3.5 lg:pt-6"
          style={{ paddingLeft: 36, paddingRight: "22%", zIndex: 2 }}
        >
          {/* Mobile: number left + text right (hidden on desktop) */}
          <div className="flex items-start gap-3 lg:hidden">
            <span
              className="shrink-0 select-none font-black leading-none"
              style={{ fontSize: 42, color: "rgba(172,212,238,0.65)" }}
            >
              {number}
            </span>
            <div className="flex flex-col gap-0.5 pt-1">
              <h3 className="text-[13px] font-bold font-[700] leading-tight text-[#0A4B6E]">
                {title}
              </h3>
              <p className="text-[11px] font-normal leading-snug text-[#0A4B6E]">
                {description}
              </p>
            </div>
          </div>

          {/* Desktop: text only — number is the absolute span above */}
          <div className="hidden lg:flex lg:flex-col lg:gap-0.5">
            <h3 className="text-[13px] font-bold font-[700] leading-tight text-[#0A4B6E] sm:text-[14px]">
              {title}
            </h3>
            <p className="text-[11px] font-normal leading-snug text-[#0A4B6E] sm:text-[12px]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ProcessSteps() {
  return (
    <section
      className="sm:py-6"
      style={{
        background:
          "linear-gradient(180deg, #EBF5FF 0%, #F2F8FE 55%, #FFFFFF 100%)",
      }}
    >
      <div className="mx-auto max-w-[1280px] px-6">
        {/* Heading */}
        <div className="mb-14 sm:mb-10">
          <h2 className="mb-3 text-[28px] font-black text-[#0D1F35] sm:text-[32px] lg:text-[34px]">
            What happens next
          </h2>
          <p className="text-[15px] font-normal text-[#0A4B6E] sm:text-[16px]">
            Once you submit your requirements, we take care of the rest.
          </p>
        </div>

        {/* Steps row */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-0 my-10">
          {STEPS.map((step, i) => (
            <Fragment key={step.number}>
              <StepCard {...step} />
              <DesktopConnector isLast={i === STEPS.length - 1} />
              <MobileConnector isLast={i === STEPS.length - 1} />
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
