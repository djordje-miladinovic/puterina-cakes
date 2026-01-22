import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import { PortableText } from "@portabletext/react"
import type { PortableTextBlock } from "@portabletext/types"
import { CANONICAL_BASE } from "@/lib/constants"
import { 
  ProductGallery, 
  ProductInfo, 
  type AllergenType, 
} from "@/components/product"
import {
  sanityFetch,
  PRODUCT_BY_SLUG_QUERY,
  PRODUCT_SLUGS_QUERY,
  getImageUrl,
  toGalleryImages,
  type SanityImage,
  type SanityGalleryImage,
} from "@/lib/sanity"

// Revalidate every 60 seconds
export const revalidate = 60

// ============================================================================
// Types
// ============================================================================

interface SanityProduct {
  _id: string
  title: string
  slug: { current: string }
  pricePerKg: number
  shortDescription?: string
  description?: PortableTextBlock[]
  image?: SanityImage
  gallery?: SanityGalleryImage[]
  crossSectionImage?: SanityImage
  storage?: string
  ingredients?: string
  nutrition?: {
    energy?: number
    protein?: number
    carbs?: number
    sugars?: number
    fat?: number
    saturatedFat?: number
    fiber?: number
    salt?: number
  }
  allergens?: AllergenType[]
  declaration?: PortableTextBlock[]
  isSignature?: boolean
  category?: {
    _id: string
    title: string
    slug: { current: string }
  }
}

// ============================================================================
// Fallback Data
// ============================================================================

const fallbackProducts: Record<string, SanityProduct> = {
  "cokoladna-torta": {
    _id: "fallback-1",
    title: "Čokoladna torta",
    slug: { current: "cokoladna-torta" },
    pricePerKg: 2500,
    shortDescription:
      "Bogata čokoladna torta sa višeslojnom kremom. Savršena kombinacija tamne čokolade i kremaste punjene.",
    storage: "Čuvati u frižideru na temperaturi od +4°C do +8°C. Rok trajanja: 3 dana od datuma izrade. Pre konzumacije ostaviti 30 minuta na sobnoj temperaturi za najbolji ukus.",
    ingredients:
      "Brašno (pšenično), šećer, jaja, putar, mleko, čokolada (70% kakao), kakao prah, prašak za pecivo, so, vanilin ekstrakt.",
    nutrition: {
      energy: 380,
      protein: 6,
      carbs: 45,
      sugars: 32,
      fat: 18,
      saturatedFat: 10,
      fiber: 3,
      salt: 0.5,
    },
    allergens: ["gluten", "milk", "eggs"],
  },
  "vocna-torta": {
    _id: "fallback-2",
    title: "Voćna torta",
    slug: { current: "vocna-torta" },
    pricePerKg: 2300,
    shortDescription:
      "Osvežavajuća torta sa sezonskim voćem. Lagana biskvit osnova sa svežim voćem i kremom.",
    storage: "Čuvati u frižideru na temperaturi od +4°C do +8°C. Rok trajanja: 2 dana od datuma izrade.",
    ingredients:
      "Brašno (pšenično), šećer, jaja, putar, mleko, sezonsko voće, šlag, mascarpone, prašak za pecivo, so, vanilin ekstrakt.",
    nutrition: {
      energy: 320,
      protein: 5,
      carbs: 42,
      sugars: 28,
      fat: 14,
      saturatedFat: 8,
      fiber: 2,
      salt: 0.4,
    },
    allergens: ["gluten", "milk", "eggs"],
  },
}

// ============================================================================
// Data Fetching
// ============================================================================

async function getProduct(slug: string): Promise<SanityProduct | null> {
  try {
    const product = await sanityFetch<SanityProduct | null>({
      query: PRODUCT_BY_SLUG_QUERY,
      params: { slug },
    })
    
    if (product) return product
  } catch (error) {
    console.error("Error fetching product from Sanity:", error)
  }
  
  // Return fallback if exists
  return fallbackProducts[slug] || null
}

// ============================================================================
// Static Generation
// ============================================================================

export async function generateStaticParams() {
  try {
    const slugs = await sanityFetch<string[]>({
      query: PRODUCT_SLUGS_QUERY,
    })
    
    // Combine Sanity slugs with fallback slugs
    const allSlugs = new Set([
      ...(slugs || []),
      ...Object.keys(fallbackProducts),
    ])
    
    return Array.from(allSlugs).map((slug) => ({ slug }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return Object.keys(fallbackProducts).map((slug) => ({ slug }))
  }
}

// ============================================================================
// Metadata
// ============================================================================

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    return {
      title: "Proizvod nije pronađen",
    }
  }

  // Get main image URL for OpenGraph
  const mainImageUrl = product.gallery?.[0] 
    ? getImageUrl(product.gallery[0], 1200, 630)
    : product.image 
    ? getImageUrl(product.image, 1200, 630)
    : undefined

  return {
    title: product.title,
    description: product.shortDescription || `${product.title} - Puterina Cakes`,
    alternates: {
      canonical: `${CANONICAL_BASE}/proizvod/${slug}`,
    },
    openGraph: {
      title: product.title,
      description: product.shortDescription || `${product.title} - Puterina Cakes`,
      url: `${CANONICAL_BASE}/proizvod/${slug}`,
      ...(mainImageUrl && {
        images: [
          {
            url: mainImageUrl,
            width: 1200,
            height: 630,
            alt: product.title,
          },
        ],
      }),
    },
  }
}

// ============================================================================
// JSON-LD Structured Data
// ============================================================================

function generateProductJsonLd(product: SanityProduct, slug: string) {
  const productUrl = `${CANONICAL_BASE}/proizvod/${slug}`
  const mainImageUrl = product.gallery?.[0]
    ? getImageUrl(product.gallery[0], 1200)
    : product.image
    ? getImageUrl(product.image, 1200)
    : undefined

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.shortDescription,
    url: productUrl,
    ...(mainImageUrl && { image: mainImageUrl }),
    offers: {
      "@type": "Offer",
      price: product.pricePerKg,
      priceCurrency: "RSD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: product.pricePerKg,
        priceCurrency: "RSD",
        unitCode: "KGM",
        unitText: "kg",
      },
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Puterina Cakes",
        url: CANONICAL_BASE,
      },
    },
    brand: {
      "@type": "Brand",
      name: "Puterina Cakes",
      url: CANONICAL_BASE,
    },
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Convert Portable Text blocks to plain text for display
 */
function portableTextToPlainText(blocks: PortableTextBlock[] | undefined): string {
  if (!blocks || !Array.isArray(blocks)) return ""
  
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) return ""
      return block.children
        .map((child) => ("text" in child ? child.text : ""))
        .join("")
    })
    .join("\n\n")
}

/**
 * Build gallery images array from product data
 */
function buildGalleryImages(product: SanityProduct): { src: string; alt: string }[] {
  const images: { src: string; alt: string }[] = []
  
  // Add main image first if exists
  if (product.image) {
    const url = getImageUrl(product.image, 800)
    if (url) {
      images.push({
        src: url,
        alt: product.title,
      })
    }
  }
  
  // Add gallery images
  if (product.gallery && Array.isArray(product.gallery)) {
    const galleryImages = toGalleryImages(product.gallery, product.title)
    images.push(...galleryImages)
  }
  
  // Add cross-section image
  if (product.crossSectionImage) {
    const url = getImageUrl(product.crossSectionImage, 800)
    if (url) {
      images.push({
        src: url,
        alt: `${product.title} - presek`,
      })
    }
  }
  
  return images
}

/**
 * Transform Sanity nutrition data to the format expected by ProductInfo
 * Only returns data if all required fields are present
 */
function transformNutritionData(
  nutrition: SanityProduct["nutrition"]
): { energy: number; fat: number; saturatedFat?: number; carbs: number; sugars?: number; protein: number; fiber?: number; salt: number } | undefined {
  if (!nutrition) return undefined
  
  // Check required fields
  if (
    typeof nutrition.energy !== "number" ||
    typeof nutrition.fat !== "number" ||
    typeof nutrition.carbs !== "number" ||
    typeof nutrition.protein !== "number" ||
    typeof nutrition.salt !== "number"
  ) {
    return undefined
  }
  
  return {
    energy: nutrition.energy,
    fat: nutrition.fat,
    saturatedFat: nutrition.saturatedFat,
    carbs: nutrition.carbs,
    sugars: nutrition.sugars,
    protein: nutrition.protein,
    fiber: nutrition.fiber,
    salt: nutrition.salt,
  }
}

// ============================================================================
// Page Component
// ============================================================================

export default async function ProizvodPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const productJsonLd = generateProductJsonLd(product, slug)
  const galleryImages = buildGalleryImages(product)
  
  // Convert description and declaration to plain text for ProductInfo
  const descriptionText = portableTextToPlainText(product.description)
  const declarationText = portableTextToPlainText(product.declaration)
  
  // Transform nutrition data to the expected format
  const nutritionData = transformNutritionData(product.nutrition)

  return (
    <>
      {/* Product JSON-LD for SEO */}
      <Script
        id="product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <div className="container mx-auto px-4 pt-24 pb-8 md:pt-28 md:pb-12 max-w-6xl">
        {/* Desktop: 60/40 split, Mobile: stacked */}
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12">
          {/* Product Gallery - Left Side */}
          <div className="lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
            <ProductGallery 
              images={galleryImages} 
              productName={product.title} 
            />
          </div>

          {/* Product Info - Right Side */}
          <div>
            <ProductInfo
              title={product.title}
              pricePerKg={product.pricePerKg}
              shortDescription={product.shortDescription || ""}
              description={descriptionText || undefined}
              storage={product.storage}
              ingredients={product.ingredients}
              nutrition={nutritionData}
              allergens={product.allergens}
              declaration={declarationText || undefined}
            />
          </div>
        </div>
      </div>
    </>
  )
}
