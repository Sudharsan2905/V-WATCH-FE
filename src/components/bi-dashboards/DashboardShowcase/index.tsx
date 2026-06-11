import Image from "next/image";

// Dashboard → Reporting → Power BI Data.
// Three alternating showcase rows, each pairing a copy column (with a check
// list) against a product screenshot. A faint winding dashed path links the
// rows on desktop, echoing the Figma "road" motif.

// ── Shared bits ───────────────────────────────────────────────────────────────

function CheckBullet({ text }: Readonly<{ text: string }>) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex size-[22px] shrink-0 items-center justify-center rounded-full">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Icon">
            <path id="Oval" opacity="0.15" fillRule="evenodd" clipRule="evenodd" d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 27.9411 8.05887 36 18 36Z" fill="#36B37E" />
            <path id="Icon_2" d="M15.5976 23.7363L10.7051 18.873C10.5684 18.7363 10.5 18.5605 10.5 18.3457C10.5 18.1308 10.5684 17.9551 10.7051 17.8183L11.7891 16.7637C11.9258 16.6074 12.0967 16.5293 12.3018 16.5293C12.5068 16.5293 12.6875 16.6074 12.8437 16.7637L16.125 20.0449L23.1562 13.0137C23.3125 12.8574 23.4931 12.7793 23.6982 12.7793C23.9033 12.7793 24.0742 12.8574 24.2109 13.0137L25.2949 14.0684C25.4316 14.2051 25.5 14.3809 25.5 14.5957C25.5 14.8105 25.4316 14.9863 25.2949 15.123L16.6523 23.7363C16.5156 23.8926 16.3398 23.9707 16.125 23.9707C15.9101 23.9707 15.7344 23.8926 15.5976 23.7363Z" fill="#36B37E" />
          </g>
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
  /** When the column sits on the right (reversed row), fade the white toward the left. */
  reverse?: boolean;
};

function CopyColumn({ ghost, title, body, listHeading, items, reverse = false }: Readonly<CopyProps>) {
  return (
    <div
      className={`relative flex w-full flex-col gap-4 rounded-[24px] p-8 lg:flex-1 lg:p-10 ${
        reverse
          ? "bg-[linear-gradient(270deg,#FFFFFF_0%,#FFFFFF00_100%)]"
          : "bg-[linear-gradient(90deg,#FFFFFF_0%,#FFFFFF00_100%)]"
      }`}
    >
      <span
        aria-hidden
        className="select-none text-[40px] font-black leading-none text-[#0A8EC8]/10"
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

// ── Road path ─────────────────────────────────────────────────────────────────
// Winding dashed "road" that links the three rows on desktop, echoing the Figma
// motif. A soft gradient stroke underlay with a white dashed line on top.

function RoadPath() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 730 668"
      fill="none"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-30 top-[23%] hidden h-[52%] w-[65%] opacity-90 lg:block"
    >
      <path
        d="M719 1.54785C708.5 75.4253 633.14 88.2161 355.746 75.4253C78.3522 62.6346 10.338 131.477 11.0051 167.497V507.976C11.0051 509.232 11.1525 510.454 11.5362 511.65C24.8017 553.009 110.72 620.311 355.746 571.617C666.466 509.869 719 621.237 719 667.548"
        stroke="url(#roadStroke)"
        strokeWidth={22}
      />
      <path
        d="M719 1.54785C708.5 75.4253 633.14 88.2161 355.746 75.4253C78.3522 62.6346 10.338 131.477 11.0051 167.497V507.976C11.0051 509.232 11.1525 510.454 11.5362 511.65C24.8017 553.009 110.72 620.311 355.746 571.617C666.466 509.869 719 621.237 719 667.548"
        stroke="url(#roadDash)"
        strokeWidth={2}
        strokeDasharray="14 14"
      />
      <defs>
        <linearGradient id="roadStroke" x1="966.153" y1="-106.647" x2="6.88328" y2="337.282" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8D9CCF" />
          <stop offset="0.278846" stopColor="#5BB8F5" />
          <stop offset="1" stopColor="#F1CAFF" />
        </linearGradient>
        <linearGradient id="roadDash" x1="958.126" y1="-106.648" x2="31.0701" y2="49.1188" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0.4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function DashboardShowcase() {
  return (
    <section className="relative overflow-hidden rounded-t-[40px] shadow-[inset_0px_18px_50px_10px_#0075B433] bg-[linear-gradient(180deg,#FFFFFF_0%,#F2F8FE_100%)] px-6 py-20 lg:px-[60px]">
      <div
        aria-hidden
        className="pointer-events-none w-100 h-100 right-0 top-[20%] absolute bg-[radial-gradient(ellipse_at_center,_#C5E9FB00_0%,_#C5E9FB99_38%,_#C5E9FB00_70%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none w-100 h-100 left-0 top-[25%] absolute bg-[radial-gradient(ellipse_at_center,_#C5E9FB00_0%,_#C5E9FB99_38%,_#C5E9FB00_70%)] blur-3xl"
      />
      <div className="relative mx-auto flex w-full max-w-[1410px] flex-col gap-20 lg:gap-40">
        <RoadPath />
        {/* Row 1 — Dashboard */}
        <div className="relative z-10 flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
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
        <div className="relative z-10 flex flex-col items-center gap-10 lg:flex-row-reverse lg:gap-16">
          <CopyColumn
            reverse
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
        <div className="relative z-10 flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
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
