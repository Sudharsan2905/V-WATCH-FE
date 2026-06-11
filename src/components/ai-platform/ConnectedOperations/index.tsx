"use client";

import Image from "next/image";
import { useState } from "react";

type BulletItem = string;
type Module = {
  key: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  bullets: BulletItem[];
  image: string;
};

// ── Icons ─────────────────────────────────────────────────────────────────────

function PeopleIcon() {
  return (
    <svg width="54" height="33" viewBox="0 0 54 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_386_1075)">
        <path d="M37.3868 17.4424H35.0682C35.3045 18.0895 35.4336 18.7878 35.4336 19.5156V28.2787C35.4336 28.5822 35.3808 28.8734 35.2847 29.1443H39.1179C40.5498 29.1443 41.7147 27.9794 41.7147 26.5475V21.7704C41.7148 19.384 39.7732 17.4424 37.3868 17.4424ZM18.0146 19.5157C18.0146 18.7878 18.1437 18.0896 18.38 17.4425H16.0614C13.6749 17.4425 11.7334 19.384 11.7334 21.7705V26.5477C11.7334 27.9795 12.8983 29.1444 14.3302 29.1444H18.1635C18.0648 28.8665 18.0144 28.5737 18.0146 28.2788V19.5157ZM29.3745 15.1877H24.0737C21.6873 15.1877 19.7457 17.1292 19.7457 19.5157V28.2788C19.7457 28.7568 20.1333 29.1444 20.6113 29.1444H32.8368C33.3149 29.1444 33.7024 28.7568 33.7024 28.2788V19.5157C33.7024 17.1292 31.7609 15.1877 29.3745 15.1877ZM26.7241 3.71191C23.8541 3.71191 21.5192 6.04683 21.5192 8.9169C21.5192 10.8636 22.5936 12.5639 24.1804 13.4565C24.9331 13.8799 25.8008 14.1218 26.7241 14.1218C27.6474 14.1218 28.5151 13.8799 29.2678 13.4565C30.8546 12.5639 31.929 10.8636 31.929 8.9169C31.929 6.04689 29.5941 3.71191 26.7241 3.71191ZM17.5843 8.56333C15.4379 8.56333 13.6917 10.3095 13.6917 12.4559C13.6917 14.6024 15.4379 16.3485 17.5843 16.3485C18.1118 16.349 18.6338 16.2416 19.1182 16.033C19.9325 15.6824 20.604 15.0619 21.0194 14.2845C21.3204 13.722 21.4776 13.0939 21.4769 12.4559C21.4769 10.3096 19.7308 8.56333 17.5843 8.56333ZM35.8638 8.56333C33.7174 8.56333 31.9712 10.3095 31.9712 12.4559C31.9706 13.0939 32.1278 13.722 32.4287 14.2845C32.8442 15.0619 33.5156 15.6825 34.3299 16.033C34.8144 16.2416 35.3364 16.349 35.8638 16.3485C38.0103 16.3485 39.7564 14.6024 39.7564 12.4559C39.7564 10.3095 38.0103 8.56333 35.8638 8.56333Z" fill="url(#paint0_linear_386_1075)" />
      </g>
      <defs>
        <linearGradient id="paint0_linear_386_1075" x1="26.7241" y1="3.71191" x2="26.7241" y2="29.1444" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0A4B6E" />
          <stop offset="1" stopColor="#1391D4" />
        </linearGradient>
        <clipPath id="clip0_386_1075">
          <rect width="29.9814" height="30" fill="white" transform="translate(11.7334 1.42822)" />
        </clipPath>
      </defs>
    </svg>
  );
}

function OpsIcon() {
  return (
    <svg width="54" height="33" viewBox="0 0 54 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M41.5711 14.2833C41.5466 14.1123 41.4722 13.9522 41.3572 13.8233C41.2423 13.6943 41.0919 13.6021 40.9248 13.5581L39.431 13.165C39.124 11.9656 38.6471 10.8162 38.0149 9.75169L38.7943 8.41516C38.8813 8.26597 38.9224 8.09445 38.9125 7.92203C38.9026 7.74961 38.8421 7.58393 38.7386 7.44567C38.3083 6.87146 37.8376 6.32858 37.3302 5.82116C36.8228 5.31364 36.2799 4.84288 35.7056 4.41245C35.5673 4.3089 35.4016 4.24841 35.2291 4.23853C35.0567 4.22865 34.8851 4.26982 34.7359 4.3569L33.3996 5.13643C32.3352 4.50412 31.1858 4.02722 29.9864 3.72022L29.5933 2.22649C29.5493 2.05942 29.4571 1.90902 29.3281 1.79406C29.1992 1.6791 29.0392 1.6047 28.8682 1.58014C27.4581 1.37758 25.989 1.37758 24.5789 1.58014C24.4079 1.60468 24.2479 1.67907 24.1189 1.79403C23.99 1.90899 23.8978 2.05941 23.8538 2.22649L23.4607 3.72022C22.2613 4.02719 21.1119 4.50409 20.0475 5.13643L18.7112 4.3569C18.562 4.26988 18.3904 4.22874 18.218 4.23862C18.0455 4.2485 17.8798 4.30896 17.7415 4.41245C16.5916 5.27436 15.5703 6.29567 14.7085 7.44561C14.605 7.58387 14.5445 7.74956 14.5346 7.92198C14.5247 8.09439 14.5658 8.26591 14.6528 8.41511L15.4322 9.75163C14.8 10.8161 14.3231 11.9655 14.0161 13.165L12.5223 13.5581C12.3552 13.602 12.2048 13.6942 12.0899 13.8232C11.9749 13.9522 11.9005 14.1122 11.876 14.2832C11.6728 15.7057 11.6728 17.1499 11.8761 18.5725C11.9006 18.7435 11.975 18.9035 12.0899 19.0325C12.2049 19.1614 12.3553 19.2537 12.5224 19.2976L14.0162 19.6907C14.3232 20.8901 14.8 22.0395 15.4323 23.104L14.6529 24.4406C14.5659 24.5898 14.5248 24.7613 14.5347 24.9337C14.5446 25.1061 14.605 25.2718 14.7085 25.4101C15.1389 25.9843 15.6096 26.5271 16.117 27.0346C16.6244 27.5421 17.1673 28.0129 17.7416 28.4433C17.8798 28.5468 18.0456 28.6073 18.218 28.6172C18.3905 28.6271 18.562 28.5859 18.7112 28.4988L20.0475 27.7193C21.112 28.3516 22.2614 28.8285 23.4608 29.1354L23.8539 30.6292C23.8978 30.7962 23.9901 30.9467 24.119 31.0616C24.248 31.1766 24.4079 31.251 24.5789 31.2755C25.284 31.3769 26.0056 31.4282 26.7236 31.4282C27.4416 31.4282 28.1632 31.3769 28.8683 31.2756C29.0393 31.2511 29.1993 31.1767 29.3282 31.0617C29.4572 30.9468 29.5494 30.7964 29.5933 30.6293L29.9864 29.1356C31.1859 28.8286 32.3352 28.3517 33.3997 27.7194L34.736 28.4989C34.8852 28.586 35.0567 28.6272 35.2292 28.6173C35.4017 28.6074 35.5674 28.5469 35.7057 28.4434C36.8556 27.5815 37.8768 26.5602 38.7387 25.4102C38.8422 25.272 38.9027 25.1063 38.9126 24.9339C38.9225 24.7615 38.8814 24.5899 38.7944 24.4407L38.015 23.1042C38.6472 22.0397 39.1241 20.8903 39.431 19.6909L40.9248 19.2978C41.0919 19.2538 41.2423 19.1616 41.3573 19.0326C41.4722 18.9037 41.5466 18.7437 41.5711 18.5726C41.7745 17.1501 41.7745 15.7058 41.5711 14.2833ZM26.7236 25.7798C21.5671 25.7798 17.372 21.5847 17.372 16.4282C17.372 11.2717 21.5671 7.07665 26.7236 7.07665C31.8801 7.07665 36.0751 11.2717 36.0751 16.4282C36.0751 21.5847 31.8801 25.7798 26.7236 25.7798Z" fill="url(#paint0_linear_386_1123)" />
      <path d="M26.7197 8.83545C22.5325 8.83545 19.126 12.242 19.126 16.4292C19.126 20.6164 22.5325 24.023 26.7197 24.023C30.907 24.023 34.3135 20.6164 34.3135 16.4292C34.3135 12.242 30.907 8.83545 26.7197 8.83545ZM31.1068 15.1679L26.3998 19.8749C26.235 20.0397 26.0114 20.1323 25.7784 20.1323C25.5453 20.1323 25.3217 20.0397 25.1569 19.8749L22.8033 17.5214C22.4601 17.1782 22.4601 16.6217 22.8033 16.2784C23.1465 15.9353 23.703 15.9353 24.0463 16.2784L25.7784 18.0105L29.8639 13.9249C30.2071 13.5817 30.7636 13.5817 31.1069 13.9249C31.4501 14.2681 31.4501 14.8246 31.1068 15.1679Z" fill="url(#paint1_linear_386_1123)" />
      <defs>
        <linearGradient id="paint0_linear_386_1123" x1="26.7236" y1="1.42822" x2="26.7236" y2="31.4282" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0A4B6E" />
          <stop offset="1" stopColor="#1391D4" />
        </linearGradient>
        <linearGradient id="paint1_linear_386_1123" x1="26.7197" y1="8.83545" x2="26.7197" y2="24.023" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0A4B6E" />
          <stop offset="1" stopColor="#1391D4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const MODULES: Module[] = [
  {
    key: "People & Workforce",
    icon: <PeopleIcon />,
    title: "People & Workforce",
    subtitle: "Manage identities, access, attendance, and safety.",
    bullets: [
      "Facial recognition & access control",
      "Profile and credential management",
      "Attendance and workforce tracking",
      "Fatigue monitoring and safety compliance",
    ],
    image: "/ai-platform/connected-operation.png",
  },
  {
    key: "Operations & Workflows",
    icon: <OpsIcon />,
    title: "Operations & Workflows",
    subtitle: "Run daily operations with structure and visibility.",
    bullets: [
      "Task and project management",
      "Service orders and maintenance workflows",
      "Scheduling and execution tracking",
      "SOP compliance and audit trails",
    ],
    image: "/ai-platform/connected-operation.png",
  },
];

// ── Chevron ───────────────────────────────────────────────────────────────────

function ChevronRight({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ConnectedOperations() {
  const [active, setActive] = useState(0);
  const current = MODULES[active]!;

  return (
    <section className="relative px-6 pb-20 pt-16 lg:px-[60px]">
      <div className="mx-auto w-full max-w-[1410px]">
        {/* Header */}
        <header className="flex max-w-[807px] flex-col gap-2.5">
          <h2 className="text-[26px] font-black text-[#0A4B6E]">
            Everything your operations depend on connected
          </h2>
          <p className="text-[18px] font-normal leading-[26px] text-[#0A4B6E] lg:text-[20px]">
            A unified architecture designed to handle the complexity of modern
            enterprise environments without the clutter.
          </p>
        </header>

        {/* Two-column panel */}
        <div className="mt-10 flex flex-col gap-[30px] lg:flex-row lg:items-stretch">
          {/* Left: image + pagination dots */}
          <div className="flex flex-col items-center gap-4 md:max-w-[600px] lg:w-[600px] lg:shrink-0">
            <div className="relative h-[320px] w-full overflow-hidden rounded-[24px] border border-[#B8E6FF]/60 bg-[#EDF5FC] shadow-[6px_10px_23px_rgba(217,226,255,0.85)] lg:h-[380px]">
              <Image
                key={current.key}
                src={current.image}
                alt={current.title}
                fill
                sizes="480px"
                className="object-center transition-opacity duration-300"
              />
            </div>

            {/* Pagination dots */}
            <div className="flex items-center gap-2">
              {MODULES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`View ${MODULES[i]?.key}`}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-200 ${
                    i === active
                      ? "h-[10px] w-[28px] bg-[#0A8EC8]"
                      : "size-[10px] bg-[#B8E6FF] hover:bg-[#5CB7E8]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: accordion */}
          <div className="flex flex-1 flex-col gap-3">
            {MODULES.map((mod, i) => {
              const isActive = i === active;
              return (
                <button
                  key={mod.key}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`group w-full rounded-[20px] border text-left transition-all duration-200 ${
                    isActive
                      ? "border-[#B8E6FF] bg-[linear-gradient(180deg,rgba(233,248,255,0.9),rgba(184,230,255,0.5))] shadow-[0_10px_40px_rgba(156,220,255,0.25)]"
                      : "border-[#EAF3FB] bg-white hover:border-[#9CDCFF] hover:bg-[#F4FBFF]"
                  }`}
                >
                  {/* Module header */}
                  <div className="flex items-center gap-4 px-5 py-4">
                    <span
                      className={`flex size-[44px] shrink-0 items-center justify-center rounded-[12px] border transition-colors ${
                        isActive
                          ? "border-[#B8E6FF] bg-[rgba(244,251,255,0.8)] text-[#0A8EC8]"
                          : "border-[#EAF3FB] bg-[#F4FBFF] text-[#5CB7E8]"
                      }`}
                    >
                      {mod.icon}
                    </span>
                    <div className="flex flex-1 flex-col gap-0.5">
                      <p className={`text-[17px] font-bold ${isActive ? "text-[#0A4B6E]" : "text-[#3E4B77]"}`}>
                        {mod.title}
                      </p>
                      <p className={`text-[14px] font-normal ${isActive ? "text-[#0A8EC8]" : "text-[#556394]"}`}>
                        {mod.subtitle}
                      </p>
                    </div>
                    <ChevronRight
                      className={`shrink-0 transition-transform duration-200 ${
                        isActive ? "rotate-90 text-[#0A8EC8]" : "text-[#AEBBec]"
                      }`}
                    />
                  </div>

                  {/* Expanded bullet list */}
                  {isActive && (
                    <div className="px-5 pb-5">
                      <ul className="flex flex-col gap-2.5">
                        {mod.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-center gap-3">
                            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[rgba(10,142,200,0.12)]">
                              <span className="size-[7px] rounded-full bg-[#0A8EC8]" />
                            </span>
                            <span className="text-[15px] font-normal leading-[22px] text-[#202020]">
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
