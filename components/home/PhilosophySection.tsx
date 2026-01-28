import { Heart, Clock, Sparkles, Star, Award } from "lucide-react"

const MINIMUM_ORDER_DAYS = 10

interface PhilosophyItem {
  id: string
  icon: React.ElementType
  title: string
  description: string
}

const philosophyItems: PhilosophyItem[] = [
  {
    id: "buttercream",
    icon: Heart,
    title: "Isključivo buttercream",
    description: "Verujem da puter krem daje autentičan ukus i teksturu — ne koristim fondan prekrivke.",
  },
  {
    id: "homemade-bases",
    icon: Sparkles,
    title: "Domaće kore",
    description: "Svaka kora je pečena od nule sa pažljivo odabranim sastojcima — nikada polugotove.",
  },
  {
    id: "advance-order",
    icon: Clock,
    title: "Vreme za savršenstvo",
    description: `Minimum ${MINIMUM_ORDER_DAYS} dana unapred — zato što kvalitetna torta zahteva vreme i posvećenost.`,
  },
  {
    id: "fondant-figurines",
    icon: Star,
    title: "Figurice od fondana",
    description: "Sarađujem sa proverenim majstorima za figurice — naručuju se zasebno uz doplatu.",
  },
]

export default function PhilosophySection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 section-textured">
      <div className="container mx-auto px-4">
        {/* Main content box - using card-base pattern with consistent border-radius */}
        <div className="bg-soft-white rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 border border-light-gray/50">
          {/* Section header with proper spacing */}
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">
              Filozofija Puterine
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Verujemo da svaka torta zaslužuje Vašu punu pažnju — ovo su principi po kojima radimo.
            </p>
          </div>

          {/* Philosophy items grid with consistent gap */}
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-12">
            {philosophyItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-5 md:p-6 rounded-xl bg-cream/50 border border-light-gray/30 transition-all duration-200 hover:bg-cream/80 hover:border-butter-gold/30"
              >
                <div className="shrink-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blush-pink/50 flex items-center justify-center">
                    <item.icon className="w-5 h-5 md:w-6 md:h-6 text-warm-brown" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-medium mb-1.5 text-warm-brown">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Exclusivity note - discrete and elegant */}
          <div className="text-center pt-6 md:pt-8 border-t border-light-gray/50">
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <Award className="w-4 h-4 md:w-5 md:h-5 text-butter-gold" />
              <p className="text-sm md:text-base italic">
                Primamo ograničen broj porudžbina nedeljno kako bismo svakoj torti posvetili punu pažnju koju zaslužuje.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
