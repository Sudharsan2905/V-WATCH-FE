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
        desc: "Monitor workforce activity and performance across your facility in real time.",
      },
    ],
    allowsLabel: "It allows you to",
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
    heading: "Why facilities teams choose V-Watch Ai",
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
    heading: "Designed for a wide range of commercial environments",
    subtitle:
      "V-Watch Ai adapts to different types of facilities wherever people, access, and operations must be managed efficiently.",
    cards: [
      {
        image: "/industries/construction/designed-environment/env-1.png",
        title: "Office Buildings & Corporate Towers",
        desc: "Manage staff, tenants, and visitors across multiple floors and zones with full visibility and control.",
        active: true,
      },
      {
        image: "/industries/construction/designed-environment/env-2.png",
        title: "Shopping Malls & Retail Spaces",
        desc: "Coordinate vendors, maintenance teams, and high volumes of visitors with smart access control.",
      },
      {
        image: "/industries/construction/designed-environment/env-3.png",
        title: "Healthcare Facilities & Clinics",
        desc: "Control access across sensitive areas, storage, and high-security zones with precise coordination.",
      },
      {
        image: "/industries/construction/designed-environment/env-4.png",
        title: "Hotels & Hospitality",
        desc: "Track staff, guests, and service providers across busy, around-the-clock venues.",
      },
      {
        image: "/industries/construction/designed-environment/env-5.png",
        title: "Education Campuses",
        desc: "Monitor access, manage facilities, and coordinate staff and vendors across large, multi-building campuses.",
      },
      {
        image: "/industries/construction/designed-environment/env-6.png",
        title: "Mixed-Use Developments",
        desc: "Manage facilities, residents, retail, and access points across complex, multi-purpose sites.",
      },
    ],
    footerImage: "/industries/construction/designed-environment/env-footer.png",
  },
  connected: {
    heading: "From access to operations fully connected",
    subtitle:
      "Every environment faces similar operational challenges explore solutions based on your specific needs.",
    steps: [
      {
        icon: "capture",
        title: "Capture",
        desc: "Collect real-time data from building access, movement, and operations.",
      },
      {
        icon: "control",
        title: "Control",
        desc: "Manage permissions, workflows, and compliance across all teams and vendors.",
      },
      {
        icon: "prove",
        title: "Prove",
        desc: "Generate reports and insights that provide full visibility and audit-ready data.",
      },
    ],
  },
  useCases: {
    heading: "Solve everyday facility challenges",
    subtitle:
      "Every environment faces similar operational challenges explore solutions based on your specific needs.",
    cards: [
      {
        image: "/industries/commercial/use-case/Ticketing.png",
        title: "Maintenance Ticketing",
        desc: "Track and manage maintenance requests from report through to resolution.",
      },
      {
        image: "/industries/commercial/use-case/tracking.png",
        title: "Compliance Tracking",
        desc: "Document and store records to stay audit-ready and meet building requirements.",
      },
      {
        image: "/industries/commercial/use-case/emergency.png",
        title: "Emergency Muster & Headcount",
        desc: "Track who is safe, missing, and onsite during emergencies.",
      },
      {
        image: "/industries/commercial/use-case/zone.png",
        title: "Geofencing Restricted Zones",
        desc: "Detect unauthorized movement across restricted building areas.",
      },
    ],
  },
  footer: {
    ctaTitle: "Find the right solution for your facilities",
    ctaText:
      "Explore how V-Watch Ai can help you improve visibility, strengthen security, and take full control of your commercial and facility operations.",
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
