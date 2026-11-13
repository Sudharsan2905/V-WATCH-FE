"use client";

import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { submitForm } from "@/lib/submitForm";
import { DEMO_ROLES } from "@/constants/demo-form";
import { ArrowUpRight, Check, T } from "../ui";

// Role uses the same options as /book-demo. Location and stage are Figma-only
// fields with no counterpart in the forms API, so they have no options yet and
// are not submitted.
const ROLE_OPTIONS = DEMO_ROLES;
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

// Same patterns as /book-demo.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Phone: digits only, with an optional leading "+" country code; 7–15 digits
// (E.164 maximum).
const PHONE_RE = /^\+?\d{7,15}$/;

// Strips everything except digits (and a "+" typed or pasted first), so letters
// and symbols can't be entered at all.
function sanitizePhone(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 15);
  return (raw.trimStart().startsWith("+") ? "+" : "") + digits;
}

// Required fields follow the Figma labels: name, email, organisation and the
// consent box. Phone, interests and the message are optional.
function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (!form.fullName.trim()) errors.fullName = "Please enter your full name.";
  if (!form.workEmail.trim()) errors.workEmail = "Please enter your work email.";
  else if (!EMAIL_RE.test(form.workEmail.trim()))
    errors.workEmail = "Please enter a valid email address.";
  if (!form.organisation.trim())
    errors.organisation = "Please enter your organisation.";
  if (form.phone.trim() && !PHONE_RE.test(form.phone.trim()))
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
      <label
        id={`${id}-label`}
        htmlFor={id}
        className={`${T.label} pb-0.5 pt-px text-[#223B4B]`}
      >
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

// Custom dropdown styled like the form's inputs — a native <select>'s option
// list can't be styled and renders as the OS default. Follows the WAI-ARIA
// select-only combobox pattern: Enter/Space/↑/↓ open it, ↑/↓/Home/End move,
// typing jumps to a matching option, Enter/Space pick, Esc/Tab close.
// The first entry is the placeholder, which clears an optional choice.
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
  options: readonly string[];
  value: string;
  error?: string;
  onChange: (value: string) => void;
}>) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeahead = useRef({ text: "", at: 0 });
  const items = options.length ? ["", ...options] : [];
  const listId = `${id}-listbox`;
  const optionId = (i: number) => `${id}-option-${i}`;

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [open]);

  // Keep the highlighted option in view while navigating.
  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector(`#${CSS.escape(optionId(active))}`)
      ?.scrollIntoView({ block: "nearest" });
    // optionId is derived from the stable `id` prop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, active]);

  function openList(start?: number) {
    setActive(start ?? Math.max(0, items.indexOf(value)));
    setOpen(true);
  }

  function close(returnFocus = true) {
    setOpen(false);
    // Start the next type-ahead search fresh.
    typeahead.current.text = "";
    if (returnFocus) buttonRef.current?.focus();
  }

  function choose(i: number) {
    if (i < 0 || i >= items.length) return;
    onChange(items[i]);
    close();
  }

  // Index of the next option starting with the typed text (600ms buffer).
  function typeaheadMatch(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return -1;
    const t = typeahead.current;
    t.text = e.timeStamp - t.at > 600 ? e.key.toLowerCase() : t.text + e.key.toLowerCase();
    t.at = e.timeStamp;
    return items.findIndex((opt, i) => i > 0 && opt.toLowerCase().startsWith(t.text));
  }

  // Focus never leaves the combobox button (WAI-ARIA select-only combobox):
  // it handles every key and points at the highlighted option through
  // aria-activedescendant, so no keystroke is lost while the list opens.
  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        const current = Math.max(0, items.indexOf(value));
        openList(e.key === "ArrowUp" ? Math.max(0, current - 1) : current);
        return;
      }
      const match = typeaheadMatch(e);
      if (match > 0) {
        e.preventDefault();
        openList(match);
      }
      return;
    }
    const last = items.length - 1;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((a) => Math.min(last, a + 1));
        return;
      case "ArrowUp":
        e.preventDefault();
        setActive((a) => Math.max(0, a - 1));
        return;
      case "Home":
        e.preventDefault();
        setActive(0);
        return;
      case "End":
        e.preventDefault();
        setActive(last);
        return;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(active);
        return;
      case "Escape":
        e.preventDefault();
        close();
        return;
      case "Tab":
        close(false);
        return;
    }
    const match = typeaheadMatch(e);
    if (match > 0) {
      e.preventDefault();
      setActive(match);
    }
  }

  return (
    <Field id={id} label={label} error={error}>
      <div ref={rootRef} className="relative">
        <button
          ref={buttonRef}
          id={id}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-labelledby={`${id}-label ${id}`}
          aria-activedescendant={
            open && items.length ? optionId(active) : undefined
          }
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          onClick={() => (open ? close(false) : openList())}
          onKeyDown={onKeyDown}
          className={`${fieldBase} ${fieldBorder(error)} flex h-[47px] cursor-pointer items-center pr-9 text-left lg:h-[52px] ${
            open ? "border-[#0A8EC8] ring-2 ring-[#0A8EC8]/30" : ""
          }`}
        >
          <span className={`truncate ${value ? "" : "text-[#607386]"}`}>
            {value || placeholder}
          </span>
        </button>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
          className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            d="M4 6l4 4 4-4"
            stroke={open ? "#0A8EC8" : "#466579"}
            strokeWidth="1.333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <AnimatePresence>
          {open && (
            <motion.ul
              ref={listRef}
              id={listId}
              role="listbox"
              aria-labelledby={`${id}-label`}
              // Let the list scroll natively instead of Lenis scrolling the page.
              data-lenis-prevent
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full z-30 mt-1.5 max-h-[248px] overflow-y-auto rounded-[7px] border border-[#C3D3DD] bg-white p-1 shadow-[0_12px_32px_rgba(1,13,28,0.14)]"
            >
              {items.length === 0 && (
                <li className="px-3 py-2 text-[11px] leading-[1.5] text-[#607386] lg:text-[14px]">
                  No options available
                </li>
              )}
              {items.map((opt, i) => {
                const selected = opt === value;
                return (
                  <li
                    key={opt || "__placeholder"}
                    id={optionId(i)}
                    role="option"
                    aria-selected={selected}
                    onMouseEnter={() => setActive(i)}
                    // Keep focus on the combobox so keyboard use continues.
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => choose(i)}
                    className={`flex cursor-pointer items-center justify-between gap-2 rounded-[5px] px-3 py-2 text-[11px] leading-[1.5] transition-colors lg:text-[14px] ${
                      i === active ? "bg-[#F4F8FA]" : ""
                    } ${
                      !opt
                        ? "text-[#607386]" // placeholder row stays muted
                        : selected
                          ? "font-[570] text-[#0A4B6E]"
                          : "text-[#19213D]"
                    }`}
                  >
                    <span className="truncate">{opt || placeholder}</span>
                    {selected && opt && (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden
                        className="shrink-0"
                      >
                        <path
                          d="m3.5 8.5 3 3 6-6.5"
                          stroke="#0A8EC8"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </Field>
  );
}

export default function DemoForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (sending) return;
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
      return;
    }
    setErrors({});

    // Same API and payload shape as the /book-demo form. Fields this form
    // doesn't collect (industry, opSize) are sent empty; Project location,
    // Project stage and the consent tick have no API field and are not sent.
    const payload = {
      formId: "DEMO_INQ" as const,
      fullName: form.fullName.trim(),
      workEmail: form.workEmail.trim(),
      companyName: form.organisation.trim(),
      phoneNumber: form.phone.trim(),
      role: form.role,
      industry: "",
      services: form.interests.join(", "),
      opSize: "",
      additionalDetails: form.message.trim(),
    };

    try {
      setSending(true);
      setSendError(false);
      await submitForm(payload);
      router.push("/thank-you");
    } catch (err) {
      console.error("Demo request submit failed:", err);
      setSendError(true);
      setSending(false);
    }
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
              onChange={(e) => update("phone", sanitizePhone(e.target.value))}
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
            disabled={sending}
            aria-busy={sending}
            className="group flex h-[52px] w-full items-center justify-between gap-2.5 rounded-[8px] bg-[#7A0CA2] px-5 text-[14px] font-[760] text-white transition-colors hover:bg-[#6A0A8D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A8EC8] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {sending ? "Sending…" : "Book a Demonstration"}
            <ArrowUpRight />
          </button>
          {sendError && (
            <p role="alert" className="-mt-1.5 text-[12px] text-[#D14343]">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
