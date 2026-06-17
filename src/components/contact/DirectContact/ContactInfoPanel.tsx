import Image from "next/image";

type Tile = {
  icon: string;
  label: string;
  value: React.ReactNode;
  href?: string;
};

const TILES: Tile[] = [
  {
    icon: "/contact/direct/icons/mail.svg",
    label: "Email",
    value: "support@vwatch.ai",
    href: "mailto:support@vwatch.ai",
  },
  {
    icon: "/contact/direct/icons/phone.svg",
    label: "Phone",
    value: "+60 XX-XXXX XXX",
    href: "tel:+60",
  },
  {
    icon: "/contact/direct/icons/location.svg",
    label: "Office",
    value: (
      <>
        Surveillance &amp; Communication Sdn Bhd),
        <br />
        No 17, Jalan Ekoperniagaan, 2/6Taman
        <br />
        Ekoperniagaan, Johor Bahru, Malaysia - 81100
      </>
    ),
  },
];

const PANEL_BG =
  "linear-gradient(0deg, #004870, #004870), radial-gradient(38.35% 93.72% at 18.31% 6.28%, rgba(139,214,255,0.8) 0%, rgba(33,154,221,0.8) 100%), linear-gradient(100.5deg, rgba(14,178,250,0.4) 29.55%, rgba(135,218,254,0.4) 93.8%)";

type TileProps = Tile & { isTall?: boolean };

function TileContent({ icon, label, value, isTall }: Readonly<TileProps>) {
  const align = isTall ? "items-start" : "items-center";
  return (
    <div
      className={`relative flex w-full ${align} gap-3 rounded-[16px] p-2 shadow-[inset_-4px_-4px_6px_rgba(255,255,255,0.1)] transition-colors hover:brightness-110 lg:w-[490px] ${isTall ? "lg:h-[106px]" : "lg:h-[64px]"}`}
      style={{
        background:
          "linear-gradient(92.69deg, rgba(255,255,255,0.03) 6.01%, rgba(255,255,255,0.07) 90.83%)",
      }}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-white/20">
        <Image
          src={icon}
          alt=""
          width={26}
          height={26}
          unoptimized
          className="h-[26px] w-[26px] object-contain"
        />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-[16px] font-bold leading-[20px] text-white">{label}</p>
        <p className="text-[16px] font-normal leading-[20px] text-white/90">
          {value}
        </p>
      </div>
      <span className="flex h-[25px] w-[25px] shrink-0 items-center justify-center">
        <Image
          src="/contact/direct/icons/span.button.svg"
          alt=""
          width={25}
          height={25}
          unoptimized
          className="h-[25px] w-[25px] object-contain"
        />
      </span>
    </div>
  );
}

export default function ContactInfoPanel() {
  return (
    <div
      className="relative overflow-hidden rounded-[32px] px-6 py-10 sm:px-10 lg:h-[350px] lg:px-10 lg:pb-20 lg:pt-10"
      style={{ background: PANEL_BG }}
    >
      {/* Decorative wave-line pattern (SVG includes its own panel gradient + waves) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/contact/direct/wave-pattern.svg')",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />

      {/* Tiles — stacked vertically; left side of panel so form sits beside them on lg */}
      <div className="relative z-10 flex max-w-full flex-col gap-5 lg:max-w-[490px]">
        {TILES.map((t) => {
          const isTall = t.label === "Office";
          return t.href ? (
            <a key={t.label} href={t.href} className="block">
              <TileContent {...t} isTall={isTall} />
            </a>
          ) : (
            <div key={t.label}>
              <TileContent {...t} isTall={isTall} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
