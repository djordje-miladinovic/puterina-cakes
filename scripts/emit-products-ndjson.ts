/**
 * Emituje NDJSON pravih proizvoda iz lib/products-data.ts za uvoz u Sanity.
 * Pokretanje:  npx tsx scripts/emit-products-ndjson.ts <izlazni-fajl.ndjson>
 * Zatim:       npx sanity dataset import <izlazni-fajl.ndjson> production --replace
 *              (NDJSON ide kroz `dataset import`, NE `documents create` —
 *              ovaj drugi očekuje jedan JSON dokument i pada na 2. liniji)
 *
 * Slike ostaju putanje u /public (imagePath/crossSectionPath/gallery).
 * Deterministički _id (`product-<slug>`) → ponovno pokretanje je idempotentno.
 */
import { writeFileSync } from "node:fs"
import { PRODUCTS } from "../lib/products-data"

const out = process.argv[2]
if (!out) {
  console.error("Nedostaje izlazni fajl: npx tsx scripts/emit-products-ndjson.ts out.ndjson")
  process.exit(1)
}

const docs = PRODUCTS.map((p, i) => ({
  _id: `product-${p.slug}`,
  _type: "product",
  title: p.title,
  slug: { _type: "slug", current: p.slug },
  category: p.category,
  isSignature: p.isSignature,
  order: i + 1,
  ...(p.pricePerKg != null ? { pricePerKg: p.pricePerKg } : {}),
  ...(p.priceNote ? { priceNote: p.priceNote } : {}),
  ...(p.seasonal ? { seasonal: { badge: p.seasonal.badge, note: p.seasonal.note } } : {}),
  flavors: p.flavors,
  shortDescription: p.shortDescription,
  description: p.description,
  layers: p.layers,
  ...(p.ingredientsShort ? { ingredientsShort: p.ingredientsShort } : {}),
  imagePath: p.image,
  crossSectionPath: p.crossSectionImage,
  gallery: p.gallery,
  ...(p.declaration
    ? {
        declaration: {
          officialName: p.declaration.officialName,
          sastojci: p.declaration.sastojci,
          alergeni: p.declaration.alergeni,
          cuvanje: p.declaration.cuvanje,
          rok: p.declaration.rok,
          netoMasa: p.declaration.netoMasa,
          // Sanity zahteva _key za nizove objekata
          nutritivno: p.declaration.nutritivno.map((n, j) => ({
            _key: `nutr${j}`,
            label: n.label,
            value: n.value,
          })),
          proizvodjac: p.declaration.proizvodjac,
        },
      }
    : {}),
}))

writeFileSync(out, docs.map((d) => JSON.stringify(d)).join("\n") + "\n")
console.log(`Zapisano ${docs.length} proizvoda → ${out}`)
