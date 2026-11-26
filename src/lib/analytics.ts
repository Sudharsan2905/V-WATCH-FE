import { shouldLoadAnalytics, shouldLoadMarketing, shouldLoadPreferences } from "@/lib/cookieConsent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Loads and initializes Google Analytics (gtag.js), but only once consent has
 * been granted for the "analytics" category. Safe to call on every render —
 * it no-ops if consent is missing, the env var isn't set, or gtag is already
 * loaded. Wire this up from anywhere that reacts to consent changes, e.g.
 * `useEffect(() => { initGoogleAnalytics(); }, [consent])` in a client component.
 */
export function initGoogleAnalytics(): void {
  if (typeof window === "undefined") return;
  if (!GA_MEASUREMENT_ID) return;
  if (!shouldLoadAnalytics()) return;
  if (window.gtag) return;

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);
}

// Google Tag Manager container (public ID, not a secret). The marketing team
// manages the tags inside it from the GTM dashboard.
const GTM_ID = "GTM-FVTW6PSJ";

/**
 * Loads Google Tag Manager, following the same consent flow as GA4 above: it
 * only runs once the visitor has granted "analytics" consent, and is safe to
 * call on every render (it no-ops if consent is missing or GTM is already
 * loaded). Mirrors the install snippet from Google: the gtm.js script plus the
 * dataLayer / gtag('js') setup.
 */
export function initGoogleTagManager(): void {
  if (typeof window === "undefined") return;
  if (!shouldLoadAnalytics()) return;
  if (document.querySelector(`script[src*="googletagmanager.com/gtm.js?id=${GTM_ID}"]`)) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  // gtag must push the `arguments` object (not an array) for Google to read it.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
  window.gtag("js", new Date());
}

/**
 * Same pattern for any future marketing pixel (Facebook Pixel, LinkedIn
 * Insight, TikTok Pixel, etc). Guard the actual script injection with this
 * before loading a third-party marketing tag:
 *
 *   if (canLoadMarketingScripts()) loadFacebookPixel();
 */
export function canLoadMarketingScripts(): boolean {
  return shouldLoadMarketing();
}

/**
 * Same pattern for tools gated on the "preferences" category (e.g. a
 * personalization or A/B testing tool that remembers user choices).
 *
 *   if (canLoadPreferenceScripts()) loadHotjar();
 */
export function canLoadPreferenceScripts(): boolean {
  return shouldLoadPreferences();
}
