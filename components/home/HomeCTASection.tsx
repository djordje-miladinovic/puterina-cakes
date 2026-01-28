import { Phone, Instagram } from "lucide-react"
import { CONTACT } from "@/lib/constants"

export default function HomeCTASection() {
  return (
    <section
      className="py-16 md:py-20 lg:py-24 bg-warm-brown"
      aria-label="Poziv na akciju"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* Section header */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-soft-white">
            Spremni za porudžbinu?
          </h2>
          <p className="text-soft-white/80 mb-8 md:mb-10 text-base md:text-lg leading-relaxed">
            Kontaktirajte nas telefonom ili putem Instagram poruke i napravite
            Vašu savršenu tortu
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Phone CTA */}
            <a
              href={`tel:${CONTACT.phone}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-butter-gold text-white font-semibold rounded-lg hover:bg-butter-gold-hover transition-all duration-200 hover:-translate-y-0.5 hover:shadow-butter-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-butter-gold focus-visible:ring-offset-2 focus-visible:ring-offset-warm-brown min-w-[200px]"
            >
              <Phone className="w-5 h-5" />
              Pozovite nas
            </a>

            {/* Instagram DM CTA */}
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-soft-white/10 text-soft-white font-medium rounded-lg border border-soft-white/30 hover:bg-soft-white/20 hover:border-soft-white/50 transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-warm-brown min-w-[200px]"
            >
              <Instagram className="w-5 h-5" />
              Instagram DM
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
