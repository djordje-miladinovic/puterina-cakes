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
 * Fetch all products for the catalog page
 */
export const PRODUCTS_QUERY = `*[_type == "product"] | order(isSignature desc, title asc) {
  _id,
  title,
  slug,
  shortDescription,
  pricePerKg,
  "primaryImage": image,
  "secondaryImage": crossSectionImage,
  isSignature,
  category->{
    _id,
    title,
    slug
  }
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
