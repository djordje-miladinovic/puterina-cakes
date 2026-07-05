import type { MetadataRoute } from "next"
import { CANONICAL_BASE } from "@/lib/constants"
import { getAllProducts } from "@/lib/products"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts()
  const productSlugs = products.map((p) => p.slug)

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: CANONICAL_BASE,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${CANONICAL_BASE}/katalog`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${CANONICAL_BASE}/o-meni`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${CANONICAL_BASE}/kontakt`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${CANONICAL_BASE}/faq`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${CANONICAL_BASE}/utisci`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  // Rute proizvoda (17 iz products-data)
  // lastModified namerno izostavljen — build-time datum bi bio lažni
  // freshness signal za sve URL-ove (revizijski nalaz).
  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${CANONICAL_BASE}/proizvod/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...productRoutes]
}
