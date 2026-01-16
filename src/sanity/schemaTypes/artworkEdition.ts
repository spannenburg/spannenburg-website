import { defineField, defineType } from 'sanity'

export const artworkEdition = defineType({
  name: 'artworkEdition',
  title: 'Edition Details',
  type: 'object',
  fields: [
    defineField({
      name: 'sizeTemplate',
      title: 'Select Size Template',
      description: 'Linked to global pricing and physical specs.',
      type: 'reference',
      to: [{ type: 'sizeTemplate' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'orientation',
      title: 'Orientation',
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
  ],
})
