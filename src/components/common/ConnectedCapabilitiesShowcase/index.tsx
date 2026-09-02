"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
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
  /** Exported badge asset for the sidebar — a self-contained gradient tile
      (glyph baked in), rendered in place of `icon` + its gradient circle. */
  iconBadge?: string;
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

// ── Exported Figma icons ────────────────────────────────────────────────────

const CC_ICONS = "/pre-construction/connected-capabilities";

const WORKFORCE_ICONS = `${CC_ICONS}/workforce`;
const TRACKING_ICONS = `${CC_ICONS}/tracking-mobility`;
const SAFETY_ICONS = `${CC_ICONS}/safety`;
const DELIVERY_ICONS = `${CC_ICONS}/delivery`;
const ANALYTICS_ICONS = `${CC_ICONS}/analytics`;

const PC_ICONS = "/post-construction/connected-capabilities";

const OPERATIONS_ICONS = `${PC_ICONS}/operations`;
const SECURITY_ICONS = `${PC_ICONS}/physical-security`;
const FACILITY_ICONS = `${PC_ICONS}/facility`;
const ENERGY_ICONS = `${PC_ICONS}/energy`;
const AI_ICONS = `${PC_ICONS}/analytics`;
const GOVERNANCE_ICONS = `${PC_ICONS}/governance`;

/**
 * Feature-card glyph from an exported asset. The files are full-colour (they
 * carry their own blues), so unlike the line icons above they ignore the
 * badge's `currentColor` and its hover shift — the badge tint still animates
 * behind them. Sources vary between 20 and 24px, hence `object-contain` in a
 * fixed box so every card's glyph reads at the same size.
 */
function AssetIcon({ src }: Readonly<{ src: string }>) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden
      width={24}
      height={24}
      unoptimized
      className="h-[19px] w-[19px] object-contain"
    />
  );
}

// ── Module data ─────────────────────────────────────────────────────────────

const ATLAS_IMG = "/pre-construction/connected-capabilities/showcase";

/** ATLAS (pre-construction) module set — also this component's built-in default. */
export const ATLAS_MODULES: CapabilityModule[] = [
  {
    id: "workforce-access",
    title: "Workforce & Access",
    iconBadge: `${WORKFORCE_ICONS}/workforce.svg`,
    moduleCount: "12 Modules",
    description:
      "Worker identity, entry, occupancy, accountability and workforce performance in one operating view.",
    image: `${ATLAS_IMG}/workforce-access.png`,
    imageAlt: "Workers passing through a smart gate on a construction site",
    features: [
      { title: "Profiles", description: "Full worker lifecycle & credential vault", icon: <AssetIcon src={`${WORKFORCE_ICONS}/profile.svg`} /> },
      { title: "Self-Registration", description: "Phone-based sign-up, approve & enrol in one flow", icon: <AssetIcon src={`${WORKFORCE_ICONS}/selfregistration.svg`} /> },
      { title: "Site Gate", description: "Live gate feed, KPIs & every lane in one view", icon: <AssetIcon src={`${WORKFORCE_ICONS}/sitegate.svg`} /> },
      { title: "Overstay", description: "Shift-hour & fatigue monitoring", icon: <AssetIcon src={`${WORKFORCE_ICONS}/overstay.svg`} /> },
      { title: "Roll Call", description: "On-demand accountability from live occupancy", icon: <AssetIcon src={`${WORKFORCE_ICONS}/rollcall.svg`} /> },
      { title: "Workforce Analytics", description: "Live on-site, manhours & productivity", icon: <AssetIcon src={`${WORKFORCE_ICONS}/workforceanalytics.svg`} /> },
      { title: "Contractor Scorecard", description: "Per-contractor safety performance", icon: <AssetIcon src={`${WORKFORCE_ICONS}/score-card.svg`} /> },
      { title: "Gate Pass", description: "Visitor & delivery passes with expiry enforcement", icon: <AssetIcon src={`${WORKFORCE_ICONS}/gatecard.svg`} /> },
      { title: "Face Verification", description: "On-device face detection & verification", icon: <AssetIcon src={`${WORKFORCE_ICONS}/faceverification.svg`} /> },
      { title: "Badges", description: "Badge issuance with status-aware lifecycle", icon: <AssetIcon src={`${WORKFORCE_ICONS}/badges.svg`} /> },
      { title: "Passes", description: "Pass types, validity windows & expiry", icon: <AssetIcon src={`${WORKFORCE_ICONS}/passes.svg`} /> },
      { title: "Access Control", description: "Per-gate assignment, enrol & revoke", icon: <AssetIcon src={`${WORKFORCE_ICONS}/accesscontrol.svg`} /> },
    ],
  },
  {
    id: "tracking-mobility",
    title: "Tracking & Mobility",
    iconBadge: `${TRACKING_ICONS}/trackandmobility.svg`,
    moduleCount: "03 Modules",
    description:
      "Real-time movement, identification and density awareness across people and assets.",
    image: `${ATLAS_IMG}/tracking-mobility.png`,
    imageAlt: "Isometric render of site tracking and mobility zones",
    features: [
      { title: "RTLS", description: "Real-time location of people & assets", icon: <AssetIcon src={`${TRACKING_ICONS}/RTLS.svg`} /> },
      { title: "RFID", description: "Tag-based identification & tracking", icon: <AssetIcon src={`${TRACKING_ICONS}/RFID.svg`} /> },
      { title: "Heatmap", description: "Movement & density visualisation", icon: <AssetIcon src={`${TRACKING_ICONS}/Heatmap.svg`} /> },
    ],
  },
  {
    id: "safety-compliance",
    title: "Safety & Compliance",
    iconBadge: `${SAFETY_ICONS}/safety.svg`,
    moduleCount: "07 Modules",
    description:
      "Policy-led controls before entry, during work and when every person must be accounted for.",
    image: `${ATLAS_IMG}/safety-compliance.png`,
    imageAlt: "Workers reviewed against safety and compliance checks",
    features: [
      { title: "Compliance Gate (10-check)", description: "Admit / warn / deny before entry, evidence on every check", icon: <AssetIcon src={`${SAFETY_ICONS}/compilance.svg`} /> },
      { title: "Emergency Muster", description: "Live baseline, face-scan accounting, drill mode", icon: <AssetIcon src={`${SAFETY_ICONS}/emergency.svg`} /> },
      { title: "Permit-to-Work", description: "Apply, register & approve with process flow", icon: <AssetIcon src={`${SAFETY_ICONS}/premit.svg`} /> },
      { title: "Fitness-to-Work", description: "Start-of-shift declarations & random testing", icon: <AssetIcon src={`${SAFETY_ICONS}/fitness.svg`} /> },
      { title: "Random Safety Audit", description: "Camera-based spot audits on mobile", icon: <AssetIcon src={`${SAFETY_ICONS}/random.svg`} /> },
      { title: "Anti-Passback", description: "Blocks re-entry without exit, never blocked", icon: <AssetIcon src={`${SAFETY_ICONS}/anti-passbook.svg`} /> },
      { title: "Site Policies", description: "Per-site compliance profiles, never weakening the gate", icon: <AssetIcon src={`${SAFETY_ICONS}/site-policies.svg`} /> },
    ],
  },
  {
    id: "delivery-handover",
    title: "Delivery & Handover",
    iconBadge: `${DELIVERY_ICONS}/delivery.svg`,
    moduleCount: "02 Modules",
    description:
      "Preserve commissioning records and move project intelligence into live operations.",
    image: `${ATLAS_IMG}/delivery-handover.png`,
    imageAlt: "Server room being commissioned for handover",
    features: [
      { title: "Commissioning", description: "Cx records & acceptance on the build.", icon: <AssetIcon src={`${DELIVERY_ICONS}/commissioning.svg`} /> },
      { title: "Handover to Aegis", description: "One-click transfer to live operations same spine.", icon: <AssetIcon src={`${DELIVERY_ICONS}/handover.svg`} /> },
    ],
  },
  {
    id: "ai-video-analytics",
    title: "AI Video Analytics",
    iconBadge: `${ANALYTICS_ICONS}/analytics.svg`,
    moduleCount: "06 Modules",
    description:
      "Convert camera feeds into identity, safety, intrusion and operational event alerts.",
    image: `${ATLAS_IMG}/ai-video-analytics.png`,
    imageAlt: "Aerial view of a construction site with AI video overlays",
    features: [
      { title: "Facial Recognition", description: "Identity at the gate via camera", icon: <AssetIcon src={`${ANALYTICS_ICONS}/facial.svg`} /> },
      { title: "PPE / Hard-hat", description: "Uniform & helmet detection alarms", icon: <AssetIcon src={`${ANALYTICS_ICONS}/hard-hat.svg`} /> },
      { title: "Intrusion & Tracking", description: "Restricted-zone & line-cross alerts", icon: <AssetIcon src={`${ANALYTICS_ICONS}/tracking.svg`} /> },
      { title: "Fire & Smoke", description: "Early detection from camera feeds", icon: <AssetIcon src={`${ANALYTICS_ICONS}/smoke.svg`} /> },
      { title: "Crowd & Fall", description: "Overcrowding & person-down alerts", icon: <AssetIcon src={`${ANALYTICS_ICONS}/fall.svg`} /> },
      { title: "Licence Plate Recognition", description: "Vehicle access & logging", icon: <AssetIcon src={`${ANALYTICS_ICONS}/plate-recognition.svg`} /> },
    ],
  },
];

const AEGIS_IMG = "/post-construction/connected-capabilities/showcase";

/** AEGIS (post-construction) module set — passed in from the live-operations page. */
export const AEGIS_MODULES: CapabilityModule[] = [
  {
    id: "operations",
    title: "Operations",
    iconBadge: `${OPERATIONS_ICONS}/operation.svg`,
    moduleCount: "08 Modules",
    description:
      "Coordinate assets, infrastructure, service workflows and operational HSE across the live facility.",
    image: `${AEGIS_IMG}/operations.png`,
    imageAlt: "Facility operations dashboard overlaid on a live site",
    features: [
      { title: "Assets", description: "Full asset lifecycle & credential vault", icon: <AssetIcon src={`${OPERATIONS_ICONS}/assests.svg`} /> },
      { title: "VM Manager", description: "Virtual infrastructure oversight", icon: <AssetIcon src={`${OPERATIONS_ICONS}/vmmanager.svg`} /> },
      { title: "Alarms", description: "Real-time alarm monitoring & routing", icon: <AssetIcon src={`${OPERATIONS_ICONS}/alarm.svg`} /> },
      { title: "Service Desk", description: "Tickets, SLAs & resolution tracking", icon: <AssetIcon src={`${OPERATIONS_ICONS}/servicedesk.svg`} /> },
      { title: "Work Orders", description: "Raise, assign & track maintenance work", icon: <AssetIcon src={`${OPERATIONS_ICONS}/work-orders.svg`} /> },
      { title: "Change & Config", description: "Controlled change & configuration management", icon: <AssetIcon src={`${OPERATIONS_ICONS}/config.svg`} /> },
      { title: "Supply & Spares", description: "Spares inventory & supply tracking", icon: <AssetIcon src={`${OPERATIONS_ICONS}/supply.svg`} /> },
      { title: "Health & Safety", description: "Operational HSE on the live site", icon: <AssetIcon src={`${OPERATIONS_ICONS}/health.svg`} /> },
    ],
  },
  {
    id: "physical-security",
    title: "Physical Security",
    iconBadge: `${SECURITY_ICONS}/physical.svg`,
    moduleCount: "03 Modules",
    description:
      "Unify zones, patrols, perimeter awareness and access-point oversight.",
    image: `${AEGIS_IMG}/physical-security.png`,
    imageAlt: "Security operations centre monitoring a live facility",
    features: [
      { title: "Physical Security", description: "Zones, patrols & security operations", icon: <AssetIcon src={`${SECURITY_ICONS}/security.svg`} /> },
      { title: "Perimeter Boundary", description: "Perimeter monitoring & breach awareness", icon: <AssetIcon src={`${SECURITY_ICONS}/boundar.svg`} /> },
      { title: "Security Point", description: "Checkpoint & access-point oversight", icon: <AssetIcon src={`${SECURITY_ICONS}/security-point.svg`} /> },
    ],
  },
  {
    id: "facility-twin",
    title: "Facility & Twin",
    iconBadge: `${FACILITY_ICONS}/facility.svg`,
    moduleCount: "04 Modules",
    description:
      "Visualise the data hall, thermal conditions, wireless coverage and continuity readiness.",
    image: `${AEGIS_IMG}/facility-twin.png`,
    imageAlt: "Digital twin render of a data hall",
    features: [
      { title: "Data Hall", description: "Digital twin of the data hall", icon: <AssetIcon src={`${FACILITY_ICONS}/hall.svg`} /> },
      { title: "Thermal & Cooling", description: "Thermal mapping & cooling performance", icon: <AssetIcon src={`${FACILITY_ICONS}/thermal.svg`} /> },
      { title: "WiFi Heatmap", description: "Wireless coverage visualisation", icon: <AssetIcon src={`${FACILITY_ICONS}/wifi.svg`} /> },
      { title: "Continuity & DR", description: "Business continuity & disaster readiness", icon: <AssetIcon src={`${FACILITY_ICONS}/DR.svg`} /> },
    ],
  },
  {
    id: "energy",
    title: "Energy",
    iconBadge: `${ENERGY_ICONS}/energy.svg`,
    moduleCount: "02 Modules",
    description: "Monitor power performance and optimise operational efficiency.",
    image: `${AEGIS_IMG}/energy.png`,
    imageAlt: "Energy infrastructure with wind turbines and power monitoring overlays",
    features: [
      { title: "Energy & Power", description: "Energy monitoring & power management", icon: <AssetIcon src={`${ENERGY_ICONS}/power.svg`} /> },
      { title: "Energy Mode", description: "Optimisation modes & efficiency control", icon: <AssetIcon src={`${ENERGY_ICONS}/energy_mode.svg`} /> },
    ],
  },
  {
    id: "analytics-ai",
    title: "Analytics & AI",
    iconBadge: `${AI_ICONS}/analytics-ai.svg`,
    moduleCount: "05 Modules",
    description:
      "Turn facility data into operational intelligence, capacity insight and executive reporting.",
    image: `${AEGIS_IMG}/analytics-ai.png`,
    imageAlt: "Analytics dashboards overlaid on facility devices",
    features: [
      { title: "Analytics", description: "Operational analytics across the facility", icon: <AssetIcon src={`${AI_ICONS}/analytics.svg`} /> },
      { title: "AI Insights", description: "AI-driven operational intelligence", icon: <AssetIcon src={`${AI_ICONS}/ai-insights.svg`} /> },
      { title: "Capacity", description: "Capacity planning & utilisation", icon: <AssetIcon src={`${AI_ICONS}/capacity.svg`} /> },
      { title: "Availability", description: "Uptime & availability tracking", icon: <AssetIcon src={`${AI_ICONS}/availability.svg`} /> },
      { title: "AI Report", description: "AI-generated executive reporting", icon: <AssetIcon src={`${AI_ICONS}/ai-report.svg`} /> },
    ],
  },
  {
    id: "governance",
    title: "Governance",
    iconBadge: `${GOVERNANCE_ICONS}/governance.svg`,
    moduleCount: "04 Modules",
    description:
      "Connect financial, ESG, compliance, enterprise risk and capital works oversight.",
    image: `${AEGIS_IMG}/governance.png`,
    imageAlt: "Governance and compliance reporting overlaid on a facility",
    features: [
      { title: "Financial ESG", description: "Financial & ESG performance", icon: <AssetIcon src={`${GOVERNANCE_ICONS}/esg.svg`} /> },
      { title: "Compliance & Audit", description: "Compliance posture & audit records", icon: <AssetIcon src={`${GOVERNANCE_ICONS}/audit.svg`} /> },
      { title: "Enterprise Risk", description: "Risk register & mitigation", icon: <AssetIcon src={`${GOVERNANCE_ICONS}/risk.svg`} /> },
      { title: "Capital Works", description: "Capital projects on the live facility", icon: <AssetIcon src={`${GOVERNANCE_ICONS}/capital.svg`} /> },
    ],
  },
];

// ── Motion ──────────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// The card grid is a fixed 2 x 3 board, so the section keeps one height no
// matter how many features the active module contributes.
const FEATURES_PER_PAGE = 6;

// Auto-advance cadence. 4 s matches PlatformOverview's carousel rather than
// ConnectedCapabilities' 2 s: a module here swaps six feature cards and a
// photo, and that transition alone runs close to a second.
const CYCLE_MS = 2000;
const RESUME_MS = 1000; // resume auto-play 6 s after manual interaction

// Header clip-wipe from the top — the site's signature heading reveal.
const wipeDown: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  show: (delay = 0) => ({
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { delay, duration: 0.6, ease: EASE },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay },
  }),
};

// Card reveal — rise + subtle scale, kept inside a stagger container.
const cardIn: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.94 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE, delay },
  }),
};

// Sidebar list — staggers its buttons down the column as the row reveals.
const navIn: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.15, staggerChildren: 0.08 } },
};

// The rail draws itself downward alongside the nav it measures.
const railDraw: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  show: (delay = 0) => ({
    scaleY: 1,
    opacity: 1,
    transition: { duration: 1.1, ease: EASE, delay },
  }),
};

// Trigger each group as IT enters the viewport — never on one tall wrapping
// container (which, being taller than the screen, fires the moment its top
// scrolls in and animates everything below the fold too early).
const VIEWPORT = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -120px 0px",
} as const;

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
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className="group relative h-full overflow-hidden rounded-[14px] border border-[#DCEFFC]/90 bg-[#F4FBFF]/40 p-3.5 sm:p-4 shadow-[0_4px_16px_rgba(10,75,110,0.04)] transition-all duration-300 hover:border-[#8ED0F5] hover:bg-white hover:shadow-[0_14px_28px_-14px_rgba(10,110,168,0.22)]"
    >
      {/* Corner circular badge seamlessly clipped into the top-right corner */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-2 -top-2 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-[#E2F0FB] to-[#F2F9FD] pl-0.5 pt-0.5 text-[#54A0DE] shadow-[inset_0_2px_6px_rgba(56,144,192,0.12)] transition-colors duration-300 group-hover:from-[#D4ECFB] group-hover:to-[#EAF6FE] group-hover:text-[#0A8EC8] [&>svg]:h-[19px] [&>svg]:w-[19px]"
      >
        {feature.icon ?? <Fallback />}
      </span>
      <h4 className="max-w-[76%] font-lato text-[15px] font-bold leading-[20px] text-[#18233F]">
        {feature.title}
      </h4>
      <p className="mt-1 max-w-[80%] font-lato text-[13px] font-normal leading-[18px] text-[#314158]">
        {feature.description}
      </p>
    </motion.div>
  );
}

export default function ConnectedCapabilitiesShowcase({
  heading = "Connected operations, real time Visibility, smarter Decisions",
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

  // ── Auto-advancing active module ──────────────────────────────────────────
  // Mirrors the PlatformOverview / ConnectedCapabilities carousels on the same
  // page: the active item steps forward on a timer, and any reader interaction
  // hands control back to them.
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hovering = useRef(false);
  const rowRef = useRef<HTMLDivElement>(null);
  // Never cycle off-screen — otherwise the reader scrolls down to a module
  // chosen at random by however long the page sat above the fold.
  const inView = useInView(rowRef, { amount: 0.25 });
  const reduceMotion = useReducedMotion();

  // Resume only if the pointer has actually left; a click while hovering would
  // otherwise restart the cycle under the reader's cursor 6 s later.
  const scheduleResume = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      if (!hovering.current) setPaused(false);
    }, RESUME_MS);
  };

  const selectModule = (i: number) => {
    setSelection({ activeIndex: i, pageIndex: 0 });
    setPaused(true);
    scheduleResume();
  };
  const selectPage = (i: number) => {
    setSelection((current) => ({ ...current, pageIndex: i }));
    setPaused(true);
    scheduleResume();
  };

  // Pointer anywhere over the row (nav or content card) holds playback, so the
  // board never swaps out from under someone mid-sentence.
  const holdPlayback = () => {
    hovering.current = true;
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  };
  const releasePlayback = () => {
    hovering.current = false;
    scheduleResume();
  };

  useEffect(() => {
    if (!inView || paused || reduceMotion || modules.length <= 1) return;
    const id = setInterval(
      () =>
        setSelection(({ activeIndex: i }) => ({
          activeIndex: (i + 1) % modules.length,
          pageIndex: 0,
        })),
      CYCLE_MS,
    );
    return () => clearInterval(id);
  }, [inView, paused, reduceMotion, modules.length]);

  useEffect(
    () => () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    },
    [],
  );

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

  const moduleCount = active.moduleCount ?? `${String(active.features.length).padStart(2, "0")} Modules`;

  return (
    <MotionConfig reducedMotion="user">
      {/* The three-column desktop layout (nav | rail | card+image) only has
          room for its full dimensions from xl up. Between lg and xl the gutters,
          nav, card padding and image all tighten so the feature-card column
          keeps ~400px — below that, card titles truncate and descriptions clip
          against the fixed-height board. */}
      <section className="w-full bg-[#f5fbff] px-6 py-5 lg:px-8 lg:py-7 xl:px-15">
        <div className={`mx-auto max-w-[1280px] ${className}`}>
          {/* Header */}
          <motion.div initial="hidden" whileInView="show" viewport={VIEWPORT}>
            <motion.h2
              variants={wipeDown}
              custom={0.05}
              className="max-w-[720px] font-lato text-[24px] font-extrabold leading-[32px] text-[#0A4B6E] sm:text-[28px] sm:leading-[36px]"
            >
              {heading}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="mt-2 max-w-[680px] font-lato text-[15px] font-normal leading-[22px] text-[#5C7E97] sm:text-[16px]"
            >
              {subtitle}
            </motion.p>
          </motion.div>

          {/* The nav, rail and content card share one trigger so they reveal as
              a single row rather than three unrelated pieces. */}
          <motion.div
            ref={rowRef}
            onMouseEnter={holdPlayback}
            onMouseLeave={releasePlayback}
            className="mt-8 flex flex-col gap-5 lg:mt-10 lg:flex-row lg:items-stretch lg:gap-3"
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Sidebar */}
            <motion.nav
              ref={navRef}
              variants={navIn}
              aria-label="Capability modules"
              className="flex gap-2.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:w-[200px] lg:shrink-0 lg:flex-col xl:w-[248px] lg:gap-3 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
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
                    variants={cardIn}
                    whileHover={!isActive ? { y: -2 } : undefined}
                    transition={{ type: "spring", stiffness: 320, damping: 24 }}
                    className="relative flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors duration-300 lg:shrink lg:flex-1"
                    style={{
                      background: isActive ? "#FFFFFF" : "#EAF6FE",
                      boxShadow: isActive
                        ? "0 14px 28px -18px rgba(10,110,168,0.4)"
                        : "0 8px 20px -16px rgba(10,75,110,0.18)",
                    }}
                  >
                    {isActive && mod.iconBadge ? (
                      /* Badge asset — the tile, glyph and drop shadow are all
                         baked in, so it stands in for the gradient circle.
                         The export is a 40x40 tile on a 76px canvas (the extra
                         room is shadow), so it renders at 68px to land the tile
                         itself on 36px, absolutely positioned so the shadow
                         overflows the 36px layout box instead of inflating it.
                         The tile sits 4 SVG units above centre (the shadow
                         falls below), hence the +3.6px y-nudge. */
                      <span
                        aria-hidden
                        className="relative flex h-9 w-9 shrink-0 items-center justify-center"
                      >
                        <Image
                          src={mod.iconBadge}
                          alt=""
                          width={76}
                          height={76}
                          unoptimized
                          className="pointer-events-none absolute left-1/2 top-1/2 h-[68px] w-[68px] max-w-none"
                          style={{ transform: "translate(-50%, calc(-50% + 3.6px))" }}
                        />
                      </span>
                    ) : isActive ? (
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
            </motion.nav>

            {/* Scroll rail */}
            <motion.div
              variants={railDraw}
              custom={0.25}
              className="relative hidden w-1 shrink-0 overflow-hidden rounded-full bg-[#E3EFFA] lg:block"
              /* originY 0 so the track grows downward from the top rather than
                 outward from its middle. */
              style={{ height: rail.trackHeight || undefined, originY: 0 }}
            >
              <motion.div
                aria-hidden
                className="absolute left-0 w-full rounded-full bg-gradient-to-b from-[#21B1F1] to-[#0A6FA8]"
                animate={{ top: rail.thumbTop, height: rail.thumbHeight }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
              />
            </motion.div>

            {/* Content card */}
            <motion.div
              variants={cardIn}
              custom={0.3}
              className="relative min-w-0 flex-1 overflow-hidden rounded-[28px] border border-[#EAF3FB] bg-white p-5 shadow-[0_25px_60px_-28px_rgba(10,75,110,0.3)] sm:p-6 lg:p-5 xl:p-7"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-6 xl:gap-8">
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
                      {/* Top row: nothing but the number badge (start) and the
                          module count pill (end) — the title owns the line
                          below, so neither can crowd the other. */}
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-lato text-[16px] font-extrabold text-white shadow-[0_4px_12px_rgba(10,142,200,0.25)]"
                          style={{
                            background: "linear-gradient(135deg,#21B1F1,#0A6FA8)",
                          }}
                        >
                          {active.number ?? String(activeIndex + 1).padStart(2, "0")}
                        </span>

                        <span className="shrink-0 rounded-full border border-white/80 bg-[#EAF6FE] px-3.5 py-1.5 font-lato text-[12px] font-bold text-[#0A6FA8] shadow-[0_2px_8px_rgba(10,110,168,0.08)]">
                          {moduleCount}
                        </span>
                      </div>

                      {/* Second line: the module's own title. Full width now
                          that it no longer shares the badge row. */}
                      <h3 className="mt-3.5 max-w-[560px] font-lato text-[15px] font-bold leading-[22px] text-[#0A4B6E] sm:min-h-[44px] sm:text-[16px] sm:leading-[24px]">
                        {active.description}
                      </h3>
                    </motion.div>
                  </AnimatePresence>

                  {/* Fixed 2 x 3 board */}
                  {/* Fixed board height keeps the section stable across
                      modules. lg gets 20px more so a title that wraps to two
                      lines in the narrower column still clears its row. */}
                  <div className="relative mt-5 min-h-[200px] flex-1 sm:h-[336px] sm:flex-none lg:h-[356px] xl:h-[336px]">
                    {/* `whileInView` rather than `animate`, and no
                        `initial={false}`, so the very first board staggers in
                        when the section is scrolled to — with `animate` it
                        played at page load, long above the fold, and the user
                        arrived to a board that had already settled. Later
                        module/page swaps re-key this node and stagger as before. */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${active.id}-${pageIndex}`}
                        variants={gridVariants}
                        initial="enter"
                        whileInView="center"
                        exit="exit"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid h-full grid-cols-1 gap-3 sm:auto-rows-fr sm:grid-cols-2 sm:grid-rows-3"
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
                  // Width at lg/xl is picked to roughly match the photos'
                  // own ~2:3 aspect ratio at the height this panel stretches
                  // to (matching the text column) — narrower and the photos
                  // over-crop, wider and the panel would need to grow taller
                  // than its sibling, so this is the balance point.
                  className="relative h-[220px] w-full shrink-0 overflow-hidden rounded-2xl sm:h-[280px] lg:h-auto lg:w-[250px] xl:w-[330px]"
                >
                  <AnimatePresence mode="sync">
                    <motion.div
                      key={active.id}
                      variants={imageVariants}
                      initial="enter"
                      whileInView="center"
                      exit="exit"
                      viewport={{ once: true, amount: 0.2 }}
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

              {/* Bottom pagination matching Figma 58x5px capsules */}
              <motion.div
                variants={fadeUp}
                custom={0.55}
                className="mt-6 flex h-2 items-center justify-center gap-2"
              >
                {pages.length > 1 &&
                  pages.map((_, i) => (
                    <motion.button
                      key={i}
                      type="button"
                      aria-label={`Show feature set ${i + 1} of ${pages.length}`}
                      onClick={() => selectPage(i)}
                      animate={{
                        width: i === pageIndex ? 48 : 24,
                        backgroundColor: i === pageIndex ? "#3890C0" : "#D4F0FF",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="h-1.5 rounded-full"
                    />
                  ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
