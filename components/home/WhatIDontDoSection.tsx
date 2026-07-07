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
    <section
      className="section-block section-dark relative overflow-hidden"
      aria-labelledby="neradim-naslov"
    >
      {/* #7a — linijska skica šlag-špatule (v4-home-2), dekor u donjem
          desnom uglu; nikad preko teksta (sadržaj je relativan, posle nje),
          skrivena na <md */}
      <svg
        viewBox="0 0 340 340"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        className="pointer-events-none absolute -bottom-9 right-8 hidden w-[340px] opacity-[0.08] md:block"
      >
        <g
          fill="none"
          stroke="var(--dark-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* drška */}
          <path d="M 21 301 L 106 216 A 12.7 12.7 0 0 1 124 234 L 39 319 A 12.7 12.7 0 0 1 21 301 Z" />
          {/* vrat */}
          <path d="M 118 228 L 148 198" />
          {/* list špatule */}
          <path d="M 145 200 C 190 140 250 85 308 42 C 316 36 326 44 320 54 C 268 108 215 165 162 216 C 152 226 140 214 145 200 Z" />
          {/* talas krema */}
          <path d="M 196 262 q 14 -16 28 0 q 14 16 28 0 q 14 -16 28 0" />
        </g>
      </svg>

      <div className="container-site relative">
        <Reveal>
          <span className="label block">Principi</span>
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
