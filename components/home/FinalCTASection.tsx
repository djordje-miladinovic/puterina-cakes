import Link from "next/link"
import Reveal from "@/components/reveal"
import { CONTACT, SITE, WORKING_HOURS } from "@/lib/constants"

/**
 * Finale (mockup v6-1): miran tint blok, centriran — „Hajde da napravimo
 * Vašu tortu." + poziv primaran + poruke tekstualno (§12 hijerarhija).
 */
export default function FinalCTASection() {
  return (
    <section
      className="section-tint py-28 text-center md:py-36"
      aria-labelledby="cta-naslov"
    >
      <div className="container-narrow">
        <Reveal>
          <span className="label mb-5 block">Poručivanje</span>
          <h2 id="cta-naslov">
            Hajde da napravimo
            <br />
            Vašu tortu.
          </h2>
          <p className="body-large mt-4 text-ink-muted">
            {WORKING_HOURS.display} · {SITE.city}
          </p>
        </Reveal>

        <Reveal delay={1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-7">
            <a href={`tel:${CONTACT.phone}`} className="cta-primary">
              Pozovite — {CONTACT.phoneDisplay}
            </a>
            <Link href="/kontakt" className="tlink">
              Pošaljite poruku
            </Link>
          </div>

          <p className="mt-6 text-[13.5px] text-ink-muted">
            {SITE.prepareChecklist}
            {"  ·  "}
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-oliva hover:opacity-80"
            >
              WhatsApp
            </a>
            {" · "}
            <a href={CONTACT.viber} className="text-oliva hover:opacity-80">
              Viber
            </a>
            {" · "}
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-oliva hover:opacity-80"
            >
              Instagram
            </a>
          </p>

          <p className="mt-9 text-[14px] italic text-ink-muted">
            {SITE.exclusivityNote}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
