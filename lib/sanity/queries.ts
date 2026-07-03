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

/**
 * Fetch a single product by slug for the product detail page
 */
export const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  shortDescription,
  "description": fullDescription,
  pricePerKg,
  "image": image,
  gallery[]{
    _key,
    asset,
    alt,
    "url": asset->url
  },
  crossSectionImage{
    asset,
    alt,
    "url": asset->url
  },
  storage,
  ingredients,
  nutrition,
  allergens,
  declaration,
  isSignature,
  category->{
    _id,
    title,
    slug
  }
}`

/**
 * Fetch all product slugs for static generation
 */
export const PRODUCT_SLUGS_QUERY = `*[_type == "product" && defined(slug.current)].slug.current`

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
