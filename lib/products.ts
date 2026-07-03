import { sanityFetch, PRODUCTS_QUERY, getImageUrl } from "@/lib/sanity"
import type { SanityImage } from "@/lib/sanity"
import {
  DUMMY_PRODUCTS,
  getDummyProduct,
  type ProductData,
} from "@/lib/dummy-data"

/**
 * Jedinstven izvor proizvoda za sve stranice tokom pregleda dizajna:
 * kurirani dummy copy + lokalne fotografije pobeđuju, Sanity daje cenu.
 *
 * TODO(V3): kada vlasnica unese prave tekstove i profesionalne fotke u
 * Sanity, okrenuti merge u korist Sanity-ja (copy, slike preko urlFor)
 * i isprazniti DUMMY_PRODUCTS — vidi docs/RUNBOOK-novi-proizvod.md.
 */

interface SanityProductRow {
  _id: string
  title?: string
  slug?: { current?: string }
  shortDescription?: string
  pricePerKg?: number
  primaryImage?: SanityImage
  secondaryImage?: SanityImage
  isSignature?: boolean
}

export type CatalogProduct = ProductData & { fromSanity: boolean }

// Ispravka poznatog vulgarnog typo sluga u datasetu dok se ne zakrpi
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

  const merged: CatalogProduct[] = DUMMY_PRODUCTS.map((dummy) => {
    const sanity = bySlug.get(dummy.slug)
    if (!sanity) return { ...dummy, fromSanity: false }
    bySlug.delete(dummy.slug)
    // Kurirani copy (title/shortDescription) uvek pobeđuje dok postojeći
    // Sanity unosi sadrže radne/placeholder tekstove; Sanity daje cenu.
    return {
      ...dummy,
      pricePerKg: sanity.pricePerKg ?? dummy.pricePerKg,
      isSignature: dummy.isSignature || Boolean(sanity.isSignature),
      fromSanity: true,
    }
  })

  // Sanity proizvodi koji ne postoje u dummy setu (buduće prave torte)
  for (const [slug, row] of bySlug) {
    const image =
      getImageUrl(row.primaryImage, 1200) ?? "/images/dummy/kolaci-1.jpg"
    const crossSection =
      getImageUrl(row.secondaryImage, 1200) ?? image
    merged.push({
      slug,
      title: row.title ?? slug,
      category: "torte",
      isSignature: Boolean(row.isSignature),
      pricePerKg: row.pricePerKg ?? 0,
      shortDescription: row.shortDescription ?? "",
      layers: [],
      ingredients: "",
      allergens: [],
      storage: "",
      nutrition: {
        energy: "—",
        protein: "—",
        carbs: "—",
        sugars: "—",
        fat: "—",
        saturatedFat: "—",
        salt: "—",
      },
      image,
      crossSectionImage: crossSection,
      gallery: [image, crossSection],
      declaration: "",
      fromSanity: true,
    })
  }

  return merged
}

export async function getProduct(
  slug: string
): Promise<CatalogProduct | undefined> {
  const all = await getAllProducts()
  return all.find((p) => p.slug === normalizeSlug(slug))
}

export function getStaticProductSlugs(): string[] {
  return DUMMY_PRODUCTS.map((p) => p.slug)
}

export { getDummyProduct }
