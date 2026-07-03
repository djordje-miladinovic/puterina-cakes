import Reveal from "@/components/reveal"

/**
 * „Šta ne radim" (ZA-PUTERINU §3.6) — tri stavke sa nežnim precrtavanjem
 * naslova stavke (NIKAD alergena!). Ljubazno, gradi poverenje.
 */
const ITEMS = [
  {
    label: "Fondan prekrivke",
    text: "kod mene je samo puter krem.",
  },
  {
    label: "Polugotove kore i gotove smese",
    text: "sve se peče od nule.",
  },
  {
    label: "„Instagram kugle”",
    text: "biram ukus pre trenda.",
  },
]

export default function WhatIDontDoSection() {
  return (
    <section className="section-block section-cream" aria-labelledby="neradim-naslov">
      <div className="container-site max-w-3xl">
        <Reveal>
          <h2 id="neradim-naslov" className="mb-12">
            Šta ne radim
          </h2>
        </Reveal>

        <ul className="space-y-8">
          {ITEMS.map((item, i) => (
            <Reveal key={item.label} as="li" delay={(i as 0 | 1 | 2)}>
              <p className="body-large">
                <span className="h3 align-baseline line-through decoration-raspberry/60 decoration-2">
                  {item.label}
                </span>{" "}
                <span className="text-charcoal/80">— {item.text}</span>
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={3}>
          <p className="body-large mt-12 italic text-warm-brown">
            Zato Puterina torte izgledaju toplo — a ukus im je još bolji.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
