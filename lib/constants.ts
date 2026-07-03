// Contact information - centralized constants
// Telefon i handle potvrđeni sa Instagram profila @puterinacakes (2026-07-02)

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

// Navigation items — redosled po ZA-PUTERINU spec (odeljak 2)
export const NAVIGATION = [
  { name: "Početna", href: "/" },
  { name: "Katalog", href: "/katalog" },
  { name: "O meni", href: "/o-meni" },
  { name: "Utisci", href: "/utisci" },
  { name: "Česta pitanja", href: "/faq" },
  { name: "Kontakt", href: "/kontakt" },
] as const

// Working hours — jedino radno vreme na sajtu (brief: radnim danima 08–20h)
export const WORKING_HOURS = {
  display: "Radnim danima 08–20h",
} as const

// Brand / site-wide copy (docs/copy/COPY-DECK-V3.md §1–§2)
export const SITE = {
  name: "Puterina",
  tagline: "Torte sa dušom i puterom.",
  brandLine: "Puterina — butik torti · Beograd · Radnim danima 08–20h",
  shortBrand: "Puterina — butik torti, Beograd",
  city: "Beograd",
  decorationNote:
    "Dekoracija (figurice, crtanje na torti, jestivi papir) se naplaćuje posebno.",
  decorationNoteShort: "Dekoracija se naplaćuje posebno.",
  catalogPriceNote: "Sve cene su po kilogramu. Dekoracija se naplaćuje posebno.",
  exclusivityNote:
    "Broj torti koje radim nedeljno je ograničen — pozovite na vreme.",
  deliveryNote:
    "Beograd — lično preuzimanje ili dostava (doplata po zoni dostave).",
} as const
