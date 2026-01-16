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
      description: 'E.g.: "Giclée print Ultrachrome mounted on dibond with mat plexiglas"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Technical Description (Optional)',
      description: 'Short explanation for the customer. What makes this high quality? (Good for SEO/Conversion).',
      type: 'text',
      rows: 3,
    }),
  ],
})
