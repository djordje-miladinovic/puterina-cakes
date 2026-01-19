import type { Metadata } from "next"
import { Phone, Mail, MapPin, Instagram, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CONTACT, WORKING_HOURS } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktirajte Puterina Cakes",
}

export default function KontaktPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Kontakt</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Kontaktirajte Nas</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Telefon</h3>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="text-muted-foreground hover:text-primary"
                >
                  {CONTACT.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Email</h3>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-muted-foreground hover:text-primary"
                >
                  {CONTACT.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Adresa</h3>
                <p className="text-muted-foreground">{CONTACT.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Instagram className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Instagram</h3>
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  {CONTACT.instagramHandle}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Načini Komunikacije</h2>
          <div className="space-y-4">
            <Button asChild className="w-full justify-start" size="lg">
              <a href={`tel:${CONTACT.phone}`}>
                <Phone className="mr-2 h-5 w-5" />
                Pozovite Nas
              </a>
            </Button>

            <Button
              asChild
              className="w-full justify-start bg-green-600 hover:bg-green-700"
              size="lg"
            >
              <a
                href={`https://wa.me/${CONTACT.phone.replace(/\+/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp
              </a>
            </Button>

            <Button
              asChild
              className="w-full justify-start bg-purple-600 hover:bg-purple-700"
              size="lg"
            >
              <a href={`viber://chat?number=${CONTACT.phone.replace(/\+/g, "")}`}>
                <MessageCircle className="mr-2 h-5 w-5" />
                Viber
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full justify-start"
              size="lg"
            >
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="mr-2 h-5 w-5" />
                Instagram
              </a>
            </Button>
          </div>

          <div className="mt-8 p-6 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Radno Vreme</h3>
            <p className="text-sm text-muted-foreground">
              {WORKING_HOURS.weekdays}
              <br />
              {WORKING_HOURS.saturday}
              <br />
              {WORKING_HOURS.sunday}
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
