import Image from "next/image";

const LIST_ITEMS = [
  "Risks can be identified and prevented early",
  "Compliance becomes manageable and predictable",
  "Teams become more accountable and efficient",
  "Decisions are made with confidence not assumptions",
];

export default function WhyWeBuilt() {
  return (
    <section className="relative z-10 -mt-[46px] rounded-tl-[46px] rounded-tr-[46px] bg-[#F5FBFF] py-[60px] lg:py-[80px]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[60px]">
        {/* Section header */}
        <div className="mb-[30px] lg:mb-[40px]">
          <h2 className="text-[22px] lg:text-[26px] font-bold text-[#0a4b6e] leading-normal mb-[10px]">
            Why we built this
          </h2>
          <p className="text-[16px] lg:text-[20px] text-[#1d6c97] leading-[28px]">
            Because visibility changes everything
          </p>
        </div>

        {/* 2-column layout */}
        <div className="flex flex-col lg:flex-row items-start gap-[30px] lg:gap-[40px]">
          {/* LEFT: numbered list */}
          <div className="w-full lg:max-w-[538px] flex-shrink-0">
            <p className="font-bold text-[15px] lg:text-[18px] text-[#0f172a] leading-[26px] mb-[24px]">
              When organizations can clearly see what is happening across their
              operations.
            </p>

            <div className="relative">
              {/* Vertical timeline line */}
              <div
                className="absolute left-[18px] top-[20px] w-[4px] bg-[#9cdcff] rounded-full"
                style={{ height: "calc(100% - 40px)" }}
              />

              <div className="flex flex-col gap-[20px] lg:gap-[24px]">
                {LIST_ITEMS.map((text, i) => {
                  const num = String(i + 1).padStart(2, "0");
                  const isActive = i === 0;
                  return (
                    <div
                      key={i}
                      className="relative flex items-center gap-[20px] min-h-[47px]"
                    >
                      {/* Active row highlight */}
                      {isActive && (
                        <div
                          className="absolute left-[56px] right-0 inset-y-[-8px] rounded-tl-[14px] rounded-bl-[14px]"
                          style={{
                            background:
                              "linear-gradient(90deg, rgba(126,207,250,0.16) 0%, transparent 100%)",
                          }}
                        />
                      )}
                      {/* Circle badge */}
                      <div
                        className={[
                          "relative z-10 size-[36px] lg:size-[40px] rounded-full flex-shrink-0 flex items-center justify-center border",
                          isActive
                            ? "border-[#0a8ec8]"
                            : "bg-white/40 border-[#0a8ec8]",
                        ].join(" ")}
                        style={
                          isActive
                            ? {
                                background:
                                  "linear-gradient(180deg, #0a8ec8 0%, #054662 100%)",
                              }
                            : {}
                        }
                      >
                        {isActive ? (
                          <span className="text-[12px] lg:text-[14px] font-bold text-white">
                            {num}
                          </span>
                        ) : (
                          <span
                            className="text-[12px] lg:text-[14px] font-bold bg-clip-text text-transparent"
                            style={{
                              backgroundImage:
                                "linear-gradient(180deg, #0a8ec8 0%, #054662 100%)",
                            }}
                          >
                            {num}
                          </span>
                        )}
                      </div>
                      {/* Text — all items bold per Figma (font-['Lato:Bold']) */}
                      <p
                        className={[
                          "relative z-10 flex-1 min-w-0 font-bold text-[14px] lg:text-[18px] leading-[24px]",
                          isActive ? "text-[#0a4b6e]" : "text-[#0f172a]",
                        ].join(" ")}
                      >
                        {text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: photo card */}
          <div className="flex-1 min-w-0 w-full">
            <div className="relative rounded-[20px] lg:rounded-[24px] overflow-hidden">
              {/* Background layers */}
              <div className="absolute inset-0 pointer-events-none">
                <Image
                  src="/about/why-built-photo-bg1.png"
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>
              <div className="absolute inset-0 pointer-events-none">
                <Image
                  src="/about/why-built-photo-bg2.png"
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>
              {/* Glow ellipses */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[40%] aspect-square pointer-events-none opacity-50">
                <Image
                  src="/about/why-built-ellipse-left.png"
                  alt=""
                  fill
                  className="object-contain"
                  sizes="200px"
                />
              </div>
              <div className="absolute right-0 bottom-0 w-[40%] aspect-square pointer-events-none opacity-50">
                <Image
                  src="/about/why-built-ellipse-right.png"
                  alt=""
                  fill
                  className="object-contain"
                  sizes="200px"
                />
              </div>
              {/* Main photo with glass wrapper — Figma: backdrop-blur-[10px], rounded-[30px], p-[4px] */}
              <div className="relative rounded-[30px] border-2 border-white backdrop-blur-[10px] bg-[rgba(255,255,255,0.5)] p-[4px] shadow-[0px_20px_20px_0px_rgba(0,0,0,0.02)]">
                <div className="relative aspect-[451/282] w-full rounded-[28px] overflow-hidden">
                  <Image
                    src="/about/why-built-photo.png"
                    alt="V-Watch operations intelligence"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 600px"
                  />
                </div>
              </div>
            </div>
            {/* Caption */}
            <p className="text-[13px] lg:text-[16px] font-bold text-[#0a4b6e] text-center mt-[12px] max-w-[422px] mx-auto leading-[22px]">
              We built V-Watch Ai to make this level of visibility possible in
              real time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
