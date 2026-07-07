import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Reveal from "@/components/reveal"
import { CONTACT, SITE } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Moja priča | Puterina — butik torti Beograd",
  description:
    "Kako je iz kućne kuhinje nastao butik torti: pravi puter, mali rituali i torta kao slikarsko platno. Puterina, Beograd.",
}

/**
 * „O meni" V3 (V3-COPY §7): priča u 1. licu SA IMENOM — „Ja sam Katarina."
 * Pull-quote i teza epohe na tint blokovima (bez kartica), rukopisni
 * potpis „s ljubavlju, Katarina", CTA na dnu.
 */
export default function OMeniPage() {
  return (
    <>
      <div className="section-cream pb-20 pt-28 md:pb-28 md:pt-36">
        <div className="container-site grid items-start gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <span className="label mb-4 block">Priča</span>
            <h1>Moja priča</h1>
            <div className="body-large mt-8 space-y-6 text-ink">
              <p>
                Ja sam Katarina. Sve je počelo u mojoj kuhinji — tortom za
                najdraže i mirisom vanile koji se uvukao u svaki ćošak stana.
              </p>
              <p>
                Volim džez i volim slatke umetnosti. Negde između nastala je
                Puterina — ime je došlo slučajno, kao asocijacija na puter i
                nežne torte, i ostalo je, jer bolje nije postojalo. Butik
                torti u Beogradu u kome se sve pravi ručno. Bez gotovih smesa.
                Bez fondana. Pravi puter, prave maline i vreme koje torta
                zasluži.
              </p>
              <p>
                Svaka torta počinje porukom ili pozivom. Onda kreću moji mali
                rituali: spisak sastojaka, miris tek ispečenih korica, filovi
                koji dobijaju savršenu teksturu — i noć u kojoj torta mirno
                spava u frižideru. Radim uz instrumentalni džez, koji ispere
                sve osim torte pred mojim rukama. A onda moj omiljeni deo:
                trenutak kada torta prestane da bude desert i postane malo
                slikarsko platno. Boje, potezi špatule, teksture… i svaka
                dobije svoj lični pečat.
              </p>
              <p>
                Radim ograničen broj torti nedeljno — jer svaka zaslužuje
                pažnju. Zato Vas molim samo jedno: javite se na vreme.
              </p>
            </div>
            <p className="accent-script mt-10" aria-hidden>
              {SITE.signOff}
            </p>
          </Reveal>

          <Reveal delay={1} className="md:sticky md:top-28">
            <div className="img-frame relative aspect-[4/5] w-full">
              <Image
                src="/images/site/prica.jpg"
                alt="Torta iz Puterina radionice — Puterina, butik torti Beograd"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 45vw"
                className="puterina-img object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Pull-quote — tint blok */}
      <section className="section-block section-tint" aria-label="Moto">
        <div className="container-narrow">
          <Reveal>
            <blockquote
              className="manifest-line text-center"
              style={{ fontStyle: "italic" }}
            >
              „Verujem u pravi puter, kvalitetne sastojke i u to da se ljubav —
              oseti u zalogaju.“
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Teza epohe (V3-COPY §11.2) */}
      <section className="section-cream py-20 md:py-28" aria-label="Zašto Puterina">
        <div className="container-narrow text-center">
          <Reveal>
            <span className="label mb-5 block">Zašto Puterina</span>
            <p className="manifest-line">
              U vreme kada sve može da se naruči za sat vremena, najveći luksuz
              postaje ono što se čeka. Moje torte se čekaju — i vrede čekanja.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Završni CTA */}
      <section className="section-tint py-20 text-center md:py-28" aria-label="Poručivanje">
        <div className="container-narrow">
          <Reveal>
            <h2>Hajde da napravimo Vašu tortu.</h2>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-7">
              <a href={`tel:${CONTACT.phone}`} className="cta-primary">
                Pozovite — {CONTACT.phoneDisplay}
              </a>
              <Link href="/kontakt" className="tlink">
                Pošaljite poruku
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
