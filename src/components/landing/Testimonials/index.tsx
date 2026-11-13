"use client";

import useEmblaCarousel from "embla-carousel-react";

type Testimonial = {
  quote: string;
  name: string;
  detail: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "SS Surveillance & Communication delivered the ACS package on the CMC1 - Mutiara Line to programme and to specification. Site workforce compliance and automatic headcount were managed through the site access system deployed by SS Surveillance & Communication.",
    name: "SRS LRT Sdn Bhd · Gamuda",
    detail: "Penang LRT Mutiara Line",
  },
  {
    quote:
      "Working with SS TECH on the Tuas Reclamation Water Plant project has significantly elevated our site safety and access management. Their V-Watch AI platform and turnstile setup eliminated site access congestion completely.",
    name: "Balraj Mathivanan, Project Manager",
    detail: "McConnell Dowell · Tuas Water Reclamation Plant",
  },
];

function QuoteMark() {
  return (
    <svg
      width="41"
      height="30"
      viewBox="0 0 41 30"
      fill="none"
      aria-hidden
      className="h-[26px] w-auto lg:h-[30px]"
    >
      <path
        d="M14.76 0H2.46C1.80757 0 1.18186 0.263392 0.720517 0.732233C0.259178 1.20107 0 1.83696 0 2.5V15.8333C0 16.4964 0.259178 17.1323 0.720517 17.6011C1.18186 18.0699 1.80757 18.3333 2.46 18.3333H15.58V20.8333C15.58 22.8225 14.8025 24.7301 13.4184 26.1366C12.0344 27.5432 10.1573 28.3333 8.2 28.3333C7.98252 28.3333 7.77395 28.4211 7.62017 28.5774C7.46639 28.7337 7.38 28.9457 7.38 29.1667C7.38 29.3877 7.46639 29.5996 7.62017 29.7559C7.77395 29.9122 7.98252 30 8.2 30C10.5914 29.9972 12.8841 29.0306 14.5751 27.3121C16.2661 25.5936 17.2173 23.2636 17.22 20.8333V2.5C17.22 1.83696 16.9608 1.20107 16.4995 0.732233C16.0381 0.263392 15.4124 0 14.76 0ZM15.58 16.6667H2.46C2.24252 16.6667 2.03395 16.5789 1.88017 16.4226C1.72639 16.2663 1.64 16.0543 1.64 15.8333V2.5C1.64 2.27899 1.72639 2.06702 1.88017 1.91074C2.03395 1.75446 2.24252 1.66667 2.46 1.66667H14.76C14.9775 1.66667 15.186 1.75446 15.3398 1.91074C15.4936 2.06702 15.58 2.27899 15.58 2.5V16.6667ZM38.54 0H26.24C25.5876 0 24.9619 0.263392 24.5005 0.732233C24.0392 1.20107 23.78 1.83696 23.78 2.5V15.8333C23.78 16.4964 24.0392 17.1323 24.5005 17.6011C24.9619 18.0699 25.5876 18.3333 26.24 18.3333H39.36V20.8333C39.36 22.8225 38.5825 24.7301 37.1984 26.1366C35.8144 27.5432 33.9373 28.3333 31.98 28.3333C31.7625 28.3333 31.554 28.4211 31.4002 28.5774C31.2464 28.7337 31.16 28.9457 31.16 29.1667C31.16 29.3877 31.2464 29.5996 31.4002 29.7559C31.554 29.9122 31.7625 30 31.98 30C34.3714 29.9972 36.6641 29.0306 38.3551 27.3121C40.0461 25.5936 40.9973 23.2636 41 20.8333V2.5C41 1.83696 40.7408 1.20107 40.2795 0.732233C39.8181 0.263392 39.1924 0 38.54 0ZM39.36 16.6667H26.24C26.0225 16.6667 25.814 16.5789 25.6602 16.4226C25.5064 16.2663 25.42 16.0543 25.42 15.8333V2.5C25.42 2.27899 25.5064 2.06702 25.6602 1.91074C25.814 1.75446 26.0225 1.66667 26.24 1.66667H38.54C38.7575 1.66667 38.966 1.75446 39.1198 1.91074C39.2736 2.06702 39.36 2.27899 39.36 2.5V16.6667Z"
        fill="#0A8EC8"
      />
    </svg>
  );
}

function Stars() {
  return (
    <div
      className="flex py-[7px]"
      role="img"
      aria-label="Rated 5 out of 5"
      style={{
        background:
          "linear-gradient(90deg, rgba(26,64,81,0) 0%, #1a4051 50%, rgba(26,64,81,0) 100%)",
      }}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          aria-hidden
          className="size-5 lg:size-6"
        >
          <path
            d="M12.4657 17.9953C12.1743 17.8417 11.8258 17.8416 11.5342 17.9949L7.62164 20.052C6.888 20.4377 6.03054 19.8147 6.17068 18.9978L6.91812 14.6406C6.97381 14.3159 6.86605 13.9847 6.63002 13.7549L3.46097 10.6702C2.8667 10.0917 3.1943 9.08289 4.01506 8.96394L8.38655 8.33039C8.71241 8.28317 8.99413 8.07856 9.13985 7.78329L11.0963 3.81897C11.4632 3.07571 12.523 3.07571 12.8898 3.81897L14.8463 7.78329C14.992 8.07856 15.2738 8.28317 15.5996 8.33039L19.9711 8.96394C20.7919 9.08289 21.1195 10.0917 20.5252 10.6702L17.3561 13.7549C17.1201 13.9847 17.0124 14.3159 17.068 14.6406L17.8151 18.9954C17.9553 19.8128 17.0969 20.4358 16.3633 20.0492L12.4657 17.9953Z"
            fill="#0A8EC8"
          />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ quote, name, detail }: Readonly<Testimonial>) {
  return (
    <figure
      className="flex h-full flex-col gap-2.5 rounded-[5px] border border-[#416173] p-[30px] shadow-[0_26px_64px_rgba(2,8,14,0.10)] lg:gap-5 lg:p-10"
      style={{
        background:
          "linear-gradient(90deg, #1a4051 -21%, #12283a 66.8%, #0d2031 123%)",
      }}
    >
      <div className="flex items-start justify-between gap-5">
        <QuoteMark />
        <Stars />
      </div>
      <blockquote className="text-[13px] leading-[1.6] text-[#C7DBE5] lg:text-[16px]">
        {quote}
      </blockquote>
      <figcaption className="flex items-center gap-2.5">
        <span aria-hidden className="h-0.5 w-[21px] shrink-0 bg-[#A6C936]" />
        <span className="text-[11px] leading-[1.6] text-[#A6C936] lg:text-[14px]">
          <span className="block font-bold">{name}</span>
          <span className="block">{detail}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  // Swipeable on mobile; from `lg` the carousel switches off and the two
  // cards sit side by side.
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    breakpoints: { "(min-width: 1024px)": { active: false } },
  });

  return (
    <section
      aria-label="What our customers say"
      className="px-5 pb-10 lg:px-10 lg:pb-[110px]"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="overflow-hidden lg:overflow-visible" ref={emblaRef}>
          <div className="-ml-[30px] flex lg:ml-0 lg:gap-[70px]">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="min-w-0 flex-[0_0_100%] pl-[30px] lg:flex-1 lg:pl-0"
              >
                <TestimonialCard {...t} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
