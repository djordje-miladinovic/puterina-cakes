import type { MetadataRoute } from "next"
import { CANONICAL_BASE } from "@/lib/constants"
import { getAllProducts } from "@/lib/products"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts()
  const productSlugs = products.map((p) => p.slug)

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
      url: `${CANONICAL_BASE}/o-meni`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
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
    {
      url: `${CANONICAL_BASE}/utisci`,
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
