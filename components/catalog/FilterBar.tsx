import Link from "next/link"
import { cn } from "@/lib/utils"
import { CATEGORY_LABELS, type Category } from "@/lib/products-data"

/**
 * Filter traka kataloga — sticky ispod header-a. JEDNA linija vrste:
 * „Sve · Torte · Kolači · Krofnice". Filteri su čisti LINKOVI (server-side
 * preko searchParams): rade bez JS, svaka vrsta ima svoj URL (SEO).
 */

/** Gradi /katalog URL za izabranu vrstu (prazno = /katalog = Sve) */
export function buildFilterHref(vrsta?: Category): string {
  return vrsta ? `/katalog?vrsta=${vrsta}` : "/katalog"
}

const VRSTE: { key: Category | undefined; label: string }[] = [
  { key: undefined, label: "Sve" },
  { key: "torte", label: CATEGORY_LABELS.torte },
  { key: "kolaci", label: CATEGORY_LABELS.kolaci },
  { key: "krofnice", label: CATEGORY_LABELS.krofnice },
]

export default function FilterBar({ vrsta }: { vrsta?: Category }) {
  return (
    <div className="filter-bar md:top-20!">
      <div className="container-site">
        <nav className="filter-vrsta" aria-label="Vrsta proizvoda">
          {VRSTE.map((v) => (
            <Link
              key={v.label}
              href={buildFilterHref(v.key)}
              scroll={false}
              className={cn(vrsta === v.key && "on")}
              aria-current={vrsta === v.key ? "page" : undefined}
            >
              {v.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
