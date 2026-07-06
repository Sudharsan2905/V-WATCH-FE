"use client";

import Image from "next/image";
import Link from "next/link";
import BookADemo from "@/components/common/BookADemo";
import { useRef } from "react";
import { motion, MotionConfig, useInView, type Variants } from "motion/react";

// A link is either a plain label (route resolved from FOOTER_ROUTES below) or an
// explicit { label, href } for pages that want to override the default mapping.
type FooterLink = string | { label: string; href?: string };
type LinkColumn = { heading: string; links: FooterLink[] };

// Only labels whose page actually exists in the app get navigation. Labels not
// listed here (e.g. "Career", "Terms of Service", the platform product names
// that have no page yet) render as plain, non-navigating text. Keep this in one
// place so every page using <Footer> gets the links automatically.
const FOOTER_ROUTES: Record<string, string> = {
  "HRMS Management": "/hrms",
  "BI Reporting": "/bi-dashboards",
  "System Integrators": "/integrators-partners",
  Construction: "/industries/construction",
  Industrial: "/industries/industrial-energy",
  Commercial: "/industries/commercial-facilities",
  "About Us": "/about",
  Contact: "/contact-us",
};

function resolveLink(link: FooterLink): { label: string; href?: string } {
  if (typeof link === "string") return { label: link, href: FOOTER_ROUTES[link] };
  return { label: link.label, href: link.href ?? FOOTER_ROUTES[link.label] };
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const DEFAULT_COLUMNS: LinkColumn[] = [
  {
    heading: "Platform",
    links: ["Dashboard", "BI Reporting", "System Integrators"],
  },
  {
    heading: "Industries",
    links: ["Construction", "Industrial", "Commercial"],
  },
  { heading: "Company", links: ["About Us", "Contact", "Career"] },
];

const SOCIALS: { name: string; icon: string }[] = [
  { name: "LinkedIn", icon: "/footer/linkedin.svg" },
  { name: "Facebook", icon: "/footer/facebook.svg" },
  { name: "Instagram", icon: "/footer/instagram.svg" },
];

type FooterProps = {
  ctaTitle?: string;
  ctaText?: string;
  linkColumns?: LinkColumn[];
  ctaVariant?: "light" | "dark";
  isBookADemoVisible?: boolean;
  showCta?: boolean;
  showHeader ?: boolean
};

const CTA_BG = {
  light:
    "bg-[radial-gradient(70%_130%_at_50%_8%,rgba(180,224,242,0.55)_0%,rgba(72,141,176,0)_52%),linear-gradient(180deg,#34809F_0%,#4789B4_45%,#6BA6CC_100%)]",
  dark: "bg-[radial-gradient(90%_120%_at_50%_-10%,rgba(45,110,180,0.45)_0%,rgba(12,28,48,0)_55%),linear-gradient(180deg,#0C1C30_0%,#12325A_55%,#1B2B4E_100%)]",
} as const;

export default function Footer({
  ctaTitle = "Transform how your operations run",
  ctaText = "See how V-Watch Ai helps you automate processes, strengthen security, and improve productivity across your organisation.",
  linkColumns = DEFAULT_COLUMNS,
  ctaVariant = "light",
  isBookADemoVisible = true,
  showHeader = true
}: Readonly<FooterProps>) {
  // Trigger point: when the footer enters the viewport, start the CTA slide-up.
  const triggerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(triggerRef, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <MotionConfig reducedMotion="user">
      {/*
        Outer wrapper — clips the curtain overlay so it doesn't bleed outside.
        Content (CTA + footer card) sits in normal flow at z-0.
        A dark curtain overlay at z-10 covers them initially, then slides up
        to reveal the content beneath — no translateY on the content itself.
      */}
      <div ref={triggerRef} className="relative overflow-hidden bg-[#19213D]">

        {/* ── Dark curtain — covers content at start, slides down out on trigger */}
        <motion.div
          initial={{ y: "0%" }}
          animate={inView ? { y: "-100%" } : { y: "0%" }}
          transition={{ duration: 1.6, ease: EASE }}
          className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(to_bottom,#000000_50%,#19213D_50%)]"
        />

        {/* ── CTA band */}
        <div
          className={`relative z-0 overflow-hidden px-6 pt-10 pb-20 text-center ${CTA_BG[ctaVariant]}`}
        >
          {/* faint square-tile mosaic texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-55"
            style={{
              backgroundImage: "url('/footer/bg-grid.svg')",
              backgroundSize: "cover",
              width: "100%",
              maskImage: "radial-gradient(75% 85% at 50% 22%, #000 0%, transparent 78%)",
              WebkitMaskImage: "radial-gradient(75% 85% at 50% 22%, #000 135%, transparent 78%)",
            }}
          />
          {/* soft cyan glow blobs */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#0DBFC4] opacity-40 blur-[170px]" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-[26rem] rounded-full bg-[#4DAFE0] opacity-30 blur-[200px]" />

          {showHeader ? 

            <motion.div
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.55 }}
            className="relative mx-auto flex max-w-[991px] flex-col items-center gap-6"
            >
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-[28px] font-bold text-white sm:text-[32px]">
                {ctaTitle}
              </h2>
              <p className="max-w-[814px] text-[18px] font-normal leading-8 text-[#F3F8FF] sm:text-[20px]">
                {ctaText}
              </p>
            </div>
            {isBookADemoVisible && <BookADemo />}
          </motion.div>
          :(
  <div className="h-[220px]" />
)}
        </div>

        {/* ── Footer card — sits on top of CTA via z-10 */}
        <div className="relative z-10 px-4 pb-10 sm:px-10 -mt-11 -px">
          {/* Decorative background glow */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/footer/footer-img.png"
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 w-[1280px] max-w-none -translate-x-1/2 -translate-y-1/4 select-none opacity-50"
          />

          <div className="mx-auto max-w-[1280px] overflow-hidden rounded-[32px] bg-[radial-gradient(100%_55%_at_50%_8%,rgba(60,95,135,0.45)_0%,rgba(30,37,65,0)_55%),linear-gradient(180deg,#1B2B4E_0%,#1E2541_38%,#1E2541_72%,#23324F_100%)] px-6 pt-6 pb-5 shadow-[inset_14px_-10px_74px_rgba(14,90,128,0.20)] sm:px-10">
            <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-12">
              {/* Brand */}
              <div className="flex w-full flex-col gap-5 md:w-[268px] md:shrink-0">
                <Image
                  src="/vwatch-logo.png"
                  alt="V-WATCH"
                  width={169}
                  height={40}
                  className="self-start"
                />
                <p className="text-[14px] font-normal leading-[22px] text-white">
                  AI-driven business process automation platform for real-time
                  visibility, security, and control.
                </p>
              </div>

              {/* Link columns */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:flex md:flex-1 md:gap-12"
              >
                {linkColumns.map((col) => (
                  <motion.div
                    key={col.heading}
                    variants={fadeUp}
                    className="flex flex-col gap-2.5 md:flex-1"
                  >
                    <h3 className="text-[16px] font-bold text-white">
                      {col.heading}
                    </h3>
                    <ul className="flex flex-col gap-1.5">
                      {col.links.map((link) => {
                        const { label, href } = resolveLink(link);
                        return (
                          <li key={label}>
                            {href ? (
                              <Link
                                href={href}
                                prefetch={false}
                                className="text-[14px] font-normal text-white/90 transition-colors hover:text-white"
                              >
                                {label}
                              </Link>
                            ) : (
                              <span className="cursor-default text-[14px] font-normal text-white/90">
                                {label}
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Bottom row */}
            <div className="mt-6 flex flex-col items-start gap-4 border-t border-white/[0.14] pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[14px] font-normal leading-5 text-[#EBF3FF]">
                © 2026 V-Watch Ai. All rights reserved.
              </p>
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="flex items-center gap-2.5"
              >
                {SOCIALS.map((s) => (
                  <motion.a
                    key={s.name}
                    variants={fadeUp}
                    href="#"
                    aria-label={s.name}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[inset_-2.5px_-3.3px_4.4px_rgba(128,211,146,0.25),inset_0_0_12px_rgba(60,187,214,0.49),0_3.3px_3.3px_rgba(15,87,138,0.20)]"
                  >
                    <Image
                      src={s.icon}
                      alt=""
                      width={22}
                      height={22}
                      className="h-[22px] w-[22px]"
                    />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

      </div>
    </MotionConfig>
  );
}
