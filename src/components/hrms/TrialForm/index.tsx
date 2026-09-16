"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { submitForm } from "@/lib/submitForm";
import FormSuccess from "@/components/common/FormSuccess";

const SELECT_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Icons ───────────────────────────────────────────────────────────────────

function ChevronDownIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      color="#2C8FC2"
    >
      <path
        d="M3.5 5.25 7 8.75l3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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

const HR_MANAGEMENT_METHODS = [
  "Spreadsheets",
  "Paper Forms",
  "WhatsApp / Messaging Apps",
  "Another HR System",
  "We Don't Track This Yet",
];

// ─── Field styles ─────────────────────────────────────────────────────────────

const FIELD_LABEL =
  "mb-1.5 block text-[12px] font-normal text-[#0A4B6E] md:text-[16px]";
const INPUT_BASE =
  "h-11 w-full rounded-[10px] border border-[#E9F8FF] bg-[#F5FBFF] pl-10 pr-4 text-[15px] font-normal text-[#19213D] placeholder:text-[#0A4B6E]/50 transition-colors focus:border-[#0a8ec8] focus:outline-none focus:ring-2 focus:ring-[#0a8ec8]/15";

// ─── Primitives ───────────────────────────────────────────────────────────────

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
    <div className="text-[16px]">
      <label htmlFor={id} className={FIELD_LABEL}>
        {label.replace(" *", "")}
        {label.includes("*") && <span className="text-[#3890C0]"> *</span>}
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
          onChange={(e) => onChange(e.target.value)}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${INPUT_BASE} pl-[45px] ${
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
  icon?: React.ReactNode;
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
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[#8DA5BE]">
            {icon}
          </span>
        )}
        <button
          id={id}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={`relative flex h-11 w-full items-center rounded-[10px] border bg-[#F5FBFF] ${icon ? "pl-10" : "pl-4"} pr-9 text-left text-[15px] leading-[22px] transition-all ${
            open
              ? "border-[#0a8ec8] ring-2 ring-[#0a8ec8]/15"
              : "border-[#E9F8FF] hover:border-[#bfe6f5]"
          }`}
        >
          <span
            className={`truncate ${icon ? "pl-2" : ""} ${value ? "text-[#19213D]" : "text-[#0A4B6E]/50"}`}
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
                      onClick={() => {
                        onChange(opt);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center justify-between gap-2 rounded-[8px] px-3 py-2.5 text-left text-[14px] leading-tight transition-colors ${
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
  howManageHR: string;
  consent: boolean;
};

const INITIAL: FormState = {
  fullName: "",
  workEmail: "",
  companyName: "",
  role: "",
  employeeCount: "",
  howManageHR: "",
  consent: false,
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  if (!form.consent) {
    errors.consent = "Please agree to be contacted to continue.";
  }

  return errors;
}

import Image from "next/image";

function TrialFormCard() {
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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      // Focus the first field with an error.
      const firstField = Object.keys(nextErrors)[0];
      if (typeof document !== "undefined") {
        document.getElementById(`trial-${firstField}`)?.focus();
      }
      return;
    }
    setErrors({});

    const payload = {
      formId: "HRMS_TRIAL_INQ" as const,
      fullName: form.fullName.trim(),
      workEmail: form.workEmail.trim(),
      companyName: form.companyName.trim(),
      role: form.role,
      employeeCount: form.employeeCount,
      howManageHR: form.howManageHR,
    };

    try {
      setSending(true);
      setSendError(false);
      await submitForm(payload);
      setSubmitted(true);
      setForm(INITIAL);
    } catch (err) {
      console.error("Trial request submit failed:", err);
      setSendError(true);
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <FormSuccess
        onReset={() => setSubmitted(false)}
        resetLabel="Start another trial"
        className="min-h-[360px]"
      />
    );
  }

  return (
    <div className="max-w-[640px] w-full">
      <h2 className="text-center font-lato text-[20px] font-bold text-[#0A4B6E] sm:text-[24px]">
        Claim Your 2 Free Months of V-Watch HRMS
      </h2>
      <p className="mx-auto mb-6 mt-2 max-w-[420px] text-center font-lato text-[13px] leading-[19px] text-[#3890C0] sm:text-[14px]">
        Register by 31st December 2026 to receive full HRMS access at no
        cost for two months.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InputField
            id="trial-fullName"
            label="Full Name *"
            placeholder="Enter Your Full Name"
            value={form.fullName}
            onChange={(v) => {
              clearError("fullName");
              setForm((p) => ({ ...p, fullName: v }));
            }}
            error={errors.fullName}
            icon={
              <Image src="/hrms/person_hrms.svg" alt="" width={24} height={24} aria-hidden="true" />
            }
            required
            autoComplete="name"
          />

          <InputField
            id="trial-workEmail"
            label="Work Email *"
            type="email"
            placeholder="Enter Your Work Email"
            value={form.workEmail}
            onChange={(v) => {
              clearError("workEmail");
              setForm((p) => ({ ...p, workEmail: v }));
            }}
            error={errors.workEmail}
            icon={<Image src="/hrms/mail_hrms.svg" alt="" width={24} height={24} aria-hidden="true" />}
            required
            autoComplete="email"
          />

          <InputField
            id="trial-companyName"
            label="Company Name *"
            placeholder="Enter Company Name"
            value={form.companyName}
            onChange={(v) => {
              clearError("companyName");
              setForm((p) => ({ ...p, companyName: v }));
            }}
            error={errors.companyName}
            icon={<Image src="/hrms/company_hrms.svg" alt="" width={24} height={24} aria-hidden="true" />}
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
            icon={<Image src="/hrms/role_hrms.svg" alt="" width={24} height={24} aria-hidden="true" />}
          />

          <SelectField
            id="trial-employeeCount"
            label="Number of Employees"
            value={form.employeeCount}
            onChange={(v) => setForm((p) => ({ ...p, employeeCount: v }))}
            options={EMPLOYEE_COUNTS}
            placeholder="1–50"
            icon={<Image src="/hrms/employee_hrms.svg" alt="" width={24} height={24} aria-hidden="true" />}
          />

          <SelectField
            id="trial-howManageHR"
            label="How do you currently manage HR?"
            value={form.howManageHR}
            onChange={(v) => setForm((p) => ({ ...p, howManageHR: v }))}
            options={HR_MANAGEMENT_METHODS}
            placeholder="Spreadsheets"
          />
        </div>

        <div>
          <label htmlFor="trial-consent" className="flex items-start gap-2.5 text-[12px] leading-[18px] text-[#5C7E97]">
            <input
              id="trial-consent"
              type="checkbox"
              checked={form.consent}
              onChange={(e) => {
                clearError("consent");
                setForm((p) => ({ ...p, consent: e.target.checked }));
              }}
              aria-invalid={errors.consent ? true : undefined}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#BFE0F0] accent-[#2C8FC2] focus:ring-[#2C8FC2]/30"
            />
            <span>
              By submitting this form, you agree to be contacted by V-Watch
              AI regarding the HRMS promotional offer. Please refer to our{" "}
              <span className="font-semibold text-[#0A4B6E]">
                Privacy Policy
              </span>{" "}
              for information about how your data is handled.
            </span>
          </label>
          {errors.consent && (
            <p className="mt-1 text-[12px] text-[#E5484D]">{errors.consent}</p>
          )}
        </div>

        {/* Submit */}
        <div className="flex flex-col items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={sending}
            className="inline-flex h-11 items-center justify-center gap-2.5 rounded-full px-8 font-semibold text-white shadow-[0_10px_30px_-6px_rgba(74,222,128,0.45)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            style={{
              background: "linear-gradient(90deg,#12967F 0%,#5CBE72 100%)",
            }}
          >
            {sending ? "Sending…" : "Claim My 2 Free Months"}
          </button>

          <p
            className={`text-[12px] text-center md:text-[14px] ${
              sendError ? "text-[#D14343]" : "text-[#3890C0]"
            }`}
          >
            {sendError
              ? "Something went wrong. Please try again."
              : "No credit card required. Our team will contact you to help activate your free access."}
          </p>
        </div>
      </form>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

export default function HrmsTrialForm() {
  return (
    <section
      id="trial"
      // In-page jumps to this anchor (the promo bar's "Claim This Offer",
      // the hero CTA, etc.) are handled by Lenis (see SmoothScroll), which
      // reads scroll-margin-top to know how much of the fixed header to
      // clear — without it the card's top (heading included) lands hidden
      // behind the header. --nav-h is the header's real measured height
      // (kept in sync by Navbar), so this stays correct whether or not the
      // promo bar is present/wrapped to two lines.
      className="z-30 relative -mb-[600px] scroll-mt-[calc(var(--nav-h,60px)+16px)] sm:-mb-[220px] pt-4 md:pt-15"
    >
      <div className="relative mx-auto max-w-[680px]">
        {/* Stacked cards behind — visible peeking out above the main card */}
        <div className="absolute inset-x-10 -top-9 h-8 rounded-t-[24px] bg-[#e7f6ff]" />
        <div className="absolute inset-x-6 -top-5 h-8 rounded-t-[24px] bg-[#bae3fb]" />

        {/* Main card */}
        <div
          className="relative rounded-[24px] bg-white px-7 py-8 sm:px-10 sm:py-10"
          style={{
            boxShadow: `
              0 0 60px 10px rgba(33, 177, 241, 0.35),
              0 -20px 50px 0 rgba(33, 177, 241, 0.30),
              0 20px 50px 0 rgba(33, 177, 241, 0.22),
              0 0 100px 20px rgba(33, 177, 241, 0.18)
            `,
          }}
        >
          <TrialFormCard />
        </div>
      </div>

      {/* Legal fine print — sits in the blue CTA band that the Footer renders
          directly below (this section's negative margin pulls that band up
          to start right here; showHeader={false} on <Footer> leaves that
          band empty otherwise, sized via its own responsive height so the
          band stays taller than this text on narrow/mobile viewports where
          it wraps to many more lines). */}
      <p className="relative mx-auto mt-6 max-w-[940px] px-4 text-center font-lato text-[20px] font-medium leading-[32px] tracking-normal text-white">
        Offer registration closes on 31st December 2026. The two-month free
        period begins when the company account is activated. Full access
        applies to V-Watch HRMS features available during the promotional
        period. Continued use is optional and will be charged at RM5 per
        subscribed employee per month based on the number of subscriptions
        selected by the company. Additional terms and conditions may apply.
      </p>
    </section>
  );
}
