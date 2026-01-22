import HeroSection from "@/components/home/HeroSection"

export default function Home() {
  return (
    <>
      <HeroSection />

      <section className="py-16 container mx-auto px-4">
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
    </>
  )
}
