import Image from "next/image";

// ── Left column: the four "fragmented" cards ───────────────────────────────
type Frag = { text: string; iconSrc: string; iconW: number; iconH: number };

const FRAG_CARDS: Frag[] = [
  { text: "Workforce is tracked in one place",        iconSrc: "/frag-icons/workforce.svg",   iconW: 21, iconH: 23 },
  { text: "Tasks and workflows in another",           iconSrc: "/frag-icons/workflows.svg",   iconW: 19, iconH: 24 },
  { text: "Assets and vehicles somewhere else",       iconSrc: "/frag-icons/assets.svg",      iconW: 23, iconH: 23 },
  { text: "Compliance and safety managed separately", iconSrc: "/frag-icons/compliance.svg",  iconW: 21, iconH: 19 },
];

function FragCard({ text, iconSrc, iconW, iconH }: Readonly<Frag>) {
  return (
    <div className="relative rounded-[14px] bg-[linear-gradient(180deg,#E9EEFF_0%,#C1ECFF_100%)] px-4 pb-4 pt-[34px] shadow-[inset_0_0_0_1px_#0A8EC8,0_4px_20px_rgba(92,183,232,0.10)]">
      <div className="absolute -top-[17px] left-5 flex h-10 w-10 items-center justify-center rounded-[10px] bg-white shadow-[2.5px_5.8px_25px_-2.5px_rgba(56,144,192,0.40)]">
        <Image src={iconSrc} alt="" width={iconW} height={iconH} />
      </div>
      <p className="text-[18px] font-normal leading-6 text-[#202020]">{text}</p>
    </div>
  );
}

// ── Right column: the "Results" card ───────────────────────────────────────
const RESULTS: { text: string; icon: string }[] = [
  { text: "Limited visibility", icon: "/hero/icons/res-visibility.svg" },
  { text: "Slower decision-making", icon: "/hero/icons/res-decisions.svg" },
  { text: "Gaps in security and compliance", icon: "/hero/icons/res-security.svg" },
  { text: "Lost productivity across the board", icon: "/hero/icons/res-productivity.svg" },
];

function ResultsCard() {
  return (
    <div className="relative w-[380px] shrink-0 self-stretch overflow-hidden rounded-[32px] bg-[#FBFEFF] p-5 shadow-[0_13px_100px_rgba(219,219,219,0.25),6px_10px_23px_rgba(219,228,255,0.85),9px_7px_60px_rgba(255,255,255,0.40)]">
      <h3 className="text-[20px] font-bold text-[#0A4B6E]">The Results?</h3>
      <ul className="mt-[14px] flex flex-col gap-4">
        {RESULTS.map((r) => (
          <li key={r.text} className="flex items-center gap-[14px]">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[11px] bg-[#F4FBFF]/70 shadow-[0_10px_48px_rgba(199,199,199,0.25),5px_8px_19px_rgba(217,226,255,0.85)] outline outline-[1.6px] -outline-offset-[1.6px] outline-white/60">
              <Image src={r.icon} alt="" width={24} height={24} className="h-6 w-6" />
            </span>
            <span className="text-[18px] font-normal text-[#0F172A]">{r.text}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-end justify-between">
        <p className="text-[20px] font-normal leading-7 text-[#FE5E33]">
          You&apos;re not lacking data
          <br />
          You&apos;re lacking connection.
        </p>
        <Image src="/home/results-illustration.svg" alt="" width={76.45} height={108.44} className="shrink-0" style={{ width: "76.45px", height: "108.44px" }} />
      </div>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────
export default function FragmentedOps() {
  return (
    <section className="relative z-10 -mt-6 rounded-t-[40px] bg-white px-6 pb-20 pt-[56px] lg:px-[60px]">
      <div className="mx-auto w-full max-w-[1410px]">
        <div className="max-w-[642px]">
          <h2 className="text-[26px] font-bold text-[#0A4B6E]">Operations today are fragmented and it shows</h2>
          <p className="mt-2.5 text-[20px] font-normal leading-[26px] text-[#0A4B6E]">
            Most organizations manage their operations across multiple systems, teams, and manual processes.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-stretch gap-8 lg:flex-row lg:items-center lg:gap-[30px]">
          {/* Left: fragmented cards */}
          <div className="flex w-full flex-col gap-9 lg:w-[380px] lg:shrink-0">
            {FRAG_CARDS.map((c) => (
              <FragCard key={c.text} {...c} />
            ))}
          </div>

          {/* Middle: connected-core render */}
          <div className="relative h-[300px] w-full overflow-hidden rounded-[20px] lg:h-[338px] lg:flex-1">
            <Image src="/hero/connected-core.png" alt="Connected operations core" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
          </div>

          {/* Right: results */}
          <ResultsCard />
        </div>
      </div>
    </section>
  );
}
