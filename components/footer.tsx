import Link from "next/link"
import { Instagram, Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react"
import { WhatsAppIcon } from "@/components/icons"
import { CONTACT, NAVIGATION, WORKING_HOURS } from "@/lib/constants"

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-warm-brown text-soft-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Main Footer Grid */}
        <div className="grid gap-10 md:gap-8 lg:gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand Section */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block text-2xl font-bold text-soft-white hover:text-butter-gold transition-colors">
              Puterina Cakes
            </Link>
            <p className="mt-4 text-soft-white/80 leading-relaxed">
              Ručno pravljene premium torte i kolači izrađeni sa ljubavlju i
              pažnjom. Vaše posebne trenutke činimo još slađima.
            </p>
          </div>

          {/* Navigation Section */}
          <div>
            <h3 className="text-lg font-semibold text-soft-white mb-4">Navigacija</h3>
            <nav className="flex flex-col gap-3">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-soft-white/80 hover:text-butter-gold transition-colors inline-flex items-center"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold text-soft-white mb-4">Kontakt</h3>
            <div className="space-y-4">
              <a
                href={`tel:${CONTACT.phone}`}
                className="flex items-center gap-3 text-soft-white/80 hover:text-butter-gold transition-colors group"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-soft-white/10 group-hover:bg-butter-gold group-hover:text-warm-brown transition-all duration-200">
                  <Phone className="h-4 w-4" />
                </span>
                <span>{CONTACT.phone}</span>
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-3 text-soft-white/80 hover:text-butter-gold transition-colors group"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-soft-white/10 group-hover:bg-butter-gold group-hover:text-warm-brown transition-all duration-200">
                  <Mail className="h-4 w-4" />
                </span>
                <span>{CONTACT.email}</span>
              </a>
              <div className="flex items-start gap-3 text-soft-white/80">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-soft-white/10 shrink-0">
                  <MapPin className="h-4 w-4" />
                </span>
                <span>{CONTACT.address}</span>
              </div>
            </div>
          </div>

          {/* Working Hours Section */}
          <div>
            <h3 className="text-lg font-semibold text-soft-white mb-4">Radno vreme</h3>
            <div className="space-y-3 text-soft-white/80">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-soft-white/10 shrink-0">
                  <Clock className="h-4 w-4" />
                </span>
                <div className="space-y-1">
                  <p>{WORKING_HOURS.weekdays}</p>
                  <p>{WORKING_HOURS.saturday}</p>
                  <p>{WORKING_HOURS.sunday}</p>
                </div>
              </div>
            </div>
            
            {/* Quick CTA for messaging */}
            <div className="mt-6 p-4 bg-soft-white/5 rounded-lg border border-soft-white/10">
              <p className="text-sm text-soft-white/80 mb-3">
                <MessageCircle className="inline h-4 w-4 mr-2" />
                Imate pitanje?
              </p>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white text-sm font-medium rounded-full hover:bg-[#20BD5C] transition-colors"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Pišite nam
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-soft-white/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-center md:text-left">
            <p className="text-sm text-soft-white/60">
              © {currentYear} Puterina Cakes. Sva prava zadržana.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm text-soft-white/60">
              <Link href="/kontakt" className="hover:text-butter-gold transition-colors">
                Politika privatnosti
              </Link>
              <span className="hidden md:inline">•</span>
              <Link href="/faq" className="hover:text-butter-gold transition-colors">
                Često postavljana pitanja
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
