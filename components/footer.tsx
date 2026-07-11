import Link from "next/link"
import { Instagram } from "lucide-react"
import { CONTACT, SITE, NAV_FOOTER } from "@/lib/constants"

/**
 * Footer V3 (mockup v6-1): NUD terakota traka — logo, nav linkovi,
 * brend linija. Bez adrese, bez pravnih podataka (brief: samo brend).
 */
export default function Footer() {
  return (
    <footer className="bg-terra text-terra-ink">
      {/* pb-28 na mobilnom: prostor za sticky "Pozovite" traku */}
      <div className="container-site pb-28 pt-16 sm:pb-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <Link
            href="/"
            aria-label="Puterina — početna strana"
            className="text-[27px] text-terra-ink"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 450,
              fontVariationSettings: '"opsz" 40',
            }}
          >
            Puterina
          </Link>

          <nav aria-label="Footer navigacija" className="flex flex-wrap gap-x-7 gap-y-3">
            {NAV_FOOTER.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                // py-1: veća dodirna zona na telefonu (glavna publika)
                className="py-1 text-[13px] uppercase tracking-[0.06em] text-terra-ink/70 transition-opacity duration-300 hover:text-terra-ink"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram profil @puterinacakes"
            className="flex h-11 w-11 items-center justify-center text-terra-ink/80 transition-opacity hover:text-terra-ink"
          >
            <Instagram className="h-5 w-5" aria-hidden />
          </a>
        </div>

        <div className="mt-12 border-t border-terra-ink/15 pt-6 text-[12.5px] tracking-[0.03em] text-terra-ink/55">
          {SITE.brandLine} · {CONTACT.instagramHandle}
        </div>
      </div>
    </footer>
  )
}
