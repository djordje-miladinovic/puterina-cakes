import type { Metadata } from "next"
import { CatalogClient } from "@/components/catalog"
import { 
  sanityFetch, 
  PRODUCTS_QUERY, 
  type SanityImage 
} from "@/lib/sanity"

export const metadata: Metadata = {
  title: "Katalog Proizvoda",
  description: "Pregledajte našu kompletnu ponudu torti i kolača sa puter kremom. Svaki proizvod je ručno napravljen sa ljubavlju i najkvalitetnijim sastojcima.",
}

// Revalidate every 60 seconds for fresh content
export const revalidate = 60

interface SanityProduct {
  _id: string
  title: string
  slug: { current: string }
  pricePerKg: number
  shortDescription?: string
  primaryImage?: SanityImage
  secondaryImage?: SanityImage
  isSignature?: boolean
  category?: {
    _id: string
    title: string
    slug: { current: string }
  }
  ukus?: string[]
  prilika?: string[]
  sezona?: string[]
}

// Fallback products when CMS has no data
const fallbackProducts: SanityProduct[] = [
  {
    _id: "fallback-1",
    title: "Čokoladna torta",
    slug: { current: "cokoladna-torta" },
    pricePerKg: 2500,
    shortDescription: "Bogata čokoladna torta sa višeslojnom kremom",
    ukus: ["cokoladni"],
    prilika: ["rodjendan", "svakodnevno"],
    sezona: ["cele-godine"],
  },
  {
    _id: "fallback-2",
    title: "Voćna torta",
    slug: { current: "vocna-torta" },
    pricePerKg: 2300,
    shortDescription: "Osvežavajuća torta sa sezonskim voćem",
    ukus: ["vocni"],
    prilika: ["rodjendan"],
    sezona: ["leto"],
  },
]

export default async function KatalogPage() {
  // Fetch products from Sanity CMS
  let products: SanityProduct[]
  
  try {
    products = await sanityFetch<SanityProduct[]>({
      query: PRODUCTS_QUERY,
    })
  } catch (error) {
    console.error("Error fetching products from Sanity:", error)
    products = []
  }

  // Use fallback if no products
  if (!products || products.length === 0) {
    products = fallbackProducts
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-12 md:pt-28">
      <h1 className="text-4xl font-bold mb-4">Katalog Proizvoda</h1>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Otkrijte našu kolekciju ručno pravljenih torti sa puter kremom. 
        Svaka torta je napravljena sa pažnjom i najkvalitetnijim sastojcima.
      </p>
      
      <CatalogClient products={products} />
    </div>
  )
}
