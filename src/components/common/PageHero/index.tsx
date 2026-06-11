import Image from "next/image";
import Link from "next/link";
import BookADemo from "@/components/common/BookADemo";

type SecondaryCta = { label: string; href: string };

type PageHeroProps = {
  bgImage: string;
  bgAlt?: string;
  bgObjectPosition?: string;
  badge: string;
  heading: string;
  description: string;
  showBookADemo?: boolean;
  secondaryCta?: SecondaryCta;
};

export default function PageHero({
  bgImage,
  bgAlt = "",
  bgObjectPosition = "center",
  badge,
  heading,
  description,
  showBookADemo = false,
  secondaryCta,
}: Readonly<PageHeroProps>) {
  const hasCtas = showBookADemo || secondaryCta;

  return (
    <section className="relative min-h-[600px] overflow-hidden bg-[#030515] lg:min-h-[754px]">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={bgImage}
          alt={bgAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: bgObjectPosition }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1410px] px-6 lg:px-[60px]">
        <div className="flex flex-col justify-center gap-[30px] pt-[150px] pb-[100px] lg:min-h-[754px] lg:max-w-[700px] lg:py-[140px]">
          <span className="inline-flex w-fit items-center gap-[6px] rounded-full border border-white/15 bg-linear-to-b from-white/20 to-white/5 px-[13px] py-[9px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_8px_24px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md">
            <span className="size-[11px] rounded-full bg-[#86D58B] shadow-[0_0_8px_2px_rgba(134,213,139,0.6)]" />
            <span className="text-base leading-none text-white">{badge}</span>
          </span>

          <h1 className="text-[34px] font-black leading-[1.2] tracking-[0.5px] text-white sm:text-[44px] lg:text-[50px] lg:leading-[68px]">
            {heading}
          </h1>

          <p className="max-w-140 text-base leading-7 text-white lg:text-[20px] lg:leading-8">
            {description}
          </p>

          {hasCtas && (
            <div className="flex flex-wrap items-center gap-4">
              {showBookADemo && <BookADemo />}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-white/40 bg-white px-5 text-base font-bold text-[#516413] backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
