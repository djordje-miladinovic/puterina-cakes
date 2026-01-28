"use client"

import { Phone, Instagram, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CONTACT } from "@/lib/constants"

interface CatalogEmptyStateProps {
  /** Whether filters are currently active (determines the message shown) */
  hasActiveFilters: boolean
  /** Callback to reset filters (only shown when filters are active) */
  onResetFilters?: () => void
}

/**
 * Premium empty state component for the catalog
 * 
 * Design Goals:
 * - Does not look like an error - feels welcoming and premium
 * - Guides users to contact options (phone, Instagram)
 * - Uses warm, inviting messaging consistent with brand voice
 * - Soft background with decorative elements
 */
export function CatalogEmptyState({ 
  hasActiveFilters, 
  onResetFilters 
}: CatalogEmptyStateProps) {
  return (
    <div className="relative py-12 md:py-16 px-6 md:px-8 bg-soft-white rounded-2xl border border-light-gray overflow-hidden">
      {/* Decorative background element */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 rounded-full bg-blush-pink/30 blur-3xl -translate-y-1/2 translate-x-1/2"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 left-0 w-24 h-24 md:w-36 md:h-36 rounded-full bg-butter-gold/20 blur-3xl translate-y-1/2 -translate-x-1/2"
        aria-hidden="true"
      />
      
      <div className="relative text-center max-w-md mx-auto">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-blush-pink/50 mb-6">
          <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-butter-gold" />
        </div>

        {/* Heading */}
        <h2 className="text-xl md:text-2xl font-semibold text-warm-brown mb-3">
          {hasActiveFilters 
            ? "Nema rezultata za izabrane filtere" 
            : "Naša kolekcija se uskoro proširuje!"
          }
        </h2>

        {/* Message */}
        <p className="text-medium-gray mb-6 leading-relaxed">
          {hasActiveFilters ? (
            <>
              Trenutno nemamo proizvode koji odgovaraju vašem izboru.
              <br className="hidden md:block" />
              Probajte sa drugim filterima ili nas kontaktirajte za posebne želje.
            </>
          ) : (
            <>
              Radimo na tome da vam ponudimo još više ukusnih slastica.
              <br className="hidden md:block" />
              U međuvremenu, javite nam se za posebne porudžbine!
            </>
          )}
        </p>

        {/* Reset filters button (only when filters are active) */}
        {hasActiveFilters && onResetFilters && (
          <Button 
            variant="outline" 
            onClick={onResetFilters}
            className="mb-6"
          >
            Poništi filtere
          </Button>
        )}

        {/* CTA Section */}
        <div className="pt-6 border-t border-light-gray/50">
          <p className="text-sm text-medium-gray mb-4">
            Želite nešto posebno? Javite nam se!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <a href={`tel:${CONTACT.phone}`}>
                <Phone className="w-4 h-4 mr-2" />
                Pozovite nas
              </a>
            </Button>
            
            <Button asChild variant="outline" size="lg">
              <a 
                href={CONTACT.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Instagram className="w-4 h-4 mr-2" />
                {CONTACT.instagramHandle}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
