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
    eyebrow: "Module 01 · Digital Site Access",
    headline: "Know exactly who is on your site and why they’re allowed in.",
    body: "Replace paper sign-in, guesswork at the gate and hunting for the latest induction spreadsheet. Digital passes, live headcount and enforced site rules give security, project directors and operations a single, trusted view of every person on site.",
    bullets: [
      {
        lead: "Digital access passes",
        rest: "issued per contractor, per project, per zone — with photo, induction status and expiry.",
      },
      {
        lead: "Live headcount & muster",
        rest: "across gates and zones, ready for evacuation drills and incident response.",
      },
      {
        lead: "Enforced site rules",
        rest: "— expired inductions, missing RAMS or unapproved companies denied at the gate, not after the fact.",
      },
      {
        lead: "Visitor & escort workflows",
        rest: "for client tours, auditors and one-off engineers with full audit trail.",
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
    eyebrow: "Module 02 · Delivery Management",
    headline: "Control what arrives, when it arrives, and where it goes.",
    body: "Bring order to loading bays, gate queues and unloading conflicts. Every delivery is booked into a slot, matched to a vehicle and driver, and tracked from ETA to unload so the site team, the security team and the client are all working from the same live picture.",
    bullets: [
      {
        lead: "Slot-based bookings",
        rest: "across multiple bays, cranes and escorts with automatic conflict detection.",
      },
      {
        lead: "Vehicle & driver check-in",
        rest: "at the gate with plate, manifest, RAMS and escort assignment in one flow.",
      },
      {
        lead: "Early & late delivery alerts",
        rest: "— the platform notifies the right site contact before the truck disrupts the programme.",
      },
      {
        lead: "Unplanned vehicle workflow",
        rest: "so unexpected arrivals still get logged, approved and reported — never invisible.",
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
    <section className="relative z-10 bg-[#F4FBFF] py-[56px] md:py-[10px] lg:py-[20px]">
      <div className="w-full px-[24px] lg:px-[60px]">
        {/* Shared 1410 cap so every section on this page starts on the same x. */}
        <div className="mx-auto flex w-full max-w-[1410px] flex-col gap-[40px] lg:gap-[80px]">
          {MODULES.map((m) => (
            <SiteVisibilityModule key={m.eyebrow} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
}
