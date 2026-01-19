import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold mb-6">
          Dobrodošli u Puterina Cakes
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Ručno pravljene premium torte i kolači izrađeni sa ljubavlju i
          pažnjom. Svaka slastica je jedinstveno umetničko delo.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/katalog">Pogledajte Katalog</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/kontakt">Kontaktirajte Nas</Link>
          </Button>
        </div>
      </section>

      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Zašto Nas Odabrati?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <h3 className="text-xl font-semibold mb-4">Premium Kvalitet</h3>
            <p className="text-muted-foreground">
              Koristimo samo najbolje sastojke za savršen ukus
            </p>
          </div>
          <div className="text-center p-6">
            <h3 className="text-xl font-semibold mb-4">Ručna Izrada</h3>
            <p className="text-muted-foreground">
              Svaki proizvod je pažljivo izrađen sa pažnjom prema detaljima
            </p>
          </div>
          <div className="text-center p-6">
            <h3 className="text-xl font-semibold mb-4">Brza Dostava</h3>
            <p className="text-muted-foreground">
              Garantujemo svežinu i pravovremenu isporuku
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
