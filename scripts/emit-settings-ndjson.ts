/**
 * Emituje NDJSON singleton dokumenta „Podešavanja sajta" (siteSettings)
 * sa vrednostima iz DEFAULT_SETTINGS (lib/site-settings.ts) za uvoz u Sanity.
 *
 * Pokretanje:  npx tsx scripts/emit-settings-ndjson.ts <izlazni-fajl.ndjson>
 * Zatim:       npx sanity dataset import <izlazni-fajl.ndjson> production --replace
 *
 * Deterministički _id ("siteSettings") → ponovno pokretanje je idempotentno.
 */
import { writeFileSync } from "node:fs"
import { DEFAULT_SETTINGS } from "../lib/site-settings"

const out = process.argv[2]
if (!out) {
  console.error("Nedostaje izlazni fajl: npx tsx scripts/emit-settings-ndjson.ts out.ndjson")
  process.exit(1)
}

const doc = {
  _id: "siteSettings",
  _type: "siteSettings",
  ...DEFAULT_SETTINGS,
}

writeFileSync(out, JSON.stringify(doc) + "\n")
console.log(`Zapisan siteSettings dokument → ${out}`)
