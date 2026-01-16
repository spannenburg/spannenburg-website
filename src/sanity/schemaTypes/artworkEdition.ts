import { defineField, defineType } from 'sanity'
import { TfiRulerPencil } from 'react-icons/tfi'

export const artworkEdition = defineType({
  name: 'artworkEdition',
  title: 'Edition',
  type: 'object', 
  icon: TfiRulerPencil,
  fields: [
    defineField({
      name: 'size',
      title: 'Size Template',
      type: 'reference',
      to: [{ type: 'sizeTemplate' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Base Price (€)',
      description: 'The price for this size in the STANDARD material (Multiplier 1.0).',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'limit',
      title: 'Edition Limit',
      description: 'Total copies available (leave empty for Open Edition).',
      type: 'number',
    }),
    defineField({
      name: 'available',
      title: 'Currently Available?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      size: 'size.name',
      width: 'size.width',
      height: 'size.height',
      price: 'price',
      limit: 'limit',
    },
    prepare({ size, width, height, price, limit }) {
      const sizeName = size || 'Unknown Size'
      const dim = width && height ? `(${width}x${height})` : ''
      const limitText = limit ? ` / Limit: ${limit}` : ' / Open Edition'
      return {
        title: `${sizeName} ${dim}`,
        subtitle: `€${price}${limitText}`,
        media: TfiRulerPencil
      }
    },
  },
})
