import type { Metadata } from "next";

// Public origin used for canonical / social URLs and the JSON-LD `url`.
// NOTE: src/app/home/page.tsx still carries a TODO placeholder
// ("https://www.v-watch.ai"); keep the two in sync once the real origin is
// confirmed.
export const SITE_URL = "https://vwatch.ai";

export type PageSeo = {
  /** Route of the page, e.g. "/pre-construction". */
  path: string;
  /** Product / page name used in the structured data. */
  name: string;
  title: string;
  description: string;
  /** The keywords this page targets (from the client's keyword research). */
  keywords: readonly string[];
  /** Heading of the screen-reader-only keyword list. */
  heading: string;
};

/**
 * Meta tags for a page, in the shape of the (currently commented-out) block on
 * /home: title, description, keywords, canonical, Open Graph and Twitter.
 * Nothing here is rendered on screen.
 */
export function buildPageMetadata({
  path,
  title,
  description,
  keywords,
}: PageSeo): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: [...keywords, "V-Watch AI"],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: "V-Watch AI",
      title,
      description,
    },
    twitter: { card: "summary", title, description },
  };
}
