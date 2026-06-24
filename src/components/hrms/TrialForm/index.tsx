"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";

const SELECT_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Icons ───────────────────────────────────────────────────────────────────

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden color="#2C8FC2">
      <path
        d="M3.5 5.25 7 8.75l3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="6" r="3.5" stroke="#8DA5BE" strokeWidth="1.5" />
      <path d="M2 16c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="#8DA5BE" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="2" y="4" width="14" height="10" rx="2" stroke="#8DA5BE" strokeWidth="1.5" />
      <path d="M2 6l7 5 7-5" stroke="#8DA5BE" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CompanyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="2" y="5" width="14" height="11" rx="1.5" stroke="#8DA5BE" strokeWidth="1.5" />
      <path d="M6 5V3.5a1 1 0 011-1h4a1 1 0 011 1V5" stroke="#8DA5BE" strokeWidth="1.5" />
      <path d="M6 9h6M6 12h4" stroke="#8DA5BE" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function RoleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="3" y="2" width="12" height="14" rx="2" stroke="#8DA5BE" strokeWidth="1.5" />
      <path d="M6 6h6M6 9h6M6 12h3" stroke="#8DA5BE" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function GroupIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="6.5" cy="6" r="2.5" stroke="#8DA5BE" strokeWidth="1.5" />
      <circle cx="12" cy="6" r="2.5" stroke="#8DA5BE" strokeWidth="1.5" />
      <path d="M1 15c0-2.21 2.462-4 5.5-4" stroke="#8DA5BE" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 15c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="#8DA5BE" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ArrowBadge() {
  return (
    <span className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white">
      <svg width="10" height="11" viewBox="0 0 10 11" fill="none" aria-hidden>
        <g clipPath="url(#clip-trial-btn)">
          <path
            d="M9.54396 8.23273L9.35582 0.792485L1.91558 0.621445L1.93268 2.24633L6.89284 2.21212L0.153867 8.95109L1.21431 10.0115L7.93619 3.28967L7.90198 8.21562L9.54396 8.23273Z"
            fill="#52BAAC"
          />
        </g>
        <defs>
          <clipPath id="clip-trial-btn">
            <rect width="10" height="10.69" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </span>
  );
}

// ─── Constants ───────────────────────────────────────────────────────────────

const ROLES = [
  "Project Director / Manager",
  "Operations Manager",
  "HR / Admin",
  "Finance / Payroll",
  "Team Lead / Supervisor",
  "IT / Systems",
  "Other",
];

const EMPLOYEE_COUNTS = ["1–50", "51–200", "201–500", "501–1,000", "1,000+"];

// ─── Field styles ─────────────────────────────────────────────────────────────

const FIELD_LABEL = "mb-1.5 block text-[12px] font-normal text-[#21293A] lg:text-[14px]";
const INPUT_BASE =
  "h-11 w-full rounded-[10px] border border-[#E9F8FF] bg-[#F5FBFF] pl-10 pr-4 text-[15px] font-normal text-[#19213D] placeholder:text-[#0A4B6E]/50 transition-colors focus:border-[#0a8ec8] focus:outline-none focus:ring-2 focus:ring-[#0a8ec8]/15";

// ─── Primitives ───────────────────────────────────────────────────────────────

function FieldWrapper({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className={FIELD_LABEL}>
        {label}
      </label>
      {children}
    </div>
  );
}

function InputField({
  id, label, type = "text", placeholder, value, onChange, icon, required, autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <FieldWrapper label={label} id={id}>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8DA5BE]">
          {icon}
        </span>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          autoComplete={autoComplete}
          className={INPUT_BASE}
        />
      </div>
    </FieldWrapper>
  );
}

function SelectField({
  id, label, value, onChange, options, placeholder, icon,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  icon: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointer(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <FieldWrapper label={label} id={id}>
      <div ref={ref} className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[#8DA5BE]">
          {icon}
        </span>
        <button
          id={id}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={`relative flex h-11 w-full items-center rounded-[10px] border bg-[#F5FBFF] pl-10 pr-9 text-left text-[15px] leading-[22px] transition-all ${
            open ? "border-[#0a8ec8] ring-2 ring-[#0a8ec8]/15" : "border-[#E9F8FF] hover:border-[#bfe6f5]"
          }`}
        >
          <span className={`truncate ${value ? "text-[#19213D]" : "text-[#0A4B6E]/50"}`}>
            {value || placeholder}
          </span>
        </button>
        <span
          className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#2C8FC2] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <ChevronDownIcon />
        </span>

        <AnimatePresence>
          {open && (
            <motion.ul
              role="listbox"
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.16, ease: SELECT_EASE }}
              className="absolute left-0 right-0 top-full z-30 mt-2 max-h-[200px] origin-top overflow-auto rounded-[12px] border border-[#E9F8FF] bg-white p-1.5 shadow-[0_18px_50px_rgba(10,75,110,0.18)]"
            >
              {options.map((opt) => {
                const selected = opt === value;
                return (
                  <li key={opt}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => { onChange(opt); setOpen(false); }}
                      className={`flex w-full items-center justify-between gap-2 rounded-[8px] px-3 py-2.5 text-left text-[14px] leading-tight transition-colors ${
                        selected ? "bg-[#EFF8FE] font-semibold text-[#0a4b6e]" : "text-[#19213D] hover:bg-[#F5FBFF]"
                      }`}
                    >
                      <span className="truncate">{opt}</span>
                      {selected && (
                        <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[#0a8ec8]">
                          <path d="m3.5 8.5 3 3 6-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </FieldWrapper>
  );
}

// ─── Trial Form ───────────────────────────────────────────────────────────────

type FormState = {
  fullName: string;
  workEmail: string;
  companyName: string;
  role: string;
  employeeCount: string;
};

const INITIAL: FormState = {
  fullName: "",
  workEmail: "",
  companyName: "",
  role: "",
  employeeCount: "",
};

function TrialFormCard() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log("Trial request:", form);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex min-h-[360px] flex-col items-center justify-center gap-5 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e9f8ff]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0a8ec8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <div>
          <h3 className="mb-2 text-[20px] font-bold text-[#0a4b6e]">You&apos;re all set!</h3>
          <p className="text-[15px] text-[#556394]">
            Check your email — your 14-day trial access is on its way.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-[14px] font-bold text-[#0a8ec8] underline-offset-2 hover:underline"
        >
          Start another trial
        </button>
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-6 text-center font-lato text-[20px] font-bold text-[#0A4B6E] sm:text-[22px]">
        Start Your Free 14-Day Trial
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <InputField
          id="trial-fullName"
          label="Full Name *"
          placeholder="Enter Full Name"
          value={form.fullName}
          onChange={(v) => setForm((p) => ({ ...p, fullName: v }))}
          icon={<UserIcon />}
          required
          autoComplete="name"
        />

        <InputField
          id="trial-workEmail"
          label="Work Email *"
          type="email"
          placeholder="Enter Work Email"
          value={form.workEmail}
          onChange={(v) => setForm((p) => ({ ...p, workEmail: v }))}
          icon={<EmailIcon />}
          required
          autoComplete="email"
        />

        <InputField
          id="trial-companyName"
          label="Company Name *"
          placeholder="Enter Company Name"
          value={form.companyName}
          onChange={(v) => setForm((p) => ({ ...p, companyName: v }))}
          icon={<CompanyIcon />}
          required
          autoComplete="organization"
        />

        <SelectField
          id="trial-role"
          label="Your Role"
          value={form.role}
          onChange={(v) => setForm((p) => ({ ...p, role: v }))}
          options={ROLES}
          placeholder="Select Option"
          icon={<RoleIcon />}
        />

        <SelectField
          id="trial-employeeCount"
          label="Number of Employees"
          value={form.employeeCount}
          onChange={(v) => setForm((p) => ({ ...p, employeeCount: v }))}
          options={EMPLOYEE_COUNTS}
          placeholder="1–50"
          icon={<GroupIcon />}
        />

        {/* Submit */}
        <div className="flex flex-col items-center gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-full font-bold text-white shadow-[0_6px_42px_rgba(38,124,153,0.40)]"
            style={{
              background: `
                linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1)) padding-box,
                linear-gradient(180deg, #21B1F1 -20.69%, #A6C936 151.72%) padding-box,
                linear-gradient(180deg, rgba(33,177,241,0.4) -20.69%, rgba(197,235,76,0.4) 151.72%) border-box
              `,
              border: "1.24px solid transparent",
            }}
          >
            <ArrowBadge />
            Start Free Trial
          </button>

          <p className="text-center text-[13px] text-[#3890C0]">
            No credit card required. Instant access.
          </p>
        </div>
      </form>
    </>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

export default function HrmsTrialForm() {
  return (
    <section
      className="relative min-h-[350px] pt-0 pb-24 bg-[radial-gradient(90%_120%_at_50%_-10%,rgba(45,110,180,0.45)_0%,rgba(12,28,48,0)_55%),linear-gradient(180deg,#0C1C30_0%,#12325A_55%,#1B2B4E_100%)]"
    >
      {/* Blobs + grid in overflow-hidden container so they don't bleed outside */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* bg-grid texture — mirrors footer CTA dark variant */}
        <div
          className="absolute inset-0 bg-repeat opacity-55"
          style={{
            backgroundImage: "url('/footer/bg-grid.svg')",
            backgroundSize: "cover",
            maskImage: "radial-gradient(75% 85% at 50% 22%, #000 0%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(75% 85% at 50% 22%, #000 135%, transparent 78%)",
          }}
        />
        {/* Glow blobs — mirrors footer CTA dark variant */}
        <div className="absolute top-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#0DBFC4] opacity-40 blur-[170px]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-[26rem] rounded-full bg-[#4DAFE0] opacity-30 blur-[200px]" />
      </div>

      {/* Form card — absolutely positioned 440px above section top, sits on top of light section */}
      <div
        id="trial"
        className="absolute -top-[440px] left-0 right-0 z-20 scroll-mt-20 px-6 lg:px-[60px]"
      >
        <div className="mx-auto max-w-[540px] rounded-[24px] bg-white px-7 py-8 shadow-[0_20px_80px_rgba(0,0,0,0.25)] sm:px-10 sm:py-10">
          <TrialFormCard />
        </div>
      </div>
    </section>
  );
}
