"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

/**
 * PauseBanner (#35a) — mirna traka na samom vrhu sajta (iznad headera)
 * kada je pauza-režim aktivan („termini popunjeni"). Normalan blok u toku
 * dokumenta: bg2 pozadina, ink tekst 13px, centriran, X za dismiss.
 *
 * SSR-bezbedno: sessionStorage se čita tek u useEffect-u, pa se serverski
 * HTML i prvi klijentski render uvek poklapaju (traka vidljiva kad je
 * aktivna); korisniku koji ju je zatvorio nestaje odmah po hidrataciji.
 *
 * Orkestrator povezuje props na getSiteSettings():
 * <PauseBanner aktivna={s.pauzaAktivna} poruka={s.pauzaPoruka} />
 */

const STORAGE_KEY = "pauza-dismissed"

interface PauseBannerProps {
  aktivna: boolean
  poruka: string
}

export default function PauseBanner({ aktivna, poruka }: PauseBannerProps) {
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") setDismissed(true)
    } catch {
      // sessionStorage nedostupan (privatni režim i sl.) — traka ostaje
    }
  }, [])

  if (!aktivna || dismissed) return null

  function dismiss() {
    setDismissed(true)
    try {
      sessionStorage.setItem(STORAGE_KEY, "1")
    } catch {
      // ignoriši — dismiss važi samo za trenutni prikaz
    }
  }

  return (
    <div
      role="status"
      className="relative border-b border-ink/10 bg-bg2 px-12 py-2.5 text-center text-[13px] leading-snug text-ink"
    >
      {poruka}
      <button
        type="button"
        onClick={dismiss}
        aria-label="Zatvorite obaveštenje"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2.5 text-ink-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-oliva"
      >
        <X className="h-4 w-4" aria-hidden />
      </button>
    </div>
  )
}
