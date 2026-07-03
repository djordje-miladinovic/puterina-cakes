import { CANONICAL_BASE, CONTACT } from "@/lib/constants"

/**
 * Sitewide JSON-LD (PLAN T6.1): Bakery (LocalBusiness) kao service-area
 * biznis — BEZ ulične adrese (vlasnica ne želi adresu), samo Beograd.
 * Radno vreme Mo–Fr 08–20h. + Organization i WebSite.
 */
const bakery = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  "@id": `${CANONICAL_BASE}/#bakery`,
  name: "Puterina",
  alternateName: "Puterina — butik torti",
  description:
    "Butik torti u Beogradu — ručno pravljene torte sa pravim puterom, bez fondana i gotovih smesa. Poručivanje pozivom ili porukom.",
  url: CANONICAL_BASE,
  telephone: CONTACT.phone,
  areaServed: {
    "@type": "City",
    name: "Beograd",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Beograd",
    addressCountry: "RS",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "20:00",
  },
  priceRange: "$$",
  servesCuisine: "Torte i kolači",
  sameAs: [CONTACT.instagram],
}

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${CANONICAL_BASE}/#organization`,
  name: "Puterina",
  url: CANONICAL_BASE,
  sameAs: [CONTACT.instagram],
}

const webSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${CANONICAL_BASE}/#website`,
  name: "Puterina — butik torti",
  url: CANONICAL_BASE,
  inLanguage: "sr-RS",
  publisher: { "@id": `${CANONICAL_BASE}/#organization` },
}

export default function JsonLd() {
  return (
    <>
      {[bakery, organization, webSite].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
