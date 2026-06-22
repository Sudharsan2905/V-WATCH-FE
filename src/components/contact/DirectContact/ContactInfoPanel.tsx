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
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      "Surveillance & Communication Sdn Bhd, No 17, Jalan Ekoperniagaan, 2/6 Taman Ekoperniagaan, Johor Bahru, Malaysia - 81100",
    )}`,
  },
];

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
        <p className="text-[15px] font-bold leading-[19px] text-white sm:text-[16px] sm:leading-[20px]">{label}</p>
        <p className="text-[14px] font-normal leading-[19px] text-white/90 sm:text-[16px] sm:leading-[20px]">
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
    <div className="relative overflow-hidden rounded-[32px] px-6 py-10 sm:px-10 lg:h-[350px] lg:px-10 lg:pb-20 lg:pt-10">
      {/* Banner background — replaces the previous layered gradient + wave SVG. */}
      <Image
        src="/book-a-demo/BackBanner.webp"
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 720px"
        className="pointer-events-none select-none object-cover"
      />

      {/* Tiles — stacked vertically; left side of panel so form sits beside them on lg */}
      <div className="relative z-10 flex max-w-full flex-col gap-5 lg:max-w-[490px]">
        {TILES.map((t) => {
          const isTall = t.label === "Office";
          const isExternal = t.href?.startsWith("http");
          return t.href ? (
            <a
              key={t.label}
              href={t.href}
              className="block"
              {...(isExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
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
