import type { Metadata } from "next";
import Link from "next/link";
import { inter } from "@/components/landing/fonts";
import MinimalHeader from "@/components/landing/MinimalHeader";
import LandingFooter from "@/components/landing/Footer";
import { ArrowUpRight, T, buttonClass } from "@/components/landing/ui";

export const metadata: Metadata = {
  title: "Thank You — V-Watch Ai",
  description: "We’ve received your demonstration request.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div
      className={`${inter.variable} flex min-h-screen flex-col bg-white font-[family-name:var(--font-inter)] text-[#19213D]`}
    >
      <MinimalHeader />
      <main
        className="flex flex-1 items-center justify-center px-5 py-20 lg:px-10 lg:py-[190px]"
        style={{
          background:
            "radial-gradient(65.5% 103.1% at 74.6% 42.8%, rgba(182,234,247,0.6) 0%, rgba(198,244,204,0) 54%), #ffffff",
        }}
      >
        <div className="flex max-w-[1200px] flex-col items-center gap-6 text-center">
          <div className="flex flex-col gap-[15px]">
            <h1 className={`${T.h2} text-[#122338]`}>
              Thank you for your interest.
            </h1>
            <p className={`${T.body} text-[#4E6174]`}>
              We’ve received your demonstration request. Our team will be in
              touch to discuss your project and arrange a walkthrough of V-Watch
              Ai.
            </p>
          </div>
          <Link href="/" className={buttonClass("primary")}>
            Back to Home
            <ArrowUpRight />
          </Link>
        </div>
      </main>
      <LandingFooter sectionBase="/" />
    </div>
  );
}
