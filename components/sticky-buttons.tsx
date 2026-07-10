"use client"

import { useCallback, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import OrderSheet from "@/components/order/OrderSheet"

/**
 * Mobilni sticky CTA (V4 #12c): jedno dugme „Poručite" pri dnu ekrana
 * otvara OrderSheet (izbor kanala + konfigurator „3 dodira").
 * Na desktopu ne postoji (CTA je uvek vidljiv u headeru).
 * Fokus se pri zatvaranju sheeta vraća na ovo dugme.
 */
export default function StickyButtons() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    triggerRef.current?.focus()
  }, [])

  // Sanity Studio ne treba sticky CTA
  if (pathname.startsWith("/studio")) return null

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 sm:hidden">
        {/* Blagi krem gradijent iza dugmeta — da ne „lebdi" preko sadržaja */}
        <div className="bg-gradient-to-t from-bg via-bg/70 to-transparent px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-7">
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
            className="cta-primary pointer-events-auto w-full"
          >
            Poručite
          </button>
        </div>
      </div>

      <OrderSheet open={open} onClose={close} />
    </>
  )
}
