"use client"

import { Instagram, Phone } from "lucide-react"
import { CONTACT } from "@/lib/constants"

export default function StickyButtons() {
  const phoneE164 = CONTACT.phone

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col gap-2 md:gap-3">
      {/* Phone - Primary CTA */}
      <a
        href={`tel:${phoneE164}`}
        aria-label="Pozovite nas"
        title="Pozovite nas"
        className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#D4A574] text-white shadow-lg transition-all duration-200 ease-out hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#D4A574] focus:ring-offset-2"
      >
        <Phone className="h-5 w-5" />
      </a>

      {/* Instagram */}
      <a
        href={CONTACT.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Posetite nas na Instagramu"
        title="Instagram"
        className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full text-white shadow-lg transition-all duration-200 ease-out hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
        style={{
          background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
        }}
      >
        <Instagram className="h-5 w-5" />
      </a>
    </div>
  )
}
