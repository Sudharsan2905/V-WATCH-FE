// Section header copy for the /integrators-partners route.
export const IMPLEMENTATION_HEADER = {
  title: "Built for real-world implementation",
  subtitle: "Successful deployment requires more than just software.",
};

export const NETWORK_HEADER = {
  title: "Our system integrator network",
  subtitle:
    "Most organizations rely on multiple systems to manage different parts of their operations access control, workforce, tracking, safety, maintenance, and reporting.",
};

export type Integrator = {
  name: string;
  country: string;
  logo: string;
  /** Country map artwork shown in the detail panel. */
  map: string;
  description: string;
  capabilities: string[];
};

export const INTEGRATORS: Integrator[] = [
  {
    name: "SS Surveillance and Communication Sdn Bhd",
    country: "Malaysia",
    logo: "/products/eco/si-1.png",
    map: "/integrators-partners/malaysia.svg",
    description:
      "A trusted system integrator specializing in security systems, surveillance infrastructure, and enterprise deployments.",
    capabilities: [
      "Security and surveillance systems",
      "Infrastructure deployment",
      "System integration and support",
    ],
  },
  {
    name: "SS Tech Pte Ltd",
    country: "Singapore",
    logo: "/products/eco/si-2.png",
    map: "/integrators-partners/singapore.svg",
    description:
      "A technology solutions provider delivering smart building, communication, and enterprise system deployments.",
    capabilities: [
      "Smart building technologies",
      "Enterprise communication systems",
      "Deployment and maintenance support",
    ],
  },
  {
    name: "QuSol Innovations India Pvt Ltd",
    country: "India",
    logo: "/products/eco/si-3.png",
    map: "/integrators-partners/india.svg",
    description:
      "An innovation-driven integrator delivering workforce management, automation, and large-scale enterprise rollouts.",
    capabilities: [
      "Workforce management solutions",
      "Automation and IoT integration",
      "Large-scale enterprise rollouts",
    ],
  },
];

export const NETWORK_NOTE =
  "Expanding across regions to support complex, multi-site operations.";

export const GLOBAL_TECH_HEADER = {
  title: "Integrated with leading global technologies",
  subtitle:
    "V-Watch Ai is designed to integrate seamlessly with industry-leading systems and technologies enhancing functionality while working within your existing infrastructure.",
};

export const WHY_PARTNER_HEADER = {
  title: "Why partner with V-Watch Ai",
  subtitle:
    "We work closely with system integrators to deliver high-value solutions across industries.",
};

// Center emblem artwork (placeholder path — final SVG to be provided).
export const WHY_PARTNER_EMBLEM = "/integrators-partners/WhyPartnerIcon.svg";

export const WHY_PARTNER_POINTS = [
  {
    num: "1",
    title: "A Unified Platform to Deliver",
    description:
      "Offer clients a complete operations solution not just individual systems.",
  },
  {
    num: "2",
    title: "Strong Market Demand",
    description:
      "Support industries that require real-time visibility, automation, and compliance.",
  },
  {
    num: "3",
    title: "Flexible Integration Capabilities",
    description: "Role clarity, ownership tracking, responsibility mapping.",
  },
  {
    num: "4",
    title: "Ongoing Support & Collaboration",
    description: "Role clarity, ownership tracking, responsibility mapping.",
  },
];

export const BECOME_INTEGRATOR_HEADER = {
  title: "Become a V-Watch Ai System Integrator",
  subtitle:
    "We are actively expanding our network of system integrators across regions.",
};

// World-map artwork for the left card (placeholder — reusing the products map
// until the final asset lands).
export const BECOME_INTEGRATOR_MAP = "/integrators-partners/Consolution.png";

export const PARTNERSHIP_FORM_TITLE = "Start your partnership journey";

// Input field icons (placeholder paths — drop the final assets into
// public/integrators-partners/form/ with these names).
export const PARTNERSHIP_FIELDS = [
  {
    name: "fullName",
    label: "Full Name",
    placeholder: "Enter Full Name",
    type: "text",
    icon: "/integrators-partners/form/profile.svg",
  },
  {
    name: "workEmail",
    label: "Work Email",
    placeholder: "Enter Work Email",
    type: "email",
    icon: "/integrators-partners/form/email.svg",
  },
  {
    name: "companyName",
    label: "Company Name",
    placeholder: "Enter Company Name",
    type: "text",
    icon: "/integrators-partners/form/company.svg",
  },
  {
    name: "countryRegion",
    label: "Country / Region",
    placeholder: "Enter Country / Region",
    type: "text",
    icon: "/integrators-partners/form/country.svg",
  },
];

export const COMPANY_TYPE_ICON = "/integrators-partners/form/industry.svg";

export const COMPANY_TYPES = [
  "System Integrator",
  "Distributor",
  "Technology Partner",
  "Consultant",
  "Other",
];

export const FOCUS_AREAS = [
  "Security Systems",
  "Access Control",
  "Industrial Solutions",
  "Facilities Management",
  "IoT Systems",
  "Other",
];

export const PARTNERSHIP_FORM_NOTE =
  "Our team will review your application and get back to you within 3–5 working days.";

// Technology partner logos, ordered per the Figma rows (first half = row 1,
// second half = row 2).
export const TECH_PARTNER_LOGOS = [
  "/integrators-partners/companies/virtuzzo.png",
  "/integrators-partners/companies/alhua.png",
  "/integrators-partners/companies/bosch.png",
  "/integrators-partners/companies/axis.png",
  "/integrators-partners/companies/hkvision.png",
  "/integrators-partners/companies/ivideon.png",
  "/integrators-partners/companies/cisco.png",
  "/integrators-partners/companies/icomputin.png",
  "/integrators-partners/companies/fortinet.png",
  "/integrators-partners/companies/nable.png",
  "/integrators-partners/companies/cloudflare.png",
  "/integrators-partners/companies/solarwinds.png",
  "/integrators-partners/companies/digifort.png",
  "/integrators-partners/companies/sentinalor.png",
];
