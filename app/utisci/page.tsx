import type { Metadata } from "next"
import { Phone } from "lucide-react"
import Reveal from "@/components/reveal"
import { CONTACT } from "@/lib/constants"
import { DUMMY_TESTIMONIALS } from "@/lib/dummy-data"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Utisci",
  description:
    "Poruke kupaca Puterina torti — najlepši utisak je kada se vratite. Butik torti, Beograd.",
}

/**
 * Utisci (ZA-PUTERINU §7): sve poruke kupaca kao nežni chat-oblačići,
 * razigrano poređani; veliki citat u sredini; CTA na dnu.
 * Trenutni utisci su PRIMERI — menjaju se pravim porukama (odluka #9).
 */
export default function UtisciPage() {
  const half = Math.ceil(DUMMY_TESTIMONIALS.length / 2)
  const firstHalf = DUMMY_TESTIMONIALS.slice(0, half)
  const secondHalf = DUMMY_TESTIMONIALS.slice(half)

  return (
    <>
      <div className="section-cream pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container-site">
          <Reveal>
            <h1>Utisci</h1>
            <p className="body-large mt-4 max-w-xl text-charcoal/75">
              Najlepše poruke koje su stigle uz vraćene tacne i osmehe.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-x-14">
            {firstHalf.map((t, i) => (
              <Reveal
                key={t.name}
                delay={((i % 3) as 0 | 1 | 2)}
                className={cn(i % 2 === 1 && "md:mt-10")}
              >
                <figure>
                  <blockquote className="bubble body-large text-charcoal/85">
                    „{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 pl-6 text-warm-brown">
                    <span className="font-semibold">{t.name}</span>
                    <span className="text-charcoal/60"> · {t.occasion}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Veliki citat */}
      <section className="section-block section-blush !py-20" aria-label="Citat">
        <div className="container-site">
          <Reveal>
            <p className="display-lg mx-auto max-w-3xl text-center">
              „Najlepši utisak je kada se vratite.”
            </p>
          </Reveal>
        </div>
      </section>

      <div className="section-cream py-20 md:py-28">
        <div className="container-site">
          <div className="grid gap-10 md:grid-cols-2 md:gap-x-14">
            {secondHalf.map((t, i) => (
              <Reveal
                key={t.name}
                delay={((i % 3) as 0 | 1 | 2)}
                className={cn(i % 2 === 0 && "md:mt-10")}
              >
                <figure>
                  <blockquote className="bubble body-large text-charcoal/85">
                    „{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 pl-6 text-warm-brown">
                    <span className="font-semibold">{t.name}</span>
                    <span className="text-charcoal/60"> · {t.occasion}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-24 text-center">
            <h2>Napravimo i Vašu uspomenu.</h2>
            <a
              href={`tel:${CONTACT.phone}`}
              className="cta-primary mt-8 !px-10 text-lg"
            >
              <Phone className="h-5 w-5" aria-hidden />
              Pozovite
            </a>
          </Reveal>
        </div>
      </div>
    </>
  )
}
