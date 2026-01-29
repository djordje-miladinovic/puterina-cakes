import type { Metadata } from "next"
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Clock,
  MessageCircle,
  CheckCircle2,
  ClipboardList,
} from "lucide-react"
import { WhatsAppIcon, ViberIcon } from "@/components/icons"
import { CONTACT, WORKING_HOURS } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktirajte Puterina Cakes putem telefona, Instagram DM-a, WhatsApp-a ili Viber-a. Bez forme – direktna komunikacija za brz odgovor.",
}

export default function KontaktPage() {
  return (
    <div className="container mx-auto px-4 pt-24 md:pt-28 pb-16 max-w-5xl">
      {/* Page Header */}
      <header className="text-center mb-12 md:mb-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Kontaktirajte Nas
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Direktna komunikacija je naš način. Javite nam se telefonom, porukom
          ili preko društvenih mreža – radujemo se svakoj novoj saradnji!
        </p>
      </header>

      {/* 3 Premium CTA Blocks */}
      <section className="mb-16" aria-label="Načini kontakta">
        <div className="grid gap-6 md:grid-cols-3">
          {/* CTA Block 1: POZOVITE */}
          <a
            href={`tel:${CONTACT.phone}`}
            className="group flex flex-col items-center p-8 md:p-10 bg-soft-white rounded-2xl border-2 border-butter-gold/20 hover:border-butter-gold hover:shadow-butter-lg transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-butter-gold focus-visible:ring-offset-2"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-butter-gold/10 group-hover:bg-butter-gold group-hover:scale-110 transition-all duration-300 mb-6">
              <Phone className="h-7 w-7 text-butter-gold group-hover:text-white transition-colors" />
            </span>
            <span className="text-sm uppercase tracking-wider text-medium-gray mb-2">
              Direktan poziv
            </span>
            <span className="text-xl md:text-2xl font-semibold text-warm-brown mb-3">
              Pozovite Nas
            </span>
            <span className="text-butter-gold font-medium group-hover:underline">
              {CONTACT.phone}
            </span>
          </a>

          {/* CTA Block 2: Instagram DM */}
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center p-8 md:p-10 bg-soft-white rounded-2xl border-2 border-blush-pink/30 hover:border-raspberry hover:shadow-lg transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-raspberry focus-visible:ring-offset-2"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] group-hover:scale-110 transition-all duration-300 mb-6">
              <Instagram className="h-7 w-7 text-white" />
            </span>
            <span className="text-sm uppercase tracking-wider text-medium-gray mb-2">
              Društvene mreže
            </span>
            <span className="text-xl md:text-2xl font-semibold text-warm-brown mb-3">
              Instagram DM
            </span>
            <span className="text-raspberry font-medium group-hover:underline">
              {CONTACT.instagramHandle}
            </span>
          </a>

          {/* CTA Block 3: WhatsApp / Viber */}
          <div className="flex flex-col items-center p-8 md:p-10 bg-soft-white rounded-2xl border-2 border-pistachio/30">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-pistachio/20 mb-6">
              <MessageCircle className="h-7 w-7 text-warm-brown" />
            </span>
            <span className="text-sm uppercase tracking-wider text-medium-gray mb-2">
              Brze poruke
            </span>
            <span className="text-xl md:text-2xl font-semibold text-warm-brown mb-4">
              WhatsApp / Viber
            </span>
            <div className="flex gap-3 w-full">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white font-medium rounded-xl hover:bg-[#20BD5C] hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>WhatsApp</span>
              </a>
              <a
                href={CONTACT.viber}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#7360F2] text-white font-medium rounded-xl hover:bg-[#5D4CC7] hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7360F2] focus-visible:ring-offset-2"
              >
                <ViberIcon className="h-5 w-5" />
                <span>Viber</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Šta da pošaljete Checklist Section */}
      <section className="mb-16" aria-label="Šta da pošaljete">
        <div className="p-6 md:p-8 bg-soft-white rounded-2xl border-2 border-butter-gold/20">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-butter-gold/10">
              <ClipboardList className="h-6 w-6 text-butter-gold" />
            </span>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-warm-brown">
                Šta da pošaljete?
              </h2>
              <p className="text-sm text-medium-gray">
                Pripremite ove informacije za brži odgovor
              </p>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <li className="flex items-start gap-2 text-charcoal">
              <CheckCircle2 className="h-5 w-5 text-butter-gold mt-0.5 shrink-0" />
              <span>
                <strong className="text-warm-brown">Datum</strong> – kada Vam
                treba torta
              </span>
            </li>
            <li className="flex items-start gap-2 text-charcoal">
              <CheckCircle2 className="h-5 w-5 text-butter-gold mt-0.5 shrink-0" />
              <span>
                <strong className="text-warm-brown">Povod</strong> – rođendan,
                svadba, krštenje...
              </span>
            </li>
            <li className="flex items-start gap-2 text-charcoal">
              <CheckCircle2 className="h-5 w-5 text-butter-gold mt-0.5 shrink-0" />
              <span>
                <strong className="text-warm-brown">Broj osoba ili kg</strong> –
                koliko gostiju očekujete
              </span>
            </li>
            <li className="flex items-start gap-2 text-charcoal">
              <CheckCircle2 className="h-5 w-5 text-butter-gold mt-0.5 shrink-0" />
              <span>
                <strong className="text-warm-brown">Željeni stil</strong> – ukus,
                izgled, inspiracija
              </span>
            </li>
            <li className="flex items-start gap-2 text-charcoal">
              <CheckCircle2 className="h-5 w-5 text-butter-gold mt-0.5 shrink-0" />
              <span>
                <strong className="text-warm-brown">Alergeni</strong> – ako ima
                posebnih zahteva
              </span>
            </li>
            <li className="flex items-start gap-2 text-charcoal">
              <CheckCircle2 className="h-5 w-5 text-butter-gold mt-0.5 shrink-0" />
              <span>
                <strong className="text-warm-brown">Lokacija</strong> – ako je
                potrebna dostava
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Info Bullets Section */}
      <section
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        aria-label="Korisne informacije"
      >
        {/* Working Hours Card */}
        <div className="p-6 bg-butter-gold/5 rounded-xl border border-butter-gold/20">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-butter-gold/10">
              <Clock className="h-5 w-5 text-butter-gold" />
            </span>
            <h2 className="text-lg font-semibold text-warm-brown">
              Radno Vreme
            </h2>
          </div>
          <ul className="space-y-2 text-charcoal">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-butter-gold mt-1 shrink-0" />
              <span>{WORKING_HOURS.weekdays}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-butter-gold mt-1 shrink-0" />
              <span>{WORKING_HOURS.saturday}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-butter-gold mt-1 shrink-0" />
              <span>{WORKING_HOURS.sunday}</span>
            </li>
          </ul>
        </div>

        {/* Location Card */}
        <div className="p-6 bg-pistachio/10 rounded-xl border border-pistachio/30">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-pistachio/20">
              <MapPin className="h-5 w-5 text-warm-brown" />
            </span>
            <h2 className="text-lg font-semibold text-warm-brown">Lokacija</h2>
          </div>
          <ul className="space-y-2 text-charcoal">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-warm-brown mt-1 shrink-0" />
              <span>{CONTACT.address}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-warm-brown mt-1 shrink-0" />
              <span>Lično preuzimanje moguće</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-warm-brown mt-1 shrink-0" />
              <span>Dostava na teritoriji Beograda</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Bottom Note */}
      <div className="mt-12 text-center">
        <p className="text-medium-gray text-sm max-w-xl mx-auto">
          💬 Preferiramo direktnu komunikaciju bez formi – tako možemo brže i
          preciznije odgovoriti na Vaša pitanja i zajedno osmisliti savršenu
          tortu za Vašu posebnu priliku.
        </p>
      </div>
    </div>
  )
}
