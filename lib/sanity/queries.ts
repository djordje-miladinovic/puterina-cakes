/**
 * GROQ Queries for Sanity CMS
 * 
 * Centralized queries for fetching:
 * - Products (for katalog and product detail pages)
 * - FAQs (for FAQ page)
 * - Categories (for filtering products)
 */

// ============================================================================
// PRODUCT QUERIES
// ============================================================================

/**
 * Fetch all products for the catalog page
 * Returns essential fields needed for ProductCard components
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
  },
  ukus,
  prilika,
  sezona
}`

/**
 * Fetch a single product by slug for the product detail page
 * Returns all fields needed for full product display
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

// ============================================================================
// CATEGORY QUERIES
// ============================================================================

/**
 * Fetch all categories
 */
export const CATEGORIES_QUERY = `*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug,
  description
}`

/**
 * Fetch products by category slug
 */
export const PRODUCTS_BY_CATEGORY_QUERY = `*[_type == "product" && category->slug.current == $categorySlug] | order(isSignature desc, title asc) {
  _id,
  title,
  slug,
  shortDescription,
  pricePerKg,
  "primaryImage": image,
  "secondaryImage": crossSectionImage,
  isSignature
}`

/**
 * Fetch featured products for homepage display
 * Prioritizes signature products, limited to 6 items max
 */
export const FEATURED_PRODUCTS_QUERY = `*[_type == "product"] | order(isSignature desc, title asc) [0...6] {
  _id,
  title,
  slug,
  shortDescription,
  pricePerKg,
  "primaryImage": image,
  "secondaryImage": crossSectionImage,
  isSignature
}`
