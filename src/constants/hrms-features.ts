export interface HrmsFeature {
  number: string;
  title: string;
  headline: string;
  icon: string;
  bullets: string[];
  /** Trailing sentence shown below the bullets, without a checkmark. */
  footnote?: string;
}

export const HRMS_FEATURES: HrmsFeature[] = [
  {
    number: "01",
    title: "Employee Mobile App",
    headline: "Put Essential HR Tasks in Your Employees' Hands",
    icon: "/hrms/Features/mobile_app.svg",
    bullets: [
      "Employees no longer need to contact HR for every routine request.",
      "Check in and out from mobile.",
      "Submit leave and claims.",
      "Upload documents and receipts.",
      "View attendance information.",
      "Track request and approval status.",
    ],
    footnote:
      "Managers can also review and approve employee requests wherever they are.",
  },
  {
    number: "02",
    title: "Employee Management",
    headline: "Keep Every Employee Record Organized",
    icon: "/hrms/Features/employee_management.svg",
    bullets: [
      "Create one central employee database instead of managing information across multiple spreadsheets and folders.",
      "Onboard employees through structured workflows.",
      "Manage departments, roles and employment types.",
      "Maintain accurate employee information.",
      "Access important records from one central platform.",
    ],
  },
  {
    number: "03",
    title: "Attendance Management",
    headline: "Know Who is Working Without Chasing Updates",
    icon: "/hrms/Features/attendance_tracking.svg",
    bullets: [
      "Capture and review attendance information through the employee mobile app or HR portal.",
      "Mobile and portal attendance verification.",
      "Selfie-supported attendance verification.",
      "Daily attendance summaries and reports.",
      "Track shifts, overtime and breaks.",
      "Review attendance history in one place.",
    ],
  },
  {
    number: "04",
    title: "Payroll Management",
    headline: "Make Payroll Easier to Prepare and Approve",
    icon: "/hrms/Features/payroll_management.svg",
    bullets: [
      "Connect employee, attendance and payroll information to reduce repetitive manual work.",
      "Automated monthly and prorated salary calculations.",
      "EPF, SOCSO and tax-ready payroll configuration",
      "Salary batch creation",
      "Payroll approval workflows",
      "Payslip generation and downloads.",
    ],
  },
  {
    number: "05",
    title: "Claims Management",
    headline: "Move Employee Claims Out of WhatsApp and Email",
    icon: "/hrms/Features/claims_management.svg",
    bullets: [
      "Create a structured claims process that connects directly with payroll.",
      "Submit claims through mobile or web.",
      "Upload receipts and supporting documents.",
      "Route claims to the appropriate manager.",
      "Track approval status.",
      "Include approved claims in payroll.",
    ],
  },
  {
    number: "06",
    title: "Leave Management",
    headline: "Replace Leave Forms and Manual Balance Tracking",
    icon: "/hrms/Features/leave_management.svg",
    bullets: [
      "Employees can submit leave requests while managers review and approve them through the platform.",
      "Configure leave types and entitlements.",
      "Apply through mobile or web.",
      "Approve requests from anywhere.",
      "View current leave balances.",
      "Track leave history and usage.",
    ],
  },
];

export const FLOATING_CARDS = [
  {
    title: "GPS Verified",
    subtitle: "Location accurate",
    iconBg: "/hrms/Features/gps_icon.svg",
    position: "top-left" as const,
  },
  {
    title: "Check-in Successful",
    subtitle: "09:01 AM",
    iconBg: "/hrms/Features/check_in.svg",
    position: "top-right" as const,
  },
  {
    title: "Leave Approved",
    subtitle: "12 Dec 2024",
    iconBg: "/hrms/Features/leave_icon.svg",
    position: "bottom-left" as const,
  },
  {
    title: "Manager Approved",
    subtitle: "Request approved",
    iconBg: "/hrms/Features/manager_icon.svg",
    position: "bottom-right" as const,
  },
];
