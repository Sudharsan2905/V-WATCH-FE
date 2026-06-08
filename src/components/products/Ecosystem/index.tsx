import Image from "next/image";

// "Built on a Strong Integration & Delivery Ecosystem" (Figma node 270:5625).
const COMPANIES: { name: string; country: string; logo: string }[] = [
  { name: "SS Surveillance and Communication Sdn Bhd", country: "Malaysia", logo: "/products/eco/si-1.png" },
  { name: "SS Tech Pte Ltd", country: "Singapore", logo: "/products/eco/si-2.png" },
  { name: "QuSol Innovations India Pvt Ltd", country: "India", logo: "/products/eco/si-3.png" },
];

const ROW_1 = ["p-1", "p-2", "p-3", "p-4", "p-5", "p-6"];
const ROW_2 = ["p-7", "p-8", "p-9", "p-10", "p-11", "p-12"];

function IconBox({ src }: Readonly<{ src: string }>) {
  return (
    <span className="flex size-[54px] shrink-0 items-center justify-center rounded-[14px] border-2 border-white bg-[rgba(244,251,255,0.2)] shadow-[9px_7px_60px_rgba(255,255,255,0.4),6px_10px_23px_rgba(217,226,255,0.85),0_13px_100px_rgba(199,199,199,0.25)]">
      <Image src={src} alt="" width={36} height={36} className="size-9" />
    </span>
  );
}

function LogoRow({ items }: Readonly<{ items: string[] }>) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-[18px] gap-y-4">
      {items.map((p) => (
        <div key={p} className="relative h-[80px] w-[174px] shrink-0">
          <Image src={`/products/eco/${p}.png`} alt="Technology partner" fill className="object-contain" sizes="174px" />
        </div>
      ))}
    </div>
  );
}

export default function Ecosystem() {
  return (
    <section className="relative overflow-hidden bg-white px-6 pb-20 lg:px-[60px]">
      <div className="relative mx-auto flex w-full max-w-[1410px] flex-col gap-[30px]">
        {/* Heading */}
        <header className="flex max-w-[1160px] flex-col gap-2.5 text-[#0A4B6E]">
          <h2 className="max-w-[642px] text-[26px] font-bold">
            Built on a Strong Integration &amp; Delivery Ecosystem
          </h2>
          <p className="max-w-[962px] text-[20px] font-normal leading-[26px]">
            V-Watch Ai is designed to work seamlessly within your existing infrastructure and is
            delivered through a trusted network of system integrators and technology partners.
          </p>
        </header>

        {/* System integrators + world map */}
        <div className="flex flex-col items-start gap-[30px] lg:flex-row">
          <div className="flex w-full flex-col gap-[30px] lg:w-[482px]">
            <div className="flex items-center gap-3.5">
              <IconBox src="/products/eco/icon-integrators.svg" />
              <p className="flex-1 text-[20px] font-bold leading-[26px] text-[#0A4B6E]">
                System Integrators
                <br />
                On-ground delivery and implementation
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {COMPANIES.map((c) => (
                <div
                  key={c.name}
                  className="relative w-full overflow-hidden rounded-[16px] border-[1.25px] border-white/80 bg-white/[0.32] py-4 pl-[78px] pr-5 shadow-[inset_0_4px_84px_white,inset_20px_0_24px_rgba(126,207,250,0.1),inset_-20px_0_24px_rgba(126,207,250,0.1)]"
                >
                  <span className="absolute left-[18px] top-4 flex size-12 items-center justify-center overflow-hidden rounded-full bg-white">
                    <Image src={c.logo} alt={c.name} width={48} height={48} className="size-full object-cover" />
                  </span>
                  <p className="text-[18px] font-medium leading-[1.1] text-[#1d293d]">{c.name}</p>
                  <p className="mt-1.5 text-[16px] font-normal leading-[22px] text-[#314158]">{c.country}</p>
                </div>
              ))}
            </div>
          </div>

          {/* World map with callout */}
          <div className="relative flex flex-1 items-center justify-center self-stretch">
            <div className="relative aspect-[600/389] w-full max-w-[600px]">
              <Image src="/products/eco/worldmap.png" alt="Global delivery map" fill className="object-contain" sizes="600px" />
            </div>
            <div className="absolute bottom-2 left-2 flex h-[60px] w-full max-w-[633px] items-center gap-3.5 rounded-l-[40px] rounded-r-[16px] border border-white/0 bg-[linear-gradient(180deg,rgba(184,230,255,0.8),rgba(193,236,255,0.8))] py-px pl-px pr-[15px] shadow-[inset_0_-6px_23px_rgba(212,240,255,0.24)] backdrop-blur-[2px]">
              <span className="flex size-[58px] shrink-0 items-center justify-center rounded-full border-[1.25px] border-white bg-[linear-gradient(180deg,rgba(184,230,255,0.8),rgba(193,236,255,0.8))]">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="5" y="10" width="14" height="10" rx="2.5" stroke="#0A4B6E" strokeWidth="1.8" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="#0A4B6E" strokeWidth="1.8" />
                  <circle cx="12" cy="15" r="1.6" fill="#0A4B6E" />
                </svg>
              </span>
              <p className="flex-1 text-[18px] font-medium leading-6 text-[#1d293d]">
                Ensuring reliable implementation across regions and environments.
              </p>
            </div>
          </div>
        </div>

        {/* Technology partners */}
        <div className="flex flex-col gap-[30px]">
          <div className="flex flex-col items-center gap-3.5">
            <div className="flex w-full items-center gap-3.5">
              <IconBox src="/products/eco/icon-partners.svg" />
              <p className="flex-1 text-[20px] font-bold leading-[26px] text-[#0A4B6E]">
                Technology Partners
                <br />
                Integrated with leading systems
              </p>
            </div>
            <div className="w-full pl-[70px]">
              <p className="text-[20px] font-normal leading-[26px] text-[#0A4B6E]">
                V-Watch Ai integrates with industry-leading technologies to extend functionality and
                work within your existing ecosystem.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2.5">
            <LogoRow items={ROW_1} />
            <LogoRow items={ROW_2} />
            <p className="text-[20px] font-bold leading-[26px] text-[#1d6c97]">
              Designed to integrate not replace your existing systems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
