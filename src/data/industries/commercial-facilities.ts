/**
 * Commercial & Facilities industry page content — single source of truth.
 * Mirrors the construction page structure and composes the same shared
 * components; all copy lives here so it can be edited in one place.
 *
 * Hero + Challenges use the dedicated /industries/commercial assets.
 * Remaining sections reuse the construction assets as placeholders — swap
 * those `/industries/construction/...` paths once commercial-specific
 * imagery is available.
 */

export const commercialFacilitiesContent = {
  hero: {
    badge: "Commercial & Facilities",
    heading: "Run Smarter, More Secure Facilities With Full Visibility",
    subtitle:
      "Manage access, operations, and workforce across your buildings in real time improving efficiency, strengthening security, and ensuring nothing is overlooked.",
    bgImage: "/industries/commercial/commercial-bg.png",
  },
  challenges: {
    heading: "Managing facilities shouldn't be this fragmented",
    subheading: "Commercial buildings and facilities involve constant activity",
    features: [
      {
        icon: "/industries/commercial/fragment/icons/staff.svg",
        title: "Staff, tenants, visitors, and service providers",
      },
      {
        icon: "/industries/commercial/fragment/icons/team.svg",
        title: "Maintenance teams and external vendors",
      },
      {
        icon: "/industries/commercial/fragment/icons/operation.svg",
        title: "Daily operations across multiple areas",
      },
      {
        icon: "/industries/commercial/fragment/icons/security.svg",
        title: "Security, access control, and compliance activities",
      },
    ],
    summary: "But many facilities still rely on disconnected systems.",
    resultLabel: "This Leads To",
    results: [
      "Limited visibility of who is entering and moving within the building",
      "Inefficient maintenance and service workflows",
      "Delays in resolving operational issues",
      "Lack of coordination between teams",
      "Inconsistent records for compliance and reporting",
    ],
    callout:
      "When systems are disconnected, efficiency drops and control becomes reactive.",
    calloutIcon: "/industries/construction/sites/grow-light.svg",
    images: [
      "/industries/commercial/fragment/frag-1.png",
      "/industries/commercial/fragment/frag-2.png",
      "/industries/commercial/fragment/frag-3.png",
      "/industries/commercial/fragment/frag-4.png",
    ],
  },
  onePlatform: {
    heading: "A connected system for modern facility management",
    subtitle:
      "V-Watch AI brings together access control, operational workflows, and workforce management into one platform giving you full visibility across your facility.",
    skylineImage: "/industries/commercial/facility/city.png",
    features: [
      {
        icon: "/industries/commercial/facility/secure.svg",
        title: "Secure Access & Visitor Management",
        desc: "Control who enters your building and ensure only authorized individuals gain access.",
        active: true,
      },
      {
        icon: "/industries/commercial/facility/management.svg",
        title: "Centralised Operations Management",
        desc: "Manage maintenance requests, service orders, and operational tasks in one system.",
      },
      {
        icon: "/industries/commercial/facility/vendor.svg",
        title: "Vendor & Service Coordination",
        desc: "Track external vendors and ensure work is completed as expected.",
      },
      {
        icon: "/industries/construction/one-platform/workforce.svg",
        title: "Workforce Visibility & Accountability",
        desc: "Understand who is working on what — and ensure tasks are completed on time.",
      },
      {
        icon: "/industries/commercial/facility/management.svg",
        title: "Real-Time Operational Overview",
        desc: "Monitor activity across your facility to improve responsiveness and coordination.",
      },
      {
        icon: "/industries/commercial/v-watch-ai/tracking.svg",
        title: "Data-Driven Reporting",
        desc: "Maintain accurate records for audits, reporting, and continuous improvement.",
      },
    ],
    allowsLabel: "You can",
    allows: [
      {
        badge: "/industries/construction/one-platform/one.svg",
        title: "Control and monitor access across your building",
      },
      {
        badge: "/industries/construction/one-platform/two.svg",
        title: "Manage maintenance and service requests efficiently",
      },
      {
        badge: "/industries/construction/one-platform/three.svg",
        title: "Track workforce activity and performance",
      },
      {
        badge: "/industries/construction/one-platform/four.svg",
        title: "Maintain a clear, real-time overview of operations",
      },
    ],
    platformImage: "/industries/commercial/facility/office.png",
  },
  whyChoose: {
    heading: "Why facility managers choose V-Watch Ai",
    subheading:
      "Most facility systems focus on one area — access, maintenance, or workforce.",
    cardTitle: "V-Watch AI connects them all.",
    cardLogo: "/industries/construction/v-watch-ai/vwatch.png",
    cardImage: "/industries/construction/v-watch-ai/commerical.webp",
    cardContent: "This allows you to move from fragmented management to fully connected operations. ",
    items: [
      {
        icon: "/industries/commercial/v-watch-ai/access.svg",
        title: "Not just access control",
        desc: "But full operational visibility.",
        number: "/industries/construction/v-watch-ai/01.png",
      },
      {
        icon: "/industries/commercial/v-watch-ai/tracking.svg",
        title: "Not just maintenance tracking",
        desc: "But structured workflows.",
        number: "/industries/construction/v-watch-ai/02.png",
      },
      {
        icon: "/industries/commercial/v-watch-ai/workforce.svg",
        title: "Not just workforce data",
        desc: "But real performance insights.",
        number: "/industries/construction/v-watch-ai/03.png",
      },
    ],
  },
  environments: {
    heading: "Designed for a wide range of commercial environments",
    subtitle:
      "V-Watch Ai adapts to different types of facilities — wherever people, access, and operations need to be managed efficiently.",
    cards: [
      {
        image: "/industries/construction/designed-environment/env-6.png",
        title: "Office Buildings & Corporate Towers",
        desc: "Manage employee access, visitors, and daily operations across multiple floors and tenants — with full visibility and control.",
        active: true,
        originalImage: "/industries/construction/designed-environment/1.webp",
      },
      {
        image: "/industries/construction/designed-environment/env-1.png",
        title: "Shopping Malls & Retail Spaces",
        desc: "Coordinate vendors, maintenance teams, and high volumes of visitors while ensuring smooth and secure operations.",
        originalImage: "/industries/construction/designed-environment/2.webp",
      },
      {
        image: "/industries/construction/designed-environment/env-2.png",
        title: "Healthcare Facilities & Clinics",
        desc: "Control access to sensitive areas, manage staff workflows, and maintain accurate records for compliance and safety.",
        originalImage: "/industries/construction/designed-environment/3.webp",
      },
      {
        image: "/industries/construction/designed-environment/env-3.png",
        title: "Hotels & Hospitality",
        desc: "Track staff operations, manage service workflows, and ensure seamless coordination across departments.",
        originalImage: "/industries/construction/designed-environment/4.webp",
      },
      {
        image: "/industries/construction/designed-environment/env-4.png",
        title: "Education Campuses",
        desc: "Monitor access, manage facilities, and coordinate staff and service teams across large, active environments.",
        originalImage: "/industries/construction/designed-environment/5.webp",
      },
      {
        image: "/industries/construction/designed-environment/env-5.png",
        title: "Mixed-Use Developments",
        desc: "Handle multiple stakeholders — residential, commercial, and service providers — within one integrated system.",
        originalImage: "/industries/construction/designed-environment/6.webp",
      },
    ],
    footerImage: "/industries/construction/designed-environment/env-footer.png",
  },
  connected: {
    heading: "From access to operations — fully connected",
    subtitle:
      "Every environment faces similar operational challenges explore solutions based on your specific needs.",
    steps: [
      {
        icon: "capture",
        title: "Capture",
        desc: "Collect data from access points, tasks, and workforce activity.",
      },
      {
        icon: "control",
        title: "Control",
        desc: "Manage permissions, workflows, and operations from one system.",
      },
      {
        icon: "prove",
        title: "Prove",
        desc: "Generate reports and insights that provide full operational visibility.",
      },
    ],
  },
  useCases: {
    heading: "Solve everyday facility challenges",
    subtitle:
      "Every environment faces similar operational challenges explore solutions based on your specific needs.",
    cards: [
      {
        image: "/industries/commercial/use-case/emergencys.png",
        title: "Visitor Management System",
        desc: "Register, track, and manage visitors across your building with secure check-in.",
      },
      {
        image: "/industries/commercial/use-case/restrictedzones.png",
        title: "Facial Recognition Access Control",
        desc: "Deploy touchless entry points across high-traffic and secure zones.",
      },
      {
        image: "/industries/commercial/use-case/ticketings.png",
        title: "Maintenance Ticketing & Service Orders",
        desc: "Manage maintenance requests and service orders from report to resolution.",
      },
      {
        image: "/industries/commercial/use-case/trackings.png",
        title: "Preventive Maintenance Scheduling",
        desc: "Schedule recurring maintenance to prevent downtime and extend asset life.",
      },
      {
        image: "/industries/commercial/use-case/ticketings.png",
        title: "Payroll, Claims & Leave Automation",
        desc: "Automate payroll, claims, and leave workflows from real workforce activity.",
      },
    ],
  },
  footer: {
    ctaTitle: "Take control of your facility operations",
    ctaText:
      "See how V-Watch Ai can help you improve efficiency, strengthen security, and manage your facility with confidence.",
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
