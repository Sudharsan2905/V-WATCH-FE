// "Different industries. The same core challenges." — layered challenge cards
// connected as a flow, with a cloud-sync callout. (Figma node 270:12946)
type Challenge = { title: string; desc: string; icon: React.ReactNode };

const I = (paths: React.ReactNode) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    {paths}
  </svg>
);

const CHALLENGES: Challenge[] = [
  {
    title: "Blind Visibility",
    desc: "Limited real-time visibility of people and activity.",
    icon: I(
      <>
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" stroke="#0A8EC8" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="2.5" stroke="#0A8EC8" strokeWidth="1.7" />
      </>
    ),
  },
  {
    title: "Tracking Burden",
    desc: "Compliance requirements that are difficult to track.",
    icon: I(
      <>
        <rect x="6" y="4" width="12" height="16" rx="2" stroke="#0A8EC8" strokeWidth="1.7" />
        <path d="M9 9h6M9 13h6M9 17h3" stroke="#0A8EC8" strokeWidth="1.7" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "System Fragmentation",
    desc: "Disconnected systems across teams and functions.",
    icon: I(
      <>
        <path d="M4 8h6v6H4zM14 10h6v6h-6z" stroke="#0A8EC8" strokeWidth="1.7" />
        <path d="M10 11h4" stroke="#0A8EC8" strokeWidth="1.7" strokeDasharray="2 2" />
      </>
    ),
  },
  {
    title: "Critical Delays",
    desc: "Delayed response to incidents and risks.",
    icon: I(
      <>
        <circle cx="12" cy="12" r="8" stroke="#0A8EC8" strokeWidth="1.7" />
        <path d="M12 8v4l3 2" stroke="#0A8EC8" strokeWidth="1.7" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Data Misalignment",
    desc: "Workforce and operational data that don’t align.",
    icon: I(
      <>
        <path d="M4 18V9M9 18V5M14 18v-6M19 18v-9" stroke="#0A8EC8" strokeWidth="1.7" strokeLinecap="round" />
      </>
    ),
  },
];

function ChallengeCard({ title, desc, icon }: Readonly<Challenge>) {
  return (
    <div className="relative z-10 h-[171px] w-[314px] shrink-0">
      {/* title card (behind, peeks below) */}
      <div className="absolute left-[34px] top-[78px] flex h-[93px] w-[280px] flex-col justify-end rounded-[14px] border border-[#0a8ec8] bg-[linear-gradient(180deg,rgba(233,238,255,0.4),rgba(193,236,255,0.4))] px-4 pb-4 pt-10 shadow-[9px_7px_60px_rgba(255,255,255,0.4),6px_10px_23px_rgba(217,226,255,0.85)]">
        <p className="text-[18px] font-bold tracking-[-0.036px] text-[#0f172a]">{title}</p>
      </div>
      {/* description card */}
      <div className="absolute left-0 top-[24px] flex h-[98px] w-[280px] items-end rounded-[16px] border-2 border-white bg-[rgba(255,247,244,0.6)] px-[19px] py-5 shadow-[inset_0_0_24px_rgba(255,107,107,0.14),0_13px_100px_rgba(199,199,199,0.25)]">
        <p className="text-[18px] leading-[22px] text-[#314158]">{desc}</p>
      </div>
      {/* icon */}
      <div className="absolute left-[13px] top-0 flex size-12 items-center justify-center rounded-[14px] border-[1.5px] border-white bg-[rgba(222,239,255,0.6)] backdrop-blur-[2px]">
        {icon}
      </div>
    </div>
  );
}

export default function Challenges() {
  return (
    <section className="relative overflow-hidden bg-white px-6 pb-20 pt-[90px] lg:px-[60px]">
      <div className="relative mx-auto flex w-full max-w-[1410px] flex-col gap-[30px]">
        <header className="flex max-w-[1160px] flex-col gap-2.5 text-[#0A4B6E]">
          <h2 className="max-w-[889px] text-[26px] font-extrabold">
            Different industries. The same core challenges.
          </h2>
          <p className="max-w-[735px] text-[20px] font-normal leading-[28px]">
            No matter the environment, operations face similar problems
          </p>
        </header>

        <div className="flex flex-col gap-[50px]">
          <div className="relative flex flex-wrap gap-[30px]">
            {/* dotted flow connector — shows only in the gaps between cards */}
            <div className="pointer-events-none absolute left-[160px] right-[160px] top-[120px] z-0 hidden border-t-2 border-dashed border-[#9CD8F0]/50 lg:block" />
            {CHALLENGES.slice(0, 3).map((c) => (
              <ChallengeCard key={c.title} {...c} />
            ))}
          </div>
          <div className="relative flex flex-wrap items-center gap-[30px]">
            <div className="pointer-events-none absolute left-[160px] right-[420px] top-[120px] z-0 hidden border-t-2 border-dashed border-[#9CD8F0]/50 lg:block" />
            {CHALLENGES.slice(3).map((c) => (
              <ChallengeCard key={c.title} {...c} />
            ))}

            {/* cloud-sync callout */}
            <div className="relative flex h-[111px] flex-1 items-center gap-3.5 rounded-[24px] pl-2 pr-4">
              <div className="relative flex h-[95px] w-[55px] shrink-0 items-center justify-center">
                {/* simplified toggle */}
                <span className="flex h-[28px] w-[50px] items-center rounded-full bg-[linear-gradient(108deg,#E86C5C,#97351D)] px-[3px]">
                  <span className="ml-auto size-[22px] rounded-full bg-white" />
                </span>
              </div>
              <p className="flex-1 text-[16px] font-bold leading-6 text-[#314158]">
                When systems are fragmented, control is limited and risks increase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
