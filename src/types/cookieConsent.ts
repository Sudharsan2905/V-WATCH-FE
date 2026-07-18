/**
 * Cookie categories the site can request consent for.
 * To add a future category (e.g. a new "social" category), add the key here
 * and add a matching entry to COOKIE_CATEGORIES in lib/cookieConsent.ts —
 * every UI surface (banner, modal) is driven off that config array.
 */
export interface CookieConsentPreferences {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export type CookieCategory = keyof CookieConsentPreferences;

/** Shape persisted in the `cookie_consent` cookie. */
export interface CookieConsentRecord extends CookieConsentPreferences {
  timestamp: string;
}

export interface CookieCategoryConfig {
  key: CookieCategory;
  title: string;
  description: string;
  /** Essential cookies are required and cannot be toggled off. */
  required: boolean;
}
