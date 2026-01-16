import { defineField, defineType } from 'sanity'

export const artworkEdition = defineType({
  name: 'artworkEdition',
  title: 'Edition Details',
  type: 'object',
  fields: [
    defineField({
      name: 'sizeTemplate',
      title: 'Select Size Template',
      description: 'Linked to physical dimensions and the global price tier.',
      type: 'reference',
      to: [{ type: 'sizeTemplate' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'orientation',
      title: 'Orientation',
      description: 'Determines if width and height are swapped (e.g., 60x40 vs 40x60).',
      type: 'string',
      initialValue: 'landscape',
      options: {
        list: [
          { title: 'Landscape', value: 'landscape' },
          { title: 'Portrait', value: 'portrait' },
          { title: 'Square', value: 'square' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'seller',
      title: 'Seller / Gallery',
      description: 'The gallery or entity selling this specific edition (e.g., Zerp for NL, or a US-based partner).',
      type: 'reference',
      to: [{ type: 'venue' }],
    }),
    defineField({
      name: 'stockStatus',
      title: 'Stock Status',
      type: 'string',
      initialValue: 'available',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Limited Availability', value: 'limited' },
          { title: 'Sold Out', value: 'sold_out' },
          { title: 'Reserved', value: 'reserved' },
        ],
      },
    }),
  ],
})
