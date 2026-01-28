import HeroSection from "@/components/home/HeroSection"
import BrandBenefitsSection from "@/components/home/BrandBenefitsSection"
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection"
import PhilosophySection from "@/components/home/PhilosophySection"
import {
  sanityFetch,
  FEATURED_PRODUCTS_QUERY,
  toProductCardImage,
  type SanityImage,
} from "@/lib/sanity"

// Revalidate every 60 seconds for fresh content
export const revalidate = 60

interface SanityFeaturedProduct {
  _id: string
  title: string
  slug: { current: string }
  shortDescription?: string
  pricePerKg: number
  primaryImage?: SanityImage
  secondaryImage?: SanityImage
  isSignature?: boolean
}

// Fallback products when CMS has no data
const fallbackFeaturedProducts: SanityFeaturedProduct[] = [
  {
    _id: "featured-1",
    title: "Čokoladna torta",
    slug: { current: "cokoladna-torta" },
    pricePerKg: 2500,
    shortDescription: "Bogata čokoladna torta sa višeslojnom puter kremom",
    isSignature: true,
  },
  {
    _id: "featured-2",
    title: "Voćna torta",
    slug: { current: "vocna-torta" },
    pricePerKg: 2300,
    shortDescription: "Osvežavajuća torta sa sezonskim voćem",
  },
  {
    _id: "featured-3",
    title: "Vanila torta",
    slug: { current: "vanila-torta" },
    pricePerKg: 2200,
    shortDescription: "Klasična vanila torta sa nežnom kremom",
  },
]

export default async function Home() {
  // Fetch featured products from Sanity CMS
  let featuredProducts: SanityFeaturedProduct[]

  try {
    featuredProducts = await sanityFetch<SanityFeaturedProduct[]>({
      query: FEATURED_PRODUCTS_QUERY,
    })
  } catch (error) {
    console.error("Error fetching featured products from Sanity:", error)
    featuredProducts = []
  }

  // Use fallback if no products
  if (!featuredProducts || featuredProducts.length === 0) {
    featuredProducts = fallbackFeaturedProducts
  }

  // Transform products to component format
  const transformedProducts = featuredProducts.map((product) => ({
    _id: product._id,
    title: product.title,
    slug: product.slug,
    shortDescription: product.shortDescription,
    pricePerKg: product.pricePerKg,
    primaryImage: toProductCardImage(product.primaryImage, product.title),
    secondaryImage: toProductCardImage(
      product.secondaryImage,
      `${product.title} - presek`
    ),
    isSignature: product.isSignature,
  }))

  return (
    <>
      <HeroSection />

      <BrandBenefitsSection />

      <FeaturedProductsSection products={transformedProducts} />

      <PhilosophySection />
    </>
  )
}
