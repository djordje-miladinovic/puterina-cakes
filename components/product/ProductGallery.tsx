"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export interface GalleryImage {
  src: string
  alt: string
}

interface ProductGalleryProps {
  images: GalleryImage[]
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  
  // Keyboard navigation handler for thumbnails
  const handleKeyDown = useCallback((e: React.KeyboardEvent, currentIndex: number) => {
    if (e.key === "ArrowLeft" && currentIndex > 0) {
      e.preventDefault()
      setSelectedIndex(currentIndex - 1)
    } else if (e.key === "ArrowRight" && currentIndex < images.length - 1) {
      e.preventDefault()
      setSelectedIndex(currentIndex + 1)
    }
  }, [images.length])
  
  // If no images provided, show placeholder
  if (!images || images.length === 0) {
    return (
      <div className="space-y-4">
        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">Slika proizvoda</p>
        </div>
      </div>
    )
  }

  const selectedImage = images[selectedIndex]

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
        <Image
          src={selectedImage.src}
          alt={selectedImage.alt || productName}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, min(60vw, 672px)"
          priority
        />
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2" role="tablist" aria-label="Galerija slika proizvoda">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                "relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all duration-200",
                selectedIndex === index
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-transparent hover:border-border"
              )}
              role="tab"
              aria-label={`Prikaži sliku ${index + 1}`}
              aria-selected={selectedIndex === index}
              tabIndex={selectedIndex === index ? 0 : -1}
            >
              <Image
                src={image.src}
                alt={image.alt || `${productName} - slika ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
