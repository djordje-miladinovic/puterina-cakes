import Image from "next/image"
import Link from "next/link"
import Reveal from "@/components/reveal"
import { formatPrice } from "@/lib/utils"
import type { CatalogProduct } from "@/lib/products"

/**
 * Signature ukusi (mockup v6-1): naizmenični asimetrični blokovi
 * slika + tekst (label, naslov, tri-takta opis, cena, presek link)
 * na tint pozadini. Bez kartica i senki.
 */

// Tri-takta opisi za naslovnu (V3-COPY §5) — product strana ima duže
const HOME_COPY: Record<string, string> = {
  "pistac-malina":
    "Hrskavi pistać, svilenkasti krem od bele čokolade i srce od svežih malina. Torta po kojoj me pamte.",
  "kokos-vanila-malina":
    "Nežni kokos, prava Burbon vanila i maline koje se tope. Ukus koji najčešće putuje iz moje radionice.",
}

export default function SignatureSection({
  products,
}: {
  products: CatalogProduct[]
}) {
  const signature = products.filter((p) => p.isSignature).slice(0, 2)
  if (signature.length === 0) return null

  return (
    <section
      id="potpis"
      className="section-block section-tint"
      aria-labelledby="signature-naslov"
    >
      <div className="container-site">
        <Reveal className="mb-14">
          <span className="label mb-4 block">01 — Potpis</span>
          <h2 id="signature-naslov">Ukusi po kojima me pamte</h2>
        </Reveal>

        <div className="space-y-20 md:space-y-28">
          {signature.map((product, i) => {
            const reversed = i % 2 === 1
            return (
              <Reveal key={product.slug}>
                <div
                  className={
                    "grid items-center gap-8 md:gap-16 " +
                    (reversed
                      ? "md:grid-cols-[0.85fr_1.15fr]"
                      : "md:grid-cols-[1.15fr_0.85fr]")
                  }
                >
                  <div
                    className={
                      "img-frame relative aspect-[4/5] " +
                      (reversed ? "md:order-2" : "")
                    }
                  >
                    <Image
                      src={i === 0 ? product.crossSectionImage : product.image}
                      alt={`${product.title}${i === 0 ? ", presek" : ""} — Puterina, butik torti Beograd`}
                      fill
                      sizes="(max-width: 768px) 100vw, 55vw"
                      className="puterina-img object-cover"
                    />
                  </div>

                  <div className={reversed ? "md:order-1" : ""}>
                    <span className="label mb-4 block">Signature</span>
                    <h2 className="mb-4">{product.title}</h2>
                    <p className="body max-w-[38ch] text-ink-muted">
                      {HOME_COPY[product.slug] ?? product.description}
                    </p>
                    {product.pricePerKg && (
                      <p
                        className="mt-6 text-[1.3rem] text-ink"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {formatPrice(product.pricePerKg)}{" "}
                        <span className="text-[0.85rem] text-ink-muted">
                          RSD / kg
                        </span>
                      </p>
                    )}
                    <Link
                      href={`/proizvod/${product.slug}`}
                      className="tlink mt-6 inline-block"
                    >
                      Pogledajte presek
                    </Link>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-16 text-center md:mt-20">
          <Link href="/katalog" className="tlink-arrow">
            Ceo katalog →
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
