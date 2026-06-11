import Image from "next/image";
import BookADemo from "@/components/common/BookADemo";

type LinkColumn = { heading: string; links: string[] };

const DEFAULT_COLUMNS: LinkColumn[] = [
  {
    heading: "Platform",
    links: ["Dashboard", "BI Reporting", "System Integrators"],
  },
  {
    heading: "Industries",
    links: ["Construction", "Industrial", "Commercial"],
  },
  { heading: "Company", links: ["About Us", "Contact", "Career"] },
];

const SOCIALS: { name: string; icon: string }[] = [
  { name: "LinkedIn", icon: "/footer/linkedin.svg" },
  { name: "Facebook", icon: "/footer/facebook.svg" },
  { name: "Instagram", icon: "/footer/instagram.svg" },
];

type FooterProps = {
  ctaTitle?: string;
  ctaText?: string;
  linkColumns?: LinkColumn[];
  ctaVariant?: "light" | "dark";
  showCtaButton?: boolean;
};

const CTA_BG = {
  light:
    "bg-[radial-gradient(70%_130%_at_50%_8%,rgba(180,224,242,0.55)_0%,rgba(72,141,176,0)_52%),linear-gradient(180deg,#34809F_0%,#4789B4_45%,#6BA6CC_100%)]",
  dark: "bg-[radial-gradient(90%_120%_at_50%_-10%,rgba(45,110,180,0.45)_0%,rgba(12,28,48,0)_55%),linear-gradient(180deg,#0C1C30_0%,#12325A_55%,#1B2B4E_100%)]",
} as const;

export default function Footer({
  ctaTitle = "Transform how your operations run",
  ctaText = "See how V-Watch Ai helps you automate processes, strengthen security, and improve productivity across your organisation.",
  linkColumns = DEFAULT_COLUMNS,
  ctaVariant = "light",
  showCtaButton = true,
}: Readonly<FooterProps>) {
  return (
    <footer className="relative overflow-hidden bg-[#19213D] pb-10">
      {/* Decorative background glow */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/footer/footer-img.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 w-[1280px] max-w-none -translate-x-1/2 -translate-y-1/4 select-none opacity-50"
      />

      {/* ── CTA band ─────────────────────────────────────────────────────── */}
      <div className={`relative overflow-hidden px-6 pt-10 pb-20 text-center ${CTA_BG[ctaVariant]}`}>
        {/* faint square-tile mosaic texture, fading out from the centre */}
        <div
          className="pointer-events-none absolute inset-0 bg-repeat opacity-55"
          style={{
            backgroundImage:
              "url('footer/bg-grid.svg')",
            backgroundSize: "cover",
            width: "100%",
            maskImage:
             "radial-gradient(75% 85% at 50% 22%, #000 0%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(75% 85% at 50% 22%, #000 135%, transparent 78%)",

          }}
        />
        {/* soft cyan glow blobs */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#0DBFC4] opacity-40 blur-[170px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-[26rem] rounded-full bg-[#4DAFE0] opacity-30 blur-[200px]" />

        <div className="relative mx-auto flex max-w-[991px] flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-[28px] font-bold text-white sm:text-[32px]">
              {ctaTitle}
            </h2>
            <p className="max-w-[672px] text-[18px] font-normal leading-8 text-[#F3F8FF] sm:text-[20px]">
              {ctaText}
            </p>
          </div>

          {showCtaButton && <BookADemo />}
        </div>
      </div>

      {/* ── Footer card ──────────────────────────────────────────────────── */}
      <div className="relative z-10 -mt-10 px-4 sm:px-10">
        <div className="mx-auto max-w-[1280px] overflow-hidden rounded-[32px] bg-[radial-gradient(100%_55%_at_50%_8%,rgba(60,95,135,0.45)_0%,rgba(30,37,65,0)_55%),linear-gradient(180deg,#1B2B4E_0%,#1E2541_38%,#1E2541_72%,#23324F_100%)] px-6 pt-6 pb-5 shadow-[inset_14px_-10px_74px_rgba(14,90,128,0.20)] sm:px-10">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-12">
            {/* Brand */}
            <div className="flex w-full flex-col gap-5 md:w-[268px] md:shrink-0">
              <Image
                src="/vwatch-logo.png"
                alt="V-WATCH"
                width={169}
                height={40}
                style={{ width: "auto" }}
                className="h-10 self-start"
              />
              <p className="text-[14px] font-normal leading-[22px] text-white">
                AI-driven business process automation platform for real-time
                visibility, security, and control.
              </p>
            </div>

            {/* Link columns — brand 268px + three equal flex columns, per Figma */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:flex md:flex-1 md:gap-12">
              {linkColumns.map((col) => (
                <div
                  key={col.heading}
                  className="flex flex-col gap-2.5 md:flex-1"
                >
                  <h3 className="text-[16px] font-bold text-white">
                    {col.heading}
                  </h3>
                  <ul className="flex flex-col gap-1.5">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-[14px] font-normal text-white/90 transition-colors hover:text-white"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-6 flex flex-col items-start gap-4 border-t border-white/[0.14] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[14px] font-normal leading-5 text-[#EBF3FF]">
              © 2026 V-Watch Ai. All rights reserved.
            </p>
            <div className="flex items-center gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href="#"
                  aria-label={s.name}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[inset_-2.5px_-3.3px_4.4px_rgba(128,211,146,0.25),inset_0_0_12px_rgba(60,187,214,0.49),0_3.3px_3.3px_rgba(15,87,138,0.20)]"
                >
                  <Image
                    src={s.icon}
                    alt=""
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px]"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
