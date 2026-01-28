import { 
  Phone, 
  Instagram, 
  Leaf, 
  BarChart3, 
  AlertTriangle, 
  Thermometer 
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { CONTACT } from "@/lib/constants"
import NutritionalTable from "./NutritionalTable"
import AllergenIcons, { type AllergenType } from "./AllergenIcons"

interface NutritionData {
  energy: number
  fat: number
  saturatedFat?: number
  carbs: number
  sugars?: number
  protein: number
  fiber?: number
  salt: number
}

interface ProductInfoProps {
  title: string
  pricePerKg: number
  shortDescription: string
  description?: string
  storage?: string
  ingredients?: string
  nutrition?: NutritionData
  allergens?: AllergenType[]
  declaration?: string
}

export default function ProductInfo({
  title,
  pricePerKg,
  shortDescription,
  description,
  storage,
  ingredients,
  nutrition,
  allergens = [],
  declaration,
}: ProductInfoProps) {
  const phoneE164 = CONTACT.phone

  // Format price with thousands separator
  const formattedPrice = pricePerKg.toLocaleString("sr-RS")

  return (
    <div className="space-y-8">
      {/* Title - Premium typography */}
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-semibold text-warm-brown leading-tight">
          {title}
        </h1>
        
        {/* Price - Prominent display */}
        <p className="text-2xl md:text-3xl font-bold text-butter-gold">
          {formattedPrice} <span className="text-lg font-medium">RSD/kg</span>
        </p>
        
        {/* Discreet note about decoration and delivery */}
        <p className="text-sm text-medium-gray italic">
          Detalji dekoracije i isporuke po dogovoru
        </p>
      </div>

      {/* CTA Buttons - Premium styling */}
      <div className="flex flex-wrap gap-3">
        {/* Primary CTA - Phone */}
        <Button 
          size="lg" 
          className="flex-1 min-w-[160px] h-12 text-base shadow-[var(--shadow-butter)] hover:shadow-[var(--shadow-butter-lg)]" 
          asChild
        >
          <a href={`tel:${phoneE164}`}>
            <Phone className="mr-2 h-5 w-5" />
            Pozovite nas
          </a>
        </Button>

        {/* Secondary CTA - Instagram */}
        <Button 
          size="icon"
          variant="outline"
          className="h-12 w-12 border-light-gray hover:border-butter-gold hover:bg-blush-pink/30"
          asChild
        >
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Posetite nas na Instagram-u"
          >
            <Instagram className="h-5 w-5" />
          </a>
        </Button>
      </div>

      {/* Description - Always visible, premium card style */}
      {description && (
        <div className="bg-soft-white rounded-xl p-6 border border-light-gray">
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-base">
            {description}
          </p>
        </div>
      )}
      
      {/* Accordion Sections with Icons */}
      <div className="pt-2">
        <Accordion type="single" collapsible className="w-full space-y-2">
          {/* Sastojci (Ingredients) */}
          {ingredients && (
            <AccordionItem 
              value="ingredients" 
              className="border border-light-gray rounded-xl px-4 bg-soft-white/50 hover:bg-soft-white transition-colors data-[state=open]:bg-soft-white"
            >
              <AccordionTrigger className="text-base font-semibold hover:no-underline py-4 text-warm-brown">
                <span className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-pistachio/50">
                    <Leaf className="w-4 h-4 text-warm-brown" />
                  </span>
                  Sastojci
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground leading-relaxed pb-2">
                  {ingredients}
                </p>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Nutritivne vrednosti (Nutritional Values) */}
          {nutrition && (
            <AccordionItem 
              value="nutrition" 
              className="border border-light-gray rounded-xl px-4 bg-soft-white/50 hover:bg-soft-white transition-colors data-[state=open]:bg-soft-white"
            >
              <AccordionTrigger className="text-base font-semibold hover:no-underline py-4 text-warm-brown">
                <span className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blush-pink/50">
                    <BarChart3 className="w-4 h-4 text-warm-brown" />
                  </span>
                  Nutritivne vrednosti
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pb-2">
                  <NutritionalTable nutrition={nutrition} />
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Alergeni (Allergens) */}
          {allergens.length > 0 && (
            <AccordionItem 
              value="allergens" 
              className="border border-light-gray rounded-xl px-4 bg-soft-white/50 hover:bg-soft-white transition-colors data-[state=open]:bg-soft-white"
            >
              <AccordionTrigger className="text-base font-semibold hover:no-underline py-4 text-warm-brown">
                <span className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-100">
                    <AlertTriangle className="w-4 h-4 text-amber-700" />
                  </span>
                  Alergeni
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pb-2">
                  <p className="text-sm text-muted-foreground">
                    Ikonice sa amber pozadinom označavaju alergene koje proizvod sadrži. 
                    Precrtane ikonice označavaju alergene koje proizvod ne sadrži.
                  </p>
                  <AllergenIcons contains={allergens} showAll={true} />
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Čuvanje (Storage) */}
          {storage && (
            <AccordionItem 
              value="storage" 
              className="border border-light-gray rounded-xl px-4 bg-soft-white/50 hover:bg-soft-white transition-colors data-[state=open]:bg-soft-white"
            >
              <AccordionTrigger className="text-base font-semibold hover:no-underline py-4 text-warm-brown">
                <span className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50">
                    <Thermometer className="w-4 h-4 text-blue-600" />
                  </span>
                  Čuvanje
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground leading-relaxed pb-2">
                  {storage}
                </p>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>
    </div>
  )
}
