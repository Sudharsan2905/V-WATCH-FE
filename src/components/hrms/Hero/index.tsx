"use client";

import Link from "next/link";
import ProductsHero from "@/components/products/Hero";
import BookADemo from "@/components/common/BookADemo";

const BUTTON_STYLE: React.CSSProperties = {
  background: `
    linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1)) padding-box,
    linear-gradient(180deg, #21B1F1 -20.69%, #A6C936 151.72%) padding-box,
    linear-gradient(180deg, rgba(33,177,241,0.4) -20.69%, rgba(197,235,76,0.4) 151.72%) border-box
  `,
  border: "1.24px solid transparent",
};

export default function HrmsHero() {
  return (
    <ProductsHero
      badge="HRMS"
      badgeDotColor="#3DA9F5"
      headingLines={["Manage Your People", "and The Work", "They Do"]}
      descriptionLines={[
        "A unified system that connects workforce management with",
        "task execution. so, you can assign, track, verify, and reward",
        "work using real data from your site.",
      ]}
      imageSrc="/hrms/hrmsHero.webp"
      imageObjectPosition="right top"
      ctaDelay={1.35}
      ctaSlot={
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="#trial"
            className="inline-flex h-11 items-center gap-2.5 rounded-full px-5 text-base font-bold text-white shadow-[2px_5px_14px_rgba(79,148,104,0.60),0_6px_42px_rgba(38,124,153,0.40)] transition-[transform,filter] duration-200 ease-out hover:scale-[1.02] hover:brightness-110"
            style={BUTTON_STYLE}
          >
            Start Free 14-Day Trial
          </Link>
          <BookADemo />
        </div>
      }
    />
  );
}
