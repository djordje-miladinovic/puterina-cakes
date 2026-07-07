"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Instagram, Phone, X } from "lucide-react"
import { WhatsAppIcon, ViberIcon } from "@/components/icons"
import { CONTACT, WORKING_HOURS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import styles from "./order.module.css"

/**
 * OrderSheet — mobilni bottom sheet „Kako Vam je najlakše?"
 * (V4 #12c sheet + #13b/c radno vreme + #11 konfigurator „3 dodira").
 * Interakcije preslikane iz mockups/v4-mobilni.html (D paket).
 *
 * Renderuje se unutar components/sticky-buttons.tsx; trigger je mobilno
 * sticky dugme „Poručite". Fokus se pri zatvaranju vraća na trigger
 * (radi to sticky-buttons u svom onClose).
 */

interface OrderSheetProps {
  open: boolean
  onClose: () => void
}

interface ProductInfo {
  title: string
  kind: string
}

/** #13b — pon–pet 08–20h, lokalno vreme uređaja (Europe/Belgrade publika). */
function computeOpen(now: Date = new Date()): boolean {
  const day = now.getDay() // 0 = nedelja … 6 = subota
  const hour = now.getHours()
  return day >= 1 && day <= 5 && hour >= 8 && hour < 20
}

/** Sastavi poruku — sa imenom torte ako postoji na stranici (#11c). */
function buildMessage(
  product: ProductInfo | null,
  datum: string,
  gosti: string
): string {
  const naziv = product
    ? product.kind === "torte"
      ? `torta ${product.title}`
      : product.title
    : "torta"
  return `Zdravo! Zanima me ${naziv} za ${datum}, za otprilike ${gosti} gostiju. Hvala!`
}

const WA_NUMBER = CONTACT.phone.replace("+", "")

function waHref(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

const DATUMI = [
  { label: "Ovaj vikend", value: "ovaj vikend" },
  { label: "Sledeći vikend", value: "sledeći vikend" },
  { label: "Drugi datum", value: "drugi datum" },
] as const

const GOSTI = ["do 10", "10–20", "20–30", "30+"] as const

export default function OrderSheet({ open, onClose }: OrderSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const stepTimer = useRef<number | null>(null)

  const [radno, setRadno] = useState(true)
  const [product, setProduct] = useState<ProductInfo | null>(null)
  const [view, setView] = useState<"kanali" | "konf">("kanali")
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [datum, setDatum] = useState("")
  const [gosti, setGosti] = useState("")

  const resetKonf = useCallback(() => {
    if (stepTimer.current) window.clearTimeout(stepTimer.current)
    setView("kanali")
    setStep(1)
    setDatum("")
    setGosti("")
  }, [])

  // Pri otvaranju: sveže radno vreme, ime torte sa stranice, reset konfiguratora.
  useEffect(() => {
    if (!open) return
    setRadno(computeOpen())

    const el = document.querySelector<HTMLElement>("[data-product-title]")
    const title = (el?.dataset.productTitle || el?.textContent || "").trim()
    setProduct(title ? { title, kind: el?.dataset.productKind || "torte" } : null)

    resetKonf()
  }, [open, resetKonf])

  // Scroll-lock + inicijalni fokus + ESC + focus trap dok je otvoren.
  useEffect(() => {
    if (!open) return

    document.body.style.overflow = "hidden"
    sheetRef.current?.focus({ preventScroll: true })

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose()
        return
      }
      if (e.key !== "Tab") return

      // Focus trap unutar sheeta (isti obrazac kao menu-overlay.tsx)
      const sheet = sheetRef.current
      if (!sheet) return
      const focusables = sheet.querySelectorAll<HTMLElement>(
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

  // Očisti eventualni odloženi korak pri unmount-u.
  useEffect(() => {
    return () => {
      if (stepTimer.current) window.clearTimeout(stepTimer.current)
    }
  }, [])

  /** Kratko zadrži selektovan čip pa pređi na sledeći korak (mockup: 220ms). */
  function advanceAfterPick(next: 2 | 3) {
    if (stepTimer.current) window.clearTimeout(stepTimer.current)
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    stepTimer.current = window.setTimeout(
      () => setStep(next),
      reduced ? 0 : 220
    )
  }

  // Poruka za redove kanala — [datum]/[broj] placeholder-i (kupac ih dopuni).
  const baseMessage = product
    ? buildMessage(product, "[datum]", "[broj]")
    : CONTACT.prefilledMessage
  // Poruka konfiguratora — živi pregled sa izabranim vrednostima.
  const konfMessage = buildMessage(
    product,
    datum || "[datum]",
    gosti || "[broj]"
  )

  /** Korak 3 — izbor kanala otvara taj kanal sa gotovom porukom. */
  function sendVia(channel: "whatsapp" | "viber" | "poziv") {
    if (channel === "whatsapp") {
      window.open(waHref(konfMessage), "_blank", "noopener,noreferrer")
    } else if (channel === "viber") {
      window.location.href = CONTACT.viber
    } else {
      window.location.href = `tel:${CONTACT.phone}`
    }
  }

  const pozoviRed = (primary: boolean) => (
    <a
      href={`tel:${CONTACT.phone}`}
      className={cn(styles.chan, primary && styles.chanPrimary)}
    >
      <span className={styles.chanIc}>
        <Phone className="h-[18px] w-[18px]" aria-hidden />
      </span>
      <span>
        Pozovite — {CONTACT.phoneDisplay}
        <span className={styles.chanSub}>
          {primary ? "najbrži dogovor" : WORKING_HOURS.display}
        </span>
      </span>
    </a>
  )

  const whatsappRed = (primary: boolean) => (
    <a
      href={waHref(baseMessage)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(styles.chan, primary && styles.chanPrimary)}
    >
      <span className={styles.chanIc}>
        <WhatsAppIcon className="h-[18px] w-[18px]" />
      </span>
      <span>
        {primary ? "Pišite — odgovaram ujutru" : "WhatsApp poruka"}
        <span className={styles.chanSub}>
          {primary
            ? "WhatsApp · poruka Vas čeka unapred upisana"
            : "poruka Vas čeka unapred upisana"}
        </span>
      </span>
    </a>
  )

  return (
    <>
      {/* Overlay preko sadržaja — tap zatvara */}
      <div
        className={cn(styles.overlay, open && styles.overlayOn)}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Bottom sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-sheet-title"
        className={cn(styles.sheet, open && styles.sheetOn)}
        aria-hidden={!open}
        inert={!open}
        tabIndex={-1}
      >
        <div className={styles.grab} aria-hidden />
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Zatvorite"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>

        <h3 id="order-sheet-title" className={styles.title}>
          Kako Vam je najlakše?
        </h3>
        <p className={styles.wtime}>
          <span
            className={cn(
              styles.status,
              radno ? styles.statusOpen : styles.statusClosed
            )}
          >
            <span className={styles.dot} aria-hidden />
            {radno ? "dostupna sada" : "trenutno zatvoreno — pišite"}
          </span>
          <span className={styles.wtimeSep}>· {WORKING_HOURS.display}</span>
        </p>

        {view === "kanali" ? (
          /* ====== IZBOR KANALA (#12c + #13 pametna zamena) ====== */
          <div>
            {radno ? (
              <>
                {pozoviRed(true)}
                {whatsappRed(false)}
              </>
            ) : (
              <>
                {whatsappRed(true)}
                {pozoviRed(false)}
              </>
            )}
            <a href={CONTACT.viber} className={styles.chan}>
              <span className={styles.chanIc}>
                <ViberIcon className="h-[18px] w-[18px]" />
              </span>
              <span>Viber poruka</span>
            </a>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.chan}
            >
              <span className={styles.chanIc}>
                <Instagram className="h-[18px] w-[18px]" aria-hidden />
              </span>
              <span>Instagram DM</span>
            </a>
            <button
              type="button"
              className={styles.konfLink}
              onClick={() => setView("konf")}
            >
              ili sastavite upit za 3 dodira →
            </button>
          </div>
        ) : (
          /* ====== KONFIGURATOR „3 dodira" (#11) ====== */
          <div>
            <div className={styles.kdots} aria-hidden>
              {([1, 2, 3] as const).map((n) => (
                <span
                  key={n}
                  className={cn(styles.kdot, step >= n && styles.kdotOn)}
                />
              ))}
            </div>

            {step === 1 && (
              <div>
                <p className={styles.kq}>1 · Kada je proslava?</p>
                <div className={styles.chips}>
                  {DATUMI.map((d) => (
                    <button
                      key={d.value}
                      type="button"
                      className={cn(
                        styles.chip,
                        datum === d.value && styles.chipSel
                      )}
                      onClick={() => {
                        setDatum(d.value)
                        advanceAfterPick(2)
                      }}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className={styles.kback}
                  onClick={resetKonf}
                >
                  ← nazad na izbor kanala
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <p className={styles.kq}>2 · Koliko gostiju?</p>
                <div className={styles.chips}>
                  {GOSTI.map((g) => (
                    <button
                      key={g}
                      type="button"
                      className={cn(
                        styles.chip,
                        gosti === g && styles.chipSel
                      )}
                      onClick={() => {
                        setGosti(g)
                        advanceAfterPick(3)
                      }}
                    >
                      {g}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className={styles.kback}
                  onClick={() => setStep(1)}
                >
                  ← nazad
                </button>
              </div>
            )}

            {step === 3 && (
              <div>
                <p className={styles.kq}>3 · Pošaljite preko:</p>
                <div className={styles.chips}>
                  <button
                    type="button"
                    className={styles.chip}
                    onClick={() => sendVia("whatsapp")}
                  >
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    className={styles.chip}
                    onClick={() => sendVia("viber")}
                  >
                    Viber
                  </button>
                  <button
                    type="button"
                    className={styles.chip}
                    onClick={() => sendVia("poziv")}
                  >
                    Pozovite
                  </button>
                </div>
                <p className={styles.kpreview}>„{konfMessage}"</p>
                <button
                  type="button"
                  className={styles.kback}
                  onClick={() => setStep(2)}
                >
                  ← nazad
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
