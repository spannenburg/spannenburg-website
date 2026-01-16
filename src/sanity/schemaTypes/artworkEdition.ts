import { defineField, defineType } from 'sanity'
import { TfiRulerPencil } from 'react-icons/tfi'

export const artworkEdition = defineType({
  name: 'artworkEdition',
  title: 'Edition',
  type: 'object', // It is an object inside Artwork, not a standalone document
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
      description: 'The starting price for this size (with standard material).',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'limit',
      title: 'Edition Limit',
      description: 'How many copies exist? (e.g., 5, 10, or leave empty for Open Edition).',
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
