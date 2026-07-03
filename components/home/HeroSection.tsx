import Image from "next/image"
import { Phone } from "lucide-react"
import { CONTACT, SITE } from "@/lib/constants"

/**
 * Full-bleed hero (ZA-PUTERINU §3.1, PLAN T3.1): jedna raskošna svetla
 * fotografija preko celog ekrana, BEZ crnog gradijenta. Preko nje samo
 * slogan i dugme "Pozovite" — prvi utisak nosi torta, ne tekst.
 */
export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] w-full" aria-label="Puterina — butik torti">
      <Image
        src="/images/dummy/hero-pistac-malina.jpg"
        alt="Signature torta sa malinama i svilenkastim puter kremom — Puterina, butik torti Beograd"
        fill
        priority
        sizes="100vw"
        className="puterina-img object-cover"
      />
      {/* Svetli (krem) preliv pri dnu — čitljivost bez tamnih preliva */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-cream/95 via-cream/40 to-transparent"
        aria-hidden
      />

      <div className="container-site absolute inset-x-0 bottom-0 pb-24 sm:pb-20 md:pb-28">
        <h1 className="display-hero max-w-4xl">{SITE.tagline}</h1>
        <a
          href={`tel:${CONTACT.phone}`}
          className="cta-primary mt-8 text-lg !px-10"
        >
          <Phone className="h-5 w-5" aria-hidden />
          Pozovite
        </a>
      </div>
    </section>
  )
}
