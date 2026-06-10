import Image from "next/image";
import Link from "next/link";
import BookADemo from "@/components/common/BookADemo";

// "See Your Operations Clearly With Real-Time BI Dashboards"
// Full-bleed dark hero — the globe + glowing bar-chart artwork lives in the
// background image; the copy sits in the dark space on the left.

export default function BiDashboardsHero() {
  return (
    <section className="relative min-h-[600px] overflow-hidden bg-[#030515] lg:min-h-[754px]">
      {/* Background artwork */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/bi-dashboards/bi-dashboards-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1410px] px-6 lg:px-[60px]">
        <div className="flex flex-col justify-center gap-[30px] pt-[150px] pb-[100px] lg:min-h-[754px] lg:max-w-[680px] lg:py-[140px]">
          {/* Badge */}
          <span className="inline-flex w-fit items-center gap-[8px] rounded-full border border-white/15 bg-linear-to-b from-white/20 to-white/5 px-[14px] py-[9px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_8px_24px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md">
            <span className="size-[10px] rounded-full bg-[#86D58B] shadow-[0_0_8px_2px_rgba(134,213,139,0.6)]" />
            <span className="text-base leading-none text-white">V-Watch Interface</span>
          </span>

          {/* Heading */}
          <h1 className="text-[34px] font-black leading-[1.18] tracking-[0.5px] text-white sm:text-[44px] lg:text-[52px] lg:leading-[1.2]">
            See Your Operations Clearly With Real-Time <br />
            BI Dashboards
          </h1>

          {/* Description */}
          <p className="max-w-[560px] text-base leading-7 text-white lg:text-[20px] lg:leading-8">
            V-Watch Ai leverages Microsoft Power BI to transform real-time
            operational data into clear, actionable dashboards giving you full
            visibility across workforce, operations, assets, and movement.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <BookADemo />
            <Link
              href="#intelligence-layer"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/40 bg-white px-5 text-base font-bold text-[#516413] backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
            >
              Explore Platform
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
