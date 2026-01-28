"use client"

import { useState } from "react"
import { 
  Phone, 
  Instagram, 
  Leaf, 
  BarChart3, 
  AlertTriangle, 
  Thermometer,
  Copy,
  Check
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
  const [copied, setCopied] = useState(false)
  const phoneE164 = CONTACT.phone
  
  // Generate Instagram DM template message
  const dmTemplate = `Zdravo, zanima me ${title}, ___kg, datum ___`

  // Format price with thousands separator
  const formattedPrice = pricePerKg.toLocaleString("sr-RS")
  
  // Handle copy to clipboard
  const handleCopyTemplate = async () => {
    try {
      await navigator.clipboard.writeText(dmTemplate)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      // Fallback for older browsers
      try {
        const textArea = document.createElement("textarea")
        textArea.value = dmTemplate
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (fallbackError) {
        console.error("Failed to copy to clipboard:", error, fallbackError)
      }
    }
  }

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
      </div>

      {/* CTA Buttons - Premium styling */}
      <div className="flex flex-col gap-3">
        {/* Primary CTA - Phone */}
        <Button 
          size="lg" 
          className="w-full h-12 text-base shadow-[var(--shadow-butter)] hover:shadow-[var(--shadow-butter-lg)]" 
          asChild
        >
          <a href={`tel:${phoneE164}`}>
            <Phone className="mr-2 h-5 w-5" />
            POZOVITE
          </a>
        </Button>

        {/* Secondary CTA - Instagram DM */}
        <Button 
          size="lg"
          variant="outline"
          className="w-full h-12 text-base border-light-gray hover:border-butter-gold hover:bg-blush-pink/30"
          asChild
        >
          <a
            href={CONTACT.instagramDm}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Otvorite Instagram poruke"
          >
            <Instagram className="mr-2 h-5 w-5" />
            Instagram DM
          </a>
        </Button>
        
        {/* Copyable template message - fallback for Instagram DM */}
        <div className="bg-soft-white rounded-lg p-4 border border-light-gray">
          <p className="text-sm text-muted-foreground mb-2">
            Kopirajte šablon poruke za Instagram DM:
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-sm bg-white rounded px-3 py-2 border border-light-gray text-warm-brown">
              {dmTemplate}
            </code>
            <Button
              size="icon"
              variant="outline"
              className="h-10 w-10 shrink-0 border-light-gray hover:border-butter-gold hover:bg-blush-pink/30"
              onClick={handleCopyTemplate}
              aria-label={copied ? "Kopirano" : "Kopiraj šablon poruke"}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
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
