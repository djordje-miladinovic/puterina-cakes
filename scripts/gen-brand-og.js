/**
 * V4 asset generator — apple-icon, og-home, OG slike proizvoda, brand SVG-ovi.
 * Pokretanje: node scripts/gen-brand-og.js
 * (rebuild-images.js je već vratio fotografije na pun kvalitet 2560/q92.)
 */
const sharp = require("sharp")
const fs = require("fs")
const path = require("path")

const ROOT = path.resolve(__dirname, "..")
const TERRA = "#C68A68"
const CREAM = "#F8F4EB"
const INK = "#423A31"
const CREAM_LT = "#FCF4EA"
const OLIVA = "#6E7043"
const SLIKE = "C:/Puterina/Slike"
const SERIF = "Georgia, 'Times New Roman', 'DejaVu Serif', serif"
const SANS = "'Segoe UI', 'Arial', 'DejaVu Sans', sans-serif"

const P = (...p) => path.join(ROOT, ...p)
const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

// ── Proizvodi (slug, naziv, cena) — za OG trake ──────────────
const PRODUCTS = [
  ["pistac-malina", "Pistać malina", 4200],
  ["kokos-vanila-malina", "Kokos vanila i malina", 3800],
  ["lesnik-grli-cokoladu-i-malinu", "Lešnik grli čokoladu i malinu", 3500],
  ["lesnikova-pralina-sa-malinom", "Lešnikova pralina sa malinom", 4200],
  ["cokoladna-fantazija", "Čokoladna fantazija", 3900],
  ["cokoladna-jagoda", "Čokoladna jagoda", 3900],
  ["letnja-torta", "Letnja torta", 3800],
  ["bela-makova-fantazija", "Bela makova fantazija", 3900],
  ["limun-tart", "Limun tart", null],
  ["tart-cokolada-slana-karamela", "Tart čokolada i slana karamela", null],
  ["mini-pavlova", "Mini pavlova", null],
  ["susu-pistac-malina", "Šu-šu krofnica — pistać malina", null],
  ["susu-pistac", "Šu-šu krofnica — pistać", null],
  ["susu-cokolada", "Šu-šu krofnica — čokolada", null],
  ["susu-coko-malina", "Šu-šu krofnica — čoko malina", null],
  ["susu-lesnik", "Šu-šu krofnica — lešnik", null],
  ["susu-vanila", "Šu-šu krofnica — vanila", null],
]
const cena = (p) => (p ? `${p.toLocaleString("sr-RS")} RSD/kg` : "cena na upit")

async function main() {
  const rep = []

  // ── 1. apple-icon.png (180) + icon.png (48) iz monograma ──
  const monogramSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="${TERRA}"/><text x="32" y="45.5" text-anchor="middle" font-family="${SERIF}" font-size="40" font-weight="bold" fill="${CREAM_LT}">P</text></svg>`
  await sharp(Buffer.from(monogramSvg)).resize(180, 180).png().toFile(P("app", "apple-icon.png"))
  await sharp(Buffer.from(monogramSvg)).resize(48, 48).png().toFile(P("app", "icon.png"))
  rep.push("app/apple-icon.png (180) + app/icon.png (48)")

  // stari podrazumevani Next favicon.ico — ukloni da icon.svg preuzme
  const favIco = P("app", "favicon.ico")
  if (fs.existsSync(favIco)) {
    fs.unlinkSync(favIco)
    rep.push("app/favicon.ico UKLONJEN (icon.svg je sad primaran)")
  }

  // ── 2. brand SVG-ovi ──
  fs.mkdirSync(P("public", "brand"), { recursive: true })
  const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 200">
  <rect width="520" height="200" fill="none"/>
  <text x="260" y="108" text-anchor="middle" font-family="${SERIF}" font-size="86" fill="${INK}" letter-spacing="1">Puterina</text>
  <text x="260" y="156" text-anchor="middle" font-family="'Brush Script MT','Segoe Script',cursive" font-size="34" fill="${TERRA}" transform="rotate(-2 260 150)">torte sa dušom</text>
</svg>`
  fs.writeFileSync(P("public", "brand", "logo.svg"), logoSvg)
  const monoFile = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle cx="100" cy="100" r="100" fill="${TERRA}"/><text x="100" y="142" text-anchor="middle" font-family="${SERIF}" font-size="124" font-weight="bold" fill="${CREAM_LT}">P</text></svg>`
  fs.writeFileSync(P("public", "brand", "monogram.svg"), monoFile)
  fs.writeFileSync(
    P("public", "brand", "README.md"),
    `# Puterina — brend znak (V4)\n\n- **logo.svg** — wordmark „Puterina" (serif) + rukopisno „torte sa dušom" u terakoti ${TERRA} (F1: a+b hibrid).\n- **monogram.svg** — „P" u terakota krugu; IG avatar, pečat na kutiji.\n- Favicon: app/icon.svg (isti monogram), app/apple-icon.png (180).\n\nBoje: terakota ${TERRA} · espresso ${INK} · krem ${CREAM} · oliva ${OLIVA}.\nFont: Fraunces (wordmark) + Caveat (rukopis) — SVG koristi serif/cursive fallback jer fontovi nisu ugrađeni u fajl.\n`
  )
  rep.push("public/brand/{logo.svg, monogram.svg, README.md}")

  // ── 3. OG naslovna (1200×630) — torta-1 + krem gradijent + wordmark ──
  // torta-1 (landscape naked pistać) — pun kvalitet je već u galeriji pistaća (3.jpg)
  const heroSrc = P("public", "images", "products", "pistac-malina", "3.jpg")
  const ogHomeOverlay = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs><linearGradient id="g" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="${CREAM}" stop-opacity="0.96"/>
      <stop offset="0.42" stop-color="${CREAM}" stop-opacity="0.0"/>
    </linearGradient></defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <text x="70" y="536" font-family="${SERIF}" font-size="76" fill="${INK}">Puterina</text>
    <text x="74" y="580" font-family="${SANS}" font-size="24" letter-spacing="3" fill="${INK}" opacity="0.85">BUTIK TORTI · BEOGRAD</text>
  </svg>`
  await sharp(heroSrc)
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .composite([{ input: Buffer.from(ogHomeOverlay), top: 0, left: 0 }])
    .jpeg({ quality: 88 })
    .toFile(P("public", "og-home.jpg"))
  rep.push("public/og-home.jpg (1200×630, torta-1 + wordmark)")

  // ── 4. OG po proizvodu (1200×630) — foto cover + traka dole ──
  fs.mkdirSync(P("public", "og"), { recursive: true })
  for (const [slug, title, price] of PRODUCTS) {
    const src = P("public", "images", "products", slug, "1.jpg")
    if (!fs.existsSync(src)) {
      rep.push(`⚠ OG preskočen (nema slike): ${slug}`)
      continue
    }
    const line = `Puterina · ${title} · ${cena(price)}`
    const barH = 92
    const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
      <rect x="0" y="${630 - barH}" width="1200" height="${barH}" fill="${CREAM}" opacity="0.94"/>
      <text x="60" y="${630 - barH / 2 + 11}" font-family="${SERIF}" font-size="33" fill="${INK}">${esc(line)}</text>
    </svg>`
    await sharp(src)
      .resize(1200, 630, { fit: "cover", position: "attention" })
      .composite([{ input: Buffer.from(overlay), top: 0, left: 0 }])
      .jpeg({ quality: 86 })
      .toFile(P("public", "og", `${slug}.jpg`))
  }
  rep.push(`public/og/*.jpg — ${PRODUCTS.length} kartica proizvoda`)

  console.log("GOTOVO:\n- " + rep.join("\n- "))
}
main().catch((e) => {
  console.error(e)
  process.exit(1)
})
