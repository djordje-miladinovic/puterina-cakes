import Image from "next/image"
import Link from "next/link"
import Reveal from "@/components/reveal"
import type { CatalogProduct } from "@/lib/products"

/**
 * Signature ukusi (ZA-PUTERINU §3.2): dve velike fotografije, asimetrično
 * (henri-charpentier), hover otkriva presek. Bez kartica i senki.
 */
export default function SignatureSection({
  products,
}: {
  products: CatalogProduct[]
}) {
  const signature = products.filter((p) => p.isSignature).slice(0, 2)
  if (signature.length === 0) return null

  return (
    <section className="section-block section-cream" aria-labelledby="signature-naslov">
      <div className="container-site">
        <Reveal>
          <h2 id="signature-naslov" className="mb-14 md:mb-20">
            Signature ukusi
          </h2>
        </Reveal>

        <div className="grid gap-12 md:grid-cols-2 md:gap-10">
          {signature.map((product, i) => (
            <Reveal
              key={product.slug}
              delay={i === 1 ? 1 : 0}
              className={i === 1 ? "md:mt-24" : ""}
            >
              <Link
                href={`/proizvod/${product.slug}`}
                className="group block"
              >
                <div className="img-frame relative aspect-[4/5]">
                  <Image
                    src={product.image}
                    alt={`${product.title} — Puterina, butik torti Beograd`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="puterina-img object-cover"
                  />
                  <Image
                    src={product.crossSectionImage}
                    alt={`${product.title}, presek — vide se slojevi`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="puterina-img object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
                <h3 className="mt-6 group-hover:text-warm-brown-deep transition-colors">
                  {product.title}
                </h3>
                <p className="body mt-2 max-w-md text-charcoal/80">
                  {product.shortDescription}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
