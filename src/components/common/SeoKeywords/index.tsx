import { SITE_URL, type PageSeo } from "@/lib/seo";

/**
 * Search-engine-only keyword content, built the same way as on /home:
 *  - schema.org structured data (JSON-LD) with the keywords as `featureList`
 *  - a screen-reader-only (`sr-only`) heading + list of the same keywords
 *
 * Nothing here is visible on screen and nothing in the page layout changes
 * (the list is clipped to 1px and absolutely positioned). Place it right after
 * the page hero so it follows the page <h1> in the heading order.
 */
export default function SeoKeywords({
  path,
  name,
  description,
  keywords,
  heading,
}: Readonly<PageSeo>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${SITE_URL}${path}`,
    description,
    featureList: keywords,
  };

  return (
    <>
      <script
        type="application/ld+json"
        // "<" escaped so the JSON can never close the script tag early.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <section aria-label={heading} className="sr-only" data-seo-keywords>
        <h2>{heading}</h2>
        <ul>
          {keywords.map((k) => (
            <li key={k}>{k}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
