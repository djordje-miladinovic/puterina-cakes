/**
 * GROQ Queries for Sanity CMS
 *
 * Centralized queries for fetching:
 * - Products (katalog + product detail)
 * - FAQs (FAQ page)
 */

// ============================================================================
// PRODUCT QUERIES
// ============================================================================

/**
 * Svi proizvodi za katalog i stranu proizvoda (V3 model).
 * Sanity je izvor istine; slike su putanje u /public.
 */
export const PRODUCTS_QUERY = `*[_type == "product"] | order(coalesce(order, 100) asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  category,
  isSignature,
  pricePerKg,
  priceNote,
  seasonal,
  flavors,
  shortDescription,
  description,
  layers,
  ingredientsShort,
  imagePath,
  crossSectionPath,
  gallery,
  declaration
}`

// ============================================================================
// FAQ QUERIES
// ============================================================================

/**
 * Fetch all FAQs ordered by category and order field
 */
export const FAQ_QUERY = `*[_type == "faq"] | order(category asc, order asc) {
  _id,
  question,
  answer,
  category,
  order
}`
