/**
 * Industrial & Energy industry page content — single source of truth.
 * Mirrors the construction page structure and composes the same shared
 * components; all copy lives here so it can be edited in one place.
 *
 * Hero, Challenges, One-Platform, Why-Choose and Use-Cases use the dedicated
 * /industries/industrial&energy assets. Environments + Connected reuse the
 * construction imagery as placeholders.
 */

export const industrialEnergyContent = {
  hero: {
    badge: "Industrial & Energy",
    heading: "Operate Safely in High-Risk Environments — With Full Visibility ",
    subtitle:
      "Monitor people, movement, and operations in real time across industrial sites — reducing risk, improving response time, and always ensuring strict compliance.",
    bgImage: "/industries/industrial&energy/industrial.png",
  },
  challenges: {
    heading: "In high-risk environments, visibility is not optional",
    subheading:
      "Industrial and energy operations involve complex, high-risk conditions",
    features: [
      {
        icon: "/industries/industrial&energy/visibility/hazard.svg",
        title: "Hazardous zones and restricted areas",
      },
      {
        icon: "/industries/industrial&energy/visibility/safety.svg",
        title: "Strict safety and regulatory requirements",
      },
      {
        icon: "/industries/industrial&energy/visibility/workforce.svg",
        title: "Large, distributed workforces",
      },
      {
        icon: "/industries/industrial&energy/visibility/infrastructure.svg",
        title: "Critical equipment and infrastructure",
      },
    ],
    summary: "But many sites still lack real-time visibility",
    resultLabel: "This Leads to:",
    results: [
      "Workers entering restricted or dangerous zones unnoticed",
      "Delayed response during emergencies",
      "Difficulty accounting for personnel during incidents",
      "Limited control over contractor access and compliance",
      "Increased exposure to safety violations and operational risk",
    ],
    callout: "When visibility is delayed, risk becomes uncontrollable.",
    calloutIcon: "/industries/construction/sites/grow-light.svg",
    images: [
      "/industries/industrial&energy/visibility/visibility-1.png",
      "/industries/industrial&energy/visibility/visibility-2.png",
      "/industries/industrial&energy/visibility/visibility-3.png",
      "/industries/industrial&energy/visibility/visibility-4.png",
    ],
  },
  onePlatform: {
    heading: "Real-time awareness across your entire operation",
    subtitle:
      "V-Watch Ai provides continuous, real-time visibility of people, movement, and activity across your site — allowing you to prevent risks, respond instantly, and maintain control.",
    skylineImage: "/industries/industrial&energy/real-time/factory.png",
    features: [
      {
        icon: "/industries/industrial&energy/real-time/tracking.svg",
        title: "Real-Time Personnel Tracking",
        desc: "Know where every worker is — especially in high-risk or hazardous areas.",
        active: true,
      },
      {
        icon: "/industries/industrial&energy/real-time/monitoring.svg",
        title: "Restricted Zone Monitoring",
        desc: "Ensure only authorised personnel enter sensitive or dangerous zones.",
      },
      {
        icon: "/industries/industrial&energy/real-time/emergency.svg",
        title: "Emergency Response & Muster",
        desc: "Instantly identify who is present, missing, or safe during emergencies.",
      },
      {
        icon: "/industries/industrial&energy/real-time/monitoring.svg",
        title: "Compliance & Access Control",
        desc: "Verify identity and ensure all personnel meet safety and certification requirements.",
      },
      {
        icon: "/industries/industrial&energy/real-time/tracking.svg",
        title: "Asset & Equipment Visibility",
        desc: "Track critical assets and equipment to improve utilization and prevent loss.",
      },
      {
        icon: "/industries/industrial&energy/real-time/monitoring.svg",
        title: "Operational Awareness",
        desc: "Maintain a live view of site activity to support faster, more informed decisions.",
      },
    ],
    allowsLabel: "It allows you to",
    allows: [
      {
        badge: "/industries/construction/one-platform/one.svg",
        title: "Track where personnel are at all times",
      },
      {
        badge: "/industries/construction/one-platform/two.svg",
        title: "Monitor restricted zones and enforce boundaries",
      },
      {
        badge: "/industries/construction/one-platform/three.svg",
        title: "Respond quickly to incidents and emergencies",
      },
      {
        badge: "/industries/construction/one-platform/four.svg",
        title: "Maintain compliance with accurate, real-time data",
      },
    ],
    platformImage: "/industries/industrial&energy/real-time/factory-image.png",
  },
  whyChoose: {
    heading: "Why industrial and energy operators choose V-Watch AI",
    subheading: "Most systems provide partial visibility.",
    cardTitle: "V-Watch AI provides complete awareness.",
    cardLogo: "/industries/construction/v-watch-ai/vwatch.png",
    cardImage: "/industries/industrial&energy/v-watch-ai/commerical.webp",
    cardContent: "This allows you to move from reactive safety management to proactive risk control.",
    items: [
      {
        icon: "/industries/industrial&energy/v-watch-ai/tracking.svg",
        title: "Not just tracking",
        desc: "But real-time situational control.",
        number: "/industries/construction/v-watch-ai/01.png",
      },
      {
        icon: "/industries/industrial&energy/v-watch-ai/alerts.svg",
        title: "Not just alerts",
        desc: "But actionable insights.",
        number: "/industries/construction/v-watch-ai/02.png",
      },
      {
        icon: "/industries/industrial&energy/v-watch-ai/data.svg",
        title: "Not just data",
        desc: "But verifiable proof for safety and compliance.",
        number: "/industries/construction/v-watch-ai/03.png",
      },
    ],
  },
  environments: {
    heading: "Designed for a wide range of industrial and energy environments",
    subtitle:
      "V-Watch Ai adapts to complex, high-risk environments where safety, compliance, and real-time control are critical.",
    cards: [
      {
        image: "/industries/construction/designed-environment/env-6.png",
        title: "Oil & Gas Facilities (Onshore & Offshore)",
        desc: "Monitor personnel in hazardous zones, enforce restricted access, and ensure rapid response during emergencies.",
        active: true,
        originalImage: "/industries/construction/designed-environment/1.webp",
      },
      {
        image: "/industries/construction/designed-environment/env-1.png",
        title: "Power Plants & Energy Facilities",
        desc: "Track workforce movement across critical infrastructure and maintain strict safety compliance at all times.",
        originalImage: "/industries/construction/designed-environment/2.webp",
      },
      {
        image: "/industries/construction/designed-environment/env-2.png",
        title: "Manufacturing Plants",
        desc: "Improve operational visibility, monitor workforce activity, and ensure safety across production environments.",
        originalImage: "/industries/construction/designed-environment/3.webp",
      },
      {
        image: "/industries/construction/designed-environment/env-3.png",
        title: "Chemical & Processing Plants",
        desc: "Control access to sensitive areas and track personnel in environments where safety risks are high.",
        originalImage: "/industries/construction/designed-environment/4.webp",
      },
      {
        image: "/industries/construction/designed-environment/env-4.png",
        title: "Infrastructure & Utilities Sites",
        desc: "Manage distributed teams across large areas while maintaining visibility and coordination.",
        originalImage: "/industries/construction/designed-environment/5.webp",
      },
      {
        image: "/industries/construction/designed-environment/env-5.png",
        title: "Logistics & Warehousing (High-Risk Operations)",
        desc: "Track movement of personnel and assets in fast-moving environments where coordination and safety are essential.",
        originalImage: "/industries/construction/designed-environment/6.webp",
      },
    ],
    footerImage: "/industries/construction/designed-environment/env-footer.png",
  },
  connected: {
    heading: "From risk detection to response — in real time",
    subtitle:
      "Every environment faces similar operational challenges explore solutions based on your specific needs.",
    steps: [
      {
        icon: "capture",
        title: "Capture",
        desc: "Collect real-time data from movement tracking, access points, and operational systems.",
      },
      {
        icon: "control",
        title: "Control",
        desc: "Set permissions, enforce boundaries, and manage workflows across your site.",
      },
      {
        icon: "prove",
        title: "Prove",
        desc: "Generate accurate reports and audit trails for compliance and safety.",
      },
    ],
  },
  useCases: {
    heading: "Critical use cases for industrial and energy environments",
    subtitle:
      "Every environment faces similar operational challenges explore solutions based on your specific needs.",
    cards: [
      {
        image: "/industries/industrial&energy/critical-usecase/preventions.png",
        title: "Geofencing Restricted Zones",
        desc: "Detect unauthorized movement across restricted and hazardous site zones.",
      },
      {
        image: "/industries/industrial&energy/critical-usecase/workforces.png",
        title: "Real-Time Headcount & Emergency Muster",
        desc: "Instantly identify who is present, missing, or safe during emergencies.",
      },
      {
        image: "/industries/industrial&energy/critical-usecase/facialrecognitions.png",
        title: "Contractor Compliance Tracking",
        desc: "Ensure every contractor meets safety and certification requirements.",
      },
      {
        image: "/industries/industrial&energy/critical-usecase/maintenances.png",
        title: "Maintenance Ticketing & Service Orders",
        desc: "Manage maintenance requests and service orders from report to resolution.",
      },
    ],
  },
  footer: {
    ctaTitle: "Take control of safety across your operation",
    ctaText:
      "See how V-Watch Ai can help you reduce risk, improve response time, and maintain full visibility across your site.",
    linkColumns: [
      {
        heading: "Platform",
        links: ["DVA Access", "RTLS Tracking", "SMS Workflow", "HRMS Management"],
      },
      {
        heading: "Industries",
        links: ["Construction", "Industrial", "Commercial"],
      },
      {
        heading: "Company",
        links: ["About Us", "Contact", "Career", "Terms of Service"],
      },
    ],
  },
};
