import type { Metadata } from "next"
import Image from "next/image"
import { Phone } from "lucide-react"
import Reveal from "@/components/reveal"
import { CONTACT } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Moja priča",
  description:
    "Kako je iz kućne kuhinje nastao butik torti: pravi puter, mali rituali i torta kao slikarsko platno. Puterina, Beograd.",
}

/**
 * „O meni" (ZA-PUTERINU §6): topla priča u 1. licu — hobi → butik torti,
 * džez + slatke umetnosti, proces kao ritual. Pull-quote na pistać bloku,
 * rukom ispisan potpis, CTA na dnu.
 */
export default function OMeniPage() {
  return (
    <>
      <div className="section-cream pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container-site grid items-start gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <h1>Moja priča</h1>
            <div className="body-large mt-8 space-y-6 text-charcoal/85">
              <p>
                Sve je počelo u mojoj kuhinji — tortom za najdraže i mirisom
                vanile koji se uvukao u svaki ćošak stana.
              </p>
              <p>
                Volim džez i volim slatke umetnosti. Negde između te dve
                ljubavi nastala je Puterina: mali butik torti u Beogradu, u
                kome se i dalje sve pravi ručno — bez prečica, bez gotovih
                smesa i bez fondana. Samo pravi puter, prave sirovine i vreme
                koje svaka torta zasluži.
              </p>
              <p>
                Svaka torta kod mene počinje jednom porukom ili pozivom. Onda
                kreću moji mali rituali: spisak sastojaka, miris tek ispečenih
                korica, filovi koji dobijaju savršenu teksturu — i noć u kojoj
                torta mirno spava u frižideru. A onda dolazi moj omiljeni deo:
                trenutak kada torta prestane da bude desert i postane malo
                slikarsko platno. Boje, potezi špatule, detalji… i svaka na
                kraju dobije svoj lični pečat.
              </p>
              <p>
                Radim ograničen broj torti nedeljno — jer svaka zaslužuje
                pažnju. Zato Vas molim samo jedno: javite se na vreme.
              </p>
            </div>
            <p className="accent-script mt-10 text-xl" aria-hidden>
              s ljubavlju, Puterina
            </p>
          </Reveal>

          <Reveal delay={1} className="md:sticky md:top-28">
            <div className="img-blob relative aspect-[4/5] w-full">
              <Image
                src="/images/dummy/o-meni-ruke.jpg"
                alt="Ruke dekorišu tortu puter kremom — Puterina radionica, Beograd"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 45vw"
                className="puterina-img object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Pull-quote — pistać blok */}
      <section className="section-block section-pistachio" aria-label="Moto">
        <div className="container-site">
          <Reveal>
            <blockquote className="display-lg mx-auto max-w-4xl text-center">
              „Verujem u pravi puter, kvalitetne sastojke i u to da se ljubav
              — oseti u zalogaju.”
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Završni CTA */}
      <section className="section-cream py-20 md:py-28" aria-label="Poručivanje">
        <div className="container-site text-center">
          <Reveal>
            <h2>Hajde da napravimo Vašu tortu.</h2>
            <a
              href={`tel:${CONTACT.phone}`}
              className="cta-primary mt-8 !px-10 text-lg"
            >
              <Phone className="h-5 w-5" aria-hidden />
              Pozovite
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
