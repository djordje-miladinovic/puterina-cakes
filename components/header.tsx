"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Instagram, Phone } from "lucide-react"
import { CONTACT } from "@/lib/constants"
import MenuOverlay from "@/components/menu-overlay"
import { cn } from "@/lib/utils"

/**
 * Minimalan header (ZA-PUTERINU §2): levo wordmark "Puterina",
 * desno IG ikonica (uvek vidljiva!) + zlatno "Pozovite" + hamburger.
 * Na naslovnoj transparentan preko svetlog hero-a (tekst warm-brown,
 * bez tamnog gradijenta), posle skrola cream pozadina.
 */
export default function Header() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const solid = scrolled || !isHome

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          solid
            ? "bg-cream/95 backdrop-blur-sm border-b border-warm-brown/10"
            : "bg-transparent"
        )}
      >
        <div className="container-site flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            aria-label="Puterina — početna strana"
            className="text-2xl md:text-3xl text-warm-brown"
            style={{
              fontFamily: "var(--font-heading)",
              fontVariationSettings: '"SOFT" 70, "WONK" 1',
              fontWeight: 580,
            }}
          >
            Puterina
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram profil @puterinacakes"
              className="flex h-11 w-11 items-center justify-center rounded-full text-warm-brown hover:bg-blush-pink/60 transition-colors"
            >
              <Instagram className="h-5 w-5" aria-hidden />
            </a>

            <a
              href={`tel:${CONTACT.phone}`}
              className="cta-primary hidden sm:inline-flex !min-h-[44px] !px-6 text-sm"
            >
              <Phone className="h-4 w-4" aria-hidden />
              Pozovite
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Otvorite meni"
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full text-warm-brown hover:bg-blush-pink/60 transition-colors"
            >
              <span className="block h-[2px] w-6 rounded bg-current" aria-hidden />
              <span className="block h-[2px] w-6 rounded bg-current" aria-hidden />
              <span className="block h-[2px] w-4 self-center rounded bg-current ml-2" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
