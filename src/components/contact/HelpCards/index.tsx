import Image from "next/image";
import BookADemo from "@/components/common/BookADemo";

type CardProps = {
  iconSrc: string;
  title: string;
  desc: string;
  illustration: React.ReactNode;
  bgSrc?: string;
  bgPosition?: string;
  cta?: React.ReactNode;
  className?: string;
  textMaxWidth?: string;
};

const CARD_SHADOW =
  "shadow-[0px_5.08px_15.23px_rgba(56,144,192,0.16),inset_-4px_-4px_20px_rgba(255,255,255,0.6),inset_4px_4px_24px_rgba(255,255,255,0.6)]";

const ICON_BADGE_SHADOW =
  "shadow-[0px_5px_14px_rgba(92,183,232,0.14),inset_0px_0px_24px_rgba(62,159,254,0.04),inset_0px_0px_1.67px_rgba(184,230,255,0.08)]";

function IconBadge({ src }: Readonly<{ src: string }>) {
  return (
    <div
      className={`absolute left-[17.3px] top-[17.31px] z-10 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white ${ICON_BADGE_SHADOW}`}
    >
      <Image
        src={src}
        alt=""
        width={26}
        height={26}
        unoptimized
        className="h-[26px] w-[26px] object-contain"
      />
    </div>
  );
}

function HelpCard({
  iconSrc,
  title,
  desc,
  illustration,
  bgSrc,
  bgPosition = "center",
  cta,
  className = "",
  textMaxWidth,
}: Readonly<CardProps>) {
  return (
    <div
      className={`relative overflow-hidden rounded-[27.08px] border-[0.85px] border-white bg-white ${CARD_SHADOW} ${className}`}
    >
      {/* Pattern background (per-card decorative SVG) */}
      {bgSrc && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url(${bgSrc})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: bgPosition,
          }}
        />
      )}

      {/* Decorative corner blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-5 h-[96px] w-[96px] rounded-full"
        style={{
          background:
            "linear-gradient(230.92deg, rgba(57,175,253,0.3) -0.23%, rgba(71,127,255,0.3) 100.3%)",
          filter: "blur(69px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-5 -left-6 h-[96px] w-[96px] rounded-full"
        style={{
          background:
            "linear-gradient(230.92deg, rgba(57,175,253,0.3) -0.23%, rgba(71,127,255,0.3) 100.3%)",
          filter: "blur(69px)",
        }}
      />

      {illustration}

      <IconBadge src={iconSrc} />

      <div className="relative z-10 flex h-full flex-col gap-[8.46px] pl-[16.92px] pr-[16.92px] pt-[82.92px] pb-[16.92px]">
        <div
          className="flex flex-col gap-[8.46px]"
          style={textMaxWidth ? { maxWidth: textMaxWidth } : undefined}
        >
          <h3 className="text-[18px] font-bold leading-[22px] text-[#0F172A]">
            {title}
          </h3>
          <p className="text-[16px] font-normal leading-[22px] text-[#314158]">
            {desc}
          </p>
        </div>

        {cta && <div className="mt-[20.31px]">{cta}</div>}
      </div>
    </div>
  );
}

export default function HelpCards() {
  return (
    <section className="relative -mt-10 overflow-hidden rounded-t-[40px] bg-[#F2F8FE] px-6 py-10 lg:-mt-16 lg:rounded-t-[60px] lg:px-[60px]">
      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center gap-[30px]">
        {/* Heading */}
        <header className="flex w-full max-w-[1160px] flex-col gap-2.5">
          <h2 className="text-[22px] font-bold leading-[28px] text-[#0A4B6E] sm:text-[26px] sm:leading-[31px]">
            How Can We Help You?
          </h2>
          <p className="max-w-[735px] text-[16px] font-normal leading-[24px] text-[#0A4B6E] sm:text-[20px] sm:leading-[28px]">
            Connect with our team to explore solutions, get answers, and receive
            the support you need every step of the way.
          </p>
        </header>

        {/* Card grid with decorative background */}
        <div className="relative w-full max-w-[1160px]">
          {/* Decorative blurred ellipses behind cards */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[-68px] top-[206px] hidden h-[148px] w-[610px] rounded-full lg:block"
            style={{
              background: "rgba(10,142,200,0.3)",
              opacity: 0.5,
              filter: "blur(126px)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-[437px] top-[175px] hidden h-[172px] w-[810px] rounded-full lg:block"
            style={{
              background: "rgba(10,142,200,0.3)",
              opacity: 0.5,
              filter: "blur(126px)",
            }}
          />
          {/* Card layout: 1 col on mobile, 2 cols (left tall, right stack) on lg */}
          <div className="relative grid grid-cols-1 gap-[30px] lg:grid-cols-[406.15px_440px] lg:justify-center lg:gap-10 lg:px-10">
            {/* Left tall card */}
            <HelpCard
              iconSrc="/contact/icons/sales.svg"
              title="Sales & Product Enquiries"
              desc="Learn how V-Watch Ai can work for your operations"
              illustration={
                <>
                  <Image
                    src="/contact/cards/Ellipse 3585.svg"
                    alt=""
                    width={275}
                    height={275}
                    unoptimized
                    className="pointer-events-none absolute"
                    style={{
                      width: "300px",
                      height: "300px",
                      left: "80px",
                      top: "145px",
                    }}
                  />
                  <Image
                    src="/contact/cards/cardimage.svg"
                    alt=""
                    width={501}
                    height={334}
                    unoptimized
                    className="pointer-events-none absolute"
                    style={{
                      width: "440px",
                      height: "294px",
                      left: "-6px",
                      top: "130px",
                    }}
                  />
                </>
              }
              bgSrc="/contact/cards/bgpattern.svg"
              cta={<BookADemo noBorder />}
              className="min-h-[320px] lg:h-[440px]"
            />

            {/* Right stacked cards */}
            <div className="flex flex-col gap-[30px]">
              <HelpCard
                iconSrc="/contact/icons/general.svg"
                title="General Enquiries"
                desc="Ask questions about our platform, capabilities, or solutions"
                illustration={
                  <>
                    <Image
                      src="/contact/cards/Ellipse 3585.svg"
                      alt=""
                      width={182}
                      height={182}
                      unoptimized
                      className="pointer-events-none absolute"
                      style={{
                        width: "220px",
                        height: "220px",
                        left: "220px",
                        top: "0px",
                      }}
                    />
                    <Image
                      src="/contact/cards/general enquire image.svg"
                      alt=""
                      width={195}
                      height={130}
                      unoptimized
                      className="pointer-events-none absolute"
                      style={{
                        width: "195px",
                        height: "130px",
                        left: "245px",
                        top: "45px",
                      }}
                    />
                  </>
                }
                bgSrc="/contact/cards/bgpattern.svg"
                bgPosition="left center"
                className="min-h-[200px] lg:h-[203.08px]"
                textMaxWidth="235.23px"
              />
              <HelpCard
                iconSrc="/contact/icons/support.svg"
                title="Support Requests"
                desc="Get help with your current setup or technical issues"
                illustration={
                  <>
                    <Image
                      src="/contact/cards/Ellipse 3585.svg"
                      alt=""
                      width={182}
                      height={182}
                      unoptimized
                      className="pointer-events-none absolute"
                      style={{
                        width: "220px",
                        height: "220px",
                        left: "235px",
                        top: "0px",
                      }}
                    />
                    <Image
                      src="/contact/cards/support request image.svg"
                      alt=""
                      width={245}
                      height={163}
                      unoptimized
                      className="pointer-events-none absolute"
                      style={{
                        width: "245px",
                        height: "163px",
                        left: "205px",
                        top: "30px",
                      }}
                    />
                  </>
                }
                bgSrc="/contact/cards/bgpattern.svg"
                bgPosition="left center"
                className="min-h-[200px] lg:h-[203.08px]"
                textMaxWidth="235.23px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
