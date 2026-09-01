"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  type Variants,
} from "motion/react";

// ── Types ───────────────────────────────────────────────────────────────────

export type CapabilityFeature = {
  title: string;
  description: string;
  /** Faded corner icon. Defaults to a cycled placeholder when omitted. */
  icon?: ReactNode;
};

export type CapabilityModule = {
  id: string;
  /** Two-digit index shown on the badge — auto-derived from position when omitted. */
  number?: string;
  /** Sidebar label. */
  title: string;
  /** Sidebar icon shown only while this module is active. */
  icon?: ReactNode;
  /** e.g. "12 Modules" — auto-derived from `features.length` when omitted. */
  moduleCount?: string;
  /** Bold tagline shown at the top of the content card. */
  description: string;
  image: string;
  imageAlt?: string;
  features: CapabilityFeature[];
};

export type ConnectedCapabilitiesShowcaseProps = {
  heading?: string;
  subtitle?: string;
  /** Falls back to the ATLAS (pre-construction) set when omitted. */
  modules?: CapabilityModule[];
  className?: string;
};

// ── Placeholder line-icons ──────────────────────────────────────────────────
// Swap a feature/sidebar `icon` for an exported Figma asset when they land —
// nothing else here depends on these shapes.

type IconProps = { className?: string };

const BASE = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function UserIcon({ className }: Readonly<IconProps>) {
  return (
    <svg {...BASE} className={className}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.4-3.6 4.3-5.5 7.5-5.5s6.1 1.9 7.5 5.5" />
    </svg>
  );
}

function ShieldIcon({ className }: Readonly<IconProps>) {
  return (
    <svg {...BASE} className={className}>
      <path d="M12 3.5 19 6v5.5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-2.5Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ClockIcon({ className }: Readonly<IconProps>) {
  return (
    <svg {...BASE} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

function ChartIcon({ className }: Readonly<IconProps>) {
  return (
    <svg {...BASE} className={className}>
      <path d="M4 20V10M12 20V4M20 20v-7" />
      <path d="M2.5 20h19" />
    </svg>
  );
}

function GateIcon({ className }: Readonly<IconProps>) {
  return (
    <svg {...BASE} className={className}>
      <path d="M5 4v16M19 4v16" />
      <path d="M5 8h14M5 16h14" />
      <path d="M9 4v16M15 4v16" strokeOpacity="0.55" />
    </svg>
  );
}

function BadgeIcon({ className }: Readonly<IconProps>) {
  return (
    <svg {...BASE} className={className}>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M9 13.5 7.5 21l4.5-2.5 4.5 2.5-1.5-7.5" />
    </svg>
  );
}

function TagIcon({ className }: Readonly<IconProps>) {
  return (
    <svg {...BASE} className={className}>
      <path d="M11.4 3.5h5.1a2 2 0 0 1 2 2v5.1a2 2 0 0 1-.6 1.4l-8 8a2 2 0 0 1-2.8 0l-4.6-4.6a2 2 0 0 1 0-2.8l8-8a2 2 0 0 1 1.4-.6Z" />
      <circle cx="15" cy="8" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CameraIcon({ className }: Readonly<IconProps>) {
  return (
    <svg {...BASE} className={className}>
      <path d="M3 8.5a1.5 1.5 0 0 1 1.5-1.5h2l1.2-2h8.6l1.2 2h2A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-9Z" />
      <circle cx="12" cy="13" r="3.4" />
    </svg>
  );
}

function TruckIcon({ className }: Readonly<IconProps>) {
  return (
    <svg {...BASE} className={className}>
      <path d="M2.5 6.5h11v9h-11z" />
      <path d="M13.5 10h4l3 3v2.5h-7z" />
      <circle cx="7" cy="17.5" r="1.6" />
      <circle cx="17" cy="17.5" r="1.6" />
    </svg>
  );
}

function LocationIcon({ className }: Readonly<IconProps>) {
  return (
    <svg {...BASE} className={className}>
      <path d="M12 21s6.5-6.1 6.5-11A6.5 6.5 0 0 0 5.5 10c0 4.9 6.5 11 6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

function GridIcon({ className }: Readonly<IconProps>) {
  return (
    <svg {...BASE} className={className}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function AlertIcon({ className }: Readonly<IconProps>) {
  return (
    <svg {...BASE} className={className}>
      <path d="M12 3.5 21.5 20h-19L12 3.5Z" />
      <path d="M12 10v4" />
      <circle cx="12" cy="17" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function HardHatIcon({ className }: Readonly<IconProps>) {
  return (
    <svg {...BASE} className={className}>
      <path d="M4 16.5A8 6.5 0 0 1 20 16.5" />
      <path d="M2.5 16.5h19" />
      <path d="M12 6v4.5" />
    </svg>
  );
}

/** Cycled per feature card when a module does not specify its own icon. */
const FALLBACK_ICONS = [
  UserIcon,
  ShieldIcon,
  GateIcon,
  ClockIcon,
  ChartIcon,
  BadgeIcon,
  TagIcon,
  CameraIcon,
  TruckIcon,
  LocationIcon,
  GridIcon,
  AlertIcon,
];

// ── Module data ─────────────────────────────────────────────────────────────

const ATLAS_IMG = "/pre-construction/connected-capabilities/showcase";

/** ATLAS (pre-construction) module set — also this component's built-in default. */
export const ATLAS_MODULES: CapabilityModule[] = [
  {
    id: "workforce-access",
    title: "Workforce & Access",
    icon: <HardHatIcon />,
    moduleCount: "12 Modules",
    description:
      "Worker identity, entry, occupancy, accountability and workforce performance in one operating view.",
    image: `${ATLAS_IMG}/workforce-access.webp`,
    imageAlt: "Workers passing through a smart gate on a construction site",
    features: [
      { title: "Profiles", description: "Full worker lifecycle & credential vault", icon: <UserIcon /> },
      { title: "Self-Registration", description: "Phone-based sign-up, approve & enrol in one flow", icon: <TagIcon /> },
      { title: "Site Gate", description: "Live gate feed, KPIs & every lane in one view", icon: <GateIcon /> },
      { title: "Overstay", description: "Shift-hour & fatigue monitoring", icon: <ClockIcon /> },
      { title: "Roll Call", description: "On-demand accountability from live occupancy", icon: <UserIcon /> },
      { title: "Workforce Analytics", description: "Live on-site, manhours & productivity", icon: <ChartIcon /> },
      { title: "Contractor Scorecard", description: "Per-contractor safety performance", icon: <ChartIcon /> },
      { title: "Gate Pass", description: "Visitor & delivery passes with expiry enforcement", icon: <TagIcon /> },
      { title: "Face Verification", description: "On-device face detection & verification", icon: <CameraIcon /> },
      { title: "Badges", description: "Badge issuance with status-aware lifecycle", icon: <BadgeIcon /> },
      { title: "Passes", description: "Pass types, validity windows & expiry", icon: <TagIcon /> },
      { title: "Access Control", description: "Per-gate assignment, enrol & revoke", icon: <GateIcon /> },
    ],
  },
  {
    id: "tracking-mobility",
    title: "Tracking & Mobility",
    icon: <LocationIcon />,
    moduleCount: "03 Modules",
    description:
      "Real-time movement, identification and density awareness across people and assets.",
    image: `${ATLAS_IMG}/tracking-mobility.webp`,
    imageAlt: "Isometric render of site tracking and mobility zones",
    features: [
      { title: "RTLS", description: "Real-time location of people & assets", icon: <LocationIcon /> },
      { title: "RFID", description: "Tag-based identification & tracking", icon: <TagIcon /> },
      { title: "Heatmap", description: "Movement & density visualisation", icon: <GridIcon /> },
    ],
  },
  {
    id: "safety-compliance",
    title: "Safety & Compliance",
    icon: <ShieldIcon />,
    moduleCount: "07 Modules",
    description:
      "Policy-led controls before entry, during work and when every person must be accounted for.",
    image: `${ATLAS_IMG}/safety-compliance.webp`,
    imageAlt: "Workers reviewed against safety and compliance checks",
    features: [
      { title: "Compliance Gate (10-check)", description: "Admit / warn / deny outcome; evidence on every check", icon: <ShieldIcon /> },
      { title: "Emergency Muster", description: "Live baseline, face-scan accounting, drill mode", icon: <AlertIcon /> },
      { title: "Permit-to-Work", description: "Apply, register & approve with process flow", icon: <BadgeIcon /> },
      { title: "Fitness-to-Work", description: "Start-of-shift declarations & random testing", icon: <UserIcon /> },
      { title: "Random Safety Audit", description: "Camera-based spot audits on mobile", icon: <CameraIcon /> },
      { title: "Anti-Passback", description: "Blocks re-entry without exit, never blocked", icon: <GateIcon /> },
      { title: "Site Policies", description: "Per-site compliance profiles, never weakening the gate", icon: <ShieldIcon /> },
    ],
  },
  {
    id: "delivery-handover",
    title: "Delivery & Handover",
    icon: <TruckIcon />,
    moduleCount: "02 Modules",
    description:
      "Preserve commissioning records and move project intelligence into live operations.",
    image: `${ATLAS_IMG}/delivery-handover.webp`,
    imageAlt: "Server room being commissioned for handover",
    features: [
      { title: "Commissioning", description: "Records & acceptance of the build", icon: <BadgeIcon /> },
      { title: "Handover to Aegis", description: "One-click transfer to live operations, same spine", icon: <TruckIcon /> },
    ],
  },
  {
    id: "ai-video-analytics",
    title: "AI Video Analytics",
    icon: <CameraIcon />,
    moduleCount: "06 Modules",
    description:
      "Convert camera feeds into identity, safety, intrusion and operational event alerts.",
    image: `${ATLAS_IMG}/ai-video-analytics.webp`,
    imageAlt: "Aerial view of a construction site with AI video overlays",
    features: [
      { title: "Facial Recognition", description: "Identify at the gate via cameras", icon: <UserIcon /> },
      { title: "PPE / Hard-hat", description: "Uniform & helmet detection alerts", icon: <HardHatIcon /> },
      { title: "Intrusion & Tracking", description: "Restricted zone & live cross alerts", icon: <AlertIcon /> },
      { title: "Fire & Smoke", description: "Early detection from camera feeds", icon: <AlertIcon /> },
      { title: "Crowd & Fall", description: "Overcrowding & person-down alerts", icon: <UserIcon /> },
      { title: "Licence Plate Recognition", description: "Vehicle access & logging", icon: <TagIcon /> },
    ],
  },
];

const AEGIS_IMG = "/post-construction/connected-capabilities/showcase";

/** AEGIS (post-construction) module set — passed in from the live-operations page. */
export const AEGIS_MODULES: CapabilityModule[] = [
  {
    id: "operations",
    title: "Operations",
    icon: <GridIcon />,
    moduleCount: "08 Modules",
    description:
      "Coordinate assets, infrastructure, service workflows and operational HSE across the live facility.",
    image: `${AEGIS_IMG}/operations.webp`,
    imageAlt: "Facility operations dashboard overlaid on a live site",
    features: [
      { title: "Assets", description: "Full asset lifecycle & credential vault", icon: <TagIcon /> },
      { title: "VM Manager", description: "Virtual infrastructure oversight", icon: <GridIcon /> },
      { title: "Alarms", description: "Real-time alarm monitoring & routing", icon: <AlertIcon /> },
      { title: "Service Desk", description: "Tickets, SLAs & resolution tracking", icon: <BadgeIcon /> },
      { title: "Work Orders", description: "Raise, assign & track maintenance work", icon: <ClockIcon /> },
      { title: "Change & Config", description: "Controlled change & configuration management", icon: <ShieldIcon /> },
      { title: "Supply & Spares", description: "Spares inventory & supply tracking", icon: <TruckIcon /> },
      { title: "Health & Safety", description: "Operational HSE on the live site", icon: <UserIcon /> },
    ],
  },
  {
    id: "physical-security",
    title: "Physical Security",
    icon: <ShieldIcon />,
    moduleCount: "03 Modules",
    description:
      "Unify zones, patrols, perimeter awareness and access-point oversight.",
    image: `${AEGIS_IMG}/physical-security.webp`,
    imageAlt: "Security operations centre monitoring a live facility",
    features: [
      { title: "Physical Security", description: "Zones, patrols & security operations", icon: <ShieldIcon /> },
      { title: "Perimeter Boundary", description: "Perimeter monitoring & breach awareness", icon: <GateIcon /> },
      { title: "Security Point", description: "Checkpoint & access-point oversight", icon: <LocationIcon /> },
    ],
  },
  {
    id: "facility-twin",
    title: "Facility & Twin",
    icon: <GridIcon />,
    moduleCount: "04 Modules",
    description:
      "Visualise the data hall, thermal conditions, wireless coverage and continuity readiness.",
    image: `${AEGIS_IMG}/facility-twin.webp`,
    imageAlt: "Digital twin render of a data hall",
    features: [
      { title: "Data Hall", description: "Digital twin of the data hall", icon: <GridIcon /> },
      { title: "Thermal & Cooling", description: "Thermal mapping & cooling performance", icon: <ChartIcon /> },
      { title: "WiFi Heatmap", description: "Wireless coverage visualisation", icon: <LocationIcon /> },
      { title: "Continuity & DR", description: "Business continuity & disaster readiness", icon: <ShieldIcon /> },
    ],
  },
  {
    id: "energy",
    title: "Energy",
    icon: <ChartIcon />,
    moduleCount: "02 Modules",
    description: "Monitor power performance and optimise operational efficiency.",
    image: `${AEGIS_IMG}/energy.webp`,
    imageAlt: "Energy infrastructure with wind turbines and power monitoring overlays",
    features: [
      { title: "Energy & Power", description: "Energy monitoring & power management", icon: <ChartIcon /> },
      { title: "Energy Mode", description: "Optimisation modes & efficiency control", icon: <ClockIcon /> },
    ],
  },
  {
    id: "analytics-ai",
    title: "Analytics & AI",
    icon: <ChartIcon />,
    moduleCount: "05 Modules",
    description:
      "Turn facility data into operational intelligence, capacity insight and executive reporting.",
    image: `${AEGIS_IMG}/analytics-ai.webp`,
    imageAlt: "Analytics dashboards overlaid on facility devices",
    features: [
      { title: "Analytics", description: "Operational analytics across the facility", icon: <ChartIcon /> },
      { title: "AI Insights", description: "AI-driven operational intelligence", icon: <GridIcon /> },
      { title: "Capacity", description: "Capacity planning & utilisation", icon: <BadgeIcon /> },
      { title: "Availability", description: "Uptime & availability tracking", icon: <ClockIcon /> },
      { title: "AI Report", description: "AI-generated executive reporting", icon: <TagIcon /> },
    ],
  },
  {
    id: "governance",
    title: "Governance",
    icon: <BadgeIcon />,
    moduleCount: "04 Modules",
    description:
      "Connect financial, ESG, compliance, enterprise risk and capital works oversight.",
    image: `${AEGIS_IMG}/governance.webp`,
    imageAlt: "Governance and compliance reporting overlaid on a facility",
    features: [
      { title: "Financial ESG", description: "Financial & ESG performance", icon: <ChartIcon /> },
      { title: "Compliance & Audit", description: "Compliance posture & audit records", icon: <ShieldIcon /> },
      { title: "Enterprise Risk", description: "Risk register & mitigation", icon: <AlertIcon /> },
      { title: "Capital Works", description: "Capital projects on the live facility", icon: <TruckIcon /> },
    ],
  },
];

// ── Motion ──────────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// The card grid is a fixed 2 x 3 board, so the section keeps one height no
// matter how many features the active module contributes.
const FEATURES_PER_PAGE = 6;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay },
  }),
};

// Feature grid — the container staggers its cards in on every module/page swap.
const gridVariants: Variants = {
  enter: { transition: { staggerChildren: 0.06 } },
  center: { transition: { staggerChildren: 0.06 } },
  exit: {},
};

const cardVariants: Variants = {
  enter: { opacity: 0, y: 16, scale: 0.96 },
  center: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: EASE } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: EASE } },
};

const imageVariants: Variants = {
  enter: { opacity: 0, scale: 1.08 },
  center: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.35, ease: EASE } },
};

// ── Component ───────────────────────────────────────────────────────────────

function chunk<T>(items: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    pages.push(items.slice(i, i + size));
  }
  return pages.length > 0 ? pages : [[]];
}

function FeatureCard({
  feature,
  fallbackIcon: Fallback,
}: Readonly<{ feature: CapabilityFeature; fallbackIcon: (typeof FALLBACK_ICONS)[number] }>) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className="group relative h-full overflow-hidden rounded-2xl border border-[#EAF3FB] bg-[#F7FBFE] p-4 shadow-[0_10px_24px_-20px_rgba(10,75,110,0.25)] transition-colors duration-300 hover:border-[#8ED0F5] hover:bg-white hover:shadow-[0_16px_32px_-16px_rgba(10,110,168,0.28)]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-1.5 -top-1.5 flex h-11 w-11 items-center justify-center text-[#0A8EC8] opacity-[0.16] transition-opacity duration-300 group-hover:opacity-25 [&>svg]:h-9 [&>svg]:w-9"
      >
        {feature.icon ?? <Fallback />}
      </span>
      <h4 className="font-lato text-[14px] font-bold leading-[19px] text-[#0A4B6E]">
        {feature.title}
      </h4>
      <p className="mt-1 max-w-[85%] font-lato text-[12px] font-normal leading-[17px] text-[#5C7E97]">
        {feature.description}
      </p>
    </motion.div>
  );
}

export default function ConnectedCapabilitiesShowcase({
  heading = "Connected Operations, Real Time Visibility, Smarted Decisions",
  subtitle = "A modular operating environment that connects workforce, movement, compliance, delivery records and video intelligence across the site lifecycle.",
  modules = ATLAS_MODULES,
  className = "",
}: Readonly<ConnectedCapabilitiesShowcaseProps>) {
  // Selecting a module always resets to its first feature page, so both
  // indices live in one state update rather than a page-reset effect.
  const [{ activeIndex, pageIndex }, setSelection] = useState({
    activeIndex: 0,
    pageIndex: 0,
  });
  const selectModule = (i: number) => setSelection({ activeIndex: i, pageIndex: 0 });
  const selectPage = (i: number) =>
    setSelection((current) => ({ ...current, pageIndex: i }));

  // Placeholder images 404 until real Figma exports replace them — track
  // failures per module so a missing file falls back to the gradient card
  // instead of a broken-image glyph.
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // The scroll rail sits next to the nav, not the (taller) content card, so
  // its track and thumb are measured off the nav's real DOM height rather
  // than assumed to be an even 1/N split of the flex row's stretched height.
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [rail, setRail] = useState({ trackHeight: 0, thumbTop: 0, thumbHeight: 0 });

  useEffect(() => {
    const measure = () => {
      const nav = navRef.current;
      const item = itemRefs.current[activeIndex];
      if (!nav || !item) return;
      const navRect = nav.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      setRail({
        trackHeight: nav.offsetHeight,
        thumbTop: itemRect.top - navRect.top,
        thumbHeight: item.offsetHeight,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (navRef.current) observer.observe(navRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [activeIndex, modules.length]);

  const active = modules[activeIndex] ?? modules[0];
  const pages = useMemo(
    () => chunk(active?.features ?? [], FEATURES_PER_PAGE),
    [active],
  );
  const currentFeatures = pages[pageIndex] ?? [];

  if (!active) return null;

  const moduleCount = active.moduleCount ?? `${active.features.length} Modules`;

  return (
    <MotionConfig reducedMotion="user">
      <section className="w-full bg-[#f5fbff] px-6 py-10 lg:px-15 lg:py-14">
        <div className={`mx-auto max-w-[1280px] ${className}`}>
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="max-w-[720px] font-lato text-[24px] font-extrabold leading-[32px] text-[#0A4B6E] sm:text-[28px] sm:leading-[36px]"
            >
              {heading}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.1}
              className="mt-2 max-w-[680px] font-lato text-[15px] font-normal leading-[22px] text-[#5C7E97] sm:text-[16px]"
            >
              {subtitle}
            </motion.p>
          </motion.div>

          <div className="mt-8 flex flex-col gap-5 lg:mt-10 lg:flex-row lg:items-stretch lg:gap-3">
            {/* Sidebar */}
            <nav
              ref={navRef}
              aria-label="Capability modules"
              className="flex gap-2.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:w-[248px] lg:shrink-0 lg:flex-col lg:gap-3 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
            >
              {modules.map((mod, i) => {
                const isActive = i === activeIndex;
                return (
                  <motion.button
                    key={mod.id}
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    type="button"
                    onClick={() => selectModule(i)}
                    whileHover={!isActive ? { y: -2 } : undefined}
                    transition={{ type: "spring", stiffness: 320, damping: 24 }}
                    className="relative flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors duration-300 lg:shrink lg:flex-1"
                    style={{
                      background: isActive ? "#EAF6FE" : "#FFFFFF",
                      boxShadow: isActive
                        ? "0 14px 28px -18px rgba(10,110,168,0.4)"
                        : "0 8px 20px -16px rgba(10,75,110,0.18)",
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="capability-active-indicator"
                        aria-hidden
                        className="absolute inset-y-2 left-0 w-1 rounded-full bg-gradient-to-b from-[#21B1F1] to-[#0A6FA8] shadow-[0_0_10px_rgba(33,177,241,0.7)]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}

                    {isActive ? (
                      <span
                        aria-hidden
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white [&>svg]:h-[18px] [&>svg]:w-[18px]"
                        style={{
                          background: "linear-gradient(135deg,#21B1F1,#0A6FA8)",
                        }}
                      >
                        {mod.icon ?? "•"}
                      </span>
                    ) : (
                      <span className="w-6 shrink-0 text-center font-lato text-[15px] font-extrabold text-[#0A4B6E]">
                        {mod.number ?? String(i + 1).padStart(2, "0")}
                      </span>
                    )}

                    <span
                      className={`whitespace-nowrap font-lato text-[14px] font-bold leading-[19px] lg:whitespace-normal ${
                        isActive ? "text-[#0A6FA8]" : "text-[#0A4B6E]"
                      }`}
                    >
                      {mod.title}
                    </span>
                  </motion.button>
                );
              })}
            </nav>

            {/* Scroll rail — track height and thumb position/size are measured
                off the nav's real DOM (see the effect above), so the thumb
                lines up with the active item instead of an assumed 1/N split
                of the row's (taller) stretched height. */}
            <div
              className="relative hidden w-1 shrink-0 overflow-hidden rounded-full bg-[#E3EFFA] lg:block"
              style={{ height: rail.trackHeight || undefined }}
            >
              <motion.div
                aria-hidden
                className="absolute left-0 w-full rounded-full bg-gradient-to-b from-[#21B1F1] to-[#0A6FA8]"
                animate={{ top: rail.thumbTop, height: rail.thumbHeight }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
              />
            </div>

            {/* Content card */}
            <div className="relative min-w-0 flex-1 overflow-hidden rounded-[28px] border border-[#EAF3FB] bg-white p-5 shadow-[0_25px_60px_-28px_rgba(10,75,110,0.3)] sm:p-6 lg:p-7">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8">
                {/* Left: badge/title row + description + feature grid */}
                <div className="flex min-w-0 flex-1 flex-col">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={active.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-lato text-[15px] font-extrabold text-white"
                          style={{
                            background: "linear-gradient(135deg,#21B1F1,#0A6FA8)",
                          }}
                        >
                          {active.number ?? String(activeIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="rounded-full bg-[#EAF6FE] px-3.5 py-1.5 font-lato text-[12px] font-semibold text-[#0A6FA8]">
                          {moduleCount}
                        </span>
                      </div>

                      {/* Two-line box: a one-line tagline must not shorten the card. */}
                      <p className="mt-4 max-w-[540px] font-lato text-[16px] font-bold leading-[24px] text-[#0A4B6E] sm:min-h-[48px] sm:text-[17px]">
                        {active.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Fixed 2 x 3 board — a module with 2 features reserves the same
                      space as one with 6, so switching never resizes the section. */}
                  <div className="relative mt-6 min-h-[200px] flex-1 sm:h-[336px] sm:flex-none">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={`${active.id}-${pageIndex}`}
                        variants={gridVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="grid h-full grid-cols-1 gap-3.5 sm:auto-rows-fr sm:grid-cols-2 sm:grid-rows-3"
                      >
                        {currentFeatures.map((feature, i) => (
                          <FeatureCard
                            key={feature.title}
                            feature={feature}
                            fallbackIcon={FALLBACK_ICONS[i % FALLBACK_ICONS.length]}
                          />
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Right: image panel */}
                <div
                  className="relative h-[220px] w-full shrink-0 overflow-hidden rounded-2xl sm:h-[280px] lg:h-auto lg:w-[260px] xl:w-[300px]"
                  style={{
                    background: "linear-gradient(155deg,#0A1A2E 0%,#0B2340 55%,#071627 100%)",
                  }}
                >
                  <AnimatePresence mode="sync" initial={false}>
                    <motion.div
                      key={active.id}
                      variants={imageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0"
                    >
                      {!failedImages[active.id] && (
                        <Image
                          src={active.image}
                          alt={active.imageAlt ?? active.title}
                          fill
                          unoptimized
                          sizes="(max-width: 1024px) 100vw, 300px"
                          className="object-cover"
                          onError={() =>
                            setFailedImages((prev) => ({ ...prev, [active.id]: true }))
                          }
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Bottom pagination — the row is always reserved so modules that fit
                  on one page stay the same height as the paged ones. */}
              <div className="mt-6 flex h-2 items-center justify-center gap-1.5">
                {pages.length > 1 &&
                  pages.map((_, i) => (
                    <motion.button
                      key={i}
                      type="button"
                      aria-label={`Show feature set ${i + 1} of ${pages.length}`}
                      onClick={() => selectPage(i)}
                      animate={{ width: i === pageIndex ? 28 : 8 }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="h-2 rounded-full"
                      style={{
                        background:
                          i === pageIndex
                            ? "linear-gradient(90deg,#21B1F1,#0A6FA8)"
                            : "#D7E9F7",
                      }}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
