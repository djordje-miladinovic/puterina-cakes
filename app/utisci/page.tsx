import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/reveal"
import { CONTACT } from "@/lib/constants"
import { REAL_TESTIMONIALS } from "@/lib/products-data"

export const metadata: Metadata = {
  title: "Poruke koje čuvam | Puterina — butik torti Beograd",
  description:
    "Poruke kupaca Puterina torti — najlepši utisak je kada se vratite. Butik torti, Beograd.",
}

/**
 * Utisci V3 — „Poruke koje čuvam": ISKLJUČIVO pravi citati
 * (REAL_TESTIMONIALS — trenutno 2, sa Instagrama). Bez izmišljenih.
 * Stranica raste kako stižu poruke uz dozvolu kupaca.
 */
export default function UtisciPage() {
  return (
    <>
      <div className="section-cream pb-20 pt-28 md:pb-28 md:pt-36">
        <div className="container-site">
          <Reveal>
            <span className="label mb-4 block">06 — Reči kupaca</span>
            <h1>Poruke koje čuvam</h1>
            <p className="body-large mt-4 max-w-xl text-ink-muted">
              Najviše me raduju poruke koje stignu posle proslave. Ovde ih
              čuvam — uz dozvolu onih koji su ih poslali.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-x-14">
            {REAL_TESTIMONIALS.map((t, i) => (
              <Reveal
                key={t.author}
                delay={((i % 3) as 0 | 1 | 2)}
                className={i % 2 === 1 ? "md:mt-10" : ""}
              >
                <figure>
                  <blockquote className="bubble body-large text-ink">
                    „{t.quote}“
                  </blockquote>
                  <figcaption className="mt-5 pl-6 text-ink">
                    <span className="font-medium">{t.author}</span>
                    <span className="text-ink-muted"> · {t.context}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Veliki citat */}
      <section className="section-tint py-20 md:py-24" aria-label="Citat">
        <div className="container-narrow">
          <Reveal>
            <p className="manifest-line text-center">
              „Najlepši utisak je kada se vratite.“
            </p>
          </Reveal>
        </div>
      </section>

      {/* Poziv na deljenje utiska — recenzije-loop (V3-COPY §12 #40) */}
      <div className="section-cream py-20 md:py-28">
        <div className="container-narrow text-center">
          <Reveal>
            <h2>Vaš utisak ovde?</h2>
            <p className="body-large mx-auto mt-5 max-w-[52ch] text-ink-muted">
              Ako je moja torta bila deo Vašeg slavlja, napišite mi par reči —
              najviše pomaže ako pomenete koji ste ukus uzeli i za koju
              priliku.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-7">
              <a href={`tel:${CONTACT.phone}`} className="cta-primary">
                Pozovite — {CONTACT.phoneDisplay}
              </a>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="tlink"
              >
                Pišite na Instagramu
              </a>
            </div>
            <p className="mt-10 text-[14px] italic text-ink-muted">
              Hajde da napravimo Vašu tortu —{" "}
              <Link href="/katalog" className="text-oliva hover:opacity-80">
                pogledajte ukuse
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </div>
    </>
  )
}
