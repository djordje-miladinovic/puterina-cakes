"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ProductCardImage {
  src: string
  alt: string
}

/** Badge/tag type for product cards */
export type ProductBadge = "novo" | "rasprodato" | "akcija" | "popularno"

export interface ProductCardProps {
  /** Product title */
  title: string
  /** Product slug for link */
  slug: string
  /** Short description (1-liner) */
  description: string
  /** Price per kg in RSD */
  pricePerKg: number
  /** Primary image (shown by default) */
  primaryImage?: ProductCardImage
  /** Secondary image (shown on hover - typically the "presek" cross-section) */
  secondaryImage?: ProductCardImage
  /** Product tags for filtering/display (ukus, prilika, sezona) */
  tags?: string[]
  /** Special badge to display on the card */
  badge?: ProductBadge
  /** Whether the product is a signature item */
  isSignature?: boolean
  /** Additional className for custom styling */
  className?: string
}

/** Badge configuration with colors */
const badgeConfig: Record<ProductBadge, { label: string; className: string }> = {
  novo: {
    label: "Novo",
    className: "bg-butter-gold text-white",
  },
  rasprodato: {
    label: "Rasprodato",
    className: "bg-medium-gray text-white",
  },
  akcija: {
    label: "Akcija",
    className: "bg-raspberry text-white",
  },
  popularno: {
    label: "Popularno",
    className: "bg-pistachio text-warm-brown",
  },
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
 * - Primary image shown by default (consistent square aspect ratio)
 * - Secondary image (presek/cross-section) revealed on hover
 * - Subtle scale + shadow effect on hover
 * - Badges for special product states (Novo, Rasprodato, Akcija)
 * - Tags display for filtering categories
 * - CTA "Detalji" button
 * - Smooth GPU-accelerated transitions (max 300ms)
 * - Focus-visible states for accessibility
 */
export default function ProductCard({
  title,
  slug,
  description,
  pricePerKg,
  primaryImage,
  secondaryImage,
  tags,
  badge,
  isSignature,
  className,
}: ProductCardProps) {
  // Format price with thousands separator
  const formattedPrice = pricePerKg.toLocaleString("sr-RS")

  // Determine which badge to show (signature products get "Popularno" by default)
  const displayBadge = badge || (isSignature ? "popularno" : undefined)

  return (
    <Link
      href={`/proizvod/${slug}`}
      className={cn(
        "group block rounded-lg overflow-hidden bg-soft-white border border-light-gray",
        "transition-all duration-300 ease-out",
        "hover:shadow-[var(--shadow-butter-lg)] hover:-translate-y-1",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-butter-gold focus-visible:ring-offset-2",
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
              "object-cover transition-all duration-300 ease-out",
              // Subtle zoom on hover
              "group-hover:scale-105",
              // When secondary image exists, fade out primary on hover
              secondaryImage && "group-hover:opacity-0"
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-cream">
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
              "object-cover transition-all duration-300 ease-out",
              "opacity-0 group-hover:opacity-100 group-hover:scale-105"
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}

        {/* Subtle Dark Overlay on Hover */}
        <div
          className={cn(
            "absolute inset-0 bg-black/0 transition-colors duration-300 ease-out",
            "group-hover:bg-black/10"
          )}
          aria-hidden="true"
        />

        {/* Badge (top-left corner) */}
        {displayBadge && (
          <div
            className={cn(
              "absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold",
              "shadow-sm z-10",
              badgeConfig[displayBadge].className
            )}
          >
            {badgeConfig[displayBadge].label}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 md:p-5">
        {/* Title */}
        <h2 className="text-lg md:text-xl font-semibold text-warm-brown mb-1 group-hover:text-butter-gold transition-colors duration-200 line-clamp-1">
          {title}
        </h2>

        {/* Description (1-liner) */}
        <p className="text-sm text-medium-gray mb-3 line-clamp-1">
          {description}
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className="px-2 py-0.5 text-xs rounded-full bg-blush-pink text-warm-brown"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price and CTA Row */}
        <div className="flex items-center justify-between pt-2 border-t border-light-gray">
          <p className="text-lg font-bold text-butter-gold">
            {formattedPrice} <span className="text-sm font-medium text-medium-gray">RSD/kg</span>
          </p>
          
          {/* CTA Button */}
          <span
            className={cn(
              "inline-flex items-center gap-1 text-sm font-medium text-warm-brown",
              "group-hover:text-butter-gold transition-colors duration-200"
            )}
          >
            Detalji
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  )
}
