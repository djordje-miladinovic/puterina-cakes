import { Phone, Instagram, MessageCircle } from "lucide-react"
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
  const waPhone = phoneE164.replace("+", "")
  const whatsappMessage = encodeURIComponent(
    `Zdravo, zanima me torta ${title}. Da li biste mi mogli reći više o njoj?`
  )

  // Format price with thousands separator
  const formattedPrice = pricePerKg.toLocaleString("sr-RS")

  return (
    <div className="space-y-6">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-semibold">{title}</h1>

      {/* Price */}
      <p className="text-2xl md:text-3xl font-bold text-primary">
        {formattedPrice} RSD/kg
      </p>

      {/* Short Description */}
      <p className="text-lg text-muted-foreground leading-relaxed">
        {shortDescription}
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-3 pt-2">
        {/* Primary CTA - Phone */}
        <Button 
          size="lg" 
          className="flex-1 min-w-[140px]" 
          asChild
        >
          <a href={`tel:${phoneE164}`}>
            <Phone className="mr-2 h-5 w-5" />
            Pozovite
          </a>
        </Button>

        {/* Secondary CTAs */}
        <Button 
          size="lg" 
          variant="outline" 
          className="flex-1 min-w-[140px]"
          asChild
        >
          <a
            href={`https://wa.me/${waPhone}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            WhatsApp
          </a>
        </Button>

        <Button 
          size="icon"
          variant="outline"
          className="h-11 w-11"
          asChild
        >
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>
        </Button>
      </div>

      {/* Accordion Sections */}
      <div className="pt-6 border-t">
        <Accordion type="single" collapsible className="w-full">
          {/* Description */}
          {description && (
            <AccordionItem value="description">
              <AccordionTrigger className="text-base font-semibold hover:no-underline">
                Opis
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {description}
                </p>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Storage */}
          {storage && (
            <AccordionItem value="storage">
              <AccordionTrigger className="text-base font-semibold hover:no-underline">
                Čuvanje
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground leading-relaxed">
                  {storage}
                </p>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Ingredients */}
          {ingredients && (
            <AccordionItem value="ingredients">
              <AccordionTrigger className="text-base font-semibold hover:no-underline">
                Sastojci
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground leading-relaxed">
                  {ingredients}
                </p>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Nutritional Values */}
          {nutrition && (
            <AccordionItem value="nutrition">
              <AccordionTrigger className="text-base font-semibold hover:no-underline">
                Nutritivne vrednosti
              </AccordionTrigger>
              <AccordionContent>
                <NutritionalTable nutrition={nutrition} />
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Allergens */}
          <AccordionItem value="allergens">
            <AccordionTrigger className="text-base font-semibold hover:no-underline">
              Alergeni
            </AccordionTrigger>
            <AccordionContent>
              {allergens.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground mb-4">
                    Precrtane ikonice označavaju alergene koje proizvod <strong>NE</strong> sadrži.
                  </p>
                  <AllergenIcons contains={allergens} showAll={true} />
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Za informacije o alergenima, kontaktirajte nas.
                </p>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Declaration */}
          {declaration && (
            <AccordionItem value="declaration">
              <AccordionTrigger className="text-base font-semibold hover:no-underline">
                Deklaracija
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground leading-relaxed text-sm whitespace-pre-line">
                  {declaration}
                </p>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>
    </div>
  )
}
