import Image from "next/image";
import { Eyebrow, Section, T } from "../ui";

const QUESTIONS = [
  {
    icon: "/landing/icons/icon-records.svg",
    title: "Which records carry forward?",
    desc: "Asset details, test records and contractor information may sit in different places when the site changes hands.",
  },
  {
    icon: "/landing/icons/icon-fix.svg",
    title: "What still needs to be fixed?",
    desc: "Open defects and rectification work can be harder to follow when project records are fragmented.",
  },
  {
    icon: "/landing/icons/icon-responsible.svg",
    title: "Who is responsible after handover?",
    desc: "The operating team may need to trace who did the work and who should follow up during DLP.",
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
          Construction ends.
          <br />
          The questions do not.
        </h2>
        <p className={`${T.body} text-[#4E6174]`}>
          During the Defects Liability Period, contractors may return to
          complete rectification work while the facility team is already
          operating the site.
        </p>
        <p className={`${T.body} text-[#4E6174]`}>
          When project information is spread across different teams and
          systems, the people taking over can have a harder time finding what
          they need. V-Watch Ai helps teams carry relevant records forward.
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
