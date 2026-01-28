import { defineType, defineField } from 'sanity'
import { FilterIcon } from '@sanity/icons'

/**
 * Filter Option schema for Sanity CMS
 * Allows managing filter categories (Ukus, Prilika, Sezona) and their options
 * through the Sanity Studio interface.
 */
export const filterOption = defineType({
  name: 'filterOption',
  title: 'Filter Option',
  type: 'document',
  icon: FilterIcon,
  fields: [
    defineField({
      name: 'category',
      title: 'Kategorija filtera',
      type: 'string',
      options: {
        list: [
          { title: 'Ukus (Taste)', value: 'ukus' },
          { title: 'Prilika (Occasion)', value: 'prilika' },
          { title: 'Sezona (Season)', value: 'sezona' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Vrednost (Value)',
      description: 'Tehnička vrednost za filtriranje (bez razmaka i specijalnih karaktera)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Naziv (Label)',
      description: 'Prikazani naziv u dropdown meniju',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Redosled',
      description: 'Redosled prikazivanja u dropdown meniju (manji broj = ranije)',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'category',
    },
    prepare({ title, subtitle }) {
      const categoryLabels: Record<string, string> = {
        ukus: 'Ukus',
        prilika: 'Prilika',
        sezona: 'Sezona',
      }
      return {
        title,
        subtitle: categoryLabels[subtitle] || subtitle,
      }
    },
  },
  orderings: [
    {
      title: 'Po kategoriji',
      name: 'categoryAsc',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
})
