import type { ReactNode } from "react";

// ─── Typography ──────────────────────────────────────────────────────────────
// Type scale from the Figma "Visual System" frame. Mobile values (440px frame)
// are the base; full desktop values (1920px frame) apply from `xl`, with an
// in-between step at `lg` (1024–1279px) where the two-column layouts are
// narrower than the design. Letter-spacing is in px, exactly as in Figma.
export const T = {
  h1: "font-[740] text-[46px] leading-[1.05] tracking-[-2px] lg:text-[56px] lg:tracking-[-3.6px] xl:text-[66px] xl:tracking-[-4.49px]",
  h2: "font-[730] text-[34px] leading-[1.1] tracking-[-1px] lg:text-[42px] lg:tracking-[-2px] xl:text-[52px] xl:tracking-[-2.86px]",
  h3: "font-[730] text-[30px] leading-[1.2] tracking-[-1px] lg:text-[40px] lg:tracking-[-2px] xl:text-[48px] xl:tracking-[-3.12px]",
  h4: "font-[730] text-[26px] leading-[1.1] tracking-[-2.04px] lg:text-[32px] lg:tracking-[-1.5px] xl:text-[37px] xl:tracking-[-2.04px]",
  h5: "font-[730] text-[20px] leading-[1.2] tracking-[-0.88px] lg:text-[25px]",
  h6: "font-[730] text-[16px] leading-[1.2] tracking-[-0.67px] lg:text-[19px]",
  eyebrow:
    "font-[780] uppercase text-[10px] leading-[1.4] tracking-[1.26px] lg:text-[11px]",
  sub2: "font-[800] uppercase text-[9px] leading-[1.4] tracking-[1.2px] lg:text-[10px]",
  bodyBig: "text-[16px] leading-[1.6] lg:text-[19px]",
  body: "text-[13px] leading-[1.6] lg:text-[16px]",
  points: "text-[11px] leading-[1.5] lg:text-[14px] lg:leading-[1.6]",
  pointsBold: "font-[570] text-[11px] leading-[1.5] lg:text-[14px]",
  // Form field labels (bold) — Figma mobile 10px, desktop 13px.
  label: "font-bold text-[10px] leading-[1.2] lg:text-[13px]",
  // Fine print ("Footer" style) — 9px / 12px, both on a 19.8px line.
  small: "text-[9px] leading-[19.8px] lg:text-[12px]",
} as const;

// Section shell: full-bleed background, 1200px content column, Figma spacing
// (40px vertical / 20px gutter on mobile, 110px / 40px on desktop).
export function Section({
  id,
  className = "",
  innerClassName = "",
  children,
  ...rest
}: Readonly<{
  id?: string;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
  "aria-labelledby"?: string;
}>) {
  return (
    <section
      id={id}
      className={`scroll-mt-(--nav-h) px-5 py-10 lg:px-10 lg:py-[110px] ${className}`}
      {...rest}
    >
      <div className={`mx-auto w-full max-w-[1200px] ${innerClassName}`}>
        {children}
      </div>
    </section>
  );
}

// Section label: a 21×2 lime dash (or a 7px dot) followed by uppercase text.
export function Eyebrow({
  children,
  marker = "dash",
  className = "text-[#A6C936]",
}: Readonly<{
  children: ReactNode;
  marker?: "dash" | "dot" | "none";
  className?: string;
}>) {
  return (
    <p className={`flex items-center gap-2.5 ${T.eyebrow} ${className}`}>
      {marker === "dash" && (
        <span aria-hidden className="h-0.5 w-[21px] shrink-0 bg-[#A6C936]" />
      )}
      {marker === "dot" && (
        <span
          aria-hidden
          className="size-[7px] shrink-0 rounded-full bg-[#A6C936]"
        />
      )}
      {children}
    </p>
  );
}

// ─── Buttons ─────────────────────────────────────────────────────────────────

const BUTTON_TONES = {
  primary: "bg-[#7A0CA2] text-white hover:bg-[#6A0A8D]",
  light: "bg-[#C5F588] text-[#142A23] hover:bg-[#B6EC72]",
  dark: "bg-[#19213D] text-white hover:bg-[#252F55]",
} as const;

export type ButtonTone = keyof typeof BUTTON_TONES;

export const buttonClass = (tone: ButtonTone, extra = "") =>
  // Same size on every breakpoint — the Figma mobile frame keeps the 52px /
  // 14px desktop buttons.
  `group inline-flex h-[52px] items-center justify-center gap-2.5 rounded-[8px] px-5 text-[14px] font-[760] leading-[1.25] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A8EC8] ${BUTTON_TONES[tone]} ${extra}`;

// In-page CTA. A plain <a> (not next/link) so Lenis's anchor handling can
// smooth-scroll to the hash target.
export function ButtonLink({
  href,
  tone = "primary",
  className = "",
  children,
}: Readonly<{
  href: string;
  tone?: ButtonTone;
  className?: string;
  children: ReactNode;
}>) {
  return (
    <a href={href} className={buttonClass(tone, className)}>
      {children}
      <ArrowUpRight />
    </a>
  );
}

// ─── Icons (exported from Figma) ─────────────────────────────────────────────

export function ArrowUpRight({ className = "" }: Readonly<{ className?: string }>) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      aria-hidden
      className={`shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${className}`}
    >
      <path
        d="M4.958 4.958h7.084v7.084M4.958 12.042l7.084-7.084"
        stroke="currentColor"
        strokeWidth="1.417"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowDown({ className = "" }: Readonly<{ className?: string }>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={`shrink-0 transition-transform duration-200 group-hover:translate-y-0.5 ${className}`}
    >
      <path
        d="M8 3.333v9.334M12.667 8 8 12.667 3.333 8"
        stroke="currentColor"
        strokeWidth="1.333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightNarrow({
  className = "",
}: Readonly<{ className?: string }>) {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      aria-hidden
      className={`shrink-0 ${className}`}
    >
      <path
        d="M5.208 12.5h14.583M15.625 16.667l4.167-4.167M15.625 8.333l4.167 4.167"
        stroke="#A6C936"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Check({
  className = "",
  color = "#2D805E",
  size = 17,
}: Readonly<{ className?: string; color?: string; size?: number }>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 17 17"
      fill="none"
      aria-hidden
      className={`shrink-0 ${className}`}
    >
      <path
        d="M14.167 4.25 6.375 12.042 2.833 8.5"
        stroke={color}
        strokeWidth="1.417"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Check-mark list used across the products, teams and form sections.
export function CheckList({
  items,
  itemClassName,
  checkColor,
  gapClassName = "gap-[9px]",
}: Readonly<{
  items: readonly string[];
  itemClassName: string;
  checkColor?: string;
  gapClassName?: string;
}>) {
  return (
    <ul className={`flex flex-col ${gapClassName}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-[9px]">
          {/* Mobile rows are exactly icon-height (17px) in Figma; the 2px
              nudge only aligns the taller desktop lines. */}
          <Check color={checkColor} className="lg:mt-[2px]" />
          <span className={itemClassName}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// Figma "Circle Arrow" (iconstack.io) used by the mobile carousels: a 34px
// thin outlined circle with an arrow. `filled` gives it a white disc for
// placements over a card edge.
export function CircleArrowButton({
  direction,
  onClick,
  label,
  filled = true,
  className = "",
}: Readonly<{
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
  filled?: boolean;
  className?: string;
}>) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`flex size-[34px] shrink-0 items-center justify-center rounded-full text-[#0A8EC8] transition-colors hover:bg-[#E6F5FC] ${filled ? "bg-white" : ""} ${className}`}
    >
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.1" />
        <path
          d={
            direction === "next"
              ? "M8 12h8M13 9l3 3-3 3"
              : "M16 12H8M11 9l-3 3 3 3"
          }
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
