"use client";

import { useCallback, useEffect, useState } from "react";
import type { CookieConsentPreferences, CookieConsentRecord } from "@/types/cookieConsent";
import {
  ACCEPT_ALL_PREFERENCES,
  REJECT_ALL_PREFERENCES,
  getConsent,
  hasConsent,
  resetConsent,
  saveConsent,
} from "@/lib/cookieConsent";

export interface UseCookieConsentReturn {
  /** The currently stored consent record, or null if none has been saved yet. */
  consent: CookieConsentRecord | null;
  /** Whether the banner should be rendered. False until the client has checked for an existing cookie (SSR-safe). */
  isBannerOpen: boolean;
  /** Whether the preferences modal should be rendered. */
  isModalOpen: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (preferences: CookieConsentPreferences) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  /** Clears the saved decision and re-opens the banner (e.g. from a "reset cookies" control). */
  resetPreferences: () => void;
}

/**
 * Central state for the cookie consent flow. Reads the `cookie_consent`
 * cookie only after mount, so server and first client render both produce
 * `isBannerOpen: false` — avoids a hydration mismatch.
 */
export function useCookieConsent(): UseCookieConsentReturn {
  const [consent, setConsent] = useState<CookieConsentRecord | null>(null);
  const [hasCheckedConsent, setHasCheckedConsent] = useState(false);
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // One-time read of an external system (the cookie) after mount — the
    // cookie doesn't exist during SSR, so this can't be computed during render
    // without risking a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(getConsent());
    setIsBannerOpen(!hasConsent());
    setHasCheckedConsent(true);
  }, []);

  const applyAndClose = useCallback((preferences: CookieConsentPreferences) => {
    setConsent(saveConsent(preferences));
    setIsBannerOpen(false);
    setIsModalOpen(false);
  }, []);

  const acceptAll = useCallback(() => applyAndClose(ACCEPT_ALL_PREFERENCES), [applyAndClose]);

  const rejectNonEssential = useCallback(
    () => applyAndClose(REJECT_ALL_PREFERENCES),
    [applyAndClose],
  );

  const savePreferences = useCallback(
    (preferences: CookieConsentPreferences) => applyAndClose(preferences),
    [applyAndClose],
  );

  const openPreferences = useCallback(() => setIsModalOpen(true), []);
  const closePreferences = useCallback(() => setIsModalOpen(false), []);

  const resetPreferences = useCallback(() => {
    resetConsent();
    setConsent(null);
    setIsModalOpen(false);
    setIsBannerOpen(true);
  }, []);

  return {
    consent,
    isBannerOpen: hasCheckedConsent && isBannerOpen,
    isModalOpen,
    acceptAll,
    rejectNonEssential,
    savePreferences,
    openPreferences,
    closePreferences,
    resetPreferences,
  };
}
