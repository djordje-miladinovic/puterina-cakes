"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface ProductCardImage {
  src: string
  alt: string
}

export interface ProductCardProps {
  /** Product title */
  title: string
  /** Product slug for link */
  slug: string
  /** Short description */
  description: string
  /** Price per kg in RSD */
  pricePerKg: number
  /** Primary image (shown by default) */
  primaryImage?: ProductCardImage
  /** Secondary image (shown on hover - typically the "presek" cross-section) */
  secondaryImage?: ProductCardImage
  /** Additional className for custom styling */
  className?: string
}

/**
 * ProductCard component with elegant hover effects
 * 
 * Design DNA references:
 * - yanncouvreur.com - hover effects on home page images
 * - pierreherme.com - image swap + hover effect
 * - maisonfleuret.fr - hover effect + image change
 * 
 * Features:
 * - Primary image shown by default
 * - Secondary image (presek/cross-section) revealed on hover
 * - Subtle dark overlay effect on hover
 * - Smooth GPU-accelerated transitions (max 300ms)
 */
export default function ProductCard({
  title,
  slug,
  description,
  pricePerKg,
  primaryImage,
  secondaryImage,
  className,
}: ProductCardProps) {
  // Format price with thousands separator
  const formattedPrice = pricePerKg.toLocaleString("sr-RS")

  return (
    <Link
      href={`/proizvod/${slug}`}
      className={cn(
        "group block rounded-lg overflow-hidden bg-card border border-border",
        "transition-shadow duration-200 ease-out hover:shadow-lg",
        className
      )}
    >
      {/* Image Container with Hover Effect */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        {/* Primary Image */}
        {primaryImage ? (
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt || title}
            fill
            className={cn(
              "object-cover transition-opacity duration-300 ease-out",
              // When secondary image exists, fade out primary on hover
              secondaryImage && "group-hover:opacity-0"
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <span className="text-sm">Slika proizvoda</span>
          </div>
        )}

        {/* Secondary Image (revealed on hover) */}
        {secondaryImage && (
          <Image
            src={secondaryImage.src}
            alt={secondaryImage.alt || `${title} - presek`}
            fill
            className={cn(
              "object-cover transition-opacity duration-300 ease-out",
              "opacity-0 group-hover:opacity-100"
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}

        {/* Subtle Dark Overlay on Hover */}
        <div
          className={cn(
            "absolute inset-0 bg-black/0 transition-colors duration-300 ease-out",
            "group-hover:bg-black/5"
          )}
          aria-hidden="true"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
          {title}
        </h2>
        <p className="text-sm md:text-base text-muted-foreground mb-3 line-clamp-2">
          {description}
        </p>
        <p className="text-lg font-bold text-primary">
          {formattedPrice} RSD/kg
        </p>
      </div>
    </Link>
  )
}
