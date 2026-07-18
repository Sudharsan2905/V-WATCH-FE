"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { COOKIE_CATEGORIES, DEFAULT_PREFERENCES } from "@/lib/cookieConsent";
import type { CookieCategory, CookieConsentPreferences } from "@/types/cookieConsent";

type Props = {
  open: boolean;
  initialPreferences: CookieConsentPreferences;
  onSave: (preferences: CookieConsentPreferences) => void;
  onCancel: () => void;
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

// Layer 2 "Preference centre": per-category switches, essential locked on.
// Cancel discards the in-progress draft; Save persists it via useCookieConsent.
export default function CookiePreferencesModal({
  open,
  initialPreferences,
  onSave,
  onCancel,
}: Readonly<Props>) {
  const [draft, setDraft] = useState<CookieConsentPreferences>(initialPreferences);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const titleId = useId();

  // Re-sync the draft with the last saved preferences every time the modal
  // opens, following React's "adjust state during render" pattern (rather
  // than an effect) so it can't cause an extra render pass.
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setDraft(initialPreferences);
  }

  // Move focus into the dialog on open, restore it to the trigger element on close.
  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    focusable?.[0]?.focus();

    return () => previouslyFocused.current?.focus();
  }, [open]);

  // Escape closes the dialog; Tab/Shift+Tab is trapped within it.
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCancel();
        return;
      }

      if (event.key !== "Tab") return;

      const node = dialogRef.current;
      const focusable = node ? Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)) : [];
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onCancel]);

  function toggleCategory(key: CookieCategory) {
    setDraft((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
            <motion.div
              aria-hidden="true"
              onClick={onCancel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-neutral/50 backdrop-blur-sm"
            />
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/40 bg-white/95 p-6 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-navy-900/95"
            >
              <h2 id={titleId} className="text-lg font-semibold text-neutral dark:text-white">
                Customize Consent Preferences
              </h2>
              <p className="mt-1.5 text-sm text-neutral/70 dark:text-navy-100">
                Choose which categories of cookies you allow us to use. Essential cookies cannot
                be disabled since the site relies on them to function.
              </p>

              <ul className="mt-5 divide-y divide-navy-100 dark:divide-navy-800">
                {COOKIE_CATEGORIES.map((category) => (
                  <li key={category.key} className="flex items-start justify-between gap-4 py-4">
                    <div>
                      <p className="text-sm font-semibold text-neutral dark:text-white">
                        {category.title}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-neutral/60 dark:text-navy-200">
                        {category.description}
                      </p>
                    </div>
                    <ToggleSwitch
                      checked={draft[category.key]}
                      disabled={category.required}
                      label={category.title}
                      onChange={() => toggleCategory(category.key)}
                    />
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setDraft(DEFAULT_PREFERENCES)}
                  className="text-xs font-medium text-neutral/50 underline-offset-2 hover:text-neutral/80 hover:underline dark:text-navy-300 dark:hover:text-navy-100"
                >
                  Reset to default
                </button>

                <div className="flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-full border border-navy-200 px-5 py-2.5 text-sm font-semibold text-neutral transition-colors hover:bg-navy-50 dark:border-navy-700 dark:text-white dark:hover:bg-navy-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => onSave(draft)}
                    className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-blue-700"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

type ToggleSwitchProps = {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onChange: () => void;
};

function ToggleSwitch({ checked, disabled, label, onChange }: Readonly<ToggleSwitchProps>) {
  if (disabled) {
    return (
      <span className="mt-0.5 shrink-0 rounded-full bg-primary-green-100 px-3 py-1 text-xs font-semibold text-primary-green-800 dark:bg-primary-green-900/40 dark:text-primary-green-400">
        Always Active
      </span>
    );
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-navy-900 ${
        checked ? "bg-primary" : "bg-black/15 dark:bg-white/15"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}
