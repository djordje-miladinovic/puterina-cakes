import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Milk, Egg, Wheat, AlertCircle } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { CANONICAL_BASE, CONTACT } from "@/lib/constants"

// Allergen icon mapping
const allergenIcons: Record<string, LucideIcon> = {
  milk: Milk,
  eggs: Egg,
  gluten: Wheat,
}

interface Product {
  title: string
  slug: { current: string }
  pricePerKg: number
  description: string
  storage: string
  ingredients: string
  nutrition: {
    energy: number
    protein: number
    carbs: number
    fat: number
    fiber: number
    salt: number
  }
  allergens: string[]
}

// Mock product data
// TODO: Replace with actual Sanity query by:
// 1. Uncommenting the query below
// 2. Importing the client: import { client } from "@/lib/sanity/client"
// 3. Removing the mockProducts array
// 4. Returning the fetched product
// Example query:
// const product = await client.fetch(
//   `*[_type == "product" && slug.current == $slug][0]`,
//   { slug }
// )

// Mock product slugs for static generation
// TODO: Replace with actual Sanity query when CMS is connected
const PRODUCT_SLUGS = ["cokoladna-torta", "vocna-torta"]

const mockProducts: Record<string, Product> = {
  "cokoladna-torta": {
    title: "Čokoladna torta",
    slug: { current: "cokoladna-torta" },
    pricePerKg: 2500,
    description:
      "Bogata čokoladna torta sa višeslojnom kremom. Savršena kombinacija tamne čokolade i kremaste punjene.",
    storage: "Čuvati u frižideru na temperaturi od +4°C do +8°C. Rok trajanja: 3 dana.",
    ingredients:
      "Brašno, šećer, jaja, putar, mleko, čokolada (70% kakao), kakao prah, prašak za pecivo, so, vanilin.",
    nutrition: {
      energy: 380,
      protein: 6,
      carbs: 45,
      fat: 18,
      fiber: 3,
      salt: 0.5,
    },
    allergens: ["gluten", "milk", "eggs"],
  },
  "vocna-torta": {
    title: "Voćna torta",
    slug: { current: "vocna-torta" },
    pricePerKg: 2300,
    description:
      "Osvežavajuća torta sa sezonskim voćem. Lagana biskvit osnova sa svežim voćem i kremom.",
    storage: "Čuvati u frižideru na temperaturi od +4°C do +8°C. Rok trajanja: 2 dana.",
    ingredients:
      "Brašno, šećer, jaja, putar, mleko, sezonsko voće, šlag, prašak za pecivo, so, vanilin.",
    nutrition: {
      energy: 320,
      protein: 5,
      carbs: 42,
      fat: 14,
      fiber: 2,
      salt: 0.4,
    },
    allergens: ["gluten", "milk", "eggs"],
  },
}

const getProduct = async (slug: string): Promise<Product | null> => {
  return mockProducts[slug] || null
}

// Generate static params for all known product slugs
// TODO: Replace with Sanity query when CMS is connected
export async function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    return {
      title: "Proizvod nije pronađen",
    }
  }

  return {
    title: product.title,
    description: product.description,
    alternates: {
      canonical: `${CANONICAL_BASE}/proizvod/${slug}`,
    },
    openGraph: {
      title: product.title,
      description: product.description,
      url: `${CANONICAL_BASE}/proizvod/${slug}`,
    },
  }
}

export default async function ProizvodPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Image Placeholder */}
        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">Slika proizvoda</p>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-3xl font-bold text-primary mb-6">
            {product.pricePerKg} RSD/kg
          </p>
          <p className="text-lg text-muted-foreground mb-8">
            {product.description}
          </p>

          <Button size="lg" className="w-full md:w-auto" asChild>
            <a href={`tel:${CONTACT.phone}`}>Poručite Odmah</a>
          </Button>

          {/* Allergens */}
          {product.allergens && product.allergens.length > 0 && (
            <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-900 mb-2">
                    Sadrži alergene:
                  </h3>
                  <div className="flex gap-4">
                    {product.allergens.map((allergen: string) => {
                      const Icon = allergenIcons[allergen] || AlertCircle
                      return (
                        <div key={allergen} className="flex items-center gap-2">
                          <Icon className="h-5 w-5 text-amber-700" />
                          <span className="text-sm text-amber-900 capitalize">
                            {allergen === "gluten" && "Gluten"}
                            {allergen === "milk" && "Mleko"}
                            {allergen === "eggs" && "Jaja"}
                            {allergen === "nuts" && "Orašasti plodovi"}
                            {allergen === "soy" && "Soja"}
                            {allergen === "sesame" && "Susam"}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-12">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="ingredients">
            <AccordionTrigger className="text-lg font-semibold">
              Sastojci
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">{product.ingredients}</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="nutrition">
            <AccordionTrigger className="text-lg font-semibold">
              Nutritivne Informacije (na 100g)
            </AccordionTrigger>
            <AccordionContent>
              <table className="w-full">
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-2">Energija</td>
                    <td className="py-2 text-right">
                      {product.nutrition.energy} kcal
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Proteini</td>
                    <td className="py-2 text-right">
                      {product.nutrition.protein} g
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Ugljeni hidrati</td>
                    <td className="py-2 text-right">
                      {product.nutrition.carbs} g
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Masti</td>
                    <td className="py-2 text-right">{product.nutrition.fat} g</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Vlakna</td>
                    <td className="py-2 text-right">
                      {product.nutrition.fiber} g
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">So</td>
                    <td className="py-2 text-right">
                      {product.nutrition.salt} g
                    </td>
                  </tr>
                </tbody>
              </table>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="storage">
            <AccordionTrigger className="text-lg font-semibold">
              Čuvanje i Rok Trajanja
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">{product.storage}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
