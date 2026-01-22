import type { Metadata } from "next"
import { ProductCard, type ProductCardImage } from "@/components/product"

export const metadata: Metadata = {
  title: "Katalog Proizvoda",
  description: "Pregledajte našu kompletnu ponudu torti i kolača",
}

// Padding for fixed header: pt-20 (h-16) on mobile, pt-24 (h-20) on desktop

interface Product {
  _id: string
  title: string
  slug: { current: string }
  pricePerKg: number
  description: string
  primaryImage?: ProductCardImage
  secondaryImage?: ProductCardImage
}

// Mock products for demonstration
// TODO: Replace with Sanity query by:
// 1. Uncommenting and using: const products = await client.fetch(`*[_type == "product"]`)
// 2. Removing the mockProducts array below
const products: Product[] = [
  {
    _id: "1",
    title: "Čokoladna torta",
    slug: { current: "cokoladna-torta" },
    pricePerKg: 2500,
    description: "Bogata čokoladna torta sa višeslojnom kremom",
    primaryImage: {
      src: "/images/products/cokoladna-torta-1.jpg",
      alt: "Čokoladna torta - glavni pogled",
    },
    secondaryImage: {
      src: "/images/products/cokoladna-torta-2.jpg",
      alt: "Čokoladna torta - presek",
    },
  },
  {
    _id: "2",
    title: "Voćna torta",
    slug: { current: "vocna-torta" },
    pricePerKg: 2300,
    description: "Osvežavajuća torta sa sezonskim voćem",
    primaryImage: {
      src: "/images/products/vocna-torta-1.jpg",
      alt: "Voćna torta - glavni pogled",
    },
    secondaryImage: {
      src: "/images/products/vocna-torta-2.jpg",
      alt: "Voćna torta - presek",
    },
  },
]

export default async function KatalogPage() {
  // TODO: Replace with actual Sanity query
  // const products = await client.fetch(`*[_type == "product"]`)

  return (
    <div className="container mx-auto px-4 pt-24 pb-12 md:pt-28">
      <h1 className="text-4xl font-bold mb-8">Katalog Proizvoda</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            title={product.title}
            slug={product.slug.current}
            description={product.description}
            pricePerKg={product.pricePerKg}
            primaryImage={product.primaryImage}
            secondaryImage={product.secondaryImage}
          />
        ))}
      </div>
    </div>
  )
}
