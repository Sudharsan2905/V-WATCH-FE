import Link from "next/link";

// Brand gradient (Figma 215:7878) — bright blue→green with a 10% black overlay,
// shared across the navbar/hero/footer CTAs.
const DEMO_GRADIENT =
  "bg-[linear-gradient(90deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.1)_100%),linear-gradient(180deg,#21B1F1_20.69%,#A6C936_151.72%)]";

const BUTTON_CLASSES =
  "h-11 gap-[10px] rounded-full px-4 text-base shadow-[2px_5px_14px_rgba(79,148,104,0.60),0_6px_42px_rgba(38,124,153,0.40)]";

function ArrowBadge() {
  return (
    <span className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path
          d="M3.6 8.4 8.4 3.6M4.5 3.6h3.9v3.9"
          stroke="#52BAAC"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

type Props = { href?: string; className?: string };

export default function ViewAllUseCases({
  href = "#",
  className = "",
}: Readonly<Props>) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full font-bold text-white ${DEMO_GRADIENT} ${BUTTON_CLASSES} ${className}`}
    >
      <ArrowBadge />
      View All Use Cases
    </Link>
  );
}
