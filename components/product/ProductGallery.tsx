"use client"

import {
  useState,
  useCallback,
  useEffect,
  type CSSProperties,
} from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import styles from "./ProductGallery.module.css"

export interface GalleryImage {
  src: string
  alt: string
}

interface ProductGalleryProps {
  images: GalleryImage[]
  productName: string
  /** Slug proizvoda — za view-transition ime („torta putuje", E1c). */
  slug: string
  /**
   * Putanja slike preseka — prosleđuje se SAMO kada je presek zaista
   * posebna fotografija (crossSection !== image). Uključuje pločicu
   * „pogledajte presek" preko donjeg desnog ugla glavne slike (#10b).
   */
  crossSectionSrc?: string
}

/**
 * Galerija proizvoda V4 — C2 „Cenovni blok" (mockup v4-prod-2):
 * glavna slika 4:5 + red kvadratnih thumbova (opacity sistem, bez okvira).
 * #10b: pločica „pogledajte presek →" preko donjeg desnog ugla — vidi se
 * samo kad presek postoji i NIJE trenutno prikazan; klik prebacuje sliku.
 * #22b: promena glavne slike = fade kroz krem (stara izbledi u bg2 za
 * 150 ms, nova izroni za 250 ms); reduced-motion = trenutna promena.
 * Klik na glavnu sliku otvara lightbox (strelice + Escape rade).
 */
export default function ProductGallery({
  images,
  productName,
  slug,
  crossSectionSrc,
}: ProductGalleryProps) {
  // selectedIndex = ciljna slika (thumb/peek/lightbox); displayedIndex =
  // slika trenutno u glavnom okviru (kasni 150 ms tokom fade-a kroz krem)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [displayedIndex, setDisplayedIndex] = useState(0)
  const [mainVisible, setMainVisible] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // #22b faza 1: kad se izbor promeni — izbledi staru u krem (150 ms),
  // pa tek onda zameni sliku. Reduced-motion: zameni odmah.
  useEffect(() => {
    if (selectedIndex === displayedIndex) return
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setDisplayedIndex(selectedIndex)
      setMainVisible(true)
      return
    }
    setMainVisible(false)
    const t = setTimeout(() => setDisplayedIndex(selectedIndex), 150)
    return () => clearTimeout(t)
  }, [selectedIndex, displayedIndex])

  // #22b faza 2: nova slika je u DOM-u sa opacity 0 — pusti frame da se
  // primeni, pa je izroni (250 ms kroz .mainImg tranziciju)
  useEffect(() => {
    if (mainVisible || displayedIndex !== selectedIndex) return
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setMainVisible(true))
    )
    return () => cancelAnimationFrame(raf)
  }, [mainVisible, displayedIndex, selectedIndex])

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

  // Lightbox prati izbor odmah; glavni okvir prati displayedIndex (fade)
  const selectedImage = images[selectedIndex]
  const mainImage = images[displayedIndex]

  // #10b: indeks preseka među slikama; pločica se vidi samo kad presek
  // postoji i nije trenutno izabran
  const crossIndex = crossSectionSrc
    ? images.findIndex((img) => img.src === crossSectionSrc)
    : -1
  const showPeek = crossIndex >= 0 && selectedIndex !== crossIndex

  const goToPrevious = () => {
    if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1)
  }

  const goToNext = () => {
    if (selectedIndex < images.length - 1) setSelectedIndex(selectedIndex + 1)
  }

  return (
    <>
      <div>
        {/* Glavna slika — 4:5, bg2 iza (krem „provaljuje" tokom fade-a).
            viewTransitionName: priprema za „torta putuje" (E1c, talas 2) */}
        <div
          className="img-soft relative aspect-[4/5] w-full overflow-hidden bg-bg2"
          style={{ viewTransitionName: `torta-${slug}` } as CSSProperties}
        >
          <button
            onClick={() => setLightboxOpen(true)}
            className="absolute inset-0 block h-full w-full cursor-zoom-in"
            aria-label="Uvećajte sliku"
          >
            <Image
              src={mainImage.src}
              alt={mainImage.alt || productName}
              fill
              className={cn(
                "puterina-img object-cover",
                styles.mainImg,
                !mainVisible && styles.mainImgHidden
              )}
              sizes="(max-width: 1024px) 100vw, min(55vw, 680px)"
              priority
            />
          </button>

          {/* #10b — pločica „pogledajte presek" preko donjeg desnog ugla */}
          {showPeek && (
            <button
              type="button"
              className={styles.peek}
              onClick={() => setSelectedIndex(crossIndex)}
            >
              pogledajte presek <span aria-hidden>→</span>
            </button>
          )}
        </div>

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
