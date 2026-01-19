import type { Metadata } from "next"
import { Phone, Mail, MapPin, Instagram, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktirajte Puterina Cakes",
}

const PHONE = "+381653799334"
const EMAIL = "info@puterinacakes.rs"
const ADDRESS = "Beograd, Srbija"
const INSTAGRAM = "https://instagram.com/puterinacakes"

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
                  href={`tel:${PHONE}`}
                  className="text-muted-foreground hover:text-primary"
                >
                  {PHONE}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Email</h3>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-muted-foreground hover:text-primary"
                >
                  {EMAIL}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Adresa</h3>
                <p className="text-muted-foreground">{ADDRESS}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Instagram className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Instagram</h3>
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  @puterinacakes
                </a>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Načini Komunikacije</h2>
          <div className="space-y-4">
            <Button asChild className="w-full justify-start" size="lg">
              <a href={`tel:${PHONE}`}>
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
                href={`https://wa.me/${PHONE.replace(/\+/g, "")}`}
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
              <a href={`viber://chat?number=${PHONE.replace(/\+/g, "")}`}>
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
                href={INSTAGRAM}
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
              Ponedeljak - Petak: 9:00 - 18:00
              <br />
              Subota: 10:00 - 16:00
              <br />
              Nedelja: Po dogovoru
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
