"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight, Quote, Star, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface Testimonial {
  id: string
  quote: string
  author: string
  role?: string
  rating?: number
  avatarUrl?: string
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "Torta je bila ne samo prelepa, već i najukusnija koju smo probali! Hvala Puterini na divnom iskustvu.",
    author: "Ana M.",
    role: "Mama slavljenice",
    rating: 5,
  },
  {
    id: "2",
    quote: "Svaka torta je umetničko delo. Gosti su bili oduševljeni i ukusom i izgledom. Topla preporuka!",
    author: "Marko P.",
    role: "Zadovoljan kupac",
    rating: 5,
  },
  {
    id: "3",
    quote: "Konačno prava torta bez fondana! Puter krem je nešto najbolje što smo probali. Hvala!",
    author: "Jelena S.",
    role: "Verifikovan kupac",
    rating: 5,
  },
  {
    id: "4",
    quote: "Profesionalnost, kvalitet i ukus — sve na najvišem nivou. Naručujem samo kod Puterine.",
    author: "Milica R.",
    role: "Redovna mušterija",
    rating: 5,
  },
  {
    id: "5",
    quote: "Torta za ćerkino venčanje je bila savršena. Svi gosti su pitali odakle je! Beskrajno hvala.",
    author: "Gordana T.",
    role: "Mama mlade",
    rating: 5,
  },
  {
    id: "6",
    quote: "Izuzetna pažnja prema detaljima. Dobili smo tačno ono što smo zamislili, čak i bolje!",
    author: "Nikola D.",
    role: "Zadovoljan kupac",
    rating: 5,
  },
]

const AUTO_ROTATE_INTERVAL = 5000 // 5 seconds

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  // Auto-rotate (only if reduced motion is not preferred and not paused)
  useEffect(() => {
    if (prefersReducedMotion || isPaused) return

    const interval = setInterval(goToNext, AUTO_ROTATE_INTERVAL)
    return () => clearInterval(interval)
  }, [prefersReducedMotion, isPaused, goToNext])

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return

    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX

    // Swipe threshold of 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext()
      } else {
        goToPrevious()
      }
    }

    touchStartX.current = null
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      goToPrevious()
    } else if (e.key === "ArrowRight") {
      goToNext()
    }
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section
      className="py-16 md:py-20 lg:py-24 bg-blush-pink/30"
      aria-label="Utisci kupaca"
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">
            Šta kažu naši klijenti
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Utisci zadovoljnih sladokusaca koji su nam ukazali poverenje
          </p>
        </div>

        {/* Carousel container */}
        <div
          ref={containerRef}
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Testimonijali kupaca"
        >
          {/* Testimonial card */}
          <div
            className={cn(
              "bg-soft-white rounded-2xl md:rounded-3xl p-8 md:p-12 border border-light-gray/50 shadow-md",
              "min-h-[280px] md:min-h-[320px] flex flex-col justify-center",
              !prefersReducedMotion && "transition-opacity duration-300 ease-out"
            )}
            role="group"
            aria-roledescription="slide"
            aria-label={`Testimonijal ${currentIndex + 1} od ${testimonials.length}`}
          >
            {/* Quote icon */}
            <div className="flex justify-center mb-6">
              <Quote className="w-10 h-10 md:w-12 md:h-12 text-butter-gold opacity-60" />
            </div>

            {/* Quote text */}
            <blockquote className="text-center mb-8">
              <p className="text-lg md:text-xl lg:text-2xl text-charcoal italic leading-relaxed font-light">
                &ldquo;{currentTestimonial.quote}&rdquo;
              </p>
            </blockquote>

            {/* Author info */}
            <div className="flex flex-col items-center gap-3">
              {/* Rating stars */}
              {currentTestimonial.rating && (
                <div className="flex gap-1" aria-label={`Ocena: ${currentTestimonial.rating} od 5 zvezdica`}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4 md:w-5 md:h-5",
                        i < currentTestimonial.rating!
                          ? "text-butter-gold fill-butter-gold"
                          : "text-light-gray"
                      )}
                    />
                  ))}
                </div>
              )}

              {/* Avatar and name */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blush-pink/50 flex items-center justify-center overflow-hidden">
                  {currentTestimonial.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={currentTestimonial.avatarUrl}
                      alt={currentTestimonial.author}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 md:w-6 md:h-6 text-warm-brown" />
                  )}
                </div>
                <div className="text-center sm:text-left">
                  <cite className="not-italic font-medium text-warm-brown text-base md:text-lg">
                    {currentTestimonial.author}
                  </cite>
                  {currentTestimonial.role && (
                    <p className="text-sm text-muted-foreground">
                      {currentTestimonial.role}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation arrows - hidden on mobile, visible on larger screens */}
          <button
            onClick={goToPrevious}
            className={cn(
              "hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-8",
              "w-12 h-12 rounded-full bg-soft-white border border-light-gray",
              "items-center justify-center shadow-md",
              "hover:bg-blush-pink/50 hover:border-butter-gold transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-butter-gold focus-visible:ring-offset-2"
            )}
            aria-label="Prethodni testimonijal"
          >
            <ChevronLeft className="w-6 h-6 text-warm-brown" />
          </button>

          <button
            onClick={goToNext}
            className={cn(
              "hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-8",
              "w-12 h-12 rounded-full bg-soft-white border border-light-gray",
              "items-center justify-center shadow-md",
              "hover:bg-blush-pink/50 hover:border-butter-gold transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-butter-gold focus-visible:ring-offset-2"
            )}
            aria-label="Sledeći testimonijal"
          >
            <ChevronRight className="w-6 h-6 text-warm-brown" />
          </button>
        </div>

        {/* Dot indicators */}
        <div
          className="flex justify-center gap-2 mt-6 md:mt-8"
          role="tablist"
          aria-label="Izbor testimonijala"
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-butter-gold focus-visible:ring-offset-2",
                index === currentIndex
                  ? "bg-butter-gold w-6 md:w-8"
                  : "bg-light-gray hover:bg-blush-pink"
              )}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Testimonijal ${index + 1}`}
              tabIndex={index === currentIndex ? 0 : -1}
            />
          ))}
        </div>

        {/* Swipe hint for mobile */}
        <p className="text-center text-sm text-muted-foreground mt-4 md:hidden">
          Prevucite levo ili desno za više utisaka
        </p>
      </div>
    </section>
  )
}
