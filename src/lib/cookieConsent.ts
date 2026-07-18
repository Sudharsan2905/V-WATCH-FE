import Cookies from "js-cookie";
import type {
  CookieCategoryConfig,
  CookieConsentPreferences,
  CookieConsentRecord,
} from "@/types/cookieConsent";

export const COOKIE_CONSENT_NAME = "cookie_consent";
const COOKIE_CONSENT_EXPIRY_DAYS = 365;

/** Drives the preferences modal UI — add an entry here to support a new category. */
export const COOKIE_CATEGORIES: CookieCategoryConfig[] = [
  {
    key: "essential",
    title: "Essential Cookies",
    description:
      "Required to enable core site functionality such as security, network management, and accessibility. These cookies cannot be disabled.",
    required: true,
  },
  {
    key: "analytics",
    title: "Analytics Cookies",
    description:
      "Help us understand how visitors interact with the site by collecting and reporting information anonymously.",
    required: false,
  },
  {
    key: "marketing",
    title: "Marketing Cookies",
    description:
      "Used to track visitors across websites to display ads that are relevant and engaging for the individual user.",
    required: false,
  },
  {
    key: "preferences",
    title: "Preference Cookies",
    description:
      "Allow the site to remember choices you make (such as language or region) to provide a more personalized experience.",
    required: false,
  },
];

export const ACCEPT_ALL_PREFERENCES: CookieConsentPreferences = {
  essential: true,
  analytics: true,
  marketing: true,
  preferences: true,
};

export const REJECT_ALL_PREFERENCES: CookieConsentPreferences = {
  essential: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

export const DEFAULT_PREFERENCES: CookieConsentPreferences = REJECT_ALL_PREFERENCES;

function isValidRecord(value: unknown): value is CookieConsentRecord {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.analytics === "boolean" &&
    typeof record.marketing === "boolean" &&
    typeof record.preferences === "boolean" &&
    typeof record.timestamp === "string"
  );
}

/** Reads and parses the consent cookie. Returns null if unset, malformed, or on the server. */
export function getConsent(): CookieConsentRecord | null {
  if (typeof window === "undefined") return null;

  const raw = Cookies.get(COOKIE_CONSENT_NAME);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!isValidRecord(parsed)) return null;
    return { ...parsed, essential: true };
  } catch {
    return null;
  }
}

export function hasConsent(): boolean {
  return getConsent() !== null;
}

/** Persists a consent decision, stamping the current time, and returns the saved record. */
export function saveConsent(preferences: CookieConsentPreferences): CookieConsentRecord {
  const record: CookieConsentRecord = {
    ...preferences,
    essential: true,
    timestamp: new Date().toISOString(),
  };

  Cookies.set(COOKIE_CONSENT_NAME, JSON.stringify(record), {
    expires: COOKIE_CONSENT_EXPIRY_DAYS,
    sameSite: "Lax",
    path: "/",
  });

  return record;
}

/** Clears the stored decision so the banner is shown again on next load. */
export function resetConsent(): void {
  Cookies.remove(COOKIE_CONSENT_NAME, { path: "/" });
}

export function shouldLoadAnalytics(): boolean {
  return getConsent()?.analytics === true;
}

export function shouldLoadMarketing(): boolean {
  return getConsent()?.marketing === true;
}

export function shouldLoadPreferences(): boolean {
  return getConsent()?.preferences === true;
}
