import type { MetadataRoute } from "next"
import { CANONICAL_BASE } from "@/lib/constants"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: `${CANONICAL_BASE}/sitemap.xml`,
  }
}
