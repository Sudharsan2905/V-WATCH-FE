"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  useInView,
} from "motion/react";
import {
  tabBarVariant,
  tabItemVariant,
  panelImageReveal,
  panelHeadingReveal,
  panelItemsReveal,
  panelItemReveal,
  contentSwap,
  imageSwap,
  hoverSpring,
} from "../motionPresets";

const ITEM_DURATION = 5000;
const IMAGE_BLUR =
  "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAACQAQCdASoQAAsAA4BaJQ4ABYgDgwAA/vDkTH8gHqVybLxW4UavS/+YNsu0pDMpq96KUY0BGt8Q89p7ONGGRd3U4AA=";

type Item = { title: string; desc?: string };
type Tab = { key: string; num: string; subtitle: string; img: string; items: Item[] };
type Selection = { tab: number; item: number; cycle: number };

const TABS: Tab[] = [
  {
    key: "Workforce",
    num: "01",
    subtitle: "Managing people, identity, access, and activity",
    img: "/products/workforce.webp",
    items: [
      {
        title: "Person Management",
        desc: "Centralise and manage all workforce profiles with real-time identification, tracking, and activity visibility across your operations.",
      },
      { title: "Access Management", desc: "Managing work, workflows, and execution" },
      { title: "Profile & Pass Management", desc: "Managing people, identity, access, and activity" },
      { title: "Fatigue / Vital Monitoring", desc: "Managing people, identity, access, and activity"},
    ],
  },
  {
    key: "Operations",
    num: "02",
    subtitle: "Coordinating workflows, tasks, and execution",
    img: "/products/workforce.webp",
    items: [
      {
        title: "Task Management",
        desc: "Plan, assign, and track tasks from start to finish with full accountability across teams and sites.",
      },
      { title: "Workflow Automation" },
      { title: "SOP Compliance" },
      { title: "Incident Management" },
    ],
  },
  {
    key: "Logistics",
    num: "03",
    subtitle: "Tracking movement across your supply chain",
    img: "/products/workforce.webp",
    items: [
      {
        title: "Fleet Tracking",
        desc: "Monitor vehicles and goods in real time, from on-site movement to cross-border logistics.",
      },
      { title: "Route Optimisation" },
      { title: "Goods Movement" },
      { title: "Cross-border Visibility" },
    ],
  },
  {
    key: "Assets",
    num: "04",
    subtitle: "Monitoring equipment, usage, and maintenance",
    img: "/products/workforce.webp",
    items: [
      {
        title: "Asset Tracking",
        desc: "Track equipment location, usage, and condition with full visibility across every location.",
      },
      { title: "Usage Analytics" },
      { title: "Maintenance Scheduling" },
      { title: "Lifecycle Management" },
    ],
  },
  {
    key: "Safety",
    num: "05",
    subtitle: "Protecting people, sites, and compliance",
    img: "/products/workforce.webp",
    items: [
      {
        title: "Access Control",
        desc: "Control site access, monitor risks, and ensure safety standards are always met.",
      },
      { title: "Risk Monitoring" },
      { title: "Permit Management" },
      { title: "Standards Compliance" },
    ],
  },
  {
    key: "AI Intelligence",
    num: "06",
    subtitle: "Turning operational data into decisions",
    img: "/products/workforce.webp",
    items: [
      {
        title: "Predictive Insights",
        desc: "Surface trends and anomalies automatically so you can act before issues escalate.",
      },
      { title: "Anomaly Detection" },
      { title: "Smart Alerts" },
      { title: "Reporting & BI" },
    ],
  },
  {
    key: "Integrations",
    num: "07",
    subtitle: "Connecting your existing systems",
    img: "/products/workforce.webp",
    items: [
      {
        title: "API Access",
        desc: "Integrate with your existing infrastructure through open APIs and trusted system integrators.",
      },
      { title: "System Integrators" },
      { title: "Hardware Support" },
      { title: "Data Sync" },
    ],
  },
];

export default function CapabilityTabs() {
  const [{ tab, item, cycle }, setSelection] = useState<Selection>({
    tab: 0,
    item: 0,
    cycle: 0,
  });
  const active = TABS[tab];
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "0px 0px -20% 0px" });

  const [hasEntered, setHasEntered] = useState(false);
  useEffect(() => {
    if (!inView || hasEntered) return;
    const id = setTimeout(() => setHasEntered(true), 2300);
    return () => clearTimeout(id);
  }, [inView, hasEntered]);

  const itemsAnimate = inView ? "show" : "hidden";

  function selectTab(i: number) {
    setSelection((current) => ({
      tab: i,
      item: 0,
      cycle: current.cycle + 1,
    }));
  }

  function selectItem(i: number) {
    setSelection((current) => ({
      ...current,
      item: i,
      cycle: current.cycle + 1,
    }));
  }

  function advance() {
    setSelection((current) => {
      const nextItem = current.item + 1;

      if (nextItem < TABS[current.tab].items.length) {
        return { ...current, item: nextItem, cycle: current.cycle + 1 };
      }

      return { ...current, item: 0, cycle: current.cycle + 1 };
    });
  }

  return (
    <MotionConfig reducedMotion="user">
    <section className="relative overflow-hidden bg-white px-6 py-20 lg:px-[60px]">
      <div
        ref={sectionRef}
        className="relative z-10 mx-auto flex w-full max-w-[1410px] flex-col gap-10"
      >
        <LayoutGroup>
          <motion.div
            className="flex h-14 w-full items-center gap-2.5 overflow-x-auto rounded-full border-[1.25px] border-white/80 bg-[linear-gradient(180deg,rgba(233,238,255,0.6),rgba(193,236,255,0.6))] p-1.5 shadow-[6px_10px_23px_rgba(217,226,255,0.85),0_13px_100px_rgba(199,199,199,0.25)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            variants={tabBarVariant}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            {TABS.map((t, i) => (
              <motion.button
                key={t.key}
                type="button"
                onClick={() => selectTab(i)}
                variants={tabItemVariant}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={hoverSpring}
                className={`relative flex h-full flex-1 items-center justify-center whitespace-nowrap rounded-full px-4 text-[20px] font-medium transition-colors duration-300 ${
                  i === tab ? "text-white" : "text-[#202020] hover:text-[#0A4B6E]"
                }`}
              >
                {i === tab && (
                  <motion.span
                    layoutId="active-tab"
                    aria-hidden
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="pointer-events-none absolute inset-0 rounded-full border border-transparent [background:linear-gradient(180deg,#21B1F1,#9CDCFF)_padding-box,linear-gradient(180deg,rgba(255,255,255,0.83),rgba(255,255,255,0.2))_border-box] shadow-[0_6px_42px_0_rgba(212,240,255,0.4),2px_5px_14px_0_rgba(255,255,255,0.6),inset_0_-2px_27px_rgba(126,207,250,0.6)]"
                  />
                )}
                <span className="relative z-10">{t.key}</span>
              </motion.button>
            ))}
          </motion.div>
        </LayoutGroup>

        <div className="flex flex-col items-stretch gap-[30px] lg:flex-row lg:items-stretch">
          <motion.div
            className="relative h-[300px] overflow-hidden rounded-[32px] border border-white p-[15px] [background:linear-gradient(180deg,rgba(43,127,255,0.05),rgba(97,95,255,0.05))] shadow-[0_0_14px_0_rgba(79,194,255,0.1),0_0_26px_2px_rgba(92,183,232,0.16),inset_0_0_18px_6px_rgba(255,255,255,0.9)] sm:h-[380px] lg:h-[474px] lg:w-[614px] lg:shrink-0"
            variants={panelImageReveal}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <div
              className="relative h-full w-full overflow-hidden rounded-[24px]"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, #000 15%, #000 85%, transparent), linear-gradient(to bottom, transparent, #000 15%, #000 85%, transparent)",
                WebkitMaskComposite: "source-in",
                maskImage:
                  "linear-gradient(to right, transparent, #000 15%, #000 85%, transparent), linear-gradient(to bottom, transparent, #000 15%, #000 85%, transparent)",
                maskComposite: "intersect",
              }}
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={tab}
                  className="absolute inset-0"
                  variants={imageSwap}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <Image
                    src={active.img}
                    alt={`${active.key} illustration`}
                    fill
                    className="object-cover"
                    sizes="585px"
                    placeholder="blur"
                    blurDataURL={IMAGE_BLUR}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          <div className="flex flex-1 flex-col gap-5 lg:w-[508px]">
            <motion.div
              variants={panelHeadingReveal}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={tab}
                  className="flex items-start gap-4"
                  variants={contentSwap}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                <div className="flex flex-1 flex-col gap-1.5 text-[#0A4B6E]">
                  <p className="text-[26px] font-bold">{active.key}</p>
                  <p className="text-[20px] font-normal">{active.subtitle}</p>
                </div>
                <span className="flex size-[54px] shrink-0 items-center justify-center rounded-full border-2 border-white bg-[rgba(244,251,255,0.2)] text-[24px] font-extrabold text-[#3890c0] shadow-[9px_7px_60px_rgba(255,255,255,0.4),6px_10px_23px_rgba(217,226,255,0.85),0_13px_100px_rgba(199,199,199,0.25)]">
                  {active.num}
                </span>
                </motion.div>
              </AnimatePresence>
            </motion.div>
            <motion.div
              className="flex flex-1 flex-col justify-between gap-5 pt-2.5"
              variants={hasEntered ? undefined : panelItemsReveal}
              initial={hasEntered ? false : "hidden"}
              animate={hasEntered ? false : itemsAnimate}
            >
              {active.items.map((it, i) => {
                const isOpen = i === item;
                return (
                  <motion.button
                    key={it.title}
                    type="button"
                    onClick={() => selectItem(i)}
                    variants={hasEntered ? undefined : panelItemReveal}
                    className="flex w-full flex-col gap-2.5 text-left"
                  >
                    <motion.p
                      animate={{ color: isOpen ? "#5CB7E8" : "#0A4B6E", x: isOpen ? 8 : 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="text-[20px] font-bold"
                    >
                      {it.title}
                    </motion.p>
                    <AnimatePresence initial={false}>
                      {it.desc && isOpen && (
                        <motion.span
                          key="desc"
                          aria-hidden={!isOpen}
                          initial={{ opacity: 0, height: 0, y: 10 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: 0 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="block overflow-hidden"
                        >
                          <span className="block text-[18px] font-normal leading-[26px] text-[#5CB7E8]">
                            {it.desc}
                          </span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <span className="relative h-1.5 w-full overflow-hidden rounded-full bg-[#EAF3FB] shadow-[0_-2px_4px_rgba(156,220,255,0.10)]">
                      {isOpen && inView && (
                        <span
                          key={`${tab}-${item}-${cycle}`}
                          onAnimationEnd={advance}
                          className="absolute inset-0 w-full rounded-full bg-[linear-gradient(90deg,#4AC8FF,#7ECFFA)] shadow-[0_0_10px_1px_rgba(122,223,255,0.85)] [will-change:transform]"
                          style={{ animation: `progressGrow ${ITEM_DURATION}ms linear forwards` }}
                        />
                      )}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
    </MotionConfig>
  );
}
