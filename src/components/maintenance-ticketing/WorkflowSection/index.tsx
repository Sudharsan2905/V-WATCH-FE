"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import {
  wipeTop,
  fadeUp,
  scaleIn,
  staggerContainer,
  viewportReveal,
} from "@/components/about/anim";

// ─── Timeline Step Indicators ─────────────────────────────────────────────────

function StepCompleted() {
  return (
    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-[3.75px] border-white bg-[#3B82F6] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
      <Image
        src="/icons/tick.svg"
        alt=""
        width={12}
        height={12}
        aria-hidden="true"
      />
    </div>
  );
}

function StepActive() {
  return (
    <div className="relative flex h-6 w-6 shrink-0 items-center justify-center">
      {/* Outer halo — 63×63px translucent indigo ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: "63.04px",
          height: "63.04px",
          background: "rgba(129, 140, 248, 0.30)",
          opacity: 0.3297,
        }}
      />
      <div className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-[3.75px] border-white bg-[#6366F1] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
        <div className="h-2 w-2 rounded-full bg-[#A5B4FC]" />
      </div>
    </div>
  );
}

function StepPending() {
  return (
    <div className="h-6 w-6 shrink-0 rounded-full border-[3.75px] border-white bg-[#CBD5E1] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]" />
  );
}

// ─── Card Icon Backgrounds ────────────────────────────────────────────────────

const ACTIVE_ICON_BG =
  "linear-gradient(225deg, #5CB7E8 14.64%, #3890C0 85.36%)";
const DEFAULT_ICON_BG =
  "linear-gradient(225deg, rgba(92,183,232,0.10) 14.64%, rgba(56,144,192,0.10) 85.36%)";

function CardIconWrap({
  bg,
  children,
  active,
}: {
  bg: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl p-2 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05)] transition-all duration-500"
      style={{ background: bg }}
    >
      {/* Filter applied to icon only — keeps gradient background unaffected */}
      <div
        style={{
          filter: active
            ? "brightness(0) invert(1)"
            : "brightness(1) invert(0)",
          transition: "filter 0.5s",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Small check / progress icons used inside cards ───────────────────────────

function CheckDone() {
  return (
    <span className="flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-[4px] bg-[#10B981] p-[3px]">
      <Image
        src="/icons/execute-check-done.svg"
        alt=""
        width={8}
        height={8}
        aria-hidden="true"
      />
    </span>
  );
}

function CheckInProgress() {
  return (
    <span className="flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-[4px] bg-[#3890C0] p-[3px]">
      <span className="h-[8px] w-[8px] shrink-0 rounded-full bg-white" />
    </span>
  );
}

function CheckPending() {
  return (
    <span className="h-[14px] w-[14px] shrink-0 rounded-[4px] border-[1.25px] border-[#CBD5E1]" />
  );
}

// ─── Stage Card Components ────────────────────────────────────────────────────

function CardHeader({
  icon,
  title,
  stage,
}: {
  icon: React.ReactNode;
  title: string;
  stage: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <p className="text-[18px] font-bold leading-normal text-[#334155]">
          {title}
        </p>
        <p className="text-[12px] font-normal text-[#1D6C97]">{stage}</p>
      </div>
    </div>
  );
}

function RequestCard({ isActive }: { isActive?: boolean }) {
  return (
    <div className="flex flex-col gap-4">
      <CardHeader
        icon={
          <CardIconWrap
            bg={isActive ? ACTIVE_ICON_BG : DEFAULT_ICON_BG}
            active={isActive}
          >
            <Image
              src="/icons/maintenance-request.svg"
              alt=""
              width={18}
              height={16}
              aria-hidden="true"
            />
          </CardIconWrap>
        }
        title="Request"
        stage="Stage 01"
      />
      <div
        className="flex flex-col items-start gap-3 rounded-[14px] border-[1.25px] border-[#F1F5F9] p-[13px]"
        style={{
          background: "linear-gradient(225deg, #F8FAFC 14.64%, #FFF 85.36%)",
        }}
      >
        <div className="flex w-full items-center gap-2">
          <Image
            src="/icons/request-doc.svg"
            alt=""
            width={11}
            height={13}
            aria-hidden="true"
          />
          <div className="h-1.5 flex-1 rounded bg-[#E2E8F0]" />
        </div>
        <div className="flex w-full items-center gap-2">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#CBD5E1]" />
          <div className="h-1.5 flex-1 rounded bg-[#E2E8F0]" />
        </div>
        <div className="flex w-full items-center gap-2">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#CBD5E1]" />
          <div className="h-1.5 w-3/4 rounded bg-[#E2E8F0]" />
        </div>
        <div className="flex w-full items-center gap-2">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#CBD5E1]" />
          <div className="h-1.5 w-5/6 rounded bg-[#E2E8F0]" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 text-[11px] text-[#64748B]">
          <Image
            src="/icons/request-calendar.svg"
            alt=""
            width={15}
            height={17}
            aria-hidden="true"
          />
          10:42 AM
        </span>
        <span className="flex items-center justify-center rounded-full border-[1.25px] border-[#D1FAE5] bg-[#ECFDF5] px-[14px] py-1 text-[10px] font-semibold text-[#16a34a]">
          Verified
        </span>
      </div>
    </div>
  );
}

function AssignCard({ isActive }: { isActive?: boolean }) {
  return (
    <div className="flex flex-col gap-4">
      <CardHeader
        icon={
          <CardIconWrap
            bg={isActive ? ACTIVE_ICON_BG : DEFAULT_ICON_BG}
            active={isActive}
          >
            <Image
              src="/icons/assign-user-check.svg"
              alt=""
              width={20}
              height={20}
              aria-hidden="true"
            />
          </CardIconWrap>
        }
        title="Assign"
        stage="Stage 02"
      />
      <div
        className="flex flex-col items-start gap-3 self-stretch rounded-[14px] border-[1.25px] border-[#DBEAFE] p-[10px]"
        style={{
          background: "linear-gradient(225deg, #EFF6FF 14.64%, #FFF 85.36%)",
        }}
      >
        <div className="flex w-full items-center gap-2">
          <Image
            src="/icons/assign-team.svg"
            alt=""
            width={13}
            height={12}
            aria-hidden="true"
          />
          <span className="text-[10px] font-bold leading-[15px] text-[#475569]">
            Team Alpha
          </span>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0a8ec8] text-[10px] font-bold text-white ring-2 ring-white">
              JD
            </div>
            <div className="-ml-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#6366F1] text-[10px] font-bold text-white ring-2 ring-white">
              AS
            </div>
            <div className="relative -ml-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#F1F5F9] ring-2 ring-white">
              <Image
                src="/icons/assign-person-pending.svg"
                alt=""
                width={12}
                height={12}
                aria-hidden="true"
              />
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-[#3890C0] opacity-60 ring-1 ring-white" />
            </div>
          </div>
          <span className="text-[14px] font-black leading-[15px] text-[rgba(71,85,105,0.60)]">
            +546
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-normal leading-[13.5px] text-[#94A3B8]">
          ETA: 15 mins
        </span>
        <span className="flex items-center justify-center rounded-full border-[1.25px] border-[#DBEAFE] bg-[#EFF6FF] px-[9px] py-[3px] text-[10px] font-semibold text-[#3B82F6]">
          Dispatched
        </span>
      </div>
    </div>
  );
}

function ExecuteCard({ isActive }: { isActive?: boolean }) {
  return (
    <div className="flex h-full flex-col gap-3">
      <CardHeader
        icon={
          <CardIconWrap
            bg={isActive ? ACTIVE_ICON_BG : DEFAULT_ICON_BG}
            active={isActive}
          >
            {/* unoptimized: bypasses Next.js image cache (SVG fill was changed after first cache write) */}
            <Image
              src="/icons/execute-settings.svg"
              alt=""
              width={19}
              height={20}
              aria-hidden="true"
              unoptimized
            />
          </CardIconWrap>
        }
        title="Execute"
        stage="Stage 03"
      />
      <div
        className="relative flex min-h-0 flex-1 flex-col gap-2 overflow-hidden rounded-[14px] border-[1.25px] border-[#E0E7FF] px-[10px] pt-[10px] pb-4"
        style={{
          background: "linear-gradient(225deg, #EEF2FF 14.64%, #FFF 85.36%)",
        }}
      >
        {/* Translucent centre-highlight overlay — separate from content so text stays fully opaque */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(270deg, rgba(56,144,192,0.00) 0%, rgba(56,144,192,0.10) 50%, rgba(56,144,192,0.00) 100%)",
            opacity: 0.5562,
          }}
        />
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[10px] font-medium leading-[15px] text-[#4338CA]">
            <Image
              src="/icons/execute-active.svg"
              alt=""
              width={14}
              height={14}
              aria-hidden="true"
            />
            Active
          </span>
          <span className="flex items-center gap-1 text-[10px] font-normal text-[#64748B]">
            <Image
              src="/icons/execute-lightning.svg"
              alt=""
              width={11}
              height={12}
              aria-hidden="true"
            />
            00:45:12
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#64748B]">Progress</span>
            <span className="font-bold text-[#0a8ec8]">68%</span>
          </div>
          <div className="h-1.5 w-full self-stretch overflow-hidden rounded-full bg-[#F1F5F9]">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(270deg, #5CB7E8 0%, #3890C0 100%)",
              }}
              initial={{ width: 0 }}
              whileInView={{ width: "68%" }}
              viewport={viewportReveal}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-[10px] self-stretch">
          <div className="flex items-center gap-2 self-stretch">
            <CheckDone />
            <span className="text-[10px] font-normal leading-[15px] text-[#94A3B8]">
              Safety check
            </span>
          </div>
          <div className="flex items-center gap-2 self-stretch">
            <CheckInProgress />
            <span className="text-[10px] font-medium leading-[15px] text-[#4338CA]">
              Repair in progress
            </span>
          </div>
          <div className="flex items-center gap-2 self-stretch">
            <CheckPending />
            <span className="text-[10px] font-normal leading-[15px] text-[#94A3B8]">
              Final inspection
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function VerifyCard({ isActive }: { isActive?: boolean }) {
  return (
    <div className="flex h-full flex-col gap-[10px]">
      <CardHeader
        icon={
          <CardIconWrap
            bg={isActive ? ACTIVE_ICON_BG : DEFAULT_ICON_BG}
            active={isActive}
          >
            <Image
              src="/icons/verify-badge.svg"
              alt=""
              width={19}
              height={19}
              aria-hidden="true"
            />
          </CardIconWrap>
        }
        title="Verify"
        stage="Stage 04"
      />
      <div
        className="flex flex-1 flex-col items-start gap-[10px] self-stretch rounded-[14px] border-[1.25px] border-[#D1FAE5] p-[10px]"
        style={{
          background: "linear-gradient(225deg, #ECFDF5 14.64%, #FFF 85.36%)",
        }}
      >
        {/* Sub-heading */}
        <div className="flex items-center gap-2">
          <Image
            src="/icons/verify-shield-check.svg"
            alt=""
            width={11}
            height={14}
            aria-hidden="true"
          />
          <span className="text-[10px] font-medium leading-[15px] text-[#475569]">
            Quality Review
          </span>
        </div>
        {/* Safety compliance row */}
        <div className="flex h-[32px] w-full items-center justify-between self-stretch rounded-[10px] border border-[#D1FAE5] bg-white px-[10px]">
          <div className="flex items-center gap-2">
            <CheckDone />
            <span className="text-[10px] font-normal leading-[14px] text-[#475569]">
              Safety compliance
            </span>
          </div>
          <Image
            src="/icons/verify-chart.svg"
            alt=""
            width={10}
            height={10}
            aria-hidden="true"
          />
        </div>
        {/* Documentation row */}
        <div className="flex h-[32px] w-full items-center justify-between self-stretch rounded-[10px] border border-[#D1FAE5] bg-white px-[10px]">
          <div className="flex items-center gap-2">
            <CheckDone />
            <span className="text-[10px] font-normal leading-[14px] text-[#475569]">
              Documentation
            </span>
          </div>
          <Image
            src="/icons/verify-medal.svg"
            alt=""
            width={8}
            height={12}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}

function CloseCard({ isActive }: { isActive?: boolean }) {
  return (
    <div className="flex h-full flex-col gap-[10px]">
      <CardHeader
        icon={
          <CardIconWrap
            bg={isActive ? ACTIVE_ICON_BG : DEFAULT_ICON_BG}
            active={isActive}
          >
            <Image
              src="/icons/close-flag.svg"
              alt=""
              width={19}
              height={20}
              aria-hidden="true"
            />
          </CardIconWrap>
        }
        title="Close"
        stage="Stage 05"
      />
      <div
        className="flex flex-1 flex-col items-center gap-[12px] self-stretch rounded-[14px] border-[1.25px] border-[#E2E8F0] px-[25px] py-[17px]"
        style={{
          background: "linear-gradient(225deg, #F8FAFC 14.64%, #FFF 85.36%)",
        }}
      >
        {/* Archive circle with lock badge */}
        <div className="relative">
          <div className="flex items-center justify-center rounded-full bg-[#F2FFCB] p-[14px]">
            <Image
              src="/icons/close-archive.svg"
              alt=""
              width={19}
              height={17}
              aria-hidden="true"
            />
          </div>
          <div className="absolute right-[-4px] top-0 flex items-center justify-center rounded-full border-[1.25px] border-[#A6C936] bg-white p-[4px]">
            <Image
              src="/icons/close-lock.svg"
              alt=""
              width={7}
              height={8}
              aria-hidden="true"
            />
          </div>
        </div>
        {/* Skeleton bars */}
        <div className="flex w-full flex-col gap-2">
          <div className="h-2 w-full rounded-full bg-[#E2E8F0]" />
          <div className="mx-auto h-2 w-3/4 rounded-full bg-[#E2E8F0]" />
        </div>
        {/* Status text */}
        <span className="text-center text-[11px] text-[#94A3B8]">
          Awaiting completion
        </span>
      </div>
    </div>
  );
}

// ─── Stage configuration ──────────────────────────────────────────────────────

const STAGES = [
  { id: 1, label: "Request", status: "completed" as const },
  { id: 2, label: "Assign", status: "completed" as const },
  { id: 3, label: "Execute", status: "active" as const },
  { id: 4, label: "Verify", status: "pending" as const },
  { id: 5, label: "Close", status: "pending" as const },
];

const CARD_COMPONENTS = [
  { key: "request", Component: RequestCard },
  { key: "assign", Component: AssignCard },
  { key: "execute", Component: ExecuteCard },
  { key: "verify", Component: VerifyCard },
  { key: "close", Component: CloseCard },
];

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function WorkflowSection() {
  const [activeStep, setActiveStep] = useState(-1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // ── Refs shared between the auto-play loop and the drag handlers ───────────
  const isAutoScrolling = useRef(false); // true while our own scrollTo() runs
  const userScrolling = useRef(false); // true while the user is dragging
  const stepRef = useRef(0); // next stage the auto-play will show

  // ── Helpers (pure — operate on the container passed in) ─────────────────────
  // Smooth-scroll the container so card `index` sits in the centre.
  function scrollCardIntoCenter(container: HTMLDivElement, index: number) {
    const card = container.querySelectorAll<HTMLElement>("[data-card]")[index];
    if (!card) return;
    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const diff =
      cardRect.left +
      cardRect.width / 2 -
      (containerRect.left + containerRect.width / 2);
    container.scrollTo({ left: container.scrollLeft + diff, behavior: "smooth" });
  }

  // Which card is closest to the container centre (used when a drag settles).
  function getNearestCard(container: HTMLDivElement) {
    const cards = [...container.querySelectorAll<HTMLElement>("[data-card]")];
    const center =
      container.getBoundingClientRect().left + container.clientWidth / 2;
    let nearest = 0;
    let minDistance = Infinity;
    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - center);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = index;
      }
    });
    return nearest;
  }

  // ── Auto-play — advance the active stage on a loop. Robust across every
  //    viewport: overflow (carousel vs. static grid) is re-checked on each tick
  //    and whenever the breakpoint changes, and the wrap snaps back instantly
  //    so scroll-snap can't strand it on the last card. ───────────────────────
  useEffect(() => {
    if (!isInView) return;
    const container = cardContainerRef.current;
    if (!container) return;

    const N = CARD_COMPONENTS.length;
    const STEP_MS = 1600;

    let cancelled = false;
    let stepTimer: ReturnType<typeof setTimeout> | null = null;
    let flagTimer: ReturnType<typeof setTimeout> | null = null;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    const hasOverflow = () => container.scrollWidth > container.clientWidth + 4;

    const markAutoScroll = () => {
      isAutoScrolling.current = true;
      if (flagTimer) clearTimeout(flagTimer);
      flagTimer = setTimeout(() => {
        isAutoScrolling.current = false;
      }, 700);
    };

    // Jump to the first card with NO animation. Forcing scroll-behavior to
    // "auto" bypasses the container's CSS `scroll-smooth`, so the wrap is
    // instant instead of a slow rewind that scroll-snap could interrupt (which
    // was leaving the carousel stuck on the last card).
    const snapToStart = () => {
      markAutoScroll();
      container.style.scrollBehavior = "auto";
      container.scrollLeft = 0;
      container.style.scrollBehavior = "";
    };

    const advance = () => {
      if (cancelled) return;
      // Hold — but keep polling — while the user is dragging, so we never die.
      if (userScrolling.current) {
        stepTimer = setTimeout(advance, 400);
        return;
      }

      const overflow = hasOverflow();
      let step = stepRef.current;

      if (step >= N) {
        step = 0;
        if (overflow) snapToStart();
      }

      setActiveStep(step);
      if (overflow && step > 0) {
        markAutoScroll();
        scrollCardIntoCenter(container, step);
      }

      // Loop forever in every view: the carousel scrolls between cards, the
      // static grid just cycles the active highlight — both wrap back to the
      // first card instead of stopping on the last one.
      stepRef.current = step + 1;
      stepTimer = setTimeout(advance, STEP_MS);
    };

    const start = () => {
      if (stepTimer) clearTimeout(stepTimer);
      stepRef.current = 0;
      setActiveStep(0);
      if (hasOverflow()) snapToStart();
      stepTimer = setTimeout(advance, 500);
    };

    start();

    // Restart in the correct mode when the viewport crosses the carousel/grid
    // breakpoint — this is what makes it behave in every view.
    let lastOverflow = hasOverflow();
    const ro = new ResizeObserver(() => {
      const now = hasOverflow();
      if (now === lastOverflow) return;
      lastOverflow = now;
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(start, 150);
    });
    ro.observe(container);

    return () => {
      cancelled = true;
      if (stepTimer) clearTimeout(stepTimer);
      if (flagTimer) clearTimeout(flagTimer);
      if (resizeTimer) clearTimeout(resizeTimer);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  // ── User drag — pause the auto-play, keep the active dot in sync, then hand
  //    control back once the swipe settles. ───────────────────────────────────
  useEffect(() => {
    const container = cardContainerRef.current;
    if (!container) return;

    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    const scrollable = () => container.scrollWidth > container.clientWidth + 4;

    // Release the pause a beat after the last scroll/lift so momentum settles;
    // resume the loop from whichever card the user landed on.
    const scheduleRelease = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (scrollable()) stepRef.current = getNearestCard(container);
        userScrolling.current = false;
      }, 400);
    };

    function onPointerDown() {
      if (!scrollable()) return;
      userScrolling.current = true;
      if (idleTimer) clearTimeout(idleTimer);
    }

    function onPointerUp() {
      if (userScrolling.current) scheduleRelease();
    }

    function onScroll() {
      if (!container || isAutoScrolling.current || !userScrolling.current)
        return;
      setActiveStep(getNearestCard(container));
      scheduleRelease();
    }

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("touchend", onPointerUp);
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("touchend", onPointerUp);
      container.removeEventListener("scroll", onScroll);
      if (idleTimer) clearTimeout(idleTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStatus = (idx: number): "completed" | "active" | "pending" => {
    if (activeStep < 0 || idx > activeStep) return "pending";
    if (idx === activeStep) return "active";
    return "completed";
  };

  // clipPath right value: 100% = hidden, 0% = fully visible
  const fillRight = activeStep < 0 ? 100 : 100 - (activeStep / 4) * 100;

  return (
    <section
      ref={sectionRef}
      className="relative py-6 px-6 lg:py-[40px] lg:pb-[50px] lg:px-[60px]"
    >
      <div className="mx-auto flex w-full max-w-[1410px] flex-col gap-6 lg:gap-[40px]">
        {/* Header */}
        <motion.header
          initial="hidden"
          whileInView="show"
          viewport={viewportReveal}
          className="flex flex-col gap-2 text-[#0A4B6E]"
        >
          <motion.h2
            variants={wipeTop}
            className="text-[22px] font-bold leading-tight sm:text-[26px]"
          >
            A structured workflow for every issue
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={0.15}
            className="text-[15px] leading-6 sm:text-[20px] sm:leading-7"
          >
            Every maintenance request follows a clear, trackable path ensuring
            nothing is missed, delayed, or unresolved.
          </motion.p>
        </motion.header>

        {/* Timeline + Cards — scroll together below xl (1280px), grid at xl+ */}
        <div
          ref={cardContainerRef}
          className="
          px-6
          md:px-[220px]
          xl:px-0
          relative
          -mx-6
          overflow-x-auto
          snap-x
          snap-mandatory
          scroll-smooth
          
          pb-4
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
          xl:overflow-visible
        "
        >
          <div className="flex w-max flex-col gap-[20px] pt-[20px] xl:w-auto xl:gap-[40px] xl:pt-0">
            {/* Timeline — z-20 so step dots render above the z-10 right-edge fade */}
            <motion.div
              className="relative z-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportReveal}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            >
              {/* flex on mobile with fixed 260px cols + gap-5 (20px) = exact match to cards row; grid at xl */}
              <div className="relative flex gap-5 py-1 xl:grid xl:grid-cols-5 xl:gap-[30px]">
                {/* Static gray track */}
                <div className="absolute left-[130px] right-[130px] top-4 z-0 h-[9px] -translate-y-1/2 rounded-full bg-[#E2E8F0] xl:left-[calc(10%_-_12px)] xl:right-[calc(10%_-_12px)]" />
                {/* Animated gradient fill */}
                <motion.div
                  className="absolute left-[130px] right-[130px] top-4 z-0 h-[9px] -translate-y-1/2 rounded-full xl:left-[calc(10%_-_12px)] xl:right-[calc(10%_-_12px)]"
                  style={{
                    background:
                      "linear-gradient(249deg, #8D9CCF -0.61%, #5BB8F5 24.26%, #F1CAFF 88.61%)",
                  }}
                  initial={{ clipPath: "inset(0 100% 0 0 round 9999px)" }}
                  animate={{
                    clipPath: `inset(0 ${fillRight}% 0 0 round 9999px)`,
                  }}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                />
                {STAGES.map((s, i) => {
                  const status = getStatus(i);
                  return (
                    <div
                      key={s.id}
                      className="relative z-10 flex w-[260px] shrink-0 flex-col items-center gap-[10px] xl:w-auto"
                    >
                      <motion.div
                        key={`${i}-${status}`}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 280,
                          damping: 22,
                          mass: 0.8,
                        }}
                      >
                        {status === "completed" ? (
                          <StepCompleted />
                        ) : status === "active" ? (
                          <StepActive />
                        ) : (
                          <StepPending />
                        )}
                      </motion.div>
                      <span
                        className={`h-[6px] w-[6px] rounded-full transition-colors duration-500 ${
                          status === "active" ? "bg-[#5CB7E8]" : "bg-[#CBD5E1]"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Cards */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={viewportReveal}
              className="flex gap-[20px] xl:grid xl:grid-cols-5 xl:gap-[30px]"
            >
              {CARD_COMPONENTS.map(({ key, Component }, i) => {
                const isActive = i === activeStep;
                const isLast = CARD_COMPONENTS.length - 1 == i;
                return (
                  // Outer: size container + stagger entrance animation only
                  <motion.div
                    data-card
                    key={key}
                    variants={scaleIn}
                    className={`h-[246px] w-[260px] shrink-0 snap-center xl:w-auto ${isLast && "mr-0"}`}
                  >
                    <motion.div
                      animate={{
                        scale: isActive ? 1.025 : 1,
                        y: isActive ? -4 : 0,
                      }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className={[
                        "flex h-full w-full flex-col overflow-hidden rounded-[20px] p-4 backdrop-blur-[6px] transition-[border-color,box-shadow] duration-700",
                        isActive
                          ? "border border-[rgba(92,183,232,0.60)] bg-white shadow-[0_8px_30px_0_rgba(92,183,232,0.20)]"
                          : "border border-[#F1F5F9] bg-white/80 shadow-[0_4px_20px_0_rgba(0,0,0,0.02)]",
                      ].join(" ")}
                    >
                      <Component isActive={isActive} />
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
