import Image from "next/image"
import Link from "next/link"
import Reveal from "@/components/reveal"
import { SITE } from "@/lib/constants"
import { formatPrice } from "@/lib/utils"
import type { CatalogProduct } from "@/lib/products"

/**
 * „Iz naše ponude" (ZA-PUTERINU §3.4): 4–6 najlepših torti, čiste
 * fotografije bez okvira/kartica, hover otkriva presek, ime + cena/kg.
 */
export default function FeaturedProductsSection({
  products,
}: {
  products: CatalogProduct[]
}) {
  const featured = [
    ...products.filter((p) => p.category === "torte" && !p.isSignature),
  ].slice(0, 6)

  if (featured.length === 0) return null

  return (
    <section
      className="section-block section-soft-white"
      aria-labelledby="ponuda-naslov"
    >
      <div className="container-site">
        <Reveal>
          <h2 id="ponuda-naslov" className="mb-14 md:mb-20">
            Iz naše ponude
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 md:gap-x-10 md:gap-y-16">
          {featured.map((product, i) => (
            <Reveal key={product.slug} delay={((i % 3) as 0 | 1 | 2)}>
              <Link href={`/proizvod/${product.slug}`} className="group block">
                <div className="img-frame relative aspect-square">
                  <Image
                    src={product.image}
                    alt={`${product.title} — Puterina, butik torti Beograd`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="puterina-img object-cover"
                  />
                  <Image
                    src={product.crossSectionImage}
                    alt={`${product.title}, presek`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="puterina-img object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
                <h3 className="mt-4 text-lg md:text-xl group-hover:text-warm-brown-deep transition-colors">
                  {product.title}
                </h3>
                <p className="body-small mt-1 text-charcoal/70">
                  {formatPrice(product.pricePerKg)} RSD/kg
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <p className="body-small text-charcoal/60">{SITE.catalogPriceNote}</p>
          <Link href="/katalog" className="cta-outline">
            Pogledajte ceo katalog →
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
