import type { Variants, Transition } from "motion/react";

// Shared scroll-reveal primitives for the About page.
//
// These mirror the home page's animation language so the whole site feels
// consistent: a clip-path "wipe from top" for headings, a soft scale+fade for
// focal visuals, and a staggered rise for card rows. All variants animate only
// compositor-friendly props and accept an optional numeric `custom` delay (s).
// Trigger convention on this page is `whileInView="show"`.

// Premium ease-out (≈ easeOutQuint) — matches the home page exactly.
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
// Softer/longer ease for large focal elements (hero/orb zoom).
export const EASE_SOFT: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Reveal once, the first time the element scrolls into view, then keep it
// painted — the entrance never replays on later passes, even after the section
// has scrolled out and back. ~20% of the element must be visible to trigger.
export const viewportReveal = { once: true, amount: 0.2 } as const;

const t = (duration: number, ease = EASE): Transition => ({ duration, ease });

// Heading/text reveal — a compositor-friendly fade + short downward settle that
// reads as a "wipe from top" without animating `clip-path` (which forces a paint
// every frame). Only `opacity` + `transform` are animated, so reveals stay on the
// GPU and don't jank while scrolling. Use for section headers.
export const wipeTop: Variants = {
  hidden: { opacity: 0, y: -12 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...t(0.55), delay },
  }),
};

// Fade + rise — body copy and list rows.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { ...t(0.6), delay } }),
};

// Soft scale + fade — the home page's "load in" for visuals/illustrations.
export const loadIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { ...t(0.7), delay },
  }),
};

// Plain fade — for large filtered/SVG media where translating or scaling would
// force expensive re-composites every frame.
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: (delay = 0) => ({ opacity: 1, transition: { ...t(0.7), delay } }),
};

// Card reveal — rise + subtle scale (keeps shadows intact).
export const scaleIn: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.95 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...t(0.55), delay },
  }),
};

// Pop — scale up from small, for badges / icons / pills / connectors.
export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.55 },
  show: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE, delay },
  }),
};

// Zoom — focal graphics (the orbital visuals) that scale into place.
export const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { ...t(0.9, EASE_SOFT), delay },
  }),
};

// Stagger parents — children just need their own `variants`.
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};
export const staggerFast: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};
