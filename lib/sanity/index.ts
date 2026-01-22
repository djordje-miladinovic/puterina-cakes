import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import { client } from './client'

const builder = createImageUrlBuilder(client)

/**
 * Generate an optimized image URL from a Sanity image source
 * @param source - Sanity image source (from CMS)
 * @returns ImageUrlBuilder for chaining width, height, format options
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

/**
 * Type for Sanity image with optional alt text
 */
export interface SanityImage {
  _type?: 'image'
  asset?: {
    _ref?: string
    _type?: 'reference'
    url?: string
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

/**
 * Type for gallery image item
 */
export interface SanityGalleryImage extends SanityImage {
  _key?: string
}

/**
 * Helper to get a responsive image URL with proper sizing
 * @param image - Sanity image object
 * @param width - Desired width
 * @param height - Optional height (auto if not specified)
 * @returns URL string or undefined if no image
 */
export function getImageUrl(
  image: SanityImageSource | null | undefined,
  width: number = 800,
  height?: number
): string | undefined {
  if (!image) return undefined
  
  try {
    let imageBuilder = urlFor(image).width(width).format('webp').quality(85)
    if (height) {
      imageBuilder = imageBuilder.height(height)
    }
    return imageBuilder.url()
  } catch {
    return undefined
  }
}

/**
 * Convert Sanity image to ProductCard format
 */
export function toProductCardImage(
  image: SanityImage | null | undefined,
  fallbackAlt: string = ''
): { src: string; alt: string } | undefined {
  if (!image?.asset) return undefined
  
  const url = getImageUrl(image, 600, 600)
  if (!url) return undefined
  
  return {
    src: url,
    alt: image.alt || fallbackAlt,
  }
}

/**
 * Convert Sanity gallery images to GalleryImage format
 */
export function toGalleryImages(
  images: SanityGalleryImage[] | null | undefined,
  productName: string = ''
): { src: string; alt: string }[] {
  if (!images || !Array.isArray(images)) return []
  
  return images
    .filter((img) => img?.asset)
    .map((img, index) => ({
      src: getImageUrl(img, 800) || '',
      alt: img.alt || `${productName} - slika ${index + 1}`,
    }))
    .filter((img) => img.src)
}

export { client } from './client'
export { sanityFetch, SanityLive } from './live'
export * from './queries'
