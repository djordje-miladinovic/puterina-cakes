"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

export interface GalleryImage {
  src: string
  alt: string
}

interface ProductGalleryProps {
  images: GalleryImage[]
  productName: string
}

/**
 * Galerija proizvoda V3 (mockup prod-1): glavna slika 4:5 + red
 * kvadratnih thumbova. Borderless — aktivni thumb se izdvaja
 * opacity-jem, ne okvirom. Klik na glavnu otvara lightbox.
 */
export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // Navigacija strelicama po thumbovima
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, currentIndex: number) => {
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        e.preventDefault()
        setSelectedIndex(currentIndex - 1)
      } else if (e.key === "ArrowRight" && currentIndex < images.length - 1) {
        e.preventDefault()
        setSelectedIndex(currentIndex + 1)
      }
    },
    [images.length]
  )

  // Globalne strelice u lightboxu
  useEffect(() => {
    if (!lightboxOpen) return

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && selectedIndex > 0) {
        e.preventDefault()
        setSelectedIndex(selectedIndex - 1)
      } else if (e.key === "ArrowRight" && selectedIndex < images.length - 1) {
        e.preventDefault()
        setSelectedIndex(selectedIndex + 1)
      } else if (e.key === "Escape") {
        e.preventDefault()
        setLightboxOpen(false)
      }
    }

    window.addEventListener("keydown", handleGlobalKeyDown)
    return () => window.removeEventListener("keydown", handleGlobalKeyDown)
  }, [lightboxOpen, selectedIndex, images.length])

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-[4/5] items-center justify-center bg-bg2">
        <p className="text-ink-muted">Slika proizvoda</p>
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
      <div>
        {/* Glavna slika — 4:5, borderless, cursor zoom */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="img-soft relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden bg-bg2"
          aria-label="Uvećajte sliku"
        >
          <Image
            src={selectedImage.src}
            alt={selectedImage.alt || productName}
            fill
            className="puterina-img object-cover"
            sizes="(max-width: 1024px) 100vw, min(55vw, 680px)"
            priority
          />
        </button>

        {/* Thumbovi — kvadrati, opacity aktivni sistem (prod-1) */}
        {images.length > 1 && (
          <div
            className="mt-3 grid grid-cols-4 gap-3"
            role="tablist"
            aria-label="Galerija slika proizvoda"
          >
            {images.slice(0, 4).map((image, index) => (
              <button
                key={image.src}
                onClick={() => setSelectedIndex(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={cn(
                  "img-soft relative aspect-square overflow-hidden bg-bg2 transition-opacity duration-300",
                  selectedIndex === index
                    ? "opacity-100"
                    : "opacity-70 hover:opacity-100"
                )}
                role="tab"
                aria-label={`Prikažite sliku ${index + 1}`}
                aria-selected={selectedIndex === index}
                tabIndex={selectedIndex === index ? 0 : -1}
              >
                <Image
                  src={image.src}
                  alt={image.alt || `${productName} — slika ${index + 1}`}
                  fill
                  className="puterina-img object-cover"
                  sizes="120px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          aria-describedby={undefined}
          className="h-auto max-h-[95vh] w-auto max-w-[95vw] overflow-hidden border-none bg-[#2b251f]/95 p-0"
        >
          <DialogTitle className="sr-only">
            {selectedImage.alt || productName} — uvećana slika
          </DialogTitle>

          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 z-50 p-2 text-terra-ink/80 transition-colors hover:text-terra-ink"
            aria-label="Zatvorite"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="relative flex h-[85vh] w-[90vw] items-center justify-center">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt || productName}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                disabled={selectedIndex === 0}
                className={cn(
                  "absolute left-4 top-1/2 -translate-y-1/2 p-3 text-terra-ink/80 transition-colors hover:text-terra-ink",
                  selectedIndex === 0 && "cursor-not-allowed opacity-30"
                )}
                aria-label="Prethodna slika"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                onClick={goToNext}
                disabled={selectedIndex === images.length - 1}
                className={cn(
                  "absolute right-4 top-1/2 -translate-y-1/2 p-3 text-terra-ink/80 transition-colors hover:text-terra-ink",
                  selectedIndex === images.length - 1 &&
                    "cursor-not-allowed opacity-30"
                )}
                aria-label="Sledeća slika"
              >
                <ChevronRight className="h-7 w-7" />
              </button>

              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 px-4 py-2">
                {images.map((image, index) => (
                  <button
                    key={image.src}
                    onClick={() => setSelectedIndex(index)}
                    className={cn(
                      "h-2.5 w-2.5 rounded-full transition-all",
                      selectedIndex === index
                        ? "scale-110 bg-terra-ink"
                        : "bg-terra-ink/40 hover:bg-terra-ink/60"
                    )}
                    aria-label={`Idite na sliku ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
