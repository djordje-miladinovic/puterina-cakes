/**
 * Centralni dummy podaci za pregled dizajna.
 * Tekstovi: docs/copy/COPY-DECK-V3.md · Cene su PRIMERI (odluka #6 vlasnice).
 * Slike: public/images/dummy/ (kurirane stock fotografije — CREDITS.md).
 * Kada vlasnica isporuči prave podatke, ovaj fajl se prazni, a sadržaj živi u Sanity-ju.
 */

export type AllergenKey = "gluten" | "eggs" | "milk" | "nuts"

export interface NutritionData {
  energy: string
  protein: string
  carbs: string
  sugars: string
  fat: string
  saturatedFat: string
  salt: string
}

export interface ProductData {
  slug: string
  title: string
  category: "torte" | "kolaci"
  isSignature: boolean
  pricePerKg: number
  shortDescription: string
  layers: string[]
  ingredients: string
  allergens: AllergenKey[]
  allergenNote?: string
  storage: string
  nutrition: NutritionData
  image: string
  crossSectionImage: string
  gallery: string[]
  declaration: string
}

// Okvirne nutritivne vrednosti za buttercream torte (per 100 g) — primer
const CAKE_NUTRITION: NutritionData = {
  energy: "1590 kJ / 380 kcal",
  protein: "5,2 g",
  carbs: "38 g",
  sugars: "29 g",
  fat: "23 g",
  saturatedFat: "14 g",
  salt: "0,2 g",
}

const STORAGE_DEFAULT =
  "Čuvati u frižideru (2–6 °C) do 3 dana. Izvaditi 30 minuta pre posluženja da krem dobije svilenkastu teksturu."

const DECLARATION_NOTE =
  "Primer deklaracije — finalnu deklaraciju za svaki proizvod dostavlja Puterina (postoje spremne)."

export const DUMMY_PRODUCTS: ProductData[] = [
  {
    slug: "pistac-malina",
    title: "Pistać-malina",
    category: "torte",
    isSignature: true,
    pricePerKg: 3700,
    shortDescription:
      "Hrskavi sloj pistaća, svilenkasti krem od bele čokolade sa pravim puterom i srce od svežih malina. Torta za one koji pamte ukuse.",
    layers: [
      "vanila biskvit sa mlevenim pistaćima",
      "hrskavi pistać-feuilletine",
      "krem od bele čokolade i putera",
      "sveže maline",
    ],
    ingredients:
      "pistać, bela čokolada, puter, jaja, pšenično brašno, šećer, maline, slatka pavlaka, vanila",
    allergens: ["gluten", "eggs", "milk", "nuts"],
    storage: STORAGE_DEFAULT,
    nutrition: CAKE_NUTRITION,
    image: "/images/dummy/pistac-malina-1.jpg",
    crossSectionImage: "/images/dummy/pistac-malina-presek.jpg",
    gallery: [
      "/images/dummy/pistac-malina-1.jpg",
      "/images/dummy/pistac-malina-presek.jpg",
      "/images/dummy/hero-pistac-malina.jpg",
    ],
    declaration: DECLARATION_NOTE,
  },
  {
    slug: "kokos-vanila-malina",
    title: "Kokos-vanila-malina",
    category: "torte",
    isSignature: true,
    pricePerKg: 3600,
    shortDescription:
      "Nežni kokos, prava Burbon vanila i maline koje se tope u svakom zalogaju. Ukus koji najčešće putuje iz moje radionice.",
    layers: [
      "kokos biskvit",
      "krem od Burbon vanile",
      "sveže maline",
      "svilenkasti puter krem",
    ],
    ingredients:
      "kokos, Burbon vanila, puter, jaja, pšenično brašno, šećer, maline, bela čokolada, slatka pavlaka",
    allergens: ["gluten", "eggs", "milk"],
    storage: STORAGE_DEFAULT,
    nutrition: CAKE_NUTRITION,
    image: "/images/dummy/kokos-vanila-malina-1.jpg",
    crossSectionImage: "/images/dummy/kokos-vanila-malina-presek.jpg",
    gallery: [
      "/images/dummy/kokos-vanila-malina-1.jpg",
      "/images/dummy/kokos-vanila-malina-presek.jpg",
    ],
    declaration: DECLARATION_NOTE,
  },
  {
    slug: "djanduja-malina",
    title: "Đanduja-malina",
    category: "torte",
    isSignature: false,
    pricePerKg: 3800,
    shortDescription:
      "Svilenkasta đanduja od lešnika i čokolade, srce od maline. Za one koji vole dublje, punije ukuse.",
    layers: [
      "kakao biskvit",
      "đanduja krem (lešnik i mlečna čokolada)",
      "hrskavi lešnik-praline",
      "sveže maline",
    ],
    ingredients:
      "lešnik, mlečna čokolada, puter, jaja, pšenično brašno, šećer, maline, slatka pavlaka",
    allergens: ["gluten", "eggs", "milk", "nuts"],
    storage: STORAGE_DEFAULT,
    nutrition: CAKE_NUTRITION,
    image: "/images/dummy/djanduja-malina-1.jpg",
    crossSectionImage: "/images/dummy/djanduja-malina-presek.jpg",
    gallery: [
      "/images/dummy/djanduja-malina-1.jpg",
      "/images/dummy/djanduja-malina-presek.jpg",
    ],
    declaration: DECLARATION_NOTE,
  },
  {
    slug: "pistac-limun",
    title: "Pistać-limun",
    category: "torte",
    isSignature: false,
    pricePerKg: 3700,
    shortDescription:
      "Mirisni pistać i svež limun — letnja torta koja budi čula. Nežna, kremasta i taman koliko treba osvežavajuća.",
    layers: [
      "pistać biskvit",
      "limun krem (curd)",
      "puter krem sa belom čokoladom",
    ],
    ingredients:
      "pistać, limun, puter, jaja, pšenično brašno, šećer, bela čokolada",
    allergens: ["gluten", "eggs", "milk", "nuts"],
    storage: STORAGE_DEFAULT,
    nutrition: CAKE_NUTRITION,
    image: "/images/dummy/pistac-limun-1.jpg",
    crossSectionImage: "/images/dummy/pistac-limun-presek.jpg",
    gallery: [
      "/images/dummy/pistac-limun-1.jpg",
      "/images/dummy/pistac-limun-presek.jpg",
    ],
    declaration: DECLARATION_NOTE,
  },
  {
    slug: "cokoladna-fantazija",
    title: "Čokoladna fantazija",
    category: "torte",
    isSignature: false,
    pricePerKg: 3900,
    shortDescription:
      "Duboka, prava čokolada u tri teksture — biskvit, ganaš i svilenkasti krem. Omiljena i kod najmlađih slavljenika.",
    layers: [
      "kakao biskvit",
      "ganaš od tamne čokolade",
      "čokoladni puter krem",
    ],
    ingredients:
      "tamna čokolada, kakao, puter, jaja, pšenično brašno, šećer, slatka pavlaka",
    allergens: ["gluten", "eggs", "milk"],
    allergenNote: "Može sadržati tragove orašastih plodova.",
    storage: STORAGE_DEFAULT,
    nutrition: CAKE_NUTRITION,
    image: "/images/dummy/cokoladna-1.jpg",
    crossSectionImage: "/images/dummy/cokoladna-presek.jpg",
    gallery: ["/images/dummy/cokoladna-1.jpg", "/images/dummy/cokoladna-presek.jpg"],
    declaration: DECLARATION_NOTE,
  },
  {
    slug: "burbon-vanila",
    title: "Burbon vanila",
    category: "torte",
    isSignature: false,
    pricePerKg: 3600,
    shortDescription:
      "Zagrljaj svilenkaste Burbon vanile — jednostavna na prvi pogled, nezaboravna u zalogaju.",
    layers: [
      "vanila biskvit",
      "krem od prave Burbon vanile",
      "puter krem",
    ],
    ingredients:
      "Burbon vanila, puter, jaja, pšenično brašno, šećer, bela čokolada, slatka pavlaka",
    allergens: ["gluten", "eggs", "milk"],
    storage: STORAGE_DEFAULT,
    nutrition: CAKE_NUTRITION,
    image: "/images/dummy/burbon-vanila-1.jpg",
    crossSectionImage: "/images/dummy/burbon-vanila-presek.jpg",
    gallery: ["/images/dummy/burbon-vanila-1.jpg", "/images/dummy/burbon-vanila-presek.jpg"],
    declaration: DECLARATION_NOTE,
  },
  {
    slug: "sitni-kolaci",
    title: "Sitni kolači (mešavina)",
    category: "kolaci",
    isSignature: false,
    pricePerKg: 3200,
    shortDescription:
      "Moja večita inspiracija — kutija malih zalogaja: praline, mini tartovi i kore koje se tope.",
    layers: ["praline", "mini tartovi", "puter kore"],
    ingredients:
      "puter, jaja, pšenično brašno, šećer, čokolada, orašasti plodovi, voće",
    allergens: ["gluten", "eggs", "milk", "nuts"],
    storage: STORAGE_DEFAULT,
    nutrition: CAKE_NUTRITION,
    image: "/images/dummy/kolaci-1.jpg",
    crossSectionImage: "/images/dummy/kolaci-2.jpg",
    gallery: ["/images/dummy/kolaci-1.jpg", "/images/dummy/kolaci-2.jpg"],
    declaration: DECLARATION_NOTE,
  },
  {
    slug: "mini-pavlove",
    title: "Mini pavlove",
    category: "kolaci",
    isSignature: false,
    pricePerKg: 3400,
    shortDescription:
      "Hrskava školjka, mekano srce i sveže voće — mali oblaci za velike proslave.",
    layers: ["hrskava beze školjka", "krem", "sveže voće"],
    ingredients: "belanca, šećer, slatka pavlaka, sveže voće",
    allergens: ["eggs", "milk"],
    allergenNote: "Bez glutena — može sadržati tragove.",
    storage: STORAGE_DEFAULT,
    nutrition: CAKE_NUTRITION,
    image: "/images/dummy/kolaci-2.jpg",
    crossSectionImage: "/images/dummy/kolaci-3.jpg",
    gallery: ["/images/dummy/kolaci-2.jpg", "/images/dummy/kolaci-3.jpg"],
    declaration: DECLARATION_NOTE,
  },
  {
    slug: "praline-kocke",
    title: "Praline kocke",
    category: "kolaci",
    isSignature: false,
    pricePerKg: 3500,
    shortDescription:
      "Lešnik, čokolada i hrskavi sloj — kocka po kocka nestaju sa stola.",
    layers: ["kakao kora", "lešnik praline", "čokoladni krem"],
    ingredients:
      "lešnik, čokolada, puter, jaja, pšenično brašno, šećer",
    allergens: ["gluten", "eggs", "milk", "nuts"],
    storage: STORAGE_DEFAULT,
    nutrition: CAKE_NUTRITION,
    image: "/images/dummy/kolaci-3.jpg",
    crossSectionImage: "/images/dummy/kolaci-4.jpg",
    gallery: ["/images/dummy/kolaci-3.jpg", "/images/dummy/kolaci-4.jpg"],
    declaration: DECLARATION_NOTE,
  },
  {
    slug: "vanilice-sa-malinom",
    title: "Vanilice sa malinom",
    category: "kolaci",
    isSignature: false,
    pricePerKg: 2800,
    shortDescription:
      "Domaće vanilice kakve pamtite — samo sa pravim puterom i domaćim džemom od malina.",
    layers: ["puter testo", "džem od malina", "vanila šećer"],
    ingredients:
      "puter, pšenično brašno, šećer, jaja, džem od malina, vanila, orasi",
    allergens: ["gluten", "eggs", "milk", "nuts"],
    storage: "Čuvati na hladnom i suvom mestu do 7 dana.",
    nutrition: CAKE_NUTRITION,
    image: "/images/dummy/kolaci-4.jpg",
    crossSectionImage: "/images/dummy/kolaci-1.jpg",
    gallery: ["/images/dummy/kolaci-4.jpg", "/images/dummy/kolaci-1.jpg"],
    declaration: DECLARATION_NOTE,
  },
]

export const SIGNATURE_PRODUCTS = DUMMY_PRODUCTS.filter((p) => p.isSignature)

export function getDummyProduct(slug: string): ProductData | undefined {
  return DUMMY_PRODUCTS.find((p) => p.slug === slug)
}

// Utisci — PRIMERI (menjaju se pravim porukama kupaca, odluka #9)
export interface TestimonialData {
  quote: string
  name: string
  occasion: string
}

export const DUMMY_TESTIMONIALS: TestimonialData[] = [
  {
    quote:
      "Torta je bila savršena, a pistać-malina je hit u celoj porodici. Hvala Vam što ste nam ulepšali slavlje!",
    name: "Milica",
    occasion: "rođendan",
  },
  {
    quote:
      "Najlepša i najukusnija torta koju smo ikada imali. Gosti su tražili broj telefona!",
    name: "Ana",
    occasion: "krštenje",
  },
  {
    quote: "Kokos-vanila-malina… nemam reči. Vidimo se za sledeći rođendan!",
    name: "Jelena",
    occasion: "dečji rođendan",
  },
  {
    quote:
      "Sve pohvale za komunikaciju i za tortu koja je izgledala predivno, a bila još bolja.",
    name: "Marko",
    occasion: "godišnjica",
  },
  {
    quote:
      "Deca su bila oduševljena Lego tortom, a mi ukusom. Prava domaća, oseti se puter.",
    name: "Ivana",
    occasion: "dečji rođendan",
  },
  {
    quote:
      "Naručujemo već treći put i svaki put je bolje. Hvala za posvećenost svakom detalju!",
    name: "Nikola",
    occasion: "slava",
  },
]

// „Sa Instagrama" — kurirane slike (kasnije Sanity instagramPick tip)
export interface InstagramPick {
  image: string
  alt: string
  href: string
}

export const INSTAGRAM_PICKS: InstagramPick[] = [
  {
    image: "/images/dummy/pistac-malina-1.jpg",
    alt: "Pistać-malina torta — Puterina, butik torti Beograd",
    href: "https://www.instagram.com/puterinacakes/",
  },
  {
    image: "/images/dummy/kokos-vanila-malina-1.jpg",
    alt: "Kokos-vanila-malina torta — Puterina, butik torti Beograd",
    href: "https://www.instagram.com/puterinacakes/",
  },
  {
    image: "/images/dummy/djanduja-malina-1.jpg",
    alt: "Đanduja-malina torta — Puterina, butik torti Beograd",
    href: "https://www.instagram.com/puterinacakes/",
  },
  {
    image: "/images/dummy/kolaci-1.jpg",
    alt: "Sitni kolači — Puterina, butik torti Beograd",
    href: "https://www.instagram.com/puterinacakes/",
  },
  {
    image: "/images/dummy/burbon-vanila-1.jpg",
    alt: "Burbon vanila torta — Puterina, butik torti Beograd",
    href: "https://www.instagram.com/puterinacakes/",
  },
  {
    image: "/images/dummy/cokoladna-1.jpg",
    alt: "Čokoladna torta — Puterina, butik torti Beograd",
    href: "https://www.instagram.com/puterinacakes/",
  },
]
