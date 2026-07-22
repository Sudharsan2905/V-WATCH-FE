"use client";

import SiteVisibilityModule, {
  type ModuleContent,
} from "@/components/site-visibility/Module";

/* ------------------------------------------------------------------ *
 * Drop the supplied panel artwork at these exact paths:
 *   /public/site-visibility/modules/digital-site-access.png
 *   /public/site-visibility/modules/delivery-management.png
 * Both are 580×356 in the Figma.
 * ------------------------------------------------------------------ */
const MEDIA = (key: string) => `/site-visibility/${key}.svg`;

/* Figma pads each export canvas to fit the panel's drop shadow, so the SVG is
   larger than the 580×356 card. Both exports place the card at the same inset
   and only differ in canvas height, so that is the one parameter here. */
const panelFrame = (canvasH: number) => ({
  w: 639,
  h: canvasH,
  cardX: 29.1758,
  cardY: 26.8408,
  cardW: 580,
  cardH: 356,
});

const MODULES: ModuleContent[] = [
  {
    headline: "Know exactly who is on your site and why they’re allowed in.",
    body: "Digital passes, live headcount and enforced site rules give ops, security and project a single trusted view.",
    bullets: [
      {
        lead: "Digital access passes",
        rest: "issued per contractor, per project, per zone",
      },
      {
        lead: "Live headcount & muster",
        rest: "across gates and zones.",
      },
      {
        lead: "Enforced site rules",
        rest: "expired inductions denied at the gate.",
      },
      {
        lead: "Visitor & escort workflows",
        rest: "with full audit trail.",
      },
    ],
    cta: {
      label: "Explore Digital Site Access",
      href: "/digital-site-access",
    },
    media: {
      src: MEDIA("digital-site-access"),
      alt: "Digital site access — delivery management bay overview",
      frame: panelFrame(470),
    },
  },
  {
    headline: "Control what arrives, when it arrives, and where it goes.",
    body: "Every delivery booked into a slot, matched to a driver, tracked from ETA to unload no more chaos at the gate.",
    bullets: [
      {
        lead: "Slot-based bookings",
        rest: "across multiple bays, cranes and escorts.",
      },
      {
        lead: "Vehicle & driver check-in",
        rest: "at the gate with plate, manifest.",
      },
      {
        lead: "Early & late delivery alerts",
        rest: "to the right site contact.",
      },
      {
        lead: "Unplanned vehicle workflow",
        rest: "logged, approved & reported.",
      },
    ],
    cta: {
      label: "Explore Delivery Management",
      href: "/delivery-management",
    },
    media: {
      src: MEDIA("delivery-management"),
      alt: "Delivery management — access control preview",
      frame: panelFrame(474),
    },
    // Figma mirrors module 02: media on the left, copy on the right.
    reverse: true,
  },
];

export default function SiteVisibilityModules() {
  return (
    <section className="relative z-10 bg-[#F4FBFF] pt-[56px] pb-[56px] md:pt-[10px] md:pb-[60px] lg:pt-[20px] lg:pb-[80px]">
      <div className="w-full px-[24px] lg:px-[60px]">
        {/* Shared 1410 cap so every section on this page starts on the same x. */}
        <div className="mx-auto flex w-full max-w-[1410px] flex-col gap-[40px] lg:gap-[80px]">
          {MODULES.map((m) => (
            <SiteVisibilityModule key={m.headline} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
}
