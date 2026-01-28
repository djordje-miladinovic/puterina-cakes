import { Leaf, HandHeart, Package, Truck } from "lucide-react"

interface BrandBenefit {
  id: string
  icon: React.ElementType
  title: string
  description: string
}

const brandBenefits: BrandBenefit[] = [
  {
    id: "natural",
    icon: Leaf,
    title: "100% prirodno",
    description: "Samo pravi, kvalitetni sastojci bez aditiva",
  },
  {
    id: "handmade",
    icon: HandHeart,
    title: "Ručno rađeno",
    description: "Svaka torta je jedinstvena i pečena s ljubavlju",
  },
  {
    id: "small-batch",
    icon: Package,
    title: "Male serije",
    description: "Ograničen broj porudžbina za vrhunski kvalitet",
  },
  {
    id: "delivery",
    icon: Truck,
    title: "Dostava",
    description: "Isporuka na kućnu adresu širom Beograda",
  },
]

export default function BrandBenefitsSection() {
  return (
    <section className="py-8 md:py-10 lg:py-12 bg-soft-white border-b border-light-gray/30">
      <div className="container mx-auto px-4">
        {/* Benefits grid - 4 columns on large screens, 2 on medium, stack on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {brandBenefits.map((benefit) => (
            <div
              key={benefit.id}
              className="flex flex-col items-center text-center p-4 md:p-5"
            >
              {/* Icon circle */}
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-blush-pink/50 flex items-center justify-center mb-3">
                <benefit.icon className="w-6 h-6 md:w-7 md:h-7 text-warm-brown" />
              </div>
              
              {/* Title */}
              <h3 className="text-sm md:text-base font-semibold text-warm-brown mb-1">
                {benefit.title}
              </h3>
              
              {/* Description - hidden on small mobile, visible from sm up */}
              <p className="hidden sm:block text-xs md:text-sm text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
