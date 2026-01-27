import Link from "next/link"
import { Instagram, Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react"
import { CONTACT, NAVIGATION, WORKING_HOURS } from "@/lib/constants"

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
