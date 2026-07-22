"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  EASE,
  fadeUp,
  scaleIn,
  staggerContainer,
  viewportReveal,
} from "@/components/about/anim";

/* ------------------------------------------------------------------ *
 * "Book your site visibility walkthrough" — copy + contacts on the
 * left, enquiry form on the right.
 *
 * Figma (Frame 2147230506: 1280 fill, 60px sides, inner 1160 × 724):
 *   left  575 × 560   pad-top 50, gap 14
 *     ├ copy      575 × 222  gap 20 (heading 62 + body 140)
 *     └ contacts  417 × 274  item 64, radius 14, border 2
 *   right 548 × 645   card, padding 24/20, gap 20
 *     ├ header  511 × 83   gap 10 (title 29 + subtitle 44)
 *     ├ fields  508 × 380  gap 16 → rows of 69 (label 19 + 6 + input 44)
 *     └ footer  508 × 94   gap 10 (button 44 + disclaimer 40)
 * 50+222+14+274 = 560 ✓   24+83+20+380+20+94+24 = 645 ✓   508+2×20 = 548 ✓
 * ------------------------------------------------------------------ */

// Shared across all forms; this one uses its own template id. Until all three
// are present the form stays inert — it logs and shows success without sending.
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_SITE_VISIBILITY;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const EMAILJS_READY = Boolean(
  EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY,
);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ROLES = [
  "Project Director / Manager",
  "Operations Director",
  "Facility Manager",
  "Security Manager",
  "Engineering / Technical",
  "Main Contractor",
  "Other",
];
const PROJECT_SIZES = [
  "Single site",
  "2–5 sites",
  "6–15 sites",
  "16+ sites / programme",
];
const TIMINGS = [
  "As soon as possible",
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "Just exploring",
];

/* ─── Icons ──────────────────────────────────────────────────────── */

/* Every icon this section needs, keyed by where it appears. The value is the
   filename (minus .svg) under /public/site-visibility/ — rename here to match
   whatever the supplied assets are actually called. */
const ICON_KEYS = {
  // Form fields — rendered at 20px, left-inset in the control.
  fullName: "full-name",
  companyRole: "company-role",
  workEmail: "work-email",
  siteLocation: "site-location",
  projectSize: "project-size",
  timing: "timing",
  // Contact rail — rendered at 22px on the #1D6C97→#5CB7E8 tile, so these
  // three want to be white glyphs.
  email: "email",
  phone: "phone",
  overview: "overview",
} as const;

const ICON = (key: string) => `/site-visibility/${key}.svg`;

function FieldIcon({ name, size = 20 }: Readonly<{ name: string; size?: number }>) {
  return (
    <Image
      src={ICON(name)}
      alt=""
      width={size}
      height={size}
      className="object-contain"
      style={{ width: size, height: size }}
    />
  );
}

/* ─── Contact rail ───────────────────────────────────────────────── */

type Contact = { icon: string; label: string; value: string; href?: string };

const CONTACTS: Contact[] = [
  {
    icon: ICON_KEYS.email,
    label: "Email",
    value: "support@vwatch.ai",
    href: "mailto:support@vwatch.ai",
  },
  { icon: ICON_KEYS.phone, label: "Phone", value: "+60 XX-XXXX XXX" },
  {
    icon: ICON_KEYS.overview,
    label: "1-Page overview",
    value: "Download the platform summary (PDF)",
  },
];

/* Figma: #F4FBFF at 20% inside a 2px white→#EFF9FF gradient border. The fill
   is opaque here — in this gradient-border technique the padding-box layer is
   what masks the border gradient off the interior. */
const CONTACT_STYLE: React.CSSProperties = {
  background: `
    linear-gradient(#F7FCFF, #F7FCFF) padding-box,
    linear-gradient(180deg, #FFFFFF 0%, #EFF9FF 100%) border-box
  `,
  border: "2px solid transparent",
  boxShadow: "0px 13px 34px rgba(10,75,110,0.06)",
};

function ContactRow({ contact }: Readonly<{ contact: Contact }>) {
  const body = (
    <>
      {/* 48px tile, radius 12, #1D6C97→#5CB7E8. */}
      <span
        className="grid size-[48px] shrink-0 place-items-center rounded-[12px]"
        style={{
          background: "linear-gradient(180deg, #1D6C97 0%, #5CB7E8 100%)",
        }}
      >
        <FieldIcon name={contact.icon} size={22} />
      </span>
      <span className="flex min-w-0 flex-col gap-[4px]">
        <span className="font-lato text-[16px] font-bold leading-[20px] text-[#1D6C97]">
          {contact.label}
        </span>
        <span className="truncate font-lato text-[15px] font-normal leading-[20px] text-[#3890C0] lg:text-[16px]">
          {contact.value}
        </span>
      </span>
    </>
  );

  return (
    <motion.li variants={fadeUp} style={CONTACT_STYLE} className="rounded-[14px]">
      {contact.href ? (
        <a
          href={contact.href}
          className="flex h-[64px] items-center gap-[10px] p-[10px] transition-opacity hover:opacity-80"
        >
          {body}
        </a>
      ) : (
        <div className="flex h-[64px] items-center gap-[10px] p-[10px]">
          {body}
        </div>
      )}
    </motion.li>
  );
}

/* ─── Form primitives ────────────────────────────────────────────── */

/* Field styling mirrors the site's other forms (hrms/TrialForm, book-demo,
   contact) so all four look like one system: a 44px control on the #F5FBFF
   fill with an #E9F8FF hairline and the #0a8ec8 focus ring. */
const LABEL_CLS =
  "block font-lato text-[12px] font-normal text-[#0A4B6E] md:text-[16px]";
const CONTROL_CLS =
  "h-11 w-full rounded-[10px] border border-[#E9F8FF] bg-[#F5FBFF] pl-[45px] pr-4 font-lato text-[15px] font-normal text-[#19213D] outline-none transition-colors placeholder:text-[#0A4B6E]/50 focus:border-[#0a8ec8] focus:ring-2 focus:ring-[#0a8ec8]/15";
const CONTROL_ERROR_CLS =
  "border-[#E5484D] focus:border-[#E5484D] focus:ring-[#E5484D]/15";

const ctrl = (error?: string) =>
  `${CONTROL_CLS} ${error ? CONTROL_ERROR_CLS : ""}`;

function Field({
  id,
  label,
  required,
  icon,
  error,
  children,
}: Readonly<{
  id: string;
  label: string;
  required?: boolean;
  icon: ReactNode;
  error?: string;
  children: ReactNode;
}>) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-[6px]">
      <label htmlFor={id} className={LABEL_CLS}>
        {label}
        {/* Blue asterisk, matching the required marker on the other forms. */}
        {required && (
          <span className="font-lato font-black text-[#3890C0]"> *</span>
        )}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2">
          {icon}
        </span>
        {children}
      </div>
      {error && (
        <p id={`${id}-error`} className="font-lato text-[12px] text-[#E5484D]">
          {error}
        </p>
      )}
    </div>
  );
}

/* Custom dropdown — the same pattern as the contact form's EnquirySelect, so
   the panel is styled rather than OS-native. Native <select> can't be themed
   consistently across browsers, which is why this exists. */
const SELECT_BTN =
  "flex h-11 w-full items-center rounded-[10px] border bg-[#F5FBFF] pl-[45px] pr-9 text-left font-lato text-[15px] font-normal outline-none transition-all";

function SelectField({
  id,
  value,
  onChange,
  options,
  placeholder,
  error,
}: Readonly<{
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  error?: string;
}>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape.
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

  const border = error
    ? "border-[#E5484D] ring-2 ring-[#E5484D]/15"
    : open
      ? "border-[#0a8ec8] ring-2 ring-[#0a8ec8]/15"
      : "border-[#E9F8FF] hover:border-[#bfe6f5]";

  return (
    <div ref={ref} className="relative">
      <button
        id={id}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`${SELECT_BTN} ${border}`}
      >
        <span
          className={`flex-1 truncate ${
            value ? "text-[#19213D]" : "text-[#0A4B6E]/50"
          }`}
        >
          {value || placeholder}
        </span>
      </button>

      <svg
        aria-hidden
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#2C8FC2] transition-transform duration-200 ${
          open ? "rotate-180" : ""
        }`}
      >
        <path
          d="M3.5 5.25 7 8.75l3.5-3.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: EASE }}
            className="absolute left-0 right-0 top-full z-30 mt-2 max-h-[224px] origin-top overflow-auto rounded-[14px] border border-[#E9F8FF] bg-white p-1.5 shadow-[0_18px_50px_rgba(10,75,110,0.18)]"
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
                    className={`flex w-full items-center justify-between gap-2 rounded-[10px] px-3 py-2.5 text-left font-lato text-[15px] leading-tight transition-colors ${
                      selected
                        ? "bg-[#E9F8FF] font-semibold text-[#0a4b6e]"
                        : "text-[#0A4B6E] hover:bg-[#F5FBFF]"
                    }`}
                  >
                    <span className="truncate">{opt}</span>
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

type FormState = {
  fullName: string;
  companyRole: string;
  workEmail: string;
  siteLocation: string;
  projectSize: string;
  timing: string;
  message: string;
};

const INITIAL: FormState = {
  fullName: "",
  companyRole: "",
  workEmail: "",
  siteLocation: "",
  projectSize: "",
  timing: "",
  message: "",
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.fullName.trim()) errors.fullName = "Full name is required.";
  if (!form.companyRole) errors.companyRole = "Select your role.";
  if (!form.workEmail.trim()) {
    errors.workEmail = "Work email is required.";
  } else if (!EMAIL_RE.test(form.workEmail.trim())) {
    errors.workEmail = "Enter a valid email address.";
  }
  if (!form.siteLocation.trim())
    errors.siteLocation = "Site location is required.";
  if (!form.projectSize) errors.projectSize = "Select a project size.";
  if (!form.timing) errors.timing = "Select a timing.";
  return errors;
}

/* Figma: 205 × 44, radius 31.03, 1.24px gradient border, #21B1F1→#A6C936. */
const SUBMIT_STYLE: React.CSSProperties = {
  background: `
    linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1)) padding-box,
    linear-gradient(180deg, #21B1F1 -20.69%, #A6C936 151.72%) padding-box,
    linear-gradient(180deg, rgba(33,177,241,0.4) -20.69%, rgba(197,235,76,0.4) 151.72%) border-box
  `,
  border: "1.24px solid transparent",
};

function WalkthroughForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      document.getElementById(`sv-${Object.keys(nextErrors)[0]}`)?.focus();
      return;
    }
    setErrors({});

    const params = {
      to_email: "sales@vwatch.ai",
      name: form.fullName.trim(),
      email: form.workEmail.trim(),
      role: form.companyRole,
      reply_to: form.workEmail.trim(),
      site_location: form.siteLocation.trim(),
      project_size: form.projectSize,
      timing: form.timing,
      message: form.message.trim(),
    };

    if (!EMAILJS_READY) {
      console.log("Walkthrough request (EmailJS not configured):", params);
      setSubmitted(true);
      return;
    }

    // try {
    //   setSending(true);
    //   setSendError(false);
    //   await emailjs.send(EMAILJS_SERVICE_ID!, EMAILJS_TEMPLATE_ID!, params, {
    //     publicKey: EMAILJS_PUBLIC_KEY!,
    //   });
    //   setSubmitted(true);
    //   setForm(INITIAL);
    // } catch (err) {
    //   console.error("EmailJS send failed:", err);
    //   setSendError(true);
    // } finally {
    //   setSending(false);
    // }
  }

  if (submitted) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center gap-[16px] text-center">
        <div className="grid size-[64px] place-items-center rounded-full bg-[#E9F8FF]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="m5 13 4 4L19 7"
              stroke="#0a8ec8"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="font-lato text-[22px] font-bold leading-[100%] text-[#0A4B6E]">
          Thanks — request received.
        </h3>
        <p className="max-w-[380px] font-lato text-[16px] leading-[22px] text-[#3890C0]">
          A member of the V-Watch Ai team will be in touch within one working
          day to arrange your walkthrough.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="font-lato text-[14px] font-bold text-[#0a8ec8] underline underline-offset-4"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-[20px]"
    >
      {/* Header — gap 10. */}
      <div className="flex flex-col items-center gap-[10px] text-center">
        <h3 className="font-lato text-[20px] font-bold leading-[100%] text-[#0A4B6E] lg:text-[24px]">
          Book your walkthrough
        </h3>
        <p className="max-w-[354px] font-lato text-[16px] font-bold leading-[120%] text-[#0A4B6E] lg:text-[18px]">
          We&apos;ll be in touch within one working day.
        </p>
      </div>

      {/* Fields — rows of two, gap 16. */}
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[16px] sm:flex-row">
          <Field
            id="sv-fullName"
            label="Full Name"
            required
            icon={<FieldIcon name={ICON_KEYS.fullName} />}
            error={errors.fullName}
          >
            <input
              id="sv-fullName"
              type="text"
              autoComplete="name"
              placeholder="Enter Full Name"
              value={form.fullName}
              onChange={(e) => set("fullName", e.target.value)}
              className={ctrl(errors.fullName)}
            />
          </Field>
          <Field
            id="sv-companyRole"
            label="Company Role"
            required
            icon={<FieldIcon name={ICON_KEYS.companyRole} />}
            error={errors.companyRole}
          >
            <SelectField
              id="sv-companyRole"
              value={form.companyRole}
              onChange={(v) => set("companyRole", v)}
              options={ROLES}
              placeholder="Select Your Role"
              error={errors.companyRole}
            />
          </Field>
        </div>

        <div className="flex flex-col gap-[16px] sm:flex-row">
          <Field
            id="sv-workEmail"
            label="Work Email"
            required
            icon={<FieldIcon name={ICON_KEYS.workEmail} />}
            error={errors.workEmail}
          >
            <input
              id="sv-workEmail"
              type="email"
              autoComplete="email"
              placeholder="Enter Work Email"
              value={form.workEmail}
              onChange={(e) => set("workEmail", e.target.value)}
              className={ctrl(errors.workEmail)}
            />
          </Field>
          <Field
            id="sv-siteLocation"
            label="Site Location"
            required
            icon={<FieldIcon name={ICON_KEYS.siteLocation} />}
            error={errors.siteLocation}
          >
            <input
              id="sv-siteLocation"
              type="text"
              placeholder="Enter Site Location"
              value={form.siteLocation}
              onChange={(e) => set("siteLocation", e.target.value)}
              className={ctrl(errors.siteLocation)}
            />
          </Field>
        </div>

        <div className="flex flex-col gap-[16px] sm:flex-row">
          <Field
            id="sv-projectSize"
            label="Project Size"
            required
            icon={<FieldIcon name={ICON_KEYS.projectSize} />}
            error={errors.projectSize}
          >
            <SelectField
              id="sv-projectSize"
              value={form.projectSize}
              onChange={(v) => set("projectSize", v)}
              options={PROJECT_SIZES}
              placeholder="Select Size"
              error={errors.projectSize}
            />
          </Field>
          <Field
            id="sv-timing"
            label="Timing"
            required
            icon={<FieldIcon name={ICON_KEYS.timing} />}
            error={errors.timing}
          >
            <SelectField
              id="sv-timing"
              value={form.timing}
              onChange={(v) => set("timing", v)}
              options={TIMINGS}
              placeholder="Select Timing"
              error={errors.timing}
            />
          </Field>
        </div>

        {/* Free-text — label 19 + 6 + 100 tall box. */}
        <div className="flex flex-col gap-[6px]">
          <label htmlFor="sv-message" className={LABEL_CLS}>
            What would you like to fix first?
          </label>
          <textarea
            id="sv-message"
            rows={3}
            placeholder="Tell us where access, deliveries or reporting is currently causing pain on your site…"
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            className="h-[100px] w-full resize-none rounded-[10px] border border-[#E9F8FF] bg-[#F5FBFF] p-[12px] font-lato text-[15px] font-normal leading-[22px] text-[#19213D] outline-none transition-colors placeholder:text-[#0A4B6E]/50 focus:border-[#0a8ec8] focus:ring-2 focus:ring-[#0a8ec8]/15"
          />
        </div>
      </div>

      {/* Footer — button 44 + disclaimer, gap 10. */}
      <div className="flex flex-col items-center gap-[10px]">
        <button
          type="submit"
          disabled={sending}
          style={SUBMIT_STYLE}
          className="inline-flex h-[44px] items-center justify-center rounded-full px-[24px] font-lato text-[16px] font-bold leading-none text-white shadow-[2px_5px_14px_rgba(79,148,104,0.60),0_6px_42px_rgba(38,124,153,0.40)] transition-[transform,filter] duration-200 ease-out hover:scale-102 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {sending ? "Sending…" : "Book my walkthrough"}
        </button>
        {sendError && (
          <p className="font-lato text-[13px] text-[#E5484D]">
            Something went wrong. Please try again or email support@vwatch.ai.
          </p>
        )}
        <p className="max-w-[392px] text-center font-lato text-[13px] font-normal leading-[20px] text-[#3890C0]/90 lg:text-[14px]">
          By submitting, you agree to be contacted about your enquiry.
          <br />
          We do not share your details with third parties.
        </p>
      </div>
    </form>
  );
}

/* ─── Section ────────────────────────────────────────────────────── */

export default function SiteVisibilityWalkthrough() {
  return (
    // z-30 clears the footer's z-20 curtain overlay, which sits in this same
    // stacking context — at z-10 the curtain would paint over the form card.
    <section
      className="relative z-30 w-full pt-[48px] lg:pt-[75px]"
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #F1F9FE 100%)",
      }}
    >
      <div className="w-full px-[24px] lg:px-[60px]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportReveal}
          variants={staggerContainer}
          className="mx-auto flex w-full max-w-[1410px] flex-col items-stretch gap-[24px]"
        >
          {/* Header — full width, capped at the Figma's 986px text box. */}
          <div className="flex max-w-[986px] flex-col gap-[6px]">
            <motion.h2
              variants={fadeUp}
              className="font-lato text-[20px] font-bold leading-[120%] text-[#0A4B6E] lg:text-[24px] lg:leading-[100%]"
            >
              See your next data center site through a single pane of glass.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.08}
              className="font-lato text-[16px] font-medium leading-[24px] text-[#0A4B6E] lg:text-[20px] lg:leading-[28px]"
            >
              Share a few details we&apos;ll arrange a 30-minute tailored
              walkthrough. No sales pitch, just a working demo.
            </motion.p>
          </div>

          {/* Contacts — one row of three across the full 1160 at lg. */}
          <motion.ul
            variants={staggerContainer}
            className="grid w-full grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-3"
          >
            {CONTACTS.map((c) => (
              <ContactRow key={c.label} contact={c} />
            ))}
          </motion.ul>

          {/* Form card, centred below, with the Figma's blue halo behind it. */}
          <motion.div
            variants={scaleIn}
            // mt: the stacked cards are absolutely positioned against this box,
            // so margin (not padding) is what clears their 36px overhang.
            // -mb: drops the card into the 220px spacer the footer renders with
            // showHeader={false}. It's on the card, not the section, so the
            // section's light gradient stops above the footer.
            className="relative mx-auto mt-[44px] -mb-[220px] w-full min-w-0 sm:mt-[52px] lg:w-[548px]"
          >
            {/* Stacked cards peeking out above, then the layered #21B1F1
                glow — the same treatment as the HRMS trial form so both
                cards read identically. */}
            <div
              aria-hidden
              className="absolute inset-x-10 -top-9 h-8 rounded-t-[24px] bg-[#e7f6ff]"
            />
            <div
              aria-hidden
              className="absolute inset-x-6 -top-5 h-8 rounded-t-[24px] bg-[#bae3fb]"
            />
            {/* Glow down the left and right edges only. A box-shadow radiates
                from all four sides and can't be shaped, so this is a blurred
                halo instead: it stops short of the card's bottom edge (by more
                than the blur radius) so no glow bleeds underneath. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 bottom-[70px] rounded-[24px] bg-[#21B1F1]/45 blur-[38px]"
            />
            <div className="relative rounded-[24px] bg-white px-[20px] py-[24px]">
              <WalkthroughForm />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
