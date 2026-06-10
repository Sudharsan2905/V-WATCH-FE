import Image from "next/image";

// Dashboard → Reporting → Power BI Data.
// Three alternating showcase rows, each pairing a copy column (with a check
// list) against a product screenshot. A faint winding dashed path links the
// rows on desktop, echoing the Figma "road" motif.

// ── Shared bits ───────────────────────────────────────────────────────────────

function CheckBullet({ text }: Readonly<{ text: string }>) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex size-[20px] shrink-0 items-center justify-center rounded-full bg-[linear-gradient(180deg,#C5EB4C,#88A724)] shadow-[0_4px_10px_-4px_rgba(136,167,36,0.7)]">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M2.5 6.2 4.8 8.5 9.5 3.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-[16px] font-normal leading-[24px] text-[#3E4B77]">{text}</span>
    </li>
  );
}

type CopyProps = {
  ghost: string;
  title: string;
  body: string;
  listHeading: string;
  items: string[];
};

function CopyColumn({ ghost, title, body, listHeading, items }: Readonly<CopyProps>) {
  return (
    <div className="relative flex w-full flex-col gap-4 lg:flex-1">
      <span
        aria-hidden
        className="select-none text-[40px] font-black leading-none text-[#0A8EC8]/10 sm:text-[52px]"
      >
        {ghost}
      </span>
      <h3 className="-mt-2 text-[24px] font-bold leading-[32px] text-[#0A4B6E] lg:text-[26px]">
        {title}
      </h3>
      <p className="max-w-[520px] text-[17px] font-normal leading-[26px] text-[#0A4B6E]">
        {body}
      </p>
      <p className="mt-1 text-[17px] font-bold text-[#0A4B6E]">{listHeading}</p>
      <ul className="flex flex-col gap-3">
        {items.map((it) => (
          <CheckBullet key={it} text={it} />
        ))}
      </ul>
    </div>
  );
}

// ── Mockup image ──────────────────────────────────────────────────────────────

function MockupImage({ src, alt, width, height }: Readonly<{ src: string; alt: string; width: number; height: number }>) {
  return (
    <div className="flex-1">
      <div className="flex h-100 w-100 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,#F9FDFF_0%,#F6FCFF_100%)] shadow-[-5px_8px_32px_4px_#002D450A,-20px_14px_44px_0px_#1D6C970F] lg:flex-1">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 1024px) 520px, 100vw"
          className="ml-10"
        />
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function DashboardShowcase() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#F2F8FE_100%)] px-6 py-20 lg:px-[60px]">
      <div className="relative mx-auto flex w-full max-w-[1410px] flex-col gap-20 lg:gap-28">
        {/* Row 1 — Dashboard */}
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
          <CopyColumn
            ghost="Dashboard"
            title="Dashboards built for clarity and control"
            body="V-Watch Ai dashboards provide a clear, real-time overview of your operations from ground-level activity to executive insights."
            listHeading="Key Capabilities"
            items={[
              "Real-time visual dashboards",
              "Drill-down capabilities for deeper analysis",
              "Customisable layouts and metrics",
              "Multi-site visibility in one interface",
            ]}
          />
          <MockupImage
            src="/bi-dashboards/dashboard-overview.png"
            alt="V-Watch Ai live site overview dashboard"
            width={1086}
            height={1275}
          />
        </div>

        {/* Row 2 — Reporting (mockup first on desktop) */}
        <div className="flex flex-col items-center gap-10 lg:flex-row-reverse lg:gap-16">
          <CopyColumn
            ghost="Reporting"
            title="Automated reporting, ready when you need it"
            body="Generate accurate, structured reports without manual effort."
            listHeading="Features"
            items={[
              "Scheduled and automated reporting",
              "Exportable formats for audits and compliance",
              "Historical data tracking and trend analysis",
              "Custom report configurations",
            ]}
          />
          <MockupImage
            src="/bi-dashboards/dashboard-report.png"
            alt="V-Watch Ai automated reporting with exportable formats"
            width={855}
            height={788}
          />
        </div>

        {/* Row 3 — Power BI Data */}
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
          <CopyColumn
            ghost="Power BI Data"
            title="Built on real-time data across your entire platform"
            body="The BI layer is powered by data captured across V-Watch Ai."
            listHeading="Connected sources"
            items={[
              "Workforce and attendance",
              "Access and identity systems",
              "Task and workflow management",
              "Vehicle, logistics, and movement tracking",
              "Asset and equipment monitoring",
              "Safety and compliance systems",
            ]}
          />
          <MockupImage
            src="/bi-dashboards/dashboard-data.png"
            alt="V-Watch Ai Power BI data across vehicle and workforce sources"
            width={808}
            height={712}
          />
        </div>
      </div>
    </section>
  );
}
