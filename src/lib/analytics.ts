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
