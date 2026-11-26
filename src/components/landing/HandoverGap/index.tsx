import Image from "next/image";
import { Eyebrow, Section, T } from "../ui";

const QUESTIONS = [
  {
    icon: "/landing/icons/icon-records.svg",
    title: "Which Records Need to Carry Forward?",
    desc: "Asset details, inspection records, test documentation and contractor information can become fragmented when construction projects transition to facility operations.",
  },
  {
    icon: "/landing/icons/icon-fix.svg",
    title: "Which Defects Still Need Attention?",
    desc: "Outstanding defects and rectification activities require clear visibility to help teams follow up on unresolved issues throughout the Defects Liability Period.",
  },
  {
    icon: "/landing/icons/icon-responsible.svg",
    title: "Who Is Responsible After Handover?",
    desc: "Facility teams may need to identify the contractors involved, trace previous work records and coordinate follow-ups when issues arise during the DLP.",
  },
] as const;

export default function HandoverGap() {
  return (
    <Section
      id="why-handover"
      aria-labelledby="handover-gap-title"
      className="border-y border-[#E2EEEB] bg-[linear-gradient(180deg,#EDF7F4_0%,#F5FAF9_100%)]"
      innerClassName="grid items-center gap-5 lg:grid-cols-2 lg:gap-16 xl:gap-[108px]"
    >
      <div className="flex flex-col gap-[15px]">
        <Eyebrow>The handover gap</Eyebrow>
        <h2 id="handover-gap-title" className={`${T.h2} text-[#19213D]`}>
          Construction Ends.
          <br />
          The Questions Don&apos;t.
        </h2>
        <p className={`${T.body} text-[#4E6174]`}>
          During the Defects Liability Period (DLP), contractors may need to
          return to complete outstanding defect rectification while facility
          teams have already taken over daily site operations.
        </p>
        <p className={`${T.body} text-[#4E6174]`}>
          When construction records are scattered across different teams and
          systems, tracking outstanding defects, contractor responsibilities
          and project information becomes increasingly challenging. V-Watch AI
          helps teams maintain access to relevant project records beyond
          handover.
        </p>
      </div>

      <ul className="flex flex-col">
        {QUESTIONS.map((q, i) => (
          <li
            key={q.title}
            className={`flex items-center gap-2.5 py-[17px] ${
              i > 0 ? "border-t border-[#DCE7EB]" : ""
            }`}
          >
            <Image
              src={q.icon}
              alt=""
              width={60}
              height={60}
              unoptimized
              className="size-[60px] shrink-0"
            />
            <div className="flex flex-col gap-[3px]">
              <h3 className={`${T.h6} text-[#19213D]`}>{q.title}</h3>
              <p className={`${T.points} text-[#4E6174]`}>{q.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
