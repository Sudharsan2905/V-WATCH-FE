"use client";

import Image from "next/image";
import { useState } from "react";

type Field = {
  name: string;
  label: string;
  required?: boolean;
  type?: "text" | "email" | "tel";
  placeholder: string;
  icon: string;
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
      placeholder: "Phone Number",
      icon: "/contact/direct/icons/form-phone.svg",
    },
  ],
];

const COMPANY_TYPES = ["Construction", "Industrial", "Commercial", "Other"];

const CARD_SHADOW =
  "shadow-[0px_-1px_34px_rgba(29,108,151,0.01),-3px_20px_170px_rgba(255,255,255,0.5),0px_15px_14px_rgba(10,142,200,0.1)]";

function FieldLabel({
  children,
  required,
}: Readonly<{ children: React.ReactNode; required?: boolean }>) {
  return (
    <label className="text-[16px] font-normal leading-[19px] text-[#21293A]">
      {children}
      {required && <span className="ml-0.5 text-[#FF3838]">*</span>}
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

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    console.log("Contact form submission:", data);
    setSubmitted(true);
    e.currentTarget.reset();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex w-full flex-col items-center gap-5 rounded-[36px] bg-white p-5 ${CARD_SHADOW} lg:h-[563px] lg:w-[548px]`}
    >
      <h3 className="text-center text-[24px] font-bold leading-[29px] text-[#0A4B6E]">
        Send us a message
      </h3>

      <div className="flex w-full flex-col gap-4">
        {PAIRED_FIELDS.map((row) => (
          <div key={row[0].name} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {row.map((f) => (
              <div key={f.name} className="flex flex-col gap-1.5">
                <FieldLabel required={f.required}>{f.label}</FieldLabel>
                <InputShell icon={f.icon}>
                  <input
                    type={f.type ?? "text"}
                    name={f.name}
                    required={f.required}
                    placeholder={f.placeholder}
                    className={INPUT_CLASSES}
                  />
                </InputShell>
              </div>
            ))}
          </div>
        ))}

        <div className="flex flex-col gap-1.5">
          <FieldLabel>Company Type</FieldLabel>
          <InputShell icon="/contact/direct/icons/form-select.svg">
            <select
              name="companyType"
              defaultValue=""
              className={`${INPUT_CLASSES} appearance-none pr-7`}
            >
              <option value="" disabled>
                Select Option
              </option>
              {COMPANY_TYPES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <svg
              aria-hidden
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="pointer-events-none absolute right-2.5 text-[#2C8FC2]"
            >
              <path
                d="M3.5 5.25 7 8.75l3.5-3.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </InputShell>
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

      <div className="flex w-full flex-col items-center gap-2.5">
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2.5 rounded-[31px] px-6 text-[16px] font-bold leading-[16px] text-white shadow-[2px_5px_14px_rgba(79,148,104,0.2),0_6px_42px_rgba(38,124,153,0.1)]"
          style={{
            background:
              "linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1)), linear-gradient(180deg, #21B1F1 -20.69%, #A6C936 151.72%)",
          }}
        >
          Submit Enquiry
        </button>
        <p className="text-center text-[14px] font-normal leading-[20px] text-[#3890C0] opacity-90">
          {submitted
            ? "Thanks — we'll be in touch within 24 hours."
            : "We'll get back to you within 24 hours on business days."}
        </p>
      </div>
    </form>
  );
}
