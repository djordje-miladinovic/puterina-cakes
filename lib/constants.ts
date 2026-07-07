// Kontakt i site-wide copy — V3 „Tihi atelje"
// Izvor istine: V3-COPY.md §12 (Katarinina sveska, 2026-07-04) + V3-PLAN K1.
// Telefon i handle potvrđeni sa Instagram profila @puterinacakes.

const PREFILLED_MESSAGE =
  "Zdravo! Zanima me torta za [datum], za otprilike [broj] gostiju. Ukus/stil: [upišite]. Hvala!"

export const CONTACT = {
  phone: "+381653799334",
  phoneDisplay: "065 37 993 34",
  instagram: "https://www.instagram.com/puterinacakes/",
  instagramHandle: "@puterinacakes",
  address: "Beograd",
  whatsapp: `https://wa.me/381653799334?text=${encodeURIComponent(PREFILLED_MESSAGE)}`,
  viber: "viber://chat?number=%2B381653799334",
  prefilledMessage: PREFILLED_MESSAGE,
} as const

export const CANONICAL_BASE = "https://puterinacakes.rs"

// JEDNA kanonska navigacija — identična na desktopu, u mobilnom meniju i
// u footeru (Katalog je JEDAN link; vrste se biraju filterom u katalogu).
export const NAV_MAIN = [
  { name: "Katalog", href: "/katalog" },
  { name: "O meni", href: "/o-meni" },
  { name: "Utisci", href: "/utisci" },
  { name: "Česta pitanja", href: "/faq" },
  { name: "Kontakt", href: "/kontakt" },
] as const

// Aliasi zadržani radi postojećih import-a — svi pokazuju na istu listu,
// pa je meni svuda konzistentan.
export const NAV_DESKTOP = NAV_MAIN
export const NAV_FOOTER = NAV_MAIN
export const NAVIGATION = NAV_MAIN

// Working hours — jedino radno vreme na sajtu (brief: radnim danima 08–20h)
export const WORKING_HOURS = {
  display: "Radnim danima 08–20h",
} as const

// Brand / site-wide copy — V3-COPY.md §12 finalne verzije (ne menjati bez sveske!)
export const SITE = {
  name: "Puterina",
  ownerName: "Katarina",
  tagline: "Torte sa dušom i puterom.",
  heroEyebrow: "Butik torti · Beograd",
  manifest:
    "Pravim torte od putera, jaja i strpljenja. Ničeg trećeg — i ništa se ne požuruje.",
  signOff: "s ljubavlju, Katarina",
  brandLine: "Puterina — butik torti · Beograd · Radnim danima 08–20h",
  shortBrand: "Puterina — butik torti, Beograd",
  city: "Beograd",
  // NAPOMENA: responseNote („Obično odgovaram…") je uklonjen sa sajta
  // (Đorđeva odluka 2026-07-06) — ne vraćati bez njegove potvrde.
  // §12 #42/#43 — FINALNO, BEZ zona
  deliveryNote:
    "Dostava na adresu u Beogradu — po dogovoru. Van Beograda: takođe po dogovoru.",
  // §12 #13
  minOrderNote: "Najmanja porudžbina: 1 kg.",
  decorationNote:
    "Dekoracija (figurice, crtanje, jestivi papir) se dogovara i naplaćuje posebno — jer je svaka torta drugačija.",
  decorationNoteShort: "Dekoracija se dogovara posebno.",
  catalogPriceNote:
    "Sve cene su po kilogramu. Dekoracija se dogovara posebno.",
  exclusivityNote:
    "Broj torti koje radim nedeljno je ograničen — jer svaka zaslužuje pažnju.",
  prepareChecklist: "Pripremite: datum · broj gostiju · željeni ukus",
  // §12 #10 — Lux kolači, proverljiva činjenica
  luxNote: "Lux kolači — 5.500 RSD/kg. U kilogram stane 35–40 kolača.",
} as const
