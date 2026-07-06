"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Instagram } from "lucide-react"
import { CONTACT, NAV_DESKTOP } from "@/lib/constants"
import MenuOverlay from "@/components/menu-overlay"
import { cn } from "@/lib/utils"

/**
 * Header V3 (mockup v6-1): fixed; na naslovnoj transparentan preko hero-a,
 * posle 60px skrola .solid (bg 94% + blur 10px). Levo Fraunces wordmark,
 * sredina desktop nav (NAV_DESKTOP), desno IG (UVEK vidljiva) + malina
 * „Pozovite" (kanonski CTA §12) + hamburger za mobilni meni.
 */
export default function Header() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  // Po zatvaranju menija fokus se vraća na hamburger (WCAG 2.4.3)
  const closeMenu = () => {
    setMenuOpen(false)
    hamburgerRef.current?.focus()
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const solid = scrolled || !isHome

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 py-2 transition-[background-color,backdrop-filter] duration-[400ms]"
        style={
          solid
            ? {
                background: "color-mix(in srgb, var(--bg) 94%, transparent)",
                backdropFilter: "blur(10px)",
                borderBottom:
                  "1px solid color-mix(in srgb, var(--ink) 8%, transparent)",
              }
            : undefined
        }
      >
        <div className="container-site flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="Puterina — početna strana"
            className="text-[26px] text-ink md:text-[27px]"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 450,
              letterSpacing: "0.01em",
              fontVariationSettings: '"opsz" 40',
            }}
          >
            Puterina
          </Link>

          {/* Desktop navigacija — sakrivena ispod md */}
          <nav aria-label="Glavna navigacija" className="hidden md:flex md:gap-[34px]">
            {NAV_DESKTOP.map((item) => {
              // aktivna stavka (kat-2/prod-1: .on = oliva)
              const active = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-[13px] uppercase tracking-[0.08em] transition-opacity duration-300 hover:opacity-100",
                    active ? "text-oliva opacity-100" : "text-ink opacity-75"
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-[22px]">
            {/* IG ikonica — sticky IG pravilo: UVEK vidljiva, i na mobilnom */}
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram profil @puterinacakes"
              className="flex h-11 w-11 items-center justify-center text-ink transition-opacity duration-300 hover:opacity-70"
            >
              <Instagram className="h-5 w-5" aria-hidden />
            </a>

            <a
              href={`tel:${CONTACT.phone}`}
              className="cta-small hidden sm:inline-flex"
            >
              Pozovite
            </a>

            {/* Hamburger — samo mobilni (desktop ima punu nav) */}
            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Otvorite meni"
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              className={cn(
                "flex h-11 w-11 flex-col items-center justify-center gap-[5px]",
                "text-ink transition-opacity duration-300 hover:opacity-70 md:hidden"
              )}
            >
              <span className="block h-[2px] w-6 bg-current" aria-hidden />
              <span className="block h-[2px] w-6 bg-current" aria-hidden />
              <span className="ml-2 block h-[2px] w-4 self-center bg-current" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay open={menuOpen} onClose={closeMenu} />
    </>
  )
}
