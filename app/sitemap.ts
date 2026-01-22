import type { MetadataRoute } from "next"
import { CANONICAL_BASE } from "@/lib/constants"
import { sanityFetch, PRODUCT_SLUGS_QUERY } from "@/lib/sanity"

// Fallback product slugs in case Sanity fetch fails
const FALLBACK_PRODUCT_SLUGS = ["cokoladna-torta", "vocna-torta"]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch product slugs from Sanity
  let productSlugs: string[] = []
  try {
    productSlugs = await sanityFetch<string[]>({
      query: PRODUCT_SLUGS_QUERY,
    })
  } catch (error) {
    console.error("Error fetching product slugs for sitemap:", error)
    productSlugs = FALLBACK_PRODUCT_SLUGS
  }

  // Use fallback if empty
  if (!productSlugs || productSlugs.length === 0) {
    productSlugs = FALLBACK_PRODUCT_SLUGS
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: CANONICAL_BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${CANONICAL_BASE}/katalog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${CANONICAL_BASE}/kontakt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${CANONICAL_BASE}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  // Generate product routes from Sanity
  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${CANONICAL_BASE}/proizvod/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...productRoutes]
}
