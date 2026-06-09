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

const BUTTON_CLASSES =
  "h-11 gap-[10px] rounded-full px-4 text-base shadow-[2px_5px_14px_rgba(79,148,104,0.60),0_6px_42px_rgba(38,124,153,0.40)]";
  "h-11 gap-[10px] rounded-full px-4 text-base shadow-[2px_5px_14px_rgba(79,148,104,0.60),0_6px_42px_rgba(38,124,153,0.40)]";

function ArrowBadge() {
  return (
    <span className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white">
      <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_386_936)">
          <path d="M9.54396 8.23273L9.35582 0.792485L1.91558 0.621445L1.93268 2.24633L6.89284 2.21212L0.153867 8.95109L1.21431 10.0115L7.93619 3.28967L7.90198 8.21562L9.54396 8.23273Z" fill="#52BAAC" />
        </g>
        <defs>
          <clipPath id="clip0_386_936">
            <rect width="10" height="10.69" fill="white" />
          </clipPath>
        </defs>
      </svg>

    </span>
  );
}

type Props = { href?: string; className?: string };

export default function BookADemo({
  href = "#",
  className = "",
}: Readonly<Props>) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full font-bold text-white ${BUTTON_CLASSES} ${className}`}
      style={BUTTON_STYLE}
    >
      <ArrowBadge />
      Book a Demo
    </Link>
  );
}
