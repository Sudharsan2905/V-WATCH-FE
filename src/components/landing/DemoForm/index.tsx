"use client";

import { useRouter } from "next/navigation";
import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { ArrowUpRight, Check, T } from "../ui";

// TODO: dropdown options are still to be confirmed by the business. While a
// list is empty its field shows only the placeholder and is not required.
const ROLE_OPTIONS: string[] = [];
const LOCATION_OPTIONS: string[] = [];
const STAGE_OPTIONS: string[] = [];

const INTERESTS = ["Atlas", "Digital Handover", "Aegis", "Not sure yet"] as const;

const COVERAGE = [
  "How Atlas or Aegis fits your current stage",
  "What information to carry forward at handover",
  "Deployment options for your site",
] as const;

type FormState = {
  fullName: string;
  workEmail: string;
  organisation: string;
  role: string;
  location: string;
  stage: string;
  interests: string[];
  phone: string;
  message: string;
  consent: boolean;
};

type Errors = Partial<Record<keyof FormState, string>>;

const INITIAL: FormState = {
  fullName: "",
  workEmail: "",
  organisation: "",
  role: "",
  location: "",
  stage: "",
  interests: [],
  phone: "",
  message: "",
  consent: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (!form.fullName.trim()) errors.fullName = "Please enter your full name.";
  if (!form.workEmail.trim()) errors.workEmail = "Please enter your work email.";
  else if (!EMAIL_RE.test(form.workEmail.trim()))
    errors.workEmail = "Please enter a valid email address.";
  if (!form.organisation.trim())
    errors.organisation = "Please enter your organisation.";
  if (ROLE_OPTIONS.length && !form.role) errors.role = "Please select your role.";
  if (LOCATION_OPTIONS.length && !form.location)
    errors.location = "Please select a location.";
  if (STAGE_OPTIONS.length && !form.stage)
    errors.stage = "Please select a project stage.";
  if (form.phone.trim() && !/^\+?[\d\s()-]{6,20}$/.test(form.phone.trim()))
    errors.phone = "Please enter a valid phone number.";
  if (!form.consent) errors.consent = "Please confirm we may contact you.";
  return errors;
}

const fieldBase =
  "w-full rounded-[7px] border bg-white px-3 text-[11px] leading-[1.5] lg:text-[14px] lg:leading-[1.6] text-[#19213D] placeholder:text-[#607386] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0A8EC8]/30";
const fieldBorder = (error?: string) =>
  error
    ? "border-[#D14343] focus:border-[#D14343]"
    : "border-[#C3D3DD] focus:border-[#0A8EC8]";

function Field({
  id,
  label,
  optional = false,
  error,
  children,
}: Readonly<{
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={`${T.label} pb-0.5 pt-px text-[#223B4B]`}>
        {label}
        {optional && (
          <span className="font-normal text-[#607386]"> (optional)</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-[12px] text-[#D14343]">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
  id,
  label,
  placeholder,
  options,
  value,
  error,
  onChange,
}: Readonly<{
  id: keyof FormState;
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  error?: string;
  onChange: (value: string) => void;
}>) {
  return (
    <Field id={id} label={label} error={error}>
      <div className="relative">
        <select
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${fieldBase} ${fieldBorder(error)} h-[47px] cursor-pointer lg:h-[52px] appearance-none pr-9 ${
            value ? "" : "text-[#607386]"
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="#466579"
            strokeWidth="1.333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Field>
  );
}

export default function DemoForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  function toggleInterest(interest: string) {
    update(
      "interests",
      form.interests.includes(interest)
        ? form.interests.filter((i) => i !== interest)
        : [...form.interests, interest],
    );
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
      return;
    }
    // TODO: submit to the forms API once the backend payload for this form is
    // agreed. Until then a valid form goes straight to the confirmation page.
    router.push("/thank-you");
  }

  const input = (key: "fullName" | "workEmail" | "organisation" | "phone") =>
    ({
      id: key,
      name: key,
      value: form[key],
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        update(key, e.target.value),
      "aria-invalid": !!errors[key],
      "aria-describedby": errors[key] ? `${key}-error` : undefined,
      className: `${fieldBase} ${fieldBorder(errors[key])} h-[44px] lg:h-[49px]`,
    }) as const;

  return (
    <section
      id="book-demo"
      aria-labelledby="book-demo-title"
      className="scroll-mt-(--nav-h) bg-[#0D2132] bg-[radial-gradient(120.2%_77.8%_at_15%_45%,#1A3949_0%,rgba(26,57,73,0)_69%)] px-5 py-10 lg:px-10 lg:py-[110px]"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
        {/* Intro */}
        <div className="flex flex-col gap-2.5 lg:max-w-[429px] lg:gap-[15px]">
          <p
            className={`flex items-center gap-2.5 ${T.eyebrow} text-[#A6C936]`}
          >
            <span aria-hidden className="size-[7px] rounded-full bg-[#A6C936]" />
            Request a walkthrough
          </p>
          <h2 id="book-demo-title" className={`${T.h2} text-white`}>
            Book a
            <br />
            Demonstration
          </h2>
          <p className={`${T.body} text-[#D1E2EC]`}>
            {/* Hard line breaks as in both Figma frames. */}
            Tell us about your project so we can arrange a
            <br className="hidden min-[400px]:inline" /> demonstration around
            your role, project stage and
            <br className="hidden min-[400px]:inline" /> priorities.
          </p>
          <h3 className={`${T.h6} text-white`}>What we can cover</h3>
          <ul className="flex flex-col gap-1.5 lg:gap-3">
            {COVERAGE.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check color="#A6C936" size={18} className="size-[15px] lg:size-[18px]" />
                <span className={`${T.pointsBold} text-[#D4E8EF]`}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex w-full flex-col gap-4 rounded-[5px] border border-[#E4EAF0] bg-white p-5 shadow-[0_23px_50px_rgba(1,13,28,0.29)] sm:p-[39px] lg:max-w-[686px]"
        >
          <div className="flex flex-col gap-[5px]">
            <h3 className={`${T.h5} text-[#122338]`}>Your project details</h3>
            <p className={`${T.points} text-[#4E6174]`}>
              Fields are required unless marked optional.
            </p>
          </div>

          <div className="grid gap-x-[15px] gap-y-[15px] min-[420px]:grid-cols-2 lg:gap-x-4 lg:gap-y-1.5">
            <Field id="fullName" label="Full name" error={errors.fullName}>
              <input
                {...input("fullName")}
                type="text"
                autoComplete="name"
                placeholder="Your name"
              />
            </Field>
            <Field id="workEmail" label="Work email" error={errors.workEmail}>
              <input
                {...input("workEmail")}
                type="email"
                autoComplete="email"
                placeholder="name@company.com"
              />
            </Field>
            <Field
              id="organisation"
              label="Organisation"
              error={errors.organisation}
            >
              <input
                {...input("organisation")}
                type="text"
                autoComplete="organization"
                placeholder="Company name"
              />
            </Field>
            <SelectField
              id="role"
              label="Role"
              placeholder="Select your role"
              options={ROLE_OPTIONS}
              value={form.role}
              error={errors.role}
              onChange={(v) => update("role", v)}
            />
            <SelectField
              id="location"
              label="Project location"
              placeholder="Select location"
              options={LOCATION_OPTIONS}
              value={form.location}
              error={errors.location}
              onChange={(v) => update("location", v)}
            />
            <SelectField
              id="stage"
              label="Project stage"
              placeholder="Select stage"
              options={STAGE_OPTIONS}
              value={form.stage}
              error={errors.stage}
              onChange={(v) => update("stage", v)}
            />
          </div>

          <fieldset className="flex flex-col gap-2">
            <legend className={`mb-2 ${T.label} text-[#223B4B]`}>
              Areas of interest
              <span className="font-normal text-[#607386]"> (optional)</span>
            </legend>
            <div className="flex flex-wrap gap-[7px]">
              {INTERESTS.map((interest) => (
                <label
                  key={interest}
                  className="flex cursor-pointer items-center gap-[7px] rounded-[7px] border border-[#DCE8EE] bg-[#F4F8FA] h-[35px] px-[9px] text-[10px] leading-[1.6] lg:text-[13px] text-[#294654] transition-colors has-checked:border-[#0A8EC8] has-checked:bg-[#E6F5FC]"
                >
                  <input
                    type="checkbox"
                    name="interests"
                    value={interest}
                    checked={form.interests.includes(interest)}
                    onChange={() => toggleInterest(interest)}
                    className="size-[15px] cursor-pointer accent-[#7A0CA2]"
                  />
                  {interest}
                </label>
              ))}
            </div>
          </fieldset>

          <Field id="phone" label="Phone" optional error={errors.phone}>
            <input
              {...input("phone")}
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="+60"
              className={`${input("phone").className} placeholder:font-[570]`}
            />
          </Field>

          <Field id="message" label="What would you like to see?" optional>
            <textarea
              id="message"
              name="message"
              rows={3}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="For example, preparing handover records for a site in Johor."
              className={`${fieldBase} ${fieldBorder()} min-h-[86px] resize-y py-2.5 placeholder:font-[570]`}
            />
          </Field>

          <div className="flex flex-col gap-1.5">
            <label className="flex cursor-pointer items-start gap-[9px] text-[10px] leading-[1.25] lg:text-[13px] text-[#3E5667]">
              <input
                id="consent"
                type="checkbox"
                name="consent"
                checked={form.consent}
                onChange={(e) => update("consent", e.target.checked)}
                aria-invalid={!!errors.consent}
                aria-describedby={errors.consent ? "consent-error" : undefined}
                className="mt-0.5 size-[17px] shrink-0 cursor-pointer accent-[#7A0CA2]"
              />
              I agree that V-Watch Ai may use these details to contact me about
              this enquiry.
            </label>
            {errors.consent && (
              <p id="consent-error" className="text-[12px] text-[#D14343]">
                {errors.consent}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="group flex h-[52px] w-full items-center justify-between gap-2.5 rounded-[8px] bg-[#7A0CA2] px-5 text-[14px] font-[760] text-white transition-colors hover:bg-[#6A0A8D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A8EC8]"
          >
            Book a Demonstration
            <ArrowUpRight />
          </button>
        </form>
      </div>
    </section>
  );
}
