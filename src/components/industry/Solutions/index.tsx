import Image from "next/image";

// "Start with your challenge" — 4 solution cards. (Figma node 270:13533)
type Card = { title: string; desc: string; img: string; link?: boolean };

const CARDS: Card[] = [
  {
    title: "Workforce Operations",
    desc: "Manage payroll, leave, and workforce activity centrally.",
    img: "/industry/sol-1.png",
    link: true,
  },
  {
    title: "Emergency Muster & Headcount",
    desc: "Track safety, missing, and onsite personnel during emergencies.",
    img: "/industry/sol-2.png",
  },
  {
    title: "Compliance tracking",
    desc: "Ensure every third-party worker meets safety requirements.",
    img: "/industry/sol-3.png",
  },
  {
    title: "Facial Recognition",
    desc: "Deploy touchless entry points across high-traffic zones.",
    img: "/industry/sol-4.png",
  },
];

export default function Solutions() {
  return (
    <section className="bg-white px-6 py-20 lg:px-[60px]">
      <div className="mx-auto flex w-full max-w-[1410px] flex-col gap-[30px]">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex max-w-[845px] flex-col gap-2.5 text-[#0A4B6E]">
            <h2 className="text-[26px] font-extrabold">Start with your challenge</h2>
            <p className="text-[20px] font-medium leading-[28px]">
              Every environment faces similar operational challenges explore solutions based on your
              specific needs.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex h-11 shrink-0 items-center gap-2.5 rounded-full border-[1.24px] border-white bg-[linear-gradient(180deg,#21B1F1,#A6C936)] py-1 pl-4 pr-5 shadow-[2px_5px_14px_rgba(79,148,104,0.6),0_6px_42px_rgba(38,124,153,0.4)]"
          >
            <span className="flex size-[25px] items-center justify-center rounded-[12.5px] bg-white">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M3.6 8.4 8.4 3.6M4.5 3.6h3.9v3.9" stroke="#52BAAC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-[16px] font-semibold text-white">View all Use Cases</span>
          </a>
        </div>

        <div className="flex flex-wrap gap-5">
          {CARDS.map((c) => (
            <div
              key={c.title}
              className="relative h-[302px] min-w-[240px] flex-1 overflow-hidden rounded-[30px] border-2 border-white bg-white/50 p-5 shadow-[0_20px_20px_rgba(0,0,0,0.02)] backdrop-blur-[10px]"
            >
              <div className="relative h-full w-full overflow-hidden rounded-[20px]">
                <Image src={c.img} alt={c.title} fill className="object-cover" sizes="256px" />
                <div className="absolute inset-x-0 bottom-0 h-[150px] bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-x-4 bottom-4 flex flex-col gap-2.5">
                  <p className="text-[18px] font-bold leading-6 text-white">{c.title}</p>
                  <p className="text-[16px] font-medium leading-5 text-[#EFF9FF]">{c.desc}</p>
                  {c.link && (
                    <span className="flex items-center gap-2.5 text-[16px] font-medium text-white">
                      Learn More
                      <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden>
                        <path d="M3.6 8.4 8.4 3.6M4.5 3.6h3.9v3.9" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
