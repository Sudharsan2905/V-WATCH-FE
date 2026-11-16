"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { Check, Eyebrow, Section, T } from "../ui";

// A feature is either a plain item or a group with nested items (Aegis → CMMS).
type Feature = string | { title: string; items: string[] };

type Product = {
  name: string;
  category: string;
  categoryColor: string;
  headerBg: string;
  headerBorder: string;
  icon: string;
  intro: string;
  features: Feature[];
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
    // CMMS is a headline keyword, so the maintenance features sit under it.
    features: [
      {
        title: "Computerised Maintenance Management System (CMMS)",
        items: [
          "Asset Management",
          "Support & Maintenance",
          "Task Management",
          "Work Programme",
          "Power BI Reporting",
        ],
      },
      "Human Resource Management System (HRMS)",
      "Remote Monitoring & Management (RMM)",
    ],
  },
];

function Chevron({ up = false }: Readonly<{ up?: boolean }>) {
  return (
    <svg
      width="9"
      height="5"
      viewBox="0 0 9 5"
      fill="none"
      aria-hidden
      className={`shrink-0 ${up ? "rotate-180" : ""}`}
    >
      <path
        d="M.75.75 4.5 4.25 8.25.75"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const TOGGLE =
  "group inline-flex items-center gap-[5px] self-start text-[10px] font-[600] leading-[1.2] text-[#0A8EC8] transition-colors hover:text-[#0A6E9C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A8EC8] lg:hidden";

function FeatureList({ features }: Readonly<{ features: Feature[] }>) {
  const itemText = `${T.pointsBold} text-[#263E4D]`;
  return (
    <ul className="flex flex-col gap-[5px] lg:gap-[9px]">
      {features.map((feature) => {
        const title = typeof feature === "string" ? feature : feature.title;
        return (
          <li key={title}>
            <div className="flex items-start gap-[9px]">
              <Check className="lg:mt-[2px]" />
              <span
                className={
                  typeof feature === "string" ? itemText : `${itemText} font-bold`
                }
              >
                {title}
              </span>
            </div>
            {typeof feature !== "string" && (
              // Sub-items align under the group title (check 17px + 9px gap).
              <ul className="ml-[26px] mt-[5px] flex flex-col gap-[5px] lg:mt-[7px] lg:gap-[7px]">
                {feature.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span
                      aria-hidden
                      className="mt-[7px] size-[3px] shrink-0 rounded-full bg-[#7A8DA1] lg:mt-[10px]"
                    />
                    <span className={`${T.points} text-[#4E6174]`}>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}

// One module card. On mobile the feature list is collapsed behind "See full
// features" (Figma "Atlas Mobile" / "Aegis Mobile"); from `lg` the list is
// always shown and the toggles disappear.
function ProductCard({ product }: Readonly<{ product: Product }>) {
  const [open, setOpen] = useState(false);
  const listId = useId();

  return (
    <article className="flex flex-col overflow-hidden rounded-[5px] border border-[#DCE7EB] bg-white lg:flex-1">
      <header
        className={`flex min-h-[131px] items-center justify-between border-b px-5 py-5 lg:min-h-[139px] lg:px-[30px] ${product.headerBorder}`}
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
      </header>

      <div className="flex flex-col px-5 pb-5 pt-[15px] lg:px-[30px] lg:pb-[29px] lg:pt-[25px]">
        <p className={`${T.pointsBold} text-[#4E6174]`}>{product.intro}</p>

        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={false}
            aria-controls={listId}
            className={`${TOGGLE} mt-2.5`}
          >
            See full features
            <Chevron />
          </button>
        )}

        {/* Collapsed on mobile only: the row animates between 0fr and 1fr, and
            `invisible` keeps the hidden list out of the tab order and away
            from screen readers until it's opened (`lg:visible` always shows
            it on desktop). */}
        <div
          id={listId}
          className={`grid transition-[grid-template-rows,visibility] duration-300 ease-out motion-reduce:transition-none lg:visible lg:grid-rows-[1fr] ${
            open ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            {/* flex column: keeps the inline "View less" link from picking up
                extra line-height from the parent's text strut. */}
            <div className="flex flex-col pt-2.5 lg:pt-[17px]">
              <FeatureList features={product.features} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-expanded
                aria-controls={listId}
                className={`${TOGGLE} mt-2.5`}
              >
                View less
                <Chevron up />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Products() {
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

      {/* Stacked on mobile (both titles visible), side by side from `lg`. */}
      <div className="flex flex-col gap-5 lg:flex-row lg:gap-[22px]">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>

      <p className={`${T.small} text-[#4E6174]`}>
        Feature availability depends on the agreed module, package and project
        configuration.
      </p>
    </Section>
  );
}
