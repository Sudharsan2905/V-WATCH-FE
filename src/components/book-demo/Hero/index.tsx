import Image from "next/image";
import BookADemo from "@/components/common/BookADemo";

export default function BookDemoHero() {
  return (
    <section className="relative z-0 overflow-hidden bg-[#030515] pt-[60px] pb-20 lg:pb-[330px]">
      {/* Globe illustration — full width, same pattern as common Hero */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/book-a-demo/header.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right-top"
        />
      </div>

      {/* Left gradient scrim for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#030515] via-[#030515]/80 to-transparent" />
      {/* Bottom fade so content section blends in */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#030515] to-transparent" />
      {/* Blue ambient glow */}
      <div className="pointer-events-none absolute left-0 top-1/3 h-80 w-72 -translate-x-1/2 rounded-full bg-[#0a8ec8] opacity-20 blur-[150px]" />

      {/* Content */}
      <div className="relative mx-auto max-w-[1280px] px-6 pt-16 sm:pt-20 lg:pt-24">
        <div className="max-w-[650px]">
          {/* Live demo badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur-sm">
            {/* <span className="h-2 w-2 rounded-full bg-[#a6c936]" /> */}
            <span className="relative h-[11px] w-[11px] rounded-full bg-[#86D58B]" />
            <span className="text-[18px] font-[700] font-bold text-white">
              Live demo program
            </span>
          </div>

          {/* Heading */}
          <p className="mb-5 text-[38px] font-lato font-[900] font-black leading-tight text-white sm:text-[46px] lg:text-[50px]">
            See V-Watch AI in Action
          </p>

          {/* Bold intro line */}
          <p className="mb-4 text-[15px] font-lato font-[700] font-bold leading-[1.75] text-white sm:text-[20px]">
            Get a personalized walkthrough of how V-Watch Ai can help you
            improve visibility, strengthen compliance, and take full control of
            your operations.
          </p>

          {/* Secondary line */}
          <p className="mb-8 text-[15px] font-lato font-[700] leading-[1.75] text-white sm:text-[20px]">
            Speak with a consultant within 24 hours and get access to a 14-day
            guided demo.
          </p>

          <BookADemo />
        </div>
      </div>
    </section>
  );
}
