import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { notFound } from "next/navigation"
import { ProductGallery } from "@/components/product"
import { CANONICAL_BASE, CONTACT } from "@/lib/constants"
import { getSiteSettings } from "@/lib/site-settings"
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
      // Namenska OG kartica (F2a): fotografija + traka „Puterina · naziv · cena"
      images: [
        {
          url: `${CANONICAL_BASE}/og/${product.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: `${product.title} — Puterina, butik torti Beograd`,
        },
      ],
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
 * Strana proizvoda V4 — varijanta C2 „Cenovni blok" (mockup v4-prod-2):
 * levo galerija sa pločicom „pogledajte presek" (#10b) i fade-om kroz
 * krem (#22b), desno sticky info (#9b): label → ime → podnaslov →
 * cenovni blok na bg2 (cena + uslovi) → CTA Pozovite → utisci link
 * (#16b) → poruke (WA/Viber sa imenom torte, #11a) → opis → sezona →
 * accordion (deklaracija!).
 */
export default async function ProizvodPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [product, settings] = await Promise.all([
    getProduct(slug),
    getSiteSettings(),
  ])
  if (!product) notFound()

  const dekl = product.declaration

  // #9b — uslovi u cenovnom bloku, jedan sitan red:
  // „Najmanja porudžbina: 1 kg · Dekoracija se dogovara posebno"
  const usloviRed = [settings.minOrderNote, settings.decorationNoteShort]
    .map((t) => t.trim().replace(/\.$/, ""))
    .join(" · ")

  // #11a — prefilled poruka sa imenom proizvoda (torta samo za torte;
  // krofnice/kolači već nose vrstu u imenu)
  const nazivZaPoruku =
    product.category === "torte" ? `torta ${product.title}` : product.title
  const poruka = encodeURIComponent(
    `Zdravo! Zanima me ${nazivZaPoruku} za [datum], za otprilike [broj] gostiju. Hvala!`
  )
  const whatsappHref = `https://wa.me/${CONTACT.phone.replace("+", "")}?text=${poruka}`
  const viberHref = `viber://chat?number=${encodeURIComponent(CONTACT.phone)}&draft=${poruka}`

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
          {/* Galerija — levo (#10b pločica preseka + #22b fade kroz krem) */}
          <div>
            <ProductGallery
              images={galleryImages}
              productName={product.title}
              slug={product.slug}
              crossSectionSrc={
                imaPresek ? product.crossSectionImage : undefined
              }
            />
          </div>

          {/* Info — desno, sticky. Data-atributi: čita ih mobilni
              OrderSheet za prefilled poruku (#11a) */}
          <div
            className="lg:sticky lg:top-24 lg:self-start"
            data-product-title={product.title}
            data-product-kind={product.category}
          >
            <span className="label mb-3 block">{label}</span>
            <h1 className="!text-[clamp(2.4rem,5vw,3.6rem)]">{product.title}</h1>
            <p className="mt-2 text-[15px] text-ink-muted">
              {product.shortDescription}
            </p>

            {/* Cenovni blok (#9b) — cena + uslovi na bg2, bez senke */}
            <div className="mt-6 rounded-[4px] bg-bg2 p-[18px]">
              <p
                className="text-[2rem] leading-[1.15] text-ink"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontVariationSettings: '"opsz" 60',
                }}
              >
                {product.pricePerKg ? (
                  <>
                    {formatPrice(product.pricePerKg)}{" "}
                    <span className="text-[0.62em] text-ink-muted">
                      RSD / kg
                    </span>
                  </>
                ) : (
                  <span className="italic">
                    {product.priceNote ?? "cena na upit"}
                  </span>
                )}
              </p>
              <p className="mt-2 text-[13px] text-ink-muted">{usloviRed}</p>
            </div>

            {/* CTA odmah ispod cenovnog bloka (§12 hijerarhija) */}
            <div className="mt-[18px]">
              <a href={`tel:${CONTACT.phone}`} className="cta-primary">
                Pozovite — {CONTACT.phoneDisplay}
              </a>

              {/* #16b — utisci link; strelica u span-u za budući hover */}
              <p className="mt-4">
                <Link href="/utisci" className="tlink-arrow">
                  Šta kažu oni koji su je probali{" "}
                  <span className="ar" aria-hidden>
                    →
                  </span>
                </Link>
              </p>

              <p className="mt-4 text-[13.5px] text-ink-muted">
                ili pišite:{" "}
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-oliva hover:opacity-80"
                >
                  WhatsApp
                </a>
                {" · "}
                <a href={viberHref} className="text-oliva hover:opacity-80">
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
