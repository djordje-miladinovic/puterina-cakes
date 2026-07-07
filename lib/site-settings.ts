import { sanityFetch } from "@/lib/sanity"
import { CONTACT, SITE, WORKING_HOURS } from "@/lib/constants"

/**
 * SiteSettings — PUN CMS (V4 #34c/#36c): sav site-wide copy živi u Sanity
 * singleton dokumentu `siteSettings` (_id: "siteSettings"), pa Katarina/Đorđe
 * menjaju tekstove bez deploy-a. Kod (constants.ts) je FALLBACK istina —
 * ako polje u Sanity-ju ne postoji ili je prazno, važi vrednost iz koda.
 *
 * NAPOMENA: responseNote je UKLONJEN sa sajta (Đorđeva odluka 2026-07-06)
 * i namerno NIJE deo ovog modela.
 */

export interface SiteSettings {
  // Brend
  tagline: string
  heroEyebrow: string
  manifest: string
  signOff: string
  brandLine: string
  // Operativno
  workingHours: string
  deliveryNote: string
  minOrderNote: string
  decorationNote: string
  decorationNoteShort: string
  catalogPriceNote: string
  exclusivityNote: string
  luxNote: string
  // Pauza-režim (#35a): traka na vrhu sajta
  pauzaAktivna: boolean
  pauzaPoruka: string
}

/** Fallback iz koda — izvor istine kada Sanity polje nije postavljeno. */
export const DEFAULT_SETTINGS: SiteSettings = {
  tagline: SITE.tagline,
  heroEyebrow: SITE.heroEyebrow,
  manifest: SITE.manifest,
  signOff: SITE.signOff,
  brandLine: SITE.brandLine,
  workingHours: WORKING_HOURS.display,
  deliveryNote: SITE.deliveryNote,
  minOrderNote: SITE.minOrderNote,
  decorationNote: SITE.decorationNote,
  decorationNoteShort: SITE.decorationNoteShort,
  catalogPriceNote: SITE.catalogPriceNote,
  exclusivityNote: SITE.exclusivityNote,
  luxNote: SITE.luxNote,
  pauzaAktivna: false,
  pauzaPoruka: "Termini su trenutno popunjeni — pišite mi za prvi slobodan.",
}

export const SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  tagline, heroEyebrow, manifest, signOff, brandLine,
  workingHours, deliveryNote, minOrderNote,
  decorationNote, decorationNoteShort, catalogPriceNote,
  exclusivityNote, luxNote,
  pauzaAktivna, pauzaPoruka
}`

type PartialSettings = Partial<Record<keyof SiteSettings, unknown>>

/** Vrati podešavanja: Sanity vrednosti preko fallback-a iz koda. */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const row = await sanityFetch<PartialSettings | null>({
      query: SETTINGS_QUERY,
    })
    if (!row) return DEFAULT_SETTINGS
    const merged = { ...DEFAULT_SETTINGS } as Record<string, unknown>
    for (const key of Object.keys(DEFAULT_SETTINGS) as (keyof SiteSettings)[]) {
      const v = row[key]
      if (typeof v === "string" && v.trim() !== "") merged[key] = v
      if (typeof v === "boolean") merged[key] = v
    }
    return merged as unknown as SiteSettings
  } catch {
    return DEFAULT_SETTINGS
  }
}

/** Re-export za komponente kojima treba samo kontakt (tel/WA/Viber/IG). */
export { CONTACT }
