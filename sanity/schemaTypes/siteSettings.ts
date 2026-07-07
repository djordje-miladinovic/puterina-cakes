import { defineType, defineField } from 'sanity'
import { CogIcon } from '@sanity/icons'

/**
 * Podešavanja sajta (V4 #34c/#36c) — singleton dokument (_id: "siteSettings").
 * Polja prate interfejs SiteSettings iz lib/site-settings.ts 1:1.
 * Kod (lib/constants.ts) je fallback: prazno polje ovde = važi tekst iz koda.
 *
 * NAPOMENA: responseNote („Obično odgovaram…") je uklonjen sa sajta i
 * NAMERNO ne postoji u ovom dokumentu.
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Podešavanja sajta',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'brend', title: 'Brend', default: true },
    { name: 'operativno', title: 'Operativno' },
    { name: 'pauza', title: 'Pauza' },
  ],
  fields: [
    // ── Brend ────────────────────────────────────────────────────────────
    defineField({
      name: 'tagline',
      title: 'Tagline (slogan)',
      description: 'Kratka rečenica uz ime — npr. „Torte sa dušom i puterom."',
      type: 'string',
      group: 'brend',
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero natpis (iznad naslova)',
      description: 'Mala linija na vrhu naslovne — npr. „Butik torti · Beograd"',
      type: 'string',
      group: 'brend',
    }),
    defineField({
      name: 'manifest',
      title: 'Manifest',
      description: 'Vaša rečenica o tome kako pravite torte — stoji na naslovnoj strani.',
      type: 'text',
      rows: 3,
      group: 'brend',
    }),
    defineField({
      name: 'signOff',
      title: 'Potpis',
      description: 'Kako se potpisujete na kraju — npr. „s ljubavlju, Katarina"',
      type: 'string',
      group: 'brend',
    }),
    defineField({
      name: 'brandLine',
      title: 'Brend linija (footer)',
      description: 'Jedna linija u dnu sajta — ime, grad i radno vreme.',
      type: 'string',
      group: 'brend',
    }),
    // ── Operativno ───────────────────────────────────────────────────────
    defineField({
      name: 'workingHours',
      title: 'Radno vreme',
      description: 'npr. „Radnim danima 08–20h"',
      type: 'string',
      group: 'operativno',
    }),
    defineField({
      name: 'deliveryNote',
      title: 'Napomena o dostavi',
      description: 'Kako funkcioniše dostava — prikazuje se na kontaktu i u čestim pitanjima.',
      type: 'text',
      rows: 2,
      group: 'operativno',
    }),
    defineField({
      name: 'minOrderNote',
      title: 'Najmanja porudžbina',
      description: 'npr. „Najmanja porudžbina: 1 kg."',
      type: 'string',
      group: 'operativno',
    }),
    defineField({
      name: 'decorationNote',
      title: 'Napomena o dekoraciji (duža)',
      description: 'Puno objašnjenje kako se dekoracija dogovara i naplaćuje.',
      type: 'text',
      rows: 2,
      group: 'operativno',
    }),
    defineField({
      name: 'decorationNoteShort',
      title: 'Napomena o dekoraciji (kratka)',
      description: 'Kratka verzija za kartice — npr. „Dekoracija se dogovara posebno."',
      type: 'string',
      group: 'operativno',
    }),
    defineField({
      name: 'catalogPriceNote',
      title: 'Napomena o cenama (katalog)',
      description: 'Stoji uz katalog — npr. „Sve cene su po kilogramu…"',
      type: 'text',
      rows: 2,
      group: 'operativno',
    }),
    defineField({
      name: 'exclusivityNote',
      title: 'Napomena o broju torti',
      description: 'Rečenica o ograničenom broju torti nedeljno.',
      type: 'text',
      rows: 2,
      group: 'operativno',
    }),
    defineField({
      name: 'luxNote',
      title: 'Napomena o lux kolačima',
      description: 'npr. „Lux kolači — 5.500 RSD/kg. U kilogram stane 35–40 kolača."',
      type: 'string',
      group: 'operativno',
    }),
    // ── Pauza ────────────────────────────────────────────────────────────
    defineField({
      name: 'pauzaAktivna',
      title: 'Pauza — termini popunjeni',
      description: 'Uključi mirnu traku na vrhu sajta',
      type: 'boolean',
      initialValue: false,
      group: 'pauza',
    }),
    defineField({
      name: 'pauzaPoruka',
      title: 'Poruka na traci',
      description:
        'Tekst na traci dok je pauza uključena — npr. „Termini su trenutno popunjeni — pišite mi za prvi slobodan."',
      type: 'string',
      group: 'pauza',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Podešavanja sajta', subtitle: 'Tekstovi i pauza-režim' }
    },
  },
})
