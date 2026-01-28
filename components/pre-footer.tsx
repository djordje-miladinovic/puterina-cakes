import { Phone, Mail, MapPin } from "lucide-react"
import { CONTACT } from "@/lib/constants"

export default function PreFooter() {
  return (
    <section
      className="bg-butter-gold/10 border-y border-butter-gold/20"
      aria-label="Kontakt informacije"
    >
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-warm-brown mb-2">
            Imate pitanja? Javite nam se:
          </h2>
          <p className="text-medium-gray">
            Rado ćemo odgovoriti na sva Vaša pitanja
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
          {/* Phone */}
          <a
            href={`tel:${CONTACT.phone}`}
            className="flex flex-col items-center p-6 bg-soft-white rounded-xl border border-butter-gold/20 hover:border-butter-gold hover:shadow-butter transition-all duration-200 group"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-butter-gold/10 group-hover:bg-butter-gold group-hover:text-white transition-all duration-200 mb-4">
              <Phone className="h-5 w-5 text-butter-gold group-hover:text-white" />
            </span>
            <span className="text-sm text-medium-gray mb-1">Telefon</span>
            <span className="font-semibold text-warm-brown group-hover:text-butter-gold transition-colors">
              {CONTACT.phone}
            </span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${CONTACT.email}`}
            className="flex flex-col items-center p-6 bg-soft-white rounded-xl border border-butter-gold/20 hover:border-butter-gold hover:shadow-butter transition-all duration-200 group"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-butter-gold/10 group-hover:bg-butter-gold group-hover:text-white transition-all duration-200 mb-4">
              <Mail className="h-5 w-5 text-butter-gold group-hover:text-white" />
            </span>
            <span className="text-sm text-medium-gray mb-1">Email</span>
            <span className="font-semibold text-warm-brown group-hover:text-butter-gold transition-colors">
              {CONTACT.email}
            </span>
          </a>

          {/* Address */}
          <div className="flex flex-col items-center p-6 bg-soft-white rounded-xl border border-butter-gold/20">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-butter-gold/10 mb-4">
              <MapPin className="h-5 w-5 text-butter-gold" />
            </span>
            <span className="text-sm text-medium-gray mb-1">Lokacija</span>
            <span className="font-semibold text-warm-brown text-center">
              {CONTACT.address}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
