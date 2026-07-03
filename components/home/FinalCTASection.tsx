import { Phone } from "lucide-react"
import Reveal from "@/components/reveal"
import { CONTACT, SITE, WORKING_HOURS } from "@/lib/constants"

/**
 * Završni CTA (ZA-PUTERINU §3.9): zlatasti color-block — "Poručite svoju
 * tortu", radno vreme, veliko dugme Pozovite + sitnije IG/WA/Viber,
 * diskretna linija o ekskluzivnosti. Rok od 10 dana ide u FAQ, ne ovde.
 */
export default function FinalCTASection() {
  return (
    <section className="section-block section-gold" aria-labelledby="cta-naslov">
      <div className="container-site text-center">
        <Reveal>
          <h2 id="cta-naslov" className="display-lg !text-soft-white">
            Poručite svoju tortu
          </h2>
          <p className="body-large mt-4 text-soft-white/90">
            {WORKING_HOURS.display}
          </p>
        </Reveal>

        <Reveal delay={1}>
          <a
            href={`tel:${CONTACT.phone}`}
            className="mt-10 inline-flex items-center justify-center gap-3 rounded-full bg-soft-white px-12 py-4 text-lg font-semibold text-warm-brown transition-transform hover:-translate-y-[2px]"
          >
            <Phone className="h-5 w-5" aria-hidden />
            Pozovite — {CONTACT.phoneDisplay}
          </a>

          <p className="body-small mt-6 text-soft-white/90">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:opacity-80"
            >
              Instagram DM
            </a>
            {" · "}
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:opacity-80"
            >
              WhatsApp
            </a>
            {" · "}
            <a
              href={CONTACT.viber}
              className="underline underline-offset-4 hover:opacity-80"
            >
              Viber
            </a>
          </p>

          <p className="body-small mt-10 italic text-soft-white/80">
            {SITE.exclusivityNote}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
