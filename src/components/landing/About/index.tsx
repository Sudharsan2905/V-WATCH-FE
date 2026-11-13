import Image from "next/image";
import { ButtonLink, Eyebrow, Section, T } from "../ui";

const DEPLOYMENT_OPTIONS = [
  { label: "On-premises", icon: "/landing/icons/icon-on-prem.svg" },
  { label: "Cloud", icon: "/landing/icons/icon-cloud.svg" },
  { label: "Hybrid", icon: "/landing/icons/icon-hybrid.svg" },
] as const;

export default function About() {
  return (
    <Section
      id="about"
      aria-labelledby="about-title"
      innerClassName="flex flex-col gap-5 lg:gap-[70px]"
    >
      {/* Desktop row is 348px tall in Figma with both cards centred in it. */}
      <div className="flex flex-col gap-5 lg:min-h-[348px] lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        {/* About the company */}
        <article className="flex flex-col gap-[15px] lg:max-w-[564px]">
          <Eyebrow>About the company</Eyebrow>
          <h2 id="about-title" className={`${T.h3} text-[#122338]`}>
            V-Watch Ai by
            <br />
            SS Group International
          </h2>
          <p className={`${T.body} text-[#4E6174]`}>
            V-Watch Ai is the business process automation platform from SS
            Group International. It digitalises operational processes across
            industries, including workforce, access, compliance, assets,
            maintenance and site management.
          </p>
          <p className={`${T.body} text-[#4E6174]`}>
            Data centre construction and operations are one application of the
            wider platform.
          </p>
        </article>

        {/* Deployment */}
        <article
          aria-labelledby="deployment-title"
          className="flex flex-col gap-[9px] rounded-[5px] border border-[#DEEAEF] bg-[#F3F8FA] p-5 lg:max-w-[547px] lg:p-10"
        >
          <p className={`${T.eyebrow} text-[#28614D]`}>Deployment</p>
          <h3 id="deployment-title" className={`${T.h4} text-[#122338]`}>
            Deployment that fits your
            <br className="hidden lg:block" /> environment.
          </h3>
          <p className={`${T.points} text-[#4E6174]`}>
            Explore options based on your site’s operational, connectivity and
            IT requirements.
          </p>
          <ul className="flex flex-wrap gap-2">
            {DEPLOYMENT_OPTIONS.map((opt) => (
              <li
                key={opt.label}
                className="flex h-[44px] items-center gap-2 rounded-[5px] border border-[#D7E5EB] bg-white px-2.5"
              >
                <Image
                  src={opt.icon}
                  alt=""
                  width={22}
                  height={22}
                  unoptimized
                  className="size-[22px]"
                />
                <span className={`${T.pointsBold} text-[#23495D]`}>
                  {opt.label}
                </span>
              </li>
            ))}
          </ul>
          <p className={`${T.small} text-[#4E6174]`}>
            Options are subject to the agreed technical configuration.
          </p>
        </article>
      </div>

      {/* Where to begin */}
      <div
        className="relative overflow-hidden rounded-[5px] border border-[#CCE9DD] p-[30px] lg:p-[54px]"
        style={{
          background:
            "linear-gradient(111deg, #e7f8d9 0%, #e5f7ef 60%, #dff5f8 100%)",
        }}
      >
        {/* Fine diagonal rule pattern fading in towards the right edge. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-[48%]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(122deg, rgba(35,123,117,0.09) 0 1px, transparent 1px 24px)",
            maskImage: "linear-gradient(90deg, transparent 0%, #000 100%)",
            WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 100%)",
          }}
        />
        <div className="relative flex flex-col gap-[22px]">
          <div className="flex flex-col gap-1.5">
            <p className={`${T.eyebrow} text-[#28614D]`}>Where to begin</p>
            <h2 className={`${T.h3} max-w-[760px] text-[#19213D]`}>
              Start with the need. Connect the journey when it adds value.
            </h2>
            <p className={`${T.body} text-[#19213D]`}>
              Bring us the workflow you need to support, from construction site
              access to handover records or facility maintenance.
            </p>
          </div>
          <ButtonLink href="#book-demo" tone="dark" className="self-start">
            Talk to Us
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
