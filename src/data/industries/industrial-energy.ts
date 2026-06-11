/**
 * Industrial & Energy industry page content — single source of truth.
 * Mirrors the construction page structure and composes the same shared
 * components; all copy lives here so it can be edited in one place.
 *
 * NOTE: imagery currently reuses the construction assets as placeholders.
 * Swap the `/industries/construction/...` paths for industrial-energy
 * specific assets once they are available.
 */

export const industrialEnergyContent = {
  hero: {
    badge: "Industrial & Energy",
    heading: "Take Control of High-Risk Industrial & Energy Sites",
    subtitle:
      "V-Watch Ai gives industrial and energy teams real-time visibility into people, contractors, and safety across plants, refineries, and utility sites so you can reduce risk, stay compliant, and keep operations running safely.",
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
    resultLabel: "This Leads To",
    results: [
      "Workers entering restricted or dangerous zones unnoticed",
      "Delayed response during emergencies",
      "Difficulty accounting for personnel during incidents",
      "Limited control over contractor access and compliance",
      "Increased exposure to safety violations and operational risk",
    ],
    callout: "When visibility is incomplete, safety and control are at risk.",
    calloutIcon: "/industries/construction/sites/grow-light.svg",
    images: [
      "/industries/industrial&energy/visibility/visibility-1.png",
      "/industries/industrial&energy/visibility/visibility-2.png",
      "/industries/industrial&energy/visibility/visibility-3.png",
      "/industries/industrial&energy/visibility/visibility-4.png",
    ],
  },
  onePlatform: {
    heading: "One platform to manage your entire facility",
    subtitle:
      "V-Watch Ai brings together access control, real-time tracking, operations management, and workforce intelligence into a single system designed specifically for high-risk industrial and energy environments.",
    skylineImage: "/industries/industrial&energy/real-time/factory.png",
    features: [
      {
        icon: "/industries/industrial&energy/real-time/monitoring.svg",
        title: "Real-Time Monitoring",
        desc: "Continuously monitor people, contractors, and operations across your entire facility in real time.",
      },
      {
        icon: "/industries/industrial&energy/real-time/tracking.svg",
        title: "Workforce & Asset Tracking",
        desc: "Track the live location of personnel and critical assets across every zone.",
        active: true,
      },
      {
        icon: "/industries/industrial&energy/real-time/emergency.svg",
        title: "Emergency Response & Mustering",
        desc: "Account for everyone instantly and respond faster when incidents occur.",
      },
    ],
    allowsLabel: "It allows you to",
    allows: [
      {
        badge: "/industries/construction/one-platform/one.svg",
        title: "See who is on-site and where they are",
      },
      {
        badge: "/industries/construction/one-platform/two.svg",
        title: "Control access and compliance in real time",
      },
      {
        badge: "/industries/construction/one-platform/three.svg",
        title: "Manage operations and permits efficiently",
      },
      {
        badge: "/industries/construction/one-platform/four.svg",
        title: "Track workforce performance using real data",
      },
    ],
    platformImage: "/industries/industrial&energy/real-time/factory-image.png",
  },
  whyChoose: {
    heading: "Why industrial & energy teams choose V-Watch Ai",
    subheading: "Most solutions address only one part of the problem.",
    cardTitle: "V-Watch AI connects everything.",
    cardLogo: "/industries/construction/v-watch-ai/vwatch.png",
    cardImage: "/industries/construction/v-watch-ai/AI.png",
    items: [
      {
        icon: "/industries/construction/v-watch-ai/access.png",
        title: "Not just access",
        desc: "But movement, operations, and workforce.",
        number: "/industries/construction/v-watch-ai/01.png",
      },
      {
        icon: "/industries/construction/v-watch-ai/track.png",
        title: "Not just tracking",
        desc: "But real-time control.",
        number: "/industries/construction/v-watch-ai/02.png",
      },
      {
        icon: "/industries/construction/v-watch-ai/Shield.png",
        title: "Not just data",
        desc: "But proof you can act on.",
        number: "/industries/construction/v-watch-ai/03.png",
      },
    ],
  },
  environments: {
    heading: "Designed for a wide range of industrial and energy environments",
    subtitle:
      "V-Watch Ai adapts to different types of industrial and energy operations wherever workforce coordination, compliance, and site control are critical.",
    cards: [
      {
        image: "/industries/construction/designed-environment/env-1.png",
        title: "Oil & Gas Facilities",
        desc: "Maintain control across high-risk environments with strict permit-to-work and hazardous zone requirements.",
        active: true,
      },
      {
        image: "/industries/construction/designed-environment/env-2.png",
        title: "Power Plants & Energy Production",
        desc: "Coordinate operators and contractors safely across complex, high-voltage process areas.",
      },
      {
        image: "/industries/construction/designed-environment/env-3.png",
        title: "Manufacturing Plants",
        desc: "Handle complex operations with strict safety requirements and multiple specialized contractors.",
      },
      {
        image: "/industries/construction/designed-environment/env-4.png",
        title: "Chemical & Processing Plants",
        desc: "Enforce strict access control and precise coordination in mission-critical, high-hazard plants.",
      },
      {
        image: "/industries/construction/designed-environment/env-5.png",
        title: "Warehouses & Distribution",
        desc: "Track distributed workforces and vendors across large storage and logistics sites.",
      },
      {
        image: "/industries/construction/designed-environment/env-6.png",
        title: "Logistics & Heavy Industry",
        desc: "Manage field teams and contractors across substations, networks, and remote assets.",
      },
    ],
    footerImage: "/industries/construction/designed-environment/env-footer.png",
  },
  connected: {
    heading: "From risk to response, in real time",
    subtitle:
      "Every environment faces similar operational challenges explore solutions based on your specific needs.",
    steps: [
      {
        icon: "capture",
        title: "Capture",
        desc: "Collect real-time data from site access, movement, and operations.",
      },
      {
        icon: "control",
        title: "Control",
        desc: "Manage permits, workflows, and compliance across all operators and contractors.",
      },
      {
        icon: "prove",
        title: "Prove",
        desc: "Generate reports and insights that provide full visibility and audit-ready data.",
      },
    ],
  },
  useCases: {
    heading: "Critical cases for industrial and energy environments",
    subtitle:
      "Every environment faces similar operational challenges explore solutions based on your specific needs.",
    cards: [
      {
        image: "/industries/industrial&energy/critical-usecase/workforce.png",
        title: "Workforce Operations",
        desc: "Track and coordinate personnel across plants, zones, and shifts in real time.",
      },
      {
        image: "/industries/industrial&energy/critical-usecase/facialrecognition.png",
        title: "Facial Recognition",
        desc: "Deploy touchless entry points across high-security and high-traffic zones.",
      },
      {
        image: "/industries/industrial&energy/critical-usecase/maintenance.png",
        title: "Predictive Maintenance",
        desc: "Anticipate equipment issues before they cause downtime or safety risk.",
      },
      {
        image: "/industries/industrial&energy/critical-usecase/prevention.png",
        title: "Hazard Detection & Prevention",
        desc: "Detect unsafe conditions and unauthorized movement across high-risk areas.",
      },
    ],
  },
  footer: {
    ctaTitle: "Find the right solution for your industrial & energy sites",
    ctaText:
      "Explore how V-Watch Ai can help you improve visibility, strengthen compliance, and take full control of your industrial and energy operations.",
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
