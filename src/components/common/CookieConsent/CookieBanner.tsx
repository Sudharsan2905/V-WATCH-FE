"use client";

import { AnimatePresence, motion, MotionConfig } from "motion/react";
// import Link from "next/link"; // re-enable once /privacy-policy and /cookie-policy routes exist

type Props = {
  open: boolean;
  onAcceptAll: () => void;
  onRejectNonEssential: () => void;
  onManagePreferences: () => void;
};

// Bottom-anchored, non-blocking banner (no full-screen overlay, so page
// scroll is never locked). Rendered once from the root layout via
// components/common/CookieConsent/index.tsx.
export default function CookieBanner({
  open,
  onAcceptAll,
  onRejectNonEssential,
  onManagePreferences,
}: Readonly<Props>) {
  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-live="polite"
            aria-label="Cookie consent"
            aria-describedby="cookie-banner-description"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-50 border-t border-white/40 bg-white/80 p-5 shadow-[0_-8px_40px_rgba(25,33,61,0.18)] backdrop-blur-xl sm:p-6 dark:border-white/10 dark:bg-navy-900/80"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <div className="min-w-0">
                <h2 className="text-base font-semibold text-neutral sm:text-lg dark:text-white">
                  We value your privacy
                </h2>
                <p
                  id="cookie-banner-description"
                  className="mt-1.5 text-sm leading-relaxed text-neutral/70 dark:text-navy-100"
                >
                  We use cookies to improve your experience, analyze website
                  traffic, and provide personalized content. You can choose
                  which cookies you allow.
                </p>
                {/* TODO: re-enable once /privacy-policy and /cookie-policy routes exist
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                  <Link
                    href="/privacy-policy"
                    className="font-medium text-primary underline-offset-2 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/cookie-policy"
                    className="font-medium text-primary underline-offset-2 hover:underline"
                  >
                    Cookie Policy
                  </Link>
                </div>
                */}
              </div>

              <div className="flex flex-col gap-2.5 sm:w-auto sm:shrink-0 sm:flex-row">
                <button
                  type="button"
                  onClick={onManagePreferences}
                  className="order-3 rounded-full border border-navy-200 px-5 py-2.5 text-sm font-semibold text-neutral transition-colors hover:bg-navy-50 sm:order-1 dark:border-navy-700 dark:text-white dark:hover:bg-navy-800"
                >
                  Manage Preferences
                </button>
                <button
                  type="button"
                  onClick={onRejectNonEssential}
                  className="order-2 rounded-full border border-navy-200 px-5 py-2.5 text-sm font-semibold text-neutral transition-colors hover:bg-navy-50 dark:border-navy-700 dark:text-white dark:hover:bg-navy-800"
                >
                  Reject Non-Essential
                </button>
                <button
                  type="button"
                  onClick={onAcceptAll}
                  className="order-1 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-blue-700 sm:order-3"
                >
                  Accept All
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
