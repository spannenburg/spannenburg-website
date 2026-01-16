import { defineField, defineType } from 'sanity'
import { TfiRulerPencil } from 'react-icons/tfi'

export const sizeTemplate = defineType({
  name: 'sizeTemplate',
  title: 'Size Templates & Base Prices',
  type: 'document',
  icon: TfiRulerPencil,
  fields: [
    defineField({
      name: 'name',
      title: 'Template Name',
      description: 'E.g. "Medium Portrait", "Large Square".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    
    // --- DIMENSIONS ---
    defineField({
      name: 'width',
      title: 'Width (cm)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'height',
      title: 'Height (cm)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'depth',
      title: 'Depth (cm)',
      description: 'Optional. Only for 3D works.',
      type: 'number',
    }),

    // --- BASE PRICE (Nu Verplicht!) ---
    defineField({
      name: 'basePrice',
      title: 'Global Base Price (€)',
      description: 'The standard price for this size (e.g., 1200). APs will automatically be x1.25 this amount.',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      width: 'width',
      height: 'height',
      price: 'basePrice',
    },
    prepare({ title, width, height, price }) {
      return {
        title: title,
        subtitle: `${width}x${height} cm | Base: €${price}`,
        media: TfiRulerPencil,
      }
    },
  },
})
