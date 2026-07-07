import { WORKING_HOURS } from "@/lib/constants"
import Reveal from "@/components/reveal"

/**
 * „Kako do torte u tri koraka" (mockup v6-1) — svetla sekcija,
 * veliki serifni brojevi u oliva akcentu, završna linija u glasu.
 */
const STEPS = [
  {
    title: "Izaberite ukus",
    text: "Razgledajte katalog — ukusi se menjaju sezonski.",
  },
  {
    title: "Pozovite me",
    text: `Dogovaramo veličinu, dekoraciju i termin. ${WORKING_HOURS.display}.`,
  },
  {
    title: "Preuzimanje ili dostava",
    text: "Lično preuzimanje ili dostava u Beogradu.",
  },
]

export default function OrderStepsSection() {
  return (
    <section className="section-block section-cream" aria-labelledby="koraci-naslov">
      <div className="container-site">
        <Reveal className="mb-14">
          <span className="label mb-4 block">Dogovor</span>
          <h2 id="koraci-naslov">Kako do torte u tri koraka</h2>
        </Reveal>

        <ol className="grid gap-9 md:grid-cols-3 md:gap-12">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} as="li" delay={(i as 0 | 1 | 2)}>
              <span
                aria-hidden
                className="block select-none text-[3.6rem] leading-none text-oliva opacity-50"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontVariationSettings: '"opsz" 144',
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-2 mt-4">{step.title}</h3>
              <p className="text-[15px] text-ink-muted">{step.text}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={3}>
          <p className="mt-12 text-[15px] italic text-ink-muted">
            Toliko. Poruka, dogovor, torta.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
