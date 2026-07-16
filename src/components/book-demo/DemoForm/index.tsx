"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import emailjs from "@emailjs/browser";

// EmailJS credentials — set these in .env.local (all NEXT_PUBLIC_* so they're
// available in the browser). The service ID and public key are shared across all
// forms; this form uses its own template ID. Until all three are present the form
// stays inert: it logs the submission and shows the success message without
// calling out.
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_DEMO;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const EMAILJS_READY = Boolean(
  EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY,
);

const SELECT_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
    <span className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
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
  "Project Director / Manager",
  "Operations Manager",
  "Safety / HSE Manager",
  "Facility Manager",
  "HR / Admin",
  "IT / Systems",
  "Other",
];

const INDUSTRIES = [
  "Construction",
  "Industrial & Energy",
  "Commercial & Facilities",
  "Data Centres",
  "Logistics & Warehousing",
  "Manufacturing",
  "Healthcare",
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
  error,
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
  error?: string;
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
          onChange={(e) => {
            let value = e.target.value;

            if (type === "text" && id === "fullName") {
              value = value.replace(/[0-9]/g, "");
            }

            onChange(value);
          }}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${INPUT_BASE} ${
            error
              ? "border-[#E5484D] focus:border-[#E5484D] focus:ring-[#E5484D]/15"
              : ""
          }`}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-[12px] text-[#E5484D]">
          {error}
        </p>
      )}
    </FieldWrapper>
  );
}

// Custom dropdown — a native <select>'s option list can't be styled, so this
// renders a branded trigger + an animated popover. Value stays controlled by the
// parent form state, so it serializes exactly like the old <select>.
function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  icon,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  icon: React.ReactNode;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointer(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
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
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`relative flex h-11 w-full items-center rounded-[10px] border bg-[#F5FBFF] pl-10 pr-9 text-left text-[16px] leading-[22px] transition-all ${
            open
              ? "border-[#0a8ec8] ring-2 ring-[#0a8ec8]/15"
              : error
                ? "border-[#E5484D] hover:border-[#E5484D]"
                : "border-[#E9F8FF] hover:border-[#bfe6f5]"
          }`}
        >
          <span
            className={`truncate ${value ? "text-[#19213D]" : "text-[#0A4B6E]/60"}`}
          >
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
              className="absolute left-0 right-0 top-full z-30 mt-2 max-h-[224px] origin-top overflow-auto rounded-[12px] border border-[#E9F8FF] bg-white p-1.5 shadow-[0_18px_50px_rgba(10,75,110,0.18)]"
            >
              {options.map((opt) => {
                const selected = opt === value;
                return (
                  <li key={opt}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => {
                        onChange(opt);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center justify-between gap-2 rounded-[8px] px-3 py-2.5 text-left text-[15px] leading-tight transition-colors ${
                        selected
                          ? "bg-[#EFF8FE] font-semibold text-[#0a4b6e]"
                          : "text-[#19213D] hover:bg-[#F5FBFF]"
                      }`}
                    >
                      <span className="truncate">{opt}</span>
                      {selected && (
                        <svg
                          aria-hidden
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="shrink-0 text-[#0a8ec8]"
                        >
                          <path
                            d="m3.5 8.5 3 3 6-6.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
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
      {error && (
        <p id={`${id}-error`} className="mt-1 text-[12px] text-[#E5484D]">
          {error}
        </p>
      )}
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

type FieldErrors = Partial<Record<keyof FormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts +, spaces, dashes, parentheses; requires 7-15 digits.
const PHONE_RE = /^[+]?[\d\s()-]{7,20}$/;

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {};

  if (!form.fullName.trim()) {
    errors.fullName = "Full name is required.";
  } else if (form.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  }

  if (!form.workEmail.trim()) {
    errors.workEmail = "Work email is required.";
  } else if (!EMAIL_RE.test(form.workEmail.trim())) {
    errors.workEmail = "Enter a valid email address.";
  }

  if (!form.companyName.trim()) {
    errors.companyName = "Company name is required.";
  }

  if (!form.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required.";
  } else if (!PHONE_RE.test(form.phoneNumber.trim())) {
    errors.phoneNumber = "Enter a valid phone number.";
  }

  if (!form.role) errors.role = "Please select your role.";
  if (!form.industry) errors.industry = "Please select an industry.";

  if (form.services.size === 0) {
    errors.services = "Select at least one option.";
  }

  return errors;
}

export default function DemoForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  // Clear a field's error as soon as the user edits it.
  function clearError(field: keyof FormState) {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function toggleService(service: string) {
    clearError("services");
    setForm((prev) => {
      const next = new Set(prev.services);
      next.has(service) ? next.delete(service) : next.add(service);
      return { ...prev, services: next };
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      // Focus the first field with an error.
      const firstField = Object.keys(nextErrors)[0];
      if (typeof document !== "undefined") {
        document.getElementById(firstField)?.focus();
      }
      return;
    }
    setErrors({});

    // Template variables. We send both the common EmailJS names ({{name}},
    // {{email}}, {{message}}…) and the raw field names, so the email fills in
    // whichever placeholders the dashboard template uses.
    const services = [...form.services];    
    // console.log("form", form);
    
    const params = {
      to_email: "Marketing@vwatch.ai",
      name: form.fullName.trim(),
      email: form.workEmail.trim(),
      phone: form.phoneNumber.trim(),
      company: form.companyName.trim(),
      role: form.role,
      industry: form.industry,
      services: services.join(", "),
      op_size: form.opSize,
      message: form.additionalDetails.trim(),
      // reply straight to the person who filled the form
      reply_to: form.workEmail.trim(),
      // raw field names, in case the template references these instead
      fullName: form.fullName.trim(),
      workEmail: form.workEmail.trim(),
      phoneNumber: form.phoneNumber.trim(),
      companyName: form.companyName.trim(),
      opSize: form.opSize,
      additionalDetails: form.additionalDetails.trim(),
    };

    // Not connected to a provider yet: log and show success without sending.
    if (!EMAILJS_READY) {
      console.log("Demo request (EmailJS not configured):", params);
      setSubmitted(true);
      return;
    }

    try {
      setSending(true);
      setSendError(false);
      await emailjs.send(EMAILJS_SERVICE_ID!, EMAILJS_TEMPLATE_ID!, params, {
        publicKey: EMAILJS_PUBLIC_KEY!,
      });
      setSubmitted(true);
      setForm(INITIAL);
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setSendError(true);
    } finally {
      setSending(false);
    }
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
      <h2 className="mb-6 text-center text-[20px] font-bold font-[700] text-[#0A4B6E] sm:text-[21px] lg:text-[26px]">
        Tell us about your requirements
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        {/* Row 1 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InputField
            id="fullName"
            label="Full Name"
            type="text"
            placeholder="Enter Full Name"
            value={form.fullName}
            onChange={(v) => {
              clearError("fullName");
              setForm((p) => ({ ...p, fullName: v }));
            }}
            error={errors.fullName}
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
            onChange={(v) => {
              clearError("workEmail");
              setForm((p) => ({ ...p, workEmail: v }));
            }}
            error={errors.workEmail}
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
            onChange={(v) => {
              clearError("companyName");
              setForm((p) => ({ ...p, companyName: v }));
            }}
            error={errors.companyName}
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
            onChange={(v) => {
              clearError("phoneNumber");
              setForm((p) => ({ ...p, phoneNumber: v.replace(/\D/g, "") }));
            }}
            error={errors.phoneNumber}
            required
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
            onChange={(v) => {
              clearError("role");
              setForm((p) => ({ ...p, role: v }));
            }}
            error={errors.role}
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
            onChange={(v) => {
              clearError("industry");
              setForm((p) => ({ ...p, industry: v }));
            }}
            error={errors.industry}
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
          {errors.services && (
            <p className="mb-1 text-[12px] text-[#E5484D]">{errors.services}</p>
          )}
          <div className="mt-1.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {SERVICES.map((service) => {
              const checked = form.services.has(service);
              return (
                <label
                  key={service}
                  className={`flex items-center justify-between cursor-pointer items-center gap-2.5 rounded-[8px] border px-3 py-2.5 font-[400] font-normal text-[14px] transition-colors sm:text-[16px] ${
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
                  className={`flex-1 min-w-max cursor-pointer rounded-[12px] border px-4 py-4 text-center text-[14px] font-normal font-[400] transition-colors sm:text-[16px] ${
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
            disabled={sending}
            className="group inline-flex h-11 items-center justify-center gap-2.5 rounded-full px-6 font-bold text-white shadow-[0_6px_42px_rgba(38,124,153,0.40)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_10px_48px_rgba(38,124,153,0.55)] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#21B1F1]/40 active:translate-y-0 active:scale-100 disabled:cursor-not-allowed disabled:opacity-70"
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
            {sending ? "Sending…" : "Request a Demo"}
          </button>

          <p
            className={`max-w-[680px] text-center text-[13px] font-[400] leading-relaxed sm:text-[16px] ${
              sendError ? "text-[#D14343]" : "text-[#3890C0]"
            }`}
          >
            {sendError
              ? "Something went wrong. Please try again."
              : "Your information will be kept confidential and used only to tailor your demo experience."}
          </p>
        </div>
      </form>
    </div>
  );
}
