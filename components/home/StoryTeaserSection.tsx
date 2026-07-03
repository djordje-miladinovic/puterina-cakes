import Image from "next/image"
import Link from "next/link"
import Reveal from "@/components/reveal"

/**
 * „Moja priča" teaser (ZA-PUTERINU §3.5) — pistać blok, topla fotografija
 * ruku u organskoj blob formi, tekst u 1. licu, rukopisni akcenat.
 */
export default function StoryTeaserSection() {
  return (
    <section className="section-block section-pistachio" aria-labelledby="prica-naslov">
      <div className="container-site grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div className="img-blob relative mx-auto aspect-[4/5] w-full max-w-md">
            <Image
              src="/images/dummy/o-meni-ruke.jpg"
              alt="Ruke dekorišu tortu puter kremom — Puterina radionica"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="puterina-img object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={1}>
          <h2 id="prica-naslov">Moja priča</h2>
          <p className="body-large mt-6 max-w-xl text-charcoal/85">
            Puterina je nastala u mojoj kuhinji — iz ljubavi prema pravljenju
            torti za najdraže. Danas je to mali butik torti u Beogradu, u kome
            i dalje sve pravim ručno: prave sirovine, pravi puter i vreme koje
            svaka torta zasluži.
          </p>
          <div className="mt-8 flex flex-col items-start gap-8">
            <Link href="/o-meni" className="cta-outline">
              Moja priča →
            </Link>
            <p className="accent-script" aria-hidden>
              s ljubavlju
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
