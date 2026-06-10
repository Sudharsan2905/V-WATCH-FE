import type { Variants, Transition } from "motion/react";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const hoverSpring: Transition = { type: "spring", stiffness: 300, damping: 20 };

export const heroContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const badgeVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export const headingVariant: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export const paragraphVariant: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const buttonVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

const STAGE_TAB_BAR = 0.1;
const STAGE_IMAGE = 0.7;
const STAGE_HEADING = 1.05;
const STAGE_ITEMS = 1.2;

export const tabBarVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE,
      delay: STAGE_TAB_BAR,
      staggerChildren: 0.06,
      delayChildren: STAGE_TAB_BAR + 0.15,
    },
  },
};

export const tabItemVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

export const panelImageReveal: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 22 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay: STAGE_IMAGE },
  },
};

export const panelHeadingReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: STAGE_HEADING } },
};

export const panelItemsReveal: Variants = {
  hidden: {},
  show: { transition: { delayChildren: STAGE_ITEMS, staggerChildren: 0.12 } },
};

export const panelItemReveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

/* ----------------------------------------------------------------------------
 * Tab content swap (heading / subtitle / number) — slide horizontally.
 * Used with AnimatePresence mode="wait".
 * -------------------------------------------------------------------------- */
export const contentSwap: Variants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.4, ease: EASE } },
};

/* Illustration crossfade — overlapping fade + scale so frames never flash. */
export const imageSwap: Variants = {
  enter: { opacity: 0, scale: 1.05 },
  center: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
  exit: { opacity: 0, scale: 1.05, transition: { duration: 0.5, ease: EASE } },
};
