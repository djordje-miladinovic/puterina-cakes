import type { MetadataRoute } from "next"
import { CANONICAL_BASE } from "@/lib/constants"

/**
 * GEO spec (docs/GEO-OPTIMIZACIJA.md §A1): bez blokiranja /_next/
 * (crawleri moraju videti CSS/JS render) + eksplicitna dozvola za
 * AI pretraživače (ChatGPT, Claude, Perplexity, Gemini).
 */
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "CCBot",
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/studio"],
      },
      ...AI_BOTS.map((bot) => ({
        userAgent: bot,
        allow: "/" as const,
      })),
    ],
    sitemap: `${CANONICAL_BASE}/sitemap.xml`,
  }
}
