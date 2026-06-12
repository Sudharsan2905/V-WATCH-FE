/**
 * Construction industry page content — single source of truth.
 * The page composes shared components; all copy lives here so it can be
 * edited in one place (and mirrored for other industries).
 */

export const constructionContent = {
  hero: {
    badge: "Construction",
    heading: "Take Control of Complex Construction Sites",
    subtitle:
      "V-Watch Ai gives construction teams real-time visibility into people, equipment, and safety across every site so you can reduce risk, stay compliant, and keep projects on schedule.",
    bgImage: "/industries/construction/construction.png"
  },
  challenges: {
    heading: "Construction sites are complex and difficult to control",
    subheading: "Every construction project involves multiple moving parts",
    features: [
      {
        icon: "/industries/construction/sites/icons/vendors.svg",
        title: "Main contractors, subcontractors, and vendors",
      },
      {
        icon: "/industries/construction/sites/icons/worker.svg",
        title: "Hundreds or thousands of workers on-site",
      },
      {
        icon: "/industries/construction/sites/icons/sheild.svg",
        title: "Strict safety and compliance requirements",
      },
      {
        icon: "/industries/construction/sites/icons/tasks.svg",
        title: "Constant movement across zones and tasks",
      },
    ],
    summary:
      "But most sites still rely on manual processes and disconnected systems.",
    resultLabel: "The Result",
    results: [
      "Limited visibility of who is on-site",
      "Compliance risks and expired certifications going unnoticed",
      "Unauthorised access to restricted areas",
      "Delays caused by poor coordination",
      "Difficulty tracking workforce productivity",
    ],
    callout: "When visibility is incomplete, risks increase and control is lost.",
    calloutIcon: "/industries/construction/sites/grow-light.svg",
    // Order: [top-left aerial, worker/hologram, lower-left, crane].
    images: [
      "/industries/construction/sites/multiple-moving-part-1.svg",
      "/industries/construction/sites/mutiple-moving-part-2.svg",
      "/industries/construction/sites/mutiple-moving-part-3.svg",
      "/industries/construction/sites/mutiple-moving-part-4.svg",
    ],
  },
  onePlatform: {
    heading: "One platform to manage your entire site",
    subtitle:
      "V-Watch Ai brings together access control, real-time tracking, operations management, and workforce intelligence into a single system designed specifically for complex construction environments.",
    skylineImage: "/industries/construction/one-platform/buildings.png",
    // The `active` item is highlighted; the others render muted.
    features: [
      {
        icon: "/industries/construction/one-platform/workforce.svg",
        title: "Full Workforce Visibility",
        desc: "Know exactly who is on-site, across all contractors and vendors in real time.",
      },
      {
        icon: "/industries/construction/one-platform/compilance.svg",
        title: "Automated Compliance Management",
        desc: "Track certifications, safety passes, and requirements automatically and receive alerts before issues arise.",
        active: true,
      },
      {
        icon: "/industries/construction/one-platform/zone.svg",
        title: "Access & Zone Control",
        desc: "Ensure only authorized personnel enter your site and access specific areas.",
      },
      {
        icon: "/industries/construction/sites/icons/worker.svg",
        title: "Real-Time Movement Tracking",
        desc: "Monitor movement across zones to improve safety and coordination.",
      },
      {
        icon: "/industries/construction/sites/icons/sheild.svg",
        title: "Fatigue Monitoring & Safety Management",
        desc: "Monitor working hours and detect fatigue risks to prevent accidents and improve workforce safety.",
        bullets: [
          "Identify overworked personnel",
          "Reduce risk of fatigue-related incidents",
          "Improve compliance with safety regulations",
        ],
      },
      {
        icon: "/industries/construction/sites/icons/tasks.svg",
        title: "Manhour & Productivity Insights",
        desc: "Capture actual manhours worked and measure productivity based on real activity not assumptions.",
        bullets: [
          "Understand time spent on-site",
          "Track work duration and output",
          "Identify inefficiencies and delays",
        ],
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
        title: "Manage operations and tasks efficiently",
      },
      {
        badge: "/industries/construction/one-platform/four.svg",
        title: "Track workforce performance using real data",
      },
    ],
    platformImage: "/industries/construction/one-platform/platform.png",
  },
  whyChoose: {
    heading: "Why construction teams choose V-Watch Ai",
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
    heading: "Designed for any environment.",
    subtitle:
      "V-Watch Ai adapts to different types of construction projects wherever workforce coordination, compliance, and site control are critical.",
    cards: [
      {
        image: "/industries/construction/designed-environment/env-1.png",
        title: "High-Rise & Commercial",
        desc: "Manage large workforces, multiple contractors, and high volumes of site activity across vertical environments.",
        active: true,
      },
      {
        image: "/industries/construction/designed-environment/env-2.png",
        title: "Infrastructure & Civil",
        desc: "Coordinate teams across large, distributed areas such as highways, bridges, and rail systems.",
      },
      {
        image: "/industries/construction/designed-environment/env-3.png",
        title: "Residential Developments",
        desc: "Track workforce activity and ensure smooth coordination across multi-phase housing projects.",
      },
      {
        image: "/industries/construction/designed-environment/env-4.png",
        title: "Energy & Utility Projects",
        desc: "Maintain control across high-risk construction environments such as oil & gas facilities and power plants.",
      },
      {
        image: "/industries/construction/designed-environment/env-5.png",
        title: "Industrial Construction Sites",
        desc: "Handle complex builds involving strict safety requirements and multiple specialized contractors.",
      },
      {
        image: "/industries/construction/designed-environment/env-6.png",
        title: "Data Centre Construction",
        desc: "Manage strict access control, high-security requirements, and precise coordination in mission-critical builds.",
      },
    ],
    footerImage: "/industries/construction/designed-environment/env-footer.png",
  },
  connected: {
    heading: "From site entry to project execution fully connected",
    subtitle:
      "Every environment faces similar operational challenges explore solutions based on your specific needs.",
    // `icon` keys map to the inline SVG set in the Connected component.
    steps: [
      {
        icon: "capture",
        title: "Capture",
        desc: "Collect real-time data from site access, movement, and operations.",
      },
      {
        icon: "control",
        title: "Control",
        desc: "Manage permissions, workflows, and compliance across all contractors and teams.",
      },
      {
        icon: "prove",
        title: "Prove",
        desc: "Generate reports and insights that provide full visibility and audit-ready data.",
      },
    ],
  },
  useCases: {
    heading: "Solve critical construction challenges",
    subtitle:
      "Every environment faces similar operational challenges explore solutions based on your specific needs.",
    cards: [
      {
        image: "/industries/construction/critical-construction/facial_recognition.png",
        title: "Facial Recognition",
        desc: "Deploy touchless entry points across high-traffic zones.",
      },
      {
        image: "/industries/construction/critical-construction/compilance_tracking.png",
        title: "Compliance tracking",
        desc: "Ensure every third-party worker meets safety requirements.",
      },
      {
        image: "/industries/construction/critical-construction/emergency_count.png",
        title: "Emergency Muster & Headcount",
        desc: "Track safety, missing, and onsite personnel during emergencies.",
      },
      {
        image: "/industries/construction/critical-construction/restricted zones.png",
        title: "Geofencing Restricted Zones",
        desc: "Detect unauthorized movement across restricted site zones.",
      },
    ],
  },
  footer: {
    ctaTitle: "Find the right solution for your construction sites",
    ctaText:
      "Explore how V-Watch Ai can help you improve visibility, strengthen compliance, and take full control of your construction operations.",
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
