import Link from "next/link";

// Muted brand gradient, shared across the navbar/hero/footer CTAs.
const DEMO_GRADIENT = "bg-[linear-gradient(180deg,#2FA3C2_0%,#72B16C_100%)]";

const BUTTON_CLASSES = "h-11 gap-[10px] px-4 text-base shadow-[0_6px_42px_rgba(38,124,153,0.40),2px_5px_14px_rgba(79,148,104,0.60)]";

function ArrowBadge() {
  return (
    <span className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path d="M3.6 8.4 8.4 3.6M4.5 3.6h3.9v3.9" stroke="#52BAAC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

type Props = { href?: string; className?: string };

export default function BookADemo({ href = "#", className = "" }: Readonly<Props>) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full font-bold text-white ${DEMO_GRADIENT} ${BUTTON_CLASSES} ${className}`}
    >
      <ArrowBadge />
      Book a Demo
    </Link>
  );
}
