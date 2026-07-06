import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { notFound } from "next/navigation"
import { ProductGallery } from "@/components/product"
import { CANONICAL_BASE, CONTACT, SITE } from "@/lib/constants"
import { formatPrice } from "@/lib/utils"
import { CATEGORY_LABELS, NO_DECLARATION_NOTE } from "@/lib/products-data"
import {
  getProduct,
  getStaticProductSlugs,
  type CatalogProduct,
} from "@/lib/products"

export const revalidate = 60

export async function generateStaticParams() {
  return getStaticProductSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return { title: "Proizvod nije pronađen" }

  return {
    title: `${product.title} | Puterina — butik torti Beograd`,
    description: product.shortDescription,
    alternates: { canonical: `${CANONICAL_BASE}/proizvod/${product.slug}` },
    openGraph: {
      type: "website",
      locale: "sr_RS",
      siteName: "Puterina",
      title: product.title,
      description: product.shortDescription,
      url: `${CANONICAL_BASE}/proizvod/${product.slug}`,
      images: [{ url: `${CANONICAL_BASE}${product.image}` }],
    },
  }
}

function productJsonLd(product: CatalogProduct) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.shortDescription,
    url: `${CANONICAL_BASE}/proizvod/${product.slug}`,
    image: `${CANONICAL_BASE}${product.image}`,
    brand: { "@type": "Brand", name: "Puterina", url: CANONICAL_BASE },
    // Offer samo kada cena postoji — „na upit" proizvodi bez offers bloka
    ...(product.pricePerKg
      ? {
          offers: {
            "@type": "Offer",
            price: product.pricePerKg,
            priceCurrency: "RSD",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: product.pricePerKg,
              priceCurrency: "RSD",
              unitCode: "KGM",
              unitText: "kg",
            },
            availability: "https://schema.org/InStock",
            seller: {
              "@type": "Organization",
              name: "Puterina",
              url: CANONICAL_BASE,
            },
          },
        }
      : {}),
  }
}

/** Accordion stavka: native <details> — sav sadržaj SSR-ovan u DOM (AEO). */
function DetailRow({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  return (
    <details className="group" open={defaultOpen}>
      <summary>
        {title}
        <span className="pl" aria-hidden>
          +
        </span>
      </summary>
      <div className="acc-body">{children}</div>
    </details>
  )
}

/**
 * Strana proizvoda V3 (mockup prod-1): levo galerija sa OBAVEZNIM
 * presekom, desno sticky info: label → ime → cena → gosti → dekoracija
 * → CTA Pozovite + poruke → opis → accordion (deklaracija!).
 */
export default async function ProizvodPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const dekl = product.declaration

  // „presek" alt SAMO kada je presek zaista posebna slika (Susu linija
  // nema presek — crossSectionImage pokazuje na glavnu fotografiju)
  const imaPresek = product.crossSectionImage !== product.image
  const galleryImages = product.gallery.map((src, i) => ({
    src,
    alt:
      imaPresek && src === product.crossSectionImage
        ? `${product.title}, presek — vide se slojevi`
        : `${product.title}, fotografija ${i + 1} — Puterina, butik torti Beograd`,
  }))
  // Presek OBAVEZNO među slikama
  if (!product.gallery.includes(product.crossSectionImage)) {
    galleryImages.push({
      src: product.crossSectionImage,
      alt: `${product.title}, presek — vide se slojevi`,
    })
  }

  const label = product.isSignature
    ? "Signature ukus"
    : product.seasonal
      ? `✳ ${product.seasonal.badge}`
      : CATEGORY_LABELS[product.category]

  return (
    <div className="section-cream min-h-screen pb-24 pt-24 md:pt-28">
      <Script
        id="product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd(product)),
        }}
      />

      <div className="container-site">
        {/* Breadcrumb */}
        <nav
          aria-label="Putanja"
          className="mb-7 pt-2 text-[13px] text-ink-muted"
        >
          <Link href="/katalog" className="hover:text-ink">
            Katalog
          </Link>
          <span aria-hidden> / </span>
          <Link
            href={`/katalog?vrsta=${product.category}`}
            className="hover:text-ink"
          >
            {CATEGORY_LABELS[product.category]}
          </Link>
          <span aria-hidden> / </span>
          <span className="text-ink">{product.title}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          {/* Galerija — levo */}
          <div>
            <ProductGallery images={galleryImages} productName={product.title} />
          </div>

          {/* Info — desno, sticky */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <span className="label mb-3 block">{label}</span>
            <h1 className="!text-[clamp(2.4rem,5vw,3.6rem)]">{product.title}</h1>
            <p className="mt-2 text-[15px] text-ink-muted">
              {product.shortDescription}
            </p>

            {/* Cena */}
            <p
              className="mt-5 text-[1.9rem] leading-tight text-ink"
              style={{
                fontFamily: "var(--font-heading)",
                fontVariationSettings: '"opsz" 60',
              }}
            >
              {product.pricePerKg ? (
                <>
                  {formatPrice(product.pricePerKg)}{" "}
                  <span className="text-[0.7em] text-ink-muted">RSD / kg</span>
                </>
              ) : (
                <span className="italic">{product.priceNote ?? "cena na upit"}</span>
              )}
            </p>
            <p className="mt-1 text-[14px] text-ink-muted">
              {SITE.minOrderNote}
            </p>

            <p
              className="mt-4 max-w-[40ch] text-[14.5px] italic text-ink-muted"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {SITE.decorationNote}
            </p>

            {/* CTA par (§12 hijerarhija) */}
            <div className="mt-7">
              <a href={`tel:${CONTACT.phone}`} className="cta-primary">
                Pozovite — {CONTACT.phoneDisplay}
              </a>
              <p className="mt-3.5 text-[13.5px] text-ink-muted">
                ili pišite:{" "}
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-oliva hover:opacity-80"
                >
                  WhatsApp
                </a>
                {" · "}
                <a href={CONTACT.viber} className="text-oliva hover:opacity-80">
                  Viber
                </a>
                {" · "}
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-oliva hover:opacity-80"
                >
                  Instagram
                </a>
              </p>
              <p className="mt-2 text-[13px] text-ink-muted">
                {SITE.responseNote}
              </p>
            </div>

            {/* Opis u njenom glasu */}
            <p className="mt-8 max-w-[44ch] text-[1.05rem] text-ink">
              {product.description}
            </p>

            {/* Sezonalnost (V3-COPY §11.3) — render samo kad tekst postoji */}
            {(product.seasonal || product.category === "torte") && (
              <p className="mt-3 text-[14px] italic text-ink-muted">
                {product.seasonal
                  ? product.seasonal.note
                  : "Ovu tortu pravim cele godine — puter ne zna za godišnja doba."}
              </p>
            )}

            {/* Accordion — deklaracija i detalji (SSR u DOM) */}
            <div className="prod-details mt-8">
              <DetailRow title="Opis" defaultOpen>
                <ul>
                  {product.layers.map((layer) => (
                    <li key={layer}>{layer}</li>
                  ))}
                </ul>
              </DetailRow>

              <DetailRow title="Sastojci">
                {dekl ? (
                  <p>{dekl.sastojci}</p>
                ) : (
                  <>
                    <p>{product.ingredientsShort}</p>
                    <p className="mt-3 text-[13.5px]">{NO_DECLARATION_NOTE}</p>
                  </>
                )}
              </DetailRow>

              {dekl && dekl.nutritivno.length > 0 && (
                <DetailRow title="Nutritivne vrednosti">
                  <table>
                    <tbody>
                      {dekl.nutritivno.map((row) => (
                        <tr key={row.label}>
                          <td>{row.label}</td>
                          <td>{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-2 text-[12.5px]">
                    Prosečne vrednosti na 100 g.
                  </p>
                </DetailRow>
              )}

              {dekl && (
                <DetailRow title="Alergeni">
                  <p>
                    <strong className="font-medium text-oliva">Sadrži:</strong>{" "}
                    <span className="text-ink">{dekl.alergeni}</span>
                  </p>
                </DetailRow>
              )}

              <DetailRow title="Čuvanje">
                <p>
                  {dekl?.cuvanje ?? "Čuvati na temperaturi do +5 °C."} Izvaditi
                  30 minuta pre posluženja — da krem dobije svilenkastu
                  teksturu.
                </p>
              </DetailRow>

              {dekl && (
                <DetailRow title="Deklaracija">
                  {dekl.officialName !== product.title && (
                    <p>Zvaničan naziv proizvoda: {dekl.officialName}.</p>
                  )}
                  <p className="mt-1">
                    Neto masa: {dekl.netoMasa}. Rok trajanja: {dekl.rok}
                  </p>
                  <p className="mt-1">Proizvodnja: {dekl.proizvodjac}</p>
                </DetailRow>
              )}
            </div>

            <Link href="/katalog" className="tlink mt-9 inline-block">
              ← Ceo katalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
