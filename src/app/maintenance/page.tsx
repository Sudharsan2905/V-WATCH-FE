import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "We're upgrading our look! | v-watch",
  description: "A new, faster interface is on the way. Stay tuned for the complete redesign.",
};

export default function MaintenancePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary-blue-200/40 blur-3xl motion-safe:animate-[softPulse_6s_ease-in-out_infinite] sm:h-96 sm:w-96"
      />

      <div className="relative flex w-full max-w-2xl flex-col items-center text-center">
        <div className="flex items-center gap-2.5 motion-safe:animate-[heroFadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_both]">
          <Image
            src="/vwatch-logo-mark.svg"
            alt="V-WATCH"
            width={72}
            height={14}
            priority
            loading="eager"
          />
          <span className="text-lg font-black text-neutral">V-Watch AI</span>
        </div>

        <span className="mt-8 inline-flex items-center rounded-full bg-primary-blue-50 px-4 py-2 text-xs font-bold tracking-wider text-primary-blue-600 uppercase motion-safe:animate-[heroFadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_0.1s_both] sm:text-sm">
          New design incoming
        </span>

        <h1 className="mt-6 text-4xl leading-tight font-black text-neutral motion-safe:animate-[heroFadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_0.2s_both] sm:text-5xl md:text-6xl">
          We&apos;re upgrading our look!
        </h1>

        <p className="mt-6 max-w-lg text-base text-navy-600 motion-safe:animate-[heroFadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_0.3s_both] sm:text-lg">
          A new, faster interface is on the way. Stay tuned for the complete
          redesign.
        </p>

        <div className="mt-10 h-2 w-full max-w-md overflow-hidden rounded-full bg-navy-100 motion-safe:animate-[heroFadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_0.4s_both]">
          <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-primary-blue-500 to-primary-blue-600 motion-safe:animate-[progressGrow_0.8s_cubic-bezier(0.16,1,0.3,1)_0.7s_both,progressBrightness_2s_ease-in-out_1.5s_infinite]" />
        </div>
        <span className="mt-4 text-sm text-navy-500 motion-safe:animate-[heroFadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_0.4s_both]">
          In development
        </span>
      </div>
    </main>
  );
}
