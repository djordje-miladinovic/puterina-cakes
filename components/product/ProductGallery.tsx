"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"

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
  const [lightboxOpen, setLightboxOpen] = useState(false)
  
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

  // Global keyboard handler for lightbox navigation
  useEffect(() => {
    if (!lightboxOpen) return
    
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1)
      } else if (e.key === "ArrowRight" && selectedIndex < images.length - 1) {
        setSelectedIndex(selectedIndex + 1)
      } else if (e.key === "Escape") {
        setLightboxOpen(false)
      }
    }
    
    window.addEventListener("keydown", handleGlobalKeyDown)
    return () => window.removeEventListener("keydown", handleGlobalKeyDown)
  }, [lightboxOpen, selectedIndex, images.length])
  
  // If no images provided, show placeholder
  if (!images || images.length === 0) {
    return (
      <div className="space-y-4">
        <div className="aspect-square bg-soft-white rounded-xl flex items-center justify-center border border-light-gray">
          <p className="text-muted-foreground">Slika proizvoda</p>
        </div>
      </div>
    )
  }

  const selectedImage = images[selectedIndex]

  const goToPrevious = () => {
    if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1)
  }

  const goToNext = () => {
    if (selectedIndex < images.length - 1) setSelectedIndex(selectedIndex + 1)
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main Image - clickable for lightbox */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="relative w-full aspect-square bg-soft-white rounded-xl overflow-hidden group cursor-zoom-in border border-light-gray hover:border-butter-gold transition-all duration-200 hover:shadow-[var(--shadow-butter)]"
          aria-label="Uvećaj sliku"
        >
          <Image
            src={selectedImage.src}
            alt={selectedImage.alt || productName}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, min(60vw, 672px)"
            priority
          />
          {/* Zoom indicator overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
              <ZoomIn className="w-6 h-6 text-warm-brown" />
            </div>
          </div>
        </button>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div 
            className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin" 
            role="tablist" 
            aria-label="Galerija slika proizvoda"
          >
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={cn(
                  "relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200",
                  selectedIndex === index
                    ? "border-butter-gold ring-2 ring-butter-gold/20 shadow-[var(--shadow-butter)]"
                    : "border-light-gray hover:border-butter-gold/50 bg-soft-white"
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

      {/* Lightbox Dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] w-auto h-auto p-0 bg-black/95 border-none overflow-hidden">
          <DialogTitle className="sr-only">
            {selectedImage.alt || productName} - Uvećana slika
          </DialogTitle>
          
          {/* Close button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 transition-colors"
            aria-label="Zatvori"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Image container */}
          <div className="relative w-[90vw] h-[85vh] flex items-center justify-center">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt || productName}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                disabled={selectedIndex === 0}
                className={cn(
                  "absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all",
                  selectedIndex === 0 && "opacity-30 cursor-not-allowed"
                )}
                aria-label="Prethodna slika"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={goToNext}
                disabled={selectedIndex === images.length - 1}
                className={cn(
                  "absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all",
                  selectedIndex === images.length - 1 && "opacity-30 cursor-not-allowed"
                )}
                aria-label="Sledeća slika"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}

          {/* Thumbnail strip in lightbox */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all",
                    selectedIndex === index
                      ? "bg-white scale-110"
                      : "bg-white/40 hover:bg-white/60"
                  )}
                  aria-label={`Idi na sliku ${index + 1}`}
                />
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
