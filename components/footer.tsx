import Link from "next/link"
import { Instagram, Phone, Mail } from "lucide-react"
import { CONTACT, NAVIGATION, WORKING_HOURS } from "@/lib/constants"

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="text-xl font-bold">
              Puterina Cakes
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Ručno pravljene premium torte i kolači izrađeni sa ljubavlju i
              pažnjom.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Navigacija</h3>
            <nav className="flex flex-col gap-2">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Kontakt</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <a
                href={`tel:${CONTACT.phone}`}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                {CONTACT.phone}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                {CONTACT.email}
              </a>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Instagram className="h-4 w-4" />
                {CONTACT.instagramHandle}
              </a>
              <div className="pt-2">
                <p className="font-medium text-foreground mb-1">Radno vreme:</p>
                <p>{WORKING_HOURS.weekdays}</p>
                <p>{WORKING_HOURS.saturday}</p>
                <p>{WORKING_HOURS.sunday}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} Puterina Cakes. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  )
}
