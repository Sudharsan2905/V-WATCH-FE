export interface HrmsFeature {
  number: string;
  title: string;
  icon: string;
  bullets: string[];
}

export const HRMS_FEATURES: HrmsFeature[] = [
  {
    number: "01",
    title: "Mobile App",
    icon: "/hrms/Features/mobile_app.svg",
    bullets: [
      "Check-in/out on the go",
      "Submit claims and leave instantly",
      "View attendance history",
      "Managers approve requests anywhere",
    ],
  },
  {
    number: "02",
    title: "Employee Management",
    icon: "/hrms/Features/employee_management.svg",
    bullets: [
      "Onboard employees with structured workflows",
      "Manage roles, departments & employment types",
      "Maintain a centralized employee database",
    ],
  },
  {
    number: "03",
    title: "Attendance Tracking",
    icon: "/hrms/Features/attendance_tracking.svg",
    bullets: [
      "Mobile & portal check-in (selfie + work mode)",
      "Daily attendance overview and reports",
      "Track shifts, overtime, and breaks",
    ],
  },
  {
    number: "04",
    title: "Payroll Management",
    icon: "/hrms/Features/payroll_management.svg",
    bullets: [
      "Automated salary calculation (monthly or prorated)",
      "EPF, SOCSO, tax-ready setup",
      "Salary batch creation with approval workflows",
      "Payslip generation and download",
    ],
  },
  {
    number: "05",
    title: "Claims Management",
    icon: "/hrms/Features/claims_management.svg",
    bullets: [
      "Submit claims with receipt uploads",
      "Manager approval workflows",
      "Direct integration into payroll",
    ],
  },
  {
    number: "06",
    title: "Leave Management",
    icon: "/hrms/Features/leave_management.svg",
    bullets: [
      "Configure leave types and entitlements",
      "Apply and approve via portal or mobile",
      "Track balances and usage",
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
