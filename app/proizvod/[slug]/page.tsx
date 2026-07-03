import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { notFound } from "next/navigation"
import { Instagram, Phone } from "lucide-react"
import { ProductGallery } from "@/components/product"
import AllergenList from "@/components/product/AllergenList"
import { WhatsAppIcon, ViberIcon } from "@/components/icons"
import { CANONICAL_BASE, CONTACT, SITE } from "@/lib/constants"
import { formatPrice } from "@/lib/utils"
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
    title: product.title,
    description: product.shortDescription,
    alternates: { canonical: `${CANONICAL_BASE}/proizvod/${product.slug}` },
    openGraph: {
      title: product.title,
      description: product.shortDescription,
      url: `${CANONICAL_BASE}/proizvod/${product.slug}`,
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
      seller: { "@type": "Organization", name: "Puterina", url: CANONICAL_BASE },
    },
    brand: { "@type": "Brand", name: "Puterina", url: CANONICAL_BASE },
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
    <details
      className="group border-t border-warm-brown/15 py-4 last:border-b"
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden">
        <span className="h4">{title}</span>
        <span
          aria-hidden
          className="text-2xl leading-none text-warm-brown transition-transform duration-200 group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="pt-4">{children}</div>
    </details>
  )
}

/**
 * Strana proizvoda (ZA-PUTERINU §5, lamaisonduchocolat format):
 * levo galerija sa OBAVEZNIM presekom, desno ime → cena/kg → napomena
 * o dekoraciji → CTA Pozovite + IG/WA/Viber → opis → accordion sekcije.
 * BEZ related-products bloka.
 */
export default async function ProizvodPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const galleryImages = product.gallery.map((src, i) => ({
    src,
    alt:
      src === product.crossSectionImage
        ? `${product.title}, presek — vide se slojevi`
        : `${product.title}, fotografija ${i + 1} — Puterina, butik torti Beograd`,
  }))
  // Presek OBAVEZNO među slikama (tortik-annuchka zahtev)
  if (!product.gallery.includes(product.crossSectionImage)) {
    galleryImages.push({
      src: product.crossSectionImage,
      alt: `${product.title}, presek — vide se slojevi`,
    })
  }

  return (
    <div className="section-cream min-h-screen pt-24 pb-24 md:pt-32">
      <Script
        id="product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd(product)),
        }}
      />

      <div className="container-site">
        {/* Breadcrumb */}
        <nav aria-label="Putanja" className="body-small mb-8 text-charcoal/60">
          <Link href="/katalog" className="hover:text-warm-brown">
            Katalog
          </Link>
          <span aria-hidden> / </span>
          <Link
            href={product.category === "kolaci" ? "/katalog?k=kolaci" : "/katalog"}
            className="hover:text-warm-brown"
          >
            {product.category === "kolaci" ? "Kolači" : "Torte"}
          </Link>
          <span aria-hidden> / </span>
          <span className="text-warm-brown">{product.title}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          {/* Galerija — levo */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ProductGallery images={galleryImages} productName={product.title} />
          </div>

          {/* Info — desno */}
          <div>
            {product.isSignature && (
              <p
                className="text-sm italic text-raspberry"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Signature
              </p>
            )}
            <h1 className="mt-1">{product.title}</h1>

            <p className="mt-4 text-2xl font-semibold text-warm-brown md:text-3xl">
              {formatPrice(product.pricePerKg)} RSD
              <span className="text-lg font-normal text-charcoal/60">/kg</span>
            </p>
            <p className="body-small mt-2 italic text-charcoal/60">
              {SITE.decorationNote}
            </p>

            <div className="mt-8">
              <a href={`tel:${CONTACT.phone}`} className="cta-primary w-full sm:w-auto !px-12">
                <Phone className="h-4 w-4" aria-hidden />
                Pozovite
              </a>
              <p className="body-small mt-3 text-charcoal/70">
                Pošaljite poruku:{" "}
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-warm-brown"
                >
                  <Instagram className="h-3.5 w-3.5" aria-hidden />
                  Instagram
                </a>
                {" · "}
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-warm-brown"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5" />
                  WhatsApp
                </a>
                {" · "}
                <a
                  href={CONTACT.viber}
                  className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-warm-brown"
                >
                  <ViberIcon className="h-3.5 w-3.5" />
                  Viber
                </a>
              </p>
            </div>

            <p className="body-large mt-8 text-charcoal/85">
              {product.shortDescription}
            </p>

            {/* Accordion — tanke linije, bez kutija; SSR sadržaj */}
            <div className="mt-10">
              {product.layers.length > 0 && (
                <DetailRow title="Opis" defaultOpen>
                  <ul className="body list-inside space-y-1 text-charcoal/85">
                    {product.layers.map((layer) => (
                      <li key={layer} className="flex gap-2">
                        <span aria-hidden className="text-butter-gold">—</span>
                        {layer}
                      </li>
                    ))}
                  </ul>
                </DetailRow>
              )}

              {product.ingredients && (
                <DetailRow title="Sastojci">
                  <p className="body text-charcoal/85">{product.ingredients}</p>
                </DetailRow>
              )}

              <DetailRow title="Nutritivne vrednosti">
                <table className="body w-full text-left text-charcoal/85">
                  <caption className="body-small mb-2 text-left text-charcoal/60">
                    Prosečne vrednosti na 100 g (okvirno)
                  </caption>
                  <tbody>
                    {[
                      ["Energetska vrednost", product.nutrition.energy],
                      ["Masti", product.nutrition.fat],
                      ["— od toga zasićene", product.nutrition.saturatedFat],
                      ["Ugljeni hidrati", product.nutrition.carbs],
                      ["— od toga šećeri", product.nutrition.sugars],
                      ["Proteini", product.nutrition.protein],
                      ["So", product.nutrition.salt],
                    ].map(([label, value]) => (
                      <tr key={label} className="border-t border-warm-brown/10">
                        <th scope="row" className="py-1.5 pr-4 font-normal">
                          {label}
                        </th>
                        <td className="py-1.5 text-right">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </DetailRow>

              <DetailRow title="Alergeni">
                <AllergenList
                  allergens={product.allergens}
                  note={product.allergenNote}
                />
              </DetailRow>

              {product.storage && (
                <DetailRow title="Čuvanje">
                  <p className="body text-charcoal/85">{product.storage}</p>
                </DetailRow>
              )}

              {product.declaration && (
                <DetailRow title="Deklaracija">
                  <p className="body text-charcoal/85">{product.declaration}</p>
                </DetailRow>
              )}
            </div>

            <Link href="/katalog" className="cta-ghost mt-10 inline-flex">
              ← Pogledajte ceo katalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
