/**
 * Geofencing page content — single source of truth.
 * The page composes shared components (the common hero, partner logos, footer)
 * and one page-specific section (ConnectedSystem); all copy + image paths live
 * here so they can be edited in one place, mirroring the industries pages.
 */

export const geofencingContent = {
  hero: {
    heading: "Set Boundaries. Enforce Them Instantly.",
    subtitle:
      "Define restricted zones, monitor movement in real time, and prevent unauthorized access before it becomes a safety or operational risk.",
    bgImage: "/geofencing/hero.png",
  },
  connectedSystem: {
    heading: "Part of a connected workforce and safety system",
    intro:
      "Contractor compliance is fully integrated within the V-Watch Ai platform linking identity, access, safety, and workforce management.",
    mapImage: "/geofencing/connected-system.jpg",
  },
  partners: {
    title: "Built for environments where boundaries matter",
    description:
      "Used across construction, industrial, and high-security operations to enforce zone control and prevent critical incidents.",
  },
  footer: {
    ctaTitle: "Take control of your operational boundaries",
    ctaText:
      "See how V-Watch Ai helps you monitor movement, enforce restricted zones, and prevent risks in real time.",
    linkColumns: [
      { heading: "Platform", links: ["Dashboard", "BI Reporting", "System Integrators"] },
      { heading: "Industries", links: ["Construction", "Industrial", "Commercial"] },
      { heading: "Company", links: ["About Us", "Contact"] },
    ],
  },
};
