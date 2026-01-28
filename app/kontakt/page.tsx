import type { Metadata } from "next"
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Clock,
  MessageCircle,
  CheckCircle2,
} from "lucide-react"
import { CONTACT, WORKING_HOURS } from "@/lib/constants"

// Custom WhatsApp icon component
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

// Custom Viber icon component
function ViberIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.398.002C9.473.028 5.331.344 3.014 2.467 1.294 4.182.628 6.62.528 9.677.428 12.733.248 18.234 5.6 19.87h.003l-.003 2.128c0 0-.036.86.534 1.036.69.213 1.097-.443 1.757-1.15.362-.387.863-.953 1.24-1.385 3.413.287 6.037-.37 6.338-.462.693-.212 4.617-.726 5.254-5.93.658-5.363-.32-8.746-2.1-10.27-.546-.476-2.68-1.834-7.225-1.835M11.5 1.58c3.938.009 5.778 1.085 6.202 1.453 1.475 1.263 2.296 4.282 1.74 8.837-.504 4.129-3.582 4.549-4.169 4.727-.25.077-2.528.648-5.449.453 0 0-2.159 2.604-2.833 3.285-.105.107-.232.147-.316.127-.118-.027-.151-.16-.149-.355l.02-3.568c-4.259-1.307-4.012-5.774-3.932-8.234.079-2.46.591-4.454 2.02-5.868 1.905-1.751 5.306-1.867 6.866-1.857m.656 2.59c-.136 0-.247.113-.243.25.003.136.12.242.256.238.685-.017 1.32.134 1.888.449.586.325 1.086.79 1.485 1.384a4.273 4.273 0 01.722 2.084c.016.136.134.236.27.228.136-.009.238-.126.227-.262a4.79 4.79 0 00-.81-2.357 4.847 4.847 0 00-1.686-1.571 4.286 4.286 0 00-2.109-.443zm-4.37.26c-.157-.014-.365.035-.578.12-.347.138-.64.36-.868.58a2.65 2.65 0 00-.592.823c-.154.326-.19.663-.148.985.072.55.35 1.083.64 1.599.573 1.017 1.293 2.044 2.2 3.017.736.79 1.58 1.528 2.527 2.164.946.636 1.996 1.168 3.133 1.538.568.184 1.08.278 1.519.218.439-.059.805-.27 1.076-.546.27-.276.46-.611.569-.935.069-.206.092-.4.052-.56-.038-.16-.134-.275-.264-.358-.702-.448-1.447-.812-2.198-1.176-.42-.203-.92-.129-1.142.2l-.466.689c-.22.323-.65.377-.65.377s-1.728.447-3.613-1.41c-1.885-1.857-1.438-3.57-1.438-3.57s.055-.426.382-.643l.695-.463c.334-.22.41-.72.208-1.137-.36-.743-.714-1.481-1.153-2.177-.115-.183-.311-.318-.531-.335a1.263 1.263 0 00-.36-.002zm4.757 1.063c-.135-.004-.25.107-.254.244-.004.137.107.251.243.255a2.236 2.236 0 011.59.867c.342.42.562.97.607 1.583.009.136.128.238.264.228.135-.009.237-.127.227-.263a3.04 3.04 0 00-.736-1.92 2.73 2.73 0 00-1.941-1.004v.01zm.403 1.49c-.136.003-.243.12-.24.256.004.137.12.245.257.242.313-.006.58.105.79.317.21.212.334.51.345.855.005.136.118.243.255.238.136-.004.242-.121.237-.257-.015-.469-.184-.886-.476-1.178-.29-.292-.69-.459-1.168-.453v-.02z" />
    </svg>
  )
}

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

        {/* Contact Info Card */}
        <div className="p-6 bg-blush-pink/10 rounded-xl border border-blush-pink/30 md:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blush-pink/20">
              <Mail className="h-5 w-5 text-raspberry" />
            </span>
            <h2 className="text-lg font-semibold text-warm-brown">
              Dodatni Kontakt
            </h2>
          </div>
          <ul className="space-y-2 text-charcoal">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-raspberry mt-1 shrink-0" />
              <a
                href={`mailto:${CONTACT.email}`}
                className="hover:text-raspberry hover:underline transition-colors"
              >
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-raspberry mt-1 shrink-0" />
              <span>Odgovaramo u toku istog dana</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-raspberry mt-1 shrink-0" />
              <span>Konsultacije pre porudžbine</span>
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
