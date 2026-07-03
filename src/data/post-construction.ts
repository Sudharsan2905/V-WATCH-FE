/**
 * Post-construction (V-Watch Aegis) page content — single source of truth.
 * The page reuses the SAME section components as the pre-construction page
 * (SinglePlatform, PlatformOverview, ComplexEnvironments); only the copy and
 * image paths below differ. Image paths marked "ADD" need a file dropped in
 * /public at that exact path.
 */

export const postConstructionContent = {
  hero: {
    heading: "V-Watch Aegis",
    subtitle:
      "Operational security, monitoring, and compliance unified into one platform that protects your facility long after construction ends.",
    // ADD → /public/post-construction/hero.webp  (full-bleed dark isometric scene)
    bgImage: "/post-construction/hero.webp",
  },

  // ── "A unified platform for operational security and control" (SinglePlatform)
  unifiedPlatform: {
    heading: "A unified platform for operational security and control",
    intro:
      "V-Watch Aegis brings together physical security, operational security, operational monitoring, and compliance into one integrated platform giving you full visibility and protection across your facility.",
    detail: "It allows you to monitor, secure, and maintain your facility from one place.",
    // Post-construction uses the checklist layout (icon + full sentence), not the
    // glass cards. Icons reuse the existing pre-construction set — swap the paths
    // here if you add dedicated icons.
    variant: "checklist" as const,
    pillBadge: false,
    features: [
      { icon: "/pre-construction/single-platform/icons/icon-1.png", label: "Monitor and secure your operations in real time" },
      { icon: "/pre-construction/single-platform/icons/icon-2.png", label: "Detect and respond to threats early" },
      { icon: "/pre-construction/single-platform/icons/icon-3.png", label: "Maintain compliance across systems and processes" },
      { icon: "/pre-construction/single-platform/icons/icon-4.png", label: "Ensure continuous uptime and operational stability" },
    ],
    pill: "",
    // ADD → /public/post-construction/single-platform/map.png
    mapImage: "/post-construction/single-platform/map.png",
  },

  // ── "Built for long-term operational security" (PlatformOverview)
  longTermSecurity: {
    heading: "Built for long-term operational security",
    bannerText: "Security is not a feature it's a continuous operation.",
    capabilities: [
      {
        number: "01",
        title: "Security Monitoring & Threat Detection",
        points: [
          "SIEM and event correlation",
          "Real-time threat detection",
          "Incident monitoring and alerts",
        ],
        // ADD → /public/post-construction/platform-overview/security-monitoring.webp
        image: "/post-construction/platform-overview/security-monitoring.webp",
      },
      {
        number: "02",
        title: "Identity & Access Control",
        points: [
          "Centralised identity and access management",
          "Access policy enforcement",
          "Continuous monitoring of entry and activity",
        ],
        image: "/post-construction/platform-overview/identity-access.webp",
      },
      {
        number: "03",
        title: "OT & Infrastructure Security",
        points: [
          "SCADA and OT system monitoring",
          "Infrastructure protection",
          "Integration with facility systems",
        ],
        image: "/post-construction/platform-overview/ot-infrastructure.webp",
      },
      {
        number: "04",
        title: "Compliance & Risk Management",
        points: [
          "Continuous regulatory monitoring",
          "Audit and risk reporting",
          "ISO 27001 / IEC alignment support",
        ],
        image: "/post-construction/platform-overview/compliance-risk.webp",
      },
      {
        number: "05",
        title: "Incident Response & Management",
        points: [
          "Real-time incident detection",
          "Coordinated response workflows",
          "Escalation and resolution tracking",
        ],
        image: "/post-construction/platform-overview/incident-response.webp",
      },
      {
        number: "06",
        title: "Audit & Forensics",
        points: [
          "Historical data analysis",
          "Incident investigation support",
          "Full operational traceability",
        ],
        image: "/post-construction/platform-overview/audit-forensics.webp",
      },
    ],
  },

  // ── "Built for critical operational environments" (ComplexEnvironments)
  criticalEnvironments: {
    heading: "Built for critical operational environments",
    topCards: [
      {
        title: "Data Centers",
        description:
          "Ensure maximum uptime, strict access control, and continuous monitoring for mission-critical infrastructure.",
        image: "/post-construction/critical-environments/data-centers.webp",
      },
      {
        title: "Industrial & Energy Facilities",
        description:
          "Protect high-risk environments with real-time monitoring, OT security, and compliance enforcement.",
        image: "/post-construction/critical-environments/industrial-energy.jpg",
      },
      {
        title: "Commercial & Facilities",
        description:
          "Manage building operations, access control, and security across multi-use environments.",
        image: "/post-construction/critical-environments/commercial-facilities.jpg",
      },
    ],
    bottomCards: [
      {
        title: "Oil & Gas Operations",
        description:
          "Monitor critical assets, enforce security protocols, and reduce operational risk.",
        image: "/post-construction/critical-environments/oil-gas.jpg",
      },
      {
        title: "Infrastructure & Utilities",
        description:
          "Ensure long-term operational continuity across large-scale infrastructure networks.",
        image: "/post-construction/critical-environments/infrastructure-utilities.webp",
      },
    ],
  },

  // ── "Your operations begin with full context from day one." (PostConstructionTransition)
  // Feature cards, panel image, and the CTA (auto-derived from the route →
  // "Explore Pre-Construction (Atlas)") keep the component defaults.
  continuity: {
    heading: "Your operations begin with full context from day one.",
    intro:
      "V-Watch Aegis builds on the data captured during construction through Atlas.",
    pill: "",
    panelTitle:
      "There is no need for re-onboarding or rebuilding systems. Key data flows directly into operations",
  },

  footer: {
    ctaTitle: "Secure and control your operations for the long term",
    ctaText:
      "See how V-Watch Aegis helps you maintain security, ensure compliance, and protect your operations across their entire lifecycle.",
    linkColumns: [
      { heading: "Platform", links: ["Dashboard", "BI Reporting", "System Integrators"] },
      { heading: "Industries", links: ["Construction", "Industrial", "Commercial"] },
      { heading: "Company", links: ["About Us", "Contact"] },
    ],
  },
};
