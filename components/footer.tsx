import { Instagram } from "lucide-react"
import { CONTACT, SITE } from "@/lib/constants"

/**
 * Minimalan footer (ZA-PUTERINU §3.10): jedna mirna traka na toploj braon —
 * brend linija + IG ikonica. Bez adrese, bez kolona linkova, bez formalnosti.
 */
export default function Footer() {
  return (
    <footer className="bg-warm-brown text-soft-white">
      <div className="container-site flex flex-col items-center gap-4 py-10 text-center md:flex-row md:justify-between md:text-left">
        <p className="body-small opacity-90">{SITE.brandLine}</p>
        <a
          href={CONTACT.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram profil @puterinacakes"
          className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-soft-white/10"
        >
          <Instagram className="h-5 w-5" aria-hidden />
        </a>
      </div>
    </footer>
  )
}
