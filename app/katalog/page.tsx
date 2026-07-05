import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/reveal"
import FilterBar, { buildFilterHref } from "@/components/catalog/FilterBar"
import ProductCard from "@/components/catalog/ProductCard"
import { SITE } from "@/lib/constants"
import { getAllProducts } from "@/lib/products"
import type { Category, FlavorKey } from "@/lib/products-data"

export const metadata: Metadata = {
  title: "Katalog torti i kolača | Puterina — butik torti Beograd",
  description:
    "Sezonski ukusi: pistać-malina, kokos-vanila-malina i drugi. Sve cene su po kilogramu, dekoracija se dogovara posebno. Butik torti, Beograd.",
}

export const revalidate = 60

const VALID_VRSTE: Category[] = ["torte", "kolaci", "krofnice"]
const VALID_UKUSI: FlavorKey[] = ["cokolada", "voce", "orasasto", "vanila-krem"]

/**
 * Katalog V3 (mockup kat-2): filter traka (Vrsta · Ukus · Sezona) —
 * server-side filtriranje preko searchParams, filteri su linkovi
 * (rade bez JS, svaka kombinacija ima URL). Borderless kartice.
 */
export default async function KatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ vrsta?: string; ukus?: string; sezona?: string }>
}) {
  const params = await searchParams
  const vrsta = VALID_VRSTE.includes(params.vrsta as Category)
    ? (params.vrsta as Category)
    : undefined
  const ukus = VALID_UKUSI.includes(params.ukus as FlavorKey)
    ? (params.ukus as FlavorKey)
    : undefined
  const sezona = params.sezona === "1"

  const products = await getAllProducts()
  const shown = products.filter((p) => {
    if (vrsta && p.category !== vrsta) return false
    if (ukus && !p.flavors.includes(ukus)) return false
    if (sezona && !p.seasonal) return false
    return true
  })

  const prikazujeKolace = shown.some((p) => p.category === "kolaci")

  return (
    <div className="section-cream min-h-screen pb-24 pt-28 md:pb-32 md:pt-32">
      {/* Naslov strane */}
      <div className="container-site pb-8 pt-8 md:pt-12">
        <Reveal>
          <span className="label mb-4 block">Katalog</span>
          <h1>
            Ukusi koje
            <br />
            trenutno pravim
          </h1>
          <p className="mt-4 max-w-[46ch] text-ink-muted">
            Sve cene su po kilogramu. Ukusi se menjaju sezonski. Za 20 gostiju
            računajte tortu od 2–2,5 kg. Dekoracija se dogovara posebno.
          </p>
        </Reveal>
      </div>

      {/* Filter traka — sticky */}
      <FilterBar vrsta={vrsta} ukus={ukus} sezona={sezona} />

      <div className="container-site pt-11">
        {/* Krofnice uvodna linija (V3-COPY §11.4) */}
        {vrsta === "krofnice" && (
          <p className="mb-9 max-w-[52ch] text-[15px] text-ink-muted">
            Punjene onim što i torte: pistać i malina, čokolada, pralina. Samo
            manje čekaju red.
          </p>
        )}

        {shown.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 md:gap-x-10 md:gap-y-11">
            {shown.map((product, i) => (
              <Reveal key={product.slug} delay={((i % 3) as 0 | 1 | 2)}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        ) : (
          /* Prazan rezultat (V3-COPY §11.3) */
          <div className="py-16 text-center">
            <p className="mx-auto max-w-[46ch] text-ink-muted">
              Ova kombinacija mi je trenutno prazna. Probajte bez jednog ukusa
              — ili mi{" "}
              <Link href="/kontakt" className="text-oliva hover:opacity-80">
                pišite
              </Link>
              , možda baš to umem da napravim.
            </p>
            <Link
              href={buildFilterHref({ sezona: false })}
              className="tlink mt-6 inline-block"
            >
              poništi izbor
            </Link>
          </div>
        )}

        {/* Lux kolači napomena (§12 #10) */}
        {prikazujeKolace && (
          <p className="mt-12 text-[14px] text-ink-muted">{SITE.luxNote}</p>
        )}

        <p className="mt-12 text-[14px] text-ink-muted">
          Ne vidite ukus koji tražite? Ukusi se smenjuju kroz godinu —{" "}
          <Link href="/kontakt" className="text-oliva hover:opacity-80">
            javite mi se
          </Link>
          , možda baš to pravim ove nedelje. {SITE.minOrderNote}
        </p>
      </div>
    </div>
  )
}
