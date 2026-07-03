import type { Metadata } from "next"
import { Instagram, Phone } from "lucide-react"
import Reveal from "@/components/reveal"
import { WhatsAppIcon, ViberIcon } from "@/components/icons"
import { CONTACT, SITE, WORKING_HOURS } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Pozovite 065 37 993 34 (radnim danima 08–20h) ili pišite na Instagram, WhatsApp, Viber. Puterina — butik torti, Beograd.",
}

/**
 * Kontakt (ZA-PUTERINU §9): bez formulara i bez mape — samo direktan
 * kontakt. Telefon krupno, tri opcije za poruku (prefilled), blush
 * podsetnik "Pre poziva pripremite", bez adrese.
 */
export default function KontaktPage() {
  return (
    <>
      <div className="section-cream pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="container-site">
          <Reveal>
            <h1>Kontakt</h1>
            <p className="body-large mt-4 max-w-xl text-charcoal/75">
              Najbrže se dogovaramo uz poziv ili poruku — bez formulara.
            </p>
          </Reveal>

          {/* Telefon — krupno */}
          <Reveal delay={1} className="mt-16">
            <a
              href={`tel:${CONTACT.phone}`}
              className="display-lg block hover:text-warm-brown-deep transition-colors"
            >
              {CONTACT.phoneDisplay}
            </a>
            <p className="body-large mt-3 text-charcoal/75">
              {WORKING_HOURS.display}
            </p>
            <a
              href={`tel:${CONTACT.phone}`}
              className="cta-primary mt-8 !px-10 text-lg"
            >
              <Phone className="h-5 w-5" aria-hidden />
              Pozovite
            </a>
          </Reveal>

          {/* Tri opcije za poruku */}
          <Reveal delay={2} className="mt-16">
            <h2 className="!text-2xl">Ili pošaljite poruku</h2>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-outline"
              >
                <Instagram className="h-4 w-4" aria-hidden />
                Instagram DM
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-outline"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
              <a href={CONTACT.viber} className="cta-outline">
                <ViberIcon className="h-4 w-4" />
                Viber
              </a>
            </div>
            <p className="body-small mt-4 max-w-lg text-charcoal/60">
              Na WhatsApp i Viber Vas čeka unapred upisana poruka — samo je
              dopunite datumom i brojem gostiju.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Blush podsetnik */}
      <section className="section-block section-blush !py-16 md:!py-20" aria-labelledby="podsetnik">
        <div className="container-site">
          <Reveal>
            <h2 id="podsetnik" className="!text-2xl">
              Pre poziva pripremite:
            </h2>
            <ul className="body-large mt-6 space-y-3 text-charcoal/85">
              <li className="flex gap-3">
                <span aria-hidden className="text-warm-brown">01</span>
                datum proslave
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="text-warm-brown">02</span>
                broj gostiju
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="text-warm-brown">03</span>
                željeni ukus ili stil torte
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <div className="section-cream py-14">
        <div className="container-site">
          <p className="body text-charcoal/70">{SITE.deliveryNote}</p>
        </div>
      </div>
    </>
  )
}
