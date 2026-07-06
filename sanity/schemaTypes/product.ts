import { defineType, defineField, defineArrayMember } from 'sanity'
import { TagIcon } from '@sanity/icons'

/**
 * Proizvod (V3) — izvor istine za katalog. Polja prate lib/products-data.ts
 * (ProductData). Slike se drže kao putanje u /public (imagePath, gallery[])
 * dok se ne pređe na Sanity asset upload — v. V4-PITANJA (foto faza B).
 */
export const product = defineType({
  name: 'product',
  title: 'Proizvod',
  type: 'document',
  icon: TagIcon,
  groups: [
    { name: 'osnovno', title: 'Osnovno', default: true },
    { name: 'opis', title: 'Opis i ukusi' },
    { name: 'slike', title: 'Slike' },
    { name: 'deklaracija', title: 'Deklaracija' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Naziv',
      type: 'string',
      group: 'osnovno',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'osnovno',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategorija',
      type: 'string',
      group: 'osnovno',
      options: {
        list: [
          { title: 'Torte', value: 'torte' },
          { title: 'Kolači', value: 'kolaci' },
          { title: 'Krofnice', value: 'krofnice' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isSignature',
      title: 'Signature (potpisni ukus)',
      type: 'boolean',
      group: 'osnovno',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Redosled',
      description: 'Manji broj = ranije u katalogu',
      type: 'number',
      group: 'osnovno',
      initialValue: 100,
    }),
    defineField({
      name: 'pricePerKg',
      title: 'Cena po kg (RSD)',
      description: 'Ostaviti prazno ako je „cena na upit"',
      type: 'number',
      group: 'osnovno',
      validation: (rule) => rule.positive(),
    }),
    defineField({
      name: 'priceNote',
      title: 'Napomena uz cenu',
      description: 'npr. „cena na upit" (kada nema cene po kg)',
      type: 'string',
      group: 'osnovno',
    }),
    defineField({
      name: 'seasonal',
      title: 'Sezonski',
      type: 'object',
      group: 'osnovno',
      description: 'Popuniti samo za sezonske proizvode',
      fields: [
        defineField({ name: 'badge', title: 'Badge (kartica)', type: 'string' }),
        defineField({ name: 'note', title: 'Napomena (strana proizvoda)', type: 'text', rows: 2 }),
      ],
    }),
    defineField({
      name: 'flavors',
      title: 'Ukusi (za filter)',
      type: 'array',
      group: 'opis',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        list: [
          { title: 'Čokolada', value: 'cokolada' },
          { title: 'Voće', value: 'voce' },
          { title: 'Orašasto', value: 'orasasto' },
          { title: 'Vanila i krem', value: 'vanila-krem' },
        ],
      },
    }),
    defineField({
      name: 'shortDescription',
      title: 'Kratak opis (podnaslov)',
      description: 'Činjenica u ~5 reči; naslov nosi poeziju',
      type: 'string',
      group: 'opis',
      validation: (rule) => rule.max(150),
    }),
    defineField({
      name: 'description',
      title: 'Opis (u njenom glasu)',
      type: 'text',
      group: 'opis',
      rows: 3,
    }),
    defineField({
      name: 'layers',
      title: 'Slojevi',
      type: 'array',
      group: 'opis',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'ingredientsShort',
      title: 'Kratki sastojci (bez deklaracije)',
      description: 'Prikazuje se kada nema pune deklaracije',
      type: 'string',
      group: 'opis',
    }),
    defineField({
      name: 'imagePath',
      title: 'Glavna slika (putanja)',
      description: 'npr. /images/products/pistac-malina/1.jpg',
      type: 'string',
      group: 'slike',
    }),
    defineField({
      name: 'crossSectionPath',
      title: 'Presek (putanja)',
      type: 'string',
      group: 'slike',
    }),
    defineField({
      name: 'gallery',
      title: 'Galerija (putanje)',
      type: 'array',
      group: 'slike',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'declaration',
      title: 'Deklaracija',
      type: 'object',
      group: 'deklaracija',
      description: 'Ostaviti prazno ako deklaracija još ne postoji (prikazuje se „na upit")',
      fields: [
        defineField({ name: 'officialName', title: 'Zvaničan naziv', type: 'string' }),
        defineField({ name: 'sastojci', title: 'Sastojci', type: 'text', rows: 3 }),
        defineField({ name: 'alergeni', title: 'Alergeni', type: 'string' }),
        defineField({ name: 'cuvanje', title: 'Čuvanje', type: 'string' }),
        defineField({ name: 'rok', title: 'Rok trajanja', type: 'string' }),
        defineField({ name: 'netoMasa', title: 'Neto masa', type: 'string' }),
        defineField({
          name: 'nutritivno',
          title: 'Nutritivne vrednosti (na 100 g)',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'label', title: 'Stavka', type: 'string' }),
                defineField({ name: 'value', title: 'Vrednost', type: 'string' }),
              ],
              preview: {
                select: { title: 'label', subtitle: 'value' },
              },
            }),
          ],
        }),
        defineField({ name: 'proizvodjac', title: 'Proizvođač', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', signature: 'isSignature' },
    prepare({ title, subtitle, signature }) {
      return {
        title: signature ? `★ ${title}` : title,
        subtitle: subtitle,
      }
    },
  },
})
