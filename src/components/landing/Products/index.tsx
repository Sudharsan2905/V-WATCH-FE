"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { CheckList, CircleArrowButton, Eyebrow, Section, T } from "../ui";

type Product = {
  name: string;
  category: string;
  categoryColor: string;
  headerBg: string;
  headerBorder: string;
  icon: string;
  intro: string;
  features: string[];
};

const PRODUCTS: Product[] = [
  {
    name: "Atlas",
    category: "Construction site operations",
    categoryColor: "text-[#28614D]",
    headerBg:
      "radial-gradient(138.6% 130.1% at 98% 8%, #c2efd2 0%, rgba(194,239,210,0) 67%), #e9f8ef",
    headerBorder: "border-[#DCEBE3]",
    icon: "/landing/icons/icon-atlas-product.svg",
    intro:
      "Support the people, access and records involved in delivering a complex site.",
    features: [
      "Smart Access Control",
      "Delivery Management",
      "Real-Time Location",
      "Workforce Management",
      "Site Induction Training",
      "Environmental Management System (EMS)",
      "Man-Hour & Productivity",
      "Video Analytics (Ai Safety/PPE/Zones)",
      "Mobile App (Live Alerts & Incident Updates)",
    ],
  },
  {
    name: "Aegis",
    category: "Facility and operations management",
    categoryColor: "text-[#245C78]",
    headerBg:
      "radial-gradient(138.6% 130.1% at 98% 8%, #c0e7fb 0%, rgba(192,231,251,0) 67%), #e9f5fa",
    headerBorder: "border-[#DCEAF1]",
    icon: "/landing/icons/icon-aegis-product.svg",
    intro:
      "Support the Defects Liability Period and the work that keeps the facility running.",
    features: [
      "Asset Management",
      "Support & Maintenance",
      "Task Management",
      "Human Resource Management System (HRMS)",
      "Work Programme",
      "Power BI Reporting",
      "Remote Monitoring & Management (RMM)",
    ],
  },
];

export default function Products() {
  // Mobile shows one module at a time; each card's header carries the arrow
  // to the other module (Figma "Products Mobile"). Side by side from `lg`.
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    breakpoints: { "(min-width: 1024px)": { active: false } },
  });

  return (
    <Section
      id="products"
      aria-labelledby="products-title"
      innerClassName="flex flex-col gap-5 lg:gap-6"
    >
      <div className="flex flex-col gap-[15px]">
        <Eyebrow>The products</Eyebrow>
        <h2 id="products-title" className={`${T.h2} text-[#122338]`}>
          Choose the module that fits your project.
        </h2>
        <p className={`${T.body} text-[#4E6174]`}>
          Atlas and Aegis are separate modules on the V-Watch Ai platform. Use
          either module on its own or bring them together for construction,
          handover and operations.
        </p>
      </div>

      <div className="overflow-hidden lg:overflow-visible" ref={emblaRef}>
        <div className="-ml-4 flex lg:ml-0 lg:gap-[22px]">
          {PRODUCTS.map((product, i) => (
            <div
              key={product.name}
              className="min-w-0 flex-[0_0_100%] pl-4 lg:flex-1 lg:pl-0"
            >
              <article className="flex h-full flex-col overflow-hidden rounded-[5px] border border-[#DCE7EB] bg-white">
                <header
                  className={`relative flex min-h-[131px] items-center justify-between border-b px-5 py-5 lg:min-h-[139px] lg:px-[30px] ${product.headerBorder}`}
                  style={{ background: product.headerBg }}
                >
                  <div className="flex flex-col gap-1">
                    <p className={`${T.eyebrow} ${product.categoryColor}`}>
                      {product.category}
                    </p>
                    <h3 className={`${T.h3} text-[#122338]`}>{product.name}</h3>
                  </div>
                  <Image
                    src={product.icon}
                    alt=""
                    width={90}
                    height={90}
                    unoptimized
                    className="size-[70px] shrink-0 min-[420px]:size-[90px]"
                  />
                  {/* Mobile switcher (Figma "Products Mobile"): sits on the
                      header's bottom divider, 9px in from the card edge —
                      right on Atlas (→ Aegis), left on Aegis (← Atlas). */}
                  <CircleArrowButton
                    direction={i === 0 ? "next" : "prev"}
                    label={i === 0 ? "Show Aegis" : "Show Atlas"}
                    filled={false}
                    onClick={() =>
                      i === 0 ? emblaApi?.scrollNext() : emblaApi?.scrollPrev()
                    }
                    className={`absolute -bottom-[7px] z-10 lg:hidden ${
                      i === 0 ? "right-[9px]" : "left-[9px]"
                    }`}
                  />
                </header>
                <div className="flex flex-col gap-2.5 px-5 pb-5 pt-[15px] lg:gap-[17px] lg:px-[30px] lg:pb-[29px] lg:pt-[25px]">
                  <p className={`${T.pointsBold} text-[#4E6174]`}>
                    {product.intro}
                  </p>
                  <CheckList
                    items={product.features}
                    itemClassName={`${T.pointsBold} text-[#263E4D]`}
                    gapClassName="gap-[5px] lg:gap-[9px]"
                  />
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <p className={`${T.small} text-[#4E6174]`}>
        Feature availability depends on the agreed module, package and project
        configuration.
      </p>
    </Section>
  );
}
