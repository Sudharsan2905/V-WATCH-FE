"use client";

import { useState, type FormEvent } from "react";

// ─── Icon primitives ────────────────────────────────────────────────────────

function ChevronDownIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      color="#2C8FC2"
    >
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

function CheckMark() {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M1.5 5.5l2.5 2.5 5-5" />
    </svg>
  );
}

// Arrow badge identical to BookADemo component
function ArrowBadge() {
  return (
    <span className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white">
      <svg
        width="10"
        height="11"
        viewBox="0 0 10 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <g clipPath="url(#clip-form-btn)">
          <path
            d="M9.54396 8.23273L9.35582 0.792485L1.91558 0.621445L1.93268 2.24633L6.89284 2.21212L0.153867 8.95109L1.21431 10.0115L7.93619 3.28967L7.90198 8.21562L9.54396 8.23273Z"
            fill="#52BAAC"
          />
        </g>
        <defs>
          <clipPath id="clip-form-btn">
            <rect width="10" height="10.69" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </span>
  );
}

// ─── Constants ───────────────────────────────────────────────────────────────

const SERVICES = [
  "Access Control & Visitor Management",
  "Maintenance & Task Management",
  "Facial Recognition Access",
  "Workforce & Payroll Management",
  "Compliance & Safety Tracking",
  "Full Platform Overview",
  "Real-Time Location Tracking",
  "Not sure (Need consultation)",
  "Emergency Muster / Headcount",
];

const OP_SIZES = ["<50 people", "50-200", "200-1,000", "1,000-5,000", "5,000+"];

const ROLES = [
  "Operations Manager",
  "IT Manager",
  "HR Manager",
  "Facility Manager",
  "C-Level Executive",
  "Consultant",
  "Other",
];

const INDUSTRIES = [
  "Construction",
  "Industrial & Energy",
  "Commercial & Facilities",
  "Healthcare",
  "Logistics & Transport",
  "Other",
];

// ─── Form primitives ─────────────────────────────────────────────────────────

const FIELD_LABEL =
  "mb-1.5 block text-[12px] font-[400] font-regular text-[#21293A] lg:text-[16px]";
const INPUT_BASE =
  "h-11 w-full rounded-[10px] border border-[#E9F8FF] bg-[#F5FBFF] pl-10 pr-4 text-[16px] font-regular font-[400] text-[#19213D] placeholder:text-[#0A4B6E] transition-colors focus:border-[#0a8ec8] focus:outline-none focus:ring-2 focus:ring-[#0a8ec8]/15";

function FieldWrapper({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
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
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  required,
  autoComplete,
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
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  icon,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  icon: React.ReactNode;
}) {
  return (
    <FieldWrapper label={label} id={id}>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8DA5BE]">
          {icon}
        </span>
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${INPUT_BASE} appearance-none pr-9 !text-[#0A4B6E]`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8DA5BE]">
          <ChevronDownIcon />
        </span>
      </div>
    </FieldWrapper>
  );
}

// ─── DemoForm ────────────────────────────────────────────────────────────────

type FormState = {
  fullName: string;
  workEmail: string;
  companyName: string;
  phoneNumber: string;
  role: string;
  industry: string;
  services: Set<string>;
  opSize: string;
  additionalDetails: string;
};

const INITIAL: FormState = {
  fullName: "",
  workEmail: "",
  companyName: "",
  phoneNumber: "",
  role: "",
  industry: "",
  services: new Set(),
  opSize: "",
  additionalDetails: "",
};

export default function DemoForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  function toggleService(service: string) {
    setForm((prev) => {
      const next = new Set(prev.services);
      next.has(service) ? next.delete(service) : next.add(service);
      return { ...prev, services: next };
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Submission handler — wire up to API as needed
    console.log("Demo request:", { ...form, services: [...form.services] });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-5 rounded-[20px] bg-white p-8 text-center shadow-[0_8px_60px_rgba(0,0,0,0.12)]">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e9f8ff]">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0a8ec8"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <div>
          <h3 className="mb-2 text-[20px] font-bold text-[#0a4b6e]">
            Request Received!
          </h3>
          <p className="text-[15px] font-normal text-[#556394]">
            A consultant will contact you within 24 hours to schedule your
            guided demo.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-[14px] font-bold text-[#0a8ec8] underline-offset-2 hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-[20px] bg-white p-6 shadow-[0_8px_60px_rgba(0,0,0,0.13)] sm:p-8">
      <h2 className="mb-6 text-center text-[26px] font-bold font-[700] text-[#0A4B6E] sm:text-[21px] lg:text-[26px]">
        Tell us about your requirements
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        {/* Row 1 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InputField
            id="fullName"
            label="Full Name"
            placeholder="Enter Full Name"
            value={form.fullName}
            onChange={(v) => setForm((p) => ({ ...p, fullName: v }))}
            icon={
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/book-a-demo/icons/name-icon.svg"
                alt=""
                aria-hidden
                width={24}
                height={24}
              />
            }
            required
            autoComplete="name"
          />
          <InputField
            id="workEmail"
            label="Work Email"
            type="email"
            placeholder="Enter Work Email"
            value={form.workEmail}
            onChange={(v) => setForm((p) => ({ ...p, workEmail: v }))}
            icon={
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/book-a-demo/icons/email-icon.svg"
                alt=""
                aria-hidden
                width={24}
                height={24}
              />
            }
            required
            autoComplete="email"
          />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InputField
            id="companyName"
            label="Company Name"
            placeholder="Enter Company Name"
            value={form.companyName}
            onChange={(v) => setForm((p) => ({ ...p, companyName: v }))}
            icon={
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/book-a-demo/icons/company-icon.svg"
                alt=""
                aria-hidden
                width={24}
                height={24}
              />
            }
            required
            autoComplete="organization"
          />
          <InputField
            id="phoneNumber"
            label="Phone Number"
            type="tel"
            placeholder="Enter Phone Number"
            value={form.phoneNumber}
            onChange={(v) => setForm((p) => ({ ...p, phoneNumber: v }))}
            icon={
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/book-a-demo/icons/phone-icon.svg"
                alt=""
                aria-hidden
                width={24}
                height={24}
              />
            }
            autoComplete="tel"
          />
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SelectField
            id="role"
            label="Your Role"
            value={form.role}
            onChange={(v) => setForm((p) => ({ ...p, role: v }))}
            options={ROLES}
            placeholder="Select Option"
            icon={
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/book-a-demo/icons/role-icon.svg"
                alt=""
                aria-hidden
                width={24}
                height={24}
              />
            }
          />
          <SelectField
            id="industry"
            label="Industry / Environment"
            value={form.industry}
            onChange={(v) => setForm((p) => ({ ...p, industry: v }))}
            options={INDUSTRIES}
            placeholder="Select Option"
            icon={
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/book-a-demo/icons/industry-icon.svg"
                alt=""
                aria-hidden
                width={24}
                height={24}
              />
            }
          />
        </div>

        {/* Services */}
        <fieldset>
          <legend className={FIELD_LABEL}>What are you looking for?</legend>
          <div className="mt-1.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {SERVICES.map((service) => {
              const checked = form.services.has(service);
              return (
                <label
                  key={service}
                  className={`flex items-center justify-between cursor-pointer items-center gap-2.5 rounded-[8px] border px-3 py-2.5 font-[400] font-normal text-[16px] transition-colors ${
                    checked
                      ? "border-[#E9F8FF] bg-[#E9F8FF] text-[#0a4b6e]"
                      : "border-white bg-[#ffffff] text-[#0a4b6e]"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleService(service)}
                    className="sr-only"
                    aria-label={service}
                  />
                  <span className="leading-snug">{service}</span>
                  <span
                    className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] border transition-colors ${
                      checked
                        ? "border-[#0a8ec8] bg-[#0a8ec8] text-white"
                        : "border-[#CBD5E1] bg-white"
                    }`}
                  >
                    {checked && <CheckMark />}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Size of Operation */}
        <fieldset>
          <legend className={FIELD_LABEL}>Size of Operation</legend>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {OP_SIZES.map((size) => {
              const active = form.opSize === size;
              return (
                <label
                  key={size}
                  className={`flex-1 min-w-max cursor-pointer rounded-[12px] border px-4 py-4 text-center text-[16px] font-normal font-[400] transition-colors ${
                    active
                      ? "border-[#E9F8FF] bg-[#E9F8FF] text-[#0A4B6E]"
                      : "border-white bg-[#ffffff] text-[#0A4B6E]"
                  }`}
                >
                  <input
                    type="radio"
                    name="opSize"
                    value={size}
                    checked={active}
                    onChange={() => setForm((p) => ({ ...p, opSize: size }))}
                    className="sr-only"
                  />
                  {size}
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Additional Details */}
        <div>
          <label htmlFor="additionalDetails" className={FIELD_LABEL}>
            Additional Details
          </label>
          <textarea
            id="additionalDetails"
            placeholder="Tell us more about your requirements or challenges..."
            value={form.additionalDetails}
            onChange={(e) =>
              setForm((p) => ({ ...p, additionalDetails: e.target.value }))
            }
            rows={4}
            className="w-full resize-none rounded-[12px] bg-[#F5FBFF] px-2.5 py-2.5 text-[14px] text-[#19213D] placeholder:text-[#0A4B6E] transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        {/* Submit */}
        <div className="flex flex-col items-center gap-3 pt-1">
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center gap-2.5 rounded-full px-6 font-bold text-white shadow-[0_6px_42px_rgba(38,124,153,0.40)]"
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
            Request a Demo
          </button>

          <p className="max-w-[680px] text-center text-[16px] text-[#3890C0] font-[400] leading-relaxed">
            Your information will be kept confidential and used only to tailor
            your demo experience.
          </p>
        </div>
      </form>
    </div>
  );
}
