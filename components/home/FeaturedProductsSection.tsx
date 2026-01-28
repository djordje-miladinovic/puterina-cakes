"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import Link from "next/link"
import { ProductCard, type ProductCardImage } from "@/components/product"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface FeaturedProduct {
  _id: string
  title: string
  slug: { current: string }
  shortDescription?: string
  pricePerKg: number
  primaryImage?: ProductCardImage
  secondaryImage?: ProductCardImage
  isSignature?: boolean
}

interface FeaturedProductsSectionProps {
  products: FeaturedProduct[]
}

/**
 * FeaturedProductsSection - "Naša ponuda" section for homepage
 * 
 * Features:
 * - Grid layout: 3 columns on desktop with signature product spanning 2 columns
 * - Horizontal scrollable carousel on mobile with touch/swipe support
 * - Uses same ProductCard design as catalog for visual consistency
 * - "Pogledaj sve" CTA leads to full catalog
 */
export default function FeaturedProductsSection({ products }: FeaturedProductsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  
  // Check scroll position to update arrow visibility
  const checkScrollPosition = useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return
    
    const { scrollLeft, scrollWidth, clientWidth } = container
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }, [])
  
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return
    
    checkScrollPosition()
    container.addEventListener("scroll", checkScrollPosition, { passive: true })
    window.addEventListener("resize", checkScrollPosition)
    
    return () => {
      container.removeEventListener("scroll", checkScrollPosition)
      window.removeEventListener("resize", checkScrollPosition)
    }
  }, [checkScrollPosition])
  
  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (!container) return
    
    const cardWidth = container.querySelector("[data-product-card]")?.getBoundingClientRect().width || 280
    const scrollAmount = cardWidth + 16 // card width + gap
    
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  if (!products || products.length === 0) {
    return null
  }

  // Find signature product for featured display (first one)
  const signatureProduct = products.find(p => p.isSignature)
  const displayProducts = products.slice(0, 6)

  return (
    <section className="py-12 md:py-16 lg:py-20 section-soft">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-warm-brown mb-3">
            Naša ponuda
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Otkrijte naše najpopularnije torte, ručno pravljene sa ljubavlju i najkvalitetnijim sastojcima
          </p>
        </div>

        {/* Desktop Grid Layout - 3 columns with signature item larger */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayProducts.map((product, index) => {
            // Make first signature product span 2 columns on large screens
            const isLargeFeatured = signatureProduct && product._id === signatureProduct._id && index === 0
            
            return (
              <div
                key={product._id}
                className={cn(
                  isLargeFeatured && "lg:col-span-2 lg:row-span-1"
                )}
              >
                <ProductCard
                  title={product.title}
                  slug={product.slug.current}
                  description={product.shortDescription || ""}
                  pricePerKg={product.pricePerKg}
                  primaryImage={product.primaryImage}
                  secondaryImage={product.secondaryImage}
                  className={cn(
                    "h-full",
                    isLargeFeatured && "lg:[&_.aspect-square]:aspect-[2/1]"
                  )}
                />
              </div>
            )
          })}
        </div>

        {/* Mobile Horizontal Carousel */}
        <div className="md:hidden relative">
          {/* Navigation Arrows - only show when scrollable */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-soft-white/90 border border-light-gray shadow-md hover:bg-white transition-colors"
              aria-label="Prethodni proizvod"
            >
              <ChevronLeft className="w-5 h-5 text-warm-brown" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-soft-white/90 border border-light-gray shadow-md hover:bg-white transition-colors"
              aria-label="Sledeći proizvod"
            >
              <ChevronRight className="w-5 h-5 text-warm-brown" />
            </button>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {displayProducts.map((product) => (
              <div
                key={product._id}
                data-product-card
                className="flex-shrink-0 w-[280px] snap-start"
              >
                <ProductCard
                  title={product.title}
                  slug={product.slug.current}
                  description={product.shortDescription || ""}
                  pricePerKg={product.pricePerKg}
                  primaryImage={product.primaryImage}
                  secondaryImage={product.secondaryImage}
                />
              </div>
            ))}
          </div>

          {/* Scroll Indicator Dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {displayProducts.map((product, index) => (
              <div
                key={product._id}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === 0 ? "bg-butter-gold" : "bg-light-gray"
                )}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        {/* CTA to Catalog */}
        <div className="text-center mt-8 md:mt-10">
          <Button asChild variant="outline" size="lg" className="group">
            <Link href="/katalog">
              Pogledaj ceo katalog
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
