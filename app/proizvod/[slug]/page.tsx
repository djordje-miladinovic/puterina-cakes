import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import { CANONICAL_BASE } from "@/lib/constants"
import { ProductGallery, ProductInfo, type AllergenType, type GalleryImage } from "@/components/product"

interface Product {
  title: string
  slug: { current: string }
  pricePerKg: number
  shortDescription: string
  description?: string
  storage?: string
  ingredients?: string
  nutrition?: {
    energy: number
    protein: number
    carbs: number
    sugars?: number
    fat: number
    saturatedFat?: number
    fiber?: number
    salt: number
  }
  allergens?: AllergenType[]
  declaration?: string
  gallery?: GalleryImage[]
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
    shortDescription:
      "Bogata čokoladna torta sa višeslojnom kremom. Savršena kombinacija tamne čokolade i kremaste punjene.",
    description:
      "Naša čokoladna torta je prava poslastica za ljubitelje čokolade. Tri sloja mekanog čokoladnog biskvita, prelivena bogatom ganache kremom od belgijske tamne čokolade (70% kakao).\n\nSvaki zalogaj donosi intenzivan ukus čokolade sa kremastom teksturom koja se topi u ustima. Idealna za rođendane, proslave ili jednostavno kad želite da se počastite nečim posebnim.",
    storage: "Čuvati u frižideru na temperaturi od +4°C do +8°C. Rok trajanja: 3 dana od datuma izrade. Pre konzumacije ostaviti 30 minuta na sobnoj temperaturi za najbolji ukus.",
    ingredients:
      "Brašno (pšenično), šećer, jaja, putar, mleko, čokolada (70% kakao), kakao prah, prašak za pecivo, so, vanilin ekstrakt.",
    nutrition: {
      energy: 380,
      protein: 6,
      carbs: 45,
      sugars: 32,
      fat: 18,
      saturatedFat: 10,
      fiber: 3,
      salt: 0.5,
    },
    allergens: ["gluten", "milk", "eggs"],
    declaration: "Proizvođač: Puterina Cakes, Beograd, Srbija\nSastojci: Brašno (pšenično), šećer, jaja, putar, mleko, čokolada (70% kakao), kakao prah, prašak za pecivo, so, vanilin ekstrakt.\nMože sadržati tragove orašastih plodova.\nČuvati na temperaturi od +4°C do +8°C.\nNeto masa: varira prema porudžbini.\nDatum proizvodnje: naveden na ambalaži.",
    gallery: [
      { src: "/images/products/cokoladna-torta-1.jpg", alt: "Čokoladna torta - glavni pogled" },
      { src: "/images/products/cokoladna-torta-2.jpg", alt: "Čokoladna torta - presek" },
      { src: "/images/products/cokoladna-torta-3.jpg", alt: "Čokoladna torta - detalj dekoracije" },
    ],
  },
  "vocna-torta": {
    title: "Voćna torta",
    slug: { current: "vocna-torta" },
    pricePerKg: 2300,
    shortDescription:
      "Osvežavajuća torta sa sezonskim voćem. Lagana biskvit osnova sa svežim voćem i kremom.",
    description:
      "Lagana i osvežavajuća torta idealna za letnje dane. Naš vanila biskvit je kombinovan sa svežim sezonskim voćem i laganom mascarpone kremom.\n\nSvaka torta je dekorisana ručno odabranim voćem koje menja u zavisnosti od sezone - jagode, maline, borovnice, breskve ili kombinacija.",
    storage: "Čuvati u frižideru na temperaturi od +4°C do +8°C. Rok trajanja: 2 dana od datuma izrade.",
    ingredients:
      "Brašno (pšenično), šećer, jaja, putar, mleko, sezonsko voće, šlag, mascarpone, prašak za pecivo, so, vanilin ekstrakt.",
    nutrition: {
      energy: 320,
      protein: 5,
      carbs: 42,
      sugars: 28,
      fat: 14,
      saturatedFat: 8,
      fiber: 2,
      salt: 0.4,
    },
    allergens: ["gluten", "milk", "eggs"],
    declaration: "Proizvođač: Puterina Cakes, Beograd, Srbija\nSastojci: Brašno (pšenično), šećer, jaja, putar, mleko, sezonsko voće, šlag, mascarpone, prašak za pecivo, so, vanilin ekstrakt.\nMože sadržati tragove orašastih plodova.\nČuvati na temperaturi od +4°C do +8°C.\nNeto masa: varira prema porudžbini.\nDatum proizvodnje: naveden na ambalaži.",
    gallery: [
      { src: "/images/products/vocna-torta-1.jpg", alt: "Voćna torta - glavni pogled" },
      { src: "/images/products/vocna-torta-2.jpg", alt: "Voćna torta - presek" },
      { src: "/images/products/vocna-torta-3.jpg", alt: "Voćna torta - detalj voća" },
    ],
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
    description: product.shortDescription,
    alternates: {
      canonical: `${CANONICAL_BASE}/proizvod/${slug}`,
    },
    openGraph: {
      title: product.title,
      description: product.shortDescription,
      url: `${CANONICAL_BASE}/proizvod/${slug}`,
    },
  }
}

// Generate Product JSON-LD for SEO
function generateProductJsonLd(product: Product, slug: string) {
  const productUrl = `${CANONICAL_BASE}/proizvod/${slug}`
  const mainImage = product.gallery?.[0]?.src 
    ? `${CANONICAL_BASE}${product.gallery[0].src}`
    : undefined

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.shortDescription,
    url: productUrl,
    ...(mainImage && { image: mainImage }),
    offers: {
      "@type": "Offer",
      price: product.pricePerKg,
      priceCurrency: "RSD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: product.pricePerKg,
        priceCurrency: "RSD",
        unitCode: "KGM",
        unitText: "kg",
      },
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Puterina Cakes",
        url: CANONICAL_BASE,
      },
    },
    brand: {
      "@type": "Brand",
      name: "Puterina Cakes",
      url: CANONICAL_BASE,
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

  const productJsonLd = generateProductJsonLd(product, slug)

  return (
    <>
      {/* Product JSON-LD for SEO */}
      <Script
        id="product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <div className="container mx-auto px-4 pt-24 pb-8 md:pt-28 md:pb-12 max-w-6xl">
        {/* Desktop: 60/40 split, Mobile: stacked */}
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12">
          {/* Product Gallery - Left Side */}
          <div className="lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
            <ProductGallery 
              images={product.gallery || []} 
              productName={product.title} 
            />
          </div>

          {/* Product Info - Right Side */}
          <div>
            <ProductInfo
              title={product.title}
              pricePerKg={product.pricePerKg}
              shortDescription={product.shortDescription}
              description={product.description}
              storage={product.storage}
              ingredients={product.ingredients}
              nutrition={product.nutrition}
              allergens={product.allergens}
              declaration={product.declaration}
            />
          </div>
        </div>
      </div>
    </>
  )
}
