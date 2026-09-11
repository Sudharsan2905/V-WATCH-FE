import Link from "next/link";

// Limited-time-offer strip shown above the nav row on the HRMS page only
// (passed to <Navbar topBar={...} />, which renders it inside the shared
// fixed header so it stays docked with the nav while scrolling).
export default function HrmsPromoBar() {
  return (
    <div
      className="relative z-0 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 px-4 py-2.5 text-center text-[13px] font-semibold text-white sm:text-[14px] min-[1000px]:flex-nowrap"
      style={{ background: "linear-gradient(90deg,#12967F 0%,#5CBE72 100%)" }}
    >
      <span className="inline-flex shrink-0 items-center rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.04em] sm:text-[12px]">
        Limited-Time SME Offer
      </span>
      <span className="min-[1000px]:whitespace-nowrap">
        Sign up by 31st December 2026 and get full V-Watch HR System access
        FREE for two months
      </span>
      <Link
        href="#trial"
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[12px] font-bold text-[#12967F] transition hover:brightness-95"
      >
        Claim This Offer <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
