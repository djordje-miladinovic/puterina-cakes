import Link from "next/link"
import Reveal from "@/components/reveal"
import ProductCard from "@/components/catalog/ProductCard"
import { SITE } from "@/lib/constants"
import type { CatalogProduct } from "@/lib/products"

/**
 * „Ovo trenutno pravim" (mockup v6-1): 3 borderless kartice na tint
 * pozadini — katalog teaser. Kartice dele komponentu sa katalogom.
 */
const FEATURED_SLUGS = [
  "cokoladna-fantazija",
  "lesnikova-pralina-sa-malinom",
  "letnja-torta",
]

export default function FeaturedProductsSection({
  products,
}: {
  products: CatalogProduct[]
}) {
  const featured = FEATURED_SLUGS.map((slug) =>
    products.find((p) => p.slug === slug)
  ).filter((p): p is CatalogProduct => Boolean(p))

  if (featured.length === 0) return null

  return (
    <section
      className="section-block section-tint"
      aria-labelledby="ponuda-naslov"
    >
      <div className="container-site">
        <Reveal className="mb-14">
          <span className="label mb-4 block">03 — Iz radionice</span>
          <h2 id="ponuda-naslov">Ovo trenutno pravim</h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 md:gap-x-10 md:gap-y-12">
          {featured.map((product, i) => (
            <Reveal key={product.slug} delay={((i % 3) as 0 | 1 | 2)}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-13 text-center md:mt-14">
          <p className="mb-5 text-[14px] text-ink-muted">
            Sve cene su po kilogramu. Za 20 gostiju računajte 2–2,5 kg.
          </p>
          <Link href="/katalog" className="tlink-arrow">
            Ceo katalog →
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
