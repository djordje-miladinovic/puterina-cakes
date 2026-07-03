import { WORKING_HOURS } from "@/lib/constants"
import Reveal from "@/components/reveal"

/**
 * „Kako do torte u 3 koraka" (ZA-PUTERINU §3.3) — blush color-block,
 * bez ikonica u krugovima; broj koraka u serif displeju.
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
    <section className="section-block section-blush" aria-labelledby="koraci-naslov">
      <div className="container-site">
        <Reveal>
          <h2 id="koraci-naslov" className="mb-14 md:mb-20">
            Kako do torte u 3 koraka
          </h2>
        </Reveal>

        <ol className="grid gap-12 md:grid-cols-3 md:gap-10">
          {STEPS.map((step, i) => (
            <Reveal
              key={step.title}
              as="li"
              delay={(i as 0 | 1 | 2)}
              className="max-w-sm"
            >
              <span
                aria-hidden
                className="display-lg block text-warm-brown/35 select-none"
              >
                {i + 1}.
              </span>
              <h3 className="mt-3">{step.title}</h3>
              <p className="body mt-2 text-charcoal/80">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
