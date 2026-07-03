import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Reveal from "@/components/reveal"
import { SITE } from "@/lib/constants"
import { formatPrice, cn } from "@/lib/utils"
import { getAllProducts } from "@/lib/products"

export const metadata: Metadata = {
  title: "Katalog torti i kolača",
  description:
    "Sezonski ukusi: pistać-malina, kokos-vanila-malina i drugi. Sve cene su po kilogramu, dekoracija se naplaćuje posebno. Butik torti, Beograd.",
}

export const revalidate = 60

/**
 * Katalog (ZA-PUTERINU §4): samo dva izbora — Torte | Kolači, bez filtera
 * i pretrage. Uredna mreža bez okvira; signature torte krupnije, sa
 * diskretnom serif oznakom. Hover otkriva presek.
 */
export default async function KatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ k?: string }>
}) {
  const { k } = await searchParams
  const activeTab: "torte" | "kolaci" = k === "kolaci" ? "kolaci" : "torte"

  const products = await getAllProducts()
  const shown = products.filter((p) => p.category === activeTab)

  return (
    <div className="section-cream min-h-screen pt-28 pb-24 md:pt-36 md:pb-32">
      <div className="container-site">
        <Reveal>
          <h1>Katalog</h1>
          <p className="body-large mt-4 max-w-xl text-charcoal/75">
            Ukusi se menjaju sezonski — ovo trenutno pravim za Vas.
          </p>
        </Reveal>

        {/* Tabovi Torte | Kolači */}
        <nav aria-label="Kategorije" className="mt-10 flex gap-8">
          <Link
            href="/katalog"
            aria-current={activeTab === "torte" ? "page" : undefined}
            className={cn(
              "h3 transition-colors",
              activeTab === "torte"
                ? "hand-underline text-warm-brown"
                : "text-charcoal/50 hover:text-warm-brown"
            )}
          >
            Torte
          </Link>
          <Link
            href="/katalog?k=kolaci"
            aria-current={activeTab === "kolaci" ? "page" : undefined}
            className={cn(
              "h3 transition-colors",
              activeTab === "kolaci"
                ? "hand-underline text-warm-brown"
                : "text-charcoal/50 hover:text-warm-brown"
            )}
          >
            Kolači
          </Link>
        </nav>

        {/* Grid — signature krupnije (cyrillignac obrazac) */}
        <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-6 md:gap-x-8 md:gap-y-16">
          {shown.map((product, i) => (
            <Reveal
              key={product.slug}
              delay={((i % 3) as 0 | 1 | 2)}
              className={cn(
                "col-span-1",
                product.isSignature ? "col-span-2 md:col-span-3" : "md:col-span-2"
              )}
            >
              <Link href={`/proizvod/${product.slug}`} className="group block">
                <div
                  className={cn(
                    "img-frame relative",
                    product.isSignature ? "aspect-[4/3]" : "aspect-square"
                  )}
                >
                  <Image
                    src={product.image}
                    alt={`${product.title} — Puterina, butik torti Beograd`}
                    fill
                    sizes={
                      product.isSignature
                        ? "(max-width: 768px) 100vw, 50vw"
                        : "(max-width: 768px) 50vw, 33vw"
                    }
                    className="puterina-img object-cover"
                  />
                  <Image
                    src={product.crossSectionImage}
                    alt={`${product.title}, presek`}
                    fill
                    sizes={
                      product.isSignature
                        ? "(max-width: 768px) 100vw, 50vw"
                        : "(max-width: 768px) 50vw, 33vw"
                    }
                    className="puterina-img object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>

                {product.isSignature && (
                  <p
                    className="mt-4 text-sm italic text-raspberry"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Signature
                  </p>
                )}
                <h2
                  className={cn(
                    "!text-xl md:!text-2xl group-hover:text-warm-brown-deep transition-colors",
                    product.isSignature ? "mt-1" : "mt-4"
                  )}
                >
                  {product.title}
                </h2>
                <p className="body-small mt-1 text-charcoal/70">
                  {formatPrice(product.pricePerKg)} RSD/kg
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <p className="body-small mt-16 text-charcoal/60">
          {SITE.catalogPriceNote}
        </p>
      </div>
    </div>
  )
}
