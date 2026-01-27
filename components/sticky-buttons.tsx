"use client"

import { useState, useEffect, useCallback } from "react"
import { Instagram, Phone, X, Plus } from "lucide-react"
import { CONTACT } from "@/lib/constants"
import { cn } from "@/lib/utils"

export default function StickyButtons() {
  const [isExpanded, setIsExpanded] = useState(false)
  const phoneE164 = CONTACT.phone

  // Close on Escape key press
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && isExpanded) {
      setIsExpanded(false)
    }
  }, [isExpanded])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  return (
    <>
      {/* Mobile Only: Consolidated FAB Widget */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        {/* Expanded Options */}
        <div
          className={cn(
            "absolute bottom-16 right-0 flex flex-col gap-3 transition-all duration-300 ease-out",
            isExpanded 
              ? "opacity-100 translate-y-0 pointer-events-auto" 
              : "opacity-0 translate-y-4 pointer-events-none"
          )}
        >
          {/* Phone Call Option */}
          <a
            href={`tel:${phoneE164}`}
            aria-label="Pozovite nas"
            title="Pozovite nas"
            tabIndex={isExpanded ? 0 : -1}
            onClick={() => setIsExpanded(false)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-200 ease-out hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <Phone className="h-5 w-5" />
          </a>

          {/* Instagram Option */}
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Posetite nas na Instagramu"
            title="Instagram"
            tabIndex={isExpanded ? 0 : -1}
            onClick={() => setIsExpanded(false)}
            className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-all duration-200 ease-out hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            style={{
              background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
            }}
          >
            <Instagram className="h-5 w-5" />
          </a>
        </div>

        {/* Main FAB Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? "Zatvori kontakt opcije" : "Otvorite kontakt opcije"}
          aria-expanded={isExpanded}
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2",
            isExpanded
              ? "bg-gray-700 text-white rotate-45 focus:ring-gray-500"
              : "bg-primary text-white hover:bg-primary/90 focus:ring-primary"
          )}
        >
          {isExpanded ? (
            <X className="h-6 w-6" />
          ) : (
            <Plus className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Backdrop overlay when expanded */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsExpanded(false)}
          onKeyDown={(e) => e.key === "Escape" && setIsExpanded(false)}
          role="button"
          tabIndex={0}
          aria-label="Zatvori kontakt opcije"
        />
      )}
    </>
  )
}
