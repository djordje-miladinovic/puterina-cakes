import Reveal from "@/components/reveal"

/**
 * „Ono što ne radim — jednako je važno" (mockup v6-1): tamni NUD
 * terakota predah. Lista sa — crticama, BEZ precrtavanja.
 * Granica kao poklon — nikad izvinjenje.
 */
const ITEMS = [
  { label: "Fondan prekrivke.", text: "Kod mene je samo puter krem." },
  {
    label: "Polugotove kore i gotove smese.",
    text: "Sve se peče od nule.",
  },
  { label: "„Instagram kugle“.", text: "Biram ukus pre trenda." },
]

export default function WhatIDontDoSection() {
  return (
    <section className="section-block section-dark" aria-labelledby="neradim-naslov">
      <div className="container-site">
        <Reveal>
          <span className="label block">04 — Principi</span>
          <h2 id="neradim-naslov" className="mt-4 max-w-[16ch]">
            Ono što ne radim — jednako je važno
          </h2>
        </Reveal>

        <Reveal delay={1}>
          <ul className="ne-list">
            {ITEMS.map((item) => (
              <li key={item.label} className="ne-item">
                <span className="n" aria-hidden>
                  —
                </span>
                <div>
                  <b>{item.label}</b>
                  <span>{item.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={2}>
          <p className="mt-10 text-[15px] italic text-terra-ink/80">
            Zato Puterina torta izgleda toplo — a pamti se zalogajem.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
