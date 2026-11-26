"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { ButtonLink, CheckList, Eyebrow, Section, T } from "../ui";

const TEAMS = [
  {
    tab: "Owners",
    icon: "/landing/icons/icon-owners.svg",
    title: "Owners and Developers",
    desc: "Keep essential construction and asset records accessible to the teams responsible for the property after handover.",
    points: [
      "Review outstanding items through handover and DLP",
      "Refer back to relevant asset and contractor records",
      "Support follow-up with the teams responsible for rectification",
    ],
  },
  {
    tab: "Project teams",
    icon: "/landing/icons/icon-project-teams.svg",
    title: "Project and Delivery Teams",
    desc: "Prepare and organize essential construction project records before responsibility transitions to the facility operations team.",
    points: [
      "Capture relevant workforce, access and contractor information in Atlas",
      "Plan which project information needs to carry forward",
      "Support close-out and handover conversations with the owner",
    ],
  },
  {
    tab: "Facility teams",
    icon: "/landing/icons/icon-facility-teams.svg",
    title: "Facility and Operations Teams",
    desc: "Access relevant construction project information to support facility management, maintenance activities and ongoing operations after handover.",
    points: [
      "Access useful construction information after handover",
      "Manage assets, maintenance and reporting with Aegis",
      "Explore work order and preventive maintenance options for your package",
    ],
  },
] as const;

export default function WhoItHelps() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // WAI-ARIA tabs keyboard pattern: arrows move (and activate) the tab,
  // Home/End jump to the ends.
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const last = TEAMS.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <Section
      aria-labelledby="who-it-helps-title"
      className="bg-[#11293A] bg-[radial-gradient(124.5%_87.7%_at_12%_38%,#1D424A_0%,rgba(29,66,74,0)_68%)]"
      innerClassName="flex flex-col gap-[30px] lg:flex-row lg:items-center lg:justify-between lg:gap-10"
    >
      <div className="flex flex-col gap-[15px] lg:max-w-[487px]">
        <Eyebrow>Who it helps</Eyebrow>
        <h2 id="who-it-helps-title" className={`${T.h2} text-white`}>
          Built for the Teams Managing Construction and Facility Operations
        </h2>
        <p className={`${T.body} text-[#C7DBE5]`}>
          Different teams need access to the right project information as
          construction projects transition into facility operations. V-Watch AI
          helps asset owners, project teams and facility managers maintain
          access to relevant records, coordinate responsibilities and support a
          more connected handover and Defects Liability Period (DLP).
        </p>
        <ButtonLink href="#book-demo" tone="light" className="self-start">
          Book a Demonstration
        </ButtonLink>
      </div>

      <div className="w-full overflow-hidden rounded-[5px] border-[0.5px] border-[#688596] bg-[#F9FCFD] lg:max-w-[619px]">
        <div
          role="tablist"
          aria-label="Explore by project role"
          onKeyDown={onKeyDown}
          className="flex gap-[5px] border-b border-[#DBE7EB] bg-[#ECF3F4] p-[9px]"
        >
          {TEAMS.map((t, i) => {
            const selected = i === active;
            return (
              <button
                key={t.tab}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={`team-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`team-panel-${i}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={`flex-1 whitespace-nowrap rounded-[5px] border-[0.5px] px-1 py-[15px] text-center text-[13px] font-[680] leading-[1.2] transition-colors sm:px-5 lg:px-2 xl:px-5 ${
                  selected
                    ? "border-[#0A8EC8] bg-[#C0E7FB] text-[#0A4B6E]"
                    : "border-transparent text-[#4E6174] hover:bg-white/70 hover:text-[#19213D]"
                }`}
              >
                {t.tab}
              </button>
            );
          })}
        </div>

        {/* All three panels stay in the page (inactive ones are `hidden`), so
            each team's heading and copy is in the HTML, not only the active
            tab's. */}
        {TEAMS.map((team, i) => (
          <div
            key={team.tab}
            id={`team-panel-${i}`}
            role="tabpanel"
            aria-labelledby={`team-tab-${i}`}
            hidden={i !== active}
            className={`${
              i === active ? "flex" : "hidden"
            } flex-col gap-1.5 px-5 pb-[25px] pt-5 lg:px-[25px] lg:pb-7 lg:pt-[23px]`}
          >
            <Image
              src={team.icon}
              alt=""
              width={70}
              height={70}
              unoptimized
              className="size-[60px] lg:size-[70px]"
            />
            <h3 className={`${T.h5} text-[#19213D]`}>{team.title}</h3>
            <p className={`${T.body} text-[#4E6174]`}>{team.desc}</p>
            <CheckList
              items={team.points}
              checkColor="#A6C936"
              itemClassName={`${T.points} text-[#263E4D]`}
              gapClassName="gap-2"
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
