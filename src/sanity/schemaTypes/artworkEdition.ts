import { defineField, defineType } from 'sanity'

export const artworkEdition = defineType({
  name: 'artworkEdition',
  title: 'Edition Details',
  type: 'object',
  fields: [
    defineField({
      name: 'sizeTemplate',
      title: 'Dimensions',
      type: 'string',
      options: {
        list: [
          { title: 'Standard Small (60 x 40 cm)', value: '60_40' },
          { title: 'Standard Large (120 x 80 cm)', value: '120_80' },
          { title: 'Custom Size', value: 'custom' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'customDimensions',
        title: 'Custom Dimensions (if selected above)',
        type: 'string',
        hidden: ({ parent }) => parent?.sizeTemplate !== 'custom',
    }),
    defineField({
      name: 'orientation',
      title: 'Orientation',
      type: 'string',
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
        name: 'priceTier',
        title: 'Price Tier',
        description: 'Link this edition to a global price.',
        type: 'reference',
        to: [{ type: 'priceTier' }],
    }),
    defineField({
        name: 'editionSize',
        title: 'Edition Size',
        type: 'string',
        description: 'e.g., 8 + 2 AP',
    }),
  ],
})
