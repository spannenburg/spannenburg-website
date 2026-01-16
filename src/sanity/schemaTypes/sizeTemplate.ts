import { defineField, defineType } from 'sanity'
import { TfiRulerPencil } from 'react-icons/tfi'

export const sizeTemplate = defineType({
  name: 'sizeTemplate',
  title: 'Size Templates',
  type: 'document',
  icon: TfiRulerPencil,
  fields: [
    defineField({
      name: 'name',
      title: 'Template Name',
      type: 'string',
      description: 'e.g., "Small Series (60x40)"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'width',
      title: 'Standard Width (Long side)',
      type: 'number',
      description: 'In cm',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'height',
      title: 'Standard Height (Short side)',
      type: 'number',
      description: 'In cm',
      validation: (Rule) => Rule.required().positive(),
    }),
    // THIS IS THE FIX: Only a reference, no manual price input
    defineField({
      name: 'priceTier',
      title: 'Connected Price Tier',
      description: 'Select the global price tier for this size. You cannot enter a manual price here.',
      type: 'reference',
      to: [{ type: 'priceTier' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'defaultEditionSize',
        title: 'Default Edition Size',
        type: 'string',
        description: 'e.g., 8 + 2 AP',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      w: 'width',
      h: 'height',
      p: 'priceTier.price', // We pull the price from the linked document for the preview
    },
    prepare({ title, w, h, p }) {
      return {
        title: title,
        subtitle: `${w} x ${h} cm — ${p ? `€ ${p},-` : 'No price set'}`,
      }
    }
  }
})
