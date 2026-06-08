import Image from "next/image";

// "Also used across a wide range of environments" — dark masonry of industry
// image cards (alternating 488 / 608 widths). (Figma node 270:13152)
type Card = { title: string; img: string; size: "sm" | "lg" };

const ROWS: Card[][] = [
  [
    { title: "Data Center", img: "/industry/adapt-datacenter.png", size: "sm" },
    { title: "Manufacturing", img: "/industry/adapt-manufacturing.png", size: "lg" },
  ],
  [
    { title: "Healthcare Facilities", img: "/industry/adapt-healthcare.png", size: "lg" },
    { title: "Infrastructure & Utilities", img: "/industry/adapt-infrastructure.png", size: "sm" },
  ],
  [
    { title: "Logistics & Warehousing", img: "/industry/adapt-logistics.png", size: "sm" },
    { title: "Transportation Hubs (airports, ports, rail)", img: "/industry/adapt-transport.png", size: "lg" },
  ],
];

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" stroke="#9CDCFF" strokeWidth="1.7" />
      <circle cx="12" cy="10" r="2.4" stroke="#9CDCFF" strokeWidth="1.7" />
    </svg>
  );
}

function IndustryCard({ title, img, size }: Readonly<Card>) {
  return (
    <div
      className={`relative h-[280px] overflow-hidden rounded-[24px] ${
        size === "lg" ? "flex-[608_1_0]" : "flex-[488_1_0]"
      }`}
    >
      <Image src={img} alt={title} fill className="object-cover" sizes="608px" />
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
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#0A1A2E_0%,#0C2138_50%,#0A1A2E_100%)] px-6 py-20 lg:px-[60px]">
      <div className="relative mx-auto flex w-full max-w-[1410px] flex-col gap-[30px]">
        <header className="flex max-w-[804px] flex-col gap-2.5 text-white">
          <h2 className="text-[26px] font-extrabold">Also used across a wide range of environments</h2>
          <p className="text-[20px] font-normal leading-[28px]">
            V-Watch Ai is adaptable and scalable making it suitable for any environment where
            operational control matters.
          </p>
        </header>

        <div className="flex flex-col gap-6">
          {ROWS.map((row, i) => (
            <div key={i} className="flex flex-col gap-6 sm:flex-row">
              {row.map((c) => (
                <IndustryCard key={c.title} {...c} />
              ))}
            </div>
          ))}
        </div>

        {/* unifying callout */}
        <div className="mx-auto flex w-full max-w-[1120px] items-center gap-4 rounded-full border border-white/15 bg-white/[0.06] px-6 py-4">
          <span className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-[linear-gradient(180deg,#21B1F1,#A6C936)]">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <p className="text-[20px] font-bold text-white">
            If your operations involve people, movement, and risk. V-Watch Ai is built for you.
          </p>
        </div>
      </div>
    </section>
  );
}
