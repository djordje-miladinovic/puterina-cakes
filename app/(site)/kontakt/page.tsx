import type { Metadata } from "next"
import { Instagram, Phone } from "lucide-react"
import Reveal from "@/components/reveal"
import { WhatsAppIcon, ViberIcon } from "@/components/icons"
import { CONTACT, SITE, WORKING_HOURS } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Kontakt | Puterina — butik torti Beograd",
  description:
    "Pozovite 065 37 993 34 (radnim danima 08–20h) ili pišite na Instagram, WhatsApp, Viber. Puterina — butik torti, Beograd.",
}

/**
 * Kontakt V3 (V3-COPY §8): bez formulara i bez mape. Telefon krupno,
 * poziv primaran + poruke, „Pre poziva pripremite", kvalifikacioni
 * blok, dostava BEZ zona (§12).
 */
export default function KontaktPage() {
  return (
    <>
      <div className="section-cream pb-20 pt-28 md:pb-24 md:pt-36">
        <div className="container-site">
          <Reveal>
            <span className="label mb-4 block">Kontakt</span>
            <h1>Kontakt</h1>
            <p className="body-large mt-4 max-w-xl text-ink-muted">
              Najbrže se dogovaramo porukom ili pozivom — bez formulara.
            </p>
          </Reveal>

          {/* Telefon — krupno, kao tekst */}
          <Reveal delay={1} className="mt-14">
            <a
              href={`tel:${CONTACT.phone}`}
              className="display-lg block transition-colors hover:text-oliva"
            >
              {CONTACT.phoneDisplay}
            </a>
            <p className="body-large mt-3 text-ink-muted">
              {WORKING_HOURS.display}
            </p>
            <a href={`tel:${CONTACT.phone}`} className="cta-primary mt-7">
              <Phone className="h-4 w-4" aria-hidden />
              Pozovite
            </a>
          </Reveal>

          {/* Poruke — sekundarno (§12 hijerarhija) */}
          <Reveal delay={2} className="mt-14">
            <h2 className="!text-2xl">ili pišite</h2>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
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
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-outline"
              >
                <Instagram className="h-4 w-4" aria-hidden />
                Instagram DM
              </a>
            </div>
            <p className="mt-4 max-w-lg text-[14px] text-ink-muted">
              Na WhatsApp i Viber Vas čeka unapred upisana poruka — samo je
              dopunite datumom i brojem gostiju.
            </p>
            <p className="mt-6 max-w-[44ch] text-[15px] text-ink">
              Pišite mi šta slavite. Ostalo je moja briga.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Dostava (§12 — BEZ zona) + kvalifikacioni blok (§11.2) */}
      <div className="section-tint py-16 md:py-20">
        <div className="container-site space-y-10">
          <Reveal>
            <p className="body text-ink-muted">{SITE.deliveryNote}</p>
          </Reveal>
          <Reveal delay={1}>
            <div className="max-w-2xl bg-bg2 px-8 py-7">
              <p className="body-large text-ink">
                Puterina je za Vas ako mislite da torta treba da se pamti duže
                od proslave. Ako Vam treba nešto za sutra popodne — iskreno,
                nisam ja za to. Puter se ne požuruje.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  )
}
