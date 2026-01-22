import { defineType, defineField, defineArrayMember } from 'sanity'
import { TagIcon } from '@sanity/icons'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      description: 'Brief description shown above CTA buttons (2-3 sentences)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      description: 'Detailed description shown in accordion',
      type: 'text',
    }),
    defineField({
      name: 'pricePerKg',
      title: 'Price per KG (RSD)',
      type: 'number',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      description: 'Additional product images (include a cross-section photo)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'storage',
      title: 'Storage Instructions',
      type: 'text',
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'text',
    }),
    defineField({
      name: 'nutrition',
      title: 'Nutrition (per 100g)',
      type: 'object',
      fields: [
        defineField({ name: 'energy', title: 'Energy (kcal)', type: 'number' }),
        defineField({ name: 'protein', title: 'Protein (g)', type: 'number' }),
        defineField({ name: 'carbs', title: 'Carbohydrates (g)', type: 'number' }),
        defineField({ name: 'sugars', title: 'Sugars (g)', type: 'number' }),
        defineField({ name: 'fat', title: 'Fat (g)', type: 'number' }),
        defineField({ name: 'saturatedFat', title: 'Saturated Fat (g)', type: 'number' }),
        defineField({ name: 'fiber', title: 'Fiber (g)', type: 'number' }),
        defineField({ name: 'salt', title: 'Salt (g)', type: 'number' }),
      ],
    }),
    defineField({
      name: 'allergens',
      title: 'Allergens',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
      options: {
        list: [
          { title: 'Gluten', value: 'gluten' },
          { title: 'Milk', value: 'milk' },
          { title: 'Eggs', value: 'eggs' },
          { title: 'Nuts', value: 'nuts' },
          { title: 'Soy', value: 'soy' },
          { title: 'Sesame', value: 'sesame' },
          { title: 'Peanuts', value: 'peanuts' },
        ],
      },
    }),
    defineField({
      name: 'declaration',
      title: 'Declaration',
      description: 'Full legal declaration text',
      type: 'text',
      rows: 6,
    }),
  ],
})
