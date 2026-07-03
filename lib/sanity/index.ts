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

export { client } from './client'
export { sanityFetch, SanityLive } from './live'
export * from './queries'
