"use client";

import { useState } from "react";
import { Eyebrow, Section, T } from "../ui";

const FAQS = [
  {
    q: "Why Does Project Information Matter During the Defects Liability Period?",
    a: "During the Defects Liability Period (DLP), project and facility teams may need to verify which assets were installed, what was tested, who carried out the work and which issues remain unresolved. Keeping construction records accessible helps teams follow up on outstanding defects and plan ongoing maintenance.",
  },
  {
    q: "What Does Atlas Do in Construction Site Management?",
    a: "Atlas supports construction delivery and workforce management. Depending on the project configuration, teams can use it for worker enrolment, site access and screening, vendor management, and training or compliance records.",
  },
  {
    q: "What Is Digital Handover in Construction?",
    a: "Digital Handover supports the transfer of relevant construction information from Atlas into Aegis. Project teams can identify which records are required and determine how they will be carried forward based on the agreed project setup.",
  },
  {
    q: "How Does Aegis Support DLP and Facility Operations?",
    a: "Aegis supports the Defects Liability Period and day-to-day facility operations. Depending on the selected package, its capabilities include asset records, maintenance, preventive maintenance and reporting. Work order availability is subject to the Aegis package.",
  },
  {
    q: "Can Atlas and Aegis Be Used Separately?",
    a: "Yes. Atlas and Aegis are separate modules within the V-Watch AI platform. They can be used independently or together, depending on project requirements. On-premises, cloud and hybrid deployment options are available subject to the agreed technical configuration.",
  },
] as const;

// Plus that rotates 45° into the Figma "×" when the item is open.
function ToggleIcon({ open }: Readonly<{ open: boolean }>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={`mt-[3px] shrink-0 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
    >
      <path
        d="M4.167 10h11.666M10 4.167v11.666"
        stroke="#266C64"
        strokeWidth="1.667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FAQ() {
  // One item open at a time; the first starts open, as in the design.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section
      id="faqs"
      aria-labelledby="faq-title"
      className="border-t border-[#E7EEF3] bg-[#F5F8FA]"
      innerClassName="grid gap-[30px] lg:grid-cols-2 lg:gap-0"
    >
      <div className="flex flex-col gap-[15px]">
        <Eyebrow>Good to know</Eyebrow>
        <h2 id="faq-title" className={`${T.h2} text-[#122338]`}>
          Frequently Asked Questions About V-Watch AI
        </h2>
        <p className={`${T.body} text-[#4E6174]`}>
          Find answers to common questions about construction management,
          digital handover, Defects Liability Period (DLP) management and
          facility operations.
        </p>
      </div>

      <div className="self-start border-t border-[#D9E5EA]">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="border-b border-[#D9E5EA]">
              <h3>
                <button
                  type="button"
                  id={`faq-q-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  // Open: 10px between question and answer (Figma) via the
                  // button's bottom padding — not a negative margin on the
                  // answer, which the clipping wrapper would cut off.
                  className={`flex w-full items-start justify-between gap-4 pt-[15px] text-left text-[13px] font-bold leading-[1.6] text-[#122338] transition-[padding,color] duration-300 hover:text-[#0A8EC8] lg:text-[16px] ${isOpen ? "pb-2.5" : "pb-[15px]"}`}
                >
                  {item.q}
                  <ToggleIcon open={isOpen} />
                </button>
              </h3>
              <div
                id={`faq-a-${i}`}
                role="region"
                aria-labelledby={`faq-q-${i}`}
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden" inert={!isOpen}>
                  <p className={`pb-[15px] pr-[25px] ${T.points} text-[#4E6174]`}>
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
