import { sanityFetch, PRODUCTS_QUERY } from "@/lib/sanity"
import {
  PRODUCTS,
  getProductBySlug,
  type ProductData,
  type Category,
  type FlavorKey,
  type Declaration,
} from "@/lib/products-data"

/**
 * V3: SANITY JE IZVOR ISTINE za katalog. getAllProducts() čita proizvode iz
 * Sanity-ja i mapira ih u ProductData oblik koji stranice očekuju. Ako Sanity
 * ne vrati ništa (prazan dataset / greška), pada nazad na kod (lib/products-data)
 * da sajt nikad ne ostane bez kataloga.
 *
 * Slike se drže kao putanje u /public (imagePath/crossSectionPath/gallery) dok
 * se ne pređe na Sanity asset upload (V4 — foto faza B).
 */

export type CatalogProduct = ProductData & { fromSanity: boolean }

interface SanityDeclaration {
  officialName?: string
  sastojci?: string
  alergeni?: string
  cuvanje?: string
  rok?: string
  netoMasa?: string
  nutritivno?: { label?: string; value?: string }[]
  proizvodjac?: string
}

interface SanityProductRow {
  _id: string
  title?: string
  slug?: string
  category?: string
  isSignature?: boolean
  pricePerKg?: number
  priceNote?: string
  seasonal?: { badge?: string; note?: string }
  flavors?: string[]
  shortDescription?: string
  description?: string
  layers?: string[]
  ingredientsShort?: string
  imagePath?: string
  crossSectionPath?: string
  gallery?: string[]
  declaration?: SanityDeclaration
}

const VALID_CATEGORY: Category[] = ["torte", "kolaci", "krofnice"]
const PLACEHOLDER = "/images/site/hero.jpg"

function mapDeclaration(d?: SanityDeclaration): Declaration | null {
  // Deklaracija se smatra postojećom samo ako ima sastojke i alergene
  if (!d || !d.sastojci || !d.alergeni) return null
  return {
    officialName: d.officialName ?? "",
    sastojci: d.sastojci,
    alergeni: d.alergeni,
    cuvanje: d.cuvanje ?? "Čuvati na temperaturi do +5 °C.",
    rok: d.rok ?? "7 dana od datuma proizvodnje.",
    netoMasa: d.netoMasa ?? "",
    nutritivno: (d.nutritivno ?? [])
      .filter((n) => n.label && n.value)
      .map((n) => ({ label: n.label as string, value: n.value as string })),
    proizvodjac: d.proizvodjac ?? "",
  }
}

function mapSanityProduct(row: SanityProductRow): ProductData | null {
  if (!row.slug || !row.title) return null
  const category = VALID_CATEGORY.includes(row.category as Category)
    ? (row.category as Category)
    : "torte"
  const image = row.imagePath || PLACEHOLDER
  return {
    slug: row.slug,
    title: row.title,
    category,
    isSignature: Boolean(row.isSignature),
    pricePerKg: typeof row.pricePerKg === "number" ? row.pricePerKg : null,
    priceNote: row.priceNote,
    seasonal:
      row.seasonal?.badge && row.seasonal?.note
        ? { badge: row.seasonal.badge, note: row.seasonal.note }
        : undefined,
    flavors: (row.flavors ?? []).filter(Boolean) as FlavorKey[],
    shortDescription: row.shortDescription ?? "",
    description: row.description ?? "",
    layers: row.layers ?? [],
    ingredientsShort: row.ingredientsShort,
    image,
    crossSectionImage: row.crossSectionPath || image,
    gallery: row.gallery && row.gallery.length > 0 ? row.gallery : [image],
    declaration: mapDeclaration(row.declaration),
  }
}

export async function getAllProducts(): Promise<CatalogProduct[]> {
  try {
    const rows =
      (await sanityFetch<SanityProductRow[]>({ query: PRODUCTS_QUERY })) ?? []
    const mapped = rows
      .map(mapSanityProduct)
      .filter((p): p is ProductData => p !== null)
    if (mapped.length > 0) {
      return mapped.map((p) => ({ ...p, fromSanity: true }))
    }
  } catch {
    // pad na kod ispod
  }
  // Fallback — dataset prazan ili nedostupan
  return PRODUCTS.map((p) => ({ ...p, fromSanity: false }))
}

export async function getProduct(
  slug: string
): Promise<CatalogProduct | undefined> {
  const all = await getAllProducts()
  return all.find((p) => p.slug === slug)
}

/** Slugovi za generateStaticParams — stabilni iz koda (build-time). */
export function getStaticProductSlugs(): string[] {
  return PRODUCTS.map((p) => p.slug)
}

export { getProductBySlug }
