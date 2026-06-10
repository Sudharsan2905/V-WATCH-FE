import Image from "next/image";

// "Built to perform at scale" — composed from the exact Figma layer exports so
// it matches the design 1:1. On md+ the layers sit on a fixed-aspect "stage"
// positioned in %, so the whole graphic scales as one unit. Below md it falls
// back to a stacked layout (cluster → image → card list) so nothing is too
// small to read.
//   • glow-outer / glow-mid / glow-bulb.png — left rocket backdrop (3 ellipses)
//   • rocket.png  — rocket, centred on the bulb
//   • dots.png    — accent dots around the cluster
//   • bullet.png  — centre command-centre image (caption baked in)
//   • bow.png     — concentric arc that the cards' nodes sit on
//   • card-1/2/3.png — the three capability icons
// (Figma node 215:8382)

// On md+ each card is placed absolutely (top/left/width) so its glow-node lands
// on the bow curve. The bow bulges right toward the cards, so the middle card
// sits right-most. These coords are ignored in the stacked mobile layout.
type Card = {
  icon: string;
  text: string;
  top: string;
  left: string;
  width: string;
  highlight?: boolean;
};

const CARDS: Card[] = [
  { icon: "/home/card-1.png", text: "Monitor up to 100,000 profiles per site", top: "8%", left: "60%", width: "37%" },
  {
    icon: "/home/card-2.png",
    text: "Real-time data processing across multiple operations",
    top: "33%",
    left: "64%",
    width: "33%",
    highlight: true,
  },
  {
    icon: "/home/card-3.png",
    text: "Built for scalability across large and distributed environments",
    top: "63%",
    left: "62%",
    width: "35%",
  },
];

// The 3 concentric glow ellipses + rocket. Fills its parent; the parent sets
// the size/position, the inner %s keep the assets' native ratios intact.
function RocketCluster() {
  return (
    <>
      <Image src="/home/glow-outer.png" alt="" fill className="object-contain" priority />
      <div className="absolute" style={{ left: "2%", top: "15.9%", width: "68.7%", aspectRatio: "387 / 313" }}>
        <Image src="/home/glow-mid.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute" style={{ left: "1%", top: "34.65%", width: "33.2%", aspectRatio: "1 / 1" }}>
        <Image src="/home/glow-bulb.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute" style={{ left: "3%", top: "40.4%", width: "23.4%", aspectRatio: "132 / 134" }}>
        <Image src="/home/rocket.png" alt="V-Watch Ai rocket" fill className="object-contain" />
      </div>
    </>
  );
}

// The visual card itself (node + icon + text). Positioning/width is controlled
// by the parent so it can be reused in both the absolute stage and the stack.
function CardBody({ icon, text, highlight }: Readonly<Pick<Card, "icon" | "text" | "highlight">>) {
  return (
    <div
      className={`relative flex items-center gap-3.5 rounded-[18px] px-4 py-3.5 backdrop-blur-md ${
        highlight
          ? "border border-white/70 bg-[rgba(226,241,252,0.55)] shadow-[0_14px_40px_rgba(120,170,215,0.18)]"
          : "border border-white/60 bg-white/35 shadow-[0_10px_30px_rgba(120,170,215,0.10)]"
      }`}
    >
      {/* Glow node on the left edge — the small white circle in the design */}
      <span className="absolute -left-3.5 top-1/2 size-7 -translate-y-1/2 rounded-full bg-white shadow-[0_6px_16px_-3px_rgba(56,144,192,0.45)]" />
      {/* Icon sits directly on the card (no badge) */}
      <span className="relative size-7 shrink-0">
        <Image src={icon} alt="" fill className="object-contain" />
      </span>
      <p className="text-[clamp(13px,1.15vw,16px)] font-semibold leading-tight text-[#0A4B6E]">{text}</p>
    </div>
  );
}

export default function BuiltToScale() {
  return (
    <section className="bg-white px-6 py-16 lg:px-[60px] lg:py-20">
      <div className="mx-auto w-full max-w-[1410px]">
        <div className="mx-auto w-full max-w-[1160px]">
          {/* Heading */}
          <div className="max-w-[860px]">
            <h2 className="text-[22px] font-bold text-[#0A4B6E] sm:text-[26px]">Built to perform at scale</h2>
            <p className="mt-2.5 text-base font-normal leading-[24px] text-[#0A4B6E] sm:text-[20px] sm:leading-[26px]">
              V-Watch Ai is designed for high-volume, high-complexity environments delivering
              real-time performance without compromise.
            </p>
          </div>

          {/* ── md+ : layered stage (scales as one unit) ── */}
          <div className="relative mt-8 hidden w-full md:block" style={{ aspectRatio: "1221 / 392" }}>
            {/* Left cluster: 3 concentric glow ellipses + rocket */}
            <div
              className="absolute"
              style={{ left: "5%", top: "50%", width: "43%", aspectRatio: "563 / 459", transform: "translateY(-50%)" }}
            >
              <RocketCluster />
            </div>

            {/* Accent dots */}
            <div
              className="absolute"
              style={{ left: "4%", top: "50%", width: "17%", aspectRatio: "239 / 313", transform: "translateY(-50%)" }}
            >
              <Image src="/home/dots.png" alt="" fill className="object-contain" />
            </div>

            {/* Centre command-centre image (caption baked in) */}
            <div
              className="absolute"
              style={{ left: "20%", top: "50%", width: "40%", aspectRatio: "516 / 271", transform: "translateY(-50%)" }}
            >
              <Image
                src="/home/bullet.png"
                alt="When operations scale, V-Watch Ai scales with you, without loss of visibility or control."
                fill
                className="object-contain"
                sizes="600px"
                priority
              />
            </div>

            {/* Bow — concentric arc the card nodes rest on */}
            <div
              className="absolute"
              style={{ left: "48%", top: "52%", width: "22%", aspectRatio: "291 / 459", transform: "translateY(-50%)" }}
            >
              <Image src="/home/bow.png" alt="" fill className="object-contain" />
            </div>

            {/* Capability cards — fanned so each node lands on the bow */}
            {CARDS.map((c) => (
              <div key={c.text} className="absolute" style={{ top: c.top, left: c.left, width: c.width }}>
                <CardBody icon={c.icon} text={c.text} highlight={c.highlight} />
              </div>
            ))}
          </div>

          {/* ── below md : stacked layout ── */}
          <div className="mt-10 flex flex-col items-center gap-9 md:hidden">
            {/* Command-centre image */}
            <div className="relative aspect-[516/271] w-full max-w-[480px]">
              <Image
                src="/home/bullet.png"
                alt="When operations scale, V-Watch Ai scales with you, without loss of visibility or control."
                fill
                className="object-contain"
                sizes="(max-width: 480px) 100vw, 480px"
              />
            </div>

            {/* Capability cards — simple vertical list */}
            <div className="flex w-full max-w-[480px] flex-col gap-5 pl-3">
              {CARDS.map((c) => (
                <CardBody key={c.text} icon={c.icon} text={c.text} highlight={c.highlight} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
