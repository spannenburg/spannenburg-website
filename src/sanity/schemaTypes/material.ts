import { defineField, defineType } from 'sanity'
import { TfiPaintRoller } from 'react-icons/tfi'

export const material = defineType({
  name: 'material',
  title: 'Materials & Finishes',
  type: 'document',
  icon: TfiPaintRoller,
  fields: [
    defineField({
      name: 'name',
      title: 'Material Name',
      description: 'E.g.: "Diasec Anti-Reflex"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Customer Description',
      description: 'Explain the quality (e.g., "Museum-quality glass, no reflections").',
      type: 'text',
      rows: 3,
    }),
    // --- THE PRICING LOGIC ---
    defineField({
      name: 'priceMultiplier',
      title: 'Price Multiplier',
      description: '1.0 = Standard Price. 1.15 = +15%. 1.25 = +25%.',
      type: 'number',
      initialValue: 1.0,
      validation: (Rule) => Rule.required().min(1.0),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      factor: 'priceMultiplier',
    },
    prepare({ title, factor }) {
      // Shows "Diasec TrueLife | x1.25" in the list
      const info = factor && factor !== 1 ? ` (x${factor} price)` : ' (Standard Price)'
      return {
        title: title,
        subtitle: info,
        media: TfiPaintRoller,
      }
    },
  },
})
