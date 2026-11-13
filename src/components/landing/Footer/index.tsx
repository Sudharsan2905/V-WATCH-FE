"use client";

import Image from "next/image";
import Link from "next/link";
import { scrollPageTo } from "@/lib/scrollChain";
import { ArrowUpRight } from "../ui";

// Slim SS Group footer from the Figma landing page. `sectionBase` prefixes the
// in-page section links: "" on the landing page itself (plain #hash jumps),
// "/" elsewhere (e.g. /thank-you) so they lead back to the landing sections.
export default function LandingFooter({
  sectionBase = "",
}: Readonly<{ sectionBase?: "" | "/" }>) {
  const links = [
    { label: "About V-Watch Ai", href: "/about" },
    { label: "Products", href: `${sectionBase}#products` },
    { label: "FAQs", href: `${sectionBase}#faqs` },
    { label: "Talk to Us", href: `${sectionBase}#book-demo` },
  ];

  return (
    <footer className="border-t border-[#304558] bg-[#091827] px-10 font-[family-name:var(--font-inter)]">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="flex flex-col items-center gap-[15px] pb-2.5 pt-5 lg:flex-row lg:justify-between lg:py-[30px]">
          <div className="flex items-end gap-[15px] lg:gap-[13px]">
            <Image
              src="/landing/ssgroup-logo.webp"
              alt="SS Group"
              width={49}
              height={70}
              className="h-[70px] w-[49px] rounded-[5px] bg-white object-contain"
            />
            <div className="flex flex-col gap-[5px]">
              <Image
                src="/landing/vwatch-logo-light.png"
                alt="V-Watch Ai"
                width={92}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-[9px] leading-[19.8px] text-[#B5C7D5] lg:text-[12px]">
                By SS Group International
              </span>
            </div>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("#") ? (
                    <a
                      href={link.href}
                      className="block pb-0.5 pt-px text-[10px] font-bold leading-[1.2] text-[#E4EEF5] transition-colors hover:text-[#A6C936] lg:text-[13px]"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="block pb-0.5 pt-px text-[10px] font-bold leading-[1.2] text-[#E4EEF5] transition-colors hover:text-[#A6C936] lg:text-[13px]"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col items-center gap-[5px] border-t border-[#304558] pb-[15px] pt-2.5 lg:flex-row lg:justify-between lg:pb-[21px] lg:pt-4">
          <p className="text-[9px] leading-[19.8px] text-[#B8CAD9] lg:text-[12px]">
            © {new Date().getFullYear()} V-Watch Ai by SS Group International
          </p>
          <button
            type="button"
            onClick={() => scrollPageTo(0)}
            className="group flex items-center gap-0.5 text-[9px] leading-[19.8px] text-[#B8CAD9] transition-colors hover:text-white lg:gap-1.5 lg:text-[12px]"
          >
            Back to top
            <ArrowUpRight className="size-3 lg:size-[15px]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
