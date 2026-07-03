"use client"

import { usePathname } from "next/navigation"
import { Phone } from "lucide-react"
import { CONTACT } from "@/lib/constants"

/**
 * Mobilni sticky CTA (ZA-PUTERINU §10): dugme "Pozovite" stalno pri ruci
 * na dnu ekrana. Bez expandable FAB-a — IG ikonica je statično u headeru.
 * Na desktopu ne postoji (CTA je uvek vidljiv u headeru).
 */
export default function StickyButtons() {
  const pathname = usePathname()

  // Sanity Studio ne treba sticky CTA
  if (pathname.startsWith("/studio")) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden pointer-events-none">
      <a
        href={`tel:${CONTACT.phone}`}
        className="cta-primary pointer-events-auto w-full shadow-lg shadow-warm-brown/15"
      >
        <Phone className="h-5 w-5" aria-hidden />
        Pozovite — {CONTACT.phoneDisplay}
      </a>
    </div>
  )
}
