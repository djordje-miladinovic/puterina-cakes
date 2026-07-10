import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/reveal"
import FilterBar from "@/components/catalog/FilterBar"
import ProductCard from "@/components/catalog/ProductCard"
import { SITE } from "@/lib/constants"
import { getAllProducts } from "@/lib/products"
import type { Category } from "@/lib/products-data"

export const metadata: Metadata = {
  title: "Katalog torti i kolača | Puterina — butik torti Beograd",
  description:
    "Sezonski ukusi: pistać-malina, kokos-vanila-malina i drugi. Sve cene su po kilogramu, dekoracija se dogovara posebno. Butik torti, Beograd.",
}

export const revalidate = 60

const VALID_VRSTE: Category[] = ["torte", "kolaci", "krofnice"]

/**
 * Katalog V3: jedan filter po vrsti (Torte · Kolači · Krofnice) —
 * server-side preko searchParams, filteri su linkovi (rade bez JS, svaka
 * vrsta ima URL). Bez „Sve": /katalog se uvek otvara na tortama
 * (odluka 2026-07-10). Borderless kartice.
 */
export default async function KatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ vrsta?: string }>
}) {
  const params = await searchParams
  const vrsta: Category = VALID_VRSTE.includes(params.vrsta as Category)
    ? (params.vrsta as Category)
    : "torte"

  const products = await getAllProducts()
  const shown = products.filter((p) => p.category === vrsta)

  const prikazujeKolace = shown.some((p) => p.category === "kolaci")

  return (
    <div className="section-cream min-h-screen pb-24 pt-24 md:pb-32 md:pt-32">
      {/* Naslov strane */}
      <div className="container-site pb-8 pt-4 md:pt-12">
        <Reveal>
          <span className="label mb-4 block">Katalog</span>
          <h1>
            Ukusi koje
            <br />
            trenutno pravim
          </h1>
          <p className="mt-4 max-w-[46ch] text-ink-muted">
            Sve cene su po kilogramu. Ukusi se menjaju sezonski. Dekoracija se
            dogovara posebno.
          </p>
        </Reveal>
      </div>

      {/* Filter traka — sticky */}
      <FilterBar vrsta={vrsta} />

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
          /* Prazan rezultat */
          <div className="py-16 text-center">
            <p className="mx-auto max-w-[46ch] text-ink-muted">
              Ovde trenutno nemam ništa. Pogledajte ostale vrste — ili mi{" "}
              <Link href="/kontakt" className="text-oliva hover:opacity-80">
                pišite
              </Link>
              , možda baš to umem da napravim.
            </p>
            <Link href="/katalog" className="tlink tlink-tap mt-4 inline-block">
              pogledajte torte
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
