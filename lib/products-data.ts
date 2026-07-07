// ============================================================
// PRAVI PODACI PROIZVODA — V3 (2026-07-05)
// Izvori istine:
//  · cene: V3-CENOVNIK-I-PROIZVODI.md (IG „Cenovnik" highlight,
//    potvrđeno Katarininom sveskom #8) — cene se retko menjaju
//  · deklaracije: C:/Puterina/Deklaracije.txt (pravopis očišćen,
//    sadržaj sastojaka/alergena NETAKNUT — autor: Katarina)
//  · slike: kanonsko pravilo — sortirani folderi → galerija
//    proizvoda; loose root → landing/ostale strane
//  · opisi: napisani u Katarininom glasu (V3-COPY voice bible;
//    njena IG imena torti su gotov copy — ne prevoditi u generičko)
// NAPOMENA: proizvodi BEZ deklaracije (declaration: null) prikazuju
// kratke sastojke + „puna deklaracija dostupna na upit" — NIKAD
// izvedene alergene kao činjenicu.
// ============================================================

export type Category = "torte" | "kolaci" | "krofnice"

export type FlavorKey = "cokolada" | "voce" | "orasasto" | "vanila-krem"

export const FLAVOR_LABELS: Record<FlavorKey, string> = {
  cokolada: "Čokolada",
  voce: "Voće",
  orasasto: "Orašasto",
  "vanila-krem": "Vanila i krem",
}

export const CATEGORY_LABELS: Record<Category, string> = {
  torte: "Torte",
  kolaci: "Kolači",
  krofnice: "Krofnice",
}

export interface NutritionRow {
  /** npr. "Energetska vrednost" */
  label: string
  /** npr. "524,31 kcal" */
  value: string
}

export interface Declaration {
  /** Zvanični naziv proizvoda sa deklaracije (može se razlikovati od imena na sajtu) */
  officialName: string
  sastojci: string
  /** Lista alergena kako stoji na deklaraciji */
  alergeni: string
  cuvanje: string
  rok: string
  netoMasa: string
  /** Prosečne nutritivne vrednosti na 100 g */
  nutritivno: NutritionRow[]
  proizvodjac: string
}

export interface SeasonalInfo {
  /** Badge na kartici, npr. "sada u sezoni · jagode" */
  badge: string
  /** Rečenica na strani proizvoda */
  note: string
}

export interface ProductData {
  slug: string
  title: string
  category: Category
  isSignature: boolean
  /** RSD po kg; null = cena na upit */
  pricePerKg: number | null
  /** Napomena uz cenu (npr. za Lux kolače ili "na upit") */
  priceNote?: string
  seasonal?: SeasonalInfo
  flavors: FlavorKey[]
  /** Podnaslov — činjenica u ~5 reči (naslov nosi poeziju) */
  shortDescription: string
  /** Opis u njenom glasu, za stranu proizvoda */
  description: string
  /** "Slojevi:" lista u accordion Opisu */
  layers: string[]
  /** Kratki sastojci za proizvode bez deklaracije */
  ingredientsShort?: string
  image: string
  crossSectionImage: string
  gallery: string[]
  declaration: Declaration | null
}

const PROIZVODJAC = "Puterina, Beograd, Katarina Miladinović · 065 37 993 34"
const CUVANJE = "Čuvati na temperaturi do +5 °C."
const ROK = "7 dana od datuma proizvodnje."

const img = (slug: string, n: number) => `/images/products/${slug}/${n}.jpg`
const gal = (slug: string, count: number) =>
  Array.from({ length: count }, (_, i) => img(slug, i + 1))

// ============================================================
// TORTE
// ============================================================

export const PRODUCTS: ProductData[] = [
  {
    slug: "pistac-malina",
    title: "Pistać malina",
    category: "torte",
    isSignature: true,
    pricePerKg: 4200,
    flavors: ["orasasto", "voce"],
    shortDescription: "Pistać, bela čokolada, sveže maline.",
    description:
      "Hrskavi pistać. Svilenkasti krem od bele čokolade. Srce od svežih malina. Torta po kojoj me pamte.",
    layers: [
      "vanila biskvit sa mlevenim pistaćima",
      "hrskavi sloj pistaća",
      "krem od bele čokolade i putera",
      "sveže maline",
    ],
    image: img("pistac-malina", 1),
    crossSectionImage: img("pistac-malina", 2),
    gallery: gal("pistac-malina", 5),
    declaration: {
      officialName: "Pistać nežnica",
      sastojci:
        "jaja, brašno, šećer, slatka pavlaka, puter, mleko, bela čokolada, kukuruzni skrob, seme vanile, malina, sirovi pistać",
      alergeni: "jaja, sirovi pistać, sojin lecitin, laktoza, gluten, bobičasto voće",
      cuvanje: CUVANJE,
      rok: ROK,
      netoMasa: "3 kg ±2%",
      nutritivno: [
        { label: "Energetska vrednost", value: "524,31 kcal" },
        { label: "Ugljeni hidrati", value: "44,02 g (176,08 kcal)" },
        { label: "Masti", value: "37,49 g (337,41 kcal)" },
        { label: "Proteini", value: "10,82 g (43,28 kcal)" },
      ],
      proizvodjac: PROIZVODJAC,
    },
  },
  {
    slug: "kokos-vanila-malina",
    title: "Kokos vanila i malina",
    category: "torte",
    isSignature: true,
    pricePerKg: 3800,
    flavors: ["vanila-krem", "voce"],
    shortDescription: "Kokos, Burbon vanila, sveže maline.",
    description:
      "Nežni kokos, prava Burbon vanila i maline koje se tope. Ukus koji najčešće putuje iz moje radionice.",
    layers: [
      "kokos biskvit",
      "krem od prave Burbon vanile",
      "sveže maline",
      "svilenkasti puter krem",
    ],
    ingredientsShort: "kokos, Burbon vanila, malina, puter, bela čokolada",
    image: img("kokos-vanila-malina", 1),
    crossSectionImage: img("kokos-vanila-malina", 2),
    gallery: gal("kokos-vanila-malina", 4),
    declaration: null,
  },
  {
    slug: "lesnik-grli-cokoladu-i-malinu",
    title: "Lešnik grli čokoladu i malinu",
    category: "torte",
    isSignature: false,
    pricePerKg: 3500,
    flavors: ["orasasto", "cokolada", "voce"],
    shortDescription: "Lešnik, mlečna čokolada, malina i borovnica.",
    description:
      "Ime kaže sve: lešnik kore, čokoladni krem — i maline sa borovnicama u sredini. Zagrljaj koji se seče nožem.",
    layers: [
      "lešnik kore",
      "krem od mlečne čokolade i putera",
      "maline i borovnice",
    ],
    image: img("lesnik-grli-cokoladu-i-malinu", 1),
    crossSectionImage: img("lesnik-grli-cokoladu-i-malinu", 2),
    gallery: gal("lesnik-grli-cokoladu-i-malinu", 5),
    declaration: {
      officialName: "Lešnik grli čokoladu i malinu",
      sastojci:
        "jaja, brašno, lešnik, mlečna čokolada, kakao, slatka pavlaka, puter, mleko, kukuruzni skrob, seme vanile, malina, borovnica",
      alergeni: "jaja, lešnik, sojin lecitin, laktoza, gluten, bobičasto voće",
      cuvanje: CUVANJE,
      rok: ROK,
      netoMasa: "3 kg ±2%",
      nutritivno: [
        { label: "Energetska vrednost", value: "473,73 kcal" },
        { label: "Ugljeni hidrati", value: "34,62 g (138,48 kcal)" },
        { label: "Masti", value: "37,25 g (335,25 kcal)" },
        { label: "Proteini", value: "6,25 g (25 kcal)" },
      ],
      proizvodjac: PROIZVODJAC,
    },
  },
  {
    slug: "lesnikova-pralina-sa-malinom",
    title: "Lešnikova pralina sa malinom",
    category: "torte",
    isSignature: false,
    pricePerKg: 4200,
    flavors: ["orasasto", "cokolada", "voce"],
    shortDescription: "Pečeni lešnik, mlečna čokolada, maskarpone, malina.",
    description:
      "Duboka pralina od pečenog lešnika i mlečne čokolade, kap amareta i sveža malina da preseče slast. Za one koji vole punije ukuse.",
    layers: [
      "kore sa pečenim lešnikom",
      "pralina krem (lešnik i mlečna čokolada)",
      "maskarpone sa kapi amareta",
      "sveže maline",
    ],
    image: img("lesnikova-pralina-sa-malinom", 1),
    crossSectionImage: img("lesnikova-pralina-sa-malinom", 2),
    gallery: gal("lesnikova-pralina-sa-malinom", 5),
    declaration: {
      officialName: "Đanduja-malina",
      sastojci:
        "jaja, brašno, šećer, slatka pavlaka, puter, mleko, bela čokolada, kukuruzni skrob, pečeni lešnik, mlečna čokolada, maskarpone sir, amareto liker, seme vanile, malina",
      alergeni: "jaja, lešnik, sojin lecitin, laktoza, gluten, bobičasto voće",
      cuvanje: CUVANJE,
      rok: ROK,
      netoMasa: "3 kg ±2%",
      nutritivno: [
        { label: "Energetska vrednost", value: "536,3 kcal" },
        { label: "Ugljeni hidrati", value: "40,3 g (161,2 kcal)" },
        { label: "Masti", value: "36,7 g (330,3 kcal)" },
        { label: "Proteini", value: "11,2 g (44,8 kcal)" },
      ],
      proizvodjac: PROIZVODJAC,
    },
  },
  {
    slug: "cokoladna-fantazija",
    title: "Čokoladna fantazija",
    category: "torte",
    isSignature: false,
    pricePerKg: 3900,
    flavors: ["cokolada"],
    shortDescription: "Tri čokolade — crna, mlečna i bela.",
    description:
      "Crna, mlečna i bela čokolada u jednoj torti. Omiljena kod najmlađih slavljenika — i kod onih koji to ne priznaju.",
    layers: [
      "kakao biskvit",
      "krem od crne čokolade (70% kakaa)",
      "krem od mlečne i bele čokolade",
    ],
    image: img("cokoladna-fantazija", 1),
    crossSectionImage: img("cokoladna-fantazija", 2),
    gallery: gal("cokoladna-fantazija", 2),
    declaration: {
      officialName: "Čokoladna fantazija",
      sastojci:
        "jaja, brašno, šećer, crna čokolada (70% kakaa), mlečna čokolada, bela čokolada, kakao, slatka pavlaka, puter, mleko, kukuruzni skrob, seme vanile",
      alergeni: "jaja, lešnik, sojin lecitin, laktoza, gluten",
      cuvanje: CUVANJE,
      rok: ROK,
      netoMasa: "2 kg ±2%",
      nutritivno: [
        { label: "Energetska vrednost", value: "611,81 kcal" },
        { label: "Ugljeni hidrati", value: "46,60 g (186,4 kcal)" },
        { label: "Masti", value: "44,65 g (401,85 kcal)" },
        { label: "Proteini", value: "5,89 g (23,56 kcal)" },
      ],
      proizvodjac: PROIZVODJAC,
    },
  },
  {
    slug: "cokoladna-jagoda",
    title: "Čokoladna jagoda",
    category: "torte",
    isSignature: false,
    pricePerKg: 3900,
    seasonal: {
      badge: "sada u sezoni · jagode",
      note: "Jagode su ovde od maja do jula. Posle toga — sledećeg leta, ne pre.",
    },
    flavors: ["cokolada", "voce"],
    shortDescription: "Čokoladne kore, čoko krem, sveže jagode.",
    description:
      "Duboka čokolada i sveže jagode iz sezone — jedna drugoj čuvaju leđa. Pravim je dok jagode traju.",
    layers: ["čokoladne kore", "čokoladni krem", "sveže jagode"],
    ingredientsShort: "crna čokolada, kakao, sveže jagode, puter, slatka pavlaka",
    image: img("cokoladna-jagoda", 1),
    crossSectionImage: img("cokoladna-jagoda", 2),
    gallery: gal("cokoladna-jagoda", 5),
    declaration: null,
  },
  {
    slug: "letnja-torta",
    title: "Letnja torta",
    category: "torte",
    isSignature: false,
    pricePerKg: 3800,
    seasonal: {
      badge: "sada u sezoni · leto",
      note: "Leto na tanjiru — pravim je dok traje sezona letnjeg voća.",
    },
    flavors: ["voce", "vanila-krem", "orasasto"],
    shortDescription: "Lešnik, vanila krem, letnje voće.",
    description:
      "Vanila krem, mlečna čokolada i letnje voće koje se menja s pijacom. Leto na tanjiru — dok traje.",
    layers: [
      "lešnik kore",
      "krem od vanile",
      "krem od mlečne čokolade",
      "letnje voće iz sezone",
    ],
    image: img("letnja-torta", 1),
    crossSectionImage: img("letnja-torta", 2),
    gallery: gal("letnja-torta", 3),
    declaration: {
      officialName: "Letnja torta",
      sastojci:
        "jaja, brašno, lešnik, mlečna čokolada, kakao, slatka pavlaka, puter, mleko, kukuruzni skrob, seme vanile, malina, borovnica",
      alergeni: "jaja, lešnik, sojin lecitin, laktoza, gluten, bobičasto voće",
      cuvanje: CUVANJE,
      rok: ROK,
      netoMasa: "3 kg ±2%",
      nutritivno: [
        { label: "Energetska vrednost", value: "473,73 kcal" },
        { label: "Ugljeni hidrati", value: "34,62 g (138,48 kcal)" },
        { label: "Masti", value: "37,25 g (335,25 kcal)" },
        { label: "Proteini", value: "6,25 g (25 kcal)" },
      ],
      proizvodjac: PROIZVODJAC,
    },
  },
  {
    slug: "bela-makova-fantazija",
    title: "Bela makova fantazija",
    category: "torte",
    isSignature: false,
    pricePerKg: 3900,
    flavors: ["vanila-krem", "voce"],
    shortDescription: "Mak, bela čokolada, kupina, limun.",
    description:
      "Crne makove kore, svilenkasti krem od bele čokolade i maskarponea, fil od kupine i list svežeg bosiljka. Najneobičnija torta koju pravim — i najčešće iznenađenje.",
    layers: [
      "makove kore",
      "krem od bele čokolade i maskarponea",
      "fil od kupine",
      "limun i svež bosiljak",
    ],
    image: img("bela-makova-fantazija", 1),
    crossSectionImage: img("bela-makova-fantazija", 2),
    gallery: gal("bela-makova-fantazija", 2),
    declaration: {
      officialName: "MMK torta",
      sastojci:
        "jaja, šećer, brašno, mak, bela čokolada, slatka pavlaka, maskarpone, puter, mleko, ekstrakt badema, so, prašak za pecivo, sveži bosiljak, kupina, kora limuna, sok od limuna",
      alergeni: "jaja, mak, sojin lecitin, laktoza, gluten, badem, bobičasto voće",
      cuvanje: CUVANJE,
      rok: ROK,
      netoMasa: "4 kg ±2%",
      nutritivno: [
        { label: "Energetska vrednost", value: "519,5 kcal" },
        { label: "Ugljeni hidrati", value: "41,53 g (166,12 kcal)" },
        { label: "Masti", value: "36,59 g (329,31 kcal)" },
      ],
      proizvodjac: PROIZVODJAC,
    },
  },

  // ============================================================
  // KOLAČI (Lux linija — tartovi i pavlove)
  // ============================================================
  {
    slug: "limun-tart",
    title: "Limun tart",
    category: "kolaci",
    isSignature: false,
    pricePerKg: null,
    priceNote: "cena na upit",
    flavors: ["voce", "vanila-krem"],
    shortDescription: "Hrskavo testo, svež limun krem.",
    description:
      "Vesnik leta — hrskavo testo i limun krem koji zna tačno gde je granica između slatkog i kiselog.",
    layers: ["hrskavo testo", "limun krem"],
    ingredientsShort: "limun, puter, jaja, brašno, šećer",
    image: img("limun-tart", 1),
    crossSectionImage: img("limun-tart", 2),
    gallery: gal("limun-tart", 4),
    declaration: null,
  },
  {
    slug: "tart-cokolada-slana-karamela",
    title: "Tart čokolada i slana karamela",
    category: "kolaci",
    isSignature: false,
    pricePerKg: null,
    priceNote: "cena na upit",
    flavors: ["cokolada"],
    shortDescription: "Tamna čokolada, slana karamela, hrskavo testo.",
    description:
      "Tamna čokolada i slana karamela koja curi dok sečeš. Kolač koji prvi nestane sa stola.",
    layers: ["hrskavo testo", "slana karamela", "ganaš od tamne čokolade"],
    ingredientsShort: "tamna čokolada, karamela, so, puter, slatka pavlaka",
    image: img("tart-cokolada-slana-karamela", 1),
    crossSectionImage: img("tart-cokolada-slana-karamela", 2),
    gallery: gal("tart-cokolada-slana-karamela", 4),
    declaration: null,
  },
  {
    slug: "mini-pavlova",
    title: "Mini pavlova",
    category: "kolaci",
    isSignature: false,
    pricePerKg: null,
    priceNote: "cena na upit",
    flavors: ["vanila-krem", "voce"],
    shortDescription: "Hrskava školjka, šlag, sveže voće.",
    description:
      "Hrskava spolja, mekana iznutra — mali oblaci sa svežim voćem, za velike proslave.",
    layers: ["pusla (beze školjka)", "krem od slatke pavlake", "sveže voće"],
    ingredientsShort: "belanca, šećer, slatka pavlaka, sveže voće",
    image: img("mini-pavlova", 1),
    crossSectionImage: img("mini-pavlova", 2),
    gallery: gal("mini-pavlova", 4),
    declaration: null,
  },

  // ============================================================
  // KROFNICE (Šu-šu — punjene krofnice; #14: naslovi usklađeni sa Sanity-jem,
  // slugovi ostaju "susu-*" — NE menjati)
  // ============================================================
  {
    slug: "susu-pistac-malina",
    title: "Šu-šu krofnica — pistać malina",
    category: "krofnice",
    isSignature: false,
    pricePerKg: null,
    priceNote: "cena na upit",
    flavors: ["orasasto", "voce"],
    shortDescription: "Krofnica punjena pistać kremom i malinom.",
    description:
      "Punjena onim što i signature torta: pistać krem i sveža malina. Samo manje čeka red.",
    layers: ["krofnica", "pistać krem", "malina fil"],
    ingredientsShort: "pistać, malina, puter, brašno, jaja",
    image: img("susu-pistac-malina", 1),
    crossSectionImage: img("susu-pistac-malina", 1),
    gallery: gal("susu-pistac-malina", 3),
    declaration: null,
  },
  {
    slug: "susu-pistac",
    title: "Šu-šu krofnica — pistać",
    category: "krofnice",
    isSignature: false,
    pricePerKg: null,
    priceNote: "cena na upit",
    flavors: ["orasasto"],
    shortDescription: "Krofnica punjena kremom od pistaća.",
    description: "Za one kojima je pistać dovoljan sam sebi — bez ometanja.",
    layers: ["krofnica", "krem od pistaća"],
    ingredientsShort: "pistać, puter, brašno, jaja, mleko",
    image: img("susu-pistac", 1),
    crossSectionImage: img("susu-pistac", 1),
    gallery: gal("susu-pistac", 3),
    declaration: null,
  },
  {
    slug: "susu-cokolada",
    title: "Šu-šu krofnica — čokolada",
    category: "krofnice",
    isSignature: false,
    pricePerKg: null,
    priceNote: "cena na upit",
    flavors: ["cokolada"],
    shortDescription: "Krofnica punjena čokoladnim kremom.",
    description: "Klasik koji ne pita za povod: topao čokoladni krem u mekoj krofnici.",
    layers: ["krofnica", "čokoladni krem"],
    ingredientsShort: "čokolada, puter, brašno, jaja, mleko",
    image: img("susu-cokolada", 1),
    crossSectionImage: img("susu-cokolada", 1),
    gallery: gal("susu-cokolada", 3),
    declaration: null,
  },
  {
    slug: "susu-coko-malina",
    title: "Šu-šu krofnica — čoko malina",
    category: "krofnice",
    isSignature: false,
    pricePerKg: null,
    priceNote: "cena na upit",
    flavors: ["cokolada", "voce"],
    shortDescription: "Krofnica punjena čokoladom i malinom.",
    description: "Čokolada i malina — par koji nikad nije pogrešio. Ni u krofnici.",
    layers: ["krofnica", "čokoladni krem", "malina fil"],
    ingredientsShort: "čokolada, malina, puter, brašno, jaja",
    image: img("susu-coko-malina", 1),
    crossSectionImage: img("susu-coko-malina", 1),
    gallery: gal("susu-coko-malina", 3),
    declaration: null,
  },
  {
    slug: "susu-lesnik",
    title: "Šu-šu krofnica — lešnik",
    category: "krofnice",
    isSignature: false,
    pricePerKg: null,
    priceNote: "cena na upit",
    flavors: ["orasasto"],
    shortDescription: "Krofnica punjena lešnik kremom.",
    description: "Pečeni lešnik u kremu koji miriše na pralinu — mala verzija velikog ukusa.",
    layers: ["krofnica", "lešnik krem"],
    ingredientsShort: "lešnik, čokolada, puter, brašno, jaja",
    image: img("susu-lesnik", 1),
    crossSectionImage: img("susu-lesnik", 1),
    gallery: gal("susu-lesnik", 4),
    declaration: null,
  },
  {
    slug: "susu-vanila",
    title: "Šu-šu krofnica — vanila",
    category: "krofnice",
    isSignature: false,
    pricePerKg: null,
    priceNote: "cena na upit",
    flavors: ["vanila-krem"],
    shortDescription: "Krofnica punjena kremom od vanile.",
    description: "Zagrljaj svilenkaste vanile u najmekšem mogućem obliku.",
    layers: ["krofnica", "krem od Burbon vanile"],
    ingredientsShort: "Burbon vanila, mleko, puter, brašno, jaja",
    image: img("susu-vanila", 1),
    crossSectionImage: img("susu-vanila", 1),
    gallery: gal("susu-vanila", 3),
    declaration: null,
  },
]

// ============================================================
// Pomoćni izvodi
// ============================================================

export const SIGNATURE_PRODUCTS = PRODUCTS.filter((p) => p.isSignature)

export function getProductBySlug(slug: string): ProductData | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

/** Generička izjava za proizvode bez pune deklaracije — NE tvrdi konkretne
 *  alergene; upućuje na upit. Formulacija #33b — POTVRĐENA (topla verzija). */
export const NO_DECLARATION_NOTE =
  "Punu deklaraciju (sastojci, alergeni, nutritivne vrednosti) Vam rado pošaljem — samo pitajte kad se čujemo. U mojoj radionici koriste se gluten, jaja, mleko, soja i orašasti plodovi."

// ============================================================
// UTISCI — SAMO pravi citati (izvor: IG ekosistem, PANEL analiza).
// Dummy utisci iz V2 su uklonjeni — ne smeju na produkciju.
// ============================================================

export interface Testimonial {
  quote: string
  author: string
  context: string
}

export const REAL_TESTIMONIALS: Testimonial[] = [
  {
    quote: "Najlepša mala velika torta na svetu.",
    author: "@muvabezglave",
    context: "objava kupca na Instagramu",
  },
  {
    quote: "Ovo KIDAAAA… morate da probate.",
    author: "@popkafigurice",
    context: "saradnica (figurice za torte), posle probanja",
  },
]

// ============================================================
// „Sa Instagrama" — kuriran izbor (ona bira; do CMS flag-a: statično)
// ============================================================

export interface InstagramPick {
  image: string
  alt: string
  href: string
}

export const INSTAGRAM_PICKS: InstagramPick[] = [
  { image: "/images/site/zute-viole.jpg", alt: "Torta sa žutim violama — Puterina, butik torti Beograd", href: "https://www.instagram.com/puterinacakes/" },
  { image: "/images/site/anturijum-1.jpg", alt: "Bela torta sa anturijumom — Puterina, butik torti Beograd", href: "https://www.instagram.com/puterinacakes/" },
  { image: "/images/site/til-u-letu.jpg", alt: "Torta sa tilom u pokretu — Puterina, butik torti Beograd", href: "https://www.instagram.com/puterinacakes/" },
  { image: "/images/site/roze-karanfil.jpg", alt: "Torta sa roze karanfilom — Puterina, butik torti Beograd", href: "https://www.instagram.com/puterinacakes/" },
  { image: "/images/site/dvostruki-presek.jpg", alt: "Presek dve torte, dva ukusa — Puterina, butik torti Beograd", href: "https://www.instagram.com/puterinacakes/" },
  { image: "/images/site/krofnice-hero.jpg", alt: "Šu-šu krofnice na čašama — Puterina, butik torti Beograd", href: "https://www.instagram.com/puterinacakes/" },
]
