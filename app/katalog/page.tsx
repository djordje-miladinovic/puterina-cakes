import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Katalog Proizvoda",
  description: "Pregledajte našu kompletnu ponudu torti i kolača",
}

// Mock products for demonstration
// TODO: Replace with Sanity query by:
// 1. Uncommenting and using: const products = await client.fetch(`*[_type == "product"]`)
// 2. Removing the mockProducts array below
const products = [
  {
    _id: "1",
    title: "Čokoladna torta",
    slug: { current: "cokoladna-torta" },
    pricePerKg: 2500,
    description: "Bogata čokoladna torta sa višeslojnom kremom",
  },
  {
    _id: "2",
    title: "Vocna torta",
    slug: { current: "vocna-torta" },
    pricePerKg: 2300,
    description: "Osvežavajuća torta sa sezonskim voćem",
  },
]

export default async function KatalogPage() {
  // TODO: Replace with actual Sanity query
  // const products = await client.fetch(`*[_type == "product"]`)

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Katalog Proizvoda</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/proizvod/${product.slug.current}`}
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-muted-foreground mb-4">{product.description}</p>
            <p className="text-lg font-bold">{product.pricePerKg} RSD/kg</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
