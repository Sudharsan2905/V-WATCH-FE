import Image from "next/image";
import Link from "next/link";
import BookADemo from "@/components/common/BookADemo";

export default function AIPlatformHero() {
  return (
    <section className="relative min-h-[600px] overflow-hidden bg-[#030515] lg:min-h-[754px]">
      {/* Background: dark city night scene */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/ai-platform/ai-platform-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1410px] px-6 lg:px-[60px]">
        <div className="flex flex-col justify-center gap-[30px] pt-[150px] pb-[100px] lg:min-h-[754px] lg:max-w-[700px] lg:py-[140px]">
          {/* Badge */}
          <span className="inline-flex w-fit items-center gap-[6px] rounded-full border border-white/15 bg-linear-to-b from-white/20 to-white/5 px-[13px] py-[9px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_8px_24px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md">
            <span className="size-[11px] rounded-full bg-[#86D58B] shadow-[0_0_8px_2px_rgba(134,213,139,0.6)]" />
            <span className="text-base leading-none text-white">What V-Watch Ai</span>
          </span>

          {/* Heading */}
          <h1 className="text-[34px] font-semibold leading-[1.2] tracking-[0.5px] text-white sm:text-[44px] lg:text-[50px] lg:leading-[68px]">
            One Platform to Run Your Entire Operation
          </h1>

          {/* Description */}
          <p className="max-w-140 text-base leading-7 font-semibold text-white lg:text-[20px] lg:leading-8">
            V-Watch Ai is an AI-driven operations platform that connects your
            people, processes, assets, and environments giving you real-time
            visibility, automation, and control across every part of your
            business.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <BookADemo />
            <Link
              href="#use-cases"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/40 bg-white px-5 text-base font-bold text-[#516413] hover:text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Explore Use Cases
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
