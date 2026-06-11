import Image from "next/image";

// "Also used across a wide range of environments" — dark masonry of industry
// image cards (alternating 488 / 608 widths). (Figma node 270:13152)
type Card = { title: string; img: string; size: "sm" | "lg" };

const ROWS: Card[][] = [
  [
    { title: "Data Center", img: "/industry/adapt-datacenter.png", size: "sm" },
    {
      title: "Manufacturing",
      img: "/industry/adapt-manufacturing.png",
      size: "lg",
    },
  ],
  [
    {
      title: "Healthcare Facilities",
      img: "/industry/adapt-healthcare.png",
      size: "lg",
    },
    {
      title: "Infrastructure & Utilities",
      img: "/industry/adapt-infrastructure.png",
      size: "sm",
    },
  ],
  [
    {
      title: "Logistics & Warehousing",
      img: "/industry/adapt-logistics.png",
      size: "sm",
    },
    {
      title: "Transportation Hubs (airports, ports, rail)",
      img: "/industry/adapt-transport.png",
      size: "lg",
    },
  ],
];

function PinIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"
        stroke="#9CDCFF"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="10" r="2.4" stroke="#9CDCFF" strokeWidth="1.7" />
    </svg>
  );
}

function IndustryCard({ title, img, size }: Readonly<Card>) {
  return (
    <div
      className={`relative h-[280px] w-full overflow-hidden rounded-[24px] sm:w-auto ${
        // flex-basis:0 only on sm+ (row axis = width). On mobile the cards are a
        // column, where flex-basis:0 would zero their HEIGHT — so keep w-full.
        size === "lg" ? "sm:flex-[608_1_0]" : "sm:flex-[488_1_0]"
      }`}
    >
      <Image
        src={img}
        alt={title}
        fill
        className="object-cover"
        sizes="608px"
      />
      <div className="absolute inset-x-0 bottom-0 h-[100px] bg-gradient-to-t from-black/85 to-transparent" />
      <div className="absolute bottom-5 left-5 flex items-center gap-2.5">
        <PinIcon />
        <p className="text-[20px] font-bold text-white">{title}</p>
      </div>
    </div>
  );
}

export default function Adaptable() {
  return (
    <section className="relative overflow-hidden px-6 pt-[21em] pb-24 lg:px-[60px]">
      <div className="relative mx-auto flex w-full max-w-[1410px] flex-col gap-[30px]">
        <header className="flex max-w-[804px] flex-col gap-2.5 text-white">
          <h2 className="text-[26px] font-extrabold">
            Also used across a wide range of environments
          </h2>
          <p className="text-[20px] font-normal leading-[28px]">
            V-Watch Ai is adaptable and scalable making it suitable for any
            environment where operational control matters.
          </p>
        </header>

        <div className="flex flex-col gap-6">
          {ROWS.map((row) => (
            <div key={row[0].title} className="flex flex-col gap-6 sm:flex-row">
              {row.map((c) => (
                <IndustryCard key={c.title} {...c} />
              ))}
            </div>
          ))}
        </div>

        {/* unifying callout */}
        <div
          className="relative mx-auto flex w-full max-w-[1120px] flex-col items-center gap-4 overflow-hidden rounded-3xl p-6 text-center sm:flex-row sm:gap-0 sm:p-0 sm:text-left"
          style={{
            background: "linear-gradient(180deg, #EFF9FF 0%, white 100%)",
            boxShadow:
              "-4px -4px 10px rgba(255, 255, 255, 0.24), 0px 14px 14px rgba(193, 236, 255, 0.10)",
            outline: "1px solid white",
            outlineOffset: "-1px",
          }}
        >
          {/* large blue glow — upper-right */}
          <div
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              width: 610,
              height: 148,
              left: 602,
              top: -8,
              opacity: 0.5,
              background: "#0A8EC8",
              borderRadius: 9999,
              filter: "blur(126.3px)",
            }}
          />
          {/* small blue glow — far right */}
          <div
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              width: 104,
              height: 104,
              left: 992,
              top: 34,
              background: "#3890C0",
              borderRadius: 9999,
              filter: "blur(39px)",
            }}
          />

          {/* left: V-Watch logo mark */}
          <div className="relative z-10 shrink-0">
            <Image
              src="/industry/callout-logo-rounded.png"
              alt="V-Watch AI"
              width={140}
              height={99}
              className="block"
            />
          </div>

          {/* centre: headline */}
          <p
            className="relative z-10 flex-1 text-[18px] font-bold leading-7 sm:text-[20px] sm:leading-8"
            style={{ color: "#0F172B" }}
          >
            If your operations involve people, movement, and risk. V-Watch Ai is
            built for you.
          </p>

          {/* right: city-map + robot illustration */}
          <div className="relative z-10 w-full shrink-0 sm:w-auto sm:self-stretch sm:pr-[10px]">
            <Image
              src="/industry/callout-illustration.svg"
              alt=""
              width={274}
              height={132}
              className="mx-auto h-auto w-full max-w-[274px] sm:mx-0 sm:h-full sm:w-auto sm:object-contain sm:object-right"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}
