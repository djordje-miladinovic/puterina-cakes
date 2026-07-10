/**
 * rebuild-images.js — V5 (2026-07-10, novi foto fond)
 *
 * IZVOR ISTINE: C:/Puterina/Slike nove - sortirane
 *   · svaki proizvod ima svoj folder; redosled slika u folderu
 *     (po datumu snimanja) = redosled galerije; 1. slika = glavna
 *   · folderi KROFNICE 1–6 = i redosled krofnica u katalogu
 *   · LEPE ZA SAJT → naslovna; pulovi „Puterina torte"/„Krofnice" → ostalo
 *   · mini-pavlova nema svoj folder → ručni izbor iz pula (Đorđe 2026-07-10)
 *
 * Mapa je EKSPLICITNA — bez diff heuristike. Stari fond
 * („Slike - staro - ne gledaj") se NE koristi.
 *
 * Izlaz: max 2560px duža strana (hero 3200px), JPEG q92, lanczos3, 4:4:4.
 * OG slike: 1200×630 crop iz glavne slike proizvoda, q85.
 *
 * Pokretanje: node scripts/rebuild-images.js [--dry]
 */

const sharp = require("sharp")
const fs = require("fs")
const path = require("path")

sharp.cache(false)

const SRC = "C:/Puterina/Slike nove - sortirane"
const PUB = path.join(__dirname, "..", "public")
const DRY = process.argv.includes("--dry")

const T = "Puterina torte"
const K = "Krofnice"

/** Folderi u izvoru imaju non-breaking space (U+00A0) u imenima —
 *  tražimo po normalizovanom imenu. */
function findDir(wanted) {
  const want = wanted.replace(/\s+/g, " ").trim()
  for (const dd of fs.readdirSync(SRC)) {
    const norm = dd.replace(/ /g, " ").replace(/\s+/g, " ").trim()
    if (norm === want) return path.join(SRC, dd)
  }
  throw new Error(`Nema izvornog foldera: ${wanted}`)
}
const F = (dir, file) => path.join(findDir(dir), file)

/** slug → uređena lista izvornih slika (1.jpg, 2.jpg, …) */
const PRODUCTS = {
  // TORTE — 1 = celo, 2 = presek/parče
  "pistac-malina": [F("PISTAĆ MALINA", "Puterina-13.jpg"), F("PISTAĆ MALINA", "Puterina-38.jpg")],
  "kokos-vanila-malina": [F("KOKOS VANILA MALINA", "Puterina torta-107.jpg"), F("KOKOS VANILA MALINA", "Puterina torta-120.jpg")],
  "lesnik-grli-cokoladu-i-malinu": [F("LEŠNIK GRLI Č i M", "Puterina torta-156.jpg"), F("LEŠNIK GRLI Č i M", "Puterina torta-163.jpg")],
  // pralina: 111 (rođendanska, snimljena PRE) je glavna — potvrđeno
  // folderom „pregled sajta prve ftke za torte jedna do druge"
  "lesnikova-pralina-sa-malinom": [F("LEŠNIKOVA PRALINA", "Puterina torta-111.jpg"), F("LEŠNIKOVA PRALINA", "Puterina torta-101.jpg")],
  "cokoladna-fantazija": [F("PLAVI ZEKA ČOKOLADNA FANTAZIJA", "Puterina torta-115.jpg"), F("PLAVI ZEKA ČOKOLADNA FANTAZIJA", "Puterina torta-117.jpg")],
  "cokoladna-jagoda": [F("ČOKO JAGODA", "Puterina-29.jpg"), F("ČOKO JAGODA", "Puterina-36.jpg")],
  "letnja-torta": [F("LETNJA", "Puterina torta-127.jpg"), F("LETNJA", "Puterina torta-133.jpg")],
  "bela-makova-fantazija": [F("MAK", "Puterina torta-140.jpg"), F("MAK", "Puterina torta-144.jpg")],
  // KOLAČI
  "limun-tart": [F("LIMUN TART", "Puterina krofnice-39.jpg"), F("LIMUN TART", "Puterina krofnice-42.jpg"), F("LIMUN TART", "Puterina krofnice-44.jpg")],
  "tart-cokolada-slana-karamela": [F("KARAMELA TART", "Puterina kolači -61.jpg"), F("KARAMELA TART", "Puterina krofnice-80nova.jpg"), F("KARAMELA TART", "Puterina krofnice-85.jpg")],
  "mini-pavlova": [F(T, "Puterina torta-63.jpg"), F(T, "Puterina torta-56.jpg"), F(T, "Puterina torta-71.jpg"), F(T, "Puterina torta-73.jpg")],
  // KROFNICE — folderi 1–6; 3. slika = presek
  "susu-pistac-malina": [F("KROFNICE 1", "Puterina krofnice-6.jpg"), F("KROFNICE 1", "Puterina krofnice-9.jpg"), F("KROFNICE 1", "Puterina krofnice-22.jpg")],
  "susu-lesnik": [F("KROFNICE 2", "Puterina krofnice-8.jpg"), F("KROFNICE 2", "Puterina krofnice-14.jpg"), F("KROFNICE 2", "Puterina krofnice-19.jpg")],
  "susu-pistac": [F("KROFNICE 3", "Puterina krofnice-7.jpg"), F("KROFNICE 3", "Puterina krofnice-11.jpg"), F("KROFNICE 3", "Puterina krofnice-24.jpg")],
  "susu-vanila": [F("KROFNICE 4", "Puterina krofnice-3.jpg"), F("KROFNICE 4", "Puterina krofnice-13.jpg"), F("KROFNICE 4", "Puterina krofnice-20.jpg")],
  "susu-coko-malina": [F("KROFNICE 5", "Puterina krofnice-5.jpg"), F("KROFNICE 5", "Puterina krofnice-10.jpg"), F("KROFNICE 5", "Puterina krofnice-21.jpg")],
  "susu-cokolada": [F("KROFNICE 6", "Puterina krofnice-4.jpg"), F("KROFNICE 6", "Puterina krofnice-12.jpg"), F("KROFNICE 6", "Puterina krofnice-23.jpg")],
}

/** site/* — naslovna (LEPE ZA SAJT) + izbor iz pulova */
const SITE = {
  "hero.jpg": [F("LEPE ZA SAJT", "Puterina-24.jpg"), 3200],
  "prica.jpg": [F("LEPE ZA SAJT", "Puterina-10.jpg"), 2560],
  "ruke-bela-torta.jpg": [F("LEPE ZA SAJT", "Puterina-26.jpg"), 2560],
  "zlatni-escajg.jpg": [F("LEPE ZA SAJT", "Puterina-41.jpg"), 2560],
  "krofnice-kasika.jpg": [F("LEPE ZA SAJT", "Puterina krofnice-18.jpg"), 2560],
  "anturijum.jpg": [F(T, "Puterina torta-14.jpg"), 2560],
  "zute-viole.jpg": [F(T, "Puterina torta-91.jpg"), 2560],
  "coko-tart-rez.jpg": [F(K, "Puterina krofnice-73.jpg"), 2560],
}

async function exportImage(srcAbs, outAbs, maxSide) {
  const img = sharp(srcAbs).rotate()
  const meta = await img.metadata()
  const w = meta.autoOrient ? meta.autoOrient.width : meta.width
  const h = meta.autoOrient ? meta.autoOrient.height : meta.height
  const landscape = w >= h
  const buf = await img
    .resize(landscape ? { width: Math.min(maxSide, w) } : { height: Math.min(maxSide, h) })
    .jpeg({ quality: 92, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toBuffer()
  if (!DRY) fs.writeFileSync(outAbs, buf)
  return buf.length
}

async function exportOg(srcAbs, outAbs) {
  const buf = await sharp(srcAbs)
    .rotate()
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .jpeg({ quality: 85, mozjpeg: true })
    .toBuffer()
  if (!DRY) fs.writeFileSync(outAbs, buf)
  return buf.length
}

;(async () => {
  let total = 0
  for (const [slug, files] of Object.entries(PRODUCTS)) {
    const dir = path.join(PUB, "images", "products", slug)
    if (!DRY) fs.mkdirSync(dir, { recursive: true })
    // očisti višak starih fajlova (npr. 4.jpg/5.jpg iz prošlog fonda)
    if (!DRY && fs.existsSync(dir)) {
      for (const f of fs.readdirSync(dir)) {
        const n = parseInt(f)
        if (f.endsWith(".jpg") && (isNaN(n) || n > files.length)) fs.rmSync(path.join(dir, f))
      }
    }
    for (let i = 0; i < files.length; i++) {
      const b = await exportImage(files[i], path.join(dir, `${i + 1}.jpg`), 2560)
      total += b
      console.log(`products/${slug}/${i + 1}.jpg ← ${path.basename(files[i])} (${(b / 1e6).toFixed(2)}MB)`)
    }
    const bo = await exportOg(files[0], path.join(PUB, "og", `${slug}.jpg`))
    console.log(`og/${slug}.jpg (${(bo / 1e6).toFixed(2)}MB)`)
  }
  for (const [name, [src, maxSide]] of Object.entries(SITE)) {
    const b = await exportImage(src, path.join(PUB, "images", "site", name), maxSide)
    total += b
    console.log(`site/${name} ← ${path.basename(src)} (${(b / 1e6).toFixed(2)}MB)`)
  }
  console.log(`\nUKUPNO ${(total / 1e6).toFixed(1)} MB${DRY ? " (DRY)" : ""}`)
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
