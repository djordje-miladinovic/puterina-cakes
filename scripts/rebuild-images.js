/**
 * rebuild-images.js — V4 F2 asset talas (#41 pun kvalitet slika)
 *
 * Regeneriše sve public/images/** slike IZ ORIGINALA (C:/Puterina/Slike)
 * na max 2560px duža strana (hero 3200px), JPEG q92, lanczos3 + 4:4:4.
 *
 * Izvor za svaki public fajl bira se DETERMINISTIČKI:
 *   1. eksplicitna istorijska mapa (HINTS) — kandidat br. 1
 *   2. piksel-diff verifikacija: postojeći public fajl (downscale istog
 *      originala) poredi se sa SVIM kandidatima u izvornom folderu preko
 *      64×64 greyscale apsolutne razlike — bira se najmanja razlika.
 *   Ako hint ≠ diff-pobednik, pobednik je diff (public fajl je istina o
 *   trenutnom rasporedu — npr. swap 2/3 kod krofnica, zadatak #47).
 *
 * Pokretanje: node scripts/rebuild-images.js [--dry]
 */

const sharp = require("sharp")
const fs = require("fs")
const path = require("path")

// KLJUČNO na Windows-u: libvips cache drži otvorene file descriptore
// pročitanih fajlova → open-for-write na istoj putanji pada (sharing
// violation, errno -4094). Gasimo fd cache.
sharp.cache(false)

const SRC = "C:/Puterina/Slike"
const PUB = path.join(__dirname, "..", "public", "images")
const DRY = process.argv.includes("--dry")

const T = "Puterina torte"
const K = "Krofnice"

/** slug → izvorni folder(i) sa kandidatima (relativno od SRC) */
const PRODUCT_FOLDERS = {
  "pistac-malina": [`${T}/Pistac malina`],
  "kokos-vanila-malina": [`${T}/Kokos vanila malina`],
  "lesnik-grli-cokoladu-i-malinu": [`${T}/Lesnik grli cokoladu i malinu`],
  "lesnikova-pralina-sa-malinom": [`${T}/Lesnikova pralina sa malinom`],
  "cokoladna-fantazija": [`${T}/Cokoladna fantazija`],
  // 2.jpg istorijski dolazi iz Pistac malina/torta-40 — dodat kao kandidat
  "cokoladna-jagoda": [`${T}/Cokoladna jagoda`, `${T}/Pistac malina`],
  "letnja-torta": [`${T}/Letnja torta`],
  "bela-makova-fantazija": [`${T}/Bela makova fantazija`],
  "limun-tart": [`${K}/Limun tart`, K], // + root krofnice-95
  "tart-cokolada-slana-karamela": [`${K}/Tart cokolada i slana karamela`],
  "mini-pavlova": [`${K}/Mini pavlova`],
  "susu-coko-malina": [`${K}/Susu - coko malina`],
  "susu-cokolada": [`${K}/Susu - cokolada`],
  "susu-lesnik": [`${K}/Susu - lesnik`],
  "susu-pistac": [`${K}/Susu - pistac`],
  "susu-pistac-malina": [`${K}/Susu - pistac malina`],
  "susu-vanila": [`${K}/Susu - vanila`],
}

/** Istorijska mapa (hint) — public putanja → izvor relativno od SRC */
const HINTS = {
  "products/pistac-malina/1.jpg": `${T}/Pistac malina/Puterina torta-46.jpg`,
  "products/pistac-malina/2.jpg": `${T}/Pistac malina/Puterina torta-41.jpg`,
  "products/pistac-malina/3.jpg": `${T}/Pistac malina/Puterina torta-1.jpg`,
  "products/pistac-malina/4.jpg": `${T}/Pistac malina/Puterina torta-39.jpg`,
  "products/pistac-malina/5.jpg": `${T}/Pistac malina/Puterina torta-3.jpg`,
  "products/kokos-vanila-malina/2.jpg": `${T}/Kokos vanila malina/Puterina torta-120.jpg`,
  "products/cokoladna-jagoda/2.jpg": `${T}/Pistac malina/Puterina torta-40.jpg`,
  "products/susu-vanila/3.jpg": `${K}/Susu - vanila/Puterina krofnice-3.jpg`,
  // site/*
  "site/hero.jpg": `${T}/Puterina torta-16.jpg`,
  "site/prica.jpg": `${T}/Puterina torta-35.jpg`,
  "site/dvostruki-presek.jpg": `${T}/Puterina torta-100.jpg`,
  "site/zute-viole.jpg": `${T}/Puterina torta-91.jpg`,
  "site/anturijum-1.jpg": `${T}/Puterina torta-15.jpg`,
  "site/anturijum-2.jpg": `${T}/Puterina torta-14.jpg`,
  "site/til-u-letu.jpg": `${T}/Puterina torta-31.jpg`,
  "site/roze-karanfil.jpg": `${T}/Puterina torta-32.jpg`,
  "site/krofnice-hero.jpg": `${K}/Puterina krofnice-15.jpg`,
  "site/limun-tart-packshot.jpg": `${K}/Puterina krofnice-95.jpg`,
}

/** site/* kandidati: loose fajlovi u rootu Torte + Krofnice foldera */
function siteCandidates() {
  const out = []
  for (const dir of [T, K]) {
    for (const f of fs.readdirSync(path.join(SRC, dir))) {
      if (f.toLowerCase().endsWith(".jpg")) out.push(`${dir}/${f}`)
    }
  }
  return out
}

function folderCandidates(rels) {
  const out = []
  for (const rel of rels) {
    for (const f of fs.readdirSync(path.join(SRC, rel))) {
      if (f.toLowerCase().endsWith(".jpg")) out.push(`${rel}/${f}`)
    }
  }
  return out
}

const SIG = 64
const sigCache = new Map()
async function signature(absPath) {
  if (sigCache.has(absPath)) return sigCache.get(absPath)
  // Buffer umesto putanje — sharp ne sme da drži fd na public fajlu
  const img = sharp(fs.readFileSync(absPath)).rotate() // EXIF auto-orijentacija
  const meta = await img.metadata()
  const w = meta.autoOrient ? meta.autoOrient.width : meta.width
  const h = meta.autoOrient ? meta.autoOrient.height : meta.height
  const data = await img
    .resize(SIG, SIG, { fit: "fill" })
    .greyscale()
    .raw()
    .toBuffer()
  const sig = { data, aspect: w / h, w, h }
  sigCache.set(absPath, sig)
  return sig
}

function meanAbsDiff(a, b) {
  let sum = 0
  for (let i = 0; i < a.length; i++) sum += Math.abs(a[i] - b[i])
  return sum / a.length
}

async function findSource(pubRel, candidates) {
  const pubAbs = path.join(PUB, pubRel)
  const pubSig = await signature(pubAbs)
  const scored = []
  for (const cand of candidates) {
    const candSig = await signature(path.join(SRC, cand))
    // aspekt filter — public su čisti downscale originala (bez crop-a)
    if (Math.abs(candSig.aspect - pubSig.aspect) / pubSig.aspect > 0.05) continue
    scored.push({ cand, diff: meanAbsDiff(pubSig.data, candSig.data) })
  }
  scored.sort((x, y) => x.diff - y.diff)
  return scored
}

/** Windows: AV/indexer ume kratko da zaključa fajl — retry sa pauzom */
async function writeWithRetry(file, buf, tries = 6) {
  for (let i = 0; i < tries; i++) {
    try {
      fs.writeFileSync(file, buf)
      return
    } catch (e) {
      if (i === tries - 1) throw e
      await new Promise((r) => setTimeout(r, 400 * (i + 1)))
    }
  }
}

async function exportImage(srcRel, pubRel, maxSide) {
  const srcAbs = path.join(SRC, srcRel)
  const pubAbs = path.join(PUB, pubRel)
  const img = sharp(srcAbs).rotate()
  const meta = await img.metadata()
  const w = meta.autoOrient ? meta.autoOrient.width : meta.width
  const h = meta.autoOrient ? meta.autoOrient.height : meta.height
  const landscape = w >= h
  // lanczos3 je default kernel — najviši kvalitet downscale-a
  const resized = img.resize(
    landscape
      ? { width: Math.min(maxSide, w) }
      : { height: Math.min(maxSide, h) }
  )
  const buf = await resized
    .jpeg({ quality: 92, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toBuffer()
  if (!DRY) await writeWithRetry(pubAbs, buf)
  const outMeta = await sharp(buf).metadata()
  return { size: buf.length, w: outMeta.width, h: outMeta.height }
}

;(async () => {
  const rows = []
  let totalBytes = 0
  const warnings = []

  async function processOne(pubRel, candidates, maxSide) {
    const scored = await findSource(pubRel, candidates)
    if (scored.length === 0) {
      warnings.push(`${pubRel}: NEMA kandidata (aspekt filter?)`)
      return
    }
    const best = scored[0]
    const second = scored[1]
    const hint = HINTS[pubRel]
    let flag = ""
    if (hint && hint !== best.cand)
      flag += ` [hint je bio ${path.basename(hint)}, diff kaže drugačije]`
    if (second && second.diff - best.diff < 1.5)
      flag += ` [BLIZU: 2. ${path.basename(second.cand)} d=${second.diff.toFixed(1)}]`
    if (best.diff > 6) flag += ` [VISOK diff — proveriti!]`
    if (flag) warnings.push(`${pubRel}:${flag}`)
    const out = await exportImage(best.cand, pubRel, maxSide)
    totalBytes += out.size
    rows.push(
      `${pubRel} ← ${best.cand} (d=${best.diff.toFixed(1)}) → ${out.w}x${out.h}, ${(out.size / 1024 / 1024).toFixed(2)}MB`
    )
  }

  // 1) products/**
  for (const [slug, folders] of Object.entries(PRODUCT_FOLDERS)) {
    const dir = path.join(PUB, "products", slug)
    if (!fs.existsSync(dir)) {
      warnings.push(`Nema public foldera za slug: ${slug}`)
      continue
    }
    const candidates = folderCandidates(folders)
    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".jpg"))
      .sort((a, b) => parseInt(a) - parseInt(b))
    for (const f of files) {
      await processOne(`products/${slug}/${f}`, candidates, 2560)
    }
  }

  // 2) site/*
  const siteCands = siteCandidates()
  const siteFiles = fs
    .readdirSync(path.join(PUB, "site"))
    .filter((f) => f.endsWith(".jpg"))
    .sort()
  for (const f of siteFiles) {
    await processOne(`site/${f}`, siteCands, f === "hero.jpg" ? 3200 : 2560)
  }

  console.log(rows.join("\n"))
  console.log(
    `\nUKUPNO: ${rows.length} slika, ${(totalBytes / 1024 / 1024).toFixed(1)} MB${DRY ? " (DRY RUN — ništa nije pisano)" : ""}`
  )
  if (warnings.length) console.log("\nNAPOMENE:\n" + warnings.join("\n"))
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
