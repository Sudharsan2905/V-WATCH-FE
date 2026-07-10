"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import emailjs from "@emailjs/browser";

// EmailJS credentials — set these in .env.local (all NEXT_PUBLIC_* so they're
// available in the browser). Until all three are present the form stays inert:
// it logs the submission and shows the success message without calling out.
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const EMAILJS_READY = Boolean(
  EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY,
);

type Field = {
  name: string;
  label: string;
  required?: boolean;
  type?: "text" | "email" | "number" | "tel";
  placeholder: string;
  icon: string;
  maxLength?: number;
  pattern?: string;
  inputMode?: "text" | "numeric" | "tel";
  title?: string;
};

const PAIRED_FIELDS: Field[][] = [
  [
    {
      name: "fullName",
      label: "Full Name",
      required: true,
      type: "text",
      placeholder: "Enter Full Name",
      icon: "/contact/direct/icons/form-person.svg",
    },
    {
      name: "workEmail",
      label: "Work Email",
      required: true,
      type: "email",
      placeholder: "Enter Work Email",
      icon: "/contact/direct/icons/form-mail.svg",
    },
  ],
  [
    {
      name: "companyName",
      label: "Company Name",
      required: true,
      type: "text",
      placeholder: "Enter Company Name",
      icon: "/contact/direct/icons/form-building.svg",
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      required: true,
      type: "tel",
      inputMode: "numeric",
      pattern: "[0-9]{10}",
      maxLength: 10,
      title: "Enter a 10-digit phone number",
      placeholder: "10-digit phone number",
      icon: "/contact/direct/icons/form-phone.svg",
    },
  ],
];

const ENQUIRY_TYPES = [
  "Sales / Product Enquiry",
  "General Question",
  "Support Request",
  "Partnership / Collaboration",
  "Other",
];

const CARD_SHADOW =
  "shadow-[0px_-1px_34px_rgba(29,108,151,0.01),-3px_20px_170px_rgba(255,255,255,0.5),0px_15px_14px_rgba(10,142,200,0.1)]";

function FieldLabel({
  children,
  required,
}: Readonly<{ children: React.ReactNode; required?: boolean }>) {
  return (
    <label className="text-[16px] font-normal leading-[19px] text-[#21293A]">
      {children}
      {required && <span className="ml-0.5 text-[#0A8EC8] h-5 w-5">*</span>}
    </label>
  );
}

function InputShell({
  icon,
  children,
}: Readonly<{ icon: string; children: React.ReactNode }>) {
  return (
    <div className="relative flex h-11 items-center gap-1.5 rounded-[12px] border border-[#E9F8FF] bg-[#F5FBFF] px-2.5">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center">
        <Image
          src={icon}
          alt=""
          width={24}
          height={24}
          unoptimized
          className="h-6 w-6 object-contain"
        />
      </span>
      {children}
    </div>
  );
}

const INPUT_CLASSES =
  "h-full w-full bg-transparent pl-1.5 text-[16px] leading-[22px] text-[#0A4B6E] placeholder:text-[#0A4B6E] placeholder:opacity-60 focus:outline-none";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Custom dropdown — a native <select>'s option list can't be styled, so this
// renders a branded trigger + animated popover. The chosen value is mirrored
// into a hidden input by the parent so it submits with the rest of the form.
function EnquirySelect({
  value,
  onChange,
  options,
  icon,
}: Readonly<{
  value: string;
  onChange: (v: string) => void;
  options: string[];
  icon: string;
}>) {
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
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`relative flex h-11 w-full items-center gap-1.5 rounded-[12px] border bg-[#F5FBFF] px-2.5 text-left transition-all ${
          open
            ? "border-[#0a8ec8] ring-2 ring-[#0a8ec8]/15"
            : "border-[#E9F8FF] hover:border-[#bfe6f5]"
        }`}
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center">
          <Image
            src={icon}
            alt=""
            width={24}
            height={24}
            unoptimized
            className="h-6 w-6 object-contain"
          />
        </span>
        <span
          className={`flex-1 truncate pl-1.5 text-[16px] leading-[22px] ${
            value ? "text-[#0A4B6E]" : "text-[#0A4B6E]/60"
          }`}
        >
          {value || "Select Option"}
        </span>
        <svg
          aria-hidden
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className={`shrink-0 text-[#2C8FC2] transition-transform duration-200 ${
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
      </button>

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
                    className={`flex w-full items-center justify-between gap-2 rounded-[10px] px-3 py-2.5 text-left text-[15px] leading-tight transition-colors ${
                      selected
                        ? "bg-[#E9F8FF] font-semibold text-[#0a4b6e]"
                        : "text-[#0A4B6E] hover:bg-[#F5FBFF]"
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
  );
}

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [enquiry, setEnquiry] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget; // capture before any await (event is reused)
    const fd = new FormData(form);
    const get = (k: string) => ((fd.get(k) as string) ?? "").trim();

    // Template variables. We send both the common EmailJS names ({{name}},
    // {{email}}, {{message}}…) and the raw field names, so the email fills in
    // whichever placeholders the dashboard template uses.
    const params = {
      to_email: "gokulrajkumar02@gmail.com",
      name: get("fullName"),
      email: get("workEmail"),
      phone: get("phoneNumber"),
      company: get("companyName"),
      enquiry_type: get("enquiryType"),
      message: get("additionalDetails"),
      // reply straight to the person who filled the form
      reply_to: get("workEmail"),
      // raw field names, in case the template references these instead
      fullName: get("fullName"),
      workEmail: get("workEmail"),
      phoneNumber: get("phoneNumber"),
      companyName: get("companyName"),
      enquiryType: get("enquiryType"),
      additionalDetails: get("additionalDetails"),
    };

    // Not connected to a provider yet: log and show success without sending.
    if (!EMAILJS_READY) {
      console.log("Contact form submission (EmailJS not configured):", params);
      setStatus("success");
      form.reset();
      setEnquiry("");
      return;
    }

    try {
      setStatus("sending");
      await emailjs.send(EMAILJS_SERVICE_ID!, EMAILJS_TEMPLATE_ID!, params, {
        publicKey: EMAILJS_PUBLIC_KEY!,
      });
      setStatus("success");
      form.reset();
      setEnquiry("");
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex w-full flex-col items-center gap-5 rounded-[36px] bg-white p-5 ${CARD_SHADOW} xl:h-[563px] xl:w-[548px]`}
    >
      <h3 className="text-center text-[20px] font-bold leading-[25px] text-[#0A4B6E] sm:text-[24px] sm:leading-[29px]">
        Send us a message
      </h3>

      <div className="flex w-full flex-col gap-4">
        {PAIRED_FIELDS.map((row) => (
          <div
            key={row[0].name}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {row.map((f) => (
              <div key={f.name} className="flex flex-col gap-1.5">
                <FieldLabel required={f.required}>{f.label}</FieldLabel>
                <InputShell icon={f.icon}>
                  <input
                    type={f.type ?? "text"}
                    name={f.name}
                    required={f.required}
                    placeholder={f.placeholder}
                    maxLength={f.maxLength}
                    pattern={f.pattern}
                    inputMode={f.inputMode}
                    title={f.title}
                    onInput={
                      f.inputMode === "numeric"
                        ? (e) => {
                            const el = e.currentTarget;
                            el.value = el.value
                              .replace(/\D/g, "")
                              .slice(0, f.maxLength);
                          }
                        : undefined
                    }
                    className={INPUT_CLASSES}
                  />
                </InputShell>
              </div>
            ))}
          </div>
        ))}

        <div className="flex flex-col gap-1.5">
          <FieldLabel>Enquiry Type</FieldLabel>
          <EnquirySelect
            value={enquiry}
            onChange={setEnquiry}
            options={ENQUIRY_TYPES}
            icon="/contact/direct/icons/form-select.svg"
          />
          <input type="hidden" name="enquiryType" value={enquiry} />
        </div>

        <div className="flex flex-col gap-1.5">
          <FieldLabel>Additional Details</FieldLabel>
          <textarea
            name="additionalDetails"
            placeholder="Tell us how we can help…"
            className="h-[100px] resize-none rounded-[12px] border border-[#E9F8FF] bg-[#F5FBFF] p-3.5 text-[16px] leading-[22px] text-[#0A4B6E] placeholder:text-[#0A4B6E] placeholder:opacity-60 focus:outline-none"
          />
        </div>
      </div>

      <div className=" flex w-full flex-col items-center gap-2.5">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-11 items-center justify-center gap-2.5 rounded-[31px] px-6 text-[16px] font-bold leading-[16px] text-white shadow-[2px_5px_14px_rgba(79,148,104,0.2),0_6px_42px_rgba(38,124,153,0.1)] disabled:cursor-not-allowed disabled:opacity-70"
          style={{
            background:
              "linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1)), linear-gradient(180deg, #21B1F1 -20.69%, #A6C936 151.72%)",
          }}
        >
          {status === "sending" ? "Sending…" : "Submit Enquiry"}
        </button>
        <p
          className={`text-center text-[14px] font-normal leading-[20px] opacity-90 ${
            status === "error" ? "text-[#D14343]" : "text-[#3890C0]"
          }`}
        >
          {status === "success"
            ? "Thanks — we'll be in touch within 24 hours."
            : status === "error"
              ? "Something went wrong. Please try again."
              : "We'll get back to you within 24 hours on business days."}
        </p>
      </div>
    </form>
  );
}
