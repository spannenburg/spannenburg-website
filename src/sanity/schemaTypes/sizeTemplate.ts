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
      description: 'e.g., "Small Series"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'width',
      title: 'Standard Width (Long side)',
      type: 'number',
      description: 'The physical width in cm (e.g., 60)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'height',
      title: 'Standard Height (Short side)',
      type: 'number',
      description: 'The physical height in cm (e.g., 40)',
      validation: (Rule) => Rule.required(),
    }),

    // --- CONNECTION TO PRICE TIER ---
    // This replaces the manual "Current Price" field.
    defineField({
      name: 'priceTier',
      title: 'Linked Price Tier',
      description: 'Select the price for this size category. Managed in the Price Tiers menu.',
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
    },
    prepare({ title, w, h }) {
      return {
        title: `${title} (${w}x${h} cm)`,
      }
    }
  }
})
