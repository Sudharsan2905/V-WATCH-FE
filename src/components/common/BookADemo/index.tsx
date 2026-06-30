import Link from "next/link";
import React from "react";

const BUTTON_STYLE: React.CSSProperties = {
  background: `
    linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)) padding-box,
    linear-gradient(180deg, #21B1F1 -20.69%, #A6C936 151.72%) padding-box,
    linear-gradient(180deg, rgba(33, 177, 241, 0.4) -20.69%, rgba(197, 235, 76, 0.4) 151.72%) border-box
  `,
  border: "1.24px solid transparent",
};

const BUTTON_STYLE_NO_BORDER: React.CSSProperties = {
  background:
    "linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), linear-gradient(180deg, #21B1F1 -20.69%, #A6C936 151.72%)",
};

const BUTTON_CLASSES =
  "h-11 gap-[10px] rounded-full px-4 text-base shadow-[2px_5px_14px_rgba(79,148,104,0.60),0_6px_42px_rgba(38,124,153,0.40)]";

function Arrow({ className = "" }: Readonly<{ className?: string }>) {
  return (
    <svg
      width="10"
      height="11"
      viewBox="0 0 10 11"
      fill="none"
      aria-hidden
      className={`col-start-1 row-start-1 ${className}`}
    >
      <path
        d="M9.54396 8.23273L9.35582 0.792485L1.91558 0.621445L1.93268 2.24633L6.89284 2.21212L0.153867 8.95109L1.21431 10.0115L7.93619 3.28967L7.90198 8.21562L9.54396 8.23273Z"
        fill="#52BAAC"
      />
    </svg>
  );
}

// On hover the resting arrow slides forward along the direction it points
// (up-right) and out of the badge, while a second copy revolves up from the
// bottom-left into its place. Both copies share one grid cell so the swap reads
// as a single continuous loop; the badge clips them with overflow-hidden.
export function ArrowBadge() {
  return (
    <span className="relative grid h-[25px] w-[25px] place-items-center overflow-hidden rounded-full bg-white">
      <Arrow className="transition-transform duration-300 ease-out group-hover:translate-x-[160%] group-hover:-translate-y-[160%] motion-reduce:transition-none" />
      <Arrow className="-translate-x-[160%] translate-y-[160%] transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 motion-reduce:transition-none" />
    </span>
  );
}

type Props = { href?: string; className?: string; noBorder?: boolean };

export default function BookADemo({
  href = "/book-demo",
  className = "",
  noBorder = false,
}: Readonly<Props>) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center rounded-full font-bold text-white transition-[transform,filter] duration-200 ease-out hover:scale-102 hover:brightness-110 ${BUTTON_CLASSES} ${className}`}
      style={noBorder ? BUTTON_STYLE_NO_BORDER : BUTTON_STYLE}
    >
      <ArrowBadge />
      Book a Demo
    </Link>
  );
}
