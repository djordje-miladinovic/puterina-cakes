import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  CATEGORY_LABELS,
  FLAVOR_LABELS,
  type Category,
  type FlavorKey,
} from "@/lib/products-data"

/**
 * Filter traka kataloga (kat-2 mockup) — sticky ispod header-a.
 * Filteri su ČISTI LINKOVI (server-side filtriranje preko searchParams):
 * rade bez JS, svaka kombinacija ima svoj URL (SEO), scroll se ne resetuje.
 * Red 1: vrsta (Fraunces tabovi + malina hand-underline na aktivnom).
 * Red 2: ukus chips + sezona toggle desno.
 */

export interface FilterState {
  vrsta?: Category
  ukus?: FlavorKey
  sezona: boolean
}

/** Gradi /katalog URL iz kombinacije filtera (prazno = /katalog) */
export function buildFilterHref({ vrsta, ukus, sezona }: FilterState): string {
  const q = new URLSearchParams()
  if (vrsta) q.set("vrsta", vrsta)
  if (ukus) q.set("ukus", ukus)
  if (sezona) q.set("sezona", "1")
  const query = q.toString()
  return query ? `/katalog?${query}` : "/katalog"
}

const VRSTE: { key: Category | undefined; label: string }[] = [
  { key: undefined, label: "Sve" },
  { key: "torte", label: CATEGORY_LABELS.torte },
  { key: "kolaci", label: CATEGORY_LABELS.kolaci },
  { key: "krofnice", label: CATEGORY_LABELS.krofnice },
]

const UKUSI: { key: FlavorKey | undefined; label: string }[] = [
  { key: undefined, label: "Sve" },
  ...(Object.keys(FLAVOR_LABELS) as FlavorKey[]).map((key) => ({
    key: key as FlavorKey | undefined,
    label: FLAVOR_LABELS[key],
  })),
]

export default function FilterBar({ vrsta, ukus, sezona }: FilterState) {
  return (
    <div className="filter-bar md:top-20!">
      <div className="container-site">
        {/* Red 1 — vrsta */}
        <nav className="filter-vrsta" aria-label="Vrsta proizvoda">
          {VRSTE.map((v) => (
            <Link
              key={v.label}
              href={buildFilterHref({ vrsta: v.key, ukus, sezona })}
              scroll={false}
              className={cn(vrsta === v.key && "on")}
              aria-current={vrsta === v.key ? "page" : undefined}
            >
              {v.label}
            </Link>
          ))}
        </nav>

        {/* Red 2 — ukus chips + sezona toggle */}
        <div className="chips" role="group" aria-label="Ukus">
          <span className="grp">Ukus</span>
          {UKUSI.map((f) => (
            <Link
              key={f.label}
              href={buildFilterHref({ vrsta, ukus: f.key, sezona })}
              scroll={false}
              className={cn("chip", ukus === f.key && "on")}
              aria-current={ukus === f.key ? "true" : undefined}
            >
              {f.label}
            </Link>
          ))}
          <Link
            href={buildFilterHref({ vrsta, ukus, sezona: !sezona })}
            scroll={false}
            className={cn("chip-sezona", sezona && "on")}
            aria-current={sezona ? "true" : undefined}
          >
            ✳ Sada u sezoni
          </Link>
        </div>
      </div>
    </div>
  )
}
