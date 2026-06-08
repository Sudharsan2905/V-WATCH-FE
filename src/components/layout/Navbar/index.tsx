"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────

type NavItem = { label: string; href: string; hasDropdown?: boolean };
type DropdownLink = { icon: string; title: string; desc: string; href: string };
type DropdownData = {
  label: string;
  desc: string;
  illustration: string;
  illustrationSize: number;
  items: DropdownLink[];
};

// ─── Data ──────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { label: "Platform",   href: "#", hasDropdown: true },
  { label: "Solutions",  href: "#", hasDropdown: true },
  { label: "Industries", href: "#", hasDropdown: true },
  { label: "Products",   href: "#" },
  { label: "About Us",   href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Resources",  href: "#", hasDropdown: true },
];

const DROPDOWNS: Record<string, DropdownData> = {
  Platform: {
    label: "Platform",
    desc: "Powerful tools for connected operations and intelligent management.",
    illustration: "/nav/illus-platform.svg",
    illustrationSize: 100,
    items: [
      { icon: "/nav/icons/platform-dashboard.svg",   title: "V-Watch AI Dashboard", desc: "Real-time visibility across all operations.", href: "#" },
      { icon: "/nav/icons/platform-integrators.svg", title: "System Integrators",   desc: "Advanced analytics and reporting insights.", href: "#" },
      { icon: "/nav/icons/platform-bi.svg",          title: "Power BI Reports",     desc: "Actionable insights from operational data.", href: "#" },
    ],
  },
  Solutions: {
    label: "Solutions",
    desc: "Purpose-built solutions for every operational project lifecycle.",
    illustration: "/nav/illus-solutions.svg",
    illustrationSize: 68,
    items: [
      { icon: "/nav/icons/solutions-pre.svg",  title: "Pre Construction",  desc: "Smarter planning and risk reduction.",       href: "#" },
      { icon: "/nav/icons/solutions-post.svg", title: "Post Construction", desc: "Performance tracking and project closeout.", href: "#" },
    ],
  },
  Industries: {
    label: "Industries",
    desc: "Industry-focused solutions for complex operational environments.",
    illustration: "/nav/illus-industries.svg",
    illustrationSize: 140,
    items: [
      { icon: "/nav/icons/industries-hub.svg",          title: "Industries Hub",          desc: "Explore industry-specific capabilities.",     href: "#" },
      { icon: "/nav/icons/industries-construction.svg", title: "Construction",            desc: "Optimize construction lifecycle operations.", href: "#" },
      { icon: "/nav/icons/industries-energy.svg",       title: "Industrial & Energy",     desc: "Manage industrial workforce environments.",   href: "#" },
      { icon: "/nav/icons/industries-commercial.svg",   title: "Commercial & Facilities", desc: "Improve facility operational efficiency.",    href: "#" },
    ],
  },
  Resources: {
    label: "Resources",
    desc: "Insights, knowledge, and practical industry learning resources.",
    illustration: "/nav/illus-resources.svg",
    illustrationSize: 80,
    items: [
      { icon: "/nav/icons/resources-case-studies.svg", title: "Case Studies",  desc: "Real implementation success stories.", href: "#" },
      { icon: "/nav/icons/resources-digest.svg",       title: "Weekly Digest", desc: "Latest trends and platform updates.",  href: "#" },
    ],
  },
};

// ─── Sub-components ────────────────────────────────────────────────────────

function ChevronDown({ open = false, className = "" }: Readonly<{ open?: boolean; className?: string }>) {
  return (
    <svg
      width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden
      className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""} ${className}`}
    >
      <path d="M3.5 5.25 7 8.75l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Logo() {
  return (
    <Link href="/" aria-label="V-WATCH home" className="flex h-10 shrink-0 items-center px-3.5">
      <Image
        src="/vwatch-logo.png"
        alt="V-WATCH"
        width={141}
        height={32}
        priority
        style={{ width: "auto" }}
        className="h-8 self-start"
      />
    </Link>
  );
}

function DemoButton({ className = "" }: Readonly<{ className?: string }>) {
  return (
    <Link
      href="#"
      className={`inline-flex h-9 items-center justify-center rounded-full border border-white px-5 text-sm font-bold text-white shadow-[0px_2.5px_8.7px_rgba(13,97,31,0.10),0px_9.9px_31px_rgba(12,75,26,0.10)] ${className}`}
      style={{ backgroundImage: "linear-gradient(180deg, rgb(33,177,241) 20.69%, rgb(166,201,54) 151.72%)" }}
    >
      Request Demo
    </Link>
  );
}

function DropdownItem({ icon, title, desc, href }: Readonly<DropdownLink>) {
  return (
    <Link
      href={href}
      className="flex h-[62px] items-center gap-3 rounded-[14px] border border-white bg-white/[0.06] py-2.5 pl-2.5 pr-4 shadow-[0px_10px_7px_rgba(184,230,255,0.14)] transition-colors hover:bg-[rgba(10,78,110,0.06)]"
    >
      <div className="flex h-6 w-6 shrink-0 items-center justify-center">
        <Image src={icon} alt="" width={24} height={24} unoptimized className="h-6 w-6 object-contain" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <p className="text-[16px] font-bold leading-normal text-[#3E4B77]">{title}</p>
        <p className="truncate text-[14px] font-normal leading-normal text-[#556394]">{desc}</p>
      </div>
      {/* Chevron-right button */}
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6.6px] border border-[#EFF0F6] bg-gradient-to-b from-white to-[#F1F2F9] shadow-[inset_0px_-0.82px_0.82px_rgba(150,161,172,0.12)]">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M4.5 2.5 8 6l-3.5 3.5" stroke="#556394" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Link>
  );
}

function DropdownPanel({ data }: Readonly<{ data: DropdownData }>) {
  return (
    <div
      className="flex gap-3.5 rounded-[20px] bg-white p-3.5"
      style={{ boxShadow: "0px 0px 34px 0px #0a4b6e, 0px 14px 40px 0px rgba(0,0,0,0.4)" }}
    >
      {/* Left info panel */}
      <div className="relative flex w-[230px] shrink-0 flex-col justify-end gap-2.5 overflow-hidden rounded-[16px] border border-white p-2.5">
        {/* Decorative blobs matching Figma ellipses */}
        <div className="pointer-events-none absolute -left-7 -top-1 h-[50px] w-[110px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(156,220,255,0.7)_0%,transparent_70%)] blur-[6px]" />
        <div className="pointer-events-none absolute -right-4 bottom-0 h-[61px] w-[143px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(156,220,255,0.5)_0%,transparent_70%)] blur-[6px]" />
        {/* Illustration — top-right, 50% opacity */}
        <div className="pointer-events-none absolute right-1 top-1 opacity-50">
          <Image
            src={data.illustration}
            alt=""
            width={data.illustrationSize}
            height={data.illustrationSize}
            unoptimized
            className="object-contain"
          />
        </div>
        {/* Label + description */}
        <div className="relative z-10 flex flex-col gap-1.5">
          <p className="text-[18px] font-bold leading-normal text-[#002D45]">{data.label}</p>
          <p className="text-[14px] font-normal leading-[19px] text-[#002D45]">{data.desc}</p>
        </div>
      </div>

      {/* Right nav items list */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        {data.items.map((item) => (
          <DropdownItem key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────

export default function Navbar({ active }: Readonly<{ active?: string }>) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  }

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* ── Desktop bar ─────────────────────────────────────────────────── */}
      <nav className="flex h-[60px] items-center gap-2 bg-[rgba(3,5,21,0.80)] px-5 shadow-[inset_0px_-5px_27px_rgba(255,255,255,0.10)]">
        <Logo />

        <ul className="hidden flex-1 items-center justify-center lg:flex">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => {
                if (!item.hasDropdown) return;
                cancelClose();
                setOpenDropdown(item.label);
              }}
              onMouseLeave={() => {
                if (item.hasDropdown) scheduleClose();
              }}
            >
              <Link
                href={item.href}
                aria-current={item.label === active ? "page" : undefined}
                className={`mt-0.5 flex h-8 items-center gap-1.5 rounded-full px-4 text-sm font-bold text-white transition-colors hover:bg-white/[0.14] ${
                  item.label === active
                    ? "border-b border-white bg-white/[0.14]"
                    : openDropdown === item.label
                      ? "bg-white/[0.14]"
                      : ""
                }`}
              >
                {item.label}
                {item.hasDropdown && (
                  <ChevronDown open={openDropdown === item.label} className="text-white" />
                )}
              </Link>

              {/* Dropdown panel */}
              {item.hasDropdown && openDropdown === item.label && DROPDOWNS[item.label] && (
                <div
                  className="absolute left-1/2 top-full mt-2 w-[660px] -translate-x-1/2"
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  <DropdownPanel data={DROPDOWNS[item.label]!} />
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="flex-1 lg:hidden" />
        <DemoButton className="hidden sm:inline-flex" />

        {/* Hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {/* ── Mobile panel ────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="border-t border-white/5 bg-[rgba(3,5,21,0.95)] px-5 py-2 backdrop-blur-md lg:hidden">
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between border-b border-white/5 py-3 text-sm font-bold text-white"
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="text-white/80" />}
                </Link>
              </li>
            ))}
          </ul>
          <DemoButton className="mt-3 w-full" />
        </div>
      )}
    </header>
  );
}
