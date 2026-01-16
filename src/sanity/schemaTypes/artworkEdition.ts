import { defineField, defineType } from 'sanity'

export const artworkEdition = defineType({
  name: 'artworkEdition',
  title: 'Edition Details',
  type: 'object',
  fields: [
    defineField({
      name: 'sizeTemplate',
      title: 'Select Size & Price Template',
      description: 'Linked to global pricing. Updates automatically.',
      type: 'reference',
      to: [{ type: 'sizeTemplate' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'orientation',
      title: 'Image Orientation',
      type: 'string',
      initialValue: 'landscape',
      options: {
        list: [
          { title: 'Landscape (Long side = Width)', value: 'landscape' },
          { title: 'Portrait (Long side = Height)', value: 'portrait' },
          { title: 'Square', value: 'square' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
        name: 'stockStatus',
        title: 'Stock Status',
        type: 'string',
        options: {
            list: [
                {title: 'In Stock', value: 'in_stock'},
                {title: 'Sold Out', value: 'sold_out'},
                {title: 'Last Ones Available', value: 'low_stock'},
            ]
        }
    }),
  ],
})
