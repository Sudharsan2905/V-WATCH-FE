import Image from "next/image";
import Link from "next/link";

// Logo-only header used by the landing page's thank-you screen (Figma
// "V-Watch LP Desktop Thank You").
export default function MinimalHeader() {
  return (
    <header className="flex h-[77px] items-center justify-center border-b border-[#E2EEEB] bg-white px-5">
      <Link href="/" aria-label="V-Watch Ai home">
        <Image
          src="/landing/vwatch-logo-dark.png"
          alt="V-Watch Ai"
          width={92}
          height={40}
          priority
          className="h-10 w-auto"
        />
      </Link>
    </header>
  );
}
