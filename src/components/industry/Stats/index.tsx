// "Built for high-scale, high-complexity environments" — dark stats band.
// (Figma node 270:13581)
type Stat = { value: string; label: string; icon: React.ReactNode };

const STATS: Stat[] = [
  {
    value: "500K+",
    label: "Users & Tasks Managed",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="9" cy="8" r="3" stroke="#9CDCFF" strokeWidth="1.7" />
        <path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#9CDCFF" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="17" cy="9" r="2.2" stroke="#9CDCFF" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    value: "1M+",
    label: "Real-Time Data Events Processed",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M3 13h4l2-6 3 12 2-7 2 4h5" stroke="#9CDCFF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: "99.99%",
    label: "Reliable System Performance",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 3l7 3v5c0 4.2-2.9 7.4-7 8.5C7.9 18.4 5 15.2 5 11V6l7-3Z" stroke="#9CDCFF" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M9 11.5l2 2 4-4" stroke="#9CDCFF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Stats() {
  return (
    <section className="bg-white px-6 lg:px-[60px]">
      <div className="mx-auto w-full max-w-[1160px]">
        <div className="relative overflow-hidden rounded-[40px] bg-[radial-gradient(120%_140%_at_50%_-10%,#16365c_0%,#0c1c30_55%,#081320_100%)] px-6 py-[52px] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_0_0_1px_rgba(126,207,250,0.15)]">
          <div className="mx-auto flex max-w-[991px] flex-col items-center gap-2.5 text-center">
            <h2 className="text-[26px] font-bold text-white">
              Built for high-scale, high-complexity environments
            </h2>
            <p className="max-w-[845px] text-[20px] font-normal leading-7 text-[#D4F0FF]">
              V-Watch Ai manages large volumes of users, tasks, and real-time data across complex
              environments ensuring reliability when it matters most.
            </p>
          </div>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-6 sm:flex-row sm:items-center sm:gap-0">
            {STATS.map((s, i) => (
              <div key={s.label} className="flex flex-1 items-center">
                <div className="flex flex-1 flex-col items-center gap-2 text-center">
                  <span className="flex size-12 items-center justify-center rounded-full border border-white/15 bg-white/5">
                    {s.icon}
                  </span>
                  <p className="text-[42px] font-extrabold leading-none text-white">{s.value}</p>
                  <p className="text-[16px] font-normal text-[#D4F0FF]">{s.label}</p>
                </div>
                {i < STATS.length - 1 && (
                  <span className="hidden h-[120px] w-px bg-white/15 sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
