import Image from "next/image"
import Link from "next/link"
import { formatPrice } from "@/lib/utils"
import type { CatalogProduct } from "@/lib/products"

/**
 * Kartica proizvoda (kat-2 mockup): borderless, bez senki — cela je link.
 * Foto 3:4 (hover zoom iz .card-product CSS-a) → [sezonski red] → naziv → cena.
 * „Signature" badge je overlay preko slike; sezona je italic red iznad naziva.
 */
export default function ProductCard({ product }: { product: CatalogProduct }) {
  const cena = product.pricePerKg
    ? `${formatPrice(product.pricePerKg)} RSD / kg`
    : (product.priceNote ?? "cena na upit")

  return (
    <Link href={`/proizvod/${product.slug}`} className="card-product">
      <div className="ph">
        {product.isSignature && <span className="badge">Signature</span>}
        <Image
          src={product.image}
          alt={`${product.title}, glavna fotografija — Puterina, butik torti Beograd`}
          fill
          sizes="(max-width: 860px) 50vw, (max-width: 1280px) 33vw, 390px"
          className="puterina-img object-cover"
        />
      </div>
      {product.seasonal && <div className="sez">✳ {product.seasonal.badge}</div>}
      <h3>{product.title}</h3>
      <div className="cn">{cena}</div>
    </Link>
  )
}
