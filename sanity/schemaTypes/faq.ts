import { defineType, defineField, defineArrayMember } from 'sanity'
import { HelpCircleIcon } from '@sanity/icons'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'question',
      title: 'Pitanje',
      type: 'string',
      validation: (rule) => rule.required().error('Pitanje je obavezno'),
    }),
    defineField({
      name: 'answer',
      title: 'Odgovor',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (rule) =>
                      rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                ],
              },
            ],
          },
        }),
      ],
      validation: (rule) => rule.required().error('Odgovor je obavezan'),
    }),
    defineField({
      name: 'category',
      title: 'Kategorija',
      type: 'string',
      options: {
        list: [
          { title: 'Poručivanje', value: 'porucivanje' },
          { title: 'Dostava', value: 'dostava' },
          { title: 'Proizvodi', value: 'proizvodi' },
          { title: 'Uslovi', value: 'uslovi' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required().error('Kategorija je obavezna'),
    }),
    defineField({
      name: 'order',
      title: 'Redosled',
      type: 'number',
      description: 'Manji broj = viši prioritet u prikazu',
      validation: (rule) => rule.required().min(0),
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Po kategoriji i redosledu',
      name: 'categoryOrder',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
    {
      title: 'Po redosledu',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
    },
    prepare({ title, subtitle }) {
      const categoryLabels: Record<string, string> = {
        porucivanje: 'Poručivanje',
        dostava: 'Dostava',
        proizvodi: 'Proizvodi',
        uslovi: 'Uslovi',
      }
      return {
        title,
        subtitle: categoryLabels[subtitle] || subtitle,
      }
    },
  },
})
