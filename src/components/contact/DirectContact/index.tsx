import ContactInfoPanel from "./ContactInfoPanel";
import ContactForm from "./ContactForm";

export default function DirectContact() {
  return (
    <section className="relative overflow-hidden bg-[#F2F8FE] px-6 pt-10 pb-20 lg:px-[60px] lg:pb-[120px]">
      <div className="mx-auto flex w-full max-w-[1160px] flex-col gap-[30px]">
        {/* Heading */}
        <header className="flex max-w-[552px] flex-col gap-2.5">
          <h2 className="text-[22px] font-bold leading-[28px] text-[#0A4B6E] sm:text-[26px] sm:leading-[31px]">
            Prefer to reach out directly?
          </h2>
          <p className="text-[16px] font-normal leading-[24px] text-[#0A4B6E] sm:text-[20px] sm:leading-[28px]">
            Get in touch with the right team faster through our direct contact
            channels.
          </p>
        </header>

        {/* Body: blue panel + form. Form overlaps on lg, stacks on mobile. */}
        <div className="relative">
          <ContactInfoPanel />

          {/* Form: stacks below on mobile; on lg sits at right:45px, vertically
              centered with a slight upward offset per Figma (top:50% - 563/2 - 20.5). */}
          <div className="mt-6 lg:absolute lg:right-[45px] lg:top-1/2 lg:mt-0 lg:-translate-y-[calc(50%+20px)]">
            <ContactForm />
          </div>

          {/* Availability microcopy — sits directly under the blue panel on lg,
              regardless of the absolute-positioned form on the right. */}
          <p className="mt-6 flex items-center gap-2 text-[14px] font-bold leading-[20px] text-[#0A8EC8] lg:mt-5">
            <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full border border-[#0A8EC8]">
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2 5l2 2 4-4"
                  stroke="#0A8EC8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Our team is available Monday–Friday, 9:00 AM – 5:00 PM.
          </p>
        </div>
      </div>
    </section>
  );
}
