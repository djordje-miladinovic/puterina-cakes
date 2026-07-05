"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Instagram, Phone, X } from "lucide-react"
import { NAVIGATION, CONTACT, WORKING_HOURS, SITE } from "@/lib/constants"
import { WhatsAppIcon, ViberIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

interface MenuOverlayProps {
  open: boolean
  onClose: () => void
}

/**
 * Split-screen fullscreen meni (tarte.com.sg obrazac, PLAN-REDIZAJNA T3.10):
 * levo brend kolona (logo, radno vreme, kontakt), desno krupne Fraunces stavke.
 * Slide tranzicija (transform, bez fade) — CSS u globals.css (.menu-overlay).
 * Focus trap + ESC + scroll lock.
 */
export default function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const pathname = usePathname()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // ESC + scroll lock + inicijalni fokus
  useEffect(() => {
    if (!open) return

    document.body.style.overflow = "hidden"
    closeRef.current?.focus()

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose()
        return
      }
      if (e.key !== "Tab") return

      // Focus trap unutar panela
      const panel = panelRef.current
      if (!panel) return
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open, onClose])

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Glavni meni"
      className={cn("menu-overlay", open && "is-open")}
      // sadržaj van ekrana ne sme biti fokusabilan
      aria-hidden={!open}
      inert={!open}
    >
      <div className="flex h-full flex-col md:flex-row">
        {/* Leva kolona — brend + info */}
        <div className="hidden md:flex md:w-2/5 flex-col justify-between bg-blush-pink p-10 lg:p-14">
          <span
            className="h2"
            style={{ fontFamily: "var(--font-heading)" }}
            aria-hidden
          >
            Puterina
          </span>

          <div className="space-y-5 text-warm-brown">
            <p className="body-large font-medium">{WORKING_HOURS.display}</p>
            <a
              href={`tel:${CONTACT.phone}`}
              className="body-large block font-semibold hover:text-warm-brown-deep"
            >
              {CONTACT.phoneDisplay}
            </a>
            <p className="body">{SITE.city}</p>
            <div className="flex items-center gap-5 pt-2">
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profil @puterinacakes"
                className="hover:opacity-70 transition-opacity"
              >
                <Instagram className="h-6 w-6" aria-hidden />
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pošaljite WhatsApp poruku"
                className="hover:opacity-70 transition-opacity"
              >
                <WhatsAppIcon className="h-6 w-6" />
              </a>
              <a
                href={CONTACT.viber}
                aria-label="Pošaljite Viber poruku"
                className="hover:opacity-70 transition-opacity"
              >
                <ViberIcon className="h-6 w-6" />
              </a>
            </div>
            <p className="accent-script pt-4">{SITE.signOff}</p>
          </div>
        </div>

        {/* Desna kolona — navigacija */}
        <div className="relative flex flex-1 flex-col justify-center bg-cream px-6 py-20 md:px-14 lg:px-20">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Zatvorite meni"
            className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full text-warm-brown hover:bg-blush-pink transition-colors"
          >
            <X className="h-7 w-7" aria-hidden />
          </button>

          <nav aria-label="Glavna navigacija">
            <ul className="space-y-2 md:space-y-4">
              {NAVIGATION.map((item, i) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group flex items-baseline gap-4 py-1",
                        "text-warm-brown hover:text-warm-brown-deep transition-colors"
                      )}
                    >
                      <span className="caption w-6 text-medium-gray" aria-hidden>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "display-lg leading-none",
                          active && "text-oliva"
                        )}
                      >
                        {item.name}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Mobile info (leva kolona je skrivena) */}
          <div className="mt-12 space-y-2 text-warm-brown md:hidden">
            <p className="body-small font-medium">{WORKING_HOURS.display}</p>
            <a
              href={`tel:${CONTACT.phone}`}
              className="body font-semibold block"
            >
              {CONTACT.phoneDisplay}
            </a>
            <div className="flex items-center gap-5 pt-2">
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profil @puterinacakes"
              >
                <Instagram className="h-6 w-6" aria-hidden />
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pošaljite WhatsApp poruku"
              >
                <WhatsAppIcon className="h-6 w-6" />
              </a>
              <a href={CONTACT.viber} aria-label="Pošaljite Viber poruku">
                <ViberIcon className="h-6 w-6" />
              </a>
            </div>
          </div>

          <a
            href={`tel:${CONTACT.phone}`}
            className="cta-primary mt-10 self-start md:hidden"
            onClick={onClose}
          >
            <Phone className="h-4 w-4" aria-hidden />
            Pozovite
          </a>
        </div>
      </div>
    </div>
  )
}
