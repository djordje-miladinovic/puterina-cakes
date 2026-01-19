import type { MetadataRoute } from "next"
import { CANONICAL_BASE } from "@/lib/constants"

// TODO: Replace with actual Sanity query when CMS is connected
const PRODUCT_SLUGS = ["cokoladna-torta", "vocna-torta"]

export default function sitemap(): MetadataRoute.Sitemap {
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

  // Generate product routes
  const productRoutes: MetadataRoute.Sitemap = PRODUCT_SLUGS.map((slug) => ({
    url: `${CANONICAL_BASE}/proizvod/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...productRoutes]
}
