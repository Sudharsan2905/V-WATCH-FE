"use client";

import { useEffect } from "react";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { DEFAULT_PREFERENCES } from "@/lib/cookieConsent";
import { initGoogleAnalytics, initGoogleTagManager } from "@/lib/analytics";
import CookieBanner from "@/components/common/CookieConsent/CookieBanner";
import CookiePreferencesModal from "@/components/common/CookieConsent/CookiePreferencesModal";

// Single mount point for the whole consent flow — render once from the root
// layout (src/app/layout.tsx) so it's available on every route.
export default function CookieConsent() {
  const {
    consent,
    isBannerOpen,
    isModalOpen,
    acceptAll,
    rejectNonEssential,
    savePreferences,
    openPreferences,
    closePreferences,
  } = useCookieConsent();

  // Third-party tags: only initialised once the visitor has actually granted
  // analytics consent (see lib/analytics.ts).
  useEffect(() => {
    initGoogleAnalytics();
    initGoogleTagManager();
  }, [consent]);

  return (
    <>
      <CookieBanner
        open={isBannerOpen && !isModalOpen}
        onAcceptAll={acceptAll}
        onRejectNonEssential={rejectNonEssential}
        onManagePreferences={openPreferences}
      />

      <CookiePreferencesModal
        open={isModalOpen}
        initialPreferences={consent ?? DEFAULT_PREFERENCES}
        onSave={savePreferences}
        onCancel={closePreferences}
      />
    </>
  );
}
