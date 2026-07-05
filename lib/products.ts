import { sanityFetch, PRODUCTS_QUERY } from "@/lib/sanity"
import {
  PRODUCTS,
  getProductBySlug,
  type ProductData,
} from "@/lib/products-data"

/**
 * Jedinstven izvor proizvoda za sve stranice — V3:
 * lib/products-data.ts sadrži PRAVE podatke (cene sa IG cenovnika
 * potvrđene sveskom, deklaracije iz Deklaracije.txt, prave fotografije).
 * Sanity može da PREGAZI SAMO cenu (brza korekcija bez deploy-a);
 * sav sadržaj (copy, slike, deklaracije) dolazi iz koda dok se
 * u F5 fazi pravi katalog ne preseli u Sanity (vidi V3-PLAN).
 */

interface SanityProductRow {
  _id: string
  title?: string
  slug?: { current?: string }
  pricePerKg?: number
  isSignature?: boolean
}

export type CatalogProduct = ProductData & { fromSanity: boolean }

// Ispravka poznatog typo sluga u datasetu (zakrpljeno i u Sanity-ju)
const SLUG_ALIASES: Record<string, string> = {
  "pizdac-malina": "pistac-malina",
}

function normalizeSlug(raw: string | undefined): string {
  if (!raw) return ""
  return SLUG_ALIASES[raw] ?? raw
}

export async function getAllProducts(): Promise<CatalogProduct[]> {
  let sanityRows: SanityProductRow[] = []
  try {
    sanityRows =
      (await sanityFetch<SanityProductRow[]>({ query: PRODUCTS_QUERY })) ?? []
  } catch {
    sanityRows = []
  }

  const bySlug = new Map<string, SanityProductRow>()
  for (const row of sanityRows) {
    const slug = normalizeSlug(row.slug?.current)
    if (slug) bySlug.set(slug, row)
  }

  // Pravi podaci iz koda pobeđuju — UKLJUČUJUĆI cenu: Sanity dataset još
  // sadrži V2 dummy unose sa STARIM cenama (npr. pistac-malina 3.700
  // umesto pravih 4.200). TODO(F5): kada se dataset očisti i dobije prave
  // proizvode, okrenuti prioritet cene ka Sanity-ju (korekcija bez deploy-a).
  return PRODUCTS.map((product) => ({
    ...product,
    fromSanity: bySlug.has(product.slug),
  }))
}

export async function getProduct(
  slug: string
): Promise<CatalogProduct | undefined> {
  const all = await getAllProducts()
  return all.find((p) => p.slug === normalizeSlug(slug))
}

export function getStaticProductSlugs(): string[] {
  return PRODUCTS.map((p) => p.slug)
}

export { getProductBySlug }
