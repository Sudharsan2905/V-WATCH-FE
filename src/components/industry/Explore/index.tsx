import Image from "next/image";

// "Explore how V-Watch Ai works across different environments" (Figma 270:13092)
type Card = { title: string; img: string; desc?: string; link?: string };

const CARDS: Card[] = [
  {
    title: "Construction",
    img: "/industry/exp-construction.png",
    desc: "Manage large workforces, multiple contractors, and strict compliance requirements with full visibility across your site.",
    link: "View Construction Solutions",
  },
  { title: "Industrial & Energy", img: "/industry/exp-industrial.png" },
  { title: "Commercial & Facilities", img: "/industry/exp-commercial.png" },
];

function Arrow() {
  return (
    <span className="flex size-6 items-center justify-center rounded-[12.5px] bg-white/10">
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path
          d="M3.6 8.4 8.4 3.6M4.5 3.6h3.9v3.9"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function Explore() {
  return (
    <section className="relative z-[2] px-6 pb-20 pt-[30px] lg:px-[60px]">
      <div className="mx-auto flex w-full max-w-[1410px] flex-col gap-10">
        <header className="flex max-w-[1160px] flex-col gap-2.5">
          <h2 className="max-w-[889px] text-[26px] font-extrabold text-[#0A4B6E]">
            Explore how V-Watch Ai works across different environments
          </h2>
          <p className="max-w-[804px] text-[20px] font-normal leading-[28px] text-[#0A4B6E]">
            While every industry is unique, the need for visibility, safety, and
            control remains the same. These are some of the environments where
            V-Watch Ai delivers the most impact.
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-[30px]">
          {CARDS.map((c) => (
            <div
              key={c.title}
              className="relative h-[500px] w-full max-w-[367px] flex-1 overflow-hidden rounded-[20px] border-[1.245px] border-[#0a8ec8] p-1 shadow-[0_16px_54px_rgba(184,230,255,0.18)]"
            >
              <div className="relative h-full w-full overflow-hidden rounded-[16px]">
                <Image
                  src={c.img}
                  alt={c.title}
                  fill
                  className="object-cover"
                  sizes="367px"
                />
                <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-6 mx-auto flex w-[323px] flex-col gap-2.5">
                  <p className="text-[18px] font-bold leading-6 text-white">
                    {c.title}
                  </p>
                  {c.desc && (
                    <p className="text-[16px] font-normal leading-5 text-white">
                      {c.desc}
                    </p>
                  )}
                  {c.link && (
                    <div className="flex items-center gap-2.5">
                      <p className="text-[16px] font-bold text-white">
                        {c.link}
                      </p>
                      <Arrow />
                    </div>
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
